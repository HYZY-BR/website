import { supabase } from "./supabaseClient";
import { Team, TeamMember, MemberRole, TeamMemberWithProfile, TeamInvitation } from "@/types/team";
import { toast } from "sonner";
import { workspaceService } from "./workspaceService";


interface TeamJoinResult {
    teams: Team | Team[];
    member_roles: { slug: string } | { slug: string }[];
}

export const teamService = {
    // Get all possible roles from the database
    getAvailableRoles: async (): Promise<MemberRole[]> => {
        const { data, error } = await supabase
            .from('member_roles')
            .select('id, name, slug, description')
            .order('name');

        if (error) throw error;
        return data || [];
    },

    // Get all teams the current user belongs to
    getMyTeams: async (): Promise<Team[]> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const currentWorkspaceId = await workspaceService.getCurrentWorkspaceId();

        // Supabase join query to get teams via team_members
        let query = supabase
            .from('team_members')
            .select(`
                team_id,
                teams:team_id!inner (
                    id,
                    name,
                    slug,
                    workspace_id,
                    created_at,
                    updated_at,
                    deleted_at
                ),
                member_roles (
                    id,
                    name,
                    slug
                )
            `)
            .eq('user_id', user.id)
            .is('teams.deleted_at', null)
            .is('deleted_at', null);

        if (currentWorkspaceId) {
            query = query.eq('teams.workspace_id', currentWorkspaceId);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching user teams:', error);
            throw error;
        }

        // Flatten the structure and include role
        return (data || []).map((item) => {
            const teamItem = item as TeamJoinResult;
            const teamData = (Array.isArray(teamItem.teams) ? teamItem.teams[0] : teamItem.teams) as Team;
            const roleData = Array.isArray(teamItem.member_roles) ? teamItem.member_roles[0] : teamItem.member_roles;
            return {
                ...teamData,
                role: roleData?.slug
            };
        }) as Team[];
    },

    // Create a new team
    createTeam: async (name: string, workspaceId: string, slug?: string): Promise<Team> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const teamId = crypto.randomUUID();

        // Sanitize slug: lowercase, replace spaces and special chars with hyphens
        const rawSlug = slug || `team-${Date.now()}`;
        const finalSlug = rawSlug.toLowerCase()
            .replace(/\s+/g, '-')     // Replace spaces with -
            .replace(/[^\w-]+/g, '')  // Remove all non-word chars
            .replace(/--+/g, '-')     // Replace multiple - with single -
            .replace(/^-+/, '')       // Trim - from start
            .replace(/-+$/, '');      // Trim - from end

        const now = new Date().toISOString();

        // 1. Create the team (Client-side ID to avoid RLS Select issues)
        const { error: teamError } = await supabase
            .from('teams')
            .insert({
                id: teamId,
                workspace_id: workspaceId,
                name,
                slug: finalSlug,
                created_at: now,
                updated_at: now
            });

        if (teamError) {
            console.error('Error creating team:', teamError);
            throw teamError;
        }

        // 2. Check if membership was created automatically (by database trigger)
        const { data: existingMember } = await supabase
            .from('team_members')
            .select('id')
            .eq('team_id', teamId)
            .eq('user_id', user.id)
            .is('deleted_at', null)
            .maybeSingle();

        if (existingMember) {
            return {
                id: teamId,
                name,
                slug: finalSlug,
                created_at: now,
                updated_at: now
            } as Team;
        }

        // 3. If not, manually add current user as owner
        const { data: ownerRole } = await supabase
            .from('member_roles')
            .select('id')
            .ilike('slug', 'owner')
            .maybeSingle();

        const { error: memberError } = await supabase
            .from('team_members')
            .insert({
                team_id: teamId,
                user_id: user.id,
                role_id: ownerRole?.id
            });

        if (memberError) {
            console.error('Error adding user to team:', memberError);
            throw memberError;
        }

        return {
            id: teamId,
            name,
            slug: finalSlug,
            created_at: now,
            updated_at: now
        } as Team;
    },

    // Update team
    updateTeam: async (id: string, updates: Partial<Team>): Promise<Team> => {
        const { data, error } = await supabase
            .from('teams')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating team:', error);
            throw error;
        }

        return data as Team;
    },

    // Delete team (only owner should be able to do this, handled by RLS ideally)
    deleteTeam: async (id: string): Promise<void> => {
        // Delete members first (cascade usually handles this, but good to be explicit if needed)
        // Assuming Postgres ON DELETE CASCADE is set up for team_members.

        const { error } = await supabase
            .from('teams')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error('Error deleting team:', error);
            throw error;
        }
    },

    // Get members of a team
    getTeamMembers: async (teamId: string): Promise<TeamMemberWithProfile[]> => {
        const { data, error } = await supabase
            .from('team_members')
            .select(`
                *,
                member_roles(name, slug),
                profiles:user_id(id, auth_uid, email, name, avatar_url)
            `)
            .eq('team_id', teamId)
            .is('deleted_at', null);

        if (error) {
            console.error('Error fetching team members:', error);
            throw error;
        }

        return (data || []).map(member => ({
            ...member,
            profiles: member.profiles || null,
            role: member.member_roles?.slug || 'member'
        }));
    },

    // Get members for multiple teams (Optimized)
    getMembersForTeams: async (teamIds: string[]): Promise<TeamMemberWithProfile[]> => {
        if (teamIds.length === 0) return [];

        const { data, error } = await supabase
            .from('team_members')
            .select(`
                *,
                member_roles(name, slug),
                profiles:user_id(id, auth_uid, email, name, avatar_url)
            `)
            .in('team_id', teamIds)
            .is('deleted_at', null);

        if (error) {
            console.error('Error fetching team members:', error);
            throw error;
        }

        return (data || []).map(member => ({
            ...member,
            profiles: member.profiles || null,
            role: member.member_roles?.slug || 'member'
        }));
    },

    // Invite a member
    inviteMember: async (teamId: string, email: string, roleSlug: string = 'member'): Promise<TeamInvitation> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // 1. Get the role ID for the slug by fetching all roles (more reliable with RLS)
        const { data: allRoles, error: roleError } = await supabase
            .from('member_roles')
            .select('id, slug');

        if (roleError) throw roleError;
        const roleData = allRoles?.find(r => r.slug.toLowerCase() === roleSlug.toLowerCase());

        if (!roleData) {
            console.error('Error: Role not found. Available roles:', allRoles);
            throw new Error(`Papel "${roleSlug}" não encontrado no sistema.`);
        }

        const token = crypto.randomUUID();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        const { data, error } = await supabase
            .from('team_invitations')
            .insert({
                team_id: teamId,
                email,
                role_id: roleData.id,
                token,
                invited_by: user.id,
                expires_at: expiresAt.toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error('Error detail from Supabase:', error);
            throw error;
        }

        return data;
    },

    // Get pending invitations for a specific team (Admin view)
    getTeamInvitations: async (teamId: string): Promise<TeamInvitation[]> => {
        const { data, error } = await supabase
            .from('team_invitations')
            .select('*, member_roles(name, slug)')
            .eq('team_id', teamId)
            .is('response', null)
            .is('deleted_at', null)
            .gt('expires_at', new Date().toISOString());

        if (error) throw error;

        return (data || []).map(invite => ({
            ...invite,
            role: invite.member_roles?.slug || 'member'
        }));
    },

    // Get pending invitations for the current user (User view)
    getMyPendingInvitations: async (): Promise<TeamInvitation[]> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !user.email) return [];

        // Using RPC to bypass RLS restrictions on teams/profiles tables for non-members
        const { data, error } = await supabase
            .rpc('get_my_pending_invitations');

        if (error) {
            console.error("Error fetching my invitations:", error);
            // Don't throw to avoid blocking UI, just return empty
            return [];
        }

        return data || [];
    },

    // Respond to an invitation
    respondToInvitation: async (invitationId: string, accept: boolean): Promise<void> => {
        const { error } = await supabase
            .from('team_invitations')
            .update({
                response: accept,
                accepted_at: accept ? new Date().toISOString() : null
            })
            .eq('id', invitationId);

        if (error) throw error;

        // No manual member insertion here. Database trigger handles it.
    },

    // Cancel invitation
    cancelInvitation: async (invitationId: string): Promise<void> => {
        const { error } = await supabase
            .from('team_invitations')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', invitationId);

        if (error) throw error;
    },

    // Remove member
    removeMember: async (teamId: string, userId: string): Promise<void> => {
        const { error } = await supabase
            .from('team_members')
            .update({ deleted_at: new Date().toISOString() })
            .eq('team_id', teamId)
            .eq('user_id', userId);

        if (error) throw error;
    },

    // Update member role
    updateMemberRole: async (teamId: string, userId: string, roleSlug: string): Promise<void> => {
        const { data: allRoles, error: roleError } = await supabase
            .from('member_roles')
            .select('id, slug');

        if (roleError) throw roleError;
        const roleData = allRoles?.find(r => r.slug.toLowerCase() === roleSlug.toLowerCase());

        if (!roleData) throw new Error("Papel não encontrado");

        const { error } = await supabase
            .from('team_members')
            .update({ role_id: roleData.id })
            .eq('team_id', teamId)
            .eq('user_id', userId);

        if (error) throw error;
    },

    // Transfer ownership
    transferOwnership: async (teamId: string, newOwnerUserId: string): Promise<void> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data: allRoles, error: rolesError } = await supabase
            .from('member_roles')
            .select('id, slug');

        if (rolesError) throw rolesError;
        const ownerRole = allRoles?.find(r => r.slug?.toLowerCase() === 'owner');
        const adminRole = allRoles?.find(r => r.slug?.toLowerCase() === 'admin');

        if (!ownerRole || !adminRole) throw new Error("Papéis 'owner' ou 'admin' não encontrados");

        const { error: err1 } = await supabase
            .from('team_members')
            .update({ role_id: adminRole.id })
            .eq('team_id', teamId)
            .eq('user_id', user.id);

        if (err1) throw err1;

        const { error: err2 } = await supabase
            .from('team_members')
            .update({ role_id: ownerRole.id })
            .eq('team_id', teamId)
            .eq('user_id', newOwnerUserId);

        if (err2) throw err2;
    },

    // Ensure the user has at least one team, creating one if necessary (Workspace-aware)
    ensureOneTeam: async (): Promise<string> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // 1. Ensure Workspace Exists (Migration Logic)
        const workspace = (await workspaceService.getMyWorkspaces())[0];
        let workspaceId = workspace?.id;

        if (!workspaceId) {
            // If literally no workspace, we create a default one (Onboarding fallback)
            // This assumes the user is new or has no access.
            console.log("No workspace found in ensureOneTeam, creating default...");
            const { workspace: newWs } = await workspaceService.createCompanyAndWorkspace(
                'Minha Empresa',
                '00000000000',
                'Workspace Principal'
            );
            workspaceId = newWs.id;
        }

        // 2. Check if user is already in a team (ANY team, or specific to workspace?)
        // Ideally we want a team in THIS workspace.
        const { data: teamsInWorkspace, error: teamError } = await supabase
            .from('teams')
            .select('id')
            .eq('workspace_id', workspaceId)
            .limit(1);

        if (teamsInWorkspace && teamsInWorkspace.length > 0) {
            // Need to check if I am a member? 
            // The query above doesn't check membership, just existence in workspace.
            // But usually seeing the team means RLS allows it (member).
            return teamsInWorkspace[0].id;
        }

        // 3. If no team in this workspace, create one.
        console.log("No team found in workspace, creating default team...");

        try {
            const teamId = crypto.randomUUID();
            const slug = `team-${user.id.slice(0, 8)}-${Date.now()}`;
            const now = new Date().toISOString();

            const { error: createTeamError } = await supabase
                .from('teams')
                .insert({
                    id: teamId,
                    workspace_id: workspaceId,
                    name: 'Minha Equipe',
                    slug: slug,
                    created_at: now,
                    updated_at: now
                });

            if (createTeamError) throw createTeamError;

            // Add member (Owner)
            const { data: allRoles } = await supabase
                .from('member_roles')
                .select('id, slug');

            const ownerRole = allRoles?.find(r => r.slug?.toLowerCase() === 'owner');

            const { error: memberError } = await supabase
                .from('team_members')
                .insert({
                    team_id: teamId,
                    user_id: user.id,
                    role_id: ownerRole?.id
                });

            if (memberError) throw memberError;

            return teamId;

        } catch (error) {
            console.error('Error creating default team in ensureOneTeam:', error);
            throw new Error("Could not create default team");
        }
    }
};

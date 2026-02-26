
import { supabase } from "./supabaseClient";
import { Workspace } from "@/types/workspace";
import { STORAGE_KEYS, EVENTS } from "@/lib/constants";
import { SubscriptionStatus } from "@/types/billing";

interface WorkspaceRpcResult {
    id: string;
    company_id: string;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    role: string;
    company_name: string;
}

export const workspaceService = {
    // Get all workspaces the current user belongs to
    getMyWorkspaces: async (): Promise<Workspace[]> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        try {
            const { data, error } = await supabase
                .rpc('get_user_workspaces');

            if (error) throw error;

            return (data || []).map((ws: WorkspaceRpcResult) => ({
                id: ws.id,
                company_id: ws.company_id,
                name: ws.name,
                slug: ws.slug,
                created_at: ws.created_at,
                updated_at: ws.updated_at,
                role: ws.role,
                company_name: ws.company_name,
                // Map for compatibility with components expecting company object
                company: {
                    name: ws.company_name
                }
            })) as Workspace[];

        } catch (error) {
            console.error("Error fetching workspaces via RPC:", error);

            // Fallback (or re-throw if critical) - for now, we re-throw because the view fallback 
            // might also be outdated or we want to enforce RPC usage.
            throw error;
        }
    },

    // Get current workspace ID
    getCurrentWorkspaceId: async (): Promise<string | null> => {
        const storedId = localStorage.getItem(STORAGE_KEYS.CURRENT_WORKSPACE_ID);
        if (storedId) return storedId;

        const workspaces = await workspaceService.getMyWorkspaces();
        if (workspaces.length > 0) {
            const defaultId = workspaces[0].id;
            localStorage.setItem(STORAGE_KEYS.CURRENT_WORKSPACE_ID, defaultId);
            return defaultId;
        }
        return null;
    },

    setCurrentWorkspaceId: (workspaceId: string) => {
        localStorage.setItem(STORAGE_KEYS.CURRENT_WORKSPACE_ID, workspaceId);
        window.dispatchEvent(new Event(EVENTS.WORKSPACE_CHANGED));
    },

    ensureOneWorkspace: async (): Promise<string> => {
        const currentId = await workspaceService.getCurrentWorkspaceId();
        if (currentId) return currentId;
        throw new Error("No workspace found. Please create a company/workspace.");
    },

    createCompanyAndWorkspace: async (companyName: string, workspaceName: string, slug: string): Promise<{ company: null, workspace: Workspace }> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // Fetch user's existing workspaces to find their company_id
        const workspaces = await workspaceService.getMyWorkspaces();
        const existingCompanyId = workspaces.find(w => w.company_id)?.company_id;

        if (!existingCompanyId) {
            throw new Error("Unable to determine user's company context. Cannot create workspace.");
        }

        // 2. Create Workspace via RPC (Atomic: Workspace + Team + Owner Member)
        // This solves the RLS permissions issue (creating user immediately becomes owner)
        const { data: workspace, error: workspaceError } = await supabase
            .rpc('create_complete_workspace', {
                p_company_id: existingCompanyId,
                p_name: workspaceName,
                p_slug: slug
            });

        if (workspaceError) throw workspaceError;

        // Determine the ID from the returned JSONB or object
        // RPC returns JSONB of the workspace row
        const createdWorkspace = workspace as Workspace;

        // Force a refresh of the local storage or cache if needed
        workspaceService.setCurrentWorkspaceId(createdWorkspace.id);

        return { company: null, workspace: createdWorkspace };
    },

    updateWorkspace: async (id: string, name: string, slug: string): Promise<Workspace> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('workspaces')
            .update({ name, slug, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Workspace;
    },

    deleteWorkspace: async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('workspaces')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id);

        if (error) throw error;
    },

    getWorkspaceBillingInfo: async (workspaceId: string): Promise<import("@/types/billing").WorkspaceBillingInfo> => {
        const { data: limitsData, error: limitsError } = await supabase.rpc('get_workspace_limits', {
            target_workspace_id: workspaceId
        });

        if (limitsError) {
            console.error('Error fetching workspace limits:', limitsError);
        }

        let { data: subData } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('workspace_id', workspaceId)
            .in('status', ['ACTIVE'])
            .order('end_date', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (!subData) {
            const { data: fallbackSub } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('workspace_id', workspaceId)
                .is('deleted_at', null)
                .order('end_date', { ascending: false })
                .limit(1)
                .maybeSingle();

            subData = fallbackSub;
        }

        const { count: softwaresCount } = await supabase
            .from('softwares')
            .select('*', { count: 'exact', head: true })
            .eq('workspace_id', workspaceId)
            .is('deleted_at', null);

        const { count: credentialsCount } = await supabase
            .from('accesses')
            .select('*', { count: 'exact', head: true })
            .eq('workspace_id', workspaceId)
            .is('deleted_at', null);

        const { data: teamsData } = await supabase
            .from('teams')
            .select('id')
            .eq('workspace_id', workspaceId)
            .is('deleted_at', null);

        let uniqueUsers = 0;
        if (teamsData && teamsData.length > 0) {
            const teamIds = teamsData.map(t => t.id);
            const { data: teamMembers } = await supabase
                .from('team_members')
                .select('user_id')
                .in('team_id', teamIds)
                .is('deleted_at', null);

            uniqueUsers = new Set(teamMembers?.map(tm => tm.user_id)).size;
        }

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        const { data: wuUsage } = await supabase
            .from('workunits_usage')
            .select('*')
            .eq('workspace_id', workspaceId)
            .eq('year', currentYear)
            .eq('month', currentMonth)
            .maybeSingle();

        const rpcLimits = limitsData?.limits || {};
        const totalWU = rpcLimits.work_units?.total || subData?.work_units || 0;
        const maxSoftwares = rpcLimits.softwares ?? (subData?.softwares_limit || 0);
        const maxUsers = rpcLimits.users ?? (subData?.users_limit || 0);
        const planName = limitsData?.plan_name || 'Plano Desconhecido';

        const isActive = subData &&
            (subData.status === 'ACTIVE' || subData.status === 'active') &&
            new Date(subData.end_date) > new Date();

        const currentUsedWU = wuUsage?.workunits_used || 0;

        const billingInfo: import("@/types/billing").WorkspaceBillingInfo = {
            subscription: subData ? {
                id: subData.id,
                plan_id: subData.plan_id,
                plan_name: planName,
                status: subData.status as SubscriptionStatus,
                valid_until: subData.end_date,
                limits: {
                    max_softwares: maxSoftwares,
                    max_users: maxUsers,
                    max_teams: subData.teams_limit || 9999,
                    monthly_workunits: totalWU
                }
            } : null,
            usage: {
                softwares_count: softwaresCount || 0,
                users_count: uniqueUsers || 0,
                teams_count: teamsData?.length || 0,
                credentials_count: credentialsCount || 0
            },
            workUnits: {
                year: currentYear,
                month: currentMonth,
                used: currentUsedWU,
                limit: totalWU,
                remaining: Math.max(0, totalWU - currentUsedWU)
            },
            packages: [],
            is_blocked: !subData || !isActive
        };

        return billingInfo;
    }
};

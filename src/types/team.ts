export interface Team {
    id: string;
    workspace_id: string;
    name: string;
    slug: string | null;
    created_at: string;
    updated_at: string;
    role?: string; // The role of the current user in this team
}

export interface TeamMember {
    id: string;
    team_id: string;
    user_id: string;
    role: 'owner' | 'admin' | 'member';
    joined_at: string;
}

export interface TeamInvitation {
    id: string;
    team_id: string;
    email: string;
    token: string;
    role: string;
    invited_by: string; // user_id
    created_at: string;
    expires_at: string;
    accepted_at: string | null;
}

export interface MemberRole {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface TeamMemberWithProfile extends TeamMember {
    profiles: {
        id: string;
        email: string;
        name: string;
        avatar_url: string | null;
    } | null;
}

export interface TeamInvitationWithDetails extends TeamInvitation {
    teams?: {
        name: string;
        slug: string;
    };
    member_roles?: {
        name: string;
        slug: string;
    };
    invited_by_profile?: {
        name: string;
        email: string;
    };
}

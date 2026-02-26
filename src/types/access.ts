export interface AccessCategory {
    id: string;
    label: string;
    value: string;
    type?: AccessCategoryType;
    icon?: string;
    created_at?: string;
}

export enum AccessCategoryType {
    SOCIAL_MEDIA = 'SOCIAL_MEDIA',
    DEVELOPMENT = 'DEVELOPMENT',
    MARKETING = 'MARKETING',
    FINANCE = 'FINANCE',
    COMMUNICATION = 'COMMUNICATION',
    ADMINISTRATIVE = 'ADMINISTRATIVE',
    OTHER = 'OTHER'
}

export interface Access {
    id: string;
    name: string;
    category_id: string;
    category?: AccessCategory; // Joined data
    credentials: Record<string, unknown>; // Stores all flexible data (username, password, platform, etc.)
    is_active: boolean;
    last_checked_at?: string;
    created_at: string;
    updated_at: string;
    workspace_id: string;
    team_id: string;
}

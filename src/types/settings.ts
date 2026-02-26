export type IntegrationCategory = 'VERSION_CONTROL' | 'HOSTING' | 'DESIGN' | 'BACKEND' | 'COMMUNICATION';

export interface IntegrationProvider {
    id: string;
    slug: string;
    name: string;
    description: string;
    category: IntegrationCategory;
    icon_key: string;
    docs_url?: string;
    is_active: boolean;
}

export interface UserIntegration {
    id: string;
    user_id: string;
    provider_id: string;
    provider?: IntegrationProvider; // Joined data
    access_token?: string;
    connected: boolean; // Helper from service
    metadata: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

export interface UserPreferences {
    user_id?: string;
    theme: 'light' | 'dark' | 'system';
    language: 'pt-BR' | 'en-US' | 'es-ES';
    timezone: string;
    interface_density: 'compact' | 'normal' | 'comfortable';
    high_contrast: boolean;
    reduce_motion: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface NotificationPreferences {
    user_id?: string;
    channel_email: boolean;
    channel_sms: boolean;
    channel_push: boolean;
    cat_security: boolean;
    cat_service_updates: boolean;
    cat_usage_alerts: boolean;
    cat_billing: boolean;
    cat_marketing: boolean;
    created_at?: string;
    updated_at?: string;
}

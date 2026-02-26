import { supabase } from "./supabaseClient";
import { IntegrationProvider, UserIntegration } from "@/types/settings";

export const integrationService = {
    // 1. Get all available providers (Catalog)
    async getProviders(): Promise<IntegrationProvider[]> {
        const { data, error } = await supabase
            .from("integration_providers")
            .select("*")
            .eq("is_active", true)
            .is('deleted_at', null)
            .order("category", { ascending: true })
            .order("name", { ascending: true });

        if (error) {
            console.error("Error fetching providers:", error);
            return [];
        }

        return data || [];
    },

    // 2. Get user's active connections
    async getUserIntegrations(): Promise<UserIntegration[]> {
        const { data, error } = await supabase
            .from("user_integrations")
            .select("*, provider:integration_providers(*)") // Join with provider details
            .is('deleted_at', null);

        if (error) {
            console.error("Error fetching user integrations:", error);
            return [];
        }

        // Map to simpler structure if needed, or return as is with joined provider
        return data?.map(item => ({
            ...item,
            connected: true, // If record exists, it's connected
        })) || [];
    },

    // 3. Connect (Upsert) - Generic for any provider
    async connectProvider(slug: string, token: string, metadata: Record<string, unknown> = {}): Promise<UserIntegration | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // First find provider ID by slug
        const { data: provider } = await supabase
            .from("integration_providers")
            .select("id")
            .eq("slug", slug)
            .single();

        if (!provider) throw new Error("Provider not found");

        const { data, error } = await supabase
            .from("user_integrations")
            .upsert({
                user_id: user.id,
                provider_id: provider.id,
                access_token: token,
                metadata: metadata,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id, provider_id' })
            .select()
            .single();

        if (error) throw error;
        return data as UserIntegration;
    },

    // 4. Disconnect
    async disconnectProvider(integrationId: string): Promise<void> {
        const { error } = await supabase
            .from("user_integrations")
            .update({ deleted_at: new Date().toISOString() })
            .eq("id", integrationId);

        if (error) throw error;
    }
};

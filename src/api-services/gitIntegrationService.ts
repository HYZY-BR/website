import { supabase } from "./supabaseClient";
import { UserIntegration } from "@/types/settings";

export const gitIntegrationService = {
    async getIntegrations(): Promise<UserIntegration[]> {
        // Fetch user integrations joined with provider details
        // Filtering could be added here if we only want 'VERSION_CONTROL' category
        const { data, error } = await supabase
            .from("user_integrations")
            .select(`
                *,
                provider:integration_providers(*)
            `)
            .is('deleted_at', null)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching integrations:", error);
            return [];
        }

        // Filter purely in JS if needed, or rely on RLS/Query. 
        // For now returning all integrations as the UI might filter.
        return (data as unknown as UserIntegration[]) || [];
    },

    async connectProvider(providerSlug: string, token: string, username: string, providerUserId: string): Promise<UserIntegration | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // 1. Get Provider ID
        const { data: providerData, error: providerError } = await supabase
            .from("integration_providers")
            .select("id")
            .eq("slug", providerSlug)
            .single();

        if (providerError || !providerData) {
            throw new Error(`Provider ${providerSlug} not found`);
        }

        const providerId = providerData.id;

        // 2. Check if integration already exists
        const { data: existing } = await supabase
            .from("user_integrations")
            .select("id")
            .eq("user_id", user.id)
            .eq("provider_id", providerId)
            .is('deleted_at', null)
            .single();

        let result;

        const metadata = {
            username,
            provider_user_id: providerUserId,
            connected: true
        };

        if (existing) {
            // Update existing
            const { data, error } = await supabase
                .from("user_integrations")
                .update({
                    access_token: token,
                    metadata,
                    updated_at: new Date().toISOString()
                })
                .eq("id", existing.id)
                .select(`*, provider:integration_providers(*)`)
                .single();

            if (error) throw error;
            result = data as UserIntegration;
        } else {
            // Create new
            const { data, error } = await supabase
                .from("user_integrations")
                .insert({
                    user_id: user.id,
                    provider_id: providerId,
                    access_token: token,
                    metadata
                })
                .select(`*, provider:integration_providers(*)`)
                .single();

            if (error) throw error;
            result = data as UserIntegration;
        }

        return result;
    },

    async disconnectProvider(integrationId: string): Promise<void> {
        const { error } = await supabase
            .from("user_integrations")
            .update({ deleted_at: new Date().toISOString() })
            .eq("id", integrationId);

        if (error) {
            console.error("Error disconnecting provider:", error);
            throw error;
        }
    },

    // Mock function to simulate list of repositories
    async listRepositories(integrationId: string): Promise<{ id: number; name: string; private: boolean; html_url: string }[]> {
        // 1. Get token
        const { data, error } = await supabase
            .from("user_integrations")
            .select(`
                access_token,
                provider:integration_providers(slug)
            `)
            .eq("id", integrationId)
            .single();

        if (error || !data?.access_token) {
            throw new Error("Integration not found or missing token");
        }

        const providerData = data.provider as unknown as { slug: string } | { slug: string }[];
        const provider = Array.isArray(providerData) ? providerData[0] : providerData;
        const providerSlug = provider?.slug;

        console.log(`Fetching repos for ${providerSlug} with token ending in ...${data.access_token.slice(-4)}`);

        // Returning dummy data for now
        return [
            { id: 101, name: "my-awesome-project", private: true, html_url: "https://github.com/user/my-awesome-project" },
            { id: 102, name: "website-v2", private: false, html_url: "https://github.com/user/website-v2" },
            { id: 103, name: "api-service", private: true, html_url: "https://github.com/user/api-service" },
        ];
    }
};

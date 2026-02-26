import { supabase } from "./supabaseClient";
import { UserPreferences, NotificationPreferences } from "@/types/settings";

export const settingsService = {
    // User Preferences
    async getUserPreferences(): Promise<UserPreferences | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from("user_preferences")
            .select("*")
            .eq("user_id", user.id)
            .single();

        if (error && error.code !== "PGRST116") { // Ignore 'not found' error
            console.error("Error fetching user preferences:", error);
            return null;
        }

        // Default values if not found using a fallback object
        return data || {
            theme: 'system',
            language: 'pt-BR',
            timezone: 'America/Sao_Paulo',
            interface_density: 'normal',
            high_contrast: false,
            reduce_motion: false
        };
    },

    async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from("user_preferences")
            .upsert({
                user_id: user.id,
                ...preferences,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error("Error saving user preferences:", error);
            throw error;
        }

        return data;
    },

    // Notification Preferences
    async getNotificationPreferences(): Promise<NotificationPreferences | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from("notification_preferences")
            .select("*")
            .eq("user_id", user.id)
            .single();

        if (error && error.code !== "PGRST116") {
            console.error("Error fetching notification preferences:", error);
            return null;
        }

        return data || {
            channel_email: true,
            channel_sms: false,
            channel_push: true,
            cat_security: true,
            cat_service_updates: true,
            cat_usage_alerts: true,
            cat_billing: true,
            cat_marketing: false
        };
    },

    async updateNotificationPreferences(preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from("notification_preferences")
            .upsert({
                user_id: user.id,
                ...preferences,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error("Error saving notification preferences:", error);
            throw error;
        }

        return data;
    }
};

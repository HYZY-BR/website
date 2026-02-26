import { supabase } from "./supabaseClient";
import { Notification } from "@/types/notification";

export const notificationService = {
    async getNotifications(): Promise<Notification[]> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Usuário não autenticado");

        const { data, error } = await supabase
            .from("notifications")
            .select("*")
            .eq("user_id", user.id)
            .is('deleted_at', null)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data || [];
    },

    async getUnreadCount(): Promise<number> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return 0;

        const { count, error } = await supabase
            .from("notifications")
            .select("*", { count: 'exact', head: true })
            .eq("user_id", user.id)
            .eq("is_read", false)
            .is('deleted_at', null);

        if (error) throw error;
        return count || 0;
    },

    async markAsRead(id: string): Promise<void> {
        const { error } = await supabase
            .from("notifications")
            .update({ is_read: true })
            .eq("id", id);

        if (error) throw error;
    },

    async markAllAsRead(): Promise<void> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Usuário não autenticado");

        const { error } = await supabase
            .from("notifications")
            .update({ is_read: true })
            .eq("user_id", user.id)
            .eq("is_read", false);

        if (error) throw error;
    },

    async deleteNotification(id: string): Promise<void> {
        const { error } = await supabase
            .from("notifications")
            .update({ deleted_at: new Date().toISOString() })
            .eq("id", id);

        if (error) throw error;
    }
};

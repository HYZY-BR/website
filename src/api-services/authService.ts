
import { supabase } from "./supabaseClient";
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

export const authService = {
    // Get current user session
    async getSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        return data.session;
    },

    // Get current user
    async getUser(): Promise<User | null> {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },

    // Login with email and password
    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    // Register new user
    async register(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    // Logout
    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    // Update email
    async updateEmail(newEmail: string) {
        const { data, error } = await supabase.auth.updateUser({ email: newEmail });
        if (error) throw error;
        return data;
    },

    // Update password
    async updatePassword(newPassword: string) {
        const { data, error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        return data;
    },

    // Reset password (send recovery email)
    async resetPasswordForEmail(email: string) {
        // redirectTo should point to the page where they handle the new password (e.g., /reset-password or just /)
        // For now, we'll assume they just get a link to click.
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/update-password',
        });
        if (error) throw error;
        return data;
    },

    // Real-time auth state subscription
    onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
        return supabase.auth.onAuthStateChange(callback);
    }
};

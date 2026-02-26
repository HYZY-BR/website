import { supabase } from "./supabaseClient";
import { Profile, Company } from "@/types/profile";

export const profileService = {
    async getProfile(): Promise<Profile | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) {
            console.error("Error fetching profile:", error);
            return null;
        }

        return data;
    },

    async updateProfile(profile: Partial<Profile>): Promise<Profile | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('profiles')
            .update(profile)
            .eq('id', user.id)
            .select()
            .single();

        if (error) {
            console.error("Error updating profile:", error);
            throw error;
        }

        return data;
    },

    async getCompany(): Promise<Company | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('companies')
            .select('*')
            .eq('owner_id', user.id)
            .maybeSingle();

        if (error) {
            console.error("Error fetching company:", error);
            return null;
        }

        return data;
    },

    async updateCompany(companyData: Partial<Company>): Promise<Company | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        // First try to find existing company
        const { data: existing } = await supabase
            .from('companies')
            .select('id')
            .eq('owner_id', user.id)
            .maybeSingle();

        let data, error;

        if (existing) {
            // Update
            const response = await supabase
                .from('companies')
                .update(companyData)
                .eq('id', existing.id)
                .select()
                .single();
            data = response.data;
            error = response.error;
        } else {
            // Create (Fallback if not exists)
            const response = await supabase
                .from('companies')
                .insert({
                    ...companyData,
                    owner_id: user.id
                })
                .select()
                .single();
            data = response.data;
            error = response.error;
        }

        if (error) {
            console.error("Error updating company:", error);
            throw error;
        }

        return data;
    },

    async uploadAvatar(file: File): Promise<string | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Error uploading avatar:', uploadError);
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        return publicUrl;
    }
};

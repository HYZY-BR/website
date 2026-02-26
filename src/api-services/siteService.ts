import { supabase } from "./supabaseClient";
import { Site } from "@/types/site";
import { ServiceStatus } from "@/types/enums";
import { teamService } from "./teamService";

export const siteService = {
    getAll: async (): Promise<Site[]> => {
        const { data, error } = await supabase
            .from('sites')
            .select('*')
            .is('deleted_at', null)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching sites:', error);
            throw error;
        }

        return data as Site[];
    },

    getById: async (id: string): Promise<Site> => {
        const { data, error } = await supabase
            .from('sites')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching site ${id}:`, error);
            throw error;
        }

        return data as Site;
    },

    create: async (site: Omit<Site, "id" | "created_at" | "updated_at" | "team_id" | "disk_usage" | "bandwidth_usage">): Promise<Site> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // Efficiently ensure team exists
        const teamId = await teamService.ensureOneTeam();

        const newSite = {
            ...site,
            team_id: teamId,
            disk_usage: 0,
            bandwidth_usage: 0
        };

        const { data, error } = await supabase
            .from('sites')
            .insert(newSite)
            .select('*')
            .single();

        if (error) {
            console.error('Error creating site:', error);
            throw error;
        }

        return data as Site;
    },

    update: async (id: string, updates: Partial<Omit<Site, "id" | "created_at" | "updated_at" | "team_id">>): Promise<Site> => {
        const { data, error } = await supabase
            .from('sites')
            .update(updates)
            .eq('id', id)
            .select('*')
            .single();

        if (error) {
            console.error('Error updating site:', error);
            throw error;
        }

        return data as Site;
    },

    delete: async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('sites')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error('Error deleting site:', error);
            throw error;
        }
    }
};

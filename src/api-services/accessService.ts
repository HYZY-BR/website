import { Access, AccessCategory } from "@/types/access";
import { supabase } from "./supabaseClient";
import { teamService } from "./teamService";

export const accessService = {
    getCategories: async (): Promise<AccessCategory[]> => {
        const { data, error } = await supabase
            .from('accesses_categories')
            .select('*')
            .is('deleted_at', null)
            .order('label', { ascending: true });

        if (error) {
            console.error('Error fetching access categories:', error);
            throw error;
        }

        return data as AccessCategory[];
    },

    getAll: async (workspaceId: string): Promise<Access[]> => {
        if (!workspaceId) return [];

        const { data, error } = await supabase
            .from('accesses')
            .select('*, category:accesses_categories(*)')
            .eq('workspace_id', workspaceId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching accesses:', error);
            throw error;
        }

        return data as Access[];
    },

    getByCategory: async (categoryId: string, workspaceId: string): Promise<Access[]> => {
        if (!workspaceId) return [];

        const { data, error } = await supabase
            .from('accesses')
            .select('*, category:accesses_categories(*)')
            .eq('category_id', categoryId)
            .eq('workspace_id', workspaceId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching accesses by category:', error);
            throw error;
        }

        return data as Access[];
    },

    create: async (access: Omit<Access, "id" | "created_at" | "updated_at" | "team_id" | "category">, workspaceId: string): Promise<Access> => {
        // Find a valid team in this workspace to associate with
        const { data: team } = await supabase
            .from('teams')
            .select('id')
            .eq('workspace_id', workspaceId)
            .limit(1)
            .maybeSingle();

        if (!team) {
            // Need at least one team in the workspace to associate access?? 
            // If the schema requires team_id, we need this. 
            // Let's assume we need it. If the user has access to the workspace, they should see at least one team usually.
            throw new Error("Nenhuma equipe encontrada neste workspace para associar o acesso.");
        }

        const newAccess = {
            ...access,
            team_id: team.id,
            workspace_id: workspaceId
        };

        const { data, error } = await supabase
            .from('accesses')
            .insert(newAccess)
            .select('*, category:accesses_categories(*)')
            .single();

        if (error) {
            console.error('Error creating access Payload:', newAccess);
            console.error('Error creating access Details:', JSON.stringify(error, null, 2));
            throw error;
        }

        return data as Access;
    },

    delete: async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('accesses')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error('Error deleting access:', error);
            throw error;
        }
    },

    update: async (id: string, updates: Partial<Omit<Access, "id" | "created_at" | "updated_at" | "team_id" | "category">>): Promise<Access> => {
        const { data, error } = await supabase
            .from('accesses')
            .update(updates)
            .eq('id', id)
            .select('*, category:accesses_categories(*)')
            .single();

        if (error) {
            console.error('Error updating access:', error);
            throw error;
        }

        return data as Access;
    }
};

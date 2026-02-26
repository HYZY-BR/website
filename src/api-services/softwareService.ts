import { supabase } from "./supabaseClient";
import { Software } from "@/types/software";
import { teamService } from "./teamService";
import { workspaceService } from "./workspaceService";
import { ServiceStatus, SoftwareType } from "@/types/enums";

export const softwareService = {
    getAll: async (): Promise<Software[]> => {
        try {
            const workspaceId = await workspaceService.getCurrentWorkspaceId();

            if (!workspaceId) return [];

            const { data, error } = await supabase
                .from('softwares')
                .select('*')
                .eq('workspace_id', workspaceId)
                .is('deleted_at', null)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching softwares:', error);
                throw error;
            }

            return data as Software[];
        } catch (error) {
            console.error("Error in getAll (softwares):", error);
            return [];
        }
    },

    create: async (softwareData: Partial<Software> & { name: string }, explicitWorkspaceId?: string): Promise<Software> => {
        const workspaceId = explicitWorkspaceId || await workspaceService.getCurrentWorkspaceId();
        const teamId = await teamService.ensureOneTeam(); // Keep team_id for backward compatibility/reference if needed, or remove if optional. Struct requires it.

        if (!workspaceId) throw new Error("No active workspace found.");

        const newSoftware = {
            name: softwareData.name,
            domain: softwareData.domain,
            accommodation: softwareData.accommodation,
            type: softwareData.type || SoftwareType.OTHER,
            status: softwareData.status || ServiceStatus.ACTIVE,
            workspace_id: workspaceId,
            team_id: teamId,
            disk_usage: 0,
            bandwidth_usage: 0,
            repository_url: softwareData.repository_url,
            readme: softwareData.readme,
            rls_config: softwareData.rls_config
        };

        console.log('🚨 [softwareService] Attempting to create software:', newSoftware);

        const { data, error } = await supabase
            .from('softwares')
            .insert(newSoftware)
            .select()
            .single();

        if (error) {
            console.error('🚨 [softwareService] Supabase Error Details:', JSON.stringify(error, null, 2));
            throw error;
        }

        console.log('✅ [softwareService] Software created successfully:', data);

        return data as Software;
    },

    update: async (id: string, softwareData: Partial<Software>): Promise<Software> => {
        // Prepare fields to update, filtering only valid columns
        const updatePayload: Partial<Software> & { updated_at: string } = {
            updated_at: new Date().toISOString()
        };

        if (softwareData.name !== undefined) updatePayload.name = softwareData.name;
        if (softwareData.domain !== undefined) updatePayload.domain = softwareData.domain;
        if (softwareData.accommodation !== undefined) updatePayload.accommodation = softwareData.accommodation;
        if (softwareData.type !== undefined) updatePayload.type = softwareData.type;
        if (softwareData.status !== undefined) updatePayload.status = softwareData.status;
        if (softwareData.repository_url !== undefined) updatePayload.repository_url = softwareData.repository_url;
        if (softwareData.readme !== undefined) updatePayload.readme = softwareData.readme;
        if (softwareData.rls_config !== undefined) updatePayload.rls_config = softwareData.rls_config;

        const { data, error } = await supabase
            .from('softwares')
            .update(updatePayload)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating software:', error);
            throw error;
        }

        return data as Software;
    },

    delete: async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('softwares')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error('Error deleting software:', error);
            throw error;
        }
    },

    getConfig: async (softwareId: string): Promise<import("@/types/software").SoftwareConfig | null> => {
        const { data, error } = await supabase
            .from('software_config')
            .select('*')
            .eq('software_id', softwareId)
            .maybeSingle();

        if (error) {
            console.error('Error fetching software config:', error);
            return null;
        }
        return data;
    },

    updateConfig: async (softwareId: string, config: Partial<import("@/types/software").SoftwareConfig>): Promise<import("@/types/software").SoftwareConfig> => {
        const { data, error } = await supabase
            .from('software_config')
            .upsert({ ...config, software_id: softwareId, updated_at: new Date().toISOString() }, { onConflict: 'software_id' })
            .select()
            .single();

        if (error) {
            console.error('Error updating software config:', error);
            throw error;
        }
        return data;
    }
};

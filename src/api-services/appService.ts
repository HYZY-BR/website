import { supabase } from "./supabaseClient";
import { App } from "@/types/app";
import { teamService } from "./teamService";
import { ServiceStatus, AppType } from "@/types/enums";

export const appService = {
    getAll: async (): Promise<App[]> => {
        // We need to filter by the user's team(s).
        // For now, let's assume we get the current team context or we query for all apps the user has access to via RLS.
        // If RLS is set up properly on 'apps' table referencing 'team_id' which references 'team_members',
        // then a simple select('*') might suffice if the user is authenticated.
        // However, explicit filtering by team_id is safer/cleaner if we want to support multiple teams in UI later.
        // But since we don't have a team selector in the UI context yet, we'll rely on RLS or fetch for the "default" team.

        // Let's get the team_id using ensureOneTeam to be consistent with creation.
        // OR, better, just select * and let RLS handle it?
        // The previous implementation in accessService just did select('*').
        // plansService does explicit filter by team_id.

        // I'll do explicit filter by first team found to be consistent with current single-team assumption.
        try {
            const teamId = await teamService.ensureOneTeam();

            const { data, error } = await supabase
                .from('apps')
                .select('*')
                .eq('team_id', teamId)
                .is('deleted_at', null)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching apps:', error);
                throw error;
            }

            return data as App[];
        } catch (error) {
            console.error("Error in getAll:", error);
            return []; // Return empty if no team or error, to avoid crashing UI completely
        }
    },

    create: async (appData: Partial<App> & { name: string }): Promise<App> => {
        const teamId = await teamService.ensureOneTeam();

        const newApp = {
            name: appData.name,
            domain: appData.domain,
            type: appData.type || AppType.APP,
            status: appData.status || ServiceStatus.ACTIVE,
            team_id: teamId,
            disk_usage: 0,
            bandwidth_usage: 0,
            repository_url: appData.repository_url,
            readme: appData.readme,
            rls_config: appData.rls_config
        };

        const { data, error } = await supabase
            .from('apps')
            .insert(newApp)
            .select()
            .single();

        if (error) {
            console.error('Error creating app:', error);
            throw error;
        }

        return data as App;
    },

    update: async (id: string, appData: Partial<App>): Promise<App> => {
        const { data, error } = await supabase
            .from('apps')
            .update({
                name: appData.name,
                domain: appData.domain,
                status: appData.status,
                repository_url: appData.repository_url,
                readme: appData.readme,
                rls_config: appData.rls_config,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating app:', error);
            throw error;
        }

        return data as App;
    },

    delete: async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('apps')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error('Error deleting app:', error);
            throw error;
        }
    }
};

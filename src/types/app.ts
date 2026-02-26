import { ServiceStatus } from "./enums";

export interface App {
    id: string;
    name: string;
    type: string;
    domain?: string;
    status: ServiceStatus;
    disk_usage?: number;
    bandwidth_usage?: number;
    created_at: string;
    updated_at: string;
    workspace_id: string;
    team_id: string;
    repository_url?: string;
    readme?: string;
    rls_config?: Record<string, unknown>;
}

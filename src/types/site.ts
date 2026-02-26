import { ServiceStatus } from "./enums";

export interface Site {
    id: string;
    name: string;
    domain?: string;
    status: ServiceStatus;
    disk_usage?: number;
    bandwidth_usage?: number;
    team_id: string;
    workspace_id: string;
    created_at?: string;
    updated_at?: string;
    repository_url?: string;
    readme?: string;
    rls_config?: Record<string, unknown>;
}

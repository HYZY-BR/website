import { ServiceStatus, SoftwareType } from "./enums";

export interface Software {
    id: string;
    workspace_id: string;
    team_id: string;
    name: string;
    type: SoftwareType;
    domain?: string;
    accommodation?: string;
    status: ServiceStatus;
    config?: SoftwareConfig;
    repository_url?: string;
    readme?: string;
    disk_usage?: number;
    bandwidth_usage?: number;
    created_at: string;
    updated_at: string;
    rls_config?: Record<string, unknown>;
}

export interface SoftwareConfig {
    id: string;
    software_id: string;
    deploy_provider?: string;
    build_command?: string;
    output_directory?: string;
    root_directory?: string;
    env_variables?: Record<string, string>;
    advanced_settings?: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

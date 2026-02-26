export type SubscriptionStatus = 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'UNPAID' | 'INCOMPLETE' | 'INCOMPLETE_EXPIRED' | 'TRIALING';

export interface PlanLimits {
    max_softwares: number;
    max_users: number;
    max_teams: number;
    monthly_workunits: number;
}

export interface ResourceUsage {
    softwares_count: number;
    users_count: number;
    teams_count: number;
    credentials_count: number;
}

export interface WorkUnitsUsage {
    year: number;
    month: number;
    used: number;
    limit: number;
    remaining: number;
}

export interface WorkUnitPackage {
    id: string;
    amount: number;
    valid_until: string;
}

export interface DetailedSubscription {
    id: string;
    plan_id?: string;
    plan_name: string;
    status: SubscriptionStatus;
    valid_until: string;
    limits: PlanLimits;
}

export interface WorkspaceBillingInfo {
    subscription: DetailedSubscription | null;
    usage: ResourceUsage;
    workUnits: WorkUnitsUsage;
    packages: WorkUnitPackage[];
    is_blocked: boolean;
}

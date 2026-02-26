export interface Plan {
    id: string;
    name: string;
    description: string;
    features: string[];
    disk_space: number;
    bandwidth: number;
    max_sites: number;
    max_apps: number;
    is_active: boolean;
    slug: string;
    category_id?: string;
    has_documentation: boolean;
    created_at?: string;
    updated_at?: string;
    tags?: string[];
    work_units: number;
    softwares_limit: number;
    users_limit: number;
    teams_limit: number;
}

export interface PlanPrice {
    id: string;
    plan_id: string;
    stripe_price_id?: string;
    periodicity: 'MONTHLY' | 'SEMIANNUAL' | 'ANNUAL' | 'ONE_TIME';
    amount: number;
    is_active: boolean;
}

export interface PlanWithPrices extends Plan {
    prices: PlanPrice[];
}

export interface Subscription {
    id: string;
    plan_id: string;
    start_date: string;
    end_date: string | null;
    auto_renew: boolean;
    status: string;
    periodicity: 'MONTHLY' | 'SEMIANNUAL' | 'ANNUAL' | 'ONE_TIME';
    workspace_id: string;
    plans?: Plan;
    work_units: number;
    softwares_limit: number;
    users_limit: number;
    teams_limit: number;
}

export interface WorkUnitsUsage {
    id: string;
    year: number;
    month: number;
    workunits_used: number;
    workunits_limit: number;
    workspace_id: string;
}

export interface PlanCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    is_active: boolean;
    created_at?: string;
}

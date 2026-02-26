export interface Company {
    id: string;
    name: string;
    document: string; // CNPJ/CPF
    created_at: string;
    updated_at?: string;
}

export interface Workspace {
    id: string;
    company_id: string;
    name: string;
    slug: string;
    created_at: string;
    updated_at?: string;
    role?: string;
    company_name?: string;
    company?: {
        name: string;
    };
}

export interface WorkspaceMember {
    id: string;
    workspace_id: string;
    user_id: string;
    role: 'owner' | 'admin' | 'member';
    joined_at: string;
}

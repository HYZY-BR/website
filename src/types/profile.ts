import { UserRole } from "./enums";

export interface Profile {
    id: string;
    email: string;
    name: string | null;
    company: string | null;
    phone: string | null;
    avatar_url: string | null;
    role: UserRole | null;
    is_active: boolean | null;
    created_at: string;
    updated_at: string;
}

export interface Company {
    id: string;
    name: string;
    owner_id: string;
    tax_id?: string | null;
    address?: string | null;
    contact_email?: string | null;
    created_at?: string;
    updated_at?: string;
}

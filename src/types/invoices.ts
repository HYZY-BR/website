import { InvoiceStatus, BillingType } from "./enums";

export interface Invoice {
    id: string;
    workspace_id: string;
    amount: number;
    status: InvoiceStatus;
    billing_type: BillingType;
    stripe_invoice_id?: string;
    description?: string;
    metadata?: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

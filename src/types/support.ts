import { TicketStatus, TicketPriority } from "./enums";

export interface SupportTicket {
    id: string;
    user_id: string;
    subject: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    created_at: string;
    updated_at: string;
    workspace_id?: string;
    team_id?: string;
    assigned_to?: string;
    tags?: string[];
}

export interface TicketMessage {
    id: string;
    ticket_id: string;
    message: string;
    is_from_client: boolean;
    created_at: string;
}

export interface TicketAttachment {
    id: string;
    ticket_id: string;
    message_id?: string;
    uploader_id: string;
    file_url: string;
    file_name: string;
    file_type: string;
    file_size: number;
    created_at: string;
    signedUrl?: string;
}

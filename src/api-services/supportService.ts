import { supabase } from "./supabaseClient";
import { SupportTicket, TicketMessage, TicketAttachment } from "@/types/support";
import { TicketStatus, TicketPriority } from "@/types/enums";
import { workspaceService } from "./workspaceService";

export const supportService = {
    getAll: async (): Promise<SupportTicket[]> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const currentWorkspaceId = await workspaceService.getCurrentWorkspaceId();

        let query = supabase
            .from('support_tickets')
            .select('*')
            .is('deleted_at', null)
            .order('created_at', { ascending: false });

        // If we have a workspace context, filter by it.
        // Otherwise, show all tickets for the user (legacy behavior or fallback)
        if (currentWorkspaceId) {
            console.log(`[Support] Fetching tickets for Workspace: ${currentWorkspaceId}`);
            query = query.eq('workspace_id', currentWorkspaceId);
        } else {
            console.log(`[Support] No Workspace context. Fetching tickets for User: ${user.id}`);
            query = query.eq('user_id', user.id);
        }

        const { data, error } = await query;

        if (error) {
            console.error('[Support] Error fetching tickets:', error);
            throw error;
        }

        console.log(`[Support] Tickets found: ${data?.length || 0}`);
        return data as SupportTicket[];
    },

    getById: async (id: string): Promise<SupportTicket & { messages: TicketMessage[] }> => {
        const { data: ticket, error: ticketError } = await supabase
            .from('support_tickets')
            .select('*')
            .eq('id', id)
            .single();

        if (ticketError) {
            console.error(`Error fetching ticket ${id}:`, ticketError);
            throw ticketError;
        }

        const { data: messages, error: messagesError } = await supabase
            .from('ticket_messages')
            .select('*')
            .eq('ticket_id', id)
            .is('deleted_at', null)
            .order('created_at', { ascending: true });

        if (messagesError) {
            console.error(`Error fetching messages for ticket ${id}:`, messagesError);
            throw messagesError;
        }

        return {
            ...ticket,
            messages: messages || []
        } as SupportTicket & { messages: TicketMessage[] };
    },

    create: async (ticket: Omit<SupportTicket, "id" | "created_at" | "updated_at" | "user_id" | "status">): Promise<SupportTicket> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const currentWorkspaceId = await workspaceService.getCurrentWorkspaceId();

        const newTicket = {
            ...ticket,
            user_id: user.id,
            status: TicketStatus.OPEN,
            team_id: ticket.team_id,
            assigned_to: ticket.assigned_to,
            workspace_id: currentWorkspaceId // Add workspace context
        };

        const { data, error } = await supabase
            .from('support_tickets')
            .insert(newTicket)
            .select('*')
            .single();

        if (error) {
            console.error('Error creating ticket:', error);
            throw error;
        }

        return data as SupportTicket;
    },

    update: async (id: string, updates: Partial<Omit<SupportTicket, "id" | "created_at" | "updated_at" | "user_id">>): Promise<SupportTicket> => {
        const { data, error } = await supabase
            .from('support_tickets')
            .update(updates)
            .eq('id', id)
            .select('*')
            .single();

        if (error) {
            console.error('Error updating ticket:', error);
            throw error;
        }

        return data as SupportTicket;
    },

    delete: async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('support_tickets')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            console.error('Error deleting ticket:', error);
            throw error;
        }
    },

    addMessage: async (ticketId: string, message: string, isFromClient: boolean = true): Promise<TicketMessage> => {
        const { data, error } = await supabase
            .from('ticket_messages')
            .insert({
                ticket_id: ticketId,
                message,
                is_from_client: isFromClient
            })
            .select('*')
            .single();

        if (error) {
            console.error('Error adding message:', error);
            throw error;
        }

        // Update ticket's updated_at
        await supabase
            .from('support_tickets')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', ticketId);

        return data as TicketMessage;
    },

    async getAttachments(ticketId: string): Promise<TicketAttachment[]> {
        const { data, error } = await supabase
            .from('ticket_attachments')
            .select('*')
            .eq('ticket_id', ticketId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching attachments:', error);
            throw error;
        }

        // Generate signed URLs for each attachment
        const attachmentsWithUrls = await Promise.all(data.map(async (attachment: TicketAttachment) => {
            try {
                // Check if file_url is a full URL or a path. If it's a private bucket path, we sign it.
                // Assuming we store the path in file_url for this implementation
                const { data: signedData, error: signError } = await supabase
                    .storage
                    .from('support')
                    .createSignedUrl(attachment.file_url, 3600); // 1 hour validity

                if (signError) {
                    console.error('Error signing URL for attachment:', attachment.id, signError);
                    return { ...attachment, signedUrl: undefined };
                }

                return {
                    ...attachment,
                    signedUrl: signedData?.signedUrl || undefined
                };
            } catch (err) {
                console.error('Unexpected error signing URL:', err);
                return { ...attachment, signedUrl: undefined };
            }
        }));

        return attachmentsWithUrls as TicketAttachment[];
    },

    async uploadAttachment(ticketId: string, file: File, messageId?: string): Promise<TicketAttachment> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // 1. Upload file to Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${ticketId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = fileName; // Structure: ticket_id/timestamp_random.ext

        const { error: uploadError } = await supabase.storage
            .from('support')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Error uploading file:', uploadError);
            throw uploadError;
        }

        // 2. Insert record into ticket_attachments
        const { data, error: insertError } = await supabase
            .from('ticket_attachments')
            .insert({
                ticket_id: ticketId,
                message_id: messageId || null,
                uploader_id: user.id,
                file_url: filePath, // Storing the path for private access
                file_name: file.name,
                file_type: file.type,
                file_size: file.size
            })
            .select('*')
            .single();

        if (insertError) {
            console.error('Error creating attachment record:', insertError);
            // Optional: Cleanup uploaded file if DB insert fails
            throw insertError;
        }

        return data as TicketAttachment;
    }
};

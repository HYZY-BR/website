import { supabase } from "./supabaseClient";
import { Invoice } from "@/types/invoices";

export const invoiceService = {
    getInvoices: async (workspaceId: string): Promise<Invoice[]> => {
        console.log('[DEBUG] getInvoices - workspaceId:', workspaceId);

        if (!workspaceId) {
            console.log('[DEBUG] getInvoices - workspaceId vazio, retornando []');
            return [];
        }

        const { data, error } = await supabase
            .from('invoices')
            .select('*, items:invoice_items(*)')
            .eq('workspace_id', workspaceId)
            .is('deleted_at', null)
            .order('created_at', { ascending: false });

        console.log('[DEBUG] getInvoices - data:', data);
        console.log('[DEBUG] getInvoices - error:', error);

        if (error) {
            console.error("Error fetching invoices:", error);
            throw error;
        }

        return data as Invoice[];
    },

    getInvoiceById: async (id: string): Promise<Invoice | null> => {
        const { data, error } = await supabase
            .from('invoices')
            .select('*, items:invoice_items(*)')
            .eq('id', id)
            .single();

        if (error) {
            console.error("Error fetching invoice details:", error);
            return null;
        }

        return data as Invoice;
    }
};


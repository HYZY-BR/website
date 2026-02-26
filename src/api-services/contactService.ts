import { supabase } from './supabaseClient';

export interface ContactRequest {
    full_name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    metadata?: any;
}

export const contactService = {
    async submitContactRequest(data: ContactRequest) {
        const { error } = await supabase
            .from('hyzy_contact_requests')
            .insert([{
                ...data,
                status: 'PENDING' // Usando o novo Enum em CAPSLOCK
            }]);

        if (error) throw error;
        return { success: true };
    }
};

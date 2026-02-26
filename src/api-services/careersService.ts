import { supabase } from './supabaseClient';

export interface JobApplication {
    full_name: string;
    email: string;
    phone: string;
    position: string;
    resume_url: string;
    linkedin_url: string;
    cover_letter: string;
    metadata?: any;
}

export const careersService = {
    async submitApplication(data: JobApplication) {
        const { error } = await supabase
            .from('hyzy_job_applications')
            .insert([{
                ...data,
                status: 'PENDING'
            }]);

        if (error) throw error;
        return { success: true };
    }
};

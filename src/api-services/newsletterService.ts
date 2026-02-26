import { supabase } from './supabaseClient';

export interface NewsletterSubscription {
    email: string;
    metadata?: {
        tracking?: any;
        intent?: any;
    };
}

export const newsletterService = {
    /**
     * Subscribes a new email to the newsletter.
     * Captured metadata includes tracking information (UTMs, behavior).
     */
    async subscribe(data: NewsletterSubscription) {
        const { error } = await supabase
            .from('hyzy_newsletter_subscriptions')
            .upsert(
                [{
                    email: data.email,
                    metadata: data.metadata || {},
                    status: 'ACTIVE'
                }],
                { onConflict: 'email' }
            );

        if (error) {
            console.error('Newsletter subscription error:', error);
            throw error;
        }

        return { success: true };
    }
};

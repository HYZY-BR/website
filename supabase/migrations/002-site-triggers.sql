-- Migration: 002-site-triggers
-- Description: Adds triggers for automatic processing of contact and job submissions
-- Date: 2026-02-25

-- Function to handle new submissions
CREATE OR REPLACE FUNCTION public.fn_hyzy_on_new_submission()
RETURNS TRIGGER AS $$
BEGIN
    -- This is where you would place logic like:
    -- 1. Sending a notification to an internal table
    -- 2. Preparing data for an Edge Function call (Webhook)
    
    -- Example: Logic to set a default subject if empty
    IF (TG_TABLE_NAME = 'hyzy_contact_requests') THEN
        IF NEW.subject IS NULL OR NEW.subject = '' THEN
            NEW.subject := 'Novo contato via Site - ' || NEW.full_name;
        END IF;
    END IF;

    -- You can also trigger a Supabase Edge Function directly via pg_net if configured
    -- PERFORM net.http_post(
    --     url := 'https://<PROJECT_REF>.supabase.co/functions/v1/001-site-handler',
    --     headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')),
    --     body := jsonb_build_object('type', CASE WHEN TG_TABLE_NAME = 'hyzy_contact_requests' THEN 'contact' ELSE 'job' END, 'data', row_to_json(NEW))
    -- );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for Contact Requests
CREATE TRIGGER tr_hyzy_contact_submission
    BEFORE INSERT ON public.hyzy_contact_requests
    FOR EACH ROW EXECUTE FUNCTION public.fn_hyzy_on_new_submission();

-- Triggers for Job Applications
CREATE TRIGGER tr_hyzy_job_submission
    BEFORE INSERT ON public.hyzy_job_applications
    FOR EACH ROW EXECUTE FUNCTION public.fn_hyzy_on_new_submission();

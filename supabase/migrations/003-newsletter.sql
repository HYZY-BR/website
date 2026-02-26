-- Migration: 003-newsletter
-- Description: Adds newsletter subscriptions table with RLS
-- Date: 2026-02-25

-- Create Newsletter Table
CREATE TABLE IF NOT EXISTS public.hyzy_newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'UNSUBSCRIBED')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.hyzy_newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public insert newsletter subscriptions" ON public.hyzy_newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated manage newsletter subscriptions" ON public.hyzy_newsletter_subscriptions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Index
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.hyzy_newsletter_subscriptions(email);

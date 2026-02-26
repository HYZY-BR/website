-- Migration: 001-update
-- Description: Adds blog, contact, and job application tables with RLS and Enums
-- Date: 2026-02-25

-- 0. Reusable Enums
DO $$ BEGIN
    CREATE TYPE public.contact_status AS ENUM ('PENDING', 'RESPONDED', 'CLOSED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.job_application_status AS ENUM ('PENDING', 'REVIEWING', 'INTERVIEWING', 'HIRED', 'REJECTED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 1. Blog Categories
CREATE TABLE IF NOT EXISTS public.hyzy_blog_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 2. Blog Posts
CREATE TABLE IF NOT EXISTS public.hyzy_blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.hyzy_blog_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image_url TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 3. Contact Requests
CREATE TABLE IF NOT EXISTS public.hyzy_contact_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status public.contact_status DEFAULT 'PENDING'::public.contact_status,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- 4. Job Applications
CREATE TABLE IF NOT EXISTS public.hyzy_job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    position TEXT NOT NULL,
    resume_url TEXT NOT NULL,
    linkedin_url TEXT,
    cover_letter TEXT,
    status public.job_application_status DEFAULT 'PENDING'::public.job_application_status,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.hyzy_blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hyzy_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hyzy_contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hyzy_job_applications ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
-- [Políticas permanecem as mesmas...]
CREATE POLICY "Allow public select on active categories" ON public.hyzy_blog_categories FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Allow authenticated manage categories" ON public.hyzy_blog_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public select on published posts" ON public.hyzy_blog_posts FOR SELECT USING (status = 'published' AND deleted_at IS NULL);
CREATE POLICY "Allow authenticated manage posts" ON public.hyzy_blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public insert contact requests" ON public.hyzy_contact_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated manage contact requests" ON public.hyzy_contact_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow public insert job applications" ON public.hyzy_job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated manage job applications" ON public.hyzy_job_applications FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.hyzy_blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.hyzy_blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON public.hyzy_blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_contact_requests_email ON public.hyzy_contact_requests(email);
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON public.hyzy_job_applications(email);

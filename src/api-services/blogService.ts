import { supabase } from './supabaseClient';

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featured_image_url?: string;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    published_at: string;
    created_at: string;
    category?: BlogCategory;
    author?: {
        name: string;
        avatar_url?: string;
    };
}

export const blogService = {
    async getCategories(): Promise<BlogCategory[]> {
        const { data, error } = await supabase
            .from('hyzy_blog_categories')
            .select('*')
            .is('deleted_at', null)
            .order('name');

        if (error) {
            console.error('Error fetching blog categories:', error);
            throw error;
        }

        return data || [];
    },

    async getPosts(categoryId?: string): Promise<BlogPost[]> {
        let query = supabase
            .from('hyzy_blog_posts')
            .select(`
                *,
                category:hyzy_blog_categories(*),
                author:profiles!author_id(name, avatar_url)
            `)
            .eq('status', 'PUBLISHED')
            .is('deleted_at', null)
            .order('published_at', { ascending: false });

        if (categoryId) {
            query = query.eq('category_id', categoryId);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching blog posts:', error);
            throw error;
        }

        return data || [];
    },

    async getPostBySlug(slug: string): Promise<BlogPost | null> {
        const { data, error } = await supabase
            .from('hyzy_blog_posts')
            .select(`
                *,
                category:hyzy_blog_categories(*),
                author:profiles!author_id(name, avatar_url)
            `)
            .eq('slug', slug)
            .is('deleted_at', null)
            .maybeSingle();

        if (error) {
            console.error(`Error fetching post ${slug}:`, error);
            throw error;
        }

        return data;
    }
};

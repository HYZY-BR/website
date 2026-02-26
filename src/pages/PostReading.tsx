import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';
import NewsletterCTA from '../components/NewsletterCTA';
import { blogService, BlogPost } from '../api-services/blogService';

interface PostReadingProps {
    lang: Language;
    isLightMode: boolean;
}

export default function PostReading({ lang, isLightMode }: PostReadingProps) {
    const { slug } = useParams<{ slug: string }>();
    const t = translations[lang];

    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        feather.replace();
    }, [lang, isLightMode, slug, post]);

    useEffect(() => {
        const loadPost = async () => {
            if (!slug) return;
            setIsLoading(true);
            try {
                const data = await blogService.getPostBySlug(slug);
                setPost(data);
            } catch (error) {
                console.error("Error loading post:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPost();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="pt-40 pb-40 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-orange-primary/30 border-t-orange-primary rounded-full animate-spin mb-4"></div>
                <p className="opacity-50">Loading post...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="pt-40 pb-40 text-center">
                <h1 className="text-4xl font-bold mb-4">Post not found</h1>
                <Link to="/blog" className="text-orange-primary hover:underline">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-32">
            {/* Article Header */}
            <header className="container mx-auto px-4 max-w-4xl text-center mb-16">
                <div className="flex justify-center mb-8">
                    <Link to="/blog" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                        <i data-feather="arrow-left" className="w-4 h-4"></i>
                        Back to Blog
                    </Link>
                </div>

                {post.category && (
                    <div className="inline-block px-4 py-1 rounded-full bg-orange-primary/10 mb-6">
                        <span className="text-orange-primary text-xs font-bold tracking-widest uppercase">
                            {post.category.name}
                        </span>
                    </div>
                )}

                <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center justify-center gap-6 opacity-60">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-primary/20 flex items-center justify-center font-bold text-xs text-orange-primary">
                            {post.author?.name?.charAt(0) || 'H'}
                        </div>
                        <span className="text-sm font-medium">{post.author?.name || 'HYZY Team'}</span>
                    </div>
                    <span>•</span>
                    <span className="text-sm">
                        {new Date(post.published_at).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                </div>
            </header>

            {/* Featured Image */}
            <div className="container mx-auto px-4 max-w-6xl mb-20">
                <img
                    src={post.featured_image_url || '/assets/blog/hyzy-banner-2240x1260.png'}
                    alt={post.title}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/assets/blog/hyzy-banner-2240x1260.png'; }}
                    className="w-full aspect-video object-cover rounded-[3.5rem] shadow-2xl"
                />
            </div>

            {/* Content */}
            <article className="container mx-auto px-4 max-w-3xl">
                <div className={`prose prose-lg max-w-none ${isLightMode ? 'text-charcoal' : 'text-white/80'}`}>
                    <p className="text-2xl font-light mb-12 italic leading-relaxed opacity-90">
                        {post.excerpt}
                    </p>
                    <div className="space-y-8 leading-relaxed text-lg font-inter">
                        {post.content.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Author Bio Mockup */}
                <div className={`mt-24 p-12 rounded-[2.5rem] border ${isLightMode ? 'bg-gray-50 border-black/5' : 'bg-white/5 border-white/5'}`}>
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div className="w-24 h-24 rounded-full bg-orange-primary flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                            {post.author?.name?.charAt(0) || 'H'}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-bold mb-2">Written by {post.author?.name || 'HYZY Team'}</h4>
                            <p className="opacity-60 text-sm leading-relaxed mb-6 font-inter">
                                Operational leader and automation enthusiast at HYZY.io. Dedicated to building tools that unlock human potential through intelligent orchestration.
                            </p>
                            <div className="flex justify-center md:justify-start gap-4">
                                <a href="#" className="opacity-40 hover:text-orange-primary hover:opacity-100 transition-all"><i data-feather="twitter" className="w-4 h-4"></i></a>
                                <a href="#" className="opacity-40 hover:text-orange-primary hover:opacity-100 transition-all"><i data-feather="linkedin" className="w-4 h-4"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter CTA */}
                <div className="mt-20">
                    <NewsletterCTA lang={lang} isLightMode={isLightMode} />
                </div>

                <div className="mt-20 flex justify-center">
                    <Link
                        to="/blog"
                        className={`inline-flex items-center gap-3 group/btn font-black text-[10px] uppercase tracking-[0.2em] py-4 px-10 rounded-2xl transition-all duration-500 border ${isLightMode
                            ? 'bg-black text-white hover:bg-orange-primary border-black hover:border-orange-primary shadow-xl hover:shadow-orange-primary/20'
                            : 'bg-white text-black hover:bg-orange-primary hover:text-white border-white hover:border-orange-primary shadow-xl hover:shadow-orange-primary/20'}`}
                    >
                        <i data-feather="arrow-left" className="w-4 h-4 group-hover/btn:-translate-x-1.5 transition-transform"></i>
                        <span>{t.blogPage.backToBlog}</span>
                    </Link>
                </div>
            </article>
        </div>
    );
}

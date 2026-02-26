import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';
import NewsletterCTA from '../components/NewsletterCTA';
import BlogNewsletterFooter from '../components/BlogNewsletterFooter';
import { blogService, BlogPost, BlogCategory } from '../api-services/blogService';

interface BlogProps {
    lang: Language;
    isLightMode: boolean;
}

export default function Blog({ lang, isLightMode }: BlogProps) {
    const t = translations[lang];

    const [dbPosts, setDbPosts] = useState<BlogPost[]>([]);
    const [dbCategories, setDbCategories] = useState<BlogCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    // Fetch data from database
    useEffect(() => {
        const loadBlogData = async () => {
            setIsLoading(true);
            try {
                const [postsData, categoriesData] = await Promise.all([
                    blogService.getPosts(),
                    blogService.getCategories()
                ]);
                setDbPosts(postsData);
                setDbCategories(categoriesData);
            } catch (error) {
                console.error("Failed to load blog data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadBlogData();
    }, []);

    // States for Filter and Sort
    const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
    const [sortBy, setSortBy] = useState('latest');

    // Featured Post (first published post or one marked as featured if we add that logic)
    // For now, let's pick the latest published one
    const featuredPost = useMemo(() => {
        return dbPosts.length > 0 ? dbPosts[0] : null;
    }, [dbPosts]);

    // Categories for filter UI
    const uiCategories = useMemo(() => {
        const base = [{ id: 'all', name: t.blogPage.categories.all }];
        return [...base, ...dbCategories];
    }, [dbCategories, t.blogPage.categories.all]);

    // Filtering and Sorting logic
    const filteredPosts = useMemo(() => {
        let result = [...dbPosts];

        // Se houver destaque, removemos ele da lista principal (se estiver no topo)
        if (featuredPost && result.length > 0 && result[0].id === featuredPost.id) {
            result.shift();
        }

        if (activeCategoryId !== 'all') {
            result = result.filter(p => p.category?.id === activeCategoryId);
        }

        if (sortBy === 'oldest') {
            result.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
        } else {
            result.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        }
        return result;
    }, [dbPosts, activeCategoryId, sortBy, featuredPost]);

    useEffect(() => {
        // Delay para garantir que o DOM foi atualizado após a mudança de estado
        const timer = setTimeout(() => {
            feather.replace();
        }, 300); // Aumentado um pouco para garantir
        return () => clearTimeout(timer);
    }, [lang, isLightMode, isLoading, filteredPosts, dbPosts]);

    if (isLoading && dbPosts.length === 0) {
        return (
            <div className="pt-[80px] min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-orange-primary/30 border-t-orange-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="pt-[80px]">
            {/* Premium Hero Section */}
            {featuredPost && (
                <section className="container pt-6 pb-12">
                    <div className={`relative rounded-[2.5rem] overflow-hidden border transition-all duration-700 ${isLightMode ? 'bg-white border-black/5 shadow-[0_48px_80px_-16px_rgba(0,0,0,0.08)]' : 'bg-tech border-white/5 shadow-2xl'}`}>
                        <div className="grid lg:grid-cols-12 gap-0 relative z-10">
                            {/* Image Side - Forced 2:1 Aspect Ratio to match cards */}
                            <div className="lg:col-span-7 aspect-video lg:aspect-auto lg:h-[450px] overflow-hidden relative group">
                                <img
                                    src={featuredPost.featured_image_url || '/assets/blog/hyzy-banner-2240x1260.png'}
                                    alt={featuredPost.title}
                                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/assets/blog/hyzy-banner-2240x1260.png'; }}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent lg:bg-gradient-to-r ${isLightMode ? 'from-white/80' : 'from-tech/80'}`}></div>

                                <div className="absolute top-10 left-10">
                                    <span className="px-4 py-2 rounded-full glass border-white/20 text-orange-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                        {t.blogPage.featured}
                                    </span>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="lg:col-span-5 p-10 md:p-16 flex flex-col justify-center">
                                <div className="mb-auto">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-6 block">
                                        {new Date(featuredPost.published_at).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                    <Link to={`/blog/${featuredPost.slug}`} className="group block">
                                        <h2 className={`text-3xl md:text-5xl font-bold mb-6 tracking-tighter leading-[0.95] group-hover:text-orange-primary transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
                                            {featuredPost.title}
                                        </h2>
                                    </Link>
                                    <p className={`text-lg md:text-xl mb-12 leading-relaxed font-light font-inter max-w-lg ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                                        {featuredPost.excerpt}
                                    </p>

                                    <Link
                                        to={`/blog/${featuredPost.slug}`}
                                        className={`inline-flex items-center gap-3 group/btn font-black text-xs uppercase tracking-widest py-4 px-10 rounded-2xl transition-all duration-500 border ${isLightMode
                                            ? 'bg-black text-white hover:bg-orange-primary border-black hover:border-orange-primary shadow-xl hover:shadow-orange-primary/20'
                                            : 'bg-white text-black hover:bg-orange-primary hover:text-white border-white hover:border-orange-primary'}`}
                                    >
                                        <span>{t.blogPage.readMore}</span>
                                        <i data-feather="arrow-right" className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform"></i>
                                    </Link>
                                </div>
                            </div>

                            {/* Integrated Banner */}
                            <div className={`lg:col-span-12 border-t backdrop-blur-3xl transition-colors duration-700 ${isLightMode ? 'bg-[#f8f8f8] border-black/5' : 'bg-white/5 border-white/5'}`}>
                                <NewsletterCTA lang={lang} isLightMode={isLightMode} variant="banner" />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Content Section - Combined Filters + Grid */}
            <section className="container">
                <div className="flex flex-col gap-16">
                    {/* Header with Integrated Filters */}
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-8 border-b border-black/5 dark:border-white/5 pb-10">
                        <div className="max-w-2xl">
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 leading-[0.9]">
                                Latest <span className="text-orange-primary">Insights</span>
                            </h3>
                            <p className="text-base opacity-50 font-inter font-light max-w-md">
                                Exploring the frontier of AI, operation design, and the future of work.
                            </p>
                        </div>

                        <div className="w-full md:w-auto -mx-5 sm:-mx-8 md:mx-0">
                            <style>{`
                                .hide-scrollbar::-webkit-scrollbar { display: none; }
                                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                            `}</style>
                            <div className={`flex items-center gap-1 overflow-x-auto hide-scrollbar py-2 px-5 sm:px-8 md:p-2 md:rounded-[2rem] md:border transition-all duration-500 ${isLightMode
                                ? 'md:glass md:border-black/5 md:shadow-xl'
                                : 'md:glass md:border-white/5'
                                }`}>
                                {uiCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategoryId(cat.id)}
                                        className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap flex-shrink-0 ${activeCategoryId === cat.id
                                            ? 'bg-orange-primary text-white shadow-lg scale-[1.05]'
                                            : (isLightMode ? 'bg-black/5 hover:bg-black/10 opacity-60' : 'bg-white/5 hover:bg-white/10 opacity-40')
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Grid of Editorial Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                        {filteredPosts.map((post) => (
                            <Link
                                to={`/blog/${post.slug}`}
                                key={post.id}
                                className="group flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-video mb-8 rounded-[2.5rem] overflow-hidden">
                                    <img
                                        src={post.featured_image_url || '/assets/blog/hyzy-banner-2240x1260.png'}
                                        alt={post.title}
                                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/assets/blog/hyzy-banner-2240x1260.png'; }}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent"></div>

                                    {/* Hover Category Overlay */}
                                    {post.category && (
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-1.5 rounded-full bg-orange-primary text-white text-[9px] font-black uppercase tracking-widest scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                                                {post.category.name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {/* Info */}
                                <div className="flex flex-col flex-1 px-2">
                                    <div className="flex items-center gap-3 mb-6">
                                        {post.category && <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-primary">{post.category.name}</span>}
                                        <span className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/10"></span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                                            {new Date(post.published_at).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-bold mb-6 tracking-tighter leading-tight group-hover:text-orange-primary transition-colors duration-500">
                                        {post.title}
                                    </h3>

                                    <p className="text-lg opacity-50 font-inter font-light line-clamp-2 leading-relaxed mb-10">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-primary/10 border border-orange-primary/20 flex items-center justify-center font-black text-xs text-orange-primary">
                                                {post.author?.name?.charAt(0) || 'H'}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold opacity-80">{post.author?.name || 'HYZY Team'}</span>
                                                <span className="text-[9px] font-medium opacity-40 uppercase tracking-widest">Writer</span>
                                            </div>
                                        </div>

                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-orange-primary group-hover:text-white ${isLightMode ? 'bg-black/5' : 'bg-white/5'}`}>
                                            <i data-feather="arrow-up-right" className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Conversion Stripe - Brand New Element */}
            <div className="mt-20 md:mt-24">
                <BlogNewsletterFooter lang={lang} isLightMode={isLightMode} />
            </div>
        </div>
    );
}

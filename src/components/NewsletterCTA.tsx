import { useState } from 'react';
import { translations, Language } from '../i18n';
import { newsletterService } from '../api-services/newsletterService';
import { getConsolidatedTracking } from '../utils/tracking';
import feather from 'feather-icons';

interface NewsletterCTAProps {
    lang: Language;
    isLightMode: boolean;
    variant?: 'full' | 'compact' | 'banner';
}

const Icon = ({ name, className }: { name: string; className?: string }) => {
    const icon = feather.icons[name];
    if (!icon) return null;

    return (
        <span
            className={`inline-flex items-center justify-center ${className || ''}`}
            dangerouslySetInnerHTML={{
                __html: icon.toSvg({
                    'stroke-width': 2,
                    'width': '100%',
                    'height': '100%'
                })
            }}
        />
    );
};

export default function NewsletterCTA({ lang, isLightMode, variant = 'full' }: NewsletterCTAProps) {
    const t = translations[lang];
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const tracking = getConsolidatedTracking();
            await newsletterService.subscribe({
                email,
                metadata: { tracking }
            });
            setStatus('success');
            setEmail('');

            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (variant === 'banner') {
        return (
            <div className={`px-10 py-10 md:px-16 md:py-12 border-t relative overflow-hidden ${isLightMode ? 'bg-[#f5f5f5] border-black/5' : 'bg-white/5 border-white/5'}`}>
                {/* Background Decorator for Light Mode Contrast */}
                {isLightMode && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-primary/5 rounded-full -mr-32 -mt-32 blur-[80px] -z-10 animate-pulse"></div>
                )}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
                    <div className="text-left max-w-xl">
                        <h4 className="text-2xl font-bold mb-2 tracking-tight">{t.blogPage.newsletter.title}</h4>
                        <p className="text-sm opacity-60 leading-relaxed">{t.blogPage.newsletter.desc}</p>
                    </div>
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 w-full lg:max-w-md relative">
                        <input
                            required
                            type="email"
                            placeholder={t.blogPage.newsletter.placeholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`flex-1 px-6 py-4 rounded-2xl outline-none border transition-all ${isLightMode ? 'bg-white border-black/10 focus:border-orange-primary' : 'bg-black/20 border-white/10 focus:border-orange-primary'
                                }`}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="btn btn-primary !py-4 px-10 group whitespace-nowrap"
                        >
                            {status === 'loading' ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : status === 'success' ? (
                                <Icon name="check" className="w-5 h-5" />
                            ) : (
                                <>
                                    {t.blogPage.newsletter.button}
                                    <Icon name="send" className="inline-block ml-3 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
                {status === 'success' && <p className="text-xs text-green-500 font-bold mt-4 text-center lg:text-left">{t.blogPage.newsletter.success}</p>}
                {status === 'error' && <p className="text-xs text-orange-primary font-bold mt-4 text-center lg:text-left">{t.blogPage.newsletter.error}</p>}
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div className={`p-8 rounded-[2rem] border ${isLightMode ? 'bg-gray-50 border-black/5' : 'bg-white/5 border-white/5'}`}>
                <h4 className="text-xl font-bold mb-4 tracking-tight">{t.blogPage.newsletter.title}</h4>
                <p className="text-sm opacity-60 mb-6 leading-relaxed">{t.blogPage.newsletter.desc}</p>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                    <input
                        required
                        type="email"
                        placeholder={t.blogPage.newsletter.placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`px-5 py-3 rounded-xl outline-none border text-sm ${isLightMode ? 'bg-white border-black/10' : 'bg-black/20 border-white/10'
                            }`}
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn btn-primary !py-3 !text-sm flex items-center justify-center gap-2"
                    >
                        {status === 'loading' ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : status === 'success' ? (
                            <Icon name="check" className="w-4 h-4" />
                        ) : (
                            <>
                                {t.blogPage.newsletter.button}
                                <Icon name="send" className="w-3 h-3" />
                            </>
                        )}
                    </button>
                    {status === 'success' && <p className="text-[10px] text-green-500 font-bold text-center mt-1">{t.blogPage.newsletter.success}</p>}
                    {status === 'error' && <p className="text-[10px] text-orange-primary font-bold text-center mt-1">{t.blogPage.newsletter.error}</p>}
                </form>
            </div>
        );
    }

    return (
        <div className={`p-12 md:p-16 rounded-[3.5rem] relative overflow-hidden text-center border ${isLightMode ? 'bg-white border-black/5 shadow-2xl' : 'bg-tech/40 border-white/5 shadow-2xl'}`}>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-primary/10 rounded-full -mr-48 -mt-48 blur-[100px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-primary/5 rounded-full -ml-32 -mb-32 blur-[80px] -z-10"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-block px-4 py-1 rounded-full bg-orange-primary/10 mb-6">
                    <span className="text-orange-primary text-[10px] font-bold tracking-widest uppercase">
                        Newsletter
                    </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter leading-tight">
                    {t.blogPage.newsletter.title}
                </h3>

                <p className="text-lg opacity-60 mb-10 max-w-lg mx-auto leading-relaxed font-inter">
                    {t.blogPage.newsletter.desc}
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative">
                    <div className="flex-1 relative group">
                        <input
                            required
                            type="email"
                            placeholder={t.blogPage.newsletter.placeholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all font-inter ${isLightMode
                                ? 'bg-gray-50 border-black/10 focus:border-orange-primary'
                                : 'bg-white/5 border-white/10 focus:border-orange-primary'
                                } ${status === 'success' ? 'opacity-50' : ''}`}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className={`btn btn-primary !py-4 px-10 group whitespace-nowrap ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                            } ${status === 'success' ? '!bg-green-500 hover:translate-y-0 shadow-none' : ''}`}
                    >
                        {status === 'loading' ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : status === 'success' ? (
                            <Icon name="check" className="w-5 h-5" />
                        ) : (
                            <>
                                {t.blogPage.newsletter.button}
                                <Icon name="send" className="inline-block ml-3 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </>
                        )}
                    </button>
                </form>

                {/* Status Messages */}
                {status === 'success' && (
                    <p className="mt-4 text-green-500 font-bold text-sm animate-fadeIn flex items-center justify-center gap-2">
                        {t.blogPage.newsletter.success}
                    </p>
                )}
                {status === 'error' && (
                    <p className="mt-4 text-orange-primary font-bold text-sm animate-fadeIn flex items-center justify-center gap-2">
                        <Icon name="alert-circle" className="w-4 h-4" />
                        {t.blogPage.newsletter.error}
                    </p>
                )}
            </div>
        </div>
    );
}

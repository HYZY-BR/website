import { useState } from 'react';
import { translations, Language } from '../i18n';
import { newsletterService } from '../api-services/newsletterService';
import { getConsolidatedTracking } from '../utils/tracking';
import feather from 'feather-icons';

interface BlogNewsletterFooterProps {
    lang: Language;
    isLightMode: boolean;
}

const Icon = ({ name, className }: { name: string; className?: string }) => {
    const icon = feather.icons[name];
    if (!icon) return null;

    return (
        <span
            className={`inline-flex items-center justify-center ${className || ''}`}
            dangerouslySetInnerHTML={{
                __html: icon.toSvg({
                    'stroke-width': 1.5,
                    'width': '100%',
                    'height': '100%'
                })
            }}
        />
    );
};

export default function BlogNewsletterFooter({ lang, isLightMode }: BlogNewsletterFooterProps) {
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

    return (
        <section className={`w-full py-16 md:py-20 border-t transition-all duration-500 ${isLightMode
            ? 'bg-neutral-50 border-black/5'
            : 'bg-[#050505] border-white/5'
            }`}>
            <div className="container">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Brand + Message */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-orange-primary/20 bg-orange-primary/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-primary animate-pulse"></span>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-primary">
                                Stay Synced
                            </span>
                        </div>

                        <h2 className={`text-3xl md:text-4xl font-bold tracking-tighter mb-4 leading-[1] ${isLightMode ? 'text-black' : 'text-white'
                            }`}>
                            {t.blogPage.newsletter.title}
                        </h2>

                        <p className={`text-base font-inter font-light leading-relaxed max-w-lg mx-auto lg:mx-0 opacity-60`}>
                            {t.blogPage.newsletter.desc}
                        </p>
                    </div>

                    {/* Action Area */}
                    <div className="w-full lg:max-w-xl">
                        <form onSubmit={handleSubscribe} className="relative group/form">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-primary to-orange-600 rounded-[2rem] blur opacity-10 group-hover/form:opacity-20 transition duration-1000"></div>

                            <div className={`relative flex flex-col sm:flex-row gap-3 p-3 rounded-[2rem] border transition-all duration-500 ${isLightMode
                                ? 'bg-white border-black/10 shadow-2xl focus-within:border-black'
                                : 'bg-black border-white/10 shadow-2xl focus-within:border-white'
                                }`}>
                                <input
                                    required
                                    type="email"
                                    placeholder={t.blogPage.newsletter.placeholder}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 bg-transparent px-6 py-4 outline-none text-lg font-inter"
                                />

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`relative overflow-hidden px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 group ${isLightMode ? 'bg-black text-white' : 'bg-white text-black'
                                        } hover:bg-orange-primary hover:text-white active:scale-95 disabled:opacity-50`}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {status === 'loading' ? (
                                            <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                {t.blogPage.newsletter.button}
                                                <Icon name="arrow-right" className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>

                            {/* Status Notifications */}
                            <div className="absolute top-full left-0 right-0 mt-6 text-center lg:text-left">
                                {status === 'success' && (
                                    <span className="text-sm font-bold text-green-500 flex items-center justify-center lg:justify-start gap-2 animate-fadeIn">
                                        <Icon name="check-circle" className="w-4 h-4" />
                                        {t.blogPage.newsletter.success}
                                    </span>
                                )}
                                {status === 'error' && (
                                    <span className="text-sm font-bold text-orange-primary flex items-center justify-center lg:justify-start gap-2 animate-fadeIn">
                                        <Icon name="alert-triangle" className="w-4 h-4" />
                                        {t.blogPage.newsletter.error}
                                    </span>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

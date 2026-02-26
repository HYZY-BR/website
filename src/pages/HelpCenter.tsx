import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackBehavior, withCurrentParams } from '../utils/tracking';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';

interface HelpCenterProps {
    lang: Language;
    isLightMode: boolean;
}

export default function HelpCenter({ lang, isLightMode }: HelpCenterProps) {
    const t = translations[lang];

    useEffect(() => {
        feather.replace();
    }, [lang, isLightMode]);

    return (
        <div className="pt-32 pb-20">
            {/* Search Header */}
            <section className="container py-16 text-center">
                <div className="inline-block px-4 py-1 rounded-full glass mb-4">
                    <span className="text-orange-primary text-xs font-bold tracking-widest uppercase">
                        {t.helpPage.badge}
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
                    {t.helpPage.title} <span className="text-orange-primary">{t.helpPage.titleAccent}</span>
                </h1>

                <div className="max-w-2xl mx-auto relative group">
                    <div className="absolute inset-0 bg-orange-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                        <i data-feather="search" className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40"></i>
                        <input
                            type="text"
                            placeholder={t.helpPage.searchPlaceholder}
                            className={`w-full pl-16 pr-6 py-6 rounded-[2rem] border-none text-lg outline-none focus:ring-2 focus:ring-orange-primary/50 transition-all ${isLightMode ? 'bg-white shadow-2xl' : 'bg-tech shadow-2xl'
                                }`}
                        />
                    </div>
                </div>
            </section>

            {/* Topics Grid */}
            <section className="container py-12">
                <h2 className="text-sm font-bold uppercase tracking-widest text-center mb-12 opacity-40">
                    {t.helpPage.popular}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {t.helpPage.topics.map((topic) => (
                        <div
                            key={topic.id}
                            className={`p-8 rounded-[2.5rem] border group hover:border-orange-primary/50 transition-all cursor-pointer ${isLightMode ? 'bg-white border-black/5 shadow-xl hover:-translate-y-1' : 'bg-tech/40 border-white/5 shadow-2xl hover:-translate-y-1'
                                }`}
                        >
                            <div className="w-10 h-10 bg-orange-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-orange-primary/20 transition-colors">
                                <i data-feather={topic.icon} className="text-orange-primary w-6 h-6"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3 tracking-tighter">{topic.title}</h3>
                            <p className="text-sm opacity-60 leading-relaxed">{topic.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className={`container py-20 mt-16 rounded-[4rem] ${isLightMode ? 'bg-orange-primary/5' : 'bg-white/5'}`}>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tighter">
                        {t.helpPage.faqs.title}
                    </h2>

                    <div className="space-y-4">
                        {t.helpPage.faqs.list.map((faq, i) => (
                            <details key={i} className={`group rounded-3xl border ${isLightMode ? 'bg-white border-black/5' : 'bg-tech/40 border-white/5'}`}>
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="font-bold text-lg pr-4">{faq.q}</span>
                                    <div className="w-8 h-8 rounded-full border border-orange-primary/20 flex items-center justify-center group-open:rotate-180 transition-transform">
                                        <i data-feather="chevron-down" className="w-4 h-4 text-orange-primary"></i>
                                    </div>
                                </summary>
                                <div className="px-6 pb-6 pt-0 opacity-70 leading-relaxed text-sm">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="container py-24 text-center">
                <div className="max-w-2xl mx-auto p-10 rounded-[2.5rem] border border-orange-primary/20 glass relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <i data-feather="message-circle" className="text-orange-primary w-12 h-12 mx-auto mb-6"></i>
                    <h3 className="text-2xl font-bold mb-4">{lang === 'pt' ? 'Ainda precisa de ajuda?' : 'Still need help?'}</h3>
                    <p className="opacity-60 mb-8">{lang === 'pt' ? 'Nosso time de suporte está disponível 24/7 para tirar suas dúvidas.' : 'Our support team is available 24/7 to answer your questions.'}</p>
                    <Link
                        to={withCurrentParams("/contact")}
                        onClick={() => trackBehavior('help_center_consultant')}
                        className="btn btn-primary inline-flex items-center justify-center"
                    >
                        {t.cta.consultant}
                    </Link>
                </div>
            </section>
        </div>
    );
}

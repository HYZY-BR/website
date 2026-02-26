import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trackBehavior, withCurrentParams } from '../utils/tracking';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';

interface HomeProps {
    lang: Language;
    isLightMode: boolean;
}

export default function Home({ lang, isLightMode }: HomeProps) {
    const t = translations[lang];
    const location = useLocation();

    useEffect(() => {
        feather.replace();
    }, [lang, isLightMode]);

    useEffect(() => {
        // Use the clean path (pathname) to determine the section
        const sectionId = location.pathname.replace('/', '');
        if (sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                // Delay slightly to ensure content is rendered
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location.pathname]);

    return (
        <main className="pt-32">
            {/* HERO SECTION */}
            <section className="container text-center py-16">
                <div className="inline-block px-4 py-1 rounded-full glass mb-4">
                    <span className="text-orange-primary text-xs font-bold tracking-widest uppercase">{t.hero.badge}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tighter">
                    {t.hero.title} <span className="text-orange-primary">{t.hero.titleAccent}</span><br />
                    {t.hero.titleSuffix}
                </h1>
                <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl opacity-80">
                    {t.hero.desc}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to={withCurrentParams("/contact")}
                        onClick={() => trackBehavior('hero_cta_start')}
                        className="btn btn-primary"
                    >
                        {t.hero.ctaStart}
                    </Link>
                    <Link
                        to={withCurrentParams("/contact")}
                        onClick={() => trackBehavior('hero_cta_demo')}
                        className="btn btn-secondary"
                    >
                        {t.hero.ctaDemo}
                    </Link>
                </div>

                <div className="mt-16 max-w-4xl mx-auto rounded-xl glass p-4 shadow-2xl overflow-hidden animate-float">
                    <div className={`p-6 rounded-lg font-mono text-left text-sm md:text-base ${isLightMode ? 'bg-charcoal text-white' : 'bg-tech/50 text-white'}`}>
                        <div className="flex gap-2 mb-4 opacity-50">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <p className="mb-2 text-green-400">$ hyzy-cli deploy --stack=production</p>
                        <p className="mb-2 opacity-70">{t.terminal.detecting}</p>
                        <p className="mb-2 opacity-70">{t.terminal.optimizing}</p>
                        <p className="mb-2 text-blue-400">{t.terminal.processing}</p>
                        <p className="mb-2 text-orange-primary font-bold">{t.terminal.success}</p>
                        <p className="mb-0">{t.terminal.workspace} <span className="underline cursor-pointer">https://app.hyzy.io/live</span></p>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="py-16 bg-tech/30">
                <div className="container">
                    <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center tracking-tighter">{t.howItWorks.title} <span className="text-orange-primary">{t.howItWorks.titleAccent}</span></h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {t.howItWorks.steps.map((item, idx) => (
                            <div key={idx} className={`p-10 rounded-2xl border transition-all hover:translate-y-[-10px] ${isLightMode ? 'bg-white border-black/5 shadow-xl' : 'bg-tech/50 border-white/5 shadow-2xl'}`}>
                                <span className="text-orange-primary text-4xl font-bold font-orbitron mb-6 block">{item.step}</span>
                                <h3 className="text-xl font-bold mb-4 tracking-tighter">{item.title}</h3>
                                <p className="opacity-70 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENEFITS / FOR WHO */}
            <section id="benefits" className="py-16">
                <div id="for-who" className="scroll-mt-32"></div>
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center gap-12 mb-16 px-8 py-10 rounded-3xl bg-orange-primary overflow-hidden relative shadow-2xl">
                        <div className="flex-1 text-white relative z-10">
                            <h2 className="text-4xl font-bold mb-6 text-left">{t.benefits.title} <span className="underline decoration-2 underline-offset-8">{t.benefits.titleAccent}</span> Hyzy</h2>
                            <p className="text-lg opacity-90 mb-8">{t.benefits.desc}</p>
                            <ul className="space-y-4 font-bold">
                                {t.benefits.list.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3"><i data-feather="check-circle"></i> {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4 relative z-10 w-full">
                            {t.benefits.stats.map((stat, idx) => (
                                <div key={idx} className={`bg-white/10 p-6 rounded-2xl backdrop-blur-sm ${idx === 2 ? 'md:col-span-2' : ''}`}>
                                    <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                                    <p className="text-sm uppercase tracking-widest opacity-80">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {t.benefits.cards.map((b, i) => (
                            <div key={i} className={`p-8 rounded-2xl border transition-all hover:bg-orange-primary hover:text-white group ${isLightMode ? 'bg-white border-black/5 shadow-lg' : 'bg-tech border-white/5 shadow-xl'}`}>
                                <div className="w-12 h-12 bg-orange-primary/10 flex items-center justify-center rounded-xl mb-6 group-hover:bg-white/20 transition-colors">
                                    <i data-feather={b.icon} className="text-orange-primary group-hover:text-white transition-colors"></i>
                                </div>
                                <h3 className="text-xl font-bold mb-3 tracking-tighter">{b.title}</h3>
                                <p className="opacity-70 group-hover:opacity-90">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimonials" className={`py-24 overflow-hidden ${isLightMode ? 'bg-gray-200/50' : 'bg-tech/10'}`}>
                <div className="container text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold italic tracking-tighter">{t.testimonials.quote}</h2>
                </div>

                <div className="relative flex overflow-x-hidden">
                    <div className="animate-marquee flex gap-8 whitespace-nowrap py-12 px-4 shadow-inner">
                        {[...t.testimonials.list, ...t.testimonials.list].map((t_item, i) => (
                            <div key={i} className={`flex-shrink-0 w-[400px] md:w-[500px] p-10 rounded-[2.5rem] text-left border relative whitespace-normal transition-all hover:scale-[1.02] ${isLightMode ? 'bg-white border-black/5 shadow-xl' : 'bg-tech/40 border-white/5 shadow-2xl backdrop-blur-sm'}`}>
                                <div className="text-6xl text-orange-primary opacity-20 absolute top-8 left-8 font-serif leading-none">"</div>
                                <p className="text-lg md:text-xl mb-12 relative z-10 italic leading-relaxed opacity-90 font-medium">
                                    {t_item.text}
                                </p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-14 h-14 bg-gradient-to-tr from-orange-primary to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-primary/20">
                                        {t_item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg leading-tight">{t_item.name}</p>
                                        <p className="text-sm font-semibold tracking-wider uppercase opacity-50 text-orange-primary">{t_item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container mt-16 text-center">
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-2 h-2 rounded-full bg-orange-primary/20"></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 container">
                <div className="rounded-3xl bg-gradient-to-r from-orange-primary to-orange-600 p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10 leading-tight">{t.cta.title}</h2>
                    <p className="text-xl opacity-90 mb-12 max-w-xl mx-auto relative z-10">
                        {t.cta.desc}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                        <Link
                            to={withCurrentParams("/contact")}
                            onClick={() => trackBehavior('footer_cta_start')}
                            className="px-10 py-4 bg-white text-orange-primary rounded-full font-bold text-lg hover:bg-space hover:text-white transition-all shadow-xl"
                        >
                            {t.cta.start}
                        </Link>
                        <Link
                            to={withCurrentParams("/contact")}
                            onClick={() => trackBehavior('footer_cta_consultant')}
                            className={`px-10 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white hover:text-orange-primary transition-all backdrop-blur-sm`}
                        >
                            {t.cta.consultant}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

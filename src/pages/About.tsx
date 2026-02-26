import { useEffect } from 'react';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';

interface AboutProps {
    lang: Language;
    isLightMode: boolean;
}

export default function About({ lang, isLightMode }: AboutProps) {
    const t = translations[lang];

    useEffect(() => {
        feather.replace();
    }, [lang, isLightMode]);

    return (
        <div className="pt-32 pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="container text-center py-16 relative">
                {/* Decorative background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-primary/5 rounded-full blur-3xl -z-10"></div>

                <div className="inline-block px-4 py-1 rounded-full glass mb-6">
                    <span className="text-orange-primary text-sm font-bold tracking-widest uppercase">
                        {t.aboutPage.badge}
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {t.aboutPage.title} <span className="text-orange-primary">{t.aboutPage.titleAccent}</span>
                </h1>
                <p className="max-w-3xl mx-auto text-xl opacity-70 leading-relaxed">
                    {t.aboutPage.desc}
                </p>
            </section>

            {/* Core Essence Section: Mission (2x2) + Values (Staggered) */}
            <section className="container py-20 relative">
                {/* Visual Connectivity: Faint lines connecting the blocks */}
                <div className="absolute inset-0 pointer-events-none -z-10 opacity-[0.05] dark:opacity-[0.08]">
                    <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none" preserveAspectRatio="none">
                        <line x1="66%" y1="0" x2="66%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
                        <line x1="0" y1="33%" x2="100%" y2="33%" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
                        <line x1="0" y1="66%" x2="100%" y2="66%" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
                    </svg>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* 1. Mission - The Hub (2x2 spanning) */}
                    <div className={`lg:col-span-2 lg:row-span-2 p-12 md:p-16 rounded-[56px] border relative overflow-hidden flex flex-col justify-end min-h-[500px] ${isLightMode ? 'bg-white border-black/5 shadow-[0_32px_80px_rgba(0,0,0,0.06)]' : 'bg-tech/30 border-white/5 shadow-2xl'
                        }`}>
                        {/* Large Abstract Tech Icon in background */}
                        <div className="absolute top-0 right-0 p-16 opacity-[0.05] dark:opacity-[0.1] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                            <i data-feather="cpu" className="w-64 h-64 text-orange-primary"></i>
                        </div>

                        <div className="relative z-10">
                            <span className="text-orange-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Foundation</span>
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
                                {t.aboutPage.story.title}
                            </h2>
                            <p className="text-xl md:text-2xl opacity-70 leading-relaxed font-medium max-w-2xl border-l-[4px] border-orange-primary pl-8">
                                {t.aboutPage.story.text}
                            </p>
                        </div>

                        {/* Animated Glow Detail */}
                        <div className="absolute -left-20 top-0 w-64 h-64 bg-orange-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                    </div>

                    {/* 2. Value 1: Intelligence (1x1) */}
                    <div className={`p-10 rounded-[48px] border transition-all duration-500 hover:border-orange-primary/40 group relative overflow-hidden flex flex-col items-center text-center justify-center ${isLightMode ? 'bg-white border-black/5 shadow-xl' : 'bg-tech/50 border-white/5 shadow-2xl'
                        }`}>
                        <div className="w-20 h-20 bg-orange-primary/10 rounded-3xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            <i data-feather={t.aboutPage.values[0].icon} className="text-orange-primary w-10 h-10"></i>
                        </div>
                        <h3 className="text-xs font-black tracking-[0.3em] mb-4 uppercase opacity-40 group-hover:opacity-100 group-hover:text-orange-primary transition-all font-mono">
                            {t.aboutPage.values[0].title}
                        </h3>
                        <p className="opacity-80 font-medium leading-relaxed">{t.aboutPage.values[0].desc}</p>

                        <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* 3. Value 2: Trust (1x1) */}
                    <div className={`p-10 rounded-[48px] border transition-all duration-500 hover:border-orange-primary/40 group relative overflow-hidden flex flex-col items-center text-center justify-center ${isLightMode ? 'bg-white border-black/5 shadow-xl' : 'bg-tech/50 border-white/5 shadow-2xl'
                        }`}>
                        <div className="w-20 h-20 bg-orange-primary/10 rounded-3xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                            <i data-feather={t.aboutPage.values[1].icon} className="text-orange-primary w-10 h-10"></i>
                        </div>
                        <h3 className="text-xs font-black tracking-[0.3em] mb-4 uppercase opacity-40 group-hover:opacity-100 group-hover:text-orange-primary transition-all font-mono">
                            {t.aboutPage.values[1].title}
                        </h3>
                        <p className="opacity-80 font-medium leading-relaxed">{t.aboutPage.values[1].desc}</p>

                        <div className="absolute inset-0 bg-gradient-to-bl from-orange-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* 4. Value 3: Speed (3x1 Horizontal Full width) */}
                    <div className={`lg:col-span-3 p-10 md:p-12 rounded-[56px] border transition-all duration-700 hover:border-orange-primary/40 group relative overflow-hidden flex flex-col md:flex-row items-center gap-10 ${isLightMode ? 'bg-white border-black/5 shadow-2xl' : 'bg-tech/40 border-white/5 shadow-2xl'
                        }`}>
                        <div className="w-32 h-32 shrink-0 bg-orange-primary/10 rounded-[40px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-700 relative">
                            <div className="absolute inset-0 bg-orange-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-110 transition-transform duration-700"></div>
                            <i data-feather={t.aboutPage.values[2].icon} className="text-orange-primary w-16 h-16 relative z-10 animate-float"></i>
                        </div>
                        <div className="flex-1 relative z-10">
                            <h3 className="text-4xl font-black mb-4 tracking-tighter group-hover:text-orange-primary transition-colors">
                                {t.aboutPage.values[2].title}
                            </h3>
                            <p className="text-xl md:text-2xl opacity-70 leading-relaxed font-medium">
                                {t.aboutPage.values[2].desc}
                            </p>
                        </div>

                        {/* Performance graph background detail */}
                        <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-[0.03] dark:opacity-[0.06] pointer-events-none group-hover:opacity-10 transition-opacity">
                            <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                                <path d="M0,80 C40,70 80,90 120,40 C160,20 180,30 200,10" stroke="currentColor" strokeWidth="4" fill="none" className="text-orange-primary" />
                                <path d="M0,80 C40,70 80,90 120,40 C160,20 180,30 200,10 L200,100 L0,100 Z" fill="currentColor" fillOpacity="0.1" className="text-orange-primary" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact/Stats Section */}
            <section className="container py-20 relative">
                {/* Visual Backdrop with floating elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[400px] bg-orange-primary/5 blur-[120px] rounded-[100px] -z-10 animate-pulse"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-primary/5 blur-[80px] rounded-full -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-primary/5 blur-[80px] rounded-full -z-10"></div>

                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1 rounded-full glass mb-6">
                        <span className="text-orange-primary text-sm font-bold tracking-[0.3em] uppercase">
                            Performance
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
                        {t.aboutPage.impact.title}
                    </h2>
                    <p className="max-w-2xl mx-auto opacity-70 text-lg">
                        {t.aboutPage.impact.desc}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {t.aboutPage.impact.stats.map((stat: { icon: string; value: string; label: string }, i: number) => (
                        <div key={i} className={`p-12 rounded-[48px] border transition-all duration-700 hover:-translate-y-2 group relative overflow-hidden ${isLightMode
                            ? 'bg-white/40 border-black/5 hover:border-orange-primary/30 shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
                            : 'bg-tech/20 border-white/5 hover:border-orange-primary/30 shadow-2xl'
                            }`}>
                            {/* Inner Glow */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-primary/5 rounded-full blur-3xl group-hover:bg-orange-primary/10 transition-colors"></div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white dark:bg-tech rounded-3xl flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                    <i data-feather={stat.icon} className="text-orange-primary w-7 h-7"></i>
                                </div>
                                <div className="text-5xl font-black mb-4 tracking-tighter text-black dark:text-white group-hover:text-orange-primary transition-colors duration-500">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-bold uppercase tracking-[0.4em] opacity-40 group-hover:opacity-70 transition-opacity">
                                    {stat.label}
                                </div>
                            </div>

                            {/* Decorative line */}
                            <div className="absolute bottom-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-orange-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* History Timeline Mockup */}
            <section className="container py-24 text-center">
                <h2 className="text-2xl font-bold mb-12 opacity-30 select-none">EST. 2026</h2>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-1 h-20 bg-gradient-to-b from-orange-primary to-transparent"></div>
                    <i data-feather="heart" className="text-orange-primary animate-pulse"></i>
                </div>
            </section>
        </div>
    );
}

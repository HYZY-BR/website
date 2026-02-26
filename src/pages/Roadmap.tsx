import { useEffect } from 'react';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';

interface RoadmapProps {
    lang: Language;
    isLightMode: boolean;
}

export default function Roadmap({ lang, isLightMode }: RoadmapProps) {
    const t = translations[lang];

    useEffect(() => {
        feather.replace();
    }, [lang, isLightMode]);

    return (
        <main className="pt-32 pb-24">
            {/* HERO SECTION */}
            <section className="container text-center py-16">
                <div className="inline-block px-4 py-1 rounded-full glass mb-4">
                    <span className="text-orange-primary text-xs font-bold tracking-widest uppercase">{t.roadmapPage.badge}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tighter">
                    {t.roadmapPage.title} <span className="text-orange-primary">{t.roadmapPage.titleAccent}</span>
                </h1>
                <p className="max-w-2xl mx-auto mb-8 text-lg opacity-80 leading-relaxed">
                    {t.roadmapPage.desc}
                </p>
            </section>

            {/* TIMELINE SECTION */}
            <section className="container max-w-5xl mx-auto relative px-4 sm:px-6">
                {/* Central line for desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-primary/50 via-orange-primary/20 to-transparent"></div>

                <div className="space-y-12 md:space-y-0">
                    {t.roadmapPage.milestones.map((milestone, idx) => (
                        <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} md:mb-24 last:mb-0`}>
                            {/* Connector dot */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass border-2 border-orange-primary/30 items-center justify-center z-10 bg-space shadow-xl shadow-orange-primary/10 transition-transform hover:scale-110">
                                <i data-feather={milestone.icon} className="text-orange-primary w-5 h-5"></i>
                            </div>

                            {/* Content Card */}
                            <div className={`w-full md:w-[45%] p-8 rounded-3xl border transition-all hover:translate-y-[-5px] group ${isLightMode ? 'bg-white border-black/5 shadow-xl' : 'bg-tech/40 border-white/5 shadow-2xl backdrop-blur-sm'}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-orange-primary font-orbitron font-bold tracking-wider">{milestone.quarter}</span>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${milestone.status === 'Done' || milestone.status === 'Concluído'
                                            ? 'bg-green-500/20 text-green-500'
                                            : milestone.status === 'In Progress' || milestone.status === 'Em Progresso'
                                                ? 'bg-orange-primary/20 text-orange-primary animate-pulse'
                                                : 'bg-white/10 text-white/50'
                                        }`}>
                                        {milestone.status}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 tracking-tighter group-hover:text-orange-primary transition-colors">{milestone.title}</h3>
                                <p className="opacity-70 leading-relaxed text-sm md:text-base">{milestone.desc}</p>
                            </div>

                            {/* Date indicator for mobile */}
                            <div className="md:hidden flex items-center gap-3 mt-4 ml-6 self-start">
                                <div className="w-2 h-2 rounded-full bg-orange-primary"></div>
                                <span className="text-xs font-bold opacity-50 uppercase tracking-widest">{milestone.quarter}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* UPCOMING SECTION */}
            <section className="container mt-32 text-center">
                <div className={`max-w-3xl mx-auto p-12 rounded-[2.5rem] border border-dashed ${isLightMode ? 'border-charcoal/20 bg-gray-50' : 'border-white/10 bg-white/5'}`}>
                    <div className="w-16 h-16 bg-orange-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <i data-feather="plus" className="text-orange-primary w-8 h-8"></i>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tighter">Want more?</h2>
                    <p className="opacity-70 mb-8 max-w-md mx-auto">
                        We are constantly identifying new ways to simplify your orchestration. Have a feature request?
                    </p>
                    <a href="/contact" className="btn btn-secondary inline-flex items-center gap-2">
                        Request Feature <i data-feather="arrow-right" className="w-4 h-4"></i>
                    </a>
                </div>
            </section>
        </main>
    );
}

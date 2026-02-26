import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackBehavior, withCurrentParams } from '../utils/tracking';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';

interface FeaturesProps {
    lang: Language;
    isLightMode: boolean;
}

export default function Features({ lang, isLightMode }: FeaturesProps) {
    const t = translations[lang];

    useEffect(() => {
        feather.replace();
    }, [lang, isLightMode]);

    return (
        <div className="pt-32 min-h-screen">
            {/* Header Section */}
            <section className="container py-16 text-center">
                <div className="inline-block px-4 py-1 rounded-full glass mb-6">
                    <span className="text-orange-primary text-sm font-bold tracking-widest uppercase">
                        {t.featuresPage.badge}
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    {t.featuresPage.title} <span className="text-orange-primary">{t.featuresPage.titleAccent}</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg opacity-70 mb-12">
                    {t.featuresPage.desc}
                </p>
            </section>

            {/* Main Features Grid */}
            <section className="container pb-24">
                <div className="grid md:grid-cols-2 gap-8">
                    {t.featuresPage.sections.map((section, idx) => (
                        <div
                            key={section.id}
                            className={`p-8 md:p-12 rounded-3xl border transition-all hover:scale-[1.02] ${isLightMode ? 'bg-white border-black/5 shadow-xl' : 'bg-tech/50 border-white/5 shadow-2xl'
                                }`}
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 bg-orange-primary/10 flex items-center justify-center rounded-2xl shrink-0">
                                    <i data-feather={section.icon} className="text-orange-primary w-8 h-8"></i>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 tracking-tighter">{section.title}</h3>
                                    <p className="opacity-70 mb-8 leading-relaxed italic border-l-2 border-orange-primary/30 pl-4">
                                        {section.desc}
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {section.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm font-medium">
                                                <i data-feather="check" className="text-orange-primary w-4 h-4"></i>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dashboard Preview Mockup */}
                <div className="mt-20 p-4 md:p-8 rounded-[40px] glass relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/5 to-transparent pointer-events-none"></div>

                    <div className={`p-4 md:p-8 rounded-[30px] shadow-2xl overflow-hidden border ${isLightMode ? 'bg-gray-50 border-black/10' : 'bg-[#1a1c1e] border-white/10'
                        }`}>
                        {/* Header Mirroring the Image */}
                        <div className="flex justify-between items-center mb-12 border-b pb-8 border-black/5 dark:border-white/5">
                            <div>
                                <h2 className={`text-2xl font-bold ${isLightMode ? 'text-charcoal' : 'text-white'}`}>
                                    {lang === 'pt' ? 'Gerenciar Workspaces' : 'Manage Workspaces'}
                                </h2>
                                <p className="text-sm opacity-50">
                                    {lang === 'pt' ? 'Visão geral de todos os projetos ativos.' : 'Overview of all active projects.'}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="hidden sm:flex p-1 bg-black/5 dark:bg-white/5 rounded-lg">
                                    <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-white/10 rounded shadow-sm">
                                        <i data-feather="grid" className="w-4 h-4"></i>
                                    </div>
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <i data-feather="list" className="w-4 h-4"></i>
                                    </div>
                                </div>
                                <Link
                                    to={withCurrentParams("/contact")}
                                    onClick={() => trackBehavior('features_dashboard_new_project')}
                                    className="btn btn-primary !py-2 !px-6 text-sm flex items-center justify-center"
                                >
                                    {lang === 'pt' ? '+ Novo Projeto' : '+ New Project'}
                                </Link>
                            </div>
                        </div>

                        {/* List Mirroring the Image */}
                        <div className="space-y-4">
                            {[
                                { name: 'Neural Engine', status: 'Ativo', date: '10/02/2026', stats: [0, 1, 0] },
                                { name: 'Cloud Nexus', status: 'Ativo', date: '03/02/2026', stats: [2, 1, 1] },
                                { name: 'Data Fabric', status: 'Ativo', date: '01/01/2026', stats: [3, 1, 4] }
                            ].map((proj, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border ${isLightMode ? 'bg-white border-black/5 hover:border-orange-primary/50' : 'bg-white/5 border-white/5 hover:border-orange-primary/50'
                                        } transition-all`}
                                >
                                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                                        <div className="w-10 h-10 bg-orange-primary/10 rounded-xl flex items-center justify-center">
                                            <i data-feather="box" className="text-orange-primary w-5 h-5"></i>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold">{proj.name}</span>
                                                <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                                                    {proj.status}
                                                </span>
                                            </div>
                                            <p className="text-xs opacity-40">HYZY • {proj.name.toLowerCase().replace(' ', '-')}-ws</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8 mb-4 md:mb-0">
                                        <div className="flex items-center gap-2 text-sm opacity-50">
                                            <i data-feather="box" className="w-4 h-4"></i> {proj.stats[0]}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm opacity-50">
                                            <i data-feather="users" className="w-4 h-4"></i> {proj.stats[1]}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm opacity-50">
                                            <i data-feather="key" className="w-4 h-4"></i> {proj.stats[2]}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-12">
                                        <span className="text-sm opacity-40">{proj.date}</span>
                                        <i data-feather="more-horizontal" className="opacity-40 cursor-pointer hover:text-orange-primary"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mini CTA */}
            <section className="container pb-24">
                <div className={`p-12 rounded-[40px] text-center border overflow-hidden relative ${isLightMode ? 'bg-white border-black/5' : 'bg-tech border-white/5'
                    }`}>
                    <h2 className="text-3xl font-bold mb-6 italic">"O hub central de tudo o que sua empresa constrói."</h2>
                    <Link
                        to={withCurrentParams("/contact")}
                        onClick={() => trackBehavior('features_mini_cta_start')}
                        className="btn btn-primary inline-flex items-center justify-center"
                    >
                        {lang === 'pt' ? 'Começar Jornada' : 'Start Journey'}
                    </Link>
                </div>
            </section>
        </div>
    );
}

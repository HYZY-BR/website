import { useEffect } from 'react';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';

interface PrivacyProps {
    lang: Language;
    isLightMode: boolean;
}

export default function Privacy({ lang, isLightMode }: PrivacyProps) {
    const t = translations[lang];
    const p = t.privacyPage;

    useEffect(() => {
        feather.replace();
    }, [lang, isLightMode]);

    return (
        <div className="pt-32 pb-32">
            <section className="container mx-auto px-4 max-w-4xl">
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
                        {p.title}
                    </h1>
                    <p className="opacity-40 text-sm uppercase tracking-widest font-bold">
                        {p.lastUpdated}
                    </p>
                </div>

                <div className={`p-8 md:p-16 rounded-[3rem] border ${isLightMode ? 'bg-white border-black/5 shadow-2xl' : 'bg-tech/40 border-white/5 shadow-2xl'}`}>
                    <div className="space-y-12">
                        {p.sections.map((section, idx) => (
                            <div key={idx}>
                                <h2 className="text-2xl font-bold mb-4 tracking-tight">
                                    {section.title}
                                </h2>
                                <p className="opacity-70 leading-relaxed text-lg">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <p className="opacity-40 text-sm">
                        {lang === 'pt'
                            ? "HYZY.io - Automação Inteligente e Segura"
                            : "HYZY.io - Intelligent and Secure Automation"}
                    </p>
                </div>
            </section>
        </div>
    );
}

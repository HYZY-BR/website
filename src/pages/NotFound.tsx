import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';

interface NotFoundProps {
    lang: Language;
    isLightMode: boolean;
}

export default function NotFound({ lang, isLightMode }: NotFoundProps) {
    const t = translations[lang];

    useEffect(() => {
        feather.replace();
    }, [lang, isLightMode]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center pt-32 pb-20">
            <div className="container mx-auto px-4 text-center">
                <div className="relative inline-block mb-12">
                    <h1 className="text-9xl md:text-[15rem] font-bold tracking-tighter opacity-10 leading-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`p-8 rounded-full ${isLightMode ? 'bg-orange-primary/10 text-orange-primary' : 'bg-orange-primary/20 text-orange-primary'} animate-float`}>
                            <i data-feather="navigation-2" className="w-20 h-20 md:w-32 md:h-32 rotate-45"></i>
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    {t.error404.title}
                </h2>
                <p className="max-w-md mx-auto mb-12 opacity-60 text-lg md:text-xl">
                    {t.error404.desc}
                </p>

                <Link to="/" className="btn btn-primary inline-flex items-center gap-3 px-10 py-4 text-lg">
                    <i data-feather="arrow-left" className="w-5 h-5"></i>
                    {t.error404.back}
                </Link>
            </div>
        </div>
    );
}

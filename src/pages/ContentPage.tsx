import { useNavigate } from 'react-router-dom';
import { Language, translations } from '../i18n';

interface ContentPageProps {
    lang: Language;
    title: string;
}

export default function ContentPage({ lang, title }: ContentPageProps) {
    const t = translations[lang];
    const navigate = useNavigate();

    return (
        <div className="pt-40 pb-24 container mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="inline-block px-4 py-1 rounded-full glass mb-8 animate-pulse">
                <span className="text-orange-primary text-sm font-bold tracking-widest uppercase">
                    {title}
                </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
                {t.underConstruction.title}
            </h1>
            <p className="max-w-xl mx-auto mb-12 text-lg opacity-70">
                {t.underConstruction.desc}
            </p>
            <button
                onClick={() => navigate('/')}
                className="btn btn-primary"
            >
                {t.underConstruction.backHome}
            </button>

            {/* Decorative elements */}
            <div className="mt-20 w-full max-w-2xl h-48 rounded-3xl glass flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-primary/10 to-transparent"></div>
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-primary/20 animate-bounce"></div>
                    <div className="w-12 h-12 rounded-xl bg-white/10 animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-12 h-12 rounded-xl bg-orange-primary/20 animate-bounce [animation-delay:0.4s]"></div>
                </div>
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';
import { authService } from '../api-services/authService';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: Language;
    isLightMode: boolean;
}

type ModalView = 'login' | 'forgot';

export default function LoginModal({ isOpen, onClose, lang, isLightMode }: LoginModalProps) {
    const t = translations[lang];
    const [view, setView] = useState<ModalView>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            feather.replace();
            document.body.style.overflow = 'hidden';
            setView('login'); // Reset view when opening
            setEmail('');
            setPassword('');
            setError(null);
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    useEffect(() => {
        feather.replace();
    }, [view]);

    if (!isOpen) return null;

    const isLogin = view === 'login';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (isLogin) {
            setLoading(true);
            try {
                // Using authService for login
                await authService.login(email, password);

                // Redirect to the app subdomain in a new tab as requested
                window.open('https://app.hyzy.com.br', '_blank');
                onClose();
            } catch (err: any) {
                console.error('Login error:', err);
                setError(err.message || 'Erro ao fazer login');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-space/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className={`relative w-full max-w-md p-8 md:p-12 rounded-[2.5rem] shadow-2xl border animate-in zoom-in-95 duration-300 ${isLightMode ? 'bg-white border-black/5' : 'bg-tech border-white/5'}`}>
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-2 opacity-30 hover:opacity-100 transition-opacity"
                >
                    <i data-feather="x" className="w-6 h-6"></i>
                </button>

                <div className="mb-10 text-left">
                    <div className="inline-flex p-4 rounded-2xl bg-orange-primary/10 text-orange-primary mb-6">
                        <i data-feather={isLogin ? "lock" : "mail"} className="w-8 h-8"></i>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">
                        {isLogin ? t.loginModal.title : t.loginModal.forgotView.title}
                    </h2>
                    {!isLogin && (
                        <p className="text-sm opacity-60 leading-relaxed">
                            {t.loginModal.forgotView.desc}
                        </p>
                    )}
                </div>

                <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-1">
                            {t.loginModal.email}
                        </label>
                        <div className="relative">
                            <i data-feather="mail" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30"></i>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full pl-14 pr-6 py-4 rounded-2xl outline-none border transition-all ${isLightMode ? 'bg-gray-100 border-transparent focus:border-orange-primary/30 focus:bg-white text-charcoal' : 'bg-white/5 border-transparent focus:border-orange-primary/30 focus:bg-white/10 text-white'}`}
                                placeholder="name@company.com"
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    {isLogin && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-1">
                                    {t.loginModal.password}
                                </label>
                                <div className="relative">
                                    <i data-feather="key" className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30"></i>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full pl-14 pr-20 py-4 rounded-2xl outline-none border transition-all ${isLightMode ? 'bg-gray-100 border-transparent focus:border-orange-primary/30 focus:bg-white text-charcoal' : 'bg-white/5 border-transparent focus:border-orange-primary/30 focus:bg-white/10 text-white'}`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-orange-primary uppercase tracking-wider hover:opacity-70"
                                    >
                                        {t.loginModal.showPassword}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <p className="text-xs text-red-500 font-medium ml-1">
                                    {error}
                                </p>
                            )}

                            <div className="flex justify-end px-1">
                                <button
                                    type="button"
                                    onClick={() => setView('forgot')}
                                    className="text-xs font-bold text-orange-primary uppercase tracking-wider hover:opacity-70"
                                >
                                    {t.loginModal.forgot}
                                </button>
                            </div>
                        </>
                    )}

                    <div className="pt-4 space-y-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-orange-primary text-white font-bold rounded-2xl shadow-xl shadow-orange-primary/20 hover:scale-[1.02] active:scale-95 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? '...' : (isLogin ? t.loginModal.submit : t.loginModal.forgotView.submit)}
                        </button>

                        {!isLogin && (
                            <button
                                type="button"
                                onClick={() => setView('login')}
                                className="w-full py-4 text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
                            >
                                {t.loginModal.forgotView.back}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

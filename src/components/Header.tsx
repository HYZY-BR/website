import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { withCurrentParams } from '../utils/tracking';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';

interface HeaderProps {
    lang: Language;
    setLang: (lang: Language) => void;
    isLightMode: boolean;
    toggleTheme: () => void;
    openLogin: () => void;
}

export default function Header({ lang, setLang, isLightMode, toggleTheme, openLogin }: HeaderProps) {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const t = translations[lang];
    const location = useLocation();
    const isHome = location.pathname === '/' || ['/how-it-works', '/benefits', '/for-who', '/testimonials'].includes(location.pathname);

    // We rely on the global feather.replace() called in App.tsx
    // to avoid race conditions during re-renders 
    useEffect(() => {
        // Only run on mount or if absolutely needed for non-react elements
        // but removing it here prevents the "removeChild" error during lang switch
    }, [lang, isLightMode]);

    // Manage body scroll when sidebar is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isSidebarOpen]);

    const navLinks = [
        { name: t.nav.pricing, href: '/pricing' },
        { name: t.nav.howItWorks, href: '/how-it-works' },
        { name: t.nav.benefits, href: '/benefits' },
        { name: t.nav.forWho, href: '/for-who' },
        { name: t.nav.testimonials, href: '/testimonials' },
        { name: t.footer.links.support.find(l => l.path === '/contact')?.name || 'Contact', href: '/contact' },
    ];

    // Footer Links for Sidebar
    const footerSections = [
        {
            title: t.footer.product,
            links: t.footer.links.product.filter(link => link.path !== '/pricing')
        },
        {
            title: t.footer.company,
            links: t.footer.links.company
        },
        {
            title: t.footer.support,
            links: t.footer.links.support.filter(link => link.path !== '/contact')
        }
    ];

    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-[1000] backdrop-blur-md border-b transition-colors duration-300 ${isLightMode ? 'bg-gray-100/90 border-black/10' : 'bg-space/90 border-white/10'}`}>
                <nav className="container flex justify-between items-center py-3">
                    <Link to={withCurrentParams("/")} className="flex items-center gap-2 font-orbitron font-bold text-xl uppercase tracking-wider">
                        <img
                            id="header-logo"
                            className="w-10 h-10 object-contain"
                            src={`/assets/visual-identity/${isLightMode ? 'clear_mode' : 'dark-mode'}/favicon.svg`}
                            alt="HYZY.io Logo"
                        />
                        <span className={isLightMode ? 'text-charcoal' : 'text-white'}>HYZY.io</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={withCurrentParams(link.href)}
                                className={`uppercase text-xs font-bold tracking-widest hover:text-orange-primary transition-colors ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Language Dropdown - Persistent in Header for all sizes */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsLangOpen(true)}
                            onMouseLeave={() => setIsLangOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-2 border rounded-full px-3 py-1.5 text-[9px] font-black tracking-[0.1em] uppercase transition-all duration-300 ${isLightMode
                                    ? 'border-black/5 bg-black/5 hover:bg-black/10 text-black'
                                    : 'border-white/5 bg-white/5 hover:bg-white/10 text-white'
                                    }`}
                            >
                                <span>{lang}</span>
                                <span
                                    className={`opacity-40 transition-transform duration-300 flex ${isLangOpen ? 'rotate-180' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: feather.icons['chevron-down'].toSvg({ width: 10, height: 10 }) }}
                                />
                            </button>
                            <div className="absolute left-0 w-full h-4 top-full bg-transparent"></div>
                            <div className={`absolute right-0 top-[calc(100%+8px)] w-40 rounded-xl border backdrop-blur-3xl shadow-2xl transition-all duration-300 origin-top-right transform ${isLangOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} z-[1100] ${isLightMode ? 'bg-white/90 border-black/5' : 'bg-tech/90 border-white/10'}`}>
                                <div className="p-1.5 flex flex-col gap-0.5">
                                    {[
                                        { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
                                        { code: 'pt' as Language, label: 'Português', flag: '🇧🇷' }
                                    ].map((item) => (
                                        <button
                                            key={item.code}
                                            onClick={() => { setLang(item.code); setIsLangOpen(false); }}
                                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${lang === item.code ? 'bg-orange-primary text-white' : (isLightMode ? 'hover:bg-black/5 text-black/60' : 'hover:bg-white/5 text-white/60')}`}
                                        >
                                            <span className="flex items-center gap-2"><span>{item.flag}</span>{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Desktop Login */}
                        <button
                            onClick={openLogin}
                            className="btn btn-secondary text-xs hidden md:block py-2 ml-2"
                        >
                            {t.nav.login}
                        </button>

                        {/* Hamburger Button (Mobile/Tablet) */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className={`p-2 flex md:hidden items-center justify-center rounded-full transition-all ${isLightMode ? 'text-charcoal hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
                        >
                            <span dangerouslySetInnerHTML={{ __html: feather.icons['menu'].toSvg({ width: 22, height: 22 }) }} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 bg-space/60 backdrop-blur-md z-[2000] transition-opacity duration-500 md:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeSidebar}
            />

            {/* Mobile Sidebar Content */}
            <aside
                className={`fixed top-0 right-0 h-full w-[85%] max-w-[340px] z-[2100] transition-transform duration-500 ease-out md:hidden flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} ${isLightMode ? 'bg-white' : 'bg-space'}`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <span className="font-orbitron font-bold text-lg tracking-widest uppercase">Navigation</span>
                    <button
                        onClick={closeSidebar}
                        className={`p-2 rounded-full transition-all ${isLightMode ? 'hover:bg-black/5 text-charcoal' : 'hover:bg-white/10 text-white'}`}
                    >
                        <span dangerouslySetInnerHTML={{ __html: feather.icons['x'].toSvg({ width: 24, height: 24 }) }} />
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto pt-6 pb-20 px-6 space-y-10 custom-scrollbar">
                    {/* Main Navigation */}
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 mb-2">Menu</span>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={withCurrentParams(link.href)}
                                onClick={closeSidebar}
                                className={`text-2xl font-bold tracking-tighter hover:text-orange-primary transition-colors ${isLightMode ? 'text-charcoal' : 'text-white'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Footer Sections Nav */}
                    <div className="grid grid-cols-1 gap-8">
                        {footerSections.map((section) => (
                            <div key={section.title} className="space-y-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">{section.title}</span>
                                <div className="flex flex-col gap-3">
                                    {section.links.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={withCurrentParams(link.path)}
                                            onClick={closeSidebar}
                                            className={`text-sm font-medium transition-colors ${isLightMode ? 'text-charcoal/70 hover:text-orange-primary' : 'text-white/60 hover:text-white'}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-white/5 w-full"></div>

                    {/* Theme Toggle for Mobile (Replaced Language Switcher) */}
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">Interface</span>
                        <button
                            onClick={toggleTheme}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isLightMode
                                ? 'bg-black/5 border-black/5 text-charcoal'
                                : 'bg-white/5 border-white/5 text-white'}`}
                        >
                            <span className="font-bold">Theme</span>
                            <div className="flex items-center gap-3">
                                <span className="text-xs opacity-60 uppercase tracking-widest">{isLightMode ? 'Light' : 'Dark'}</span>
                                <span dangerouslySetInnerHTML={{ __html: feather.icons[isLightMode ? 'sun' : 'moon'].toSvg({ width: 20, height: 20 }) }} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className={`p-6 border-t ${isLightMode ? 'border-black/5' : 'border-white/5'}`}>
                    <button
                        onClick={() => { closeSidebar(); openLogin(); }}
                        className="w-full py-4 bg-orange-primary text-white font-bold rounded-2xl shadow-xl shadow-orange-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all text-lg"
                    >
                        <span dangerouslySetInnerHTML={{ __html: feather.icons['lock'].toSvg({ width: 18, height: 18 }) }} />
                        {t.nav.login}
                    </button>
                </div>
            </aside>
        </>
    );
}

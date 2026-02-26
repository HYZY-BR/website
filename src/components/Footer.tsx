import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withCurrentParams } from '../utils/tracking';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';

interface FooterProps {
    lang: Language;
    isLightMode: boolean;
}

export default function Footer({ lang, isLightMode }: FooterProps) {
    const t = translations[lang];

    useEffect(() => {
        feather.replace();
    }, [lang, isLightMode]);

    return (
        <footer data-debug="hyzy-footer-updated" className={`py-12 border-t transition-colors duration-300 ${isLightMode ? 'bg-white border-black/5' : 'bg-space border-white/5'}`}>
            <div className="container">
                <div className="grid md:grid-cols-4 gap-8 mb-12 text-center md:text-left">
                    <div className="space-y-6">
                        <Link to={withCurrentParams("/")} className={`flex items-center justify-center md:justify-start gap-2 font-orbitron font-bold text-xl uppercase tracking-wider transition-opacity hover:opacity-80 ${isLightMode ? 'text-charcoal' : 'text-white'}`}>
                            <img
                                id="footer-logo"
                                className="w-10 h-10 object-contain text-gray-400"
                                src={`/assets/visual-identity/${isLightMode ? 'clear_mode' : 'dark-mode'}/favicon.svg`}
                                alt="HYZY.io Logo"
                            />
                            <span>HYZY.io</span>
                        </Link>
                        <p className="opacity-60 text-sm">{t.footer.desc}</p>
                        <div className="flex justify-center md:justify-start gap-4">
                            {/* Email Icon */}
                            <a href={`mailto:${t.contactPage.info.email}`} className="p-2 bg-white/5 rounded-lg hover:bg-orange-primary transition-colors hover:text-white opacity-70 group" title="Email">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </a>
                            {/* GitHub Icon */}
                            <a href="https://github.com/HYZY-BR" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-orange-primary transition-colors hover:text-white opacity-70 group" title="GitHub">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className={`text-lg font-bold mb-6 tracking-tighter uppercase text-xs tracking-widest ${isLightMode ? 'text-charcoal' : 'text-white'}`}>{t.footer.product}</h4>
                        <ul className="space-y-4 opacity-60">
                            {t.footer.links.product.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={withCurrentParams(link.path)} className="hover:text-orange-primary transition-colors">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className={`text-lg font-bold mb-6 tracking-tighter uppercase text-xs tracking-widest ${isLightMode ? 'text-charcoal' : 'text-white'}`}>{t.footer.company}</h4>
                        <ul className="space-y-4 opacity-60">
                            {t.footer.links.company.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={withCurrentParams(link.path)} className="hover:text-orange-primary transition-colors">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className={`text-lg font-bold mb-6 tracking-tighter uppercase text-xs tracking-widest ${isLightMode ? 'text-charcoal' : 'text-white'}`}>{t.footer.support}</h4>
                        <ul className="space-y-4 opacity-60">
                            {t.footer.links.support.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={withCurrentParams(link.path)} className="hover:text-orange-primary transition-colors">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 text-sm">
                    <p>{t.footer.rights}</p>
                    <div className="flex gap-8">
                        <Link to={withCurrentParams("/terms")} className="hover:text-orange-primary transition-colors">{t.footer.terms}</Link>
                        <Link to={withCurrentParams("/privacy")} className="hover:text-orange-primary transition-colors">{t.footer.privacy}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

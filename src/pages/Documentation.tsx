import { useState, useEffect } from 'react';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';

interface DocumentationProps {
    lang: Language;
    isLightMode: boolean;
}

export default function Documentation({ lang, isLightMode }: DocumentationProps) {
    const t = translations[lang];
    const categories = t.docPage.categories;

    // State for Accordion: only one category open at a time
    const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0].id);
    // State for selected item content
    const [activeItem, setActiveItem] = useState(categories[0].items[0]);

    // Update feather icons when content changes
    useEffect(() => {
        feather.replace();
    }, [expandedCategory, activeItem, lang, isLightMode]);

    const toggleCategory = (id: string) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    return (
        <div className="container pt-32 min-h-screen flex flex-col md:flex-row bg-transparent">
            {/* Sidebar - No Scroll Container */}
            <aside className={`w-full md:w-72 p-6 md:py-8 h-auto border-r border-white/5 md:sticky md:top-24 self-start ${isLightMode ? 'bg-gray-50/50' : 'bg-tech/5'}`}>
                <div className="relative mb-8">
                    <i data-feather="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"></i>
                    <input
                        type="text"
                        placeholder={t.docPage.search}
                        className="w-full pl-12 pr-4 py-3 rounded-xl glass border-none text-xs outline-none focus:ring-1 focus:ring-orange-primary/50"
                    />
                </div>

                <nav className="space-y-4">
                    {categories.map((cat) => {
                        const isExpanded = expandedCategory === cat.id;
                        return (
                            <div key={cat.id} className="overflow-hidden">
                                <button
                                    onClick={() => toggleCategory(cat.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${isExpanded
                                        ? 'bg-orange-primary/10 text-orange-primary'
                                        : (isLightMode ? 'hover:bg-black/5 text-charcoal/60' : 'hover:bg-white/5 text-white/60')
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <i data-feather={cat.icon} className="w-4 h-4"></i>
                                        <span className="text-xs font-bold uppercase tracking-widest">{cat.title}</span>
                                    </div>
                                    <i data-feather="chevron-down" className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
                                </button>

                                {/* Sub-items (Accordion Content) */}
                                <div
                                    className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-2 ml-4 border-l border-orange-primary/20' : 'max-h-0 opacity-0 pointer-events-none'
                                        }`}
                                >
                                    {cat.items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveItem(item)}
                                            className={`w-full text-left py-2 px-6 text-sm transition-all relative ${activeItem.id === item.id
                                                ? 'text-orange-primary font-bold'
                                                : (isLightMode ? 'text-charcoal/40 hover:text-charcoal' : 'text-white/40 hover:text-white')
                                                }`}
                                        >
                                            {activeItem.id === item.id && (
                                                <div className="absolute left-[-1px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-orange-primary"></div>
                                            )}
                                            {item.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 md:p-12 max-w-5xl">
                <article key={activeItem.id} className="animate-fadeIn">
                    <div className="inline-block px-4 py-1 rounded-full glass mb-8">
                        <span className="text-orange-primary text-[10px] font-bold tracking-widest uppercase">
                            {expandedCategory ? categories.find(c => c.id === expandedCategory)?.title : t.docPage.badge}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter">
                        {activeItem.title.split(' ')[0]} <span className="text-orange-primary">{activeItem.title.split(' ').slice(1).join(' ')}</span>
                    </h1>

                    <p className="text-lg md:text-xl opacity-70 mb-12 leading-relaxed">
                        {activeItem.content}
                    </p>

                    <div className={`p-8 md:p-10 rounded-[2.5rem] border ${isLightMode ? 'bg-white border-black/5 shadow-xl' : 'bg-tech border-white/5 shadow-2xl'}`}>
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-4 uppercase tracking-tighter">
                            Exemplo de Uso
                        </h2>

                        <div className={`p-6 rounded-2xl font-mono text-sm relative group ${isLightMode ? 'bg-[#1e1e1e] text-white shadow-inner' : 'bg-black/60 text-white shadow-inner'}`}>
                            <pre className="overflow-x-auto whitespace-pre-wrap">
                                <code>{activeItem.code}</code>
                            </pre>
                            <button className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <i data-feather="copy" className="w-4 h-4"></i>
                            </button>
                        </div>

                        <div className="mt-8 flex items-start gap-4 p-4 rounded-xl bg-orange-primary/5 border border-orange-primary/10">
                            <i data-feather="info" className="text-orange-primary w-5 h-5 shrink-0 mt-0.5"></i>
                            <p className="text-sm opacity-60">
                                {lang === 'pt'
                                    ? "Certifique-se de estar com a última versão do utilitário instalado para evitar conflitos de versão."
                                    : "Make sure you have the latest version of the utility installed to avoid version conflicts."}
                            </p>
                        </div>
                    </div>
                </article>

                {/* Navigation buttons at bottom */}
                <div className="mt-20 flex justify-between gap-4 opacity-50">
                    <button className="text-sm flex items-center gap-2 hover:text-orange-primary transition-colors">
                        <i data-feather="arrow-left" className="w-4 h-4"></i> Previous
                    </button>
                    <button className="text-sm flex items-center gap-2 hover:text-orange-primary transition-colors">
                        Next <i data-feather="arrow-right" className="w-4 h-4"></i>
                    </button>
                </div>
            </main>
        </div>
    );
}

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackBehavior, trackPlanSelection, withCurrentParams } from '../utils/tracking';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';

interface PricingProps {
    lang: Language;
    isLightMode: boolean;
}

export default function Pricing({ lang, isLightMode }: PricingProps) {
    const t = translations[lang];
    const p = t.pricingPage;

    useEffect(() => {
        feather.replace();
    }, [lang, isLightMode]);

    return (
        <div className="pt-32 pb-20">
            {/* Header */}
            <section className="container text-center mb-16 animate-fadeIn">
                <div className="inline-block px-4 py-1 rounded-full glass mb-6">
                    <span className="text-orange-primary text-xs font-bold tracking-widest uppercase">
                        {p.badge}
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-tight">
                    {p.title} <span className="text-orange-primary">{p.titleAccent}</span>
                </h1>
                <p className="text-xl opacity-60 max-w-2xl mx-auto leading-relaxed">
                    {p.desc}
                </p>
            </section>

            {/* Grid */}
            <section className="container max-w-7xl">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {p.plans.map((plan: any) => (
                        <div
                            key={plan.id}
                            className={`relative flex flex-col p-8 rounded-3xl border transition-all hover:-translate-y-2 ${plan.id === 'scale' || plan.id === 'armor'
                                ? (isLightMode ? 'border-orange-primary shadow-2xl bg-white' : 'border-orange-primary/50 shadow-[0_0_50px_rgba(255,107,0,0.1)] bg-charcoal')
                                : (isLightMode ? 'border-black/5 bg-white shadow-xl' : 'border-white/5 bg-tech/40 shadow-2xl')
                                }`}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-lg ${plan.id === 'safe' ? 'bg-orange-primary text-white' :
                                    (plan.id === 'scale' ? 'bg-orange-primary text-white' :
                                        (plan.id === 'ultra' ? 'bg-blue-600 text-white' :
                                            (plan.id === 'armor' ? 'bg-purple-600 text-white' : 'bg-blue-500 text-white')))
                                    }`}>
                                    {plan.badge}
                                </div>
                            )}

                            {/* Title & Sub */}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2 tracking-tight">{plan.name}</h3>
                                <p className="text-xs opacity-50 font-medium px-4 leading-relaxed">{plan.sub}</p>
                            </div>

                            {/* Price */}
                            <div className="text-center mb-6">
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-2xl font-bold">R$</span>
                                    <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                                    <span className="text-sm opacity-40">/{p.monthly}</span>
                                </div>
                                <div className="mt-2 text-orange-primary font-bold text-xs uppercase tracking-widest bg-orange-primary/10 inline-block px-3 py-1 rounded-lg">
                                    {plan.workunits}
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="flex-1 space-y-4 mb-10">
                                {plan.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <i data-feather="check" className="w-4 h-4 text-orange-primary mt-1 shrink-0"></i>
                                        <span className="text-sm opacity-80 leading-snug">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                to={withCurrentParams("/contact")}
                                onClick={() => {
                                    trackBehavior(`pricing_plan_${plan.id}`);
                                    trackPlanSelection(plan.id);
                                }}
                                className={`w-full py-5 rounded-2xl font-bold text-sm text-center transition-all shadow-lg hover:shadow-orange-primary/20 hover:-translate-y-1 bg-orange-primary text-white hover:bg-orange-600`}
                            >
                                {p.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trust Quote */}
            <section className="container mt-24 text-center border-t border-white/5 pt-16">
                <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-40 mb-12">Trusted by modern teams</p>
                <div className={`flex flex-wrap justify-center items-center gap-16 opacity-30 ${isLightMode ? 'invert' : ''}`}>
                    {/* Mockup logos */}
                    <div className="text-2xl font-black tracking-tighter">TECHSCALE</div>
                    <div className="text-2xl font-black tracking-tighter">GLOBALRETAIL</div>
                    <div className="text-2xl font-black tracking-tighter">HYPERFLOW</div>
                    <div className="text-2xl font-black tracking-tighter">NEXUS.IO</div>
                </div>
            </section>
        </div>
    );
}

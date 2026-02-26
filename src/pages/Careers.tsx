import { useEffect, useState } from 'react';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';
import { careersService, JobApplication } from '../api-services/careersService';
import { getConsolidatedTracking, clearTrackingAfterConversion, getSelectedPlan } from '../utils/tracking';

interface CareersProps {
    lang: Language;
    isLightMode: boolean;
}

/**
 * Safe Icon component for Feather Icons in React.
 */
const Icon = ({ name, className }: { name: string; className?: string }) => {
    const icon = feather.icons[name];
    if (!icon) return null;

    return (
        <span
            className={`inline-flex items-center justify-center ${className || ''}`}
            dangerouslySetInnerHTML={{
                __html: icon.toSvg({
                    'stroke-width': 2,
                    'width': '100%',
                    'height': '100%'
                })
            }}
        />
    );
};


export default function Careers({ lang, isLightMode }: CareersProps) {
    const t = translations[lang];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState<Omit<JobApplication, 'metadata'>>({
        full_name: '',
        email: '',
        phone: '',
        position: '',
        resume_url: '',
        linkedin_url: '',
        cover_letter: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus('idle');

        // Extract tracking metadata
        const trackingData = getConsolidatedTracking();
        const selectedPlan = getSelectedPlan();

        try {
            await careersService.submitApplication({
                ...formData,
                metadata: {
                    tracking: trackingData || {},
                    intent: selectedPlan ? { selected_plan: selectedPlan } : {}
                }
            });
            setSubmissionStatus('success');
            clearTrackingAfterConversion();
            setFormData({
                full_name: '',
                email: '',
                phone: '',
                position: '',
                resume_url: '',
                linkedin_url: '',
                cover_letter: ''
            });
        } catch (err) {
            console.error('Error submitting application:', err);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-44 pb-32 overflow-hidden relative min-h-screen">
            {/* Technological Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className={`absolute inset-0 opacity-[0.03] ${isLightMode ? 'bg-[url("https://www.transparenttextures.com/patterns/carbon-fibre.png")]' : 'bg-[url("https://www.transparenttextures.com/patterns/stardust.png")]'}`}></div>
                <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] bg-orange-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-orange-primary/5 rounded-full blur-[100px]"></div>
            </div>

            <main className="container mx-auto px-4 relative z-10">
                {/* Hero / Header Section */}
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass border border-orange-primary/20 mb-8 hover:-translate-y-1 transition-transform cursor-default">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-primary"></span>
                        </span>
                        <span className="text-orange-primary text-[10px] font-black tracking-[0.3em] uppercase">
                            {t.careersPage.badge}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-balance">
                        {t.careersPage.title} <br />
                        <span className="text-orange-primary italic relative inline-block">
                            {t.careersPage.titleAccent}
                            <div className="absolute -bottom-1 left-0 w-full h-1 bg-orange-primary/10 blur-sm"></div>
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium opacity-60 leading-relaxed tracking-tight">
                        {t.careersPage.desc}
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-12 items-start max-w-7xl mx-auto">
                    {/* Left Side: Culture & Values (Visual focus) */}
                    <div className="lg:w-1/3 space-y-6 order-2 lg:order-1">
                        <div className="lg:sticky lg:top-40">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-8 border-l-2 border-orange-primary/30 pl-4">Hiring_Info</h2>

                            <div className="space-y-3">
                                {t.careersPage.culture.items.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`p-6 rounded-[2rem] border transition-all duration-300 group flex items-start gap-5 backdrop-blur-md ${isLightMode ? 'bg-white/40 border-black/[0.03]' : 'bg-tech/20 border-white/[0.03]'
                                            }`}
                                    >
                                        <div className="shrink-0 w-10 h-10 bg-orange-primary/10 rounded-lg flex items-center justify-center">
                                            <Icon name={item.icon} className="w-4 h-4 text-orange-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black tracking-tight mb-1 group-hover:text-orange-primary transition-colors">{item.title}</h3>
                                            <p className="text-xs opacity-50 leading-relaxed font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: The Form (Action focus) */}
                    <div className="lg:w-2/3 order-1 lg:order-2">
                        <div className={`relative p-0.5 rounded-[3rem] bg-gradient-to-br from-orange-primary/20 via-transparent to-orange-primary/10`}>
                            <div className={`p-8 md:p-12 rounded-[2.8rem] border relative overflow-hidden backdrop-blur-3xl shadow-xl ${isLightMode ? 'bg-white/95 border-transparent' : 'bg-charcoal/95 border-transparent'
                                }`}>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-primary/5 rounded-bl-[3rem] -mr-6 -mt-6"></div>

                                <div className="relative z-10">
                                    <div className="mb-10">
                                        <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter italic">{t.careersPage.form.title}</h2>
                                        <p className="text-base opacity-50 font-medium max-w-lg">{t.careersPage.form.desc}</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
                                            {/* Column 1 */}
                                            <div className="space-y-8">
                                                <div className="group relative">
                                                    <label className="text-[11px] font-black uppercase tracking-wider text-orange-primary mb-2 block ml-1">{t.careersPage.form.fullName}</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder={t.careersPage.form.fullName}
                                                        className="w-full bg-transparent border-b border-orange-primary/10 py-2 px-1 text-lg font-bold outline-none transition-all placeholder:opacity-20 focus:border-orange-primary"
                                                        value={formData.full_name}
                                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="group relative">
                                                    <label className="text-[11px] font-black uppercase tracking-wider text-orange-primary mb-2 block ml-1">{t.careersPage.form.email}</label>
                                                    <input
                                                        required
                                                        type="email"
                                                        placeholder={t.careersPage.form.email}
                                                        className="w-full bg-transparent border-b border-orange-primary/10 py-2 px-1 text-lg font-bold outline-none transition-all placeholder:opacity-20 focus:border-orange-primary"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                                <div className="group relative">
                                                    <label className="text-[11px] font-black uppercase tracking-wider text-orange-primary mb-2 block ml-1">{t.careersPage.form.phone}</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder={t.careersPage.form.phone}
                                                        className="w-full bg-transparent border-b border-orange-primary/10 py-2 px-1 text-lg font-bold outline-none transition-all placeholder:opacity-20 focus:border-orange-primary"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Column 2 */}
                                            <div className="space-y-8">
                                                <div className="group relative">
                                                    <label className="text-[11px] font-black uppercase tracking-wider text-orange-primary mb-2 block ml-1">{t.careersPage.form.position}</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder={t.careersPage.form.position}
                                                        className="w-full bg-transparent border-b border-orange-primary/10 py-2 px-1 text-lg font-bold outline-none transition-all placeholder:opacity-20 focus:border-orange-primary"
                                                        value={formData.position}
                                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                    />
                                                </div>
                                                <div className="group relative">
                                                    <label className="text-[11px] font-black uppercase tracking-wider text-orange-primary mb-2 block ml-1">{t.careersPage.form.resume}</label>
                                                    <input
                                                        required
                                                        type="url"
                                                        placeholder={t.careersPage.form.resume}
                                                        className="w-full bg-transparent border-b border-orange-primary/10 py-2 px-1 text-lg font-bold outline-none transition-all placeholder:opacity-20 focus:border-orange-primary"
                                                        value={formData.resume_url}
                                                        onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                                                    />
                                                </div>
                                                <div className="group relative">
                                                    <label className="text-[11px] font-black uppercase tracking-wider text-orange-primary mb-2 block ml-1">{t.careersPage.form.linkedin}</label>
                                                    <input
                                                        type="url"
                                                        placeholder={t.careersPage.form.linkedin}
                                                        className="w-full bg-transparent border-b border-orange-primary/10 py-2 px-1 text-lg font-bold outline-none transition-all placeholder:opacity-20 focus:border-orange-primary"
                                                        value={formData.linkedin_url}
                                                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Full Width */}
                                            <div className="md:col-span-2 space-y-3">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-orange-primary mb-2 block ml-1">{t.careersPage.form.coverLetter}</label>
                                                <textarea
                                                    required
                                                    className={`w-full bg-transparent border rounded-[2rem] outline-none p-6 h-32 transition-all focus:border-orange-primary text-base font-bold placeholder:opacity-20 ${isLightMode ? 'border-black/[0.04] bg-black/[0.02]' : 'border-white/[0.04] bg-white/[0.02]'
                                                        }`}
                                                    placeholder={t.careersPage.form.coverLetter}
                                                    value={formData.cover_letter}
                                                    onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                disabled={isSubmitting}
                                                className={`group relative w-full h-16 overflow-hidden rounded-2xl bg-orange-primary text-white font-black text-xl tracking-tighter transition-all hover:scale-[1.01] active:scale-[0.99] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                                    }`}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-orange-primary via-orange-600 to-orange-primary bg-[length:200%_100%] animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                                <div className="relative z-10 flex items-center justify-center gap-3">
                                                    <span>{isSubmitting ? 'INITIATING...' : t.careersPage.form.submit}</span>
                                                    {!isSubmitting && (
                                                        <Icon name="terminal" className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    )}
                                                </div>
                                            </button>
                                        </div>

                                        {/* Status Displays */}
                                        {submissionStatus === 'success' && (
                                            <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 text-center font-black animate-slide-up text-sm">
                                                {">> SUCCESS: MISSION DEPLOYED"}
                                            </div>
                                        )}
                                        {submissionStatus === 'error' && (
                                            <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center font-black animate-shake text-sm">
                                                {">> ERROR: SYSTEM REJECTED TRANSMISSION"}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

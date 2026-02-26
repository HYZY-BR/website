import { useEffect, useState } from 'react';
import feather from 'feather-icons';
import { Language, translations } from '../i18n';
import { contactService, ContactRequest } from '../api-services/contactService';
import { getConsolidatedTracking, clearTrackingAfterConversion, getSelectedPlan } from '../utils/tracking';

interface ContactProps {
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


export default function Contact({ lang, isLightMode }: ContactProps) {
    const t = translations[lang];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState<Omit<ContactRequest, 'metadata'>>({
        full_name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus('idle');

        // Extract tracking metadata
        const trackingData = getConsolidatedTracking();
        const selectedPlan = getSelectedPlan();

        try {
            await contactService.submitContactRequest({
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
                subject: '',
                message: ''
            });
        } catch (err) {
            console.error('Error submitting contact request:', err);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-32 pb-20 overflow-hidden">
            <section className="container py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Info Side */}
                    <div className="relative">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-primary/10 rounded-full blur-[100px] -z-10"></div>

                        <div className="inline-block px-4 py-1 rounded-full glass mb-6">
                            <span className="text-orange-primary text-sm font-bold tracking-widest uppercase">
                                {t.contactPage.badge}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tighter">
                            {t.contactPage.title} <span className="text-orange-primary">{t.contactPage.titleAccent}</span>
                        </h1>

                        <p className="text-lg opacity-70 mb-12 leading-relaxed max-w-lg">
                            {t.contactPage.desc}
                        </p>

                        <div className="space-y-10">
                            <div className="flex items-center gap-6 group">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:bg-orange-primary group-hover:text-white ${isLightMode ? 'bg-white shadow-xl text-orange-primary' : 'bg-tech shadow-2xl text-orange-primary'}`}>
                                    <Icon name="mail" className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Email</p>
                                    <p className="text-lg font-medium">{t.contactPage.info.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:bg-orange-primary group-hover:text-white ${isLightMode ? 'bg-white shadow-xl text-orange-primary' : 'bg-tech shadow-2xl text-orange-primary'}`}>
                                    <Icon name="phone" className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Phone</p>
                                    <p className="text-lg font-medium">{t.contactPage.info.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:bg-orange-primary group-hover:text-white ${isLightMode ? 'bg-white shadow-xl text-orange-primary' : 'bg-tech shadow-2xl text-orange-primary'}`}>
                                    <Icon name="map-pin" className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Office</p>
                                    <p className="text-lg font-medium">{t.contactPage.info.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-16 flex gap-4">
                            <a href={`mailto:${t.contactPage.info.email}`} className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-orange-primary transition-colors shadow-lg group">
                                <Icon name="mail" className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </a>
                            <a href="https://github.com/HYZY-BR" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-orange-primary transition-colors shadow-lg group">
                                <Icon name="github" className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className={`p-8 md:p-10 rounded-[2.5rem] border relative ${isLightMode ? 'bg-white border-black/5 shadow-2xl' : 'bg-tech/40 border-white/5 shadow-2xl'}`}>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-2">{t.contactPage.form.name}</label>
                                        <input
                                            required
                                            type="text"
                                            className={`w-full p-4 rounded-2xl outline-none border focus:border-orange-primary/50 transition-all ${isLightMode ? 'bg-gray-50 border-black/5' : 'bg-white/5 border-white/5'}`}
                                            placeholder="John Doe"
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-2">{t.contactPage.form.email}</label>
                                        <input
                                            required
                                            type="email"
                                            className={`w-full p-4 rounded-2xl outline-none border focus:border-orange-primary/50 transition-all ${isLightMode ? 'bg-gray-50 border-black/5' : 'bg-white/5 border-white/5'}`}
                                            placeholder="john@company.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-2">{t.contactPage.form.phone}</label>
                                        <input
                                            type="tel"
                                            className={`w-full p-4 rounded-2xl outline-none border focus:border-orange-primary/50 transition-all ${isLightMode ? 'bg-gray-50 border-black/5' : 'bg-white/5 border-white/5'}`}
                                            placeholder="+00 (00) 00000-0000"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-2">{t.contactPage.form.subject}</label>
                                        <input
                                            required
                                            type="text"
                                            className={`w-full p-4 rounded-2xl outline-none border focus:border-orange-primary/50 transition-all ${isLightMode ? 'bg-gray-50 border-black/5' : 'bg-white/5 border-white/5'}`}
                                            placeholder="Project Inquiry"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-2">{t.contactPage.form.message}</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className={`w-full p-4 rounded-2xl outline-none border focus:border-orange-primary/50 transition-all resize-none ${isLightMode ? 'bg-gray-50 border-black/5' : 'bg-white/5 border-white/5'}`}
                                        placeholder="Tell us about your needs..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    className={`btn btn-primary w-full !py-6 text-lg group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? '...' : t.contactPage.form.send}
                                    {!isSubmitting && <Icon name="send" className="inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                                </button>

                                {submissionStatus === 'success' && (
                                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 text-center font-bold text-sm animate-slide-up">
                                        Message sent successfully!
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Badge effect */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-primary/20 rounded-full blur-3xl animate-pulse"></div>
                    </div>

                </div>
            </section>

            {/* Real Map Section */}
            <section className="container mt-20">
                <div className={`h-[500px] rounded-[3.5rem] border overflow-hidden relative group ${isLightMode ? 'border-black/5 shadow-2xl' : 'border-white/5 shadow-2xl'}`}>
                    {/* Map iframe */}
                    <div className="absolute inset-0">
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: isLightMode ? 'grayscale(0.2) contrast(1.1)' : 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(t.contactPage.info.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                        ></iframe>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

                    <div className={`absolute bottom-10 left-10 p-8 glass rounded-[2.5rem] max-w-sm border transition-all duration-500 hover:scale-105 ${isLightMode ? 'bg-white/80 border-black/5' : 'bg-tech/80 border-white/10'}`}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-orange-primary rounded-2xl flex items-center justify-center shadow-lg">
                                <Icon name="map-pin" className="text-white w-6 h-6" />
                            </div>
                            <h4 className="text-2xl font-black tracking-tighter">HYZY HQ</h4>
                        </div>
                        <p className="text-lg opacity-70 leading-relaxed font-medium">{t.contactPage.info.address}</p>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.contactPage.info.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-orange-primary font-bold mt-6 hover:gap-4 transition-all"
                        >
                            Open in Google Maps <Icon name="arrow-right" className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, X, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const isFormValid = formData.name.trim() !== '' && 
                      formData.email.trim() !== '' && 
                      formData.message.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-20">
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-xl mx-auto lg:mx-0"
            >
              <h1 className="text-4xl font-bold text-brand-navy mb-8">Request Free Consultation</h1>
              <div className="glass p-6 md:p-8 rounded-3xl shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all hover:border-brand-blue/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all hover:border-brand-blue/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all hover:border-brand-blue/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Your Message *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none h-40 transition-all hover:border-brand-blue/30 resize-none"
                    />
                  </div>
                  <button 
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-navy transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        SUBMIT <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-bold text-brand-navy mb-8">Get In Touch</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-blue hover:bg-white hover:shadow-lg hover:ring-1 hover:ring-brand-blue/20 group">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0 group-hover:bg-brand-blue transition-colors">
                      <MapPin className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1 text-lg">Reach Us</div>
                      <p className="text-slate-500 leading-relaxed">
                        Arkanj Tech Solutions, Krishna Complex, Pipratand Barwadda Dhanbad, Opposite-Koylanchal school, Pin 826010
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-blue hover:bg-white hover:shadow-lg hover:ring-1 hover:ring-brand-blue/20 group">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0 group-hover:bg-brand-blue transition-colors">
                      <Mail className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1 text-lg">Email Us</div>
                      <p className="text-slate-500">superadmin@arkanj.tech</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-blue hover:bg-white hover:shadow-lg hover:ring-1 hover:ring-brand-blue/20 group">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0 group-hover:bg-brand-blue transition-colors">
                      <Phone className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1 text-lg">Call Us</div>
                      <p className="text-slate-500">+91 70049 10317</p>
                    </div>
                  </div> 
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitted(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-10 text-center"
            >
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors group"
              >
                <X className="w-6 h-6 text-slate-400 group-hover:text-brand-blue" />
              </button>

              <div className="mb-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-brand-navy mb-2">Sent Successfully!</h2>
                <p className="text-slate-500 leading-relaxed">
                  Thank you for reaching out. We will contact you within <span className="text-brand-blue font-bold">24 hours</span>.
                </p>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 group"
              >
                Great, thanks! <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Google Maps Embed Mockup */}
      <section className="h-[500px] w-full bg-slate-200 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" 
          alt="Map" 
          className="w-full h-full object-cover opacity-50 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass p-6 rounded-2xl text-center max-w-sm">
            <MapPin className="w-10 h-10 text-brand-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-navy mb-2">Our Headquarters</h3>
            <p className="text-sm text-slate-600 mb-4">Visit us at our main office in Dhanbad, India.</p>
            <button className="bg-brand-blue text-white px-6 py-2 rounded-lg text-sm font-bold">OPEN IN MAPS</button>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
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
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Your Email *"
                      className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none"
                    />
                  </div>
                  <textarea
                    placeholder="Your Message *"
                    className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 outline-none h-40"
                  />
                  <button className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-navy transition-all flex items-center justify-center gap-2">
                    SUBMIT <Send className="w-5 h-5" />
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
                        Arkanj Tech Solutions, Pipratand Barwadda, Dhanbad – 82704, Jharkhand, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-blue hover:bg-white hover:shadow-lg hover:ring-1 hover:ring-brand-blue/20 group">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0 group-hover:bg-brand-blue transition-colors">
                      <Mail className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1 text-lg">Email Us</div>
                      <p className="text-slate-500">admin@arkanj.tech</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-transparent transition-all duration-300 hover:border-brand-blue hover:bg-white hover:shadow-lg hover:ring-1 hover:ring-brand-blue/20 group">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0 group-hover:bg-brand-blue transition-colors">
                      <Phone className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 mb-1 text-lg">Call Us</div>
                      <p className="text-slate-500">+91 700-491-0317</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-brand-navy p-8 rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-2">Call us Toll-Free</h3>
                <div className="text-4xl font-black text-brand-blue tracking-tighter">0-000-0000-000</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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

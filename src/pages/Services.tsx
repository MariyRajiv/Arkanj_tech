import React from 'react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { SERVICES } from '@/src/types';
import { Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import BookingModal from '@/src/components/BookingModal';
import { CustomEditIcon } from '@/src/components/CustomIcons';

const iconMap: Record<string, any> = {
  Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User, CustomEditIcon
};

export default function Services() {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const pricingRef = React.useRef<HTMLDivElement>(null);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-20 grid-pattern">
      {/* Hero */}
      <section className="py-32 bg-brand-navy text-white relative overflow-hidden mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tight">Our Services</h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              We provide a wide range of AI-driven solutions tailored to your specific needs, from startups to established enterprises.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary text-lg px-12 py-5 shadow-2xl shadow-brand-blue/40"
            >
              Book Appointment
            </motion.button>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-20 grid-pattern-light" />
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000" 
            alt="Tech" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/90 to-brand-navy" />
      </section>

      {/* Detailed Services */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-extrabold text-brand-navy mb-6 tracking-tight"
            >
              How can we help you?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              Our expert team combines deep technical knowledge with strategic business insight to deliver results.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex flex-col sm:flex-row gap-8 p-10 rounded-[2.5rem] border border-slate-100 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-brand-blue hover:shadow-[0_30px_60px_rgba(59,130,246,0.1)] hover:ring-1 hover:ring-brand-blue/20 group"
                >
                  <div className="w-20 h-20 bg-brand-light rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:scale-110 transition-all duration-500 shadow-sm">
                    <Icon className="w-10 h-10 text-brand-blue group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-3xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors">{service.title}</h3>
                    </div>
                    <div className="text-slate-500 leading-relaxed text-lg markdown-content">
                      <Markdown>{service.description}</Markdown>
                    </div>
                    <ul className="grid grid-cols-1 gap-3">
                      {['Custom AI Integration', '24/7 Smart Support', 'Strategic Positioning'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-slate-600 font-semibold">
                          <CheckCircle2 className="w-5 h-5 text-brand-blue" /> {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <span className="bg-brand-light text-brand-blue px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Starts ${service.price}</span>
                      <button 
                        onClick={() => setIsBookingOpen(true)}
                        className="text-brand-blue font-bold flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        Get Started <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-32 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-extrabold mb-6 tracking-tight">Transparent Pricing</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">Choose the plan that fits your growth stage. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: 'Starter', price: '499', features: ['Basic AI Chatbot', '5 Pages Website', 'Email Support'] },
              { name: 'Professional', price: '1499', features: ['Advanced Automation', 'Custom SaaS Platform', 'Priority Support'], popular: true },
              { name: 'Enterprise', price: 'Custom', features: ['Full AI Integration', 'Dedicated Team', '24/7 Phone Support'] }
            ].map((plan, i) => (
              <div key={i} className={cn(
                "p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col",
                plan.popular ? "bg-brand-blue border-brand-blue shadow-[0_30px_60px_rgba(59,130,246,0.25)] scale-105 z-10" : "bg-white/5 border-white/10 hover:bg-white/10"
              )}>
                <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                <div className="text-5xl font-black mb-10">{plan.price === 'Custom' ? plan.price : `$${plan.price}`}<span className="text-sm font-normal text-slate-400 ml-2">/project</span></div>
                <ul className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-sm font-semibold">
                      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", plan.popular ? "bg-white/20" : "bg-brand-blue/20")}>
                        <CheckCircle2 className={cn("w-4 h-4", plan.popular ? "text-white" : "text-brand-blue")} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className={cn(
                    "w-full py-5 rounded-2xl font-bold transition-all text-lg active:scale-95",
                    plan.popular ? "bg-white text-brand-blue hover:bg-slate-100" : "bg-brand-blue text-white hover:bg-brand-navy"
                  )}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent/10 blur-[120px] rounded-full" />
      </section>

      {/* Pricing CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-6">Need a custom solution?</h2>
          <p className="text-slate-500 mb-10">We offer tailored pricing plans for complex enterprise projects and long-term partnerships.</p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/contact"
              className="bg-brand-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-navy transition-all"
            >
              CONTACT SALES
            </Link>
            <button 
              onClick={scrollToPricing}
              className="bg-white border border-slate-200 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all"
            >
              VIEW PRICING
            </button>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

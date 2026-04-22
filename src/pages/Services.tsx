import React from 'react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { SERVICES } from '@/src/types';
import { Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import BookingModal from '@/src/components/BookingModal';
import { UpTechIcon, FinTechIcon, EduTechIcon, DeepTechIcon, MedTechIcon, LaunchTechIcon } from '@/src/components/CustomIcons';

const iconMap: Record<string, any> = {
  Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User, 
  UpTechIcon, FinTechIcon, EduTechIcon, DeepTechIcon, MedTechIcon, LaunchTechIcon
};

export default function Services() {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const location = useLocation();
  const [highlightedId, setHighlightedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setHighlightedId(hash);
      const timer = setTimeout(() => {
        setHighlightedId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

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
            alt="Tech background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            width="2000"
            height="1000"
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
              const isHighlighted = highlightedId === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  animate={isHighlighted ? { scale: 1.05, y: -10 } : { scale: 1, y: 0 }}
                  className={cn(
                    "flex flex-col sm:flex-row gap-8 p-10 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden",
                    service.highlighted 
                      ? "bg-brand-navy border-brand-blue shadow-[0_30px_60px_rgba(59,130,246,0.3)] ring-1 ring-brand-blue/50" 
                      : cn(
                          "border-slate-100 bg-white/80 backdrop-blur-sm hover:border-brand-blue hover:shadow-[0_30px_60px_rgba(59,130,246,0.1)] hover:ring-1 hover:ring-brand-blue/20",
                          isHighlighted && "border-brand-blue shadow-[0_30px_60px_rgba(59,130,246,0.2)] ring-2 ring-brand-blue/40"
                        )
                  )}
                >
                  {service.highlighted && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-blue via-brand-accent to-brand-blue animate-gradient-y" />
                  )}
                  <div className={cn(
                    "rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-sm group-hover:scale-110 overflow-hidden",
                    (service.id === 'medtech' || service.id === 'launchtech') ? "w-32 h-32" : "w-24 h-24",
                    service.highlighted ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/40" : "bg-brand-light text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
                  )}>
                    {Icon ? (
                      <Icon className="w-16 h-16" />
                    ) : (
                      <img 
                        src={service.icon} 
                        alt={service.title} 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <h3 className={cn(
                        "text-3xl font-bold transition-colors",
                        service.highlighted ? "text-white group-hover:text-brand-blue" : "text-brand-navy group-hover:text-brand-blue"
                      )}>{service.title}</h3>
                    </div>
                    <div className={cn(
                      "leading-relaxed text-lg markdown-content",
                      service.highlighted ? "text-slate-300" : "text-slate-500"
                    )}>
                      <Markdown>{service.description}</Markdown>
                    </div>
                    <ul className="grid grid-cols-1 gap-3">
                      {['Custom AI Integration', '24/7 Smart Support', 'Strategic Positioning'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-semibold">
                          <CheckCircle2 className="w-5 h-5 text-brand-blue" /> 
                          <span className={service.highlighted ? "text-slate-300" : "text-slate-600"}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={cn(
                      "flex items-center justify-between pt-6 border-t",
                      service.highlighted ? "border-white/10" : "border-slate-100"
                    )}>
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest",
                        service.highlighted ? "bg-brand-blue/20 text-brand-blue" : "bg-brand-light text-brand-blue"
                      )}>Starts ${service.price}</span>
                      <div className="flex items-center gap-6">
                        {service.id === 'edutech' ? (
                          <Link 
                            to="/edutech"
                            className="text-brand-blue font-bold flex items-center gap-2 hover:gap-3 transition-all"
                          >
                            Get Started <ArrowRight className="w-4 h-4" />
                          </Link>
                        ) : service.id === 'uptech' ? (
                          <Link 
                            to="/uptech"
                            className="text-brand-blue font-bold flex items-center gap-2 hover:gap-3 transition-all"
                          >
                            Get Started <ArrowRight className="w-4 h-4" />
                          </Link>
                        ) : (
                          <button 
                            onClick={() => setIsBookingOpen(true)}
                            className="text-brand-blue font-bold flex items-center gap-2 hover:gap-3 transition-all"
                          >
                            Get Started <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

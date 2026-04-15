import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { UpTechIcon, FinTechIcon, EduTechIcon, DeepTechIcon, MedTechIcon, LaunchTechIcon } from '@/src/components/CustomIcons';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { ArrowRight, Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User } from 'lucide-react';

const iconMap: Record<string, any> = {
  Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User,
  UpTechIcon, FinTechIcon, EduTechIcon, DeepTechIcon, MedTechIcon, LaunchTechIcon
};

interface ServicesGridProps {
  onBookingClick: () => void;
}

export default function ServicesGrid({ onBookingClick }: ServicesGridProps) {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-blue font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold text-brand-navy tracking-tight"
          >
            Tailored Solutions for <span className="text-brand-blue">Every Industry</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={cn(
                  "group card-modern relative overflow-hidden transition-all duration-500",
                  service.highlighted 
                    ? "bg-brand-navy border-brand-blue shadow-[0_20px_50px_rgba(59,130,246,0.3)] ring-1 ring-brand-blue/50" 
                    : "bg-white border-slate-100"
                )}
              >
                {service.highlighted && (
                  <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-brand-blue via-brand-accent to-brand-blue animate-gradient-x" />
                )}
                <div className={cn(
                  "absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -mr-16 -mt-16 transition-colors",
                  service.highlighted ? "bg-brand-blue/20" : "bg-brand-blue/5 group-hover:bg-brand-blue/10"
                )} />
                <div className={cn(
                  "rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm overflow-hidden",
                  (service.id === 'medtech' || service.id === 'launchtech') ? "w-32 h-32" : "w-24 h-24",
                  service.highlighted ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/40" : "bg-brand-light text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
                )}>
                  {Icon ? (
                    <Icon className="w-14 h-14" />
                  ) : (
                    <img 
                      src={service.icon} 
                      alt={service.title} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <h3 className={cn(
                  "text-2xl font-bold mb-4 transition-colors",
                  service.highlighted ? "text-white group-hover:text-brand-blue" : "text-brand-navy group-hover:text-brand-blue"
                )}>{service.title}</h3>
                <div className={cn(
                  "leading-relaxed mb-8 markdown-content",
                  service.highlighted ? "text-slate-300" : "text-slate-500"
                )}>
                  <Markdown>{service.description}</Markdown>
                </div>
                <div className={cn(
                  "pt-8 border-t flex items-center justify-between",
                  service.highlighted ? "border-white/10" : "border-slate-100"
                )}>
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-widest",
                    service.highlighted ? "text-brand-blue" : "text-slate-400"
                  )}>{service.category}</span>
                  {service.id === 'edutech' ? (
                    <Link 
                      to="/edutech"
                      className={cn(
                        "font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all text-brand-blue"
                      )}
                    >
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button 
                      onClick={onBookingClick}
                      className={cn(
                        "font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all text-brand-blue"
                      )}
                    >
                      Get Started <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

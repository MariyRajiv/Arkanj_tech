import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BrainCircuit, Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { SERVICES } from '@/src/types';
import BookingModal from '@/src/components/BookingModal';
import { CustomEditIcon } from '@/src/components/CustomIcons';

const iconMap: Record<string, any> = {
  Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User, CustomEditIcon
};

export default function Home() {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);

  return (
    <div className="pt-20 grid-pattern">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden mesh-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 grid-pattern-light opacity-30" />
          <img 
            src="https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?auto=format&fit=crop&q=80&w=2000" 
            alt="Tech background" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/80 to-brand-blue/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                AI-DRIVEN AUTOMATION
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-[1.05] mb-8">
                Smart Automation. <br />
                <span className="text-brand-blue bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-accent">Simple AI.</span>
              </h1>
              <p className="text-xl text-slate-300 mb-12 max-w-lg leading-relaxed font-medium">
                We bridge the gap to an AI-driven future, making advanced technology simple and accessible for everyone. 
                From smart automation for small businesses to new skills for individuals, we provide the tools you need to grow, 
                save time, and stay ahead. Whether you’re a startup looking to automate daily tasks or a professional ready to upskill, 
                we help you master the digital world with ease. Our solutions are designed to turn complex AI into practical success 
                helping you outpace the competition through intelligent, easy-to-use scaling.
              </p>
              <div className="flex flex-wrap gap-5">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="btn-primary text-lg px-10 py-5 flex items-center gap-3"
                >
                  Book Appointment <ArrowRight className="w-5 h-5" />
                </button>
                <Link 
                  to="/services"
                  className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all active:scale-95"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 glass-dark p-8 rounded-[2rem] border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
                  alt="Team working" 
                  className="rounded-2xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center">
                      <BrainCircuit className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-brand-navy">98%</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-blue/20 blur-[120px] -z-10 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unlock Competitive Edge */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-brand-navy mb-8 tracking-tight">Unlock Your Competitive Edge Now</h2>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto">
              Your ambition, powered by our intelligence. We don’t just provide software; we build the technological 
              backbone of your future. By partnering with us, you gain a dedicated innovation engine that turns your 
              most complex data into a shared success story.​
            </p>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary text-lg px-12 py-5"
            >
              Book Appointment
            </button>
          </motion.div>
        </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-blue/5 blur-[100px] rounded-full" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-accent/5 blur-[100px] rounded-full" />
      </section>

      {/* Services Grid */}
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
                  className="group card-modern relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-brand-blue/10 transition-colors" />
                  <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                    <Icon className="w-8 h-8 text-brand-blue group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-4 group-hover:text-brand-blue transition-colors">{service.title}</h3>
                  <div className="text-slate-500 leading-relaxed mb-8 markdown-content">
                    <Markdown>{service.description}</Markdown>
                  </div>
                  <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{service.category}</span>
                    <button className="text-brand-blue font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 bg-slate-50/50 relative overflow-hidden grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-extrabold text-brand-navy mb-6 tracking-tight">Portfolio</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-20 leading-relaxed">
              Explore our recent projects and success stories where we transformed complex challenges into simple, AI-driven solutions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500",
              "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
              "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=500",
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500"
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 group relative border-4 border-white"
              >
                <img src={img} alt={`Project ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-left transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-white font-bold text-xl mb-1">Project {i+1}</div>
                    <div className="text-white/70 text-sm font-medium">AI Implementation</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/services')}
            className="btn-primary px-12 py-5 shadow-2xl shadow-brand-blue/30"
          >
            Explore More
          </motion.button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-brand-navy mb-16">Our Customers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-40 mb-20">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-3xl font-black text-slate-400">LOGOIPSUM</div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: "John Doe",
                role: "CEO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
                text: "Amazing Designs and Quality Work! Arkanj Tech transformed our manual processes into a seamless automated engine."
              },
              {
                name: "Sarah Jenkins",
                role: "Co-Founder",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
                text: "The AI solutions provided by Arkanj Tech have significantly boosted our productivity and market reach."
              },
              {
                name: "Michael Chen",
                role: "Chairperson",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
                text: "Professional, reliable, and innovative. They are our go-to partner for all things automation and AI."
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-brand-blue text-4xl font-serif mb-4">“</div>
                <p className="text-lg text-brand-navy font-medium leading-relaxed mb-8 italic">
                  {testimonial.text}
                </p>
                <div className="flex flex-col items-center mt-auto">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-40 h-40 rounded-full mb-6 border-4 border-brand-blue p-1 object-cover shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="font-bold text-brand-navy text-xl">{testimonial.name}</div>
                  <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Section */}
      <section className="py-32 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">Our Success is Your Success</h2>
          <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">Click Get started for free, pay only for the results you see. We grow when you grow.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary text-lg px-12 py-5"
            >
              Start Risk Free
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all active:scale-95">
              Scale Now
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-blue/20 via-transparent to-transparent opacity-50" />
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-brand-accent/10 blur-[150px] rounded-full" />
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BrainCircuit, Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { SERVICES } from '@/src/types';
import BookingModal from '@/src/components/BookingModal';
import { UpTechIcon, FinTechIcon, EduTechIcon, DeepTechIcon, MedTechIcon, LaunchTechIcon } from '@/src/components/CustomIcons';
import { cn } from '@/src/lib/utils';

const iconMap: Record<string, any> = {
  Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User, 
  UpTechIcon, FinTechIcon, EduTechIcon, DeepTechIcon, MedTechIcon, LaunchTechIcon
};

export default function Home() {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = React.useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  const heroMedia = [
    { 
      type: 'video', 
      url: "https://www.youtube.com/embed/5jXLY2nIxSo?autoplay=1&mute=1&loop=1&playlist=5jXLY2nIxSo&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3",
      modalUrl: "https://www.youtube.com/embed/5jXLY2nIxSo?autoplay=1&rel=0",
      poster: "https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?auto=format&fit=crop&q=80&w=1000"
    },
    { 
      type: 'image', 
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
    },
    { 
      type: 'image', 
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
    },
    { 
      type: 'image', 
      url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000" 
    },
    { 
      type: 'image', 
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000" 
    }
  ];

  const nextMedia = () => setCurrentMediaIndex((prev) => (prev + 1) % heroMedia.length);
  const prevMedia = () => setCurrentMediaIndex((prev) => (prev - 1 + heroMedia.length) % heroMedia.length);

  React.useEffect(() => {
    const isVideo = heroMedia[currentMediaIndex].type === 'video';
    const duration = isVideo ? 30000 : 3000; // 30s for video, 3s for images
    
    const timer = setTimeout(nextMedia, duration);
    return () => clearTimeout(timer);
  }, [currentMediaIndex]);

  return (
    <div className="pt-20 grid-pattern">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-start overflow-hidden mesh-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 grid-pattern-light opacity-30" />
          <img 
            src="https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?auto=format&fit=crop&q=80&w=2000" 
            alt="Tech background" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-blue/20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-2 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-2"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Smart Automation. <br />
                <span className="text-brand-blue bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-accent">Simple AI.</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed font-medium">
                We bridge the gap to an AI-driven future, making advanced technology simple and accessible for everyone. 
                From smart automation for small businesses to new skills for individuals, we provide the tools you need to grow, 
                save time, and stay ahead.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="btn-primary text-base px-8 py-4 flex items-center gap-2"
                >
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </button>
                <Link 
                  to="/services"
                  className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 transition-all active:scale-95"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block pt-12"
            >
              <div 
                onClick={() => heroMedia[currentMediaIndex].type === 'video' && setIsVideoModalOpen(true)}
                className={cn(
                  "relative z-10 glass-dark p-6 rounded-[2.5rem] border-white/10 overflow-hidden aspect-[4/3] group/slider",
                  heroMedia[currentMediaIndex].type === 'video' && "cursor-pointer"
                )}
              >
                <AnimatePresence mode="wait">
                  {heroMedia[currentMediaIndex].type === 'video' ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full relative"
                    >
                      <iframe
                        src={heroMedia[currentMediaIndex].url}
                        className="w-full h-full object-cover rounded-3xl shadow-2xl pointer-events-none"
                        allow="autoplay; encrypted-media"
                        title="Hero Video"
                      />
                    </motion.div>
                  ) : (
                    <motion.img
                      key={currentMediaIndex}
                      src={heroMedia[currentMediaIndex].url}
                      alt="Solutions Showcase"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.7 }}
                      className="w-full h-full object-cover rounded-3xl shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button 
                  onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-brand-blue hover:border-brand-blue z-30"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-brand-blue hover:border-brand-blue z-30"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
                
                <div className="absolute bottom-6 left-6 glass p-5 rounded-2xl z-20 shadow-xl border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
                      <BrainCircuit className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-brand-navy">98%</div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Success Rate</div>
                    </div>
                  </div>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-8 right-8 flex gap-2 z-20">
                  {heroMedia.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrentMediaIndex(i); }}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === currentMediaIndex ? "bg-brand-blue w-10" : "bg-white/40 w-2.5 hover:bg-white/60"
                      }`}
                    />
                  ))}
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
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Unlock Your <span className="text-brand-blue bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-accent">Competitive Edge</span> Now
            </h2>
            <div className="text-lg text-slate-500 mb-12 leading-relaxed text-center max-w-3xl mx-auto">
              <p className="mb-6">
                <span className="font-bold text-slate-900">Your ambition, powered by our intelligence.</span> We don’t just provide software; we build the technological 
                backbone of your future. By partnering with us, you gain a dedicated innovation engine that turns your 
                most <span className="font-bold text-slate-900">complex data into a shared success story.</span>
              </p>
              <p>
                Whether you’re a startup looking to <span className="font-bold text-slate-900">automate daily tasks</span> or a professional ready to upskill, 
                we help you master the digital world with ease. Our solutions are designed to turn complex AI into <span className="font-bold text-slate-900">practical success</span> helping you outpace the competition through intelligent, easy-to-use scaling.
              </p>
            </div>
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
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm",
                    service.highlighted ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/40" : "bg-brand-light text-brand-blue group-hover:bg-brand-blue group-hover:text-white"
                  )}>
                    <Icon className="w-12 h-12" />
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
                        onClick={() => setIsBookingOpen(true)}
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

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 bg-slate-50/50 relative overflow-hidden grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-extrabold text-brand-navy mb-6 tracking-tight">Our Portfolio</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Explore our recent projects and success stories where we transformed complex challenges into simple, AI-driven solutions.
            </p>
          </motion.div>

          {/* Portfolio Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: "/port1.jpeg",
                title: "Digital Financial Systems",
                
              },
              {
                img: "/port2.jpeg",
                title: "Artificial Intelligence",
               
              },
              {
                img: "/port3.jpeg",
                title: "Supply Chain",
                
              },
              {
                img: "/port4.jpeg",
                title: "Retail Industry",
           
              },
              {
                img: "/port5.jpeg",
                title: "Business Intelligence",
                
              },
              {
                img: "/port6.jpeg",
                title: "DevOps & Cloud",
                
              }
            ].map((item: any, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -12 }}
                className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-200"
              >
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/port${i+1}/800/600`;
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-brand-blue font-bold text-xs uppercase tracking-[0.2em] mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/services')}
              className="btn-primary px-12 py-5 shadow-2xl shadow-brand-blue/30"
            >
              View All Projects
            </motion.button>
          </div>
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

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute inset-0 bg-brand-navy/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <iframe
                src={heroMedia[0].modalUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                title="Video Player"
              />
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6 rotate-90" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

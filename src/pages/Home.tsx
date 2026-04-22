import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BrainCircuit, Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { SERVICES } from '@/src/types';
import BookingModal from '@/src/components/BookingModal';
import { UpTechIcon, FinTechIcon, EduTechIcon, DeepTechIcon, MedTechIcon, LaunchTechIcon } from '@/src/components/CustomIcons';
import { cn } from '@/src/lib/utils';

const ServicesGrid = React.lazy(() => import('@/src/components/ServicesGrid'));

const iconMap: Record<string, any> = {
  Cpu, LayoutGrid, Send, Lightbulb, CreditCard, User, 
  UpTechIcon, FinTechIcon, EduTechIcon, DeepTechIcon, MedTechIcon, LaunchTechIcon
};

export default function Home() {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = React.useState(0);
  const [loadVideo, setLoadVideo] = React.useState(false);

  const heroMedia = [
    { 
      type: 'video', 
      id: "5jXLY2nIxSo",
      url: "https://www.youtube-nocookie.com/embed/5jXLY2nIxSo",
      poster: "https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?auto=format&fit=crop&q=80&w=1200"
    },
    { 
      type: 'image', 
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800&auto=format" 
    },
    { 
      type: 'image', 
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&auto=format" 
    },
    { 
      type: 'image', 
      url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800&auto=format" 
    },
    { 
      type: 'image', 
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&auto=format" 
    }
  ];

  const nextMedia = () => setCurrentMediaIndex((prev) => (prev + 1) % heroMedia.length);
  const prevMedia = () => setCurrentMediaIndex((prev) => (prev - 1 + heroMedia.length) % heroMedia.length);

  React.useEffect(() => {
    const isVideo = heroMedia[currentMediaIndex].type === 'video';
    const duration = isVideo ? 30000 : 3000; // 30s for video, 3s for images
    
    let videoTimer: any;
    if (isVideo) {
      videoTimer = setTimeout(() => setLoadVideo(true), 2000);
    } else {
      setLoadVideo(false);
    }

    const timer = setTimeout(nextMedia, duration);
    return () => {
      clearTimeout(timer);
      if (videoTimer) clearTimeout(videoTimer);
    };
  }, [currentMediaIndex]);

  return (
    <div className="pt-20 grid-pattern">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-start overflow-hidden mesh-gradient hero-critical">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 grid-pattern-light opacity-30" />
          <img 
            src="https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?auto=format&fit=crop&q=80&w=1200" 
            alt="Tech background" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            width="1200"
            height="600"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-blue/20" />
        </div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-2 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="pt-2">
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
                  className="btn-primary text-base px-8 py-4 flex items-center gap-2 min-w-[48px] min-h-[48px]"
                >
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </button>
                <Link 
                  to="/services"
                  className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 transition-all active:scale-95 min-w-[48px] min-h-[48px] flex items-center"
                >
                  Our Services
                </Link>
              </div>
            </div>

            <div className="relative block pt-12">
              <div 
                className={cn(
                  "relative z-10 glass-dark p-6 rounded-[2.5rem] border-white/10 overflow-hidden aspect-[4/3] group/slider"
                )}
              >
                <AnimatePresence mode="wait">
                  {heroMedia[currentMediaIndex].type === 'video' ? (
                    <div
                      key="video"
                      className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl bg-black"
                    >
                      {loadVideo ? (
                        <iframe
                          src={`${heroMedia[currentMediaIndex].url}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroMedia[currentMediaIndex].id}&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`}
                          className="w-full h-full scale-110"
                          allow="autoplay; encrypted-media"
                          title="Arkanj Tech Intro"
                          width="800"
                          height="600"
                        />
                      ) : (
                        <img 
                          src={heroMedia[currentMediaIndex].poster} 
                          alt="Video Poster" 
                          className="w-full h-full object-cover"
                          width="800"
                          height="600"
                          loading="eager"
                          fetchPriority="high"
                        />
                      )}
                    </div>
                  ) : (
                    <img
                      key={currentMediaIndex}
                      src={heroMedia[currentMediaIndex].url}
                      alt="Solutions Showcase"
                      className="w-full h-full object-cover rounded-3xl shadow-2xl"
                      referrerPolicy="no-referrer"
                      width="800"
                      height="600"
                      loading="eager"
                      fetchPriority="high"
                    />
                  )}
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button 
                  onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-brand-blue hover:border-brand-blue z-30"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-brand-blue hover:border-brand-blue z-30"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
                
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 glass p-3 md:p-5 rounded-xl md:rounded-2xl z-20 shadow-xl border-white/20 scale-90 md:scale-100 origin-bottom-left">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-blue rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
                      <BrainCircuit className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-bold text-brand-navy leading-none">98%</div>
                      <div className="text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1">Success Rate</div>
                    </div>
                  </div>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20 scale-90 md:scale-100 origin-bottom-right">
                  {heroMedia.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrentMediaIndex(i); }}
                      aria-label={`Go to slide ${i + 1}`}
                      className="group p-2 -m-2" // Increase touch target size
                    >
                      <div className={`h-3 rounded-full transition-all duration-500 min-w-[12px] ${
                        i === currentMediaIndex ? "bg-brand-blue w-10" : "bg-white/40 w-3 group-hover:bg-white/60"
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-blue/20 blur-[120px] -z-10 rounded-full" />
            </div>
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
            <h2 className="text-3xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
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
      <React.Suspense fallback={<div className="py-32 text-center text-slate-400">Loading Services...</div>}>
        <ServicesGrid onBookingClick={() => setIsBookingOpen(true)} />
      </React.Suspense>

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
                  loading="lazy"
                  width="800"
                  height="600"
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
                    loading="lazy"
                    width="160"
                    height="160"
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

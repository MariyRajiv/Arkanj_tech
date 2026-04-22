import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Brain, Cpu, CheckCircle2, FileText, Linkedin, MessageSquare, TrendingUp, UserCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from '@/src/components/BookingModal';
import { cn } from '@/src/lib/utils';

export default function UpTechLanding() {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);

  const services = [
    {
      title: 'CV & LinkedIn Boost',
      description: "We don't just edit; we optimize using AI-powered keyword matching to bypass ATS filters and catch recruiter attention.",
      icon: FileText,
      benefits: ['ATS-Optimized Structure', 'Keyword Mapping', 'Executive Summary Writing']
    },
    {
      title: 'Personal Branding',
      description: "Build a recruiter-magnetic profile that showcases your unique value proposition to the global job market.",
      icon: UserCheck,
      benefits: ['LinkedIn Content Strategy', 'Headline Optimization', 'Professional Bio Crafting']
    },
    {
      title: 'Career Mentorship',
      description: "Access our EduTech Learning Hub and AI training programs to make you the most hireable version of yourself.",
      icon: MessageSquare,
      benefits: ['AI Skill Workshops', 'Interview Preparation', 'Industry Insights']
    }
  ];

  const engineFeatures = [
    {
      title: 'Data-Driven Insights',
      description: 'Our AI analyzes millions of job descriptions and market trends to ensure your profile stays ahead of the curve.',
      icon: TrendingUp
    },
    {
      title: 'Tailored Personalization',
      description: 'Whether in Finance, Healthcare, or Tech, every word of your professional brand is curated for your specific industry.',
      icon: Zap
    },
    {
      title: 'Agentic AI Core',
      description: 'Leverage our intelligent engine that doesn\'t just follow templates but understands your career trajectory.',
      icon: Brain
    }
  ];

  return (
    <div className="pt-14 min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-14 overflow-hidden bg-brand-navy text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.1),transparent)]" />
          <div className="absolute inset-0 grid-pattern opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-4 px-4 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-bold text-xs uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                </span>
                UpTech Career Hub
              </div>
              <h1 className="text-10xl md:text-4xl font-extrabold leading-[1.1] mb-4">
                Accelerate Your Career with <br />
                <span className="text-brand-blue bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-cyan-400">AI-Driven Personal Branding.</span>
              </h1>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-xl font-medium">
                Leverage our <span className="text-white font-bold italic">Agentic AI Core</span> to build an ATS-proof resume and a recruiter-magnetic LinkedIn profile. Your ambition, powered by our intelligence.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="btn-primary px-10 py-5 text-lg shadow-2xl shadow-brand-blue/30 inline-flex items-center"
                >
                  Boost My Career Now
                </button>
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="px-10 py-5 text-lg font-bold border border-white/10 rounded-xl hover:bg-white/5 transition-all text-white inline-flex items-center"
                >
                  Get a Free Consult
                </button>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/100/100`}
                      className="w-12 h-12 rounded-full border-4 border-brand-navy object-cover"
                      alt="User"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-brand-navy bg-brand-blue flex items-center justify-center text-xs font-bold">
                    +2k
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-white">Trusted by 2,000+ Professionals</div>
                  <div className="text-slate-400">Successful career transitions this year</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 glass-dark p-4 rounded-[3rem] border-white/10 overflow-hidden shadow-2xl">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-white/5">
                   {/* Abstract AI/Career Visualization */}
                   <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                             <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">ATS Score</div>
                            <div className="text-xs text-slate-400">Optimization complete</div>
                          </div>
                        </div>
                        <div className="text-2xl font-black text-emerald-500">98%</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl">
                          <TrendingUp className="w-8 h-8 text-brand-blue mb-2" />
                          <div className="text-lg font-bold text-white">+142%</div>
                          <div className="text-[10px] text-slate-400 uppercase font-black">Search Appearances</div>
                        </div>
                        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                          <Linkedin className="w-8 h-8 text-purple-500 mb-2" />
                          <div className="text-lg font-bold text-white">12x</div>
                          <div className="text-[10px] text-slate-400 uppercase font-black">Profile Views</div>
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-brand-blue to-brand-accent rounded-[2rem] text-white">
                        <div className="flex items-center gap-3 mb-4">
                           <Brain className="w-6 h-6" />
                           <span className="font-bold">Agentic AI Core</span>
                        </div>
                        <div className="text-sm font-medium leading-relaxed opacity-90">
                           "Analyzing carrier trajectory... Mapping skills to industry high-demand keywords... Finalizing executive summary for Healthcare Management role."
                        </div>
                        <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: "30%" }}
                             animate={{ width: "100%" }}
                             transition={{ duration: 3, repeat: Infinity }}
                             className="h-full bg-white rounded-full"
                           />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-blue/20 blur-[100px] rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-400/10 blur-[100px] rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Factor & Pay After Success */}
      <section className="py-40 bg-white border-y border-slate-100">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="glass p-10 rounded-[3.5rem] border-slate-200 shadow-2xl flex flex-col md:flex-row items-center gap-12 -mt-32 relative z-20 bg-white">
              <div className="w-24 h-24 bg-brand-blue rounded-3xl flex items-center justify-center shrink-0 shadow-xl shadow-brand-blue/20">
                <CreditCard className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-3xl font-black text-brand-navy mb-3 italic">Pay After Your First Success.</h2>
                <p className="text-lg text-slate-500 font-medium">
                  We believe in our intelligence engine so much that we lowered the barrier. Focus on your growth, and pay us after you land that interview or role. <span className="text-brand-blue font-bold">Zero upfront worry.</span>
                </p>
              </div>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="btn-primary whitespace-nowrap px-10 py-5 rounded-2xl"
              >
                Learn More About Success-Based Pricing
              </button>
           </div>
        </div>
      </section>

      {/* Service Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-blue font-bold tracking-widest uppercase text-xs mb-4 block">Personal Branding Ecosystem</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight">Our Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group h-full"
                >
                  <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mb-8 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-4 group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.benefits.map(benefit => (
                      <li key={benefit} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works - The Intelligence Engine */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <span className="text-brand-blue font-black tracking-widest uppercase text-sm mb-6 block">The Tech Behind the Talent</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight"> Powered by our <br /><span className="text-brand-blue">Agentic AI Core</span></h2>
              <p className="text-xl text-slate-400 mb-12 font-medium leading-relaxed">
                Our intelligence engine doesn't just shuffle words. It understands the mechanics of the modern workforce, bridging the gap between your raw potential and recruiter expectations.
              </p>
              
              <div className="space-y-8">
                {engineFeatures.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex gap-6 items-start">
                       <div className="w-14 h-14 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl flex items-center justify-center shrink-0">
                         <Icon className="w-7 h-7 text-brand-blue" />
                       </div>
                       <div>
                          <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                          <p className="text-slate-500">{feature.description}</p>
                       </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:w-1/2 relative">
               <div className="relative z-10 bg-gradient-to-br from-brand-blue/20 to-brand-accent/20 p-1 rounded-[4rem] border border-white/10">
                  <div className="bg-slate-900 rounded-[3.8rem] p-12 overflow-hidden relative">
                    {/* Animated Engine Graphics */}
                    <div className="relative h-[400px] flex items-center justify-center">
                       <motion.div 
                         animate={{ rotate: 360 }}
                         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                         className="absolute w-64 h-64 border-2 border-dashed border-brand-blue/30 rounded-full" 
                       />
                       <motion.div 
                         animate={{ rotate: -360 }}
                         transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                         className="absolute w-48 h-48 border-2 border-dashed border-brand-accent/30 rounded-full" 
                       />
                       <div className="relative z-20 w-32 h-32 bg-brand-navy rounded-[2.5rem] border-4 border-brand-blue flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.3)]">
                          <Cpu className="w-16 h-16 text-brand-blue" />
                       </div>
                       
                       {/* Floating Data Points */}
                       {[1, 2, 3, 4, 5, 6].map(i => (
                         <motion.div
                           key={i}
                           animate={{ 
                             y: [0, -20, 0],
                             x: [0, i % 2 === 0 ? 10 : -10, 0]
                           }}
                           transition={{ 
                             duration: 4, 
                             repeat: Infinity, 
                             delay: i * 0.5 
                           }}
                           className="absolute p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-tight"
                           style={{
                             top: `${Math.random() * 100}%`,
                             left: `${Math.random() * 100}%`,
                           }}
                         >
                           {['Resume Analysis', 'Market Trends', 'Keyword Sync', 'Persona Mapping'][i % 4]}
                         </motion.div>
                       ))}
                    </div>
                  </div>
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-blue/30 blur-[120px] -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-brand-navy mb-8">Ready to outsmart the competition?</h2>
          <p className="text-xl text-slate-500 mb-12 leading-relaxed">
            Your career shouldn't be left to chance. Leverage our intelligence engine to secure the future you deserve.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary px-12 py-5 text-lg inline-flex items-center"
            >
              Get Started
            </button>
            <Link 
              to="/contact"
              className="px-12 py-5 text-lg font-bold text-brand-navy border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              Speak to a Career Expert <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

// Add the CreditCard icon since lucide-react might not have been imported directly in the functional style if I missed it
function CreditCard(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

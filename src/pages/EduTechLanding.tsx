import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, BookOpen, Brain, MessageSquare, BarChart3, Laptop, Languages, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from '@/src/components/BookingModal';
import { cn } from '@/src/lib/utils';

export default function EduTechLanding() {
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);

  const languages = [
    {
      name: 'German',
      description: 'Precision and logic. Perfect for professional advancement in Europe\'s strongest economy.',
      progress: 85,
      flag: '🇩🇪',
      isNew: true,
      link: '/edutech/german'
    },
    {
      name: 'French',
      description: 'The language of diplomacy and culture. Master the art of nuanced communication.',
      progress: 70,
      flag: '🇫🇷',
      isNew: false
    },
    {
      name: 'Spanish',
      description: 'Vibrant and expressive. Connect with over 500 million speakers across the globe.',
      progress: 92,
      flag: '🇪🇸',
      isNew: false
    },
    {
      name: 'English',
      description: 'The universal key. Refine your professional tone for global leadership roles.',
      progress: 98,
      flag: '🇬🇧',
      isNew: false
    },
    {
      name: 'Hindi',
      description: 'The heart of India. Connect with the world\'s fastest-growing major economy.',
      progress: 65,
      flag: '🇮🇳',
      isNew: true
    }
  ];

  const techCourses = [
    {
      title: 'AI Fundamentals',
      description: 'Master the basics of Artificial Intelligence and its practical applications.',
      icon: Brain
    },
    {
      title: 'Full-Stack Development',
      description: 'Build modern, scalable web applications from scratch.',
      icon: Laptop
    },
    {
      title: 'Data Science',
      description: 'Turn raw data into actionable insights with Python and ML.',
      icon: BarChart3
    }
  ];

  const features = [
    {
      title: 'Interactive Lessons',
      description: 'Real-time feedback and gamified content that keep your cognitive load optimized for retention.',
      icon: BookOpen,
      color: 'bg-blue-600'
    },
    {
      title: 'AI-Based Practice',
      description: 'Personalized algorithms that identify your unique linguistic gaps and create custom drills in real-time.',
      icon: Brain,
      color: 'bg-indigo-600'
    },
    {
      title: 'Real-Life Conversations',
      description: 'Simulate high-stakes scenarios from boardrooms to bistros with our adaptive dialogue engine.',
      icon: MessageSquare,
      color: 'bg-white text-blue-600 border border-blue-100'
    },
    {
      title: 'Progress Tracking',
      description: 'Visual intelligence that maps your journey from novice to native-level mastery.',
      icon: BarChart3,
      color: 'bg-blue-50 text-blue-600'
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-blue font-black tracking-widest uppercase text-3xl md:text-5xl mb-6 block">EduTech Industry</span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-brand-navy leading-tight mb-6">
                Master the Skills of the <span className="text-brand-blue">Future</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Whether it's mastering a global language or diving into the latest technology, 
                our AI-powered curriculum adapts to your learning pace and style.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="btn-primary px-8 py-4 text-lg"
                >
                  Start Learning Now
                </button>
                <a href="#curriculum" className="px-8 py-4 text-lg font-bold text-brand-navy hover:text-brand-blue transition-colors flex items-center gap-2">
                  View Curriculum <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Learning" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/10 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-accent/10 blur-3xl rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curated Curriculum - Languages */}
      <section id="curriculum" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-4 block">Curated Curriculum</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight">Master a Global Language</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((lang, i) => {
              const isInternal = lang.link?.startsWith('/');
              
              const CardContent = (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl">{lang.flag}</span>
                    {lang.isNew && (
                      <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">New Content</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-4 group-hover:text-brand-blue transition-colors">{lang.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {lang.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>Curriculum Progress</span>
                      <span>{lang.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                </>
              );

              return (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group block",
                    lang.link && "cursor-pointer"
                  )}
                >
                  {lang.link ? (
                    isInternal ? (
                      <Link to={lang.link}>{CardContent}</Link>
                    ) : (
                      <a href={lang.link} target="_blank" rel="noopener noreferrer">{CardContent}</a>
                    )
                  ) : (
                    <div>{CardContent}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Courses */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-blue font-bold tracking-widest uppercase text-xs mb-4 block">Tech Mastery</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight">Future-Proof Your Career</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techCourses.map((course, i) => {
              const Icon = course.icon;
              return (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center"
                >
                  <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center mx-auto mb-8 text-brand-blue">
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-4">{course.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8">
                    {course.description}
                  </p>
                  <button className="text-brand-blue font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
                    Course Details <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology of Fluency */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-extrabold text-brand-navy tracking-tight">
              The Technology of <span className="text-brand-blue">Fluency</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start transition-all duration-500",
                    i === 0 ? "bg-blue-600 text-white md:col-span-1" : 
                    i === 1 ? "bg-indigo-600 text-white md:col-span-1" :
                    i === 2 ? "bg-white border border-slate-100 shadow-sm md:col-span-1" :
                    "bg-blue-50 md:col-span-1"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                    i < 2 ? "bg-white/20" : i === 2 ? "bg-blue-600 text-white" : "bg-blue-600 text-white"
                  )}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-2xl font-bold mb-4",
                      i < 2 ? "text-white" : "text-brand-navy"
                    )}>{feature.title}</h3>
                    <p className={cn(
                      "leading-relaxed",
                      i < 2 ? "text-blue-50" : "text-slate-500"
                    )}>
                      {feature.description}
                    </p>
                    {i === 3 && (
                      <div className="mt-8 flex items-end gap-2 h-24">
                        <div className="w-8 bg-blue-600 rounded-t-lg h-[60%]" />
                        <div className="w-8 bg-blue-600 rounded-t-lg h-[100%]" />
                        <div className="w-8 bg-blue-600 rounded-t-lg h-[80%]" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Ready to start your journey?</h2>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Join thousands of learners who are already mastering new skills with our AI-powered platform.
          </p>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="btn-primary px-12 py-5 text-lg"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

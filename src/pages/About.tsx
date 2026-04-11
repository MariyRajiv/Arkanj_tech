import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Users, Target, Rocket, BrainCircuit, Plus, Minus, ChevronRight, Search, FileText, PenTool, Code, Send, CheckCircle } from 'lucide-react';

export default function About() {
  const [openAccordion, setOpenAccordion] = React.useState<number | null>(0);

  const stats = [
    { label: 'Projects Completed', value: '250+' },
    { label: 'AI Models Deployed', value: '120+' },
    { label: 'Happy Clients', value: '180+' },
    { label: 'Team Experts', value: '25+' },
  ];

  const team = [
    {
      name: 'Ranjita Sharma',
      role: 'Founder',
      image: '/ranjitha.jpeg'
    },
    {
      name: 'Jai Prakash Sharma',
      role: 'Founder and CEO',
      image: '/jai.png'
    },
    {
      name: 'Sujata Chandan',
      role: 'COO and Director-HR',
      image: '/suj1.jpeg'
    },
    {
      name: 'Manmohan Singh',
      role: 'CSO',
      image: '/manm.jpeg'
    },
    {
      name: 'Mariya Rajiv',
      role: 'Production Solution Architect',
      image: '/rajiv.png'
    },
    {
      name: 'Yug Mehendiratta',
      role: 'Software Architect',
      image: '/Yug.png'
    }
  ];

  const processes = [
    { id: '01', title: 'Discover', icon: Search },
    { id: '02', title: 'Define', icon: FileText },
    { id: '03', title: 'Design', icon: PenTool },
    { id: '04', title: 'Develop', icon: Code },
    { id: '05', title: 'Deploy', icon: Rocket },
    { id: '06', title: 'Deliver', icon: Send },
  ];

  const whyChooseUs = [
    { title: 'Best Quality Designs', content: 'Sed Fringilla Mauris Sit Amet Nibh. Donec Sodales Sagittis Magna. Sed Consequat, Leo Eget Bibendum, Sodales, Augue Velit Cursus Nunc, Quis Gravida Magna Mi A Libero.' },
    { title: '24x7 Live Support', content: 'Our dedicated support team is available around the clock to assist you with any queries or technical issues, ensuring your business never stops.' },
    { title: 'Result Oriented Projects', content: 'We focus on delivering measurable results that align with your business goals, ensuring every project provides a high return on investment.' },
    { title: 'Award Winning Support Team', content: 'Our support team has been recognized for excellence in customer service, providing expert guidance and rapid problem resolution.' },
    { title: 'Best ROI Techniques', content: 'We employ data-driven strategies and cutting-edge AI tools to maximize your ROI, making every marketing dollar work harder for you.' },
    { title: 'Experienced Professionals', content: 'Our team consists of industry veterans with years of experience in AI, software development, and digital strategy.' },
  ];

  return (
    <div className="pt-20 grid-pattern">
      {/* Hero Section */}
      <section className="pt-32 pb-48 bg-brand-navy text-white relative overflow-hidden mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight">About Us</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-blue mb-8">Welcome to The Digital Agency</h2>
            <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue. Aliquam ornare hendrerit augue.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 grid-pattern-light" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <BrainCircuit className="w-full h-full text-brand-blue" />
        </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-blue/10 blur-[100px] rounded-full" />
      </section>

      {/* Feature Cards Overlapping Hero */}
      <section className="-mt-32 relative z-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Who Are We', 
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar. Etiam erat lectus, finibus eget commodo quis, tinci dunt eget leo. Nullam quis vulpu tate orci, ac accum san quam.' 
              },
              { 
                title: 'Our Mission', 
                content: 'Ut elit tellus, luctus nec ullamcorper mattis, pulvinar. Etiam erat lectus, finibus eget commodo quis, tinci dunt eget leo. Nullam quis vulpu tate orci, ac accum san quam. Morbi frin gilla congue libero.' 
              },
              { 
                title: 'What We Do', 
                items: ['UI UX Design', 'Website Development', 'Marketing', 'Social Media', 'eCommerce Store', 'Tech Support'] 
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col transition-all duration-300 hover:border-brand-blue hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] hover:ring-1 hover:ring-brand-blue/20"
              >
                <div className="w-12 h-1.5 bg-brand-blue mb-8 rounded-full" />
                <h3 className="text-3xl font-extrabold text-brand-navy mb-6 tracking-tight">{card.title}</h3>
                {card.content && (
                  <p className="text-slate-500 leading-relaxed text-lg">{card.content}</p>
                )}
                {card.items && (
                  <ul className="space-y-3">
                    {card.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-600 font-semibold">
                        <ChevronRight className="w-4 h-4 text-brand-blue" /> {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-D Process Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-extrabold text-brand-navy tracking-tight"
            >
              Our 6-D Process
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {processes.map((proc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group p-8 rounded-3xl border border-transparent transition-all duration-300 hover:border-brand-blue hover:bg-white hover:shadow-xl hover:ring-1 hover:ring-brand-blue/20"
              >
                <div className="text-8xl font-black text-slate-100 absolute -top-12 -left-4 group-hover:text-brand-blue/5 transition-colors duration-500">
                  {proc.id}
                </div>
                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors">{proc.title}</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-slate-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000" 
                  alt="Professional team collaboration" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-blue rounded-full blur-3xl opacity-20" />
            </motion.div>

            <div className="space-y-10">
              <div>
                <h2 className="text-5xl font-extrabold text-brand-navy mb-6 tracking-tight">Why Choose Us?</h2>
                <p className="text-xl text-slate-500 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.
                </p>
              </div>

              <div className="space-y-4">
                {whyChooseUs.map((item, i) => (
                  <div 
                    key={i} 
                    className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                      className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-brand-navy text-lg">{item.title}</span>
                      {openAccordion === i ? (
                        <Minus className="w-5 h-5 text-brand-blue" />
                      ) : (
                        <Plus className="w-5 h-5 text-brand-blue" />
                      )}
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: openAccordion === i ? 'auto' : 0, opacity: openAccordion === i ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                        {item.content}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-black text-brand-blue mb-2">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-extrabold text-brand-navy mb-6 tracking-tight">Meet Our Team</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-24 leading-relaxed font-medium">
            The brilliant minds behind Arkanj Tech Solutions, dedicated to your digital growth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                className="bg-white p-6 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 group transition-all duration-300 hover:border-brand-blue hover:ring-1 hover:ring-brand-blue/20"
              >
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">{member.name}</h3>
                <p className="text-brand-blue font-bold text-sm uppercase tracking-widest">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project CTA Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-slate-50/80 backdrop-blur-sm p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-xl">
            <div className="max-w-2xl space-y-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight"
              >
                Would you like to start a project with us?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-500 leading-relaxed"
              >
                Etiam erat lectus, finibus eget commodo quis, tincidunt eget leo. Nullam quis vulputate orci, ac accumsan quam. Morbi fringilla congue libero.
              </motion.p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-12 py-5 text-lg shadow-2xl shadow-brand-blue/30 whitespace-nowrap"
            >
              GET A QUOTE
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}

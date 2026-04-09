import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-32 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="col-span-1 md:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <img 
                src="/logo.png" 
                alt="Arkanj Tech Logo" 
                className="h-20 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-sm">
              Smart Automation. Simple AI. Real Growth for Everyone. Bridging the gap to an AI-driven future with precision and care.
            </p>
            <div className="flex gap-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue hover:-translate-y-1 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-8">Services</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><Link to="/services" className="hover:text-white transition-colors">UpTech – Industry</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">FinTech – Finance</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">EduTech – Individuals</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">DeepTech – Advanced</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-8">Company</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/#portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/about#team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-8">Contact Us</h4>
            <ul className="space-y-6 text-slate-400 text-sm font-medium">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-blue" />
                </div>
                <span className="leading-relaxed">Pipratand Barwadda, Dhanbad – 82704, Jharkhand, India</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-blue" />
                </div>
                <span>admin@arkanj.tech</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-blue" />
                </div>
                <span>+91 700-491-0317</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <p>© 2026 Arkanj Tech Solutions. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-brand-blue/5 blur-[150px] rounded-full" />
    </footer>
  );
}

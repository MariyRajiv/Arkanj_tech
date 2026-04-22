import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [logoError, setLogoError] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/60">
      <div className="max-w-8xl mx-auto px-8 sm:px-8 lg:px-6">
        <div className="flex justify-between h-20 relative">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative h-16 flex items-center">
                {!logoError ? (
                  <img 
                    src="/Final Logo.png" 
                    alt="Arkanj Tech Logo" 
                    className="h-full w-auto object-contain" 
                    onError={() => setLogoError(true)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-2xl font-black text-brand-navy tracking-tighter">
                    ARKANJ <span className="text-brand-blue">TECH</span>
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-semibold transition-all hover:text-brand-blue relative py-2 group",
                  location.pathname === link.href ? "text-brand-blue" : "text-slate-600"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue transition-transform duration-300 origin-left",
                  location.pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-blue"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-b border-slate-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-brand-blue"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

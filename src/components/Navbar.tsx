import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, BrainCircuit, LogOut, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useUser } from '@/src/UserContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { currentUser, logout } = useUser();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Cabinet', href: '/customer-cabinet' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="https://arkanj.tech/wp-content/uploads/2026/03/cropped-arkanj_logo_white_transparent-2048x1344.png" 
                alt="Arkanj Tech Logo" 
                className="h-20 w-auto object-contain brightness-0" 
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
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
            {currentUser ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                  <div className="w-8 h-8 bg-brand-blue/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-brand-blue" />
                  </div>
                  {currentUser.firstName}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/customer-cabinet"
                className="bg-brand-blue text-white px-7 py-3 rounded-xl text-sm font-bold hover:bg-brand-navy transition-all shadow-xl shadow-brand-blue/20 active:scale-95"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-blue"
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
            {currentUser ? (
              <div className="pt-4 border-t border-slate-100 mt-4">
                <div className="flex items-center gap-3 px-3 mb-4">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div className="font-bold text-brand-navy">{currentUser.firstName} {currentUser.lastName}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-lg font-bold"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/customer-cabinet"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand-blue text-white px-6 py-3 rounded-lg text-sm font-semibold mt-4"
              >
                LOGIN
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

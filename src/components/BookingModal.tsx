import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Calendar, User, CheckCircle2, Phone, Clock, CreditCard, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { BOOKING_SERVICES } from '@/src/types';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths, startOfWeek, endOfWeek, isSaturday, isSunday } from 'date-fns';
import { addToCalendar } from '@/src/lib/calendar';
import { saveAppointment, saveOrder, generateOrderId } from '@/src/lib/storage';
import { COUNTRY_CODES } from '@/src/constants/countries';

import { useNavigate } from 'react-router-dom';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'service' | 'datetime' | 'info' | 'verify' | 'confirm';

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  /* 
  // Commented out existing booking logic as requested
  const navigate = useNavigate();
  const [step, setStep] = React.useState<Step>('service');
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState<string>('');
  const [selectedService, setSelectedService] = React.useState<typeof BOOKING_SERVICES[0] | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [isDateSelected, setIsDateSelected] = React.useState(false);
  const [viewDate, setViewDate] = React.useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = React.useState<number | null>(null);
  const [bookingError, setBookingError] = React.useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    comments: ''
  });

  const [phoneError, setPhoneError] = React.useState<string | null>(null);
  // ... other logic
  */

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-6 md:p-8 text-center space-y-6 relative z-10">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors group z-20"
              >
                <X className="w-6 h-6 text-slate-400 group-hover:text-brand-blue" />
              </button>

              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                    <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                    Innovation in Progress
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
                    Something <span className="text-brand-blue">Great</span> is Brewing
                  </h2>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-500 max-w-sm mx-auto leading-relaxed text-base"
                >
                  We're currently upgrading our booking system with advanced AI to provide you with a more seamless experience.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: "spring", damping: 15 }}
                className="relative rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white aspect-video max-w-xs mx-auto group"
              >
                <img 
                  src="https://set-painting.com/ART1/MGALLERY/ANIMATION/ANIAssets/Under_Movie_Opt1.gif" 
                  alt="Under Construction" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-2"
              >
                <button
                  onClick={onClose}
                  className="btn-primary px-10 py-4 text-base shadow-xl shadow-brand-blue/20 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Got it, thanks! <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-blue/5 blur-3xl rounded-full -z-10" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-accent/5 blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

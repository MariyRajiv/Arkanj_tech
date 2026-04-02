import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Calendar, User, CheckCircle2, Phone, Clock, CreditCard } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { BOOKING_SERVICES } from '@/src/types';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { addToCalendar } from '@/src/lib/calendar';
import { saveAppointment, saveOrder, generateOrderId } from '@/src/lib/storage';

import { useNavigate } from 'react-router-dom';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'service' | 'datetime' | 'info' | 'verify' | 'confirm';

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = React.useState<Step>('service');
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState<string>('');
  const [selectedService, setSelectedService] = React.useState<typeof BOOKING_SERVICES[0] | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = React.useState<number | null>(null);
  const [customerInfo, setCustomerInfo] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    comments: ''
  });

  const steps: Step[] = ['service', 'datetime', 'info', 'verify', 'confirm'];
  const currentStepIndex = steps.indexOf(step);

  const simulateLoading = (nextStep: Step) => {
    setIsLoading(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsLoading(false);
    }, 800);
  };

  const handleNext = () => {
    if (step === 'service' && selectedService) simulateLoading('datetime');
    else if (step === 'datetime' && selectedTime) simulateLoading('info');
    else if (step === 'info') simulateLoading('verify');
    else if (step === 'verify') {
      // Save the booking
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
      
      if (selectedService && selectedTime) {
        saveAppointment({
          id: newOrderId,
          service: selectedService.name,
          date: `${format(selectedDate, 'MMMM d')}, ${selectedTime}`,
          agent: 'Daniel Miller', // Default agent for now
          status: 'approved',
          customerInfo
        });

        saveOrder({
          id: newOrderId,
          date: format(new Date(), 'MMM d, yyyy'),
          service: selectedService.name,
          amount: selectedService.price,
          payments: 0,
          balance: selectedService.price
        });
      }
      
      simulateLoading('confirm');
    }
  };

  const handleBack = () => {
    if (step === 'datetime') simulateLoading('service');
    else if (step === 'info') simulateLoading('datetime');
    else if (step === 'verify') simulateLoading('info');
  };

  const getAvailability = (day: number) => {
    // Mock availability logic
    const seed = (day * 13) % 10;
    if (day % 7 === 0) return 0; // Sundays
    if (seed < 3) return 3;
    if (seed < 6) return 6;
    return 9;
  };

  const handleAddToCalendar = () => {
    if (!selectedService || !selectedTime) return;

    // Parse time string like "09:00 am"
    const [time, period] = selectedTime.split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    if (period === 'pm' && hours < 12) hours += 12;
    if (period === 'am' && hours === 12) hours = 0;

    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes, 0, 0);

    addToCalendar({
      title: `Arkanj Tech: ${selectedService.name} Appointment`,
      description: `Appointment for ${selectedService.name} service.`,
      startDate,
      durationInMinutes: 60
    });
  };

  const timeSlots = [
    '08:00 am', '09:00 am', '10:00 am', '11:00 am',
    '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm'
  ];

  const renderStep = () => {
    switch (step) {
      case 'service':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              {BOOKING_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border transition-all",
                    selectedService?.id === s.id
                      ? "border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue"
                      : "border-slate-200 hover:border-brand-blue/50 hover:bg-slate-50"
                  )}
                >
                  <span className="font-medium text-slate-700">{s.name}</span>
                  <div className="text-right">
                    <div className="text-brand-blue font-bold">${s.price}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Starts From</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="pt-6 flex justify-end">
               <button
                disabled={!selectedService}
                onClick={handleNext}
                className="bg-brand-blue text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      case 'datetime':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Calendar Mockup */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-extrabold text-slate-900 text-lg">{format(selectedDate, 'MMMM yyyy')}</span>
                  <div className="flex gap-3">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-100"><ChevronLeft className="w-5 h-5 text-slate-600" /></button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-100"><ChevronRight className="w-5 h-5 text-slate-600" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <span key={i} className="text-xs font-black text-slate-400 uppercase tracking-widest">{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isSelected = day === selectedDate.getDate();
                    const availability = getAvailability(day);
                    const isHovered = hoveredDay === day;
                    
                    return (
                      <div key={i} className="relative">
                        <button
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          onClick={() => availability > 0 && setSelectedDate(new Date(2026, 3, day))}
                          disabled={availability === 0}
                          className={cn(
                            "w-full aspect-square flex flex-col items-center justify-center rounded-xl text-base font-bold transition-all relative",
                            isSelected 
                              ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20 scale-105 z-10" 
                              : "hover:bg-slate-50 text-slate-700 border border-transparent hover:border-slate-200",
                            availability === 0 && "opacity-10 cursor-not-allowed bg-slate-50/50"
                          )}
                        >
                          {day}
                          {availability > 0 && !isSelected && (
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                              <div className={cn("w-1 h-1 rounded-full", availability >= 7 ? "bg-green-500" : "bg-yellow-500")} />
                            </div>
                          )}
                        </button>
                        
                        {isHovered && availability > 0 && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
                            <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap">
                              {availability} Available
                            </div>
                            <div className="w-2 h-2 bg-slate-900 rotate-45 mx-auto -mt-1" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Available Slots</p>
                  <p className="text-lg font-bold text-slate-900">{format(selectedDate, 'EEEE, MMMM d')}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-3 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2",
                        selectedTime === time
                          ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20 scale-105 z-10"
                          : "bg-white border-slate-200 text-slate-600 hover:border-brand-blue/50 hover:bg-slate-50"
                      )}
                    >
                      <Clock className={cn("w-4 h-4", selectedTime === time ? "text-white" : "text-brand-blue")} />
                      {time}
                    </button>
                  ))}
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    <span className="font-bold text-brand-blue">Note:</span> Times are shown in your local timezone. Please arrive 5 minutes early.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-6 flex justify-between">
              <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-brand-blue transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                disabled={!selectedTime}
                onClick={handleNext}
                className="bg-brand-blue text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      case 'info':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name *"
                className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 outline-none"
                value={customerInfo.firstName}
                onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name *"
                className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 outline-none"
                value={customerInfo.lastName}
                onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 outline-none"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address *"
                className="p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 outline-none"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
              />
              <textarea
                placeholder="Add Comments"
                className="col-span-2 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 outline-none h-24"
                value={customerInfo.comments}
                onChange={(e) => setCustomerInfo({ ...customerInfo, comments: e.target.value })}
              />
            </div>
            <div className="pt-6 flex justify-between">
              <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-brand-blue transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                disabled={!customerInfo.firstName || !customerInfo.email}
                onClick={handleNext}
                className="bg-brand-blue text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      case 'verify':
        return (
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-bold text-slate-900">{selectedService?.name}</div>
                  <div className="text-slate-500">{format(selectedDate, 'MMMM d')}, {selectedTime}</div>
                </div>
                <div className="text-brand-blue font-bold text-lg">${selectedService?.price}.00</div>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <div className="text-sm font-semibold text-slate-400 uppercase mb-2">Customer</div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                    {customerInfo.firstName[0]}{customerInfo.lastName[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{customerInfo.firstName} {customerInfo.lastName}</div>
                    <div className="text-sm text-slate-500">{customerInfo.email}</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <span className="font-bold text-slate-900">Total Price</span>
                <span className="text-xl font-bold text-brand-blue">${selectedService?.price}.00</span>
              </div>
            </div>
            <div className="pt-6 flex justify-between">
              <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-brand-blue transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleNext}
                className="bg-brand-blue text-white px-12 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                Submit <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      case 'confirm':
        return (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Appointment Confirmed</h3>
              <p className="text-slate-500">We look forward to seeing you.</p>
              <div className="inline-block bg-slate-100 px-4 py-1 rounded-full text-xs font-bold text-slate-500 tracking-wider">
                ORDER #{orderId}
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl text-left flex gap-4">
              <div className="bg-white border border-slate-200 rounded-lg p-2 flex flex-col items-center justify-center w-16 h-16">
                <span className="text-lg font-bold text-slate-900">{format(selectedDate, 'd')}</span>
                <span className="text-[10px] font-bold text-brand-blue uppercase">{format(selectedDate, 'MMM')}</span>
              </div>
              <div>
                <div className="font-bold text-slate-900">{selectedService?.name}</div>
                <div className="text-sm text-slate-500">{format(selectedDate, 'MMMM d')}, {selectedTime}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleAddToCalendar}
                className="flex-1 border border-slate-200 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
              >
                <Calendar className="w-4 h-4" /> Add to Calendar
              </button>
              <button className="flex-1 border border-slate-200 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-50">
                <Phone className="w-4 h-4" /> Print
              </button>
            </div>
            <div className="bg-brand-light p-6 rounded-2xl text-sm">
              <p className="text-slate-600 mb-4">You can now manage your appointments in your personal cabinet</p>
              <button 
                onClick={() => {
                  onClose();
                  navigate('/customer-cabinet');
                }}
                className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold"
              >
                Open My Cabinet
              </button>
            </div>
          </div>
        );
    }
  };

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
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[550px]"
          >
            {/* Left Sidebar */}
            <div className="w-full lg:w-56 bg-slate-50 p-6 flex flex-col border-r border-slate-100">
              <div className="mb-6">
                <div className="w-12 h-12 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-slate-900" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  {step === 'service' && 'Select Service'}
                  {step === 'datetime' && 'Select Date & Time'}
                  {step === 'info' && 'Your Information'}
                  {step === 'verify' && 'Verify Order'}
                  {step === 'confirm' && 'Confirmed!'}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step === 'service' && 'Please select a service for your appointment'}
                  {step === 'datetime' && 'Please select date and time for your appointment'}
                  {step === 'info' && 'Please enter your contact information'}
                  {step === 'verify' && 'Double check your reservation details'}
                  {step === 'confirm' && 'Your appointment has been confirmed'}
                </p>
              </div>

              <div className="mt-auto text-center">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Questions?</p>
                <p className="text-sm text-slate-400">Call (858) 939-3746 for help</p>
              </div>
            </div>

            {/* Middle Content */}
            <div className="flex-1 p-5 lg:p-6 relative border-r border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-900">
                  {step === 'service' && 'Available Services'}
                  {step === 'datetime' && 'Date & Time Selection'}
                  {step === 'info' && 'Customer Information'}
                  {step === 'verify' && 'Verify Order Details'}
                  {step === 'confirm' && 'Appointment Confirmed'}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white z-50 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-10 h-10 border-3 border-brand-blue/20 border-t-brand-blue rounded-full"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderStep()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Summary */}
            <div className="w-full lg:w-56 p-5 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-slate-900">Summary</h3>
                <div className="flex-1 border-b border-dotted border-slate-200" />
              </div>

              {selectedService ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{selectedService.name}</h4>
                    {selectedTime && (
                      <p className="text-sm text-slate-400">
                        {format(selectedDate, 'MMMM d')}, {selectedTime}
                      </p>
                    )}
                  </div>

                  <div className="pt-32">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Cost Breakdown</span>
                      <div className="flex-1 border-b border-slate-100" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">{selectedService.name}</span>
                        <span className="font-bold text-slate-900">${selectedService.price}.00</span>
                      </div>
                      <div className="pt-2 border-t border-slate-900 flex justify-between items-center">
                        <span className="font-bold text-slate-900">Total Price</span>
                        <span className="text-xl font-black text-slate-900">${selectedService.price}.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <CreditCard className="w-12 h-12 mb-4" />
                  <p className="text-sm font-medium">No service selected</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

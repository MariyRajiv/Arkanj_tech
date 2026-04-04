import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Calendar, User, CheckCircle2, Phone, Clock, CreditCard, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { BOOKING_SERVICES } from '@/src/types';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths, startOfWeek, endOfWeek, isSaturday, isSunday } from 'date-fns';
import { addToCalendar } from '@/src/lib/calendar';
import { saveAppointment, saveOrder, generateOrderId, getCurrentUser, saveUser, UserProfile } from '@/src/lib/storage';
import { useUser } from '@/src/UserContext';
import { COUNTRY_CODES } from '@/src/constants/countries';

import { useNavigate } from 'react-router-dom';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'service' | 'datetime' | 'info' | 'verify' | 'confirm';

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const navigate = useNavigate();
  const { currentUser, login } = useUser();
  const [step, setStep] = React.useState<Step>('service');
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState<string>('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPasswordSubmitted, setIsPasswordSubmitted] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<typeof BOOKING_SERVICES[0] | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [isDateSelected, setIsDateSelected] = React.useState(false);
  const [viewDate, setViewDate] = React.useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = React.useState<number | null>(null);
  const [bookingError, setBookingError] = React.useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = React.useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    comments: ''
  });

  React.useEffect(() => {
    if (currentUser) {
      setCustomerInfo(prev => ({
        ...prev,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        email: currentUser.email
      }));
    }
  }, [currentUser]);
  const [phoneError, setPhoneError] = React.useState<string | null>(null);

  const validatePhone = (phone: string) => {
    const parts = phone.split(' ');
    const number = parts.length > 1 ? parts[1] : parts[0];
    const digits = number.replace(/\D/g, '');
    return digits.length >= 7;
  };

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
    else if (step === 'info') {
      if (!validatePhone(customerInfo.phone)) {
        setPhoneError('Please enter a valid phone number');
        return;
      }
      setPhoneError(null);
      simulateLoading('verify');
    }
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
          balance: selectedService.price,
          status: 'approved'
        });
      }
      
      simulateLoading('confirm');
    }
  };

  const handleBack = () => {
    setPhoneError(null);
    if (step === 'datetime') simulateLoading('service');
    else if (step === 'info') simulateLoading('datetime');
    else if (step === 'verify') simulateLoading('info');
  };

  const handleClose = () => {
    setPhoneError(null);
    onClose();
  };

  const nextMonth = () => setViewDate(addMonths(viewDate, 1));
  const prevMonth = () => setViewDate(subMonths(viewDate, 1));

  const getAvailability = (date: Date) => {
    if (isSaturday(date) || isSunday(date)) return 0;
    // Mock availability logic based on date
    const day = date.getDate();
    const seed = (day * 13) % 10;
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
          <div className="space-y-1.5">
            <div className="space-y-1">
              {BOOKING_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className={cn(
                    "w-full flex items-center justify-between p-1.5 rounded-xl border transition-all",
                    selectedService?.id === s.id
                      ? "border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue"
                      : "border-slate-200 hover:border-brand-blue/50 hover:bg-slate-50"
                  )}
                >
                  <span className="font-medium text-xs text-slate-700">{s.name}</span>
                  <div className="text-right">
                    <div className="text-brand-blue font-bold text-xs">${s.price}</div>
                    <div className="text-[8px] text-slate-400 uppercase font-semibold">Starts From</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="pt-1 flex justify-end">
               <button
                disabled={!selectedService}
                onClick={handleNext}
                className="bg-brand-blue text-white px-5 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      case 'datetime':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.6fr] gap-6">
              {/* Calendar Mockup */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-extrabold text-slate-900 text-2xl">{format(viewDate, 'MMMM')}</span>
                      <span className="text-slate-400 font-bold text-lg">{format(viewDate, 'yyyy')}</span>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={prevMonth}
                        className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6 text-slate-900" />
                      </button>
                      <button 
                        onClick={nextMonth}
                        className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-6 h-6 text-slate-900" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 border-t border-slate-100">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <div key={i} className="py-2 text-center bg-slate-50/50 border-r border-slate-100 last:border-r-0">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{d}</span>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 border-t border-slate-100">
                  {(() => {
                    const monthStart = startOfMonth(viewDate);
                    const monthEnd = endOfMonth(monthStart);
                    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
                    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
                    
                    const calendarDays = eachDayOfInterval({
                      start: startDate,
                      end: endDate,
                    });

                    return calendarDays.map((date, i) => {
                      const isSelected = isDateSelected && isSameDay(date, selectedDate);
                      const isCurrentMonth = isSameDay(startOfMonth(date), monthStart);
                      const availability = getAvailability(date);
                      const isHovered = hoveredDay === date.getTime();
                      
                      return (
                        <div key={i} className="relative border-r border-b border-slate-100 last:border-r-0 group/day">
                          <button
                            onMouseEnter={() => setHoveredDay(date.getTime())}
                            onMouseLeave={() => setHoveredDay(null)}
                            onClick={() => {
                              if (availability > 0) {
                                setSelectedDate(date);
                                setIsDateSelected(true);
                                setBookingError(null);
                              } else {
                                setBookingError("no slots/0 slots");
                                setTimeout(() => setBookingError(null), 2000);
                              }
                            }}
                            className={cn(
                              "w-full aspect-square flex flex-col items-center justify-center text-lg font-bold transition-all relative rounded-xl",
                              isSelected 
                                ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20 z-10" 
                                : "hover:bg-slate-50 text-slate-900",
                              !isSelected && (!isCurrentMonth || availability === 0) && "text-slate-300",
                              !isSelected && !isCurrentMonth && "bg-slate-50/30"
                            )}
                          >
                            {format(date, 'd')}
                            {isCurrentMonth && availability > 0 && (
                              <div className="absolute bottom-0 left-0 right-0 h-1.5 px-1">
                                <div className={cn(
                                  "h-full rounded-full transition-all",
                                  isSelected ? "bg-white opacity-100" : "bg-emerald-400 opacity-60 group-hover/day:opacity-100"
                                )} />
                              </div>
                            )}
                          </button>
                          
                          {isHovered && isCurrentMonth && availability > 0 && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
                              <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap">
                                {availability} Available
                              </div>
                              <div className="w-2 h-2 bg-slate-900 rotate-45 mx-auto -mt-1" />
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-4 relative">
                <AnimatePresence>
                  {bookingError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-12 left-0 right-0 bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-xl text-xs font-bold text-center z-50 shadow-lg"
                    >
                      {bookingError}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Available Slots</p>
                  <p className="text-base font-bold text-slate-900">
                    {isDateSelected ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {isDateSelected ? timeSlots.slice(0, 6).map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-2.5 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-between group",
                        selectedTime === time
                          ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20"
                          : "bg-white border-slate-200 text-slate-600 hover:border-brand-blue/50 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className={cn("w-4 h-4", selectedTime === time ? "text-white" : "text-brand-blue")} />
                        {time}
                      </div>
                      <ChevronRight className={cn("w-4 h-4 transition-transform", selectedTime === time ? "translate-x-1" : "opacity-0 group-hover:opacity-100")} />
                    </button>
                  )) : (
                    <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                      <Calendar className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                      <p className="text-xs font-medium text-slate-400">Please select a date from the calendar to view available slots</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-4 flex justify-between">
              <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-brand-blue transition-colors">
                <ChevronLeft className="w-3 h-3" /> Back
              </button>
              <button
                disabled={!selectedTime}
                onClick={handleNext}
                className="bg-brand-blue text-white px-8 py-2.5 rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      case 'info':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name *"
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue/20 outline-none"
                value={customerInfo.firstName}
                onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name *"
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue/20 outline-none"
                value={customerInfo.lastName}
                onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
              />
              <div className="col-span-2 space-y-1">
                <div className="flex gap-2">
                  <div className="relative w-28">
                    <select
                      className="w-full p-2.5 border border-slate-200 rounded-lg text-sm outline-none appearance-none bg-white pr-8"
                      value={customerInfo.phone.split(' ')[0]}
                      onChange={(e) => {
                        const parts = customerInfo.phone.split(' ');
                        const number = parts.length > 1 ? parts[1] : parts[0];
                        setCustomerInfo({ ...customerInfo, phone: `${e.target.value} ${number}` });
                      }}
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    className={cn(
                      "flex-1 p-2.5 border rounded-lg text-sm outline-none transition-all",
                      phoneError ? "border-red-500 focus:ring-2 focus:ring-red-500/10" : "border-slate-200 focus:ring-2 focus:ring-brand-blue/20"
                    )}
                    value={customerInfo.phone.split(' ').length > 1 ? customerInfo.phone.split(' ')[1] : customerInfo.phone}
                    onChange={(e) => {
                      const parts = customerInfo.phone.split(' ');
                      const code = parts.length > 1 ? parts[0] : '+1';
                      setCustomerInfo({ ...customerInfo, phone: `${code} ${e.target.value.replace(/\D/g, '')}` });
                      if (phoneError) setPhoneError(null);
                    }}
                  />
                </div>
                {phoneError && <p className="text-[10px] text-red-500 font-bold ml-1">{phoneError}</p>}
              </div>
              <input
                type="email"
                placeholder="Email Address *"
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue/20 outline-none"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
              />
              <textarea
                placeholder="Add Comments"
                className="col-span-2 p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue/20 outline-none h-20"
                value={customerInfo.comments}
                onChange={(e) => setCustomerInfo({ ...customerInfo, comments: e.target.value })}
              />
            </div>
            <div className="pt-4 flex justify-between">
              <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-brand-blue transition-colors">
                <ChevronLeft className="w-3 h-3" /> Back
              </button>
              <button
                disabled={!customerInfo.firstName || !customerInfo.email}
                onClick={handleNext}
                className="bg-brand-blue text-white px-8 py-2.5 rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      case 'verify':
        return (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-base font-bold text-slate-900">{selectedService?.name}</div>
                  <div className="text-sm text-slate-500">{format(selectedDate, 'MMMM d')}, {selectedTime}</div>
                </div>
                <div className="text-brand-blue font-bold text-base">${selectedService?.price}.00</div>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="text-[10px] font-semibold text-slate-400 uppercase mb-1">Customer</div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">
                    {customerInfo.firstName[0]}{customerInfo.lastName[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-800">{customerInfo.firstName} {customerInfo.lastName}</div>
                    <div className="text-xs text-slate-500">{customerInfo.email}</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900">Total Price</span>
                <span className="text-lg font-bold text-brand-blue">${selectedService?.price}.00</span>
              </div>
            </div>
            <div className="pt-4 flex justify-between">
              <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-brand-blue transition-colors">
                <ChevronLeft className="w-3 h-3" /> Back
              </button>
              <button
                onClick={handleNext}
                className="bg-brand-blue text-white px-10 py-2.5 rounded-lg font-semibold flex items-center gap-2"
              >
                Submit <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      case 'confirm':
        return (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Appointment Confirmed</h3>
              <p className="text-sm text-slate-500">We look forward to seeing you.</p>
              <div className="inline-block bg-slate-100 px-3 py-0.5 rounded-full text-[10px] font-bold text-slate-500 tracking-wider">
                ORDER #{orderId}
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl text-left flex gap-3">
              <div className="bg-white border border-slate-200 rounded-lg p-1.5 flex flex-col items-center justify-center w-14 h-14">
                <span className="text-base font-bold text-slate-900">{format(selectedDate, 'd')}</span>
                <span className="text-[9px] font-bold text-brand-blue uppercase">{format(selectedDate, 'MMM')}</span>
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">{selectedService?.name}</div>
                <div className="text-xs text-slate-500">{format(selectedDate, 'MMMM d')}, {selectedTime}</div>
              </div>
            </div>
            
            <div className="bg-brand-light p-6 rounded-2xl text-xs space-y-4">
              {!isPasswordSubmitted ? (
                <div className="space-y-3">
                  <p className="text-slate-600 font-medium">Set a password to access your personal cabinet and manage your appointments</p>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all text-sm pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-blue"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      if (password.length >= 4) {
                        const newUser: UserProfile = {
                          ...customerInfo,
                          password
                        };
                        saveUser(newUser);
                        login(newUser.email, newUser.password);
                        setIsPasswordSubmitted(true);
                      }
                    }}
                    disabled={password.length < 4}
                    className="w-full bg-brand-blue text-white py-3 rounded-xl font-bold hover:bg-brand-navy transition-all disabled:opacity-50"
                  >
                    Set Password & Continue
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-green-600 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Password Set Successfully
                  </div>
                  <p className="text-slate-600">You can now manage your appointments in your personal cabinet</p>
                  <button 
                    onClick={() => {
                      onClose();
                      navigate('/customer-cabinet');
                    }}
                    className="w-full bg-brand-blue text-white py-3 rounded-xl font-bold hover:bg-brand-navy transition-all shadow-lg shadow-brand-blue/20"
                  >
                    Open My Cabinet
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleAddToCalendar}
                className="flex-1 border border-slate-200 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
              >
                <Calendar className="w-3.5 h-3.5" /> Add to Calendar
              </button>
              <button className="flex-1 border border-slate-200 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-50">
                <Phone className="w-3.5 h-3.5" /> Print
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
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row max-h-[85vh] overflow-y-auto no-scrollbar"
          >
            {/* Left Sidebar */}
            <div className="w-full lg:w-[30%] bg-white p-4 flex flex-col items-center text-center border-r border-slate-50">
              <div className="mb-1 relative">
                {/* Custom Service Selection Icon */}
                <div className="w-12 h-12 relative mb-1">
                  <div className="absolute top-0 left-0 w-10 h-10 bg-brand-blue/10 rounded-sm" />
                  <div className="absolute top-1.5 left-1.5 space-y-0.5">
                    <div className="w-12 h-1.5 border-2 border-slate-900 rounded-full bg-white relative">
                      <div className="absolute -top-1.5 -right-1 flex gap-0.5">
                        <div className="w-0.5 h-1 bg-slate-900 rotate-[30deg]" />
                        <div className="w-0.5 h-1 bg-slate-900 rotate-[0deg]" />
                      </div>
                    </div>
                    <div className="w-8 h-1.5 border-2 border-slate-900 rounded-full bg-white ml-4" />
                    <div className="w-12 h-1.5 border-2 border-slate-900 rounded-full bg-white ml-1" />
                    <div className="w-10 h-1.5 border-2 border-slate-900 rounded-full bg-white ml-3" />
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <h2 className="text-lg font-bold text-slate-900 mb-0.5">
                  {step === 'service' ? 'Service Selection' : 
                   step === 'datetime' ? 'Select Date' : 
                   step === 'info' ? 'Your Details' : 
                   step === 'verify' ? 'Review' : 'Confirmed'}
                </h2>
                <p className="text-[10px] text-slate-400 leading-tight px-2">
                  {step === 'service' && 'Please select a service for which you want to schedule an appointment'}
                  {step === 'datetime' && 'Please select date and time for your appointment'}
                  {step === 'info' && 'Please enter your contact information'}
                  {step === 'verify' && 'Double check your reservation details'}
                  {step === 'confirm' && 'Your appointment has been confirmed'}
                </p>
              </div>

              <div className="mt-auto">
                <p className="text-sm font-bold text-slate-900 mb-1">Questions?</p>
                <p className="text-sm text-slate-400">Call (858) 939-3746 for help</p>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-3 lg:p-4 relative bg-white">
              <div className="flex justify-between items-center mb-2 border-b border-slate-50 pb-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {step === 'service' && 'Available Services'}
                  {step === 'datetime' && 'Date & Time Selection'}
                  {step === 'info' && 'Customer Information'}
                  {step === 'verify' && 'Verify Order Details'}
                  {step === 'confirm' && 'Appointment Confirmed'}
                </h3>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Package, User, Plus, LogOut, ExternalLink, CheckCircle2, Clock, ShieldCheck, CreditCard, ChevronRight, List, Trash2, XCircle, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import BookingModal from '@/src/components/BookingModal';
import { getAppointments, getOrders, cancelAppointment, deleteAppointment, saveUser, UserProfile, isEmailTaken } from '@/src/lib/storage';
import { useUser } from '@/src/UserContext';
import { COUNTRY_CODES } from '@/src/constants/countries';

type Tab = 'appointments' | 'orders' | 'profile' | 'new';
type AuthMode = 'login' | 'register';

export default function CustomerCabinet() {
  const navigate = useNavigate();
  const { currentUser, login, logout } = useUser();
  const [authMode, setAuthMode] = React.useState<AuthMode>('login');
  const [showPassword, setShowPassword] = React.useState(false);
  const [authForm, setAuthForm] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    countryCode: '+1'
  });
  const [authError, setAuthError] = React.useState<string | null>(null);

  const [activeTab, setActiveTab] = React.useState<Tab>('appointments');
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [selectedSummary, setSelectedSummary] = React.useState<{ type: 'appointment' | 'order', id: string } | null>(null);

  const tabs = [
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'new', name: 'New Appointment', icon: Plus },
  ];

  const [appointments, setAppointments] = React.useState<any[]>([]);
  const [orders, setOrders] = React.useState<any[]>([]);
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);
  const [confirmCancelId, setConfirmCancelId] = React.useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null);
  const [cancellationFeedback, setCancellationFeedback] = React.useState('');

  React.useEffect(() => {
    if (!currentUser) return;

    const storedApts = getAppointments();
    const storedOrders = getOrders();
    
    setAppointments(storedApts);
    setOrders(storedOrders);
  }, [isBookingOpen, refreshTrigger, currentUser]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (authMode === 'login') {
      const user = login(authForm.email, authForm.password);
      if (user) {
        setTempProfile(user);
        setProfile(user);
      } else {
        setAuthError('Invalid email or password');
      }
    } else {
      // Register
      if (!authForm.email || !authForm.password || !authForm.firstName || !authForm.lastName) {
        setAuthError('Please fill in all required fields');
        return;
      }

      if (isEmailTaken(authForm.email)) {
        setAuthError('An account with this email already exists');
        return;
      }
      
      const newUser: UserProfile = {
        email: authForm.email,
        password: authForm.password,
        firstName: authForm.firstName,
        lastName: authForm.lastName,
        phone: `${authForm.countryCode} ${authForm.phone}`
      };
      
      saveUser(newUser);
      login(newUser.email, newUser.password);
      setTempProfile(newUser);
      setProfile(newUser);
    }
  };

  const handleCancelAppointment = (id: string) => {
    const aptToCancel = appointments.find(a => a.id === id);
    const orderToCancel = orders.find(o => o.id === id);
    if (aptToCancel) {
      cancelAppointment(id, aptToCancel, orderToCancel, cancellationFeedback);
      setRefreshTrigger(prev => prev + 1);
      setConfirmCancelId(null);
      setCancellationFeedback('');
      if (selectedSummary?.id === id) {
        setSelectedSummary(null);
      }
    }
  };

  const handleDeleteAppointment = (id: string) => {
    deleteAppointment(id);
    setRefreshTrigger(prev => prev + 1);
    setConfirmDeleteId(null);
    if (selectedSummary?.id === id) {
      setSelectedSummary(null);
    }
  };

  const selectedItem = selectedSummary 
    ? (selectedSummary.type === 'appointment' 
        ? appointments.find(a => a.id === selectedSummary.id)
        : orders.find(o => o.id === selectedSummary.id))
    : null;

  const handleLogout = () => {
    logout();
    setAppointments([]);
    setOrders([]);
    navigate('/');
  };

  const handleRequestQuote = () => {
    navigate('/contact');
  };

  const [profile, setProfile] = React.useState<UserProfile>(currentUser || {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  React.useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
      setTempProfile(currentUser);
    }
  }, [currentUser]);

  const [tempProfile, setTempProfile] = React.useState<UserProfile>(profile);
  const [profileStatus, setProfileStatus] = React.useState<'idle' | 'updating' | 'success'>('idle');
  const [phoneError, setPhoneError] = React.useState<string | null>(null);

  const validatePhone = (phone: string) => {
    const parts = phone.split(' ');
    const number = parts.length > 1 ? parts[1] : parts[0];
    const digits = number.replace(/\D/g, '');
    return digits.length >= 7;
  };

  const handleSaveProfile = () => {
    if (!validatePhone(tempProfile.phone)) {
      setPhoneError('Please enter a valid phone number');
      return;
    }
    
    setPhoneError(null);
    setProfileStatus('updating');
    setTimeout(() => {
      setProfile(tempProfile);
      setProfileStatus('success');
      setTimeout(() => setProfileStatus('idle'), 3000);
    }, 1000);
  };

  const handleCancelProfile = () => {
    setTempProfile(profile);
    setPhoneError(null);
  };

  const [passwordStatus, setPasswordStatus] = React.useState<'idle' | 'updating' | 'success'>('idle');

  const handleSetPassword = () => {
    setPasswordStatus('updating');
    setTimeout(() => {
      setPasswordStatus('success');
      setTimeout(() => setPasswordStatus('idle'), 3000);
    }, 1500);
  };

  const handleAddToCalendar = (apt: any) => {
    // Mock date parsing for demo: "April 2, 09:00am"
    const [monthDay, timeStr] = apt.date.split(', ');
    const [month, day] = monthDay.split(' ');
    
    const startDate = new Date();
    startDate.setMonth(3); // April
    startDate.setDate(parseInt(day));
    
    const [time, period] = timeStr.split(/(am|pm)/i);
    const [hours, minutes] = time.split(':');
    let h = parseInt(hours);
    if (period.toLowerCase() === 'pm' && h < 12) h += 12;
    if (period.toLowerCase() === 'am' && h === 12) h = 0;
    
    startDate.setHours(h, parseInt(minutes), 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);
    
    const formatGCalDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Arkanj Tech: ' + apt.service)}&dates=${formatGCalDate(startDate)}/${formatGCalDate(endDate)}&details=${encodeURIComponent('Appointment for ' + apt.service + ' with Arkanj Tech Solutions.')}&location=${encodeURIComponent('Online/Remote')}`;
    
    window.open(url, '_blank');
  };

  if (!currentUser) {
    return (
      <div className="pt-32 min-h-screen bg-brand-light pb-20">
        <div className="max-w-md mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100"
          >
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-brand-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-brand-blue" />
              </div>
              <h1 className="text-3xl font-bold text-brand-navy mb-2">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-slate-500">
                {authMode === 'login' 
                  ? 'Enter your credentials to access your cabinet' 
                  : 'Join Arkanj Tech to manage your appointments'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'register' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-blue outline-none transition-all"
                      value={authForm.firstName}
                      onChange={(e) => setAuthForm({...authForm, firstName: e.target.value})}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-blue outline-none transition-all"
                      value={authForm.lastName}
                      onChange={(e) => setAuthForm({...authForm, lastName: e.target.value})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="relative w-32">
                      <select
                        className="w-full px-4 py-4 rounded-2xl border border-slate-200 focus:border-brand-blue outline-none transition-all appearance-none bg-white text-sm"
                        value={authForm.countryCode}
                        onChange={(e) => setAuthForm({...authForm, countryCode: e.target.value})}
                      >
                        {COUNTRY_CODES.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="flex-1 px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-blue outline-none transition-all"
                      value={authForm.phone}
                      onChange={(e) => setAuthForm({...authForm, phone: e.target.value.replace(/\D/g, '')})}
                    />
                  </div>
                </>
              )}
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-blue outline-none transition-all"
                value={authForm.email}
                onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-blue outline-none transition-all pr-14"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-blue"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {authError && (
                <p className="text-red-500 text-sm font-bold text-center">{authError}</p>
              )}
              <button
                type="submit"
                className="w-full bg-brand-blue text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-navy transition-all shadow-lg shadow-brand-blue/20"
              >
                {authMode === 'login' ? 'Login to Cabinet' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-brand-blue font-bold hover:underline"
              >
                {authMode === 'login' 
                  ? "Don't have an account? Register" 
                  : "Already have an account? Login"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-brand-light pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="p-10 border-b border-slate-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-brand-navy mb-2">Customer Cabinet</h1>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-400">Welcome <span className="text-brand-blue font-bold">{profile.firstName} {profile.lastName}</span></span>
                  <button 
                    onClick={handleLogout}
                    className="text-brand-blue font-semibold flex items-center gap-1 hover:underline"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
              <button 
                onClick={handleRequestQuote}
                className="bg-brand-blue text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-navy transition-all"
              >
                REQUEST QUOTE
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-100">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={cn(
                      "pb-4 text-sm font-bold transition-all relative flex items-center gap-2",
                      activeTab === tab.id ? "text-brand-blue" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                    {activeTab === tab.id && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-blue rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-10">
            {activeTab === 'appointments' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-800">Upcoming</h2>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{appointments.length} Appointments</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {appointments.map((apt) => (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-brand-navy">{apt.service}</h3>
                          <p className="text-sm text-slate-500">{apt.date}</p>
                        </div>
                        <div className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                          apt.status === 'cancelled' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        )}>
                          {apt.status}
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-8">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400 font-medium">Agent</span>
                          <span className="text-slate-800 font-bold">{apt.agent}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400 font-medium">Status</span>
                          <span className={cn(
                            "flex items-center gap-1 font-bold",
                            apt.status === 'cancelled' ? "text-red-600" : "text-green-600"
                          )}>
                            {apt.status === 'cancelled' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {apt.status !== 'cancelled' ? (
                          <>
                            <button 
                              onClick={() => handleAddToCalendar(apt)}
                              className="w-full py-2.5 rounded-lg border border-brand-blue text-brand-blue text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-blue hover:text-white transition-all"
                            >
                              <Plus className="w-4 h-4" /> Add to Calendar
                            </button>
                            <button 
                              onClick={() => setConfirmCancelId(apt.id)}
                              className="w-full py-2.5 rounded-lg border border-red-100 text-red-500 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all"
                            >
                              <Trash2 className="w-4 h-4" /> Delete Appointment
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => setConfirmDeleteId(apt.id)}
                            className="w-full py-2.5 rounded-lg border border-red-100 text-red-500 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" /> Remove from History
                          </button>
                        )}
                        <button 
                          onClick={() => setSelectedSummary({ type: 'appointment', id: apt.id })}
                          className="w-full py-2.5 rounded-lg border border-slate-100 text-slate-400 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                        >
                          <List className="w-4 h-4" /> Summary
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  <button 
                    onClick={() => setIsBookingOpen(true)}
                    className="p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-brand-blue hover:text-brand-blue transition-all group min-h-[280px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors">
                      <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-lg">New Appointment</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-brand-navy">{order.id}</h3>
                        <p className="text-sm text-slate-400">{order.date}</p>
                      </div>
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        order.status === 'cancelled' ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      )}>
                        {order.status || 'Approved'}
                      </div>
                    </div>
                    
                    <div className="space-y-4 py-6 border-y border-slate-50 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-medium">Service</span>
                        <div className="h-2 w-24 bg-slate-50 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-slate-200" />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-800 font-medium">{order.service}</span>
                        <span className="text-slate-800 font-bold">${order.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">Payments and Credits</span>
                        <span className="text-slate-800 font-bold">${order.payments.toFixed(2)}</span>
                      </div>
                      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-lg font-bold text-brand-navy">Balance Due</span>
                        <span className="text-lg font-bold text-brand-navy">${order.balance.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedSummary({ type: 'order', id: order.id })}
                        className="flex-1 flex items-center justify-center gap-2 text-brand-blue font-bold px-4 py-2 border border-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition-all text-sm"
                      >
                        <List className="w-4 h-4" /> Summary
                      </button>
                      <button 
                        onClick={() => {
                          if (order.status === 'cancelled') {
                            setConfirmDeleteId(order.id);
                          } else {
                            setConfirmCancelId(order.id);
                          }
                        }}
                        className="flex items-center justify-center p-2 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-all"
                        title={order.status === 'cancelled' ? "Remove from History" : "Cancel & Delete"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="max-w-4xl space-y-12">
                <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center">
                      <User className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-navy">Personal Information</h3>
                      <p className="text-sm text-slate-500">Update your account details and contact information</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">First Name</label>
                      <input 
                        type="text" 
                        value={tempProfile.firstName}
                        onChange={(e) => setTempProfile({...tempProfile, firstName: e.target.value})}
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all bg-white font-medium text-slate-700"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Last Name</label>
                      <input 
                        type="text" 
                        value={tempProfile.lastName}
                        onChange={(e) => setTempProfile({...tempProfile, lastName: e.target.value})}
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all bg-white font-medium text-slate-700"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="relative w-32">
                          <select
                            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-brand-blue outline-none transition-all appearance-none bg-white text-sm font-medium"
                            value={tempProfile.phone.split(' ')[0]}
                            onChange={(e) => {
                              const parts = tempProfile.phone.split(' ');
                              const number = parts.length > 1 ? parts[1] : parts[0];
                              setTempProfile({ ...tempProfile, phone: `${e.target.value} ${number}` });
                            }}
                          >
                            {COUNTRY_CODES.map(c => (
                              <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                        <input 
                          type="tel" 
                          value={tempProfile.phone.split(' ').length > 1 ? tempProfile.phone.split(' ')[1] : tempProfile.phone}
                          onChange={(e) => {
                            const parts = tempProfile.phone.split(' ');
                            const code = parts.length > 1 ? parts[0] : '+1';
                            setTempProfile({ ...tempProfile, phone: `${code} ${e.target.value.replace(/\D/g, '')}` });
                          }}
                          className={cn(
                            "flex-1 px-5 py-3.5 rounded-2xl border outline-none transition-all bg-white font-medium text-slate-700",
                            phoneError ? "border-red-500 focus:ring-4 focus:ring-red-500/5" : "border-slate-200 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5"
                          )}
                          placeholder="Phone number"
                        />
                      </div>
                      {phoneError && <p className="text-[10px] text-red-500 ml-1 font-bold">{phoneError}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address (Read-only)</label>
                      <div className="relative group">
                        <input 
                          type="email" 
                          value={tempProfile.email}
                          disabled
                          className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 text-slate-400 font-medium cursor-not-allowed outline-none"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <ShieldCheck className="w-5 h-5 text-slate-300" />
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 ml-1">Contact support to change your registered email address</p>
                    </div>
                  </div>

                  <div className="mt-10 flex items-center gap-4">
                    <button 
                      onClick={handleSaveProfile}
                      disabled={profileStatus !== 'idle'}
                      className="bg-brand-blue text-white px-10 py-4 rounded-2xl font-bold hover:bg-brand-navy transition-all shadow-lg shadow-brand-blue/20 flex items-center gap-2 disabled:opacity-50"
                    >
                      {profileStatus === 'updating' ? (
                        <>
                          <Clock className="w-5 h-5 animate-spin" /> Saving...
                        </>
                      ) : profileStatus === 'success' ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" /> Saved Successfully
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                    <button 
                      onClick={handleCancelProfile}
                      disabled={profileStatus !== 'idle'}
                      className="px-10 py-4 rounded-2xl font-bold text-slate-500 border border-slate-200 hover:bg-slate-50 transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="pt-12 border-t border-slate-100">
                  <h3 className="text-xl font-bold text-brand-navy mb-8">Set New Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="New Password"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-blue"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Confirm New Password"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-blue"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={handleSetPassword}
                    disabled={passwordStatus !== 'idle'}
                    className="bg-brand-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-navy transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {passwordStatus === 'updating' ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" /> Updating...
                      </>
                    ) : passwordStatus === 'success' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Password Updated
                      </>
                    ) : (
                      'Set New Password'
                    )}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'new' && (
              <div className="py-20 flex flex-col items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-brand-blue/70 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-brand-blue transition-all shadow-xl shadow-brand-blue/20"
                >
                  BOOK APPOINTMENT
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Modal */}
      <AnimatePresence>
        {selectedSummary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSummary(null)}
              className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-brand-navy">
                  {selectedSummary.type === 'appointment' ? 'Appointment Summary' : 'Order Summary'}
                </h3>
                <button onClick={() => setSelectedSummary(null)} className="text-slate-400 hover:text-brand-navy">
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4 p-4 bg-brand-light rounded-2xl">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    {selectedSummary.type === 'appointment' ? <Calendar className="text-brand-blue" /> : <Package className="text-brand-blue" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reference ID</div>
                    <div className="text-lg font-bold text-brand-navy">{selectedSummary.id}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <span className={cn(
                      "font-bold flex items-center gap-1",
                      selectedItem?.status === 'cancelled' ? "text-red-600" : "text-green-600"
                    )}>
                      {selectedItem?.status === 'cancelled' ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      {selectedItem?.status ? (selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)) : 'Confirmed'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Date</span>
                    <span className="text-brand-navy font-bold">{selectedItem?.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Service</span>
                    <span className="text-brand-navy font-bold">{selectedItem?.service}</span>
                  </div>
                  {selectedItem?.cancellationFeedback && (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Cancellation Feedback</div>
                      <div className="p-3 bg-red-50 rounded-xl text-xs text-red-700 italic">
                        "{selectedItem.cancellationFeedback}"
                      </div>
                    </div>
                  )}
                  {selectedItem?.amount !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Amount</span>
                      <span className="text-brand-navy font-bold">${selectedItem.amount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 leading-relaxed">
                    This is a summary of your {selectedSummary.type}. A detailed report has been sent to your registered email address.
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50 flex justify-end gap-3">
                {selectedSummary.type === 'appointment' && (
                  selectedItem?.status !== 'cancelled' ? (
                    <button 
                      onClick={() => setConfirmCancelId(selectedSummary.id)}
                      className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition-all border border-red-100"
                    >
                      Cancel Appointment
                    </button>
                  ) : (
                    <button 
                      onClick={() => setConfirmDeleteId(selectedSummary.id)}
                      className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition-all border border-red-100"
                    >
                      Remove from History
                    </button>
                  )
                )}
                <button 
                  onClick={() => setSelectedSummary(null)}
                  className="bg-brand-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-navy transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDeleteId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDeleteId(null)}
              className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden p-8 text-center"
            >
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Permanently Delete?</h3>
              <p className="text-slate-500 mb-8">
                Are you sure you want to remove this appointment from your history? This will also remove the linked order.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDeleteAppointment(confirmDeleteId)}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                >
                  Delete Permanently
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmCancelId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmCancelId(null)}
              className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden p-8 text-center"
            >
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Cancel Appointment?</h3>
              <p className="text-slate-500 mb-6">
                Active appointments must be cancelled before deletion. Please tell us why you are cancelling:
              </p>
              <textarea
                value={cancellationFeedback}
                onChange={(e) => setCancellationFeedback(e.target.value)}
                placeholder="Your feedback (optional)..."
                className="w-full p-4 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all text-sm mb-8 h-24 resize-none"
              />
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setConfirmCancelId(null);
                    setCancellationFeedback('');
                  }}
                  className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Go Back
                </button>
                <button 
                  onClick={() => handleCancelAppointment(confirmCancelId)}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                >
                  Cancel & Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

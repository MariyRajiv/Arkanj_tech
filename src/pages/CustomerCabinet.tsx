import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Package, User, Plus, LogOut, ExternalLink, CheckCircle2, Clock, ShieldCheck, CreditCard, ChevronRight, List } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import BookingModal from '@/src/components/BookingModal';
import { getAppointments, getOrders } from '@/src/lib/storage';

type Tab = 'appointments' | 'orders' | 'profile' | 'new';

export default function CustomerCabinet() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<Tab>('appointments');
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [selectedSummary, setSelectedSummary] = React.useState<{ type: 'appointment' | 'order', id: string } | null>(null);

  const tabs = [
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'new', name: 'New Appointment', icon: Plus },
  ];

  // Initial mock data
  const initialAppointments = [
    {
      id: '1',
      service: 'Design',
      date: 'April 2, 09:00am',
      agent: 'Daniel Miller',
      status: 'approved'
    }
  ];

  const initialOrders = [
    {
      id: 'ZFM2JPU',
      date: 'Apr 1, 2026',
      service: 'Design',
      amount: 100.00,
      payments: 0.00,
      balance: 100.00
    }
  ];

  const [appointments, setAppointments] = React.useState<any[]>([]);
  const [orders, setOrders] = React.useState<any[]>([]);

  React.useEffect(() => {
    const storedApts = getAppointments();
    const storedOrders = getOrders();
    
    setAppointments([...initialAppointments, ...storedApts]);
    setOrders([...initialOrders, ...storedOrders]);
  }, [isBookingOpen]);

  const selectedItem = selectedSummary 
    ? (selectedSummary.type === 'appointment' 
        ? appointments.find(a => a.id === selectedSummary.id)
        : orders.find(o => o.id === selectedSummary.id))
    : null;

  const handleLogout = () => {
    // In a real app, we would clear auth state here
    navigate('/');
  };

  const handleRequestQuote = () => {
    navigate('/contact');
  };

  const [profile, setProfile] = React.useState({
    firstName: 'rajiv',
    lastName: 'chavva',
    phone: '+1 788-887-8___',
    email: 'rajiv@arkanj.tech'
  });

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
                  <span className="text-slate-400">Welcome <span className="text-brand-blue font-bold">rajiv chavva</span></span>
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
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
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
                          <span className="flex items-center gap-1 text-green-600 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> Approved
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button 
                          onClick={() => handleAddToCalendar(apt)}
                          className="w-full py-2.5 rounded-lg border border-brand-blue text-brand-blue text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-blue hover:text-white transition-all"
                        >
                          <Plus className="w-4 h-4" /> Add to Calendar
                        </button>
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

                    <button 
                      onClick={() => setSelectedSummary({ type: 'order', id: order.id })}
                      className="flex items-center gap-2 text-brand-blue font-bold px-4 py-2 border border-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition-all text-sm"
                    >
                      <List className="w-4 h-4" /> Summary
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="max-w-4xl space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your First Name</label>
                    <input 
                      type="text" 
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Last Name</label>
                    <input 
                      type="text" 
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Phone Number</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="text-lg">🇺🇸</span>
                        <span className="text-slate-400">+1</span>
                      </div>
                      <input 
                        type="text" 
                        value={profile.phone.replace('+1 ', '')}
                        onChange={(e) => setProfile({...profile, phone: '+1 ' + e.target.value})}
                        className="w-full pl-16 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Email Address</label>
                    <input 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                    />
                  </div>
                </div>
                <button className="bg-brand-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-navy transition-all">
                  Save Changes
                </button>

                <div className="pt-12 border-t border-slate-100">
                  <h3 className="text-xl font-bold text-brand-navy mb-8">Set New Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input 
                      type="password" 
                      placeholder="New Password"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                    />
                    <input 
                      type="password" 
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                    />
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
                    <span className="text-green-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {selectedItem?.status || 'Confirmed'}
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
              <div className="p-8 bg-slate-50 flex justify-end">
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
    </div>
  );
}

export interface Appointment {
  id: string;
  service: string;
  date: string;
  agent: string;
  status: 'pending' | 'approved' | 'cancelled';
  customerInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    comments: string;
  };
  cancellationFeedback?: string;
}

export interface Order {
  id: string;
  date: string;
  service: string;
  amount: number;
  payments: number;
  balance: number;
  status: 'approved' | 'cancelled';
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password?: string;
}

const APPOINTMENTS_KEY = 'arkanj_appointments';
const ORDERS_KEY = 'arkanj_orders';
const USERS_KEY = 'arkanj_users';
const SESSION_KEY = 'arkanj_session';

export const getUsers = (): UserProfile[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user: UserProfile) => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);
  if (existingIndex >= 0) {
    users[existingIndex] = { ...users[existingIndex], ...user };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } else {
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  }
};

export const isEmailTaken = (email: string): boolean => {
  const users = getUsers();
  return users.some(u => u.email === email);
};

export const loginUser = (email: string, password?: string): UserProfile | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && (!password || u.password === password));
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = (): UserProfile | null => {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const updateCurrentUser = (profile: UserProfile) => {
  const users = getUsers();
  const updatedUsers = users.map(u => u.email === profile.email ? profile : u);
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
};

export const getAppointments = (): Appointment[] => {
  const user = getCurrentUser();
  if (!user) return [];
  const data = localStorage.getItem(APPOINTMENTS_KEY);
  const appointments = data ? JSON.parse(data) : [];
  // Filter by user email
  return appointments
    .filter((a: any) => a.customerInfo?.email === user.email)
    .map((a: any) => ({ ...a, status: a.status || 'approved' }));
};

export const saveAppointment = (appointment: Appointment) => {
  const data = localStorage.getItem(APPOINTMENTS_KEY);
  const appointments = data ? JSON.parse(data) : [];
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify([...appointments, appointment]));
};

export const getOrders = (): Order[] => {
  const user = getCurrentUser();
  if (!user) return [];
  const data = localStorage.getItem(ORDERS_KEY);
  const orders = data ? JSON.parse(data) : [];
  
  // To filter orders, we need to know which user they belong to.
  // Since orders don't have email, we'll match by ID with appointments.
  const userApts = getAppointments();
  const userAptIds = new Set(userApts.map(a => a.id));
  
  return orders
    .filter((o: any) => userAptIds.has(o.id))
    .map((o: any) => ({ ...o, status: o.status || 'approved' }));
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([...orders, order]));
};

export const cancelAppointment = (id: string, fallbackApt?: Appointment, fallbackOrder?: Order, feedback?: string) => {
  const appointments = getAppointments();
  const orders = getOrders();
  
  const aptExists = appointments.some(a => a.id === id);
  
  let updatedApts;
  if (aptExists) {
    updatedApts = appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'cancelled' as const, cancellationFeedback: feedback } : apt
    );
  } else if (fallbackApt) {
    updatedApts = [...appointments, { ...fallbackApt, status: 'cancelled' as const, cancellationFeedback: feedback }];
  } else {
    return;
  }
  
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updatedApts));

  // Also cancel the linked order if it exists
  const orderExists = orders.some(o => o.id === id);
  let updatedOrders;
  if (orderExists) {
    updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status: 'cancelled' as const } : order
    );
  } else if (fallbackOrder) {
    updatedOrders = [...orders, { ...fallbackOrder, status: 'cancelled' as const }];
  } else {
    updatedOrders = orders;
  }
  
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
};

export const deleteAppointment = (id: string) => {
  const appointments = getAppointments();
  const orders = getOrders();
  
  const filteredApts = appointments.filter(a => a.id !== id);
  const filteredOrders = orders.filter(o => o.id !== id);
  
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(filteredApts));
  localStorage.setItem(ORDERS_KEY, JSON.stringify(filteredOrders));
};

export const generateOrderId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

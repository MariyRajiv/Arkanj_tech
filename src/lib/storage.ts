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
}

export interface Order {
  id: string;
  date: string;
  service: string;
  amount: number;
  payments: number;
  balance: number;
}

const APPOINTMENTS_KEY = 'arkanj_appointments';
const ORDERS_KEY = 'arkanj_orders';

export const getAppointments = (): Appointment[] => {
  const data = localStorage.getItem(APPOINTMENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveAppointment = (appointment: Appointment) => {
  const appointments = getAppointments();
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify([...appointments, appointment]));
};

export const getOrders = (): Order[] => {
  const data = localStorage.getItem(ORDERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([...orders, order]));
};

export const generateOrderId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
  category: string;
  highlighted?: boolean;
}

export interface Appointment {
  id: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  agentName?: string;
  customerName: string;
  customerEmail: string;
}

export const SERVICES: Service[] = [
  {
    id: 'edutech',
    title: 'EduTech – Individuals',
    description: '**From "Candidate" to "The Only Choice".** Is your digital presence outdated or generic?  Most profiles sound like AI wrote them without a soul.\n\n We help you be not just "better" but strategic.',
    price: 150,
    icon: '/edutech.png',
    category: 'Education',
    highlighted: true
  },
  {
    id: 'fintech',
    title: 'FinTech',
    description: 'The Future of Finance is **Autonomous.** \n\n By merging advanced AI with deep financial intelligence, we automate the complex,, analyze the massive, and solve the “unsolvable” challenges of modern banking & trade.',
    price: 300,
    icon: '/fintech.png',
    category: 'Finance'
  },
  {
    id: 'uptech',
    title: 'UpTech – Industry',
    description: '**Intelligent Performance, Automated Success.** Use AI algorithms to unlock new market opportunities before your competitors do.\n\n**Eliminate routine bottlenecks** with custom-built AI agents that work 24/7',
    price: 250,
    icon: '/uptech.png',
    category: 'Industry'
  },
  {
    id: 'deeptech',
    title: 'DeepTech',
    description: '**Architecting the Impossible.**\n\n Custom Algorithmic Design and Technology Migration. We develop proprietary, high-velocity algorithms tailored to your specific data challenges from neural networks to complex logic engines.',
    price: 500,
    icon: '/deeptech.png',
    category: 'Advanced'
  },
  {
    id: 'medtech',
    title: 'MedTech',
    description: '**Turning Medical Data into Clinical Intelligence.** \n\n We simulate thousands of reactions to pinpoint candidates with superior **developability, targetability,** and optimized **safety and specificity profiles.**',
    price: 450,
    icon: '/medtech.png',
    category: 'Healthcare'
  },
  {
    id: 'launchtech',
    title: 'LaunchTech',
    description: '**The All-In-One Founder’s Engine.** We build high-conversion websites, authority-building blogs, and robust custom software designed to scale with your user base.\n\n From strategic **naming and domain registration** to complete visual rebranding, we secure your digital footprint from day one',
    price: 200,
    icon: '/launchtech.png',
    category: 'Startups'
  }
];

export const BOOKING_SERVICES = [
  { id: 'design', name: 'Design', price: 70 },
  { id: 'development', name: 'Development', price: 150 },
  { id: 'marketing', name: 'Marketing', price: 100 },
  { id: 'social-media', name: 'Social Media', price: 70 },
  { id: 'ecommerce', name: 'eCommerce', price: 150 },
];

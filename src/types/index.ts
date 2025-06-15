export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  name: string;
  amount: number;
  currency: string;
  billingFrequency: 'monthly' | 'yearly' | 'weekly' | 'quarterly';
  nextPaymentDate: string;
  category: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface SubscriptionContextType {
  subscriptions: Subscription[];
  addSubscription: (subscription: Omit<Subscription, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  updateSubscription: (id: string, subscription: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  getSubscriptionById: (id: string) => Subscription | undefined;
}
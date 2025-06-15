import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Subscription, SubscriptionContextType } from '../types';
import { useAuth } from './AuthContext';

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscriptions = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
};

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSubscriptions();
    } else {
      setSubscriptions([]);
    }
  }, [user]);

  const loadSubscriptions = () => {
    if (!user) return;
    
    const stored = localStorage.getItem(`subscription-tracker-subs-${user.id}`);
    if (stored) {
      try {
        setSubscriptions(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading subscriptions:', error);
      }
    }
  };

  const saveSubscriptions = (subs: Subscription[]) => {
    if (!user) return;
    
    localStorage.setItem(`subscription-tracker-subs-${user.id}`, JSON.stringify(subs));
    setSubscriptions(subs);
  };

  const addSubscription = (subscriptionData: Omit<Subscription, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;
    
    const newSubscription: Subscription = {
      ...subscriptionData,
      id: crypto.randomUUID(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedSubscriptions = [...subscriptions, newSubscription];
    saveSubscriptions(updatedSubscriptions);
  };

  const updateSubscription = (id: string, subscriptionData: Partial<Subscription>) => {
    const updatedSubscriptions = subscriptions.map(sub =>
      sub.id === id
        ? { ...sub, ...subscriptionData, updatedAt: new Date().toISOString() }
        : sub
    );
    saveSubscriptions(updatedSubscriptions);
  };

  const deleteSubscription = (id: string) => {
    const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id);
    saveSubscriptions(updatedSubscriptions);
  };

  const getSubscriptionById = (id: string) => {
    return subscriptions.find(sub => sub.id === id);
  };

  const value: SubscriptionContextType = {
    subscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    getSubscriptionById,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
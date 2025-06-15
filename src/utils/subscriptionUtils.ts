import { Subscription } from '../types';

export const calculateMonthlyTotal = (subscriptions: Subscription[]): number => {
  return subscriptions.reduce((total, sub) => {
    if (!sub.isActive) return total;
    
    switch (sub.billingFrequency) {
      case 'weekly':
        return total + (sub.amount * 52) / 12;
      case 'monthly':
        return total + sub.amount;
      case 'quarterly':
        return total + sub.amount / 3;
      case 'yearly':
        return total + sub.amount / 12;
      default:
        return total + sub.amount;
    }
  }, 0);
};

export const calculateYearlyTotal = (subscriptions: Subscription[]): number => {
  return subscriptions.reduce((total, sub) => {
    if (!sub.isActive) return total;
    
    switch (sub.billingFrequency) {
      case 'weekly':
        return total + sub.amount * 52;
      case 'monthly':
        return total + sub.amount * 12;
      case 'quarterly':
        return total + sub.amount * 4;
      case 'yearly':
        return total + sub.amount;
      default:
        return total + sub.amount * 12;
    }
  }, 0);
};

export const getSubscriptionsByCategory = (subscriptions: Subscription[]) => {
  const categories: Record<string, number> = {};
  
  subscriptions.forEach(sub => {
    if (!sub.isActive) return;
    
    const monthlyAmount = getMonthlyAmount(sub);
    categories[sub.category] = (categories[sub.category] || 0) + monthlyAmount;
  });
  
  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};

export const getMonthlyAmount = (subscription: Subscription): number => {
  switch (subscription.billingFrequency) {
    case 'weekly':
      return (subscription.amount * 52) / 12;
    case 'monthly':
      return subscription.amount;
    case 'quarterly':
      return subscription.amount / 3;
    case 'yearly':
      return subscription.amount / 12;
    default:
      return subscription.amount;
  }
};

export const exportToCSV = (subscriptions: Subscription[]): void => {
  const headers = ['Name', 'Amount', 'Currency', 'Billing Frequency', 'Next Payment', 'Category', 'Status'];
  const rows = subscriptions.map(sub => [
    sub.name,
    sub.amount.toString(),
    sub.currency,
    sub.billingFrequency,
    sub.nextPaymentDate,
    sub.category,
    sub.isActive ? 'Active' : 'Inactive'
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `subscriptions-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
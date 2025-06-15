import { format, addDays, addWeeks, addMonths, addYears, differenceInDays, isAfter, isBefore } from 'date-fns';

export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy') => {
  return format(new Date(date), formatStr);
};

export const getNextPaymentDate = (lastPayment: string, frequency: string): string => {
  const date = new Date(lastPayment);
  
  switch (frequency) {
    case 'weekly':
      return addWeeks(date, 1).toISOString();
    case 'monthly':
      return addMonths(date, 1).toISOString();
    case 'quarterly':
      return addMonths(date, 3).toISOString();
    case 'yearly':
      return addYears(date, 1).toISOString();
    default:
      return addMonths(date, 1).toISOString();
  }
};

export const getDaysUntilPayment = (paymentDate: string): number => {
  return differenceInDays(new Date(paymentDate), new Date());
};

export const isPaymentOverdue = (paymentDate: string): boolean => {
  return isBefore(new Date(paymentDate), new Date());
};

export const isPaymentUpcoming = (paymentDate: string, days: number = 7): boolean => {
  const payment = new Date(paymentDate);
  const upcoming = addDays(new Date(), days);
  return isAfter(payment, new Date()) && isBefore(payment, upcoming);
};
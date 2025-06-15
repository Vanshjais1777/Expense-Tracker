import React, { useMemo } from 'react';
import { Calendar, AlertTriangle, Clock } from 'lucide-react';
import { useSubscriptions } from '../../contexts/SubscriptionContext';
import { getDaysUntilPayment, isPaymentOverdue, formatDate } from '../../utils/dateUtils';

export const UpcomingPayments: React.FC = () => {
  const { subscriptions } = useSubscriptions();

  const upcomingPayments = useMemo(() => {
    return subscriptions
      .filter(sub => sub.isActive)
      .map(sub => ({
        ...sub,
        daysUntil: getDaysUntilPayment(sub.nextPaymentDate),
        isOverdue: isPaymentOverdue(sub.nextPaymentDate),
      }))
      .sort((a, b) => a.daysUntil - b.daysUntil)
      .slice(0, 10);
  }, [subscriptions]);

  if (upcomingPayments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Payments
        </h3>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No upcoming payments
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Upcoming Payments
      </h3>
      
      <div className="space-y-3">
        {upcomingPayments.map((payment) => (
          <div
            key={payment.id}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${
              payment.isOverdue
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                : payment.daysUntil <= 3
                ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                payment.isOverdue
                  ? 'bg-red-100 dark:bg-red-900/30'
                  : payment.daysUntil <= 3
                  ? 'bg-amber-100 dark:bg-amber-900/30'
                  : 'bg-blue-100 dark:bg-blue-900/30'
              }`}>
                {payment.isOverdue ? (
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                ) : payment.daysUntil <= 3 ? (
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                ) : (
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {payment.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(payment.nextPaymentDate)}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">
                ${payment.amount.toFixed(2)}
              </p>
              <p className={`text-sm font-medium ${
                payment.isOverdue
                  ? 'text-red-600 dark:text-red-400'
                  : payment.daysUntil <= 3
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {payment.isOverdue
                  ? `${Math.abs(payment.daysUntil)} days overdue`
                  : payment.daysUntil === 0
                  ? 'Due today'
                  : `${payment.daysUntil} days`
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
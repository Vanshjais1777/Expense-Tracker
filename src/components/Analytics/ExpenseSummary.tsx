import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, PiggyBank, AlertTriangle } from 'lucide-react';
import { useSubscriptions } from '../../contexts/SubscriptionContext';
import { calculateMonthlyTotal, calculateYearlyTotal } from '../../utils/subscriptionUtils';

export const ExpenseSummary: React.FC = () => {
  const { subscriptions } = useSubscriptions();

  const stats = useMemo(() => {
    const activeSubscriptions = subscriptions.filter(sub => sub.isActive);
    const inactiveSubscriptions = subscriptions.filter(sub => !sub.isActive);
    
    const monthlyTotal = calculateMonthlyTotal(activeSubscriptions);
    const yearlyTotal = calculateYearlyTotal(activeSubscriptions);
    const averageSubscriptionCost = activeSubscriptions.length > 0 
      ? monthlyTotal / activeSubscriptions.length 
      : 0;
    
    // Calculate potential savings from inactive subscriptions
    const potentialSavings = calculateMonthlyTotal(inactiveSubscriptions);
    
    // Simulate monthly change (in real app, this would be calculated from historical data)
    const monthlyChange = 5.2;
    const yearlyChange = 12.8;
    
    return {
      monthlyTotal,
      yearlyTotal,
      averageSubscriptionCost,
      potentialSavings,
      monthlyChange,
      yearlyChange,
      activeCount: activeSubscriptions.length,
      inactiveCount: inactiveSubscriptions.length,
    };
  }, [subscriptions]);

  const summaryCards = [
    {
      title: 'Monthly Spending',
      value: `$${stats.monthlyTotal.toFixed(2)}`,
      change: `${stats.monthlyChange > 0 ? '+' : ''}${stats.monthlyChange.toFixed(1)}%`,
      changeType: stats.monthlyChange > 0 ? 'increase' : 'decrease',
      icon: DollarSign,
      iconColor: 'bg-blue-500',
      description: 'Total monthly recurring expenses',
    },
    {
      title: 'Yearly Projection',
      value: `$${stats.yearlyTotal.toFixed(2)}`,
      change: `${stats.yearlyChange > 0 ? '+' : ''}${stats.yearlyChange.toFixed(1)}%`,
      changeType: stats.yearlyChange > 0 ? 'increase' : 'decrease',
      icon: Target,
      iconColor: 'bg-indigo-500',
      description: 'Projected annual subscription costs',
    },
    {
      title: 'Average per Subscription',
      value: `$${stats.averageSubscriptionCost.toFixed(2)}`,
      change: `${stats.activeCount} active`,
      changeType: 'neutral',
      icon: TrendingUp,
      iconColor: 'bg-emerald-500',
      description: 'Average cost per active subscription',
    },
    {
      title: 'Potential Savings',
      value: `$${stats.potentialSavings.toFixed(2)}`,
      change: `${stats.inactiveCount} inactive`,
      changeType: 'savings',
      icon: PiggyBank,
      iconColor: 'bg-amber-500',
      description: 'Savings from cancelled subscriptions',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {card.value}
                </p>
                <div className="flex items-center space-x-1">
                  {card.changeType === 'increase' && (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  )}
                  {card.changeType === 'decrease' && (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  )}
                  {card.changeType === 'savings' && (
                    <PiggyBank className="w-4 h-4 text-green-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      card.changeType === 'increase'
                        ? 'text-red-600 dark:text-red-400'
                        : card.changeType === 'decrease'
                        ? 'text-green-600 dark:text-green-400'
                        : card.changeType === 'savings'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {card.change}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {card.description}
                </p>
              </div>
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${card.iconColor}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {stats.potentialSavings > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                <PiggyBank className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                Great Job on Saving Money!
              </h3>
              <p className="text-emerald-700 dark:text-emerald-300 mb-3">
                You're saving <strong>${stats.potentialSavings.toFixed(2)}/month</strong> by cancelling {stats.inactiveCount} subscription{stats.inactiveCount !== 1 ? 's' : ''}. 
                That's <strong>${(stats.potentialSavings * 12).toFixed(2)}</strong> per year!
              </p>
              <div className="text-sm text-emerald-600 dark:text-emerald-400">
                Keep reviewing your subscriptions regularly to maximize your savings.
              </div>
            </div>
          </div>
        </div>
      )}

      {stats.monthlyTotal > 200 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                High Monthly Spending
              </h3>
              <p className="text-amber-700 dark:text-amber-300 mb-3">
                Your monthly subscription spending is <strong>${stats.monthlyTotal.toFixed(2)}</strong>. 
                Consider reviewing your subscriptions to see if you can reduce costs.
              </p>
              <div className="text-sm text-amber-600 dark:text-amber-400">
                Tip: Cancel unused subscriptions or switch to annual plans for discounts.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
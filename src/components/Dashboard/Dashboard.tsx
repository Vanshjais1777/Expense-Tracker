import React, { useMemo } from 'react';
import { DollarSign, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { ExpenseChart } from './ExpenseChart';
import { UpcomingPayments } from './UpcomingPayments';
import { CategoryBreakdown } from './CategoryBreakdown';
import { useSubscriptions } from '../../contexts/SubscriptionContext';
import { calculateMonthlyTotal, calculateYearlyTotal } from '../../utils/subscriptionUtils';
import { getDaysUntilPayment, isPaymentUpcoming } from '../../utils/dateUtils';

export const Dashboard: React.FC = () => {
  const { subscriptions } = useSubscriptions();

  const stats = useMemo(() => {
    const activeSubscriptions = subscriptions.filter(sub => sub.isActive);
    const monthlyTotal = calculateMonthlyTotal(activeSubscriptions);
    const yearlyTotal = calculateYearlyTotal(activeSubscriptions);
    const upcomingPayments = activeSubscriptions.filter(sub => 
      isPaymentUpcoming(sub.nextPaymentDate, 7)
    ).length;
    const totalSubscriptions = activeSubscriptions.length;

    return {
      monthlyTotal,
      yearlyTotal,
      upcomingPayments,
      totalSubscriptions,
    };
  }, [subscriptions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Monthly Total"
          value={`$${stats.monthlyTotal.toFixed(2)}`}
          change="+2.5% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-emerald-500"
        />
        <StatsCard
          title="Yearly Total"
          value={`$${stats.yearlyTotal.toFixed(2)}`}
          change="+5.2% from last year"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-blue-500"
        />
        <StatsCard
          title="Active Subscriptions"
          value={stats.totalSubscriptions.toString()}
          change="3 new this month"
          changeType="neutral"
          icon={Calendar}
          iconColor="bg-indigo-500"
        />
        <StatsCard
          title="Upcoming Payments"
          value={stats.upcomingPayments.toString()}
          change="Next 7 days"
          changeType="negative"
          icon={AlertCircle}
          iconColor="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart />
        <CategoryBreakdown />
      </div>

      <UpcomingPayments />
    </div>
  );
};
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSubscriptions } from '../../contexts/SubscriptionContext';
import { getMonthlyAmount } from '../../utils/subscriptionUtils';

export const ExpenseChart: React.FC = () => {
  const { subscriptions } = useSubscriptions();

  const chartData = useMemo(() => {
    // Generate data for the last 6 months
    const months = [];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      
      // Calculate total for this month (simplified - in real app, you'd track historical data)
      const total = subscriptions
        .filter(sub => sub.isActive)
        .reduce((sum, sub) => sum + getMonthlyAmount(sub), 0);
      
      months.push({
        month: monthName,
        amount: total + (Math.random() - 0.5) * 100, // Add some variation
      });
    }
    
    return months;
  }, [subscriptions]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Expense Trends
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis 
              className="text-gray-600 dark:text-gray-400"
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                color: '#374151',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
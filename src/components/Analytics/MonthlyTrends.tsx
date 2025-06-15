import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useSubscriptions } from '../../contexts/SubscriptionContext';
import { getMonthlyAmount } from '../../utils/subscriptionUtils';
import { Calendar, TrendingUp } from 'lucide-react';

export const MonthlyTrends: React.FC = () => {
  const { subscriptions } = useSubscriptions();

  const trendData = useMemo(() => {
    // Generate historical data for the last 12 months
    const months = [];
    const currentDate = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      const monthFull = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      // Calculate current total for active subscriptions
      const currentTotal = subscriptions
        .filter(sub => sub.isActive)
        .reduce((sum, sub) => sum + getMonthlyAmount(sub), 0);
      
      // Simulate historical variation (in real app, you'd have actual historical data)
      const variation = (Math.random() - 0.5) * 50;
      const growthFactor = (12 - i) * 0.02; // Simulate 2% monthly growth
      const historicalTotal = Math.max(0, currentTotal * (0.8 + growthFactor) + variation);
      
      months.push({
        month: monthName,
        monthFull: monthFull,
        total: historicalTotal,
        subscriptions: Math.floor(subscriptions.filter(sub => sub.isActive).length * (0.8 + growthFactor * 0.5)),
      });
    }
    
    return months;
  }, [subscriptions]);

  const categoryTrends = useMemo(() => {
    const categories = ['Entertainment', 'Productivity', 'Health & Fitness', 'Software', 'Cloud Storage'];
    
    return categories.map(category => {
      const categoryTotal = subscriptions
        .filter(sub => sub.isActive && sub.category === category)
        .reduce((sum, sub) => sum + getMonthlyAmount(sub), 0);
      
      return {
        category,
        total: categoryTotal,
        count: subscriptions.filter(sub => sub.isActive && sub.category === category).length,
      };
    }).filter(item => item.total > 0);
  }, [subscriptions]);

  const averageSpending = trendData.reduce((sum, month) => sum + month.total, 0) / trendData.length;
  const currentSpending = trendData[trendData.length - 1]?.total || 0;
  const trendDirection = currentSpending > averageSpending ? 'up' : 'down';
  const trendPercentage = Math.abs(((currentSpending - averageSpending) / averageSpending) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Spending Trend
            </h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className={`w-5 h-5 ${
                trendDirection === 'up' ? 'text-red-500' : 'text-green-500'
              }`} />
              <span className={`text-sm font-medium ${
                trendDirection === 'up' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
              }`}>
                {trendDirection === 'up' ? '+' : '-'}{trendPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                  formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, 'Monthly Total']}
                  labelFormatter={(label: string) => {
                    const monthData = trendData.find(d => d.month === label);
                    return monthData?.monthFull || label;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSpending)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Average monthly spending: <span className="font-medium">${averageSpending.toFixed(2)}</span>
          </div>
        </div>

        {/* Category Spending */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Category Spending
            </h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryTrends} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  type="number"
                  className="text-gray-600 dark:text-gray-400"
                  tickFormatter={(value) => `$${value.toFixed(0)}`}
                />
                <YAxis 
                  type="category"
                  dataKey="category"
                  className="text-gray-600 dark:text-gray-400"
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    color: '#374151',
                  }}
                  formatter={(value: number, name: string, props: any) => [
                    `$${value.toFixed(2)}/month`,
                    `${props.payload.count} subscription${props.payload.count !== 1 ? 's' : ''}`
                  ]}
                />
                <Bar
                  dataKey="total"
                  fill="#10b981"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Total categories: <span className="font-medium">{categoryTrends.length}</span>
          </div>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          📊 Spending Insights
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              ${currentSpending.toFixed(0)}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Current Month</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              ${averageSpending.toFixed(0)}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">12-Month Average</div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              trendDirection === 'up' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
            }`}>
              {trendDirection === 'up' ? '+' : '-'}${Math.abs(currentSpending - averageSpending).toFixed(0)}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">vs Average</div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-blue-700 dark:text-blue-300">
          {trendDirection === 'up' 
            ? `Your spending is ${trendPercentage.toFixed(1)}% above your 12-month average. Consider reviewing recent additions.`
            : `Great! Your spending is ${trendPercentage.toFixed(1)}% below your 12-month average.`
          }
        </div>
      </div>
    </div>
  );
};
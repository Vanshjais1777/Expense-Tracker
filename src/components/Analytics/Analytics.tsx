import React from 'react';
import { ExpenseChart } from '../Dashboard/ExpenseChart';
import { CategoryBreakdown } from '../Dashboard/CategoryBreakdown';
import { MonthlyTrends } from './MonthlyTrends';
import { ExpenseSummary } from './ExpenseSummary';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics & Insights
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed analysis of your subscription spending patterns
        </p>
      </div>

      <ExpenseSummary />
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ExpenseChart />
        <CategoryBreakdown />
      </div>
      
      <MonthlyTrends />
    </div>
  );
};
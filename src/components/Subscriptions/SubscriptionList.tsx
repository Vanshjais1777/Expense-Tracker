import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Edit, Trash2, Power, PowerOff } from 'lucide-react';
import { useSubscriptions } from '../../contexts/SubscriptionContext';
import { formatDate, getDaysUntilPayment, isPaymentOverdue } from '../../utils/dateUtils';
import { exportToCSV } from '../../utils/subscriptionUtils';

interface SubscriptionListProps {
  onEditSubscription: (id: string) => void;
}

export const SubscriptionList: React.FC<SubscriptionListProps> = ({ onEditSubscription }) => {
  const { subscriptions, deleteSubscription, updateSubscription } = useSubscriptions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(subscriptions.map(sub => sub.category))];
    return uniqueCategories.sort();
  }, [subscriptions]);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter(sub => {
      const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           sub.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || sub.category === selectedCategory;
      const matchesFrequency = !selectedFrequency || sub.billingFrequency === selectedFrequency;
      const matchesStatus = showInactive || sub.isActive;
      
      return matchesSearch && matchesCategory && matchesFrequency && matchesStatus;
    });
  }, [subscriptions, searchQuery, selectedCategory, selectedFrequency, showInactive]);

  const handleToggleActive = (id: string, isActive: boolean) => {
    updateSubscription(id, { isActive: !isActive });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteSubscription(id);
    }
  };

  const handleExport = () => {
    exportToCSV(filteredSubscriptions);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
          >
            <option value="">All Frequencies</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Show inactive subscriptions</span>
        </label>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredSubscriptions.length} subscription{filteredSubscriptions.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSubscriptions.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No subscriptions found matching your criteria</p>
          </div>
        ) : (
          filteredSubscriptions.map((subscription) => {
            const daysUntil = getDaysUntilPayment(subscription.nextPaymentDate);
            const isOverdue = isPaymentOverdue(subscription.nextPaymentDate);
            
            return (
              <div
                key={subscription.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border transition-all hover:shadow-xl ${
                  subscription.isActive
                    ? 'border-gray-200 dark:border-gray-700'
                    : 'border-gray-300 dark:border-gray-600 opacity-60'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {subscription.name}
                        </h3>
                        {!subscription.isActive && (
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                            Inactive
                          </span>
                        )}
                      </div>
                      
                      {subscription.description && (
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {subscription.description}
                        </p>
                      )}
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Amount</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            ${subscription.amount.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Frequency</p>
                          <p className="font-medium text-gray-900 dark:text-white capitalize">
                            {subscription.billingFrequency}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Category</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {subscription.category}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Next Payment</p>
                          <p className={`font-medium ${
                            !subscription.isActive
                              ? 'text-gray-500 dark:text-gray-400'
                              : isOverdue
                              ? 'text-red-600 dark:text-red-400'
                              : daysUntil <= 3
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {formatDate(subscription.nextPaymentDate, 'MMM dd')}
                            {subscription.isActive && (
                              <span className="block text-xs">
                                {isOverdue
                                  ? `${Math.abs(daysUntil)} days overdue`
                                  : daysUntil === 0
                                  ? 'Due today'
                                  : `${daysUntil} days`
                                }
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleToggleActive(subscription.id, subscription.isActive)}
                        className={`p-2 rounded-lg transition-colors ${
                          subscription.isActive
                            ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                            : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                        title={subscription.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {subscription.isActive ? (
                          <Power className="w-5 h-5" />
                        ) : (
                          <PowerOff className="w-5 h-5" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => onEditSubscription(subscription.id)}
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(subscription.id, subscription.name)}
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
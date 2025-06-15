import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, DollarSign, Tag, Type, FileText } from 'lucide-react';
import { useSubscriptions } from '../../contexts/SubscriptionContext';
import { Subscription } from '../../types';

interface SubscriptionFormProps {
  subscriptionId?: string;
  onClose: () => void;
}

const categories = [
  'Entertainment',
  'Productivity',
  'Health & Fitness',
  'News & Media',
  'Cloud Storage',
  'Software',
  'Music & Audio',
  'Education',
  'Gaming',
  'Communication',
  'Finance',
  'Other'
];

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ subscriptionId, onClose }) => {
  const { addSubscription, updateSubscription, getSubscriptionById } = useSubscriptions();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    currency: 'USD',
    billingFrequency: 'monthly' as const,
    nextPaymentDate: '',
    category: '',
    description: '',
    isActive: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!subscriptionId;

  useEffect(() => {
    if (isEditing) {
      const subscription = getSubscriptionById(subscriptionId);
      if (subscription) {
        setFormData({
          name: subscription.name,
          amount: subscription.amount.toString(),
          currency: subscription.currency,
          billingFrequency: subscription.billingFrequency,
          nextPaymentDate: subscription.nextPaymentDate.split('T')[0],
          category: subscription.category,
          description: subscription.description || '',
          isActive: subscription.isActive,
        });
      }
    } else {
      // Set default next payment date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormData(prev => ({
        ...prev,
        nextPaymentDate: tomorrow.toISOString().split('T')[0]
      }));
    }
  }, [subscriptionId, isEditing, getSubscriptionById]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Subscription name is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.nextPaymentDate) {
      newErrors.nextPaymentDate = 'Next payment date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const subscriptionData = {
        name: formData.name.trim(),
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        billingFrequency: formData.billingFrequency,
        nextPaymentDate: new Date(formData.nextPaymentDate).toISOString(),
        category: formData.category,
        description: formData.description.trim(),
        isActive: formData.isActive,
      };

      if (isEditing) {
        updateSubscription(subscriptionId, subscriptionData);
      } else {
        addSubscription(subscriptionData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isEditing ? 'Edit Subscription' : 'Add New Subscription'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Type className="w-4 h-4 mr-2" />
              Subscription Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors ${
                errors.name ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="e.g., Netflix, Spotify"
            />
            {errors.name && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="w-4 h-4 mr-2" />
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors ${
                  errors.amount ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="0.00"
              />
              {errors.amount && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.amount}</p>}
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="billingFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Billing Frequency
            </label>
            <select
              id="billingFrequency"
              name="billingFrequency"
              value={formData.billingFrequency}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label htmlFor="nextPaymentDate" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Next Payment Date
            </label>
            <input
              id="nextPaymentDate"
              name="nextPaymentDate"
              type="date"
              value={formData.nextPaymentDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors ${
                errors.nextPaymentDate ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.nextPaymentDate && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.nextPaymentDate}</p>}
          </div>

          <div>
            <label htmlFor="category" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Tag className="w-4 h-4 mr-2" />
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors ${
                errors.category ? 'border-red-300 dark:border-red-600' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="w-4 h-4 mr-2" />
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Add any additional notes about this subscription"
            />
          </div>

          <div className="flex items-center">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900 dark:text-white">
              Active subscription
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update' : 'Add'} Subscription
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
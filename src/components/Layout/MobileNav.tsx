import React from 'react';
import { Home, CreditCard, BarChart3, Settings, Plus } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddSubscription: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange, onAddSubscription }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'add', label: '', icon: Plus, isAdd: true },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabClick = (tab: any) => {
    if (tab.isAdd) {
      onAddSubscription();
    } else {
      onTabChange(tab.id);
    }
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-around items-center px-4 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 ${
                tab.isAdd
                  ? 'bg-indigo-600 rounded-full w-12 h-12 mx-2'
                  : isActive
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon className={`w-6 h-6 ${tab.isAdd ? 'text-white' : ''}`} />
              {!tab.isAdd && (
                <span className="text-xs mt-1 truncate">{tab.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
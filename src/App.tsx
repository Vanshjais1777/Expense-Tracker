import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthPage } from './components/Auth/AuthPage';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { MobileNav } from './components/Layout/MobileNav';
import { Dashboard } from './components/Dashboard/Dashboard';
import { SubscriptionList } from './components/Subscriptions/SubscriptionList';
import { SubscriptionForm } from './components/Subscriptions/SubscriptionForm';
import { Analytics } from './components/Analytics/Analytics';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [editingSubscriptionId, setEditingSubscriptionId] = useState<string | undefined>();

  const handleAddSubscription = () => {
    setEditingSubscriptionId(undefined);
    setShowSubscriptionForm(true);
  };

  const handleEditSubscription = (id: string) => {
    setEditingSubscriptionId(id);
    setShowSubscriptionForm(true);
  };

  const handleCloseSubscriptionForm = () => {
    setShowSubscriptionForm(false);
    setEditingSubscriptionId(undefined);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'subscriptions':
        return <SubscriptionList onEditSubscription={handleEditSubscription} />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header />
        
        <div className="flex">
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onAddSubscription={handleAddSubscription}
          />
          
          <main className="flex-1 lg:ml-64 pt-16 pb-20 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {renderContent()}
            </div>
          </main>
        </div>

        <MobileNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddSubscription={handleAddSubscription}
        />

        {showSubscriptionForm && (
          <SubscriptionForm
            subscriptionId={editingSubscriptionId}
            onClose={handleCloseSubscriptionForm}
          />
        )}
      </div>
    </SubscriptionProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
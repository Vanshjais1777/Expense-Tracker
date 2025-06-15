import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const userData = localStorage.getItem('subscription-tracker-user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('subscription-tracker-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('subscription-tracker-users') || '[]');
      const existingUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (existingUser) {
        const userWithoutPassword = { ...existingUser };
        delete userWithoutPassword.password;
        setUser(userWithoutPassword);
        localStorage.setItem('subscription-tracker-user', JSON.stringify(userWithoutPassword));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing users
      const users = JSON.parse(localStorage.getItem('subscription-tracker-users') || '[]');
      
      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        return false;
      }
      
      // Create new user
      const newUser = {
        id: crypto.randomUUID(),
        email,
        password, // In production, this should be hashed
        name,
        createdAt: new Date().toISOString(),
      };
      
      users.push(newUser);
      localStorage.setItem('subscription-tracker-users', JSON.stringify(users));
      
      // Auto-login after registration
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('subscription-tracker-user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('subscription-tracker-user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
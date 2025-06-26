import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  trialEndsAt?: Date;
  premiumEndsAt?: Date;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  showPremiumExpiredModal: boolean;
  setShowPremiumExpiredModal: (show: boolean) => void;
  handlePremiumRenewal: () => void;
  hasAccessToPremium: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPremiumExpiredModal, setShowPremiumExpiredModal] = useState(false);

  // Função helper para verificar acesso premium - LÓGICA ATUALIZADA
  const hasAccessToPremium = useCallback((): boolean => {
    if (!user) return false;
    
    // Premium ativo: isPremium=true AND (premiumEndsAt=null OR premiumEndsAt no futuro)
    if (user.isPremium && (!user.premiumEndsAt || user.premiumEndsAt > new Date())) return true;
    
    // Trial ativo: isPremium=false AND trialEndsAt no futuro
    if (!user.isPremium && user.trialEndsAt && user.trialEndsAt > new Date()) return true;
    
    return false;
  }, [user]);

  useEffect(() => {
    // Check for existing session on app load
    const initializeAuth = async () => {
      try {
        const response = await apiClient.getMe();
        
        if (response.data?.user) {
          const userData = response.data.user;
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            isPremium: userData.isPremium,
            trialEndsAt: userData.trialEndsAt ? new Date(userData.trialEndsAt) : undefined,
            premiumEndsAt: userData.premiumEndsAt ? new Date(userData.premiumEndsAt) : undefined,
            role: userData.role
          });
        }
      } catch (error) {
        // Silently handle - no session active
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient.login(email, password);
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data?.user) {
        const userData = response.data.user;
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          isPremium: userData.isPremium,
          trialEndsAt: userData.trialEndsAt ? new Date(userData.trialEndsAt) : undefined,
          premiumEndsAt: userData.premiumEndsAt ? new Date(userData.premiumEndsAt) : undefined,
          role: userData.role
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient.register(email, password, name);
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data?.user) {
        const userData = response.data.user;
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          isPremium: userData.isPremium,
          trialEndsAt: userData.trialEndsAt ? new Date(userData.trialEndsAt) : undefined,
          premiumEndsAt: userData.premiumEndsAt ? new Date(userData.premiumEndsAt) : undefined
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
  };

  const handlePremiumRenewal = () => {
    // Importar e usar a função de checkout
    import('../config/checkout').then(({ openCheckout }) => {
      openCheckout();
    });
    
    // Fechar o modal
    setShowPremiumExpiredModal(false);
  };

  // Verificar expiração do trial e premium periodicamente - CORRIGIDO RACE CONDITION
  useEffect(() => {
    if (!user || (!user.trialEndsAt && !user.premiumEndsAt)) return;

    const checkExpiration = () => {
      let expired = false;
      const updates: Partial<User> = {};

      // Verificar trial expirado
      if (user.trialEndsAt && user.trialEndsAt < new Date()) {
        expired = true;
        updates.trialEndsAt = undefined;
      }

      // Verificar premium expirado
      if (user.premiumEndsAt && user.premiumEndsAt < new Date()) {
        expired = true;
        updates.isPremium = false;
        updates.premiumEndsAt = undefined;
      }

      if (expired && !showPremiumExpiredModal) {
        setShowPremiumExpiredModal(true);
        setUser(prevUser => prevUser ? { ...prevUser, ...updates } : null);
      }
    };

    // Verificar imediatamente
    checkExpiration();

    // Verificar a cada minuto
    const interval = setInterval(checkExpiration, 60000);

    // CORREÇÃO: Sempre limpar o interval
    return () => clearInterval(interval);
  }, [user, showPremiumExpiredModal]); // Todas as dependências incluídas

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      showPremiumExpiredModal,
      setShowPremiumExpiredModal,
      handlePremiumRenewal,
      hasAccessToPremium
    }}>
      {children}
    </AuthContext.Provider>
  );
};

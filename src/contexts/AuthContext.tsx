
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  authenticateUser, 
  getCurrentSession, 
  logout as logoutUser, 
  startTrial as startUserTrial,
  cleanupExpiredSessions,
  createInitialUsers,
  registerUser,
  checkTrialExpiration
} from '../lib/userManager';
import { loadInitialBackup } from '../lib/backupManager';
import type { UserSession } from '../lib/userManager';

interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  trialEndsAt?: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  startTrial: () => void;
  isLoading: boolean;
  showPremiumExpiredModal: boolean;
  setShowPremiumExpiredModal: (show: boolean) => void;
  handlePremiumRenewal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const convertSessionToUser = (session: UserSession): User => ({
  id: session.id,
  email: session.email,
  name: session.name,
  isPremium: session.isPremium,
  trialEndsAt: session.trialEndsAt
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPremiumExpiredModal, setShowPremiumExpiredModal] = useState(false);

  useEffect(() => {
    // Initialize users and check for existing session on app load
    const initializeAuth = async () => {
      try {
        // Carregar backup inicial se necessário
        loadInitialBackup();
        
        // Create initial users if they don't exist
        await createInitialUsers();
        
        // Clean up expired sessions
        cleanupExpiredSessions();
        
        // Check for existing valid session
        const session = getCurrentSession();
        if (session) {
          setUser(convertSessionToUser(session));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up periodic session cleanup
    const cleanupInterval = setInterval(cleanupExpiredSessions, 5 * 60 * 1000); // Every 5 minutes

    // Escutar mudanças no localStorage entre abas
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'luzdecristo_users' && e.newValue) {
        console.log('🔄 Detectada mudança nos usuários, sincronizando...');
        // Forçar re-render dos componentes que dependem dos usuários
        window.dispatchEvent(new CustomEvent('usersUpdated'));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(cleanupInterval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const session = await authenticateUser(email, password);
      setUser(convertSessionToUser(session));
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Re-throw to be handled by the component
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const user = await registerUser(email, password, name);
      
      // Após criar a conta, fazer login automaticamente
      const session = await authenticateUser(email, password);
      setUser(convertSessionToUser(session));
    } catch (error) {
      console.error('Error during registration:', error);
      throw error; // Re-throw to be handled by the component
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const startTrial = () => {
    if (user) {
      startUserTrial(user.id);
      
      // Update user state immediately
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 7);
      
      setUser({
        ...user,
        isPremium: true,
        trialEndsAt: trialEnd
      });
    }
  };

  const handlePremiumRenewal = () => {
    // Importar e usar a função de checkout
    import('../config/checkout').then(({ openCheckout }) => {
      openCheckout();
    });
    
    // Fechar o modal
    setShowPremiumExpiredModal(false);
  };

  // Verificar expiração do trial periodicamente
  useEffect(() => {
    if (!user) return;

    const checkExpiration = () => {
      const { expired } = checkTrialExpiration();
      if (expired && !showPremiumExpiredModal) {
        setShowPremiumExpiredModal(true);
      }
    };

    // Verificar imediatamente
    checkExpiration();

    // Verificar a cada minuto
    const interval = setInterval(checkExpiration, 60000);

    return () => clearInterval(interval);
  }, [user, showPremiumExpiredModal]);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      startTrial,
      isLoading,
      showPremiumExpiredModal,
      setShowPremiumExpiredModal,
      handlePremiumRenewal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

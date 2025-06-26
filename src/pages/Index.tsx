import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import AuthModal from '../components/AuthModal';
import ProfileModal from '../components/ProfileModal';
import DailyQuote from '../components/DailyQuote';
import DailyPrayers from '../components/DailyPrayers';
import AllPrayers from '../components/AllPrayers';
import Segulots from '../components/Segulots';
import BiblicalStories from '../components/BiblicalStories';
import WeeklyWord from '../components/WeeklyWord';
import AdminPanel from '../components/AdminPanel';
import PremiumRequired from '../components/PremiumRequired';
import LandingPage from '../components/LandingPage';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { user, hasAccessToPremium } = useAuth();

  // Se não há usuário logado, mostra a landing page
  if (!user) {
    return <LandingPage />;
  }

  const handleHeaderClick = () => {
    if (user) {
      // Se o usuário está logado, abre o modal de perfil
      setIsProfileModalOpen(true);
    } else {
      // Se não está logado, abre o modal de login
      setIsAuthModalOpen(true);
    }
  };

  const renderContent = () => {
    // Se a página é premium e o usuário não tem acesso, mostra PremiumRequired
    const premiumPages = ['home', 'prayers', 'segulots', 'stories', 'weekly'];
    if (premiumPages.includes(currentPage) && !hasAccessToPremium()) {
      return <PremiumRequired />;
    }

    switch (currentPage) {
      case 'home':
        return <DailyQuote />;
      case 'prayers':
        return <AllPrayers />;
      case 'segulots':
        return <Segulots />;
      case 'stories':
        return <BiblicalStories />;
      case 'weekly':
        return <WeeklyWord />;
      default:
        return <DailyQuote />;
    }
  };

  return (
    <div className="min-h-screen app-background">
      <Header onAuthClick={handleHeaderClick} />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="fade-in-sacred">
          {renderContent()}
        </div>
      </main>

      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
      />

      {/* Modal de Login/Registro */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Modal de Perfil do Usuário */}
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;

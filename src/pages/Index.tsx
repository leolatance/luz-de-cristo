import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import AuthModal from '../components/AuthModal';
import DailyQuote from '../components/DailyQuote';
import DailyPrayers from '../components/DailyPrayers';
import AllPrayers from '../components/AllPrayers';
import Segulots from '../components/Segulots';
import BiblicalStories from '../components/BiblicalStories';
import LandingPage from '../components/LandingPage';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  // Se não há usuário logado, mostra a landing page
  if (!user) {
    return <LandingPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'daily':
        return <DailyQuote />;
      case 'prayers':
        return <DailyPrayers />;
      case 'all-prayers':
        return <AllPrayers />;
      case 'segulots':
        return <Segulots />;
      case 'stories':
        return <BiblicalStories />;
      default:
        return <DailyQuote />;
    }
  };

  return (
    <div className="min-h-screen christian-gradient">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />
      
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {renderContent()}
      </main>

      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        user={user}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
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

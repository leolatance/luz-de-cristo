import React from 'react';
import { Home, Heart, Crown, Book, Lock, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const { user, hasAccessToPremium } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home, premium: true },
    { id: 'prayers', label: 'Orações', icon: Heart, premium: true },
    { id: 'segulots', label: 'Unções', icon: Crown, premium: true },
    { id: 'stories', label: 'Histórias', icon: Book, premium: true },
    { id: 'weekly', label: 'Palavra', icon: Calendar, premium: true },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex sacred-header sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isLocked = item.premium && !hasAccessToPremium();
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 py-4 px-3 border-b-2 transition-all duration-200 relative ${
                    isActive
                      ? 'border-luz-petrol text-luz-petrol bg-luz-celestial/10'
                      : isLocked
                      ? 'border-transparent text-luz-brown/40 cursor-not-allowed'
                      : 'border-transparent text-luz-brown hover:text-luz-petrol hover:border-luz-golden hover:bg-luz-beige/50'
                  }`}
                  disabled={isLocked}
                >
                  <div className={`p-1 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-luz-petrol text-luz-white sacred-glow' 
                      : 'bg-transparent'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <span className={`font-medium transition-all duration-200 ${
                    isActive ? 'font-semibold' : ''
                  }`}>
                    {item.label}
                  </span>
                  {isLocked && <Lock size={14} className="ml-1 opacity-60" />}
                  
                  {/* Indicador ativo - bolinha dourada */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-luz-golden rounded-full sacred-glow"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-luz-white border-t border-luz-golden/20 shadow-lg z-50">
        <div className="flex justify-around">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isLocked = item.premium && !hasAccessToPremium();
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center py-3 px-2 min-w-0 flex-1 transition-all duration-200 relative ${
                  isActive
                    ? 'text-luz-petrol'
                    : isLocked
                    ? 'text-luz-brown/40 cursor-not-allowed'
                    : 'text-luz-brown hover:text-luz-petrol'
                }`}
                disabled={isLocked}
              >
                <div className={`relative p-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-luz-celestial/20 border border-luz-celestial/40' 
                    : 'bg-transparent'
                }`}>
                  <Icon size={20} />
                  {isLocked && (
                    <Lock size={12} className="absolute -top-1 -right-1 text-luz-brown/40" />
                  )}
                  
                  {/* Indicador ativo - ponto dourado */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-luz-golden rounded-full sacred-glow"></div>
                  )}
                </div>
                
                <span className={`text-xs mt-1 truncate w-full text-center transition-all duration-200 ${
                  isActive ? 'font-semibold text-luz-petrol' : ''
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;

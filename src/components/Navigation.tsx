
import React from 'react';
import { Book, Heart, Clock, Cross, Lightbulb } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: { isPremium: boolean } | null;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, user }) => {
  const navItems = [
    { id: 'daily', label: 'Frase do Dia', icon: Lightbulb },
    { id: 'prayers', label: 'Orações do Dia', icon: Clock },
    { id: 'all-prayers', label: 'Todas as Orações', icon: Heart },
    { id: 'segulots', label: 'Unções', icon: Cross, premium: true },
    { id: 'stories', label: 'Histórias Bíblicas', icon: Book },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-t border-golden-200/30 fixed bottom-0 left-0 right-0 z-50 md:relative md:border-t-0 md:border-b md:bg-transparent">
      <div className="flex justify-around md:justify-center md:space-x-8 py-2 md:py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isLocked = item.premium && !user?.isPremium;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-golden-600 bg-golden-50' 
                  : isLocked 
                    ? 'text-gray-400' 
                    : 'text-gray-600 hover:text-golden-600 hover:bg-golden-50/50'
              }`}
              disabled={isLocked}
            >
              <div className="relative">
                <Icon size={20} className="md:w-6 md:h-6" />
                {isLocked && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-golden-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <span className="text-xs md:text-sm mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;

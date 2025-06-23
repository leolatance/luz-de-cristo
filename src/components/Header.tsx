
import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-golden-200/30 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg sm:text-xl">✨</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate">Luz de Cristo</h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">Inspiração Diária</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-800 truncate max-w-[120px]">{user.name}</p>
                  {user.isPremium && (
                    <p className="text-xs text-golden-600">
                      {user.trialEndsAt ? 'Premium Trial' : 'Premium'}
                    </p>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  title="Sair"
                >
                  <LogOut size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-golden-500 to-golden-600 text-white px-3 py-2 sm:px-4 rounded-lg hover:from-golden-600 hover:to-golden-700 transition-all duration-200"
              >
                <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">Entrar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

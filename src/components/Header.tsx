import React from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            {/* Logo do App - usando scale para aumentar logo 250x60px */}
            <div className="w-12 h-12 sm:w-14 h-14 flex items-center justify-center relative overflow-visible">
              <img 
                src="/logo.png" 
                alt="Luz de Cristo Logo" 
                className="object-contain z-10 transform scale-[1.7] sm:scale-[2.1] translate-x-2"
                style={{ width: '250px', height: '60px' }}
                onError={(e) => {
                  // Fallback: se a imagem não carregar, mostra círculo com letra "L"
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-logo')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-logo w-16 h-16 bg-gradient-to-br from-luz-golden to-luz-celestial rounded-full flex items-center justify-center z-10 transform translate-x-2';
                    fallback.innerHTML = '<span class="text-white font-bold text-xl">L</span>';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Olá, {user.name}
                </span>
                
                {/* Premium ativo: isPremium=true */}
                {user.isPremium && (
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    Premium
                    {user.premiumEndsAt && (
                      <span className="ml-1">
                        ({Math.ceil((new Date(user.premiumEndsAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias)
                      </span>
                    )}
                  </Badge>
                )}
                
                {/* Trial ativo: isPremium=false AND trialEndsAt no futuro */}
                {!user.isPremium && user.trialEndsAt && new Date(user.trialEndsAt) > new Date() && (
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Trial ({Math.ceil((new Date(user.trialEndsAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dias)
                  </Badge>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAuthClick}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Perfil
                </Button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-luz-golden to-luz-celestial text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                <User size={18} />
                <span className="hidden sm:inline">Entrar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

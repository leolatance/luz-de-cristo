import React from 'react';
import { X, LogOut, Crown, Calendar, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, logout, hasAccessToPremium } = useAuth();

  if (!isOpen || !user) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <UserIcon size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Meu Perfil</h2>
                <p className="text-blue-100 text-sm">Informações da sua conta</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nome
              </label>
              <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                {user.name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                {user.email}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status da Conta
              </label>
              <div className="space-y-2">
                {/* Premium ativo */}
                {user.isPremium && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-emerald-600" />
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                        Premium Ativo
                      </Badge>
                    </div>
                    <p className="text-emerald-700 text-sm mt-1">
                      {user.premiumEndsAt 
                        ? `Seu premium termina em ${getDaysRemaining(user.premiumEndsAt)} dias (${formatDate(user.premiumEndsAt)})`
                        : 'Você tem acesso completo a todos os recursos premium.'
                      }
                    </p>
                  </div>
                )}

                {/* Trial ativo */}
                {!user.isPremium && user.trialEndsAt && new Date(user.trialEndsAt) > new Date() && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Trial Ativo
                      </Badge>
                    </div>
                    <p className="text-blue-700 text-sm mt-1">
                      Seu trial termina em {getDaysRemaining(user.trialEndsAt)} dias 
                      ({formatDate(user.trialEndsAt)})
                    </p>
                  </div>
                )}

                {/* Gratuito */}
                {!hasAccessToPremium() && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                      📱 Conta Gratuita
                    </Badge>
                    <p className="text-gray-600 text-sm mt-1">
                      Faça upgrade para acessar recursos premium.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              <LogOut size={18} />
              <span>Sair da Conta</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal; 
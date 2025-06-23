import React from 'react';
import { Crown, X, Calendar, Star } from 'lucide-react';

interface PremiumExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRenew: () => void;
  userName: string;
}

const PremiumExpiredModal: React.FC<PremiumExpiredModalProps> = ({
  isOpen,
  onClose,
  onRenew,
  userName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-golden-100 p-3 rounded-full">
                <Crown className="text-golden-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Seu Premium Expirou
                </h2>
                <p className="text-sm text-gray-600">
                  Olá, {userName}!
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Mensagem Principal */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-golden-50 to-heavenly-50 p-4 rounded-xl mb-4">
                <Calendar className="text-golden-600 mx-auto mb-2" size={32} />
                <p className="text-gray-700 font-medium">
                  Seu período de teste premium de 7 dias chegou ao fim.
                </p>
              </div>
              
              <p className="text-gray-600 text-sm">
                Continue aproveitando todos os recursos exclusivos do App Luz de Cristo!
              </p>
            </div>

            {/* Benefícios Premium */}
            <div className="bg-heavenly-50 p-4 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <Star className="text-golden-500 mr-2" size={16} />
                Com Premium você tem:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-golden-500 rounded-full mr-3"></span>
                  Acesso completo às Unções
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-golden-500 rounded-full mr-3"></span>
                  Histórias bíblicas exclusivas
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-golden-500 rounded-full mr-3"></span>
                  Orações especiais e personalizadas
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-golden-500 rounded-full mr-3"></span>
                  Conteúdo atualizado semanalmente
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-golden-500 rounded-full mr-3"></span>
                  Suporte prioritário
                </li>
              </ul>
            </div>

            {/* Status Atual */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-blue-800 text-sm">
                <strong>Status atual:</strong> Conta gratuita ativa
              </p>
              <p className="text-blue-700 text-xs mt-1">
                Você ainda pode usar todas as funcionalidades básicas do app.
              </p>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-3">
              <button
                onClick={onRenew}
                className="w-full bg-gradient-to-r from-golden-500 to-golden-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-golden-600 hover:to-golden-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Crown className="inline mr-2" size={20} />
                Renovar Premium Agora
              </button>
              
              <button
                onClick={onClose}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Continuar com Versão Gratuita
              </button>
            </div>

            {/* Nota */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Você pode ativar o premium a qualquer momento nas configurações
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumExpiredModal; 
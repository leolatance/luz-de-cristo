import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, AlertCircle, User, Heart, Sparkles, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, register, isLoading } = useAuth();

  // Sincronizar com initialMode quando modal abrir
  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Login realizado com sucesso!');
      } else {
        await register(email, password, name);
        toast.success('🎉 Conta criada! Agora você pode ver todas as orações!');
      }
      onClose();
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Erro ao ${isLogin ? 'fazer login' : 'criar conta'}`;
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleClose = () => {
    setError('');
    setEmail('');
    setPassword('');
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header para Registro */}
        {!isLogin && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-t-2xl relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <div className="animate-pulse mb-3">
                <Sparkles size={48} className="mx-auto text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Última Etapa!
              </h2>
              <p className="text-green-100 text-lg">
                Crie sua conta GRÁTIS para ver a oração completa
              </p>
            </div>
          </div>
        )}

        {/* Header para Login */}
        {isLogin && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-2xl relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                Bem-vinda de volta!
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Entre para acessar suas orações
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Benefícios no topo para registro */}
          {!isLogin && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="font-bold text-slate-800 mb-2 text-center">
                ✨ O que você vai receber AGORA:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                  <span>A oração completa para Abrir Caminhos</span>
                </div>
                <div className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                  <span>+100 orações poderosas organizadas</span>
                </div>
                <div className="flex items-center">
                  <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                  <span>Perfil personalizado com seu nome</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-base font-semibold text-slate-700 mb-2">
                  Seu Nome
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 text-lg border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400 transition-colors"
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-base font-semibold text-slate-700 mb-2">
                Seu Email
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 text-lg border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400 transition-colors"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-semibold text-slate-700 mb-2">
                {isLogin ? 'Sua Senha' : 'Crie uma Senha'}
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-4 text-lg border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400 transition-colors"
                  placeholder="Mínimo 6 caracteres"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 rounded-lg font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105"
              >
                {isLoading 
                  ? 'Criando sua conta...' 
                  : '🔓 LIBERAR ORAÇÃO COMPLETA'}
              </button>
            )}

            {isLogin && (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            )}
          </form>

          {/* Garantias para registro */}
          {!isLogin && (
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-slate-600">
                <Heart className="inline text-red-500 mr-1" size={16} />
                Mais de 47.000 mulheres já se cadastraram
              </p>
              <p className="text-xs text-slate-500">
                 100% Seguro •  Sem cartão de crédito •  Cancele quando quiser
              </p>
            </div>
          )}

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center border-t pt-6">
            <p className="text-slate-600 text-base mb-2">
              {isLogin ? 'Primeira vez aqui?' : 'Já tem uma conta?'}
            </p>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 font-semibold text-base transition-colors"
            >
              {isLogin 
                ? 'Criar conta grátis' 
                : 'Fazer login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

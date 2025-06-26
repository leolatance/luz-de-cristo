import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, AlertCircle, User } from 'lucide-react';
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
        toast.success('Conta criada e login realizado com sucesso!');
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
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isLogin ? 'Bem-vindo de volta!' : 'Criar sua conta'}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {isLogin ? 'Entre para continuar sua jornada espiritual' : 'Comece sua jornada espiritual hoje'}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400 transition-colors"
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    required={!isLogin}
                    minLength={2}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400 transition-colors"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Senha {!isLogin && <span className="text-slate-500 font-normal">(mínimo 6 caracteres)</span>}
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400 transition-colors"
                  placeholder="Sua senha"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading 
                ? (isLogin ? 'Entrando...' : 'Criando conta...') 
                : (isLogin ? 'Entrar Agora' : 'Criar Conta Grátis')}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm mb-2">
              {isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
            </p>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
            >
              {isLogin 
                ? 'Criar nova conta gratuita' 
                : 'Fazer login'}
            </button>
          </div>

          {/* Info Box */}
          {!isLogin && (
            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-800 space-y-1">
                <p className="font-semibold mb-2">🎁 O que você ganha:</p>
                <p>• <strong>7 dias grátis</strong> de acesso premium</p>
                <p>• <strong>Acesso completo</strong> a todos os recursos</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

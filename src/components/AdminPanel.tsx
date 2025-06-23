import React, { useState, useEffect } from 'react';
import { User, Plus, Trash2, Eye, EyeOff, Shield, Users, Edit, Crown } from 'lucide-react';
import { createUser, listUsers, deleteUser, updatePassword, updateUser, activatePremium } from '../lib/userManager';
import { toast } from 'sonner';

interface UserData {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  trialEndsAt?: Date;
  createdAt: Date;
  lastLoginAt?: Date;
  loginAttempts: number;
  lockedUntil?: Date;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    isPremium: false
  });

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    email: '',
    name: '',
    isPremium: false,
    password: ''
  });

  const loadUsers = () => {
    const userList = listUsers();
    setUsers(userList);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createUser(
        formData.email,
        formData.password,
        formData.name,
        formData.isPremium,
        true // isAdminCreated = true
      );
      
      toast.success('Usuário criado com sucesso!');
      setFormData({ email: '', password: '', name: '', isPremium: false });
      setShowCreateForm(false);
      loadUsers();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao criar usuário');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (window.confirm(`Tem certeza que deseja deletar o usuário ${userEmail}?`)) {
      try {
        deleteUser(userId);
        toast.success('Usuário deletado com sucesso!');
        loadUsers();
      } catch (error) {
        toast.error('Erro ao deletar usuário');
      }
    }
  };

  const handleResetPassword = async (userId: string, userEmail: string) => {
    const newPassword = prompt(`Digite a nova senha para ${userEmail}:`);
    if (newPassword && newPassword.length >= 6) {
      try {
        await updatePassword(userId, newPassword);
        toast.success('Senha atualizada com sucesso!');
      } catch (error) {
        toast.error('Erro ao atualizar senha');
      }
    } else if (newPassword) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
    }
  };

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setEditFormData({
      email: user.email,
      name: user.name,
      isPremium: user.isPremium,
      password: ''
    });
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setIsLoading(true);
    try {
      const updates: Partial<UserData> & { password?: string } = {
        name: editFormData.name,
        email: editFormData.email,
        isPremium: editFormData.isPremium
      };

      if (editFormData.password) {
        updates.password = editFormData.password;
      }

      await updateUser(editingUser.id, updates);
      toast.success('Usuário atualizado com sucesso!');
      setEditingUser(null);
      setEditFormData({ email: '', name: '', isPremium: false, password: '' });
      loadUsers();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar usuário');
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivatePremium = (userId: string, userName: string) => {
    if (window.confirm(`Ativar premium permanente para ${userName}?`)) {
      try {
        activatePremium(userId);
        toast.success('Premium ativado com sucesso!');
        loadUsers();
      } catch (error) {
        toast.error('Erro ao ativar premium');
      }
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Painel Administrativo
        </h1>
        <p className="text-gray-600">Gerenciar usuários do sistema</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
        <div className="bg-white/80 backdrop-blur-sm border border-golden-200/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Usuários</p>
              <p className="text-2xl font-bold text-gray-800">{users.length}</p>
            </div>
            <Users className="text-golden-500" size={32} />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-golden-200/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Usuários Premium</p>
              <p className="text-2xl font-bold text-gray-800">
                {users.filter(u => u.isPremium).length}
              </p>
            </div>
            <Shield className="text-golden-500" size={32} />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-golden-200/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Contas Bloqueadas</p>
              <p className="text-2xl font-bold text-gray-800">
                {users.filter(u => u.lockedUntil && new Date() < new Date(u.lockedUntil)).length}
              </p>
            </div>
            <User className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Botão Criar Usuário */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center space-x-2 bg-gradient-to-r from-golden-500 to-golden-600 text-white px-6 py-3 rounded-lg hover:from-golden-600 hover:to-golden-700 transition-all duration-200"
        >
          <Plus size={20} />
          <span>Criar Usuário</span>
        </button>
      </div>

      {/* Formulário de Criação */}
      {showCreateForm && (
        <div className="prayer-card mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Criar Novo Usuário</h3>
          
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-500"
                placeholder="usuario@exemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-500"
                placeholder="Nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-500 pr-12"
                  placeholder="Mínimo 6 caracteres"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPremium"
                checked={formData.isPremium}
                onChange={(e) => setFormData({...formData, isPremium: e.target.checked})}
                className="h-4 w-4 text-golden-600 focus:ring-golden-500 border-gray-300 rounded"
              />
              <label htmlFor="isPremium" className="text-sm text-gray-700">
                Usuário Premium
              </label>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-golden-500 to-golden-600 text-white py-3 rounded-lg font-medium hover:from-golden-600 hover:to-golden-700 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Criando...' : 'Criar Usuário'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Formulário de Edição */}
      {editingUser && (
        <div className="prayer-card mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Editar Usuário</h3>
          
          <form onSubmit={handleUpdateUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={editFormData.email}
                onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-500"
                placeholder="usuario@exemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <input
                type="text"
                required
                value={editFormData.name}
                onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-500"
                placeholder="Nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nova Senha (opcional)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-500 pr-12"
                  placeholder="Deixe vazio para manter a senha atual"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="editIsPremium"
                checked={editFormData.isPremium}
                onChange={(e) => setEditFormData({...editFormData, isPremium: e.target.checked})}
                className="h-4 w-4 text-golden-600 focus:ring-golden-500 border-gray-300 rounded"
              />
              <label htmlFor="editIsPremium" className="text-sm text-gray-700">
                Usuário Premium
              </label>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingUser(null);
                  setEditFormData({ email: '', name: '', isPremium: false, password: '' });
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Usuários */}
      <div className="prayer-card">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Usuários Cadastrados</h3>
        
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-sm min-w-[640px] sm:min-w-0">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700">Usuário</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 hidden sm:table-cell">Status</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 hidden md:table-cell">Criado</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 hidden lg:table-cell">Último Login</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 sm:px-4">
                    <div>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">{user.name}</p>
                      <p className="text-gray-600 text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">{user.email}</p>
                      {/* Status visível apenas em mobile */}
                      <div className="sm:hidden mt-1 space-y-1">
                        {user.isPremium && (
                          <span className="inline-block bg-golden-100 text-golden-700 px-2 py-1 rounded-full text-xs mr-1">
                            Premium
                          </span>
                        )}
                        {user.lockedUntil && new Date() < new Date(user.lockedUntil) && (
                          <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                            Bloqueado
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-4 hidden sm:table-cell">
                    <div className="space-y-1">
                      {user.isPremium && (
                        <span className="inline-block bg-golden-100 text-golden-700 px-2 py-1 rounded-full text-xs">
                          Premium
                        </span>
                      )}
                      {user.trialEndsAt && (
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                          Trial até {formatDate(user.trialEndsAt).split(' ')[0]}
                        </span>
                      )}
                      {user.lockedUntil && new Date() < new Date(user.lockedUntil) && (
                        <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                          Bloqueado
                        </span>
                      )}
                      {user.loginAttempts > 0 && (
                        <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                          {user.loginAttempts} tentativas
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm hidden md:table-cell">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm hidden lg:table-cell">
                    {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Nunca'}
                  </td>
                  <td className="py-3 px-2 sm:px-4">
                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-green-600 hover:text-green-800 flex items-center justify-center"
                        title="Editar usuário"
                      >
                        <Edit size={14} />
                      </button>
                      {!user.isPremium && (
                        <button
                          onClick={() => handleActivatePremium(user.id, user.name)}
                          className="text-golden-600 hover:text-golden-800 flex items-center justify-center"
                          title="Ativar Premium"
                        >
                          <Crown size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => handleResetPassword(user.id, user.email)}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                        title="Redefinir senha"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id, user.email)}
                        className="text-red-600 hover:text-red-800 flex items-center justify-center"
                        title="Deletar usuário"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>Nenhum usuário cadastrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 
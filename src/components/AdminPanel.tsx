import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Crown, 
  Eye, 
  EyeOff,
  Calendar,
  Clock,
  UserCheck,
  UserX,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { apiClient } from '../lib/api';
import { toast } from 'sonner';

interface UserData {
  _id: string;
  email: string;
  name: string;
  isPremium: boolean;
  trialEndsAt?: string;
  createdAt: string;
  lastLoginAt?: string;
  role: string;
}

interface Stats {
  totalUsers: number;
  premiumUsers: number;
  trialUsers: number;
  freeUsers: number;
  todayRegistrations: number;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    isPremium: false,
    role: 'user'
  });

  const [editFormData, setEditFormData] = useState({
    email: '',
    name: '',
    password: '',
    isPremium: false,
    role: 'user'
  });

  useEffect(() => {
    loadUsers();
    loadStats();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await apiClient.getUsers();
      if (response.data?.users) {
        setUsers(response.data.users);
      } else if (response.data && Array.isArray(response.data)) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const loadStats = async () => {
    try {
      const response = await apiClient.getStats();
      if (response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await apiClient.createUser(formData);
      if (response.error) {
        alert(response.error);
      } else {
        setFormData({ email: '', name: '', password: '', isPremium: false, role: 'user' });
        setShowCreateForm(false);
        loadUsers();
        loadStats();
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (!confirm(`Tem certeza que deseja excluir o usuário ${userEmail}?`)) {
      return;
    }

    try {
      const response = await apiClient.deleteUser(userId);
      if (response.error) {
        alert(response.error);
      } else {
        loadUsers();
        loadStats();
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário');
    }
  };

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setEditFormData({
      email: user.email,
      name: user.name,
      password: '',
      isPremium: user.isPremium,
      role: user.role
    });
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setIsLoading(true);
    try {
      const updateData = { ...editFormData };
      if (!updateData.password) {
        delete updateData.password;
      }

      const response = await apiClient.updateUser(editingUser._id, updateData);
      if (response.error) {
        alert(response.error);
      } else {
        setEditingUser(null);
        loadUsers();
        loadStats();
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário');
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivatePremium = async (userId: string, userName: string) => {
    if (!confirm(`Deseja ativar o premium para ${userName}? O usuário terá acesso premium por 30 dias.`)) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiClient.activatePremium(userId);
      if (response.error) {
        alert(response.error);
      } else {
        toast.success(`Premium ativado para ${userName}!`);
        loadUsers();
        loadStats();
      }
    } catch (error) {
      toast.error('Erro ao ativar premium');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMakeFree = async (userId: string, userName: string) => {
    if (!confirm(`Deseja tornar ${userName} um usuário gratuito? Isso removerá o acesso premium e trial.`)) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiClient.makeFree(userId);
      if (response.error) {
        alert(response.error);
      } else {
        toast.success(`${userName} agora é um usuário gratuito!`);
        loadUsers();
        loadStats();
      }
    } catch (error) {
      toast.error('Erro ao tornar usuário gratuito');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (user: UserData) => {
    // Premium ativo: isPremium=true
    if (user.isPremium) {
      return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Premium</Badge>;
    }
    
    // Trial ativo: isPremium=false AND trialEndsAt no futuro
    if (!user.isPremium && user.trialEndsAt && new Date(user.trialEndsAt) > new Date()) {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Trial</Badge>;
    }
    
    return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">Gratuito</Badge>;
  };

  const getRoleBadge = (role: string) => {
    if (role === 'admin') {
      return <Badge className="bg-slate-100 text-slate-800 border-slate-200">Admin</Badge>;
    }
    return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">Usuário</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="h-8 w-8 text-slate-600" />
            <h1 className="text-3xl font-bold text-slate-800">Painel Administrativo</h1>
          </div>
          <p className="text-slate-600">
            Gerencie usuários e monitore o sistema da plataforma Luz de Cristo
          </p>
        </div>

        {/* Estatísticas */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total de Usuários</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-slate-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Premium</p>
                    <p className="text-2xl font-bold text-emerald-600">{stats.premiumUsers}</p>
                  </div>
                  <Crown className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Em Trial</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.trialUsers}</p>
                  </div>
                  <Shield className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Gratuitos</p>
                    <p className="text-2xl font-bold text-slate-600">{stats.freeUsers}</p>
                  </div>
                  <User className="h-8 w-8 text-slate-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Hoje</p>
                    <p className="text-2xl font-bold text-green-600">{stats.todayRegistrations}</p>
                  </div>
                  <Plus className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Ações */}
        <div className="flex justify-start">
          <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                <Plus className="w-4 h-4 mr-2" />
                Criar Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Novo Usuário</DialogTitle>
                <DialogDescription>
                  Preencha os dados para criar um novo usuário no sistema.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPremium"
                    checked={formData.isPremium}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPremium: !!checked })}
                  />
                  <Label htmlFor="isPremium" className="text-sm">Usuário Premium</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Tipo de Usuário</Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
                    {isLoading ? 'Criando...' : 'Criar Usuário'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lista de Usuários */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b bg-slate-50">
            <CardTitle className="text-slate-800">Usuários do Sistema</CardTitle>
            <CardDescription className="text-slate-600">
              Gerencie todos os usuários cadastrados na plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-slate-700">Usuário</th>
                    <th className="text-left p-4 font-medium text-slate-700">Status</th>
                    <th className="text-left p-4 font-medium text-slate-700">Tipo</th>
                    <th className="text-left p-4 font-medium text-slate-700">Criado em</th>
                    <th className="text-left p-4 font-medium text-slate-700">Último Login</th>
                    <th className="text-left p-4 font-medium text-slate-700">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-slate-900">{user.name}</div>
                          <div className="text-sm text-slate-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          {getStatusBadge(user)}
                        </div>
                      </td>
                      <td className="p-4">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4" />
                          {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Nunca'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditUser(user)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {!user.isPremium && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleActivatePremium(user._id, user.name)}
                              className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:border-emerald-300"
                              title="Ativar Premium"
                            >
                              <Crown className="w-4 h-4" />
                            </Button>
                          )}
                          {(user.isPremium || user.trialEndsAt) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMakeFree(user._id, user.name)}
                              className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 border-orange-200 hover:border-orange-300"
                              title="Tornar Gratuito"
                            >
                              <UserX className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteUser(user._id, user.email)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Modal de Edição */}
        <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Usuário</DialogTitle>
              <DialogDescription>
                Modifique os dados do usuário selecionado.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome</Label>
                <Input
                  id="edit-name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-password">Nova Senha (opcional)</Label>
                <Input
                  id="edit-password"
                  type="password"
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                  placeholder="Deixe em branco para manter a atual"
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-isPremium"
                  checked={editFormData.isPremium}
                  onCheckedChange={(checked) => setEditFormData({ ...editFormData, isPremium: !!checked })}
                />
                <Label htmlFor="edit-isPremium" className="text-sm">Usuário Premium</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Tipo de Usuário</Label>
                <select
                  id="edit-role"
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setEditingUser(null)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Footer Info */}
        <Alert className="border-slate-200 bg-slate-50">
          <Shield className="h-4 w-4 text-slate-600" />
          <AlertDescription className="text-slate-700">
            <strong>Sistema Seguro:</strong> Arquitetura backend/frontend separada com MongoDB protegido e autenticação JWT.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default AdminPanel; 
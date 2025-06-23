import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  isPremium: boolean;
  trialEndsAt?: Date;
  createdAt: Date;
  lastLoginAt?: Date;
  loginAttempts: number;
  lockedUntil?: Date;
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  trialEndsAt?: Date;
  sessionToken: string;
  expiresAt: Date;
}

const STORAGE_KEY = 'luzdecristo_users';
const SESSION_KEY = 'luzdecristo_session';
const SALT_ROUNDS = 12;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutos
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 horas

// Função para gerar token de sessão
const generateSessionToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Função para obter todos os usuários
const getUsers = (): User[] => {
  try {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    return [];
  }
};

// Função para salvar usuários
const saveUsers = (users: User[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    
    // Disparar evento para sincronizar entre abas
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('usersUpdated'));
    }
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
  }
};

// Função para criar um novo usuário (admin ou auto-registro)
export const createUser = async (
  email: string, 
  password: string, 
  name: string, 
  isPremium: boolean = false,
  isAdminCreated: boolean = false
): Promise<User> => {
  const users = getUsers();
  
  // Verificar se o email já existe
  if (users.find(user => user.email === email)) {
    throw new Error('Email já está em uso');
  }

  // Validações para auto-registro
  if (!isAdminCreated) {
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }

    // Validar senha
    if (password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres');
    }

    // Validar nome
    if (name.trim().length < 2) {
      throw new Error('Nome deve ter pelo menos 2 caracteres');
    }

    // Limitar número de usuários (opcional - anti-spam)
    if (users.length > 100) {
      throw new Error('Limite de usuários atingido. Entre em contato com o administrador.');
    }

    // Auto-registro sempre cria usuário gratuito
    isPremium = false;
  }

  // Hash da senha
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser: User = {
    id: crypto.randomUUID(),
    email: email.toLowerCase().trim(),
    name: name.trim(),
    passwordHash,
    isPremium,
    createdAt: new Date(),
    loginAttempts: 0,
  };

  users.push(newUser);
  saveUsers(users);
  
  return newUser;
};

// Função específica para registro de usuário (auto-registro)
export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  const user = await createUser(email, password, name, false, false);
  
  // Automaticamente iniciar trial de 7 dias para novos usuários
  startTrial(user.id);
  
  return user;
};

// Função para autenticar usuário
export const authenticateUser = async (email: string, password: string): Promise<UserSession> => {
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new Error('Credenciais inválidas');
  }

  // Verificar se a conta está bloqueada
  if (user.lockedUntil && new Date() < new Date(user.lockedUntil)) {
    const remainingTime = Math.ceil((new Date(user.lockedUntil).getTime() - Date.now()) / 60000);
    throw new Error(`Conta bloqueada. Tente novamente em ${remainingTime} minutos.`);
  }

  // Verificar senha
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  
  if (!isPasswordValid) {
    // Incrementar tentativas de login
    user.loginAttempts = (user.loginAttempts || 0) + 1;
    
    if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      user.lockedUntil = new Date(Date.now() + LOCK_TIME);
      saveUsers(users);
      throw new Error('Muitas tentativas de login. Conta bloqueada por 15 minutos.');
    }
    
    saveUsers(users);
    throw new Error('Credenciais inválidas');
  }

  // Login bem-sucedido - limpar tentativas e atualizar último login
  user.loginAttempts = 0;
  user.lockedUntil = undefined;
  user.lastLoginAt = new Date();
  
  // Verificar se o trial expirou
  if (user.trialEndsAt && new Date() > new Date(user.trialEndsAt)) {
    user.isPremium = false;
    user.trialEndsAt = undefined;
  }
  
  saveUsers(users);

  // Criar sessão
  const sessionToken = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  
  const session: UserSession = {
    id: user.id,
    email: user.email,
    name: user.name,
    isPremium: user.isPremium,
    trialEndsAt: user.trialEndsAt,
    sessionToken,
    expiresAt,
  };

  // Salvar sessão
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return session;
};

// Função para obter sessão atual
export const getCurrentSession = (): UserSession | null => {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) return null;

    const session: UserSession = JSON.parse(sessionData);
    
    // Verificar se a sessão expirou
    if (new Date() > new Date(session.expiresAt)) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Erro ao carregar sessão:', error);
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

// Função para logout
export const logout = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

// Função para iniciar trial
export const startTrial = (userId: string): void => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) return;

  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 7);
  
  user.isPremium = true;
  user.trialEndsAt = trialEnd;
  
  saveUsers(users);

  // Atualizar sessão atual
  const session = getCurrentSession();
  if (session && session.id === userId) {
    session.isPremium = true;
    session.trialEndsAt = trialEnd;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
};

// Função para listar usuários (para administração)
export const listUsers = (): Omit<User, 'passwordHash'>[] => {
  const users = getUsers();
  return users.map(({ passwordHash, ...user }) => user);
};

// Função para deletar usuário
export const deleteUser = (userId: string): boolean => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  
  if (index === -1) return false;
  
  users.splice(index, 1);
  saveUsers(users);
  
  // Se for o usuário atual, fazer logout
  const session = getCurrentSession();
  if (session && session.id === userId) {
    logout();
  }
  
  return true;
};

// Função para atualizar senha
export const updatePassword = async (userId: string, newPassword: string): Promise<boolean> => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) return false;

  user.passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  saveUsers(users);
  
  return true;
};

// Função para editar usuário
export const updateUser = async (
  userId: string,
  updates: {
    name?: string;
    email?: string;
    isPremium?: boolean;
    password?: string;
  }
): Promise<boolean> => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) return false;

  // Verificar se o email já existe (se está sendo alterado)
  if (updates.email && updates.email !== user.email) {
    const emailExists = users.find(u => u.email === updates.email && u.id !== userId);
    if (emailExists) {
      throw new Error('Email já está em uso por outro usuário');
    }
    user.email = updates.email.toLowerCase().trim();
  }

  // Atualizar campos
  if (updates.name) {
    user.name = updates.name.trim();
  }

  if (updates.isPremium !== undefined) {
    user.isPremium = updates.isPremium;
    
    // Se está removendo premium, limpar trial
    if (!updates.isPremium) {
      user.trialEndsAt = undefined;
    }
  }

  // Atualizar senha se fornecida
  if (updates.password) {
    user.passwordHash = await bcrypt.hash(updates.password, SALT_ROUNDS);
  }

  saveUsers(users);
  
  // Atualizar sessão atual se for o usuário logado
  const session = getCurrentSession();
  if (session && session.id === userId) {
    session.name = user.name;
    session.email = user.email;
    session.isPremium = user.isPremium;
    session.trialEndsAt = user.trialEndsAt;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  
  return true;
};

// Função para ativar premium manualmente (sem trial)
export const activatePremium = (userId: string): boolean => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) return false;

  user.isPremium = true;
  user.trialEndsAt = undefined; // Remove trial, torna premium permanente
  
  saveUsers(users);

  // Atualizar sessão atual se for o usuário logado
  const session = getCurrentSession();
  if (session && session.id === userId) {
    session.isPremium = true;
    session.trialEndsAt = undefined;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  
  return true;
};

// Função para verificar se o trial expirou
export const checkTrialExpiration = (): { expired: boolean; user: UserSession | null } => {
  const session = getCurrentSession();
  
  if (!session) {
    return { expired: false, user: null };
  }

  // Se tem trial e expirou
  if (session.trialEndsAt && new Date() > new Date(session.trialEndsAt)) {
    // Atualizar status do usuário
    const users = getUsers();
    const user = users.find(u => u.id === session.id);
    
    if (user && user.isPremium && user.trialEndsAt) {
      user.isPremium = false;
      user.trialEndsAt = undefined;
      saveUsers(users);
      
      // Atualizar sessão
      session.isPremium = false;
      session.trialEndsAt = undefined;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    
    return { expired: true, user: session };
  }

  return { expired: false, user: session };
};

// Função para limpar sessões expiradas (executar periodicamente)
export const cleanupExpiredSessions = (): void => {
  const session = getCurrentSession();
  if (!session) {
    localStorage.removeItem(SESSION_KEY);
  }
};

// Função utilitária para criar usuários iniciais (executar uma vez)
export const createInitialUsers = async (): Promise<void> => {
  try {
    // Criar usuário admin padrão (criação admin)
    await createUser('admin@luzdecristo.com', 'Admin123!', 'Administrador', true, true);
    
    // Criar usuário de teste (criação admin)
    await createUser('teste@luzdecristo.com', 'Teste123!', 'Usuário Teste', false, true);
    
    console.log('Usuários iniciais criados com sucesso!');
  } catch (error) {
    console.log('Usuários já existem ou erro ao criar:', error);
  }
}; 
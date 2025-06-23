import { createInitialUsers, createUser, listUsers } from './userManager';

// Função para inicializar o sistema com usuários de teste
export const initializeSystem = async () => {
  try {
    console.log('🚀 Inicializando sistema Luz de Cristo...');
    
    // Criar usuários iniciais
    await createInitialUsers();
    
    // Listar usuários criados
    const users = listUsers();
    console.log('✅ Sistema inicializado com sucesso!');
    console.log('👥 Usuários disponíveis:', users.length);
    
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ${user.isPremium ? 'Premium' : 'Free'}`);
    });
    
    console.log('\n🔐 Credenciais de acesso:');
    console.log('Admin: admin@luzdecristo.com / Admin123!');
    console.log('Teste: teste@luzdecristo.com / Teste123!');
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao inicializar sistema:', error);
    return false;
  }
};

// Função para criar usuário personalizado via console
export const createTestUser = async (
  email: string,
  password: string,
  name: string,
  isPremium: boolean = false
) => {
  try {
    const user = await createUser(email, password, name, isPremium, true); // isAdminCreated = true
    console.log('✅ Usuário criado com sucesso:', {
      id: user.id,
      email: user.email,
      name: user.name,
      isPremium: user.isPremium,
      createdAt: user.createdAt
    });
    return user;
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
    throw error;
  }
};

// Função para listar todos os usuários (sem senhas)
export const showAllUsers = () => {
  const users = listUsers();
  console.log('👥 Usuários no sistema:', users.length);
  console.table(users);
  return users;
};

// Função para limpar todos os dados (usar com cuidado!)
export const resetSystem = () => {
  if (confirm('⚠️  ATENÇÃO: Isso vai deletar TODOS os dados do sistema! Continuar?')) {
    localStorage.removeItem('luzdecristo_users');
    localStorage.removeItem('luzdecristo_session');
    console.log('🗑️  Sistema resetado com sucesso!');
    return true;
  }
  return false;
};

// Disponibilizar funções globalmente para uso no console
declare global {
  interface Window {
    LuzDeCristo: {
      init: () => Promise<boolean>;
      createUser: (email: string, password: string, name: string, isPremium?: boolean) => Promise<any>;
      showUsers: () => any[];
      reset: () => boolean;
    };
  }
}

// Configurar objeto global para acesso via console
if (typeof window !== 'undefined') {
  window.LuzDeCristo = {
    init: initializeSystem,
    createUser: createTestUser,
    showUsers: showAllUsers,
    reset: resetSystem
  };
}

export default {
  initialize: initializeSystem,
  createUser: createTestUser,
  showUsers: showAllUsers,
  reset: resetSystem
}; 
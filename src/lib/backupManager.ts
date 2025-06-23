// Sistema de Backup Automático para Usuários
// Salva dados em arquivo JSON que persiste entre deploys

import usersBackup from '../data/users-backup.json';

const STORAGE_KEY = 'luzdecristo_users';
const BACKUP_KEY = 'luzdecristo_backup_timestamp';

// Carregar backup inicial na primeira execução
export const loadInitialBackup = () => {
  try {
    const existingUsers = localStorage.getItem(STORAGE_KEY);
    const lastBackupLoad = localStorage.getItem(BACKUP_KEY);
    
    // Se não há usuários no localStorage, mas há no backup
    if (!existingUsers && usersBackup.users && usersBackup.users.length > 0) {
      console.log('📥 Restaurando usuários do backup...');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usersBackup.users));
      localStorage.setItem(BACKUP_KEY, new Date().toISOString());
      console.log(`✅ ${usersBackup.users.length} usuários restaurados do backup`);
      return true;
    }
    
    // Se há usuários no localStorage mas o backup está vazio, criar backup
    if (existingUsers && (!usersBackup.users || usersBackup.users.length === 0)) {
      console.log('💾 Detectados usuários locais, criando backup...');
      createBackupDownload();
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('❌ Erro ao carregar backup inicial:', error);
    return false;
  }
};

// Criar backup para download (para commitar manualmente)
export const createBackupDownload = () => {
  try {
    const users = localStorage.getItem(STORAGE_KEY);
    if (!users) {
      console.log('ℹ️ Nenhum usuário para fazer backup');
      return null;
    }

    const backupData = {
      users: JSON.parse(users),
      lastBackup: new Date().toISOString(),
      version: "1.0"
    };

    // Criar blob para download
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('💾 Backup criado e baixado!');
    console.log('📝 Substitua o arquivo src/data/users-backup.json pelo arquivo baixado');
    console.log('🔄 Faça commit para persistir os dados');
    
    return backupData;
  } catch (error) {
    console.error('❌ Erro ao criar backup:', error);
    return null;
  }
};

// Restaurar de um arquivo JSON (para upload manual)
export const restoreFromFile = (fileContent: string) => {
  try {
    const backupData = JSON.parse(fileContent);
    
    if (!backupData.users || !Array.isArray(backupData.users)) {
      throw new Error('Formato de backup inválido');
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(backupData.users));
    localStorage.setItem(BACKUP_KEY, new Date().toISOString());
    
    console.log(`✅ ${backupData.users.length} usuários restaurados do arquivo`);
    return true;
  } catch (error) {
    console.error('❌ Erro ao restaurar backup:', error);
    return false;
  }
};

// Backup automático (chama periodicamente)
export const autoBackup = () => {
  try {
    const users = localStorage.getItem(STORAGE_KEY);
    if (!users) return false;

    const lastBackup = localStorage.getItem(BACKUP_KEY);
    const now = new Date().getTime();
    const lastBackupTime = lastBackup ? new Date(lastBackup).getTime() : 0;
    
    // Fazer backup a cada 1 hora de uso
    if (now - lastBackupTime > 60 * 60 * 1000) {
      console.log('⏰ Backup automático iniciado...');
      createBackupDownload();
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('❌ Erro no backup automático:', error);
    return false;
  }
};

// Funções para uso no console
declare global {
  interface Window {
    LuzDeCristoBackup: {
      download: () => void;
      restore: (fileContent: string) => boolean;
      auto: () => boolean;
      status: () => void;
    };
  }
}

if (typeof window !== 'undefined') {
  window.LuzDeCristoBackup = {
    download: createBackupDownload,
    restore: restoreFromFile,
    auto: autoBackup,
    status: () => {
      const users = localStorage.getItem(STORAGE_KEY);
      const backup = localStorage.getItem(BACKUP_KEY);
      console.log('📊 Status do Backup:');
      console.log(`- Usuários no localStorage: ${users ? JSON.parse(users).length : 0}`);
      console.log(`- Último backup: ${backup || 'Nunca'}`);
      console.log(`- Backup inicial: ${usersBackup.users.length} usuários`);
    }
  };
} 
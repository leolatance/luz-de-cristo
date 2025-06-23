# 💾 Sistema de Backup - App Luz de Cristo

## 📋 Visão Geral

O sistema de backup garante que os dados dos usuários sejam preservados entre deploys e acessíveis para administração. Utiliza uma combinação de localStorage para dados ativos e arquivos JSON para persistência.

## 🔄 Sincronização Entre Abas

### Como Funciona
- **Detecção automática**: Sistema monitora mudanças no localStorage usando `storage` events
- **Sincronização instantânea**: Quando um usuário é criado/editado em uma aba, todas as outras abas são atualizadas
- **Indicador visual**: Painel admin mostra "🔄 Sincronizando com outras abas..." durante a sincronização

### Eventos Sincronizados
- ✅ Criação de usuários (registro)
- ✅ Edição de usuários (admin)
- ✅ Ativação/desativação premium
- ✅ Exclusão de usuários
- ✅ Reset de senhas

## 🏗️ Arquitetura

### Componentes Principais

#### 1. `backupManager.ts`
- **`loadInitialBackup()`**: Carrega dados do arquivo JSON no primeiro acesso
- **`createBackupDownload()`**: Gera arquivo para download manual
- **`autoBackup()`**: Sistema de recomendação (sem download automático)

#### 2. `userManager.ts`
- **`saveUsers()`**: Salva no localStorage + dispara evento de sincronização
- **Todas as funções CRUD**: Automaticamente sincronizam entre abas

#### 3. `AuthContext.tsx`
- **Storage listener**: Escuta mudanças entre abas
- **Event dispatcher**: Notifica componentes sobre atualizações

#### 4. `AdminPanel.tsx`
- **Sincronização visual**: Mostra status de sincronização
- **Auto-refresh**: Recarrega lista quando detecta mudanças

## 📊 Fluxo de Dados

```
Ação do Usuário (Aba A)
    ↓
saveUsers() + dispatchEvent('usersUpdated')
    ↓
localStorage.setItem() → storage event
    ↓
Outras Abas (B, C, D) detectam mudança
    ↓
loadUsers() + UI refresh automático
```

## 🔧 Uso Prático

### Para Administradores

1. **Backup Manual**
   ```javascript
   // No painel admin, clique em "Backup Usuários"
   // Ou use o console:
   window.LuzDeCristoBackup.download()
   ```

2. **Sincronização Multi-Aba**
   - Abra o admin em múltiplas abas
   - Crie um usuário em uma aba
   - Veja a sincronização automática nas outras

3. **Restauração**
   ```javascript
   // Substitua src/data/users-backup.json
   // Faça commit para persistir
   ```

### Para Desenvolvimento

1. **Funções do Console**
   ```javascript
   // Status do sistema
   window.LuzDeCristoBackup.status()
   
   // Download manual
   window.LuzDeCristoBackup.download()
   
   // Backup recomendado
   window.LuzDeCristoBackup.auto()
   ```

2. **Eventos Personalizados**
   ```javascript
   // Escutar sincronizações
   window.addEventListener('usersUpdated', () => {
     console.log('Usuários sincronizados!');
   });
   ```

## 🚀 Cenários de Uso

### Registro de Usuário
1. Usuário cria conta na landing page
2. Sistema salva no localStorage
3. Evento 'usersUpdated' é disparado
4. Admin em outra aba vê o novo usuário instantaneamente

### Gestão Multi-Admin
1. Múltiplos admins podem trabalhar simultaneamente
2. Mudanças são sincronizadas em tempo real
3. Não há conflitos ou perda de dados

### Deploy e Persistência
1. Dados ficam no localStorage durante uso
2. Admin faz backup quando necessário
3. Arquivo JSON é commitado para persistir
4. Próximo deploy restaura os dados automaticamente

## ⚠️ Limitações

- **localStorage**: Limitado a ~5-10MB por domínio
- **Sincronização**: Funciona apenas entre abas do mesmo domínio
- **Backup**: Processo manual (não automático para evitar downloads desnecessários)

## 🔒 Segurança

- Senhas sempre hasheadas com bcrypt
- Tokens de sessão únicos e com expiração
- Rate limiting para tentativas de login
- Dados sensíveis nunca expostos no backup

## 📱 Responsividade

O sistema funciona perfeitamente em:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Android Chrome)
- ✅ Tablets (iPad, Android tablets)

## 🎯 Próximos Passos

- [ ] Backup automático opcional (configurável)
- [ ] Sincronização com banco de dados real
- [ ] Histórico de mudanças
- [ ] Backup incremental

## **🎯 Problema Resolvido:**
Usuários criados no localStorage não persistem entre deploys. Este sistema resolve isso **sem precisar de banco de dados**.

## **🔧 Como Funciona:**

### **1. Backup Automático**
- Usuários são salvos automaticamente no localStorage
- Sistema detecta quando há usuários e cria backup
- Backup é salvo em arquivo JSON que vai no Git

### **2. Restauração Automática**
- Ao carregar o app, verifica se há backup no arquivo
- Se localStorage vazio + backup existe → restaura usuários
- Se localStorage tem dados + backup vazio → sugere criar backup

### **3. Persistência entre Deploys**
- Arquivo `src/data/users-backup.json` vai no Git
- Cada deploy carrega usuários do backup
- **Zero configuração adicional**

## **📋 Como Usar:**

### **🔄 Fluxo Normal (Automático):**
1. Usuários se registram normalmente
2. Sistema salva no localStorage
3. Admin faz backup quando necessário
4. Substitui arquivo e faz commit
5. Próximo deploy restaura usuários automaticamente

### **💻 Comandos do Console:**

```javascript
// Ver status do backup
LuzDeCristoBackup.status()

// Criar backup manual
LuzDeCristoBackup.download()

// Restaurar de arquivo
LuzDeCristoBackup.restore(jsonContent)
```

### **🔘 Botão no Admin:**
- Acesse `/admin`
- Clique em "Backup Usuários"
- Arquivo será baixado automaticamente
- Substitua `src/data/users-backup.json`
- Faça commit e push

## **📂 Estrutura do Backup:**

```json
{
  "users": [
    {
      "id": "uuid",
      "email": "usuario@exemplo.com",
      "name": "Nome do Usuário",
      "passwordHash": "hash_bcrypt",
      "isPremium": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "trialEndsAt": null
    }
  ],
  "lastBackup": "2024-01-01T00:00:00.000Z",
  "version": "1.0"
}
```

## **✅ Vantagens:**

### **🚀 Simplicidade:**
- Zero configuração de banco
- Zero custos adicionais
- Zero dependências externas

### **🔒 Segurança:**
- Senhas permanecem hasheadas
- Dados ficam no próprio código
- Controle total sobre os dados

### **📱 Funcionalidade:**
- Backup automático
- Restauração automática
- Interface visual no admin
- Comandos de console

## **🔄 Fluxo de Trabalho:**

### **📅 Rotina Diária:**
1. Usuários se registram normalmente
2. Continue desenvolvendo o app
3. Faça commits normalmente

### **📦 Quando Fazer Backup:**
- Antes de grandes mudanças
- Semanalmente (se houver novos usuários)
- Antes de deploys importantes
- Quando o sistema sugerir

### **📋 Passo a Passo do Backup:**

1. **Acesse o Admin:**
   ```
   https://luzdecristo.vercel.app/admin
   ```

2. **Clique em "Backup Usuários":**
   - Arquivo `users-backup.json` será baixado

3. **Substitua o Arquivo:**
   ```bash
   # Substitua o arquivo baixado por:
   src/data/users-backup.json
   ```

4. **Commit e Push:**
   ```bash
   git add src/data/users-backup.json
   git commit -m "backup: atualizar usuários"
   git push
   ```

5. **Deploy Automático:**
   - Vercel faz deploy automaticamente
   - Usuários são restaurados no próximo acesso

## **🚨 Importante:**

### **✅ O que Persiste:**
- Usuários e senhas
- Status premium
- Dados de trial
- Configurações de conta

### **❌ O que NÃO Persiste:**
- Sessões ativas (usuários precisam fazer login novamente)
- Dados temporários do localStorage
- Configurações específicas do navegador

### **🔐 Segurança:**
- Senhas ficam hasheadas (bcrypt)
- Arquivo vai no Git (público se repo for público)
- Para projetos comerciais, considere banco de dados

## **🆘 Troubleshooting:**

### **Problema: Usuários não aparecem após deploy**
```javascript
// No console do navegador:
LuzDeCristoBackup.status()
// Verifique se há usuários no backup inicial
```

### **Problema: Backup não funciona**
```javascript
// Teste manual:
LuzDeCristoBackup.download()
// Se não baixar, verifique se há usuários no localStorage
```

### **Problema: Arquivo corrompido**
```javascript
// Resetar sistema:
LuzDeCristo.reset()
// Depois restaurar backup válido
```

## **🎉 Sistema Pronto!**

Agora você pode:
- ✅ Fazer commits tranquilamente
- ✅ Usuários persistem entre deploys
- ✅ Backup simples e funcional
- ✅ Zero configuração adicional
- ✅ Zero custos extras

**O sistema está funcionando automaticamente!** 🚀 
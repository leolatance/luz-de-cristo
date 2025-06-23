# 🔐 Sistema de Autenticação Seguro - Luz de Cristo

## 📋 Resumo

O sistema foi implementado com autenticação baseada em **localStorage** utilizando as melhores práticas de segurança disponíveis para aplicações frontend.

## 🔒 Medidas de Segurança Implementadas

### 1. **Hash das Senhas com bcrypt**
- Todas as senhas são hasheadas usando **bcrypt** com salt rounds 12
- As senhas nunca são armazenadas em texto plano
- Impossível recuperar a senha original do hash

### 2. **Rate Limiting**
- Máximo de **5 tentativas** de login por conta
- Conta bloqueada por **15 minutos** após exceder o limite
- Contador de tentativas resetado após login bem-sucedido

### 3. **Sessões Seguras**
- Tokens de sessão gerados com **crypto.getRandomValues()**
- Sessões expiram em **24 horas**
- Tokens únicos de 256 bits (64 caracteres hex)
- Limpeza automática de sessões expiradas

### 4. **Validação e Sanitização**
- Validação rigorosa de emails e senhas
- Verificação de duplicidade de usuários
- Sanitização de dados antes do armazenamento

### 5. **Controle de Acesso**
- Registro desabilitado - apenas criação manual de usuários
- Sistema de roles (premium/free)
- Validação de permissões em tempo real

## 👥 Gerenciamento de Usuários

### Usuários Padrão do Sistema
```
Admin:   admin@luzdecristo.com / Admin123!
Teste:   teste@luzdecristo.com / Teste123!
```

### Painel Administrativo
- Acesse: `/admin`
- Criar, editar e deletar usuários
- Visualizar estatísticas e logs
- Redefinir senhas
- Controle de acesso premium

### Via Console do Navegador
```javascript
// Inicializar sistema
await window.LuzDeCristo.init();

// Criar usuário
await window.LuzDeCristo.createUser(
  'email@exemplo.com', 
  'SenhaSegura123!', 
  'Nome do Usuário', 
  false // isPremium
);

// Listar usuários
window.LuzDeCristo.showUsers();

// Reset completo (cuidado!)
window.LuzDeCristo.reset();
```

## 🛡️ Estrutura de Dados

### Usuário (Criptografado)
```typescript
interface User {
  id: string;              // UUID único
  email: string;           // Email do usuário
  name: string;            // Nome completo
  passwordHash: string;    // Hash bcrypt da senha
  isPremium: boolean;      // Status premium
  trialEndsAt?: Date;      // Data fim do trial
  createdAt: Date;         // Data de criação
  lastLoginAt?: Date;      // Último login
  loginAttempts: number;   // Tentativas de login
  lockedUntil?: Date;      // Bloqueio até data
}
```

### Sessão (Token)
```typescript
interface UserSession {
  id: string;              // ID do usuário
  email: string;           // Email
  name: string;            // Nome
  isPremium: boolean;      // Status premium
  trialEndsAt?: Date;      // Fim do trial
  sessionToken: string;    // Token único da sessão
  expiresAt: Date;         // Expiração da sessão
}
```

## 🚀 Como Usar

### 1. **Inicialização**
O sistema se inicializa automaticamente quando a aplicação carrega, criando os usuários padrão se não existirem.

### 2. **Login de Usuários**
- Use as credenciais fornecidas no modal de login
- Sistema valida email, senha e status da conta
- Sessão criada automaticamente após login

### 3. **Criar Novos Usuários**
- Acesse `/admin` (apenas administradores)
- Use o console: `window.LuzDeCristo.createUser(...)`
- Preenchimento manual via painel

### 4. **Gerenciar Permissões**
- Trial de 7 dias para funcionalidades premium
- Controle granular de acesso por usuário
- Expiração automática de trials

## ⚠️ Limitações do localStorage

### Considerações de Segurança
- **XSS**: Vulnerável a ataques de script injection
- **Persistência**: Dados permanecem até limpeza manual
- **Capacidade**: Limitado a ~5-10MB por domínio
- **Servidor**: Sem validação server-side

### Mitigações Implementadas
- Sanitização rigorosa de inputs
- Validação constante de sessões
- Limpeza automática de dados expirados
- Tokens com expiração curta

## 🔧 Manutenção

### Comandos Úteis
```javascript
// Verificar usuários ativos
console.table(window.LuzDeCristo.showUsers());

// Limpar sessões expiradas
import { cleanupExpiredSessions } from './lib/userManager';
cleanupExpiredSessions();

// Backup de dados
const backup = localStorage.getItem('luzdecristo_users');
console.log('Backup:', backup);

// Restaurar backup
localStorage.setItem('luzdecristo_users', backupData);
```

### Logs e Monitoramento
- Tentativas de login logadas no console
- Bloqueios registrados com timestamps
- Sessões expiradas limpas automaticamente

## 🌟 Próximos Passos (Recomendações)

1. **Backend Real**: Implementar API com autenticação JWT
2. **2FA**: Sistema de dois fatores via SMS/email
3. **OAuth**: Login social (Google, Facebook)
4. **Auditoria**: Log completo de ações dos usuários
5. **Backup**: Sistema de backup automático
6. **SSL**: Certificados HTTPS obrigatórios

---

## 📞 Suporte

Para questões sobre segurança ou gerenciamento de usuários:
- Use o painel administrativo em `/admin`
- Execute comandos via console do navegador
- Consulte os logs no DevTools

**⚠️ IMPORTANTE**: Este sistema é adequado para aplicações de desenvolvimento e teste. Para produção, recomenda-se implementar autenticação server-side completa. 
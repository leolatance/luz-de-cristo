# 🌟 Luz de Cristo App

> **Aplicativo espiritual premium com 7 dias grátis para novos usuários**

Uma plataforma espiritual completa baseada na tradição cristã que oferece direcionamento diário, orações organizadas por necessidades e práticas ancestrais para fortalecer sua fé.

## ✨ Funcionalidades

### 🎁 **Para Novos Usuários**
- **7 Dias Grátis**: Trial completo com acesso a todos os recursos
- **Registro Simples**: Criação de conta rápida e segura
- **Experiência Completa**: Teste todos os recursos premium

### 💎 **Recursos Premium (Inclusos no Trial)**
- **Frase do Dia**: Versículos inspiradores que mudam diariamente para motivar sua jornada
- **Orações para Todas as Necessidades**: Biblioteca completa organizada por categorias (família, cura, prosperidade, proteção, etc.)
- **Unções para Todas as Necessidades**: Orações especiais da tradição judaico-cristã para proteção, cura, prosperidade e direcionamento espiritual
- **Histórias Bíblicas**: Narrativas completas com interpretações e lições práticas para a vida
- **Palavra da Semana**: Visão profética personalizada que se renova automaticamente a cada 7 dias com versículo, interpretação e oração direcionada

### 🛡️ **Painel Administrativo**
- **Gestão de Usuários**: Visualizar, criar, editar e remover usuários
- **Controle Premium**: Ativar/desativar acesso premium
- **Estatísticas**: Dashboard com métricas do sistema
- **Backup Automático**: Sistema de backup integrado

## 🏗️ Arquitetura

### **Frontend** (React + TypeScript + Vite)
- ⚛️ **React 18** com TypeScript
- 🎨 **Tailwind CSS** + **shadcn/ui** para interface moderna
- 🎯 **React Router** para navegação
- 🔄 **React Query** para gerenciamento de estado
- 📱 **Design Responsivo** para todos os dispositivos

### **Backend** (Node.js + Express + MongoDB)
- 🚀 **Node.js** com Express.js
- 🗄️ **MongoDB Atlas** para banco de dados
- 🔐 **JWT Authentication** com sistema de roles
- 🛡️ **Middleware de Segurança** (Helmet, CORS, Rate Limiting)
- 📊 **API RESTful** bem estruturada

## 🛡️ Segurança

### **Autenticação e Autorização**
- 🔐 JWT tokens com expiração configurável
- 🚫 Rate limiting para prevenção de ataques
- 🔒 Senhas hasheadas com bcrypt (12 rounds)
- 👥 Sistema de roles (admin/user)

### **Proteção da API**
- 🛡️ Helmet.js para headers de segurança
- 🌐 CORS configurado para domínios específicos
- ✅ Validação de dados com express-validator
- 🚨 Sanitização para prevenção de injection

### **Infraestrutura**
- 🏗️ Separação completa backend/frontend
- 🔗 Credenciais MongoDB protegidas no servidor
- 📡 Comunicação segura via API REST
- 🔄 Backup automático via MongoDB Atlas

## 📁 Estrutura do Projeto

```
luz-de-cristo-app/
├── 📁 server/                  # Backend Node.js
│   ├── 📁 config/             # Configurações (database)
│   ├── 📁 middleware/         # Middlewares (auth, cors, etc)
│   ├── 📁 models/             # Modelos MongoDB
│   ├── 📁 routes/             # Rotas da API
│   ├── 🔒 .env                # Variáveis de ambiente (não commitado)
│   ├── 📦 package.json        # Dependências do backend
│   └── 🚀 server.js           # Servidor principal
├── 📁 src/                    # Frontend React
│   ├── 📁 components/         # Componentes React
│   ├── 📁 contexts/           # Contexts (Auth, etc)
│   ├── 📁 data/               # Dados estáticos
│   ├── 📁 hooks/              # Hooks customizados
│   ├── 📁 lib/                # Utilitários e API client
│   └── 📁 pages/              # Páginas principais
├── 📁 public/                 # Assets estáticos
├── 🔧 package.json            # Dependências do frontend
├── ⚙️ vite.config.ts          # Configuração Vite
├── 🎨 tailwind.config.js      # Configuração Tailwind
└── 📖 README.md               # Este arquivo
```

## 💰 Modelo de Negócio

### **Como Funciona**
- ✅ **Aplicativo Premium**: Todos os recursos são pagos
- 🎁 **Trial Gratuito**: 7 dias completos para novos usuários
- 🔄 **Renovação Automática**: Após o trial, é necessário assinar para continuar
- 💳 **Pagamento**: Integrado via GoatPayments para processar assinaturas

### **Estados do Usuário**
| Estado | Acesso | Duração | Funcionalidades |
|--------|--------|---------|----------------|
| **Novo Usuário** | ✅ Completo | 7 dias | Todas as 5 funcionalidades |
| **Trial Expirado** | ❌ Bloqueado | - | Apenas landing page |
| **Assinante Premium** | ✅ Completo | Mensal/Anual | Todas as 5 funcionalidades |

### **Funcionalidades Premium**
1. **Frase do Dia** - Versículos inspiradores diários
2. **Orações para Todas as Necessidades** - 23+ orações categorizadas
3. **Unções para Todas as Necessidades** - 23+ práticas judaico-cristãs
4. **Histórias Bíblicas** - 15+ narrativas com interpretações
5. **Palavra da Semana** - Visão profética personalizada

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 🎯 Resumo Executivo

O **Luz de Cristo App** é uma plataforma espiritual premium baseada na tradição judaico-cristã que oferece:

- **5 funcionalidades espirituais** cuidadosamente desenvolvidas
- **Trial de 7 dias gratuito** para novos usuários experimentarem
- **Conteúdo personalizado** que se renova automaticamente (frase diária, palavra semanal)
- **Biblioteca completa** com 23+ orações, 23+ unções e 15+ histórias bíblicas
- **Arquitetura segura** com backend Node.js + MongoDB e frontend React
- **Sistema de pagamento** integrado para conversão trial → premium

**Desenvolvido com 💙 para fortalecer a fé e aproximar corações de Deus** 
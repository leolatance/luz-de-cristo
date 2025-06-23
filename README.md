# 🕊️ Luz de Cristo - App de Inspiração Cristã

<div align="center">
  <img src="public/favicon.ico" alt="Luz de Cristo" width="64" height="64">
  
  **Transforme sua vida com o poder da fé**
  
  [![Deploy Status](https://img.shields.io/badge/deploy-ready-brightgreen)](https://vercel.com)
  [![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF)](https://vitejs.dev/)
</div>

## 📖 Sobre o Projeto

O **Luz de Cristo** é uma aplicação web moderna dedicada ao crescimento espiritual e inspiração diária cristã. Desenvolvido para o público adulto (30+), oferece uma experiência completa de fé com recursos premium e conteúdo cuidadosamente selecionado.

### ✨ Funcionalidades Principais

- 🌅 **Frase do Dia**: Inspiração diária com versículos e reflexões
- 🙏 **Orações Diárias**: Orações para manhã, tarde e noite
- 📚 **Histórias Bíblicas**: Narrativas inspiradoras que fortalecem a fé
- ⭐ **Unções Premium**: Orações especiais da tradição judaico-cristã
- 🎁 **Trial Gratuito**: 7 dias de acesso premium para novos usuários
- 📱 **Responsivo**: Funciona perfeitamente em todos os dispositivos

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Build Tool**: Vite
- **Autenticação**: Sistema próprio com bcrypt
- **Persistência**: localStorage (seguro)
- **Ícones**: Lucide React
- **Deploy**: Vercel Ready

## 🏗️ Arquitetura do Projeto

```
luz-de-cristo-app/
├── src/
│   ├── components/          # Componentes React
│   │   ├── ui/             # Componentes base (Shadcn/ui)
│   │   ├── AdminPanel.tsx  # Painel administrativo
│   │   ├── AuthModal.tsx   # Modal de autenticação
│   │   ├── LandingPage.tsx # Página inicial
│   │   └── ...
│   ├── contexts/           # Context API
│   │   └── AuthContext.tsx # Contexto de autenticação
│   ├── lib/                # Utilitários e lógica
│   │   ├── userManager.ts  # Gerenciamento de usuários
│   │   ├── initSystem.ts   # Inicialização do sistema
│   │   └── utils.ts        # Funções auxiliares
│   ├── data/               # Dados estáticos
│   │   └── content.ts      # Conteúdo das orações e histórias
│   ├── config/             # Configurações
│   │   └── checkout.ts     # Sistema de checkout
│   └── pages/              # Páginas principais
│       ├── Index.tsx       # Página principal
│       └── NotFound.tsx    # Página 404
├── public/                 # Assets estáticos
├── docs/                   # Documentação
│   ├── SECURITY_README.md  # Documentação de segurança
│   ├── PREMIUM_SYSTEM.md   # Sistema premium
│   └── ...
└── README.md              # Este arquivo
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/luz-de-cristo-app.git
   cd luz-de-cristo-app
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute em desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse o aplicativo**
   ```
   http://localhost:8080
   ```

### Build para Produção

```bash
# Build otimizado
npm run build

# Preview do build
npm run preview

# Lint do código
npm run lint
```

## 🔐 Sistema de Autenticação

O app possui um sistema de autenticação robusto com:

- **Hash de senhas** com bcrypt (12 rounds)
- **Rate limiting** (proteção contra força bruta)
- **Sessões seguras** com tokens de 256 bits
- **Expiração automática** de sessões (24 horas)
- **Validação rigorosa** de inputs

### Credenciais Administrativas

Para acessar o painel admin em desenvolvimento:

- **Admin**: admin@luzdecristo.com / Admin123!
- **Teste**: teste@luzdecristo.com / Teste123!

## 💎 Sistema Premium

### Recursos Gratuitos
- ✅ Frase inspiradora diária
- ✅ Orações básicas (manhã, tarde, noite)
- ✅ Histórias bíblicas fundamentais
- ✅ Acesso multiplataforma

### Recursos Premium
- 👑 Unções sagradas completas
- 📖 Histórias bíblicas exclusivas
- 🎯 Orações personalizadas
- 📅 Conteúdo semanal novo
- 🎧 Suporte prioritário

### Trial Automático
- 🎁 **7 dias grátis** para novos usuários
- 🔄 **Acesso completo** durante o trial
- ⏰ **Expiração automática** após 7 dias

## 🛠️ Administração

### Painel Administrativo

Acesse `/admin` para gerenciar:

- 👥 **Usuários**: Criar, editar, deletar
- 👑 **Premium**: Ativar/desativar status
- 🔐 **Senhas**: Redefinir credenciais
- 📊 **Estatísticas**: Visualizar métricas

### Console de Desenvolvimento

Use o console do navegador para administração:

```javascript
// Criar usuário
LuzDeCristo.createUser('email@exemplo.com', 'senha123', 'Nome', true);

// Listar usuários
LuzDeCristo.showUsers();

// Resetar sistema (cuidado!)
LuzDeCristo.reset();

// Configurar checkout
LuzDeCristoCheckout.updateUrl('https://sua-url-de-pagamento.com');
```

## 🎨 Design System

### Cores Principais
- **Dourado**: `#f59e0b` (elementos premium)
- **Celestial**: `#0ea5e9` (elementos secundários)
- **Creme**: `#fefef9` (fundos suaves)

### Tipografia
- **Interface**: Inter (Google Fonts)
- **Escrituras**: Crimson Text (Google Fonts)

### Componentes
- **Cards de Oração**: Design inspirado em pergaminhos
- **Gradientes**: Tema celestial e dourado
- **Animações**: Transições suaves e elegantes

## 📱 Responsividade

Testado e otimizado para:

- 📱 **Mobile**: 320px - 767px
- 📟 **Tablet**: 768px - 1023px
- 💻 **Desktop**: 1024px+
- 🖥️ **Large**: 1440px+

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conecte ao Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Configurações**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Variáveis de Ambiente** (opcional)
   ```bash
   NODE_ENV=production
   ```

### Outras Plataformas

O app é compatível com:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 🔒 Segurança

- ✅ **Senhas criptografadas** com bcrypt
- ✅ **Rate limiting** contra ataques
- ✅ **Validação de inputs** rigorosa
- ✅ **Sessões seguras** com tokens
- ✅ **Sanitização** de dados
- ✅ **localStorage** com criptografia

Consulte [SECURITY_README.md](SECURITY_README.md) para detalhes completos.

## 📊 Performance

### Métricas de Build
- **JavaScript**: 402KB (124KB gzipped)
- **CSS**: 75KB (12KB gzipped)
- **HTML**: 1.7KB (0.7KB gzipped)

### Otimizações
- ⚡ Code splitting automático
- 🗜️ Compressão gzip/brotli
- 📦 Tree shaking
- 🖼️ Lazy loading de imagens
- 💾 Cache eficiente

## 🧪 Testes

### Teste Manual
1. Acesse a aplicação
2. Crie uma conta nova
3. Verifique o trial de 7 dias
4. Teste todas as funcionalidades
5. Verifique responsividade

### Checklist de QA
- [ ] Landing page carrega corretamente
- [ ] Registro de usuário funciona
- [ ] Login/logout funcionam
- [ ] Trial de 7 dias ativado
- [ ] Conteúdo premium bloqueado/desbloqueado
- [ ] Painel admin acessível
- [ ] Responsividade em todos os breakpoints

## 🤝 Contribuição

### Estrutura de Commits
```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: manutenção
```

### Fluxo de Desenvolvimento
1. Fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- 📧 **Email**: contato@luzdecristo.com
- 💬 **WhatsApp**: +55 (11) 99999-9999
- 🌐 **Website**: https://luzdecristo.vercel.app

## 🙏 Agradecimentos

- **Comunidade React** pelo framework incrível
- **Tailwind CSS** pelo sistema de design
- **Shadcn/ui** pelos componentes elegantes
- **Vercel** pela plataforma de deploy
- **Todos os usuários** que confiam no app para sua jornada espiritual

---

<div align="center">
  <p><strong>Feito com ❤️ e 🙏 para a comunidade cristã</strong></p>
  <p><em>"Seja a luz do mundo" - Mateus 5:14</em></p>
</div>

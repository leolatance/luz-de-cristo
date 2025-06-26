# 🔧 Configuração de Variáveis de Ambiente

Este arquivo contém as instruções para configurar as variáveis de ambiente necessárias para o funcionamento do backend do App Luz de Cristo.

## 📋 Variáveis Obrigatórias

Crie um arquivo `.env` na pasta `server/` com as seguintes variáveis:

```env
# Ambiente de execução
NODE_ENV=development

# Porta do servidor
PORT=3001

# URL de conexão com MongoDB
# Para desenvolvimento local: mongodb://localhost:27017/luz-de-cristo
# Para MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/luz-de-cristo
MONGODB_URI=mongodb://localhost:27017/luz-de-cristo

# Chave secreta para JWT (gere uma chave segura para produção)
# Use: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=sua_chave_jwt_super_secreta_aqui_64_caracteres_ou_mais

# Origens permitidas para CORS (separadas por vírgula)
# Para desenvolvimento: http://localhost:8080,http://localhost:3000
# Para produção: https://seudominio.com,https://www.seudominio.com
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000
```

## 🔒 Variáveis Opcionais

```env
# Rate limiting - máximo de requests por IP (padrão: 100)
RATE_LIMIT_MAX=100

# Rate limiting - janela de tempo em minutos (padrão: 15)
RATE_LIMIT_WINDOW=15

# Tempo de expiração do JWT em horas (padrão: 24)
JWT_EXPIRES_IN=24h
```

## 🚀 Configuração para Produção

### 1. Gerar JWT Secret Seguro
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. MongoDB Atlas
1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie um cluster gratuito
3. Configure usuário e senha
4. Adicione os IPs permitidos (0.0.0.0/0 para qualquer IP)
5. Copie a connection string

### 3. Variáveis para Produção
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luz-de-cristo
JWT_SECRET=sua_chave_jwt_gerada_com_64_caracteres_ou_mais
ALLOWED_ORIGINS=https://seudominio.com,https://www.seudominio.com
```

## 🌐 Deploy em Serviços de Hospedagem

### Railway
1. Conecte seu repositório
2. Adicione as variáveis de ambiente no painel
3. Deploy automático

### Heroku
1. Instale o Heroku CLI
2. Configure as variáveis:
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=sua_connection_string
heroku config:set JWT_SECRET=sua_chave_jwt
heroku config:set ALLOWED_ORIGINS=https://seuapp.herokuapp.com
```

### Vercel (Serverless)
1. Configure no arquivo `vercel.json`
2. Adicione as variáveis no painel da Vercel

## ⚠️ Segurança

- **Nunca** commite o arquivo `.env` no Git
- Use chaves JWT com pelo menos 64 caracteres
- Configure CORS apenas para domínios específicos em produção
- Use HTTPS em produção
- Configure rate limiting adequado para sua aplicação

## 📝 Exemplo Completo

```env
# server/.env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://luzdecristo:suasenha@cluster0.mongodb.net/luzdecristo?retryWrites=true&w=majority
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0
ALLOWED_ORIGINS=https://luzdecristo.vercel.app,https://www.luzdecristo.com
RATE_LIMIT_MAX=200
RATE_LIMIT_WINDOW=15
JWT_EXPIRES_IN=24h
```

## 🔍 Verificação

Para verificar se as variáveis estão configuradas corretamente:

```bash
# No diretório server/
node -e "require('dotenv').config(); console.log(process.env.NODE_ENV, process.env.MONGODB_URI ? 'MongoDB OK' : 'MongoDB NOT SET')"
```

## 📞 Suporte

Se tiver problemas com a configuração, verifique:
1. Se o arquivo `.env` está na pasta `server/`
2. Se não há espaços extras nas variáveis
3. Se a connection string do MongoDB está correta
4. Se o JWT_SECRET tem pelo menos 32 caracteres 
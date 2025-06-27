import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar ao MongoDB (não bloquear o servidor se falhar)
let mongoConnection;
connectDB()
  .then(conn => {
    mongoConnection = conn;
    // Criar usuários iniciais apenas após conexão bem-sucedida
    return createInitialUsers();
  })
  .catch(err => {
    console.error('❌ Falha inicial na conexão MongoDB:', err.message);
    console.log('⚠️ Servidor continuará rodando, mas funcionalidades do banco estarão indisponíveis');
  });

// Middlewares de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://luzdecristo.vercel.app', 'https://www.luzdecristo.vercel.app'] 
    : ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP por janela
  message: { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// Criar usuários iniciais
async function createInitialUsers() {
  try {
    const adminExists = await User.findOne({ email: 'admin@luzdecristo.com' });
    
    if (!adminExists) {
      const adminUser = new User({
        email: 'admin@luzdecristo.com',
        name: 'Administrador',
        passwordHash: await bcrypt.hash('Admin123!', 12),
        isPremium: true,
        role: 'admin'
      });
      
      const testUser = new User({
        email: 'teste@luzdecristo.com',
        name: 'Usuário Teste',
        passwordHash: await bcrypt.hash('Teste123!', 12),
        isPremium: false,
        role: 'user'
      });
      
      await adminUser.save();
      await testUser.save();
      console.log('✅ Usuários iniciais criados com sucesso');
    }
  } catch (error) {
    console.error('❌ Erro ao criar usuários iniciais:', error);
  }
}

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

export default app; 
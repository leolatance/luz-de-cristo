import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Rate limiting para autenticação
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas por IP
  message: { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Aplicar rate limiting nas rotas de auth
router.use('/login', authLimiter);
router.use('/register', authLimiter);

// Gerar JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Registro de usuário
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }

    // Limitar número de usuários
    const userCount = await User.countDocuments();
    if (userCount > 1000) {
      return res.status(400).json({ error: 'Limite de usuários atingido' });
    }

    // Criar usuário com trial de 7 dias
    const passwordHash = await bcrypt.hash(password, 12);
    
    const user = new User({
      email,
      name,
      passwordHash,
      isPremium: false, // CORRIGIDO: Trial users are NOT premium
      // Trial de 7 dias para novos usuários
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
        trialEndsAt: user.trialEndsAt,
        premiumEndsAt: user.premiumEndsAt
      }
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Login bem-sucedido
    user.lastLoginAt = new Date();
    
    // Verificar se trial expirou - LÓGICA CORRIGIDA
    if (!user.isPremium && user.trialEndsAt && user.isTrialExpired()) {
      user.trialEndsAt = null; // Remove trial expirado
    }
    
    // Verificar se premium expirou
    if (user.isPremium && user.premiumEndsAt && user.isPremiumExpired()) {
      user.isPremium = false; // Remove premium expirado
      user.premiumEndsAt = null;
    }
    
    await user.save();

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
        trialEndsAt: user.trialEndsAt,
        premiumEndsAt: user.premiumEndsAt,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Verificar token (para manter sessão)
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      isPremium: req.user.isPremium,
      trialEndsAt: req.user.trialEndsAt,
      premiumEndsAt: req.user.premiumEndsAt,
      role: req.user.role
    }
  });
});

export default router; 
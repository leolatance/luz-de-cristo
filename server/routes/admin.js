import express from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Todas as rotas admin requerem autenticação e role admin
router.use(authenticateToken);
router.use(requireAdmin);

// Listar todos os usuários
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
      .select('-passwordHash')
      .sort({ createdAt: -1 });
    
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

// Criar usuário (admin)
router.post('/users', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('isPremium').isBoolean().optional(),
  body('role').isIn(['user', 'admin']).optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, isPremium = false, role = 'user' } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    
    const user = new User({
      email,
      name,
      passwordHash,
      isPremium,
      trialEndsAt: null, // Admin criado não tem trial
      role
    });

    await user.save();

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário
router.put('/users/:id', [
  body('email').optional().isEmail().normalizeEmail(),
  body('password').optional().isLength({ min: 6 }),
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('isPremium').isBoolean().optional(),
  body('role').isIn(['user', 'admin']).optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, isPremium, role } = req.body;
    const updates = {};

    if (email) updates.email = email;
    if (name) updates.name = name;
    if (typeof isPremium === 'boolean') updates.isPremium = isPremium;
    if (role) updates.role = role;
    
    if (password) {
      updates.passwordHash = await bcrypt.hash(password, 12);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ user });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Deletar usuário
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário deletado com sucesso' });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

// Ativar premium
router.post('/users/:id/premium', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Premium de 30 dias: isPremium=true AND premiumEndsAt=+30 dias
    user.isPremium = true;
    user.trialEndsAt = null; // Remove trial se existir
    user.premiumEndsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 dias
    
    await user.save();

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
        trialEndsAt: user.trialEndsAt,
        premiumEndsAt: user.premiumEndsAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ativar premium' });
  }
});

// Tornar usuário gratuito
router.post('/users/:id/free', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Remove premium e trial: isPremium=false, trialEndsAt=null, premiumEndsAt=null
    user.isPremium = false;
    user.trialEndsAt = null;
    user.premiumEndsAt = null;
    
    await user.save();

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
        trialEndsAt: user.trialEndsAt,
        premiumEndsAt: user.premiumEndsAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao tornar usuário gratuito' });
  }
});

// Estatísticas
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    
    // Premium ativo: isPremium=true AND (premiumEndsAt=null OR premiumEndsAt no futuro)
    const premiumUsers = await User.countDocuments({ 
      isPremium: true,
      $or: [
        { premiumEndsAt: null },
        { premiumEndsAt: { $gte: new Date() } }
      ]
    });
    
    // Trial ativo: isPremium=false AND trialEndsAt no futuro
    const trialUsers = await User.countDocuments({ 
      isPremium: false,
      trialEndsAt: { $exists: true, $gte: new Date() } 
    });
    
    // Usuários gratuitos: resto
    const freeUsers = totalUsers - premiumUsers - trialUsers;
    
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayRegistrations = await User.countDocuments({ 
      createdAt: { $gte: todayStart } 
    });

    res.json({
      totalUsers,
      premiumUsers,
      trialUsers,
      freeUsers,
      todayRegistrations
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
});

export default router; 
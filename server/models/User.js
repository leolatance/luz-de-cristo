import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  passwordHash: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  trialEndsAt: {
    type: Date,
    default: null
  },
  premiumEndsAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
    type: Date,
    default: null
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true,
  collection: 'users'
});

// Índices para performance
UserSchema.index({ email: 1 });
UserSchema.index({ isPremium: 1 });
UserSchema.index({ createdAt: -1 });

// Métodos
UserSchema.methods.isTrialExpired = function() {
  return !!(this.trialEndsAt && this.trialEndsAt < new Date());
};

UserSchema.methods.isPremiumExpired = function() {
  return !!(this.premiumEndsAt && this.premiumEndsAt < new Date());
};

export default mongoose.model('User', UserSchema); 
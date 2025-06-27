import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI não está definida nas variáveis de ambiente');
    }

    console.log('🔄 Conectando ao MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // 30 segundos
      socketTimeoutMS: 45000, // 45 segundos
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });
    
    console.log(`🟢 MongoDB conectado: ${conn.connection.host}`);
    
    // Eventos de conexão para debug
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB desconectado');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🟢 MongoDB reconectado');
    });
    
    return conn;
  } catch (error) {
    console.error('❌ Erro de conexão MongoDB:', error.message);
    
    // Em produção, tenta reconectar após 5 segundos
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Tentando reconectar em 5 segundos...');
      setTimeout(() => connectDB(), 5000);
      return;
    }
    
    process.exit(1);
  }
};

export default connectDB; 
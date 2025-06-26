import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
    
    return conn;
  } catch (error) {
    console.error('Erro de conexão MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB; 
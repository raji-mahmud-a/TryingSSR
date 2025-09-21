const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mayor-k-prime-properties';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // In development, continue without DB, in production exit
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.log('⚠️  Continuing in development mode without database...');
    }
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;

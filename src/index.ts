import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Database connection and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    await sequelize.sync();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();
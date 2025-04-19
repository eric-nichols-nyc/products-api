import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { productsRouter } from './routes/products';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Supabase client with service role key for admin access
export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create products table if it doesn't exist
const initializeDatabase = async () => {
  try {
    const { error } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (error) {
      console.log('Creating products table...');
      await supabase.rpc('create_products_table');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  initializeDatabase();
});
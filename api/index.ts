import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Router } from 'express';

dotenv.config();

const app = express();

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

// Products router - inlined to avoid import issues
const productsRouter = Router();

// GET all products
productsRouter.get('/', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      res.status(500).json({ 
        error: 'Error fetching products',
        details: error.message,
        code: error.code
      });
      return;
    }

    res.json(data || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET product by ID
productsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      console.error('Supabase error:', error);
      res.status(500).json({ 
        error: 'Error fetching product',
        details: error.message,
        code: error.code
      });
      return;
    }

    if (!data) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Routes
app.use('/api/products', productsRouter);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// For root route
app.get('/', (req, res) => {
  res.json({ message: 'Products API is running' });
});

// Serverless handler
export default async (req, res) => {
  return app(req, res);
};
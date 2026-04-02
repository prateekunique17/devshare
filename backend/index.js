import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running successfully' });
});

// Mount Routes
import postRoutes from './routes/posts.js';
app.use('/api/posts', postRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

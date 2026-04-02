import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Get paginated posts for the feed
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { data: posts, error, count } = await supabase
      .from('posts')
      .select('*, profiles(username, avatar_url)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  // Validate request
  const { user_id, content, code_snippet, tags } = req.body;
  if (!user_id || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data: newPost, error } = await supabase
      .from('posts')
      .insert([
        { user_id, content, code_snippet, tags }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

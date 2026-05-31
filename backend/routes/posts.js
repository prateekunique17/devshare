import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Get paginated posts for the feed with search, sorting, and filtering
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const type = req.query.type; // 'post' or 'gem'
  const sortBy = req.query.sortBy || 'latest'; // 'latest' or 'popular'
  const search = req.query.search || '';
  const tag = req.query.tag; // category or specific tag

  try {
    let query = supabase
      .from('posts')
      .select('*, profiles(username, avatar_url)', { count: 'exact' });

    // Filter by type if provided (post vs gem)
    if (type) {
      query = query.eq('type', type);
    }

    // Filter by tag if provided
    if (tag) {
      query = query.contains('tags', [tag]);
    }

    // Handle text search (searches title, content, and code snippet)
    if (search) {
      query = query.or(`content.ilike.%${search}%,title.ilike.%${search}%,code_snippet.ilike.%${search}%`);
    }

    // Handle sorting
    if (sortBy === 'popular') {
      query = query.order('likes_count', { ascending: false }).order('created_at', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination range
    const { data: posts, error, count } = await query.range(offset, offset + limit - 1);

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

// Create a new post / gem
router.post('/', async (req, res) => {
  // Validate request
  const { user_id, content, code_snippet, tags, repo_url, type, title, image_gradient } = req.body;
  if (!user_id || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data: newPost, error } = await supabase
      .from('posts')
      .insert([
        { 
          user_id, 
          content, 
          code_snippet: code_snippet || null, 
          tags: tags || [], 
          repo_url: repo_url || null,
          type: type || 'post',
          title: title || null,
          image_gradient: image_gradient || null
        }
      ])
      .select('*, profiles(username, avatar_url)')
      .single();

    if (error) throw error;
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Toggle like for a post
router.post('/:id/like', async (req, res) => {
  const postId = req.params.id;
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

  try {
    // Check if the user already liked the post
    const { data: existingLike } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user_id)
      .single();

    if (existingLike) {
      // Unlike: remove from post_likes and decrement likes_count
      await supabase.from('post_likes').delete().eq('id', existingLike.id);
      
      const { data: post } = await supabase.from('posts').select('likes_count').eq('id', postId).single();
      const newCount = Math.max(0, (post?.likes_count || 0) - 1);
      await supabase.from('posts').update({ likes_count: newCount }).eq('id', postId);
      
      return res.json({ liked: false, likes_count: newCount });
    } else {
      // Like: insert into post_likes and increment likes_count
      await supabase.from('post_likes').insert([{ post_id: postId, user_id }]);
      
      const { data: post } = await supabase.from('posts').select('likes_count').eq('id', postId).single();
      const newCount = (post?.likes_count || 0) + 1;
      await supabase.from('posts').update({ likes_count: newCount }).eq('id', postId);
      
      return res.json({ liked: true, likes_count: newCount });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comments for a post
router.get('/:id/comments', async (req, res) => {
  const postId = req.params.id;
  try {
    const { data: comments, error } = await supabase
      .from('post_comments')
      .select('*, profiles(username, avatar_url)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a comment to a post
router.post('/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const { user_id, content } = req.body;

  if (!user_id || !content) return res.status(400).json({ error: 'Missing required fields' });

  try {
    const { data: newComment, error } = await supabase
      .from('post_comments')
      .insert([{ post_id: postId, user_id, content }])
      .select('*, profiles(username, avatar_url)')
      .single();

    if (error) throw error;
    
    // Optionally increment comments count on the post if you add a comments column
    // For now we'll just return the comment
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

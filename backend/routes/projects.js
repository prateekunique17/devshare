import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// GET /api/projects: Fetch all projects with owner profile info, search, and filter
router.get('/', async (req, res) => {
  const search = req.query.search || '';
  const status = req.query.status || '';

  try {
    let query = supabase
      .from('projects')
      .select('*, profiles(username, avatar_url)');

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (status && status !== 'all') {
      const s = status.toLowerCase().replace(/\s+/g, '');
      if (s === 'inprogress') {
        query = query.eq('status', 'In Progress');
      } else if (s === 'completed') {
        query = query.eq('status', 'Completed');
      } else {
        query = query.eq('status', status);
      }
    }

    const { data: projects, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/projects: Create a new project
router.post('/', async (req, res) => {
  const { user_id, title, description, image_url, tags, repo_url, status } = req.body;

  // Validate required fields
  if (!user_id || !title || !description) {
    return res.status(400).json({ error: 'Missing required fields: user_id, title, and description' });
  }

  try {
    const { data: newProject, error } = await supabase
      .from('projects')
      .insert([
        {
          user_id,
          title,
          description,
          image_url: image_url || null,
          tags: tags || [],
          repo_url: repo_url || null,
          status: status || 'In Progress'
        }
      ])
      .select('*, profiles(username, avatar_url)')
      .single();

    if (error) throw error;

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

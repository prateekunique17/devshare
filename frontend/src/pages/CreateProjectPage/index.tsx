import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Github, FolderKanban, Tag, X, ArrowRight, Code, MessageSquare } from 'lucide-react';
import { MobileNav } from '../../components/MobileNav';
import { Sidebar } from '../DashboardPage/components/Sidebar';

const PREDEFINED_TAGS = ['React', 'Node.js', 'TypeScript', 'Supabase', 'TailwindCSS', 'Python', 'Go', 'Rust', 'Next.js', 'Framer Motion', 'AI/ML', 'PostgreSQL'];

export const CreateProjectPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [status, setStatus] = useState('In Progress');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const [error, setError] = useState('');

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCustomTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = customTagInput.trim();
      if (tag && !selectedTags.includes(tag)) {
        setSelectedTags((prev) => [...prev, tag]);
      }
      setCustomTagInput('');
    }
  };

  const mutation = useMutation({
    mutationFn: async (newProject: any) => {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      if (!response.ok) {
        throw new Error('Failed to publish project. Please ensure backend is running.');
      }
      return response.json();
    },
    onSuccess: () => {
      // Invalidate projects cache to trigger dynamic refetching
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      navigate('/projects');
    },
    onError: (err: any) => {
      setError(err.message || 'An error occurred while publishing your project.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Project title is required.');
      return;
    }
    if (!description.trim()) {
      setError('Project description is required.');
      return;
    }
    if (!user) {
      setError('You must be logged in to create a project.');
      return;
    }

    mutation.mutate({
      user_id: user.id,
      title,
      description,
      image_url: imageUrl.trim() || null,
      repo_url: repoUrl.trim() || null,
      status,
      tags: selectedTags.length > 0 ? selectedTags : ['General']
    });
  };

  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter pb-20 md:pb-0">
      <Sidebar />
      <MobileNav />

      {/* Ambient backgrounds */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="md:ml-64 pt-10 flex justify-center p-4 sm:p-8 relative z-10 w-full overflow-x-hidden min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-black tracking-[0.25em] text-devshare-blue uppercase">PROJECT HUB</span>
              <h1 className="text-3xl font-black text-white tracking-tight mt-1">Showcase New Project</h1>
            </div>
            <button 
              type="button"
              onClick={() => navigate('/projects')} 
              className="p-2 bg-devshare-panel hover:bg-devshare-panel_hover transition-colors rounded-xl border border-devshare-border"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="glass-panel p-6 sm:p-8 border border-devshare-border rounded-2xl bg-devshare-panel/40">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Project Title */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <FolderKanban className="w-4 h-4 text-devshare-blue" />
                  Project Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Terminal Noir social client"
                  className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors placeholder:text-devshare-text_secondary/40"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Code className="w-4 h-4 text-devshare-blue" />
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project, features, challenges, and what tech stack you used..."
                  rows={4}
                  className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors resize-none placeholder:text-devshare-text_secondary/40"
                  required
                />
              </div>

              {/* Image URL & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4 text-devshare-blue" />
                    Screenshot URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://imgur.com/image.png"
                    className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors placeholder:text-devshare-text_secondary/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <FolderKanban className="w-4 h-4 text-devshare-blue" />
                    Development Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors appearance-none cursor-pointer"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* GitHub Repo */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Github className="w-4 h-4 text-devshare-blue" />
                  GitHub Repository (Optional)
                </label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors placeholder:text-devshare-text_secondary/40"
                />
              </div>

              {/* Tech Stack / Tags Selection */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Tag className="w-4 h-4 text-devshare-blue" />
                  Technology Stack
                </label>
                <p className="text-[11px] text-devshare-text_secondary mb-2">
                  Select the tools and languages you used to build this project.
                </p>
                <div className="flex flex-wrap gap-2">
                  {/* Render Predefined Tags */}
                  {PREDEFINED_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-devshare-blue text-white border-devshare-blue shadow-lg shadow-devshare-blue/20'
                            : 'bg-[#050b12] text-devshare-text_secondary border-devshare-border/60 hover:border-devshare-blue/50 hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}

                  {/* Render Custom Tags */}
                  {selectedTags.filter((t) => !PREDEFINED_TAGS.includes(t)).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border bg-devshare-blue text-white border-devshare-blue shadow-lg shadow-devshare-blue/20 flex items-center gap-1.5"
                    >
                      {tag}
                      <X className="w-3 h-3" />
                    </button>
                  ))}

                  {/* Add Custom Tag */}
                  <input
                    type="text"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    onKeyDown={handleCustomTagKeyDown}
                    placeholder="+ Add custom (press Enter)"
                    className="bg-[#050b12] border border-devshare-border/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-devshare-blue transition-colors min-w-[150px]"
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-xs font-bold bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl">{error}</p>}

              {/* Actions */}
              <div className="pt-4 border-t border-devshare-border/40 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/projects')}
                  className="px-6 py-2.5 rounded-xl border border-devshare-border text-white hover:bg-devshare-panel_hover transition-colors text-sm font-bold"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-xl text-sm font-black transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {mutation.isPending ? 'Publishing...' : 'Publish Project'}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

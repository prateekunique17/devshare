import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Tag, Github, Sparkles, Image as ImageIcon } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const GRADIENTS = [
  { name: 'Midnight Glow', value: 'from-[#0d1b2a] to-[#415a77]' },
  { name: 'Emerald Forest', value: 'from-[#132a13] to-[#3f5e3d]' },
  { name: 'Sunset Rose', value: 'from-[#4a1525] to-[#c1121f]' },
  { name: 'Purple Twilight', value: 'from-[#240046] to-[#7b2cbf]' },
  { name: 'Aurora Teal', value: 'from-[#005f73] to-[#0a9396]' },
];

const CATEGORIES = ['UI Kit', 'Hook/Util', 'Animation', 'Backend Tool', 'AI Prompt'];

export const DropGemModal = ({ isOpen, onClose }: Props) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gemType, setGemType] = useState<'code' | 'image'>('code');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [imageGradient, setImageGradient] = useState(GRADIENTS[0].value);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [repoUrl, setRepoUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !tags.includes(val)) {
        setTags(prev => [...prev, val]);
      }
      setTagInput('');
    }
  };

  const mutation = useMutation({
    mutationFn: async (newGem: any) => {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGem),
      });
      if (!res.ok) throw new Error('Failed to drop code gem. Make sure backend is running.');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gems'] });
      // Also invalidate posts query to update any feed tracking
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // Reset form
      setTitle('');
      setDescription('');
      setGemType('code');
      setCodeSnippet('');
      setImageGradient(GRADIENTS[0].value);
      setCategory(CATEGORIES[0]);
      setRepoUrl('');
      setTags([]);
      setError('');
      onClose();
    },
    onError: (err: any) => {
      setError(err.message || 'An error occurred.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be logged in to drop a gem.');
      return;
    }
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }
    if (gemType === 'code' && !codeSnippet.trim()) {
      setError('Code snippet is required.');
      return;
    }

    // Add category as the primary tag
    const allTags = Array.from(new Set([category.toUpperCase(), ...tags]));

    mutation.mutate({
      user_id: user.id,
      title: title.trim(),
      content: description.trim(),
      code_snippet: gemType === 'code' ? codeSnippet.trim() : null,
      repo_url: repoUrl.trim() || null,
      type: 'gem',
      image_gradient: gemType === 'image' ? imageGradient : null,
      tags: allTags,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-[#0b1016] border border-devshare-border w-full max-w-2xl rounded-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh] shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-devshare-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-devshare-blue" />
                <h2 className="text-lg font-black text-white">Drop a Community Gem</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-devshare-panel text-devshare-text_secondary hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl">
                  {error}
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g., Infinite Scroll React Hook"
                    className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors placeholder:text-devshare-text_secondary/40"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors cursor-pointer"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white uppercase tracking-wider block">Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Explain what this gem is, how it works, and its key features..."
                  rows={3}
                  className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors resize-none placeholder:text-devshare-text_secondary/40"
                  required
                />
              </div>

              {/* Gem Type Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white uppercase tracking-wider block">Gem Presentation</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setGemType('code')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-xs sm:text-sm transition-all ${
                      gemType === 'code'
                        ? 'bg-devshare-blue/15 text-devshare-blue border-devshare-blue'
                        : 'bg-[#050b12] text-devshare-text_secondary border-devshare-border/60 hover:text-white'
                    }`}
                  >
                    <Code className="w-4 h-4" />
                    Code Snippet Showcase
                  </button>
                  <button
                    type="button"
                    onClick={() => setGemType('image')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-xs sm:text-sm transition-all ${
                      gemType === 'image'
                        ? 'bg-devshare-blue/15 text-devshare-blue border-devshare-blue'
                        : 'bg-[#050b12] text-devshare-text_secondary border-devshare-border/60 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    Gradient Visual Card
                  </button>
                </div>
              </div>

              {/* Code Snippet Input */}
              {gemType === 'code' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">Code Snippet</label>
                  <textarea
                    value={codeSnippet}
                    onChange={e => setCodeSnippet(e.target.value)}
                    placeholder={`export const useMyHook = () => {\n  // Code goes here...\n};`}
                    rows={6}
                    className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl p-4 text-emerald-300 font-mono text-xs focus:outline-none focus:border-devshare-blue transition-colors"
                    required
                  />
                </div>
              )}

              {/* Image Gradient selection */}
              {gemType === 'image' && (
                <div className="space-y-3 p-4 bg-black/20 rounded-xl border border-devshare-border/40">
                  <label className="text-xs font-bold text-white uppercase tracking-wider block">Card Background Gradient</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {GRADIENTS.map(grad => (
                      <button
                        key={grad.name}
                        type="button"
                        onClick={() => setImageGradient(grad.value)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                          imageGradient === grad.value
                            ? 'border-devshare-blue bg-[#0b1016]'
                            : 'border-devshare-border/60 bg-[#050b12] hover:border-devshare-text_secondary/50'
                        }`}
                      >
                        <div className={`w-full h-8 rounded-lg bg-gradient-to-br ${grad.value}`} />
                        <span className="text-[10px] font-bold text-white leading-none">{grad.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Github Repo & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                    <Github className="w-3.5 h-3.5" />
                    GitHub Repo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={e => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors placeholder:text-devshare-text_secondary/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Custom Tags (Press Enter)
                  </label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="e.g., hooks, performance"
                    className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors placeholder:text-devshare-text_secondary/40"
                  />
                </div>
              </div>

              {/* Tags Display */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map(t => (
                    <span key={t} className="flex items-center gap-1 px-2.5 py-1 bg-devshare-blue/10 border border-devshare-blue/20 text-devshare-blue rounded-lg text-xs font-bold">
                      {t}
                      <button type="button" onClick={() => toggleTag(t)} className="hover:text-red-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 border-t border-devshare-border/40 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl border border-devshare-border text-white hover:bg-devshare-panel transition-colors text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="px-5 py-2 bg-devshare-blue hover:bg-devshare-blue_hover disabled:opacity-50 text-white rounded-xl text-sm font-black transition-all flex items-center gap-2"
                >
                  {mutation.isPending ? 'Dropping...' : 'Drop Gem'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

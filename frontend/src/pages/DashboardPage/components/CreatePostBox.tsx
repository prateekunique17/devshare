import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { Send, Code, Link, Tag, X } from 'lucide-react';
import { motion } from 'framer-motion';

const PREDEFINED_TAGS = ['React', 'Go', 'OpenAI', 'TypeScript', 'Framer', 'Design'];

export const CreatePostBox = () => {
  const [content, setContent] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [showRepoUrl, setShowRepoUrl] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [showTags, setShowTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => 
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addCustomTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customTagInput.trim() !== '') {
      e.preventDefault();
      const newTag = customTagInput.trim();
      if (!selectedTags.includes(newTag)) {
        setSelectedTags([...selectedTags, newTag]);
      }
      setCustomTagInput('');
    }
  };

  const mutation = useMutation({
    mutationFn: async (newPost: any) => {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setContent('');
      setCodeSnippet('');
      setShowCode(false);
      setRepoUrl('');
      setShowRepoUrl(false);
      setSelectedTags([]);
      setShowTags(false);
      setCustomTagInput('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    mutation.mutate({
      user_id: user.id,
      content,
      code_snippet: codeSnippet,
      repo_url: repoUrl,
      tags: selectedTags.length > 0 ? selectedTags : ['General']
    });
  };

  return (
    <div className="glass-panel p-5 mb-8 border border-devshare-border rounded-2xl bg-devshare-panel/40">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are you building? Drop some knowledge..."
          className="w-full bg-transparent border-none text-white focus:ring-0 resize-none placeholder:text-devshare-text_secondary/50 text-sm mb-2"
          rows={3}
        />
        
        {showCode && (
          <motion.textarea
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            placeholder="Paste your code snippet here..."
            className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl p-4 text-emerald-300 font-mono text-xs mb-4 focus:outline-none focus:border-devshare-blue transition-colors"
            rows={5}
          />
        )}

        {showRepoUrl && (
          <motion.input
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl p-3 text-sm text-white mb-4 focus:outline-none focus:border-devshare-blue transition-colors"
          />
        )}

        {showTags && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 space-y-3 p-3 bg-black/20 rounded-xl border border-devshare-border/40"
          >
            <div className="flex flex-wrap gap-2">
              {PREDEFINED_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-devshare-blue text-white shadow-md shadow-devshare-blue/30'
                      : 'bg-devshare-panel border border-devshare-border text-devshare-text_secondary hover:text-white hover:border-devshare-blue/50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {selectedTags.filter(t => !PREDEFINED_TAGS.includes(t)).map((tag) => (
                <div key={tag} className="flex items-center gap-1 bg-devshare-blue/20 text-devshare-blue px-3 py-1 rounded-lg text-xs font-bold border border-devshare-blue/30">
                  {tag}
                  <button type="button" onClick={() => toggleTag(tag)} className="hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                onKeyDown={addCustomTag}
                placeholder="+ Add custom tag (Press Enter)"
                className="bg-transparent border-none text-xs text-white placeholder:text-devshare-text_secondary focus:ring-0 w-48"
              />
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-devshare-border/40">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${showCode ? 'bg-devshare-blue/20 text-devshare-blue' : 'text-devshare-text_secondary hover:text-white hover:bg-devshare-panel_hover'}`}
            >
              <Code className="w-4 h-4" />
              Code
            </button>
            <button
              type="button"
              onClick={() => setShowRepoUrl(!showRepoUrl)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${showRepoUrl ? 'bg-devshare-blue/20 text-devshare-blue' : 'text-devshare-text_secondary hover:text-white hover:bg-devshare-panel_hover'}`}
            >
              <Link className="w-4 h-4" />
              Link
            </button>
            <button
              type="button"
              onClick={() => setShowTags(!showTags)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${showTags || selectedTags.length > 0 ? 'bg-devshare-blue/20 text-devshare-blue' : 'text-devshare-text_secondary hover:text-white hover:bg-devshare-panel_hover'}`}
            >
              <Tag className="w-4 h-4" />
              Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
            </button>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending || !content.trim()}
            className="flex items-center gap-2 px-5 py-2 bg-devshare-blue hover:bg-devshare-blue_hover disabled:opacity-50 text-white rounded-lg text-sm font-bold shadow-lg shadow-devshare-blue/20 transition-all"
          >
            {mutation.isPending ? 'Posting...' : 'Post'}
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

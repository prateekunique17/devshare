import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { Send, Code } from 'lucide-react';

export const CreatePostBox = () => {
  const [content, setContent] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [showCode, setShowCode] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

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
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    mutation.mutate({
      user_id: user.id,
      content,
      code_snippet: codeSnippet,
      tags: ['General'] // Simplified for now
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
          <textarea
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            placeholder="Paste your code snippet here..."
            className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl p-4 text-emerald-300 font-mono text-xs mb-4 focus:outline-none focus:border-devshare-blue transition-colors"
            rows={5}
          />
        )}

        <div className="flex items-center justify-between pt-3 border-t border-devshare-border/40">
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${showCode ? 'bg-devshare-blue/20 text-devshare-blue' : 'text-devshare-text_secondary hover:text-white hover:bg-devshare-panel_hover'}`}
          >
            <Code className="w-4 h-4" />
            Add Code
          </button>

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

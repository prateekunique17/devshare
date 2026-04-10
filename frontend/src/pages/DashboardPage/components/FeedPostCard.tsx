import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Heart, Share2, MoreHorizontal, ExternalLink, GitBranch, Send } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface Post {
  id: string;
  created_at: string;
  content: string;
  tags: string[];
  code_snippet: string | null;
  repo_url?: string;
  likes_count: number;
  comments: number;
  shares: number;
  profiles: {
    username: string;
    avatar_url: string | null;
  };
}

export interface PostProps {
  post: Post;
}

const TAG_COLORS: Record<string, string> = {
  React: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  Go: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
  OpenAI: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  TypeScript: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
  Framer: 'bg-pink-500/10 border-pink-500/30 text-pink-400',
  Design: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
};

export const FeedPostCard = ({ post }: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch comments
  const { data: comments = [], isLoading: isLoadingComments } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${post.id}/comments`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      return res.json();
    },
    enabled: showComments,
  });

  // Like Mutation
  const likeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${post.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user?.id })
      });
      if (!res.ok) throw new Error('Failed to like post');
      return res.json();
    },
    onSuccess: (data) => {
      setLiked(data.liked);
      setLikeCount(data.likes_count);
    }
  });

  // Comment Mutation
  const commentMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${post.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user?.id, content: newComment })
      });
      if (!res.ok) throw new Error('Failed to post comment');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', post.id] });
      setNewComment('');
    }
  });

  const handleLike = () => {
    if (!user) return alert("Please login to like posts");
    likeMutation.mutate();
    // Optimistic UI update
    setLiked(!liked);
    setLikeCount((c: number) => liked ? c - 1 : c + 1);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please login to comment");
    if (!newComment.trim()) return;
    commentMutation.mutate();
  };

  const username = post.profiles?.username || 'Unknown Developer';
  const avatarUrl = post.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
  const initials = username.substring(0, 2).toUpperCase();

  return (
    <div className="glass-panel overflow-hidden group hover:border-devshare-border/80 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
      {/* Card Header */}
      <div className="p-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0 shadow-sm bg-devshare-panel"
              style={{ backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover' }}
            >
              {!post.profiles?.avatar_url && initials}
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{username}</h4>
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-devshare-text_secondary">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <span className="text-devshare-border">·</span>
                <p className="text-xs text-devshare-blue font-medium">@{username}</p>
              </div>
            </div>
          </div>
          <button className="text-devshare-text_secondary hover:text-white transition-colors p-1 rounded-lg hover:bg-devshare-panel_hover">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Post Body */}
        <p className="text-sm text-devshare-text_primary/80 leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => {
            const colorClass = TAG_COLORS[tag] ?? 'bg-devshare-blue/10 border-devshare-blue/30 text-devshare-blue';
            return (
              <span key={tag} className={`px-2.5 py-0.5 text-[10px] font-black rounded-md border uppercase tracking-wide ${colorClass}`}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>

      {/* Code Block */}
      {post.code_snippet && (
        <div className="mx-5 mb-4 bg-[#050b12] border border-devshare-border/60 rounded-xl overflow-hidden transition-all duration-300">
          <button 
            onClick={() => setShowCode(!showCode)}
            className="w-full flex items-center justify-between px-4 py-2.5 border-b border-devshare-border/40 bg-[#0c1420] hover:bg-[#111926] transition-colors cursor-pointer"
          >
            <div className="flex gap-1.5 items-center">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-3 h-3 text-devshare-text_secondary" />
              <span className="text-[10px] font-mono text-devshare-text_secondary">
                snippet.js {showCode ? '(Click to collapse)' : '(Click to view code)'}
              </span>
            </div>
          </button>
          
          <AnimatePresence>
            {showCode && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-emerald-300/90 scrollbar-thin max-h-[300px] overflow-y-auto">
                  <code>{post.code_snippet}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Card Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-devshare-border/40 bg-devshare-panel/20">
        <div className="flex flex-wrap gap-1">
          <motion.button
            whileTap={{ scale: 0.90 }}
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              liked
                ? 'bg-red-500/15 text-red-400 border border-red-500/20'
                : 'text-devshare-text_secondary hover:bg-devshare-panel_hover hover:text-red-400'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-400' : ''}`} />
            {likeCount}
          </motion.button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-devshare-text_secondary hover:bg-devshare-panel_hover hover:text-devshare-blue transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {comments.length > 0 ? comments.length : post.comments || 0}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-devshare-text_secondary hover:bg-devshare-panel_hover hover:text-green-400 transition-all">
            <Share2 className="w-3.5 h-3.5" />
            {post.shares}
          </button>
        </div>
        {post.repo_url && (
          <motion.a
            href={post.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-devshare-blue/10 border border-devshare-blue/30 hover:bg-devshare-blue hover:border-devshare-blue text-devshare-blue hover:text-white rounded-lg text-[11px] font-black uppercase tracking-wider transition-all"
          >
            <ExternalLink className="w-3 h-3" />
            View Repo
          </motion.a>
        )}
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-devshare-border/40 bg-devshare-panel/30 overflow-hidden"
          >
            <div className="p-5 flex flex-col gap-4">
              
              {/* Existing Comments list */}
              <div className="space-y-4 max-h-[200px] overflow-y-auto scrollbar-thin rounded-lg">
                {isLoadingComments ? (
                  <p className="text-xs text-devshare-text_secondary text-center">Loading comments...</p>
                ) : comments.length === 0 ? (
                  <p className="text-xs text-devshare-text_secondary text-center">No comments yet. Be the first!</p>
                ) : (
                  comments.map((comment: any) => (
                    <div key={comment.id} className="flex gap-3">
                      <div
                        className="w-7 h-7 rounded-full bg-devshare-panel flex-shrink-0"
                        style={{
                          backgroundImage: `url(${comment.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.profiles?.username}`})`,
                          backgroundSize: 'cover'
                        }}
                      />
                      <div className="bg-black/20 p-3 rounded-xl rounded-tl-none border border-devshare-border/30 text-sm w-full">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="font-bold text-white text-xs">{comment.profiles?.username}</span>
                          <span className="text-[10px] text-devshare-text_secondary">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-devshare-text_primary/90 text-xs">{comment.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleAddComment} className="flex gap-2 items-end mt-2">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors resize-none"
                  rows={2}
                />
                <button
                  type="submit"
                  disabled={!newComment.trim() || commentMutation.isPending}
                  className="bg-devshare-blue hover:bg-devshare-blue_hover disabled:opacity-50 text-white p-2 rounded-xl transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

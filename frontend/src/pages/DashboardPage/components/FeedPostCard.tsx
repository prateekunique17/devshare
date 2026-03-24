import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, MoreHorizontal, ExternalLink, GitBranch } from 'lucide-react';
import { useState } from 'react';

interface PostProps {
  post: {
    user: { name: string; handle: string; avatar: string };
    title: string;
    content: string;
    tags: string[];
    code: string;
    fileName: string;
    likes: number;
    comments: number;
    shares: number;
    timestamp: string;
  };
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
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };

  // Get initials for avatar
  const initials = post.user.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="glass-panel overflow-hidden group hover:border-devshare-border/80 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
      {/* Card Header */}
      <div className="p-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0 shadow-sm"
              style={{ backgroundColor: post.user.avatar }}
            >
              {initials}
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{post.user.name}</h4>
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-devshare-text_secondary">{post.timestamp}</p>
                <span className="text-devshare-border">·</span>
                <p className="text-xs text-devshare-blue font-medium">{post.user.handle}</p>
              </div>
            </div>
          </div>
          <button className="text-devshare-text_secondary hover:text-white transition-colors p-1 rounded-lg hover:bg-devshare-panel_hover">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Post Body */}
        <h3 className="text-base font-bold text-devshare-blue mb-2 hover:underline cursor-pointer leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-devshare-text_primary/80 leading-relaxed mb-4">{post.content}</p>

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
      <div className="mx-5 mb-4 bg-[#050b12] border border-devshare-border/60 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-devshare-border/40 bg-[#0c1420]">
          <div className="flex gap-1.5 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-3 h-3 text-devshare-text_secondary" />
            <span className="text-[10px] font-mono text-devshare-text_secondary">{post.fileName}</span>
          </div>
        </div>
        <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-emerald-300/90 scrollbar-thin">
          <code>{post.code}</code>
        </pre>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-devshare-border/40 bg-devshare-panel/20">
        <div className="flex gap-1">
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
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-devshare-text_secondary hover:bg-devshare-panel_hover hover:text-devshare-blue transition-all">
            <MessageSquare className="w-3.5 h-3.5" />
            {post.comments}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-devshare-text_secondary hover:bg-devshare-panel_hover hover:text-green-400 transition-all">
            <Share2 className="w-3.5 h-3.5" />
            {post.shares}
          </button>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-devshare-blue/10 border border-devshare-blue/30 hover:bg-devshare-blue hover:border-devshare-blue text-devshare-blue hover:text-white rounded-lg text-[11px] font-black uppercase tracking-wider transition-all"
        >
          <ExternalLink className="w-3 h-3" />
          View Repo
        </motion.button>
      </div>
    </div>
  );
};

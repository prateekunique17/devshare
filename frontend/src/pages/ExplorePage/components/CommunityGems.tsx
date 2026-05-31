import { motion } from 'framer-motion';
import { Gem, Zap, Bookmark, Share2, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Props {
  activeCategory: string;
  searchQuery: string;
}

interface DBGem {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  code_snippet: string | null;
  image_gradient: string | null;
  tags: string[];
  likes_count: number;
  repo_url: string | null;
  created_at: string;
  type: string;
  profiles?: {
    username: string;
    avatar_url: string | null;
  };
}

const getCategoryTag = (cat: string) => {
  if (cat === 'UI Kits') return 'UI KIT';
  if (cat === 'Hooks & Utils') return 'HOOK/UTIL';
  if (cat === 'Animations') return 'ANIMATION';
  if (cat === 'Backend Tools') return 'BACKEND TOOL';
  if (cat === 'AI Prompts') return 'AI PROMPT';
  return null;
};

export const CommunityGems = ({ activeCategory, searchQuery }: Props) => {
  const categoryTag = getCategoryTag(activeCategory);

  // Fetch live gems from database
  const { data, isLoading, error } = useQuery<{ posts: DBGem[] }>({
    queryKey: ['gems', activeCategory, searchQuery],
    queryFn: async () => {
      let url = 'http://localhost:5000/api/posts?type=gem&limit=20';
      if (categoryTag) {
        url += `&tag=${encodeURIComponent(categoryTag)}`;
      }
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch community gems');
      return res.json();
    },
  });

  const gems: DBGem[] = data?.posts || [];

  return (
    <section>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-black flex items-center gap-2 whitespace-nowrap">
          <Gem className="w-5 h-5 text-blue-400" />
          Top Community Gems
        </h2>
        <div className="flex items-center gap-2 text-sm w-full sm:w-auto overflow-x-auto pb-1 scrollbar-hide">
          <span className="text-devshare-text_secondary whitespace-nowrap">Sort:</span>
          <button className="whitespace-nowrap font-bold text-devshare-blue bg-devshare-blue/10 px-3 py-1.5 rounded-lg hover:bg-devshare-blue/20 transition-colors">
            Most Popular
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-devshare-blue animate-spin mb-3" />
          <p className="text-sm text-devshare-text_secondary">Loading premium gems...</p>
        </div>
      ) : error ? (
        <div className="p-5 border border-red-500/20 bg-red-500/5 rounded-2xl text-center">
          <p className="text-sm font-bold text-red-400">Failed to load community gems. Ensure backend is running.</p>
        </div>
      ) : gems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-devshare-border/40 rounded-2xl bg-[#121820]/30 text-center">
          <Gem className="w-10 h-10 text-devshare-text_secondary/50 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No gems found</h3>
          <p className="text-xs text-devshare-text_secondary max-w-xs">
            {searchQuery ? `No matching gems found for "${searchQuery}".` : 'Be the first to drop a code gem in this category!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {gems.map((gem: DBGem, i: number) => {
            const hasCode = !!gem.code_snippet;
            const title = gem.title || 'Code Showcase';
            const username = gem.profiles?.username || 'Unknown Developer';
            const avatarUrl = gem.profiles?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${username}`;
            const creationDate = new Date(gem.created_at).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <motion.div
                key={gem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-devshare-border/60 bg-[#121820] overflow-hidden group hover:border-devshare-border transition-colors hover:shadow-xl hover:shadow-black/20 flex flex-col"
              >
                {/* Media Area (Image or Code) */}
                <div className="h-48 relative overflow-hidden flex-shrink-0">
                  {!hasCode ? (
                    <div className={`w-full h-full bg-gradient-to-br ${gem.image_gradient || 'from-[#0d1b2a] to-[#415a77]'} p-4`}>
                      <div className="flex flex-wrap gap-1.5 relative z-10">
                        {gem.tags?.map((tag: string) => (
                          <span
                            key={tag}
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              tag === 'FEATURED'
                                ? 'bg-[#409dfd] text-white'
                                : 'bg-black/40 text-white border border-white/20'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#1e1e30] border-b border-devshare-border/40 font-mono text-[10px] sm:text-xs p-4 relative flex flex-col">
                      <div className="flex items-center justify-between mb-3 flex-shrink-0">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {gem.tags?.slice(0, 2).map((tag: string) => (
                            <span
                              key={tag}
                              className="text-[8px] sm:text-[9px] font-bold px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-md uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <pre className="text-pink-300 overflow-y-auto overflow-x-auto flex-1 leading-relaxed scrollbar-thin">
                        <code>{gem.code_snippet}</code>
                      </pre>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-devshare-panel">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <img src={avatarUrl} alt={username} className="w-8 h-8 rounded-full border border-devshare-border" />
                      <div>
                        <h4 className="font-bold text-sm text-white leading-none mb-1">{username}</h4>
                        <p className="text-[10px] text-devshare-text_secondary leading-none">{creationDate}</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-devshare-blue transition-colors truncate">
                      {title}
                    </h3>
                    <p className="text-sm text-devshare-text_secondary leading-relaxed mb-6 line-clamp-3">
                      {gem.content}
                    </p>
                  </div>

                  {/* Footer Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-devshare-border/40 gap-3">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-semibold text-devshare-text_secondary">
                      <div className="flex items-center gap-1 sm:gap-1.5 hover:text-orange-400 transition-colors cursor-pointer whitespace-nowrap">
                        <Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-orange-400 text-orange-400" />
                        {gem.likes_count || 0}
                      </div>
                      {gem.repo_url && (
                        <a
                          href={gem.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 sm:gap-1.5 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Share2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                          <span>Repo</span>
                        </a>
                      )}
                    </div>

                    <button className="text-devshare-text_secondary hover:text-white transition-colors p-1.5 rounded-lg hover:bg-devshare-bg">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

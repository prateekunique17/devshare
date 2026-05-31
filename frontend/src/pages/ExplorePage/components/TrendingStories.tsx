import { Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

interface DBStory {
  id: string;
  title: string | null;
  content: string;
  tags: string[];
  likes_count: number;
  image_gradient: string | null;
}

export const TrendingStories = () => {
  // Fetch top 3 trending posts (highest likes_count)
  const { data, isLoading, error } = useQuery<{ posts: DBStory[] }>({
    queryKey: ['trendingPosts'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/posts?sortBy=popular&limit=3');
      if (!res.ok) throw new Error('Failed to fetch trending stories');
      return res.json();
    },
  });

  const stories = data?.posts || [];

  const getGradient = (story: DBStory, index: number) => {
    if (story.image_gradient) return story.image_gradient;
    const gradients = [
      'from-[#8b6e62] to-[#3a2e29]',
      'from-[#889977] to-[#2d3a28]',
      'from-[#6e6b8c] to-[#252336]',
    ];
    return gradients[index % gradients.length];
  };

  const getCategoryColor = (index: number) => {
    const colors = ['text-blue-400', 'text-emerald-400', 'text-purple-400'];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
            Trending Tech Stories
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-2xl h-48 bg-devshare-panel/30 border border-devshare-border/40 animate-pulse flex items-end p-6">
              <div className="w-full space-y-2">
                <div className="h-3 bg-devshare-panel rounded w-1/3" />
                <div className="h-4 bg-devshare-panel rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || stories.length === 0) {
    // If empty or error, don't show the section or show a simplified message
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-black flex items-center gap-2 whitespace-nowrap">
          <Zap className="w-5 h-5 text-orange-500 fill-orange-500" />
          Trending Tech Stories
        </h2>
        <button className="text-sm font-bold text-devshare-blue hover:underline px-1">
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stories.map((story, i) => {
          const category = story.tags?.[0]?.toUpperCase() || 'TECH UPDATE';
          const title = story.title || (story.content.length > 70 ? story.content.slice(0, 70) + '...' : story.content);
          const gradient = getGradient(story, i);
          const colorClass = getCategoryColor(i);

          return (
            <motion.div
              key={story.id}
              whileHover={{ y: -4 }}
              className={`cursor-pointer rounded-2xl h-48 p-6 flex flex-col justify-end relative overflow-hidden group`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
              
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
  
              <div className="relative z-20">
                <span className={`text-[10px] font-black uppercase tracking-wider ${colorClass} mb-2 block`}>
                  {category}
                </span>
                <h3 className="text-white font-bold text-base leading-snug line-clamp-3">
                  {title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

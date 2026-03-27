import { Zap } from 'lucide-react';
import { trendingStories } from '../data';
import { motion } from 'framer-motion';

export const TrendingStories = () => {
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
        {trendingStories.map((story, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className={`cursor-pointer rounded-2xl h-48 p-6 flex flex-col justify-end relative overflow-hidden group`}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
            
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

            <div className="relative z-20">
              <span className={`text-[10px] font-black uppercase tracking-wider ${story.categoryColor} mb-2 block`}>
                {story.category}
              </span>
              <h3 className="text-white font-bold text-base leading-snug">
                {story.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

import { Search, Filter, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { categories } from '../data';
import { useState } from 'react';

export const SearchHeader = () => {
  const [activeCategory, setActiveCategory] = useState('All Gems');

  return (
    <div className="mb-8 pt-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-devshare-text_secondary group-focus-within:text-devshare-blue transition-colors" />
          <input 
            type="text" 
            placeholder="Search snippets, devs, or tech stack..."
            className="w-full bg-[#0d131a] border border-devshare-border/50 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-devshare-blue focus:shadow-[0_0_15px_rgba(37,157,244,0.1)] transition-all placeholder:text-devshare-text_secondary/50"
          />
        </div>
        <button className="p-3 bg-[#0d131a] border border-devshare-border/50 hover:border-devshare-text_secondary text-devshare-text_secondary hover:text-white rounded-xl transition-colors">
          <Filter className="w-5 h-5" />
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-devshare-blue hover:bg-devshare-blue_hover text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-devshare-blue/20 transition-all flex-shrink-0"
        >
          <Plus className="w-5 h-5" />
          Drop Code
        </motion.button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              activeCategory === category
                ? 'bg-devshare-blue text-white shadow-md shadow-devshare-blue/20'
                : 'bg-[#0d131a] border border-devshare-border/50 text-devshare-text_secondary hover:text-white hover:border-devshare-text_secondary/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

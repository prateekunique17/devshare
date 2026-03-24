import { useState } from 'react';
import { motion } from 'framer-motion';
import { StatsRow } from './StatsRow';
import { FeedPostCard } from './FeedPostCard';
import { mockPosts } from '../data';
import { Plus, Flame, Code2 } from 'lucide-react';

export const MainFeed = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'code'>('all');

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between mb-10"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black tracking-[0.25em] text-devshare-blue uppercase">Dashboard</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 mb-2">
            Welcome back, Alex!
          </h1>
          <p className="text-devshare-text_secondary font-medium">Here's what's happening in your network today.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="bg-gradient-to-r from-devshare-blue to-blue-600 hover:from-devshare-blue_hover hover:to-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-devshare-blue/30 transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          New Project
        </motion.button>
      </motion.header>

      <StatsRow />

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" />
            Recent Project Shares
          </h2>
          <div className="flex bg-devshare-panel/60 p-1 rounded-xl border border-devshare-border gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-devshare-blue text-white shadow-md shadow-devshare-blue/30'
                  : 'text-devshare-text_secondary hover:text-white'
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-1 ${
                activeTab === 'code'
                  ? 'bg-devshare-blue text-white shadow-md shadow-devshare-blue/30'
                  : 'text-devshare-text_secondary hover:text-white'
              }`}
            >
              <Code2 className="w-3 h-3" />
              Only Code
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {mockPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
            >
              <FeedPostCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

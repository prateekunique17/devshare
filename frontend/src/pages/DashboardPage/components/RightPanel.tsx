import { motion } from 'framer-motion';
import { TrendingUp, MessageSquare, UserPlus, Search, Flame, Star, ArrowRight } from 'lucide-react';
import { mockTrends, mockChats, mockFollows } from '../data';

export const RightPanel = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Search Bar */}
      <div className="relative group mt-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-devshare-text_secondary group-focus-within:text-devshare-blue transition-colors" />
        <input
          type="text"
          placeholder="Search DevShare..."
          className="w-full bg-devshare-panel/60 border border-devshare-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-devshare-blue focus:bg-devshare-panel transition-all"
        />
      </div>

      {/* Trending Projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <h3 className="font-black text-xs uppercase tracking-widest">Trending Projects</h3>
          </div>
        </div>
        <div className="space-y-3">
          {mockTrends.map((trend, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 3 }}
              className="group cursor-pointer p-3 rounded-xl bg-devshare-panel/30 border border-devshare-border/50 hover:border-devshare-blue/30 hover:bg-devshare-panel/60 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold group-hover:text-devshare-blue transition-colors line-clamp-1 flex-1 mr-2">
                  {trend.title}
                </h4>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-bold text-amber-400">{trend.spark}</span>
                </div>
              </div>
              <p className="text-[11px] text-devshare-text_secondary line-clamp-1 mb-2">{trend.desc}</p>
              <div className="flex gap-1.5 flex-wrap">
                {trend.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-bold px-2 py-0.5 bg-devshare-blue/10 border border-devshare-blue/20 text-devshare-blue rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.01 }}
            className="w-full mt-1 py-2.5 bg-transparent border border-devshare-border hover:border-devshare-blue/50 hover:text-devshare-blue rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-devshare-text_secondary"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Explore All Trending
          </motion.button>
        </div>
      </section>

      {/* Recent Chats */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-devshare-blue" />
            <h3 className="font-black text-xs uppercase tracking-widest">Recent Chats</h3>
          </div>
          <button className="flex items-center gap-1 text-[10px] font-bold text-devshare-blue hover:text-devshare-blue_hover transition-colors">
            New <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-3">
          {mockChats.map((chat, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-devshare-panel/40 transition-all cursor-pointer group"
            >
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-devshare-blue/40 to-violet-500/30 flex items-center justify-center font-bold text-sm">
                  {chat.name[0]}
                </div>
                {chat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-devshare-bg rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="text-sm font-bold truncate group-hover:text-devshare-blue transition-colors">{chat.name}</h4>
                  <span className="text-[9px] text-devshare-text_secondary bg-devshare-panel/60 px-1.5 py-0.5 rounded-md">{chat.time}</span>
                </div>
                <p className="text-[11px] text-devshare-text_secondary truncate">{chat.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who to Follow */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="w-4 h-4 text-violet-400" />
          <h3 className="font-black text-xs uppercase tracking-widest">Who to Follow</h3>
        </div>
        <div className="space-y-3">
          {mockFollows.map((follow, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-devshare-panel/40 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500/30 to-pink-500/20 flex items-center justify-center font-bold text-sm text-violet-300">
                  {follow.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold group-hover:text-devshare-blue transition-colors">{follow.name}</h4>
                  <p className="text-[10px] text-devshare-text_secondary">{follow.role}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-devshare-blue/10 border border-devshare-blue/30 hover:bg-devshare-blue hover:border-devshare-blue text-devshare-blue hover:text-white text-[10px] font-bold rounded-lg transition-all"
              >
                Follow
              </motion.button>
            </div>
          ))}
        </div>
      </section>

      {/* Status Footer */}
      <div className="pt-4 border-t border-devshare-border/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500/50 animate-ping" />
          </div>
          <span className="text-[11px] font-bold text-devshare-text_secondary">8.4k online</span>
        </div>
        <span className="text-[10px] font-mono text-devshare-text_secondary/40 bg-devshare-panel/50 px-2 py-0.5 rounded">v2.4.0</span>
      </div>
    </div>
  );
};

import { motion } from 'framer-motion';
import { Gem, Zap, Download, Bookmark, MessageSquare, Share2 } from 'lucide-react';
import { communityGems } from '../data';

export const CommunityGems = () => {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {communityGems.map((gem, i) => (
          <motion.div
            key={gem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-devshare-border/60 bg-[#121820] overflow-hidden group hover:border-devshare-border transition-colors hover:shadow-xl hover:shadow-black/20 flex flex-col"
          >
            {/* Meda Area (Image or Code) */}
            <div className="h-48 relative overflow-hidden flex-shrink-0">
              {gem.type === 'image' ? (
                <div className={`w-full h-full bg-gradient-to-br ${gem.imageGradient} p-4`}>
                  <div className="flex gap-2 relative z-10">
                    {gem.tags?.map(tag => (
                      <span key={tag} className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        tag === 'FEATURED' ? 'bg-[#409dfd] text-white' : 'bg-black/40 text-white border border-white/20'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-[#1e1e30] border-b border-devshare-border/40 font-mono text-xs p-4 relative flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    {gem.tags?.map(tag => (
                      <span key={tag} className="text-[9px] font-bold px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-md uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <pre className="text-pink-300 overflow-hidden flex-1 leading-relaxed">
                    <code>{gem.code}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col justify-between bg-devshare-panel">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={gem.user.avatar} alt={gem.user.name} className="w-8 h-8 rounded-full bg-[#fce0cf]" />
                  <div>
                    <h4 className="font-bold text-sm text-white leading-none mb-1">{gem.user.name}</h4>
                    <p className="text-[10px] text-devshare-text_secondary leading-none">{gem.user.time}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-devshare-blue transition-colors">
                  {gem.title}
                </h3>
                <p className="text-sm text-devshare-text_secondary leading-relaxed mb-6">
                  {gem.description}
                </p>
              </div>

              {/* Footer Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-devshare-border/40 gap-3">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-semibold text-devshare-text_secondary">
                  <div className="flex items-center gap-1 sm:gap-1.5 hover:text-orange-400 transition-colors cursor-pointer whitespace-nowrap">
                    <Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-orange-400 text-orange-400" />
                    {gem.stats.likes}
                  </div>
                  {gem.stats.downloads && (
                    <div className="flex items-center gap-1 sm:gap-1.5 hover:text-white transition-colors cursor-pointer whitespace-nowrap">
                      <Download className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      {gem.stats.downloads}
                    </div>
                  )}
                  {gem.stats.comments && (
                    <div className="flex items-center gap-1 sm:gap-1.5 hover:text-white transition-colors cursor-pointer whitespace-nowrap">
                      <MessageSquare className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      {gem.stats.comments}
                    </div>
                  )}
                </div>
                
                <button className="text-devshare-text_secondary hover:text-white transition-colors p-1.5 rounded-lg hover:bg-devshare-bg">
                  {gem.type === 'image' ? <Bookmark className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

import { latestCodeDrops } from '../data';
import { motion } from 'framer-motion';
import { Heart, MessageSquare } from 'lucide-react';

export const LatestCodeDrops = () => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-black text-white mb-6">Latest Code Drops</h2>

      <div className="space-y-5">
        {latestCodeDrops.map((drop, i) => (
          <motion.div
            key={drop.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-devshare-border/60 bg-[#0c1420] overflow-hidden flex flex-col group hover:border-devshare-text_secondary/30 transition-colors"
          >
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-devshare-border/30 bg-[#080d16]">
              <div className="flex gap-1.5 items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[11px] font-mono text-devshare-text_secondary">{drop.fileName}</span>
            </div>

            {/* Code Content */}
            <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-blue-300/90 scrollbar-thin">
              <code>{drop.code}</code>
            </pre>

            {/* Footer Stats */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-devshare-border/30 bg-[#0d1522]">
              <div className="flex items-center gap-4 text-[11px] font-bold text-devshare-text_secondary">
                <button className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
                  <Heart className="w-3.5 h-3.5" /> {drop.likes}
                </button>
                <button className="flex items-center gap-1.5 hover:text-devshare-blue transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> {drop.comments}
                </button>
              </div>
              <span className="text-[10px] text-devshare-text_secondary font-medium">{drop.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

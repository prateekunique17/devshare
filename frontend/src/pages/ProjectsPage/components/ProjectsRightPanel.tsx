import { latestActivity, trendingTech, risingStars } from '../data';
import { History, TrendingUp, Sparkles, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectsRightPanel = () => {
  return (
    <div className="space-y-10 pt-8 px-6 pb-10">
      {/* Latest Activity */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-devshare-text_secondary">Latest Activity</h3>
          <History className="w-4 h-4 text-devshare-text_secondary" />
        </div>
        <div className="space-y-5">
          {latestActivity.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-[13px]">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.online ? 'bg-devshare-blue' : 'bg-devshare-text_secondary/50'}`} />
              <div className="leading-relaxed">
                <span className="font-bold text-devshare-blue">{item.user}</span>{' '}
                <span className="text-devshare-text_secondary">{item.action}</span>{' '}
                <span className="font-bold text-devshare-blue hover:underline cursor-pointer">{item.target}</span>
                <p className="text-[9px] font-bold uppercase tracking-wider text-devshare-text_secondary/60 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Tech */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-devshare-text_secondary">Trending Tech</h3>
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="space-y-4">
          {trendingTech.map((tech, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-black text-devshare-text_primary tracking-wider">{tech.name}</span>
                <span className="text-[11px] font-black text-emerald-400">{tech.growth}</span>
              </div>
              <div className="w-full bg-devshare-border/40 rounded-full h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: tech.width.replace('w-[', '').replace(']', '') }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.7, ease: 'easeOut' }}
                  className={`h-full bg-devshare-blue rounded-full ${tech.width}`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rising Stars */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-devshare-text_secondary">Rising Stars</h3>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
        <div className="space-y-4">
          {risingStars.map((star, i) => (
            <div key={i} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <img src={star.avatar} alt={star.name} className="w-9 h-9 rounded-full bg-[#fde1c3] border border-devshare-border" />
                <div>
                  <p className="text-sm font-bold text-white leading-tight">{star.name}</p>
                  <p className="text-[10px] text-devshare-text_secondary font-medium">{star.handle}</p>
                </div>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-devshare-blue/10 text-devshare-text_secondary hover:text-devshare-blue transition-colors">
                <UserPlus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

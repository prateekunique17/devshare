import { motion } from 'framer-motion';
import { mockStats } from '../data';
import { Briefcase, Users, Zap, TrendingUp, ArrowUpRight } from 'lucide-react';

const statConfig = [
  {
    icon: Briefcase,
    gradient: 'from-devshare-blue/20 to-blue-900/10',
    borderColor: 'hover:border-devshare-blue/60',
    iconColor: 'text-devshare-blue',
    glowColor: 'group-hover:shadow-[0_0_25px_rgba(37,157,244,0.12)]',
  },
  {
    icon: Users,
    gradient: 'from-violet-500/20 to-purple-900/10',
    borderColor: 'hover:border-violet-500/60',
    iconColor: 'text-violet-400',
    glowColor: 'group-hover:shadow-[0_0_25px_rgba(139,92,246,0.12)]',
  },
  {
    icon: Zap,
    gradient: 'from-emerald-500/20 to-green-900/10',
    borderColor: 'hover:border-emerald-500/60',
    iconColor: 'text-emerald-400',
    glowColor: 'group-hover:shadow-[0_0_25px_rgba(52,211,153,0.12)]',
  },
];

export const StatsRow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {mockStats.map((stat, index) => {
        const cfg = statConfig[index];
        const Icon = cfg.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
            className={`relative overflow-hidden glass-panel p-6 group cursor-default transition-all duration-300 ${cfg.borderColor} ${cfg.glowColor}`}
          >
            {/* Gradient background blob */}
            <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0`} />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-5">
                <span className="text-[10px] font-black text-devshare-text_secondary tracking-[0.2em]">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg bg-devshare-panel/80 border border-devshare-border flex items-center justify-center ${cfg.iconColor} transition-colors duration-300`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-black tracking-tight">{stat.value}</span>
              </div>

              <div className={`flex items-center gap-1.5 text-[11px] font-bold ${cfg.iconColor}`}>
                <div className="w-4 h-4 rounded-full bg-current/10 flex items-center justify-center">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </div>
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

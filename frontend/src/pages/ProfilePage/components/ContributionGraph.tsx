import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const generateMockGraph = () => {
  const weeks = 20;
  const days = 5;
  const graph = [];
  for (let i = 0; i < weeks; i++) {
    const week = [];
    for (let j = 0; j < days; j++) {
      // Randomly assign a tier of contribution (0-4)
      const rand = Math.random();
      let tier = 0;
      if (rand > 0.9) tier = 4;
      else if (rand > 0.7) tier = 3;
      else if (rand > 0.5) tier = 2;
      else if (rand > 0.3) tier = 1;
      
      week.push(tier);
    }
    graph.push(week);
  }
  return graph;
};

export const ContributionGraph = () => {
  const graphData = generateMockGraph();

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 4: return 'bg-[#409dfd]'; // bright blue
      case 3: return 'bg-[#1b71d6]';
      case 2: return 'bg-[#0f4a99]';
      case 1: return 'bg-[#1d2b3b]';
      default: return 'bg-[#121820]'; // empty/dark
    }
  };

  return (
    <div className="mb-12">
      <div className="glass-panel p-6 border border-devshare-border/60 rounded-xl relative overflow-hidden">
        {/* Glow overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-devshare-blue/5 blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-devshare-blue" />
            <h3 className="font-bold text-white text-base">Contribution History</h3>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-devshare-text_secondary font-medium">
            <span>Less</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-[2px] bg-[#121820]" />
              <div className="w-3 h-3 rounded-[2px] bg-[#1d2b3b]" />
              <div className="w-3 h-3 rounded-[2px] bg-[#0f4a99]" />
              <div className="w-3 h-3 rounded-[2px] bg-[#1b71d6]" />
              <div className="w-3 h-3 rounded-[2px] bg-[#409dfd]" />
            </div>
            <span>More</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 relative z-10">
          <div className="flex gap-1.5 min-w-max">
            {graphData.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-1.5">
                {week.map((tier, dayIdx) => (
                  <motion.div
                    key={dayIdx}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (weekIdx * 0.02) + (dayIdx * 0.01) }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    className={`w-3.5 h-3.5 rounded-[2px] cursor-pointer hover:ring-2 hover:ring-white/20 transition-all ${getTierColor(tier)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

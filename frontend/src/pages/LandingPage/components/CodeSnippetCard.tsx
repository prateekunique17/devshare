import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, MoreHorizontal } from 'lucide-react';

export const CodeSnippetCard = () => {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-2xl mx-auto mt-16"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="glass-panel p-5"
      >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-devshare-blue/20 flex items-center justify-center text-devshare-blue font-bold">
            A
          </div>
          <div>
            <h4 className="font-semibold text-sm">@alex_dev</h4>
            <p className="text-xs text-devshare-text_secondary">Shared in Quick Drops • 3m ago</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold px-2 py-1 bg-[#1a2d21] text-[#4ade80] rounded">REACT</span>
          <MoreHorizontal className="w-5 h-5 text-devshare-text_secondary cursor-pointer" />
        </div>
      </div>

      <div className="bg-[#0b1016] rounded-md p-4 text-sm font-mono overflow-x-auto border border-devshare-border">
        <div className="text-[#8a9ab0] mb-2">// Authentication Hook with Glassmorphism</div>
        <div>
          <span className="text-[#ff7b72]">export</span> <span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">useAuth</span> = () <span className="text-[#ff7b72]">{"=>"}</span> {"{"}
        </div>
        <div className="pl-4">
          <span className="text-[#ff7b72]">const</span> [user, setUser] = <span className="text-[#d2a8ff]">useState</span>(<span className="text-[#79c0ff]">null</span>);
        </div>
        <div className="pl-4 mt-1">
          <span className="text-[#d2a8ff]">useEffect</span>(() <span className="text-[#ff7b72]">{"=>"}</span> {"{"}
        </div>
        <div className="pl-8 text-[#8a9ab0]">
          // Trigger community sparks on login
        </div>
        <div className="pl-8 text-[#d2a8ff]">
          handleSparkEffect();
        </div>
        <div className="pl-4">{"}, []);"}</div>
        <div>{"};"}</div>
      </div>

      <div className="flex items-center justify-between mt-4 text-xs font-medium text-devshare-text_secondary">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-devshare-blue transition-colors">
            <Sparkles className="w-4 h-4" /> 124 Sparks
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-devshare-text_primary transition-colors">
            <MessageSquare className="w-4 h-4" /> 18
          </div>
        </div>
        <button className="px-3 py-1.5 bg-devshare-blue/10 text-devshare-blue rounded hover:bg-devshare-blue/20 transition-colors">
          View Snippet
        </button>
      </div>
      </motion.div>
    </motion.div>
  );
};

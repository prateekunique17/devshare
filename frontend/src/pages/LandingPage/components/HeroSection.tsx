import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CodeSnippetCard } from './CodeSnippetCard';

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 min-h-screen flex flex-col items-center text-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-devshare-blue/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-devshare-blue/30 bg-devshare-blue/10 text-devshare-blue text-xs font-bold tracking-wider mb-8 uppercase"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-devshare-blue animate-pulse" />
        BETA ACCESS NOW OPEN
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
      >
        Where Code Meets <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-devshare-blue to-[#4ade80]">
          Community.
        </span>
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-devshare-text_secondary text-lg md:text-xl max-w-2xl mx-auto mb-10"
      >
        Share your projects, spark conversations, and grow with a global
        network of builders in a high-velocity social environment.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <Link to="/signup" className="w-full sm:w-auto px-8 py-3.5 bg-devshare-blue hover:bg-devshare-blue_hover text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02]">
          Join the Flow
        </Link>
        <button className="w-full sm:w-auto px-8 py-3.5 bg-devshare-panel border border-devshare-border hover:bg-devshare-panel_hover text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02]">
          Explore Feed
        </button>
      </motion.div>

      <CodeSnippetCard />
    </section>
  );
};

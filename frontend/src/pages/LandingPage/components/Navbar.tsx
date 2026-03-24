import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-devshare-bg/80 backdrop-blur-md border-b border-devshare-border"
    >
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-6 h-6 bg-devshare-blue rounded flex items-center justify-center text-xs font-black">{'</>'}</div>
          DEVSHARE
        </div>
        <div className="hidden md:flex gap-6 text-sm text-devshare-text_secondary font-medium">
          <a href="#" className="hover:text-devshare-text_primary transition-colors">Explore</a>
          <a href="#" className="hover:text-devshare-text_primary transition-colors">Community</a>
          <a href="#" className="hover:text-devshare-text_primary transition-colors">Features</a>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/login" className="text-sm font-medium text-devshare-text_secondary hover:text-devshare-text_primary transition-colors">Login</Link>
        <Link to="/signup" className="px-5 py-2 text-sm font-semibold bg-devshare-blue hover:bg-devshare-blue_hover text-white rounded-lg transition-colors">
          Join the Flow
        </Link>
      </div>
    </motion.nav>
  );
};

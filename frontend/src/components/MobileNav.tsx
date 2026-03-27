import { Home, Compass, FolderKanban, Bell, User, Menu, X, MessageSquare, Settings, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: FolderKanban, label: 'Projects', path: '/projects' },
  { icon: Bell, label: 'Alerts', path: '/notifications' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b1016] border-t border-devshare-border/60 px-2 py-2 flex items-center justify-around">
        {tabs.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link key={path} to={path}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${isActive ? 'text-devshare-blue' : 'text-devshare-text_secondary'}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'text-devshare-blue' : ''}`} />
              <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
            </Link>
          );
        })}
        {/* Hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-devshare-text_secondary"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[9px] font-bold uppercase tracking-wider">More</span>
        </button>
      </nav>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="md:hidden fixed right-0 top-0 bottom-0 w-72 bg-[#0b1016] border-l border-devshare-border z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-devshare-border/40">
                <span className="font-black text-white">Menu</span>
                <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-lg hover:bg-devshare-panel text-devshare-text_secondary hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {[
                  { icon: MessageSquare, label: 'Messages', path: '/messages', badge: '3' },
                  { icon: Settings, label: 'Settings', path: '/settings', badge: null },
                ].map(({ icon: Icon, label, path, badge }) => (
                  <Link key={path} to={path} onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                      location.pathname === path ? 'bg-devshare-blue/10 text-devshare-blue' : 'text-devshare-text_secondary hover:text-white hover:bg-devshare-panel_hover'
                    }`}>
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{label}</span>
                    {badge && <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-devshare-blue/20 text-devshare-blue">{badge}</span>}
                  </Link>
                ))}
              </div>

              {/* User Footer */}
              <div className="px-4 py-4 border-t border-devshare-border/40">
                <div className="flex items-center gap-3 p-3 mb-3">
                  <div className="relative">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4" alt="Alex"
                      className="w-10 h-10 rounded-full bg-[#fde1c3]" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0b1016] rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Alex Rivera</p>
                    <p className="text-xs text-devshare-text_secondary">Fullstack Dev</p>
                  </div>
                </div>
                <button
                  onClick={() => { setDrawerOpen(false); navigate('/login'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

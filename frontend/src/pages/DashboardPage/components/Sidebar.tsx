import { motion } from 'framer-motion';
import { Home, Compass, FolderKanban, MessageSquare, Bell, User, Settings, ChevronRight, LogOut, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard', badge: null },
  { icon: Compass, label: 'Explore', path: '/explore', badge: null },
  { icon: FolderKanban, label: 'Projects', path: '/projects', badge: '24' },
  { icon: MessageSquare, label: 'Messages', path: '/messages', badge: '3' },
  { icon: Bell, label: 'Notifications', path: '/notifications', badge: '12' },
  { icon: User, label: 'Profile', path: '/profile', badge: null },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex w-64 h-screen fixed left-0 top-0 border-r border-devshare-border bg-devshare-bg flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-devshare-border/50">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-devshare-blue to-blue-700 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-devshare-blue/30 group-hover:shadow-devshare-blue/50 transition-shadow">
            D
          </div>
          <div>
            <h1 className="font-black text-[15px] leading-tight tracking-tight">DevShare</h1>
            <p className="text-[9px] text-devshare-text_secondary uppercase tracking-[0.2em]">Dev Social Network</p>
          </div>
        </Link>
      </div>

      {/* New Project CTA */}
      <div className="px-4 py-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-devshare-blue/10 hover:bg-devshare-blue/20 border border-devshare-blue/30 text-devshare-blue rounded-xl text-sm font-bold transition-all"
        >
          <Sparkles className="w-4 h-4" />
          New Project
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <motion.div key={index} whileHover={{ x: 2 }}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-devshare-blue to-blue-600 text-white shadow-lg shadow-devshare-blue/20'
                    : 'text-devshare-text_secondary hover:text-white hover:bg-devshare-panel_hover'
                }`}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-devshare-blue/20 text-devshare-blue'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
              </Link>
            </motion.div>
          );
        })}

        <div className="pt-4 mt-4 border-t border-devshare-border/40 space-y-1">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm text-devshare-text_secondary hover:text-white hover:bg-devshare-panel_hover"
          >
            <Settings className="w-[18px] h-[18px]" />
            Settings
          </Link>
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className="px-4 py-4 border-t border-devshare-border/50">
        <div
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-devshare-panel_hover transition-colors cursor-pointer group"
        >
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-devshare-border bg-[#fde1c3]">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4" alt="Alex Rivera" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-devshare-bg rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold truncate group-hover:text-devshare-blue transition-colors">Alex Rivera</h4>
            <p className="text-xs text-devshare-text_secondary truncate">Fullstack Dev</p>
          </div>
          <LogOut className="w-4 h-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
};

import { Sidebar } from '../DashboardPage/components/Sidebar';
import { SearchHeader } from './components/SearchHeader';
import { TrendingStories } from './components/TrendingStories';
import { CommunityGems } from './components/CommunityGems';
import { RightPanel } from '../DashboardPage/components/RightPanel';
import { motion } from 'framer-motion';
import { MobileNav } from '../../components/MobileNav';

export const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter">
      <Sidebar />
      <MobileNav />
      <div className="md:ml-64 flex min-h-screen pb-16 md:pb-0 relative">
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 md:px-10 pb-20 border-r border-devshare-border">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SearchHeader />
            <TrendingStories />
            <CommunityGems />
          </motion.div>
        </main>
        
        <aside className="w-80 flex-shrink-0 relative hidden lg:block">
          <div className="fixed top-0 right-0 w-80 h-screen overflow-y-auto border-l border-devshare-border bg-devshare-bg z-20">
            <RightPanel />
          </div>
        </aside>
      </div>
    </div>
  );
};

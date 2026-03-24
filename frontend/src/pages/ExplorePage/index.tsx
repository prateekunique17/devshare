import { Sidebar } from '../DashboardPage/components/Sidebar';
import { SearchHeader } from './components/SearchHeader';
import { TrendingStories } from './components/TrendingStories';
import { CommunityGems } from './components/CommunityGems';
import { motion } from 'framer-motion';

export const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter">
      <Sidebar />
      <div className="ml-64 relative min-h-screen">
        <main className="max-w-5xl mx-auto px-10 pb-20">
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
      </div>
    </div>
  );
};

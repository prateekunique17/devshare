import { Sidebar } from '../DashboardPage/components/Sidebar';
import { ProfileHeader } from './components/ProfileHeader';
import { ContributionGraph } from './components/ContributionGraph';
import { TopProjects } from './components/TopProjects';
import { LatestCodeDrops } from './components/LatestCodeDrops';
import { ProfileRightPanel } from './components/ProfileRightPanel';
import { motion } from 'framer-motion';

export const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter">
      <Sidebar />
      <div className="ml-64 flex">
        <main className="flex-1 border-r border-devshare-border min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto px-10 pb-20"
          >
            <ProfileHeader />
            <ContributionGraph />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-devshare-border flex-1" />
              <div className="h-px bg-devshare-border flex-1" />
            </div>

            <TopProjects />
            <LatestCodeDrops />
          </motion.div>
        </main>

        <aside className="w-80 flex-shrink-0 relative hidden lg:block bg-[#0b1016]">
          <div className="fixed top-0 w-80 h-screen overflow-y-auto border-l border-devshare-border">
            <ProfileRightPanel />
          </div>
        </aside>
      </div>
    </div>
  );
};

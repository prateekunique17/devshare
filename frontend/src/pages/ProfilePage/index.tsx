import { Sidebar } from '../DashboardPage/components/Sidebar';
import { ProfileHeader } from './components/ProfileHeader';
import { ContributionGraph } from './components/ContributionGraph';
import { TopProjects } from './components/TopProjects';
import { LatestCodeDrops } from './components/LatestCodeDrops';
import { ProfileRightPanel } from './components/ProfileRightPanel';
import { motion } from 'framer-motion';
import { MobileNav } from '../../components/MobileNav';

export const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter">
      <Sidebar />
      <MobileNav />
      <div className="md:ml-64 flex-1 flex min-h-screen pb-16 md:pb-0 relative overflow-x-hidden">
        <main className="flex-1 border-r border-devshare-border min-h-screen overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 pb-20"
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
          <div className="fixed top-0 right-0 w-80 h-screen overflow-y-auto border-l border-devshare-border z-20">
            <ProfileRightPanel />
          </div>
        </aside>
      </div>
    </div>
  );
};

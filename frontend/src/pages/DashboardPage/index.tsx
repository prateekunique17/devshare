import { Sidebar } from './components/Sidebar';
import { MainFeed } from './components/MainFeed';
import { RightPanel } from './components/RightPanel';
import { MobileNav } from '../../components/MobileNav';

export const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter">
      <Sidebar />
      <MobileNav />
      <div className="md:ml-64 flex min-h-screen pb-16 md:pb-0 relative">
        <main className="flex-1 border-r border-devshare-border min-h-screen">
          <MainFeed />
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

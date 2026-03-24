import { Sidebar } from './components/Sidebar';
import { MainFeed } from './components/MainFeed';
import { RightPanel } from './components/RightPanel';

export const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter">
      <Sidebar />
      <div className="ml-64 flex">
        <main className="flex-1 border-r border-devshare-border min-h-screen">
          <MainFeed />
        </main>
        <aside className="w-80 flex-shrink-0 relative hidden lg:block">
          <div className="fixed top-0 w-80 h-screen overflow-y-auto border-l border-devshare-border bg-devshare-bg">
            <RightPanel />
          </div>
        </aside>
      </div>
    </div>
  );
};

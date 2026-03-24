import { Sidebar } from '../DashboardPage/components/Sidebar';
import { motion } from 'framer-motion';
import { ProjectList } from './components/ProjectList';
import { ProjectsRightPanel } from './components/ProjectsRightPanel';
import { Search, Plus } from 'lucide-react';
import { useState } from 'react';

const tabs = ['All Projects', 'In Progress', 'Completed'];

export const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('All Projects');

  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter">
      <Sidebar />
      <div className="ml-64 flex min-h-screen">
        {/* Main Content */}
        <main className="flex-1 border-r border-devshare-border min-h-screen flex flex-col">
          {/* Top Search Bar */}
          <div className="px-10 py-4 border-b border-devshare-border/40 bg-[#0d131a] flex items-center justify-between flex-shrink-0">
            <div className="relative group flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-devshare-text_secondary group-focus-within:text-devshare-blue transition-colors" />
              <input
                type="text"
                placeholder="Search projects, stacks, or users..."
                className="w-full bg-[#121820] border border-devshare-border/50 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-devshare-blue transition-all placeholder:text-devshare-text_secondary/50"
              />
            </div>
          </div>

          {/* Page Header */}
          <div className="px-10 pt-10 pb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-5xl font-black text-white leading-tight tracking-tight mb-3">Project Hub</h1>
                <p className="text-devshare-text_secondary text-[15px]">
                  Explore the frontier of community-driven development.<br />
                  Join ongoing builds or fork the next big thing.
                </p>
              </div>
              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mt-2">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                      activeTab === tab
                        ? 'bg-devshare-blue text-white shadow-lg shadow-devshare-blue/20'
                        : 'bg-transparent border border-devshare-border/60 text-devshare-text_secondary hover:text-white hover:border-devshare-border'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 px-10 pb-20"
          >
            <ProjectList activeFilter={activeTab} />
          </motion.div>

          {/* Footer */}
          <footer className="px-10 py-6 border-t border-devshare-border/30 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-devshare-text_secondary/60">
            <span>© 2024 Terminal Noir. Built by the Community.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">API</a>
              <a href="#" className="hover:text-white transition-colors">Status</a>
              <span className="flex items-center gap-2 text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Optimal
              </span>
            </div>
          </footer>
        </main>

        {/* Right Panel */}
        <aside className="w-72 flex-shrink-0 bg-[#0b1016] hidden lg:block">
          <div className="fixed top-0 w-72 h-screen overflow-y-auto border-l border-devshare-border">
            <ProjectsRightPanel />
          </div>
        </aside>
      </div>

      {/* Floating New Project Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-8 left-[13rem] -translate-x-1/2 flex items-center gap-2 bg-devshare-blue hover:bg-devshare-blue_hover text-white px-7 py-3.5 rounded-2xl font-bold shadow-2xl shadow-devshare-blue/30 transition-all z-50"
      >
        <Plus className="w-5 h-5" />
        NEW PROJECT
      </motion.button>
    </div>
  );
};

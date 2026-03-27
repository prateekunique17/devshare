import { Sidebar } from '../DashboardPage/components/Sidebar';
import { motion } from 'framer-motion';
import { ProjectList } from './components/ProjectList';
import { ProjectsRightPanel } from './components/ProjectsRightPanel';
import { Search, Plus } from 'lucide-react';
import { useState } from 'react';

import { MobileNav } from '../../components/MobileNav';

const tabs = ['All Projects', 'In Progress', 'Completed'];

export const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('All Projects');

  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter">
      <Sidebar />
      <MobileNav />
      <div className="md:ml-64 flex min-h-screen pb-16 md:pb-0">
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
          <div className="px-6 md:px-10 pt-10 pb-6">
            <div className="flex flex-col xl:flex-row items-start justify-between gap-6 mb-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3">Project Hub</h1>
                <p className="text-devshare-text_secondary text-[14px] md:text-[15px]">
                  Explore the frontier of community-driven development.<br className="hidden md:block" />
                  Join ongoing builds or fork the next big thing.
                </p>
              </div>
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 mt-2 w-full xl:w-auto">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 md:px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-1 sm:flex-none ${
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
            className="flex-1 px-6 md:px-10 pb-20"
          >
            <ProjectList activeFilter={activeTab} />
          </motion.div>

          {/* Footer */}
          <footer className="px-6 md:px-10 py-6 border-t border-devshare-border/30 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-widest text-devshare-text_secondary/60">
            <span className="text-center md:text-left">© 2024 Terminal Noir. Built by the Community.</span>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">API</a>
              <a href="#" className="hover:text-white transition-colors">Status</a>
              <span className="flex items-center gap-2 text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Optimal
              </span>
            </div>
          </footer>
        </main>

        {/* Right Panel */}
        <aside className="w-72 flex-shrink-0 bg-[#0b1016] hidden lg:block">
          <div className="fixed top-0 right-0 w-72 h-screen overflow-y-auto border-l border-devshare-border z-20">
            <ProjectsRightPanel />
          </div>
        </aside>
      </div>

      {/* Floating New Project Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-20 right-6 md:bottom-8 md:right-auto md:left-[17rem] md:translate-x-0 flex items-center gap-2 bg-devshare-blue hover:bg-devshare-blue_hover text-white px-5 md:px-7 py-3 md:py-3.5 rounded-full md:rounded-2xl font-bold shadow-2xl shadow-devshare-blue/30 transition-all z-50"
      >
        <Plus className="w-5 h-5 md:w-5 md:h-5 text-white" />
        <span className="hidden md:inline">NEW PROJECT</span>
      </motion.button>
    </div>
  );
};

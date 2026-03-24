import { Sidebar } from '../DashboardPage/components/Sidebar';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { settingsSections } from './data';
import { SecurityPanel } from './panels/SecurityPanel';
import { AccountPrivacyPanel } from './panels/AccountPrivacyPanel';
import {
  LanguagePanel, TagsMentionsPanel, BlockedPanel, MutedPanel,
  NotificationsSettingsPanel, CommentsPanel, LikesSharesPanel,
  WhoCanViewPanel, ManageAccountPanel, InterestedTechPanel,
  AppearancePanel, SessionsPanel,
} from './panels/OtherPanels';

const panelMap: Record<string, React.FC> = {
  'language': LanguagePanel,
  'security': SecurityPanel,
  'account-privacy': AccountPrivacyPanel,
  'tags-mentions': TagsMentionsPanel,
  'blocked': BlockedPanel,
  'muted': MutedPanel,
  'notifications': NotificationsSettingsPanel,
  'comments': CommentsPanel,
  'likes-shares': LikesSharesPanel,
  'who-can-view': WhoCanViewPanel,
  'manage-account': ManageAccountPanel,
  'interested-tech': InterestedTechPanel,
  'appearance': AppearancePanel,
  'sessions': SessionsPanel,
};

export const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('account-privacy');
  const ActivePanel = panelMap[activeSection] || AccountPrivacyPanel;

  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter">
      <Sidebar />
      <div className="ml-64 flex min-h-screen">
        {/* Settings Navigation */}
        <aside className="w-64 border-r border-devshare-border bg-[#0b1016] flex-shrink-0">
          <div className="fixed top-0 w-64 h-screen overflow-y-auto">
            <div className="p-6 pb-3">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-devshare-text_secondary">
                Account Configuration
              </h3>
            </div>
            <nav className="px-3 pb-10 space-y-0.5">
              {settingsSections.map((section) => {
                const isActive = activeSection === section.id;
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                      isActive
                        ? 'bg-devshare-blue/10 text-devshare-blue border-l-2 border-devshare-blue'
                        : 'text-devshare-text_secondary hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Active Panel */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto px-10 py-10"
          >
            <ActivePanel />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

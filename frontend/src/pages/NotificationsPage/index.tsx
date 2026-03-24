import { Sidebar } from '../DashboardPage/components/Sidebar';
import { motion } from 'framer-motion';
import { Zap, UserPlus, AtSign, MessageCircle, Sparkles, RotateCcw } from 'lucide-react';
import { notificationsList, notificationTabs } from './data';
import { useState } from 'react';

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'spark':
      return <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 border-2 border-[#121820] rounded-full flex items-center justify-center"><Zap className="w-3 h-3 text-white fill-white" /></div>;
    case 'follow':
      return <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-500 border-2 border-[#121820] rounded-full flex items-center justify-center"><UserPlus className="w-3 h-3 text-white" /></div>;
    case 'mention':
      return <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-[#121820] rounded-full flex items-center justify-center"><AtSign className="w-3 h-3 text-white" /></div>;
    case 'comment':
      return <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-400 border-2 border-[#121820] rounded-full flex items-center justify-center"><MessageCircle className="w-3 h-3 text-white fill-white" /></div>;
    default:
      return null;
  }
};

export const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter">
      <Sidebar />
      <div className="ml-64 flex justify-center">
        <main className="w-full max-w-4xl px-8 py-10 min-h-screen flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-white mb-2">Notifications</h1>
              <p className="text-devshare-text_secondary text-sm">Stay updated with your community activity</p>
            </div>
            <button className="text-sm font-bold text-devshare-blue hover:text-devshare-blue_hover transition-colors">
              Mark all as read
            </button>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#1c2431] p-1 rounded-xl w-fit mb-8 border border-devshare-border/50">
            {notificationTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-devshare-blue text-white shadow-lg shadow-devshare-blue/20'
                    : 'text-devshare-text_secondary hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-4 flex-1">
            {notificationsList.map((notif, i) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative p-5 rounded-2xl border ${
                  notif.unread ? 'bg-[#121820] border-devshare-border/80' : 'bg-[#0f141b] border-devshare-border/40'
                } hover:border-devshare-border transition-colors group flex items-start sm:items-center justify-between gap-4`}
              >
                {/* Unread Indicator Bar */}
                {notif.unread && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-devshare-blue rounded-r-full" />
                )}

                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {notif.type === 'system' ? (
                      <div className="w-12 h-12 rounded-full bg-blue-500 border border-blue-400 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#fde1c3]">
                        <img src={notif.avatar!} alt={notif.user} className="w-full h-full rounded-full object-cover" />
                      </div>
                    )}
                    <NotificationIcon type={notif.type} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 mt-0.5">
                    <p className="text-sm leading-relaxed mb-1">
                      <span className="font-bold text-white">{notif.user}</span>{' '}
                      <span className="text-devshare-text_secondary">{notif.action}</span>{' '}
                      {notif.target && (
                        <span className={`font-medium ${notif.type === 'mention' ? 'text-devshare-blue hover:underline cursor-pointer' : 'text-devshare-text_secondary italic'}`}>
                          {notif.target}
                        </span>
                      )}{' '}
                      <span className="text-devshare-text_secondary">{notif.targetSuffix}</span>
                    </p>

                    {notif.quote && (
                      <div className="mt-3 p-3 rounded-lg border border-devshare-border/40 bg-black/20 text-xs text-devshare-text_secondary italic">
                        {notif.quote}
                      </div>
                    )}

                    {notif.details && (
                      <p className="text-xs text-devshare-text_secondary/80 mt-1">{notif.details}</p>
                    )}

                    {notif.showActionButtons && (
                      <div className="flex items-center gap-2 mt-3">
                        <button className="px-4 py-1.5 bg-devshare-panel/80 hover:bg-devshare-panel border border-devshare-border text-white text-xs font-bold rounded-lg transition-colors">
                          Reply
                        </button>
                        <button className="px-4 py-1.5 bg-devshare-panel/80 hover:bg-devshare-panel border border-devshare-border text-white text-xs font-bold rounded-lg transition-colors">
                          View Discussion
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side interactions / time */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0 ml-4">
                  {notif.showFollowButton && (
                    <button className="px-5 py-2 bg-devshare-blue hover:bg-devshare-blue_hover text-white text-xs font-bold rounded-lg transition-colors">
                      Follow back
                    </button>
                  )}
                  {notif.time && (
                    <span className="text-[11px] text-devshare-text_secondary/70 font-medium whitespace-nowrap">
                      {notif.time}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}

            <button className="w-full flex items-center justify-center gap-2 py-6 text-sm font-semibold text-devshare-text_secondary hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" /> View older activity
            </button>
          </div>

          {/* Site Footer */}
          <footer className="mt-12 pt-8 border-t border-devshare-border/30 flex items-center justify-between text-xs font-medium text-devshare-text_secondary">
            <div className="flex items-center gap-2">
              <span className="w-4 h-3 bg-devshare-border rounded flex items-center justify-center text-[8px] font-black text-white">D</span>
              <span>© 2024 DevShare Inc.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Changelog</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

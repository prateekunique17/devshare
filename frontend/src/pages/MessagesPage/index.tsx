import { Sidebar } from '../DashboardPage/components/Sidebar';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Edit, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import { conversations, activeChatHistory } from './data';
import { useState } from 'react';

export const MessagesPage = () => {
  const [activeChatId, setActiveChatId] = useState(1);
  const activeUser = conversations.find(c => c.id === activeChatId);

  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter">
      <Sidebar />
      <div className="ml-64 flex h-screen overflow-hidden">
        {/* Messages List Sidebar */}
        <aside className="w-80 border-r border-devshare-border bg-[#0b1016] flex flex-col h-full flex-shrink-0">
          <div className="p-6 border-b border-devshare-border/40">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black text-white">Messages</h1>
              <button className="p-2 bg-devshare-blue/10 text-devshare-blue rounded-lg hover:bg-devshare-blue hover:text-white transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-devshare-text_secondary group-focus-within:text-devshare-blue transition-colors" />
              <input 
                type="text" 
                placeholder="Search messages..."
                className="w-full bg-[#121820] border border-devshare-border/50 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-devshare-blue focus:shadow-[0_0_10px_rgba(37,157,244,0.1)] transition-all placeholder:text-devshare-text_secondary/50"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-devshare-border/50">
            {conversations.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`p-4 flex items-center gap-4 cursor-pointer border-b border-devshare-border/20 transition-all ${
                  activeChatId === chat.id 
                    ? 'bg-devshare-blue/5 border-l-2 border-l-devshare-blue' 
                    : 'hover:bg-white/5 border-l-2 border-l-transparent'
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#fde1c3]">
                    <img src={chat.avatar} alt={chat.user} className="w-full h-full object-cover" />
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#0b1016] rounded-full" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-sm font-bold truncate ${activeChatId === chat.id ? 'text-white' : 'text-devshare-text_primary'}`}>
                      {chat.user}
                    </h3>
                    <span className={`text-[10px] whitespace-nowrap ml-2 ${chat.unread > 0 ? 'text-devshare-blue font-bold' : 'text-devshare-text_secondary'}`}>
                      {chat.time}
                    </span>
                  </div>
                  <p className={`text-xs truncate ${chat.unread > 0 ? 'text-white font-medium' : 'text-devshare-text_secondary'}`}>
                    {chat.lastMessage}
                  </p>
                </div>

                {chat.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-devshare-blue text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 shadow-lg shadow-devshare-blue/20">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Active Chat Area */}
        {activeUser ? (
          <main className="flex-1 flex flex-col bg-devshare-bg relative h-full">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-devshare-border/40 bg-[#0d131a] flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#fde1c3]">
                  <img src={activeUser.avatar} alt={activeUser.user} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white leading-tight">{activeUser.user}</h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className={`w-2 h-2 rounded-full ${activeUser.online ? 'bg-green-500' : 'bg-devshare-text_secondary'}`} />
                    <span className="text-xs text-devshare-text_secondary">
                      {activeUser.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-devshare-text_secondary">
                <button className="p-2 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-devshare-border mx-1" />
                <button className="p-2 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="text-center text-xs text-devshare-text_secondary/80 font-medium my-6">
                Today
              </div>
              
              {activeChatHistory.map((msg, i) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!msg.isMe && (
                     <img src={activeUser.avatar} alt={activeUser.user} className="w-8 h-8 rounded-full bg-[#fde1c3] mr-3 mt-auto mb-1" />
                  )}
                  <div className={`max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-5 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                      msg.isMe 
                        ? 'bg-devshare-blue text-white rounded-br-sm' 
                        : 'bg-[#1a2332] text-white border border-devshare-border/40 rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-devshare-text_secondary px-1">{msg.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-devshare-border/40 bg-[#0d131a] flex-shrink-0">
               <div className="relative flex items-center group">
                 <button className="absolute left-3 p-2 text-devshare-text_secondary hover:text-white transition-colors">
                   <Paperclip className="w-5 h-5" />
                 </button>
                 <input 
                   type="text" 
                   placeholder={`Message ${activeUser.user}...`}
                   className="w-full bg-[#121820] border border-devshare-border/60 rounded-xl py-3.5 pl-14 pr-16 text-sm text-white focus:outline-none focus:border-devshare-blue focus:shadow-[0_0_15px_rgba(37,157,244,0.1)] transition-all placeholder:text-devshare-text_secondary/50"
                 />
                 <button className="absolute right-2 p-2 bg-devshare-blue hover:bg-devshare-blue_hover text-white rounded-lg transition-all shadow-lg shadow-devshare-blue/20">
                   <Send className="w-4 h-4 ml-0.5" />
                 </button>
               </div>
            </div>
          </main>
        ) : (
          <main className="flex-1 flex flex-col items-center justify-center bg-devshare-bg relative">
            <div className="text-center">
              <div className="w-16 h-16 bg-devshare-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-devshare-blue/20">
                  <MessageSquare className="w-8 h-8 text-devshare-blue" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Your Messages</h2>
              <p className="text-sm text-devshare-text_secondary max-w-sm">
                Select a conversation from the left to start chatting, or jump into a new direct message.
              </p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

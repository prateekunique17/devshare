

export const ProfileHeader = () => {
  return (
    <div className="mb-10 pt-6">
      <div className="flex items-start gap-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-devshare-blue/30 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-devshare-blue/40 to-transparent z-10 mix-blend-overlay" />
             <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4" alt="Alex Rivero" className="w-full h-full object-cover relative z-0" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 border-[3px] border-[#0b1016] rounded-full z-20" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-black tracking-tight text-white leading-none">Alex</h1>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-black tracking-tight text-white leading-none">Rivero</h1>
                <span className="px-2 py-0.5 mt-1 bg-devshare-blue/10 border border-devshare-blue/30 text-devshare-blue text-[10px] font-bold rounded uppercase tracking-wider">
                  Pro Member
                </span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-1">
              <button className="px-5 py-2.5 bg-transparent border border-devshare-border hover:bg-devshare-panel_hover text-white text-sm font-bold rounded-xl transition-colors">
                Edit Profile
              </button>
              <button className="px-6 py-2.5 bg-devshare-blue hover:bg-devshare-blue_hover text-white text-sm font-bold rounded-xl shadow-lg shadow-devshare-blue/20 transition-all">
                Share
              </button>
            </div>
          </div>

          <div className="text-[15px] text-devshare-text_secondary leading-relaxed max-w-sm mb-6">
            <p>Full-stack Engineer |</p>
            <p>OSS Contributor.</p>
            <p>Building the future of</p>
            <p>the web with terminal-</p>
            <p>chic aesthetics and</p>
            <p>high-performance</p>
            <p>React architectures.</p>
          </div>

          <div className="flex items-center gap-8">
            <div>
              <p className="text-xl font-black text-white leading-none mb-1">1.2k</p>
              <p className="text-[10px] font-bold text-devshare-text_secondary uppercase tracking-widest">Followers</p>
            </div>
            <div>
              <p className="text-xl font-black text-white leading-none mb-1">450</p>
              <p className="text-[10px] font-bold text-devshare-text_secondary uppercase tracking-widest">Following</p>
            </div>
            <div>
              <p className="text-xl font-black text-white leading-none mb-1">89</p>
              <p className="text-[10px] font-bold text-devshare-text_secondary uppercase tracking-widest">Stars</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

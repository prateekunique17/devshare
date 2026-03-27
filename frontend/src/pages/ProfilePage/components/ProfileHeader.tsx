

export const ProfileHeader = () => {
  return (
    <div className="mb-10 pt-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        <div className="relative mb-4 md:mb-0">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-devshare-blue/30 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-devshare-blue/40 to-transparent z-10 mix-blend-overlay" />
             <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4" alt="Alex Rivero" className="w-full h-full object-cover relative z-0" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 border-[3px] border-[#0b1016] rounded-full z-20" />
        </div>
        
        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex flex-col xl:flex-row items-center md:items-start justify-between gap-6 mb-4">
            <div>
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-1">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none">Alex Rivero</h1>
                <span className="px-2 py-0.5 mt-1 bg-devshare-blue/10 border border-devshare-blue/30 text-devshare-blue text-[10px] font-bold rounded uppercase tracking-wider">
                  Pro Member
                </span>
              </div>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto justify-center md:justify-start">
              <button className="flex-1 sm:flex-none px-4 md:px-5 py-2 md:py-2.5 bg-transparent border border-devshare-border hover:bg-devshare-panel_hover text-white text-xs md:text-sm font-bold rounded-xl transition-colors">
                Edit Profile
              </button>
              <button className="flex-1 sm:flex-none px-5 md:px-6 py-2 md:py-2.5 bg-devshare-blue hover:bg-devshare-blue_hover text-white text-xs md:text-sm font-bold rounded-xl shadow-lg shadow-devshare-blue/20 transition-all">
                Share
              </button>
            </div>
          </div>

          <div className="text-sm md:text-[15px] text-devshare-text_secondary leading-relaxed max-w-sm mx-auto md:mx-0 mb-6">
            <p>Full-stack Engineer | OSS Contributor.</p>
            <p>Building the future of the web with terminal-chic aesthetics and high-performance React architectures.</p>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-8">
            <div className="text-center md:text-left">
              <p className="text-xl font-black text-white leading-none mb-1">1.2k</p>
              <p className="text-[10px] font-bold text-devshare-text_secondary uppercase tracking-widest">Followers</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xl font-black text-white leading-none mb-1">450</p>
              <p className="text-[10px] font-bold text-devshare-text_secondary uppercase tracking-widest">Following</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xl font-black text-white leading-none mb-1">89</p>
              <p className="text-[10px] font-bold text-devshare-text_secondary uppercase tracking-widest">Stars</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

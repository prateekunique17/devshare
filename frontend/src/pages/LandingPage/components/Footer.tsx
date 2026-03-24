export const Footer = () => {
  return (
    <footer className="py-8 px-8 border-t border-devshare-border bg-devshare-bg flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-devshare-text_secondary">
      <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-white">
        <div className="w-5 h-5 bg-devshare-blue rounded flex items-center justify-center text-[10px] font-black">{'</>'}</div>
        DEVSHARE
      </div>
      
      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Github</a>
        <a href="#" className="hover:text-white transition-colors">Discord</a>
      </div>

      <div>
        © 2026 DevShare Inc. All rights reserved.
      </div>
    </footer>
  );
};

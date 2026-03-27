import { LoginForm } from './components/LoginForm';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-devshare-bg flex flex-col font-inter selection:bg-devshare-blue/30 selection:text-white relative overflow-hidden">
      {/* Header */}
      <header className="px-4 md:px-8 py-6 flex items-center justify-between z-10">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-devshare-blue transition-colors">
          <div className="w-6 h-6 bg-devshare-blue rounded flex items-center justify-center text-xs font-black text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 18H4V6H20V18ZM11.5 9.5L9 7L5 12L9 17L11.5 14.5L9 12L11.5 9.5ZM13 14.5L15.5 17L19.5 12L15.5 7L13 9.5L15.5 12L13 14.5Z" fill="currentColor"/>
            </svg>
          </div>
          DevShare
        </Link>
        <div className="text-sm font-medium">
          <a href="#" className="text-white hover:text-devshare-blue transition-colors">
            Documentation
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10 w-full">
        <div className="w-full max-w-[480px]">
          <LoginForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-devshare-text_secondary relative z-10">
        <div className="flex items-center gap-6 mb-4 md:mb-0">
          <span>© 2024 DevShare Inc.</span>
          <a href="#" className="hover:text-white transition-colors">Status</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </footer>

      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-devshare-blue/[0.02] blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

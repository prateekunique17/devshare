import { motion } from 'framer-motion';
import { SignupForm } from './components/SignupForm';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export const SignupPage = () => {
  return (
    <div className="min-h-screen bg-devshare-bg flex flex-col font-inter selection:bg-devshare-blue/30 selection:text-white">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between z-10">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-devshare-blue transition-colors">
          <div className="w-6 h-6 bg-devshare-blue rounded flex items-center justify-center text-xs font-black text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 18H4V6H20V18ZM11.5 9.5L9 7L5 12L9 17L11.5 14.5L9 12L11.5 9.5ZM13 14.5L15.5 17L19.5 12L15.5 7L13 9.5L15.5 12L13 14.5Z" fill="currentColor"/>
            </svg>
          </div>
          DevShare
        </Link>
        <div className="text-sm text-devshare-text_secondary font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-devshare-blue font-semibold hover:text-devshare-blue_hover transition-colors px-4 border border-devshare-blue rounded-md py-2 ml-2">
            Log In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center px-4 md:px-8 relative z-10">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8 max-w-lg"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                Create your<br />
                <span className="text-devshare-blue">developer</span><br />
                account
              </h1>
              <p className="text-xl text-devshare-text_secondary leading-relaxed font-medium">
                Join 8.4k developers building the future. Collaborate on projects, share snippets, and grow your career.
              </p>
            </div>

            <ul className="space-y-5">
              {[
                "Direct connection with open-source leaders",
                "Early access to DevShare Cloud Beta",
                "Weekly curated developer resources"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-white font-medium">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-devshare-blue flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  {text}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <div className="flex items-center mb-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-devshare-bg overflow-hidden bg-devshare-panel flex items-center justify-center z-10">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=dev${i}&backgroundColor=e5e7eb`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-devshare-bg overflow-hidden bg-devshare-blue flex items-center justify-center text-white text-xs font-bold z-10 z-[11] relative">
                    +8.4k
                  </div>
                </div>
              </div>
              <p className="text-devshare-text_secondary italic text-sm">
                "The most active dev community I've ever joined." <span className="text-white not-italic">— Sarah J.</span>
              </p>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px]">
              <SignupForm />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-devshare-text_secondary font-medium relative z-10">
        © 2024 DevShare Inc. Made with <span className="text-devshare-blue">love</span> by developers for developers.
      </footer>

      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-devshare-blue/[0.03] blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

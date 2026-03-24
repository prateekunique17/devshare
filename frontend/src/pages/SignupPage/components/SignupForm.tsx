import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Github, Eye, EyeOff, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribe, setSubscribe] = useState(true);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-devshare-panel border border-devshare-border rounded-2xl p-6 sm:p-8 w-full shadow-2xl"
    >
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 py-2.5 bg-transparent border border-devshare-border hover:border-devshare-text_secondary text-white rounded-lg font-semibold text-sm transition-colors"
        >
          <Github className="w-5 h-5" />
          GitHub
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-gray-100 text-black rounded-lg font-semibold text-sm transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </motion.button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-devshare-border flex-1" />
        <span className="text-[10px] text-devshare-text_secondary font-bold tracking-widest uppercase">OR EMAIL SIGNUP</span>
        <div className="h-px bg-devshare-border flex-1" />
      </div>

      <form className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-white block">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-devshare-text_secondary" />
            <input 
              type="text" 
              placeholder="DevWizard99"
              className="w-full bg-[#0B1016] border border-devshare-border rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors placeholder:text-devshare-text_secondary/50 [&:-webkit-autofill]:[transition-delay:9999s] [&:-webkit-autofill]:[-webkit-text-fill-color:white] shadow-[0_0_0_1000px_#0B1016_inset]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-white block">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-devshare-text_secondary" />
            <input 
              type="email" 
              placeholder="you@example.com"
              className="w-full bg-[#0B1016] border border-devshare-border rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors placeholder:text-devshare-text_secondary/50 [&:-webkit-autofill]:[transition-delay:9999s] [&:-webkit-autofill]:[-webkit-text-fill-color:white] shadow-[0_0_0_1000px_#0B1016_inset]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-white block">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-devshare-text_secondary" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••"
              className="w-full bg-[#0B1016] border border-devshare-border rounded-lg py-3 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors placeholder:text-devshare-text_secondary/50 [&:-webkit-autofill]:[transition-delay:9999s] shadow-[0_0_0_1000px_#0B1016_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-devshare-text_secondary hover:text-white transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); setAgreeTerms(!agreeTerms); }}>
            <div className={`relative flex-shrink-0 w-5 h-5 mt-0.5 rounded border transition-colors flex items-center justify-center ${agreeTerms ? 'bg-devshare-blue border-devshare-blue' : 'bg-devshare-bg border-devshare-border group-hover:border-devshare-text_secondary'}`}>
              {agreeTerms && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </div>
            <span className="text-sm text-devshare-text_secondary">
              I agree to the <a href="#" className="text-devshare-blue hover:text-devshare-blue_hover transition-colors">Terms of Service</a> and <a href="#" className="text-devshare-blue hover:text-devshare-blue_hover transition-colors">Privacy Policy</a>.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); setSubscribe(!subscribe); }}>
            <div className={`relative flex-shrink-0 w-5 h-5 mt-0.5 rounded border transition-colors flex items-center justify-center ${subscribe ? 'bg-devshare-blue border-devshare-blue' : 'bg-devshare-bg border-devshare-border group-hover:border-devshare-text_secondary'}`}>
              {subscribe && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </div>
            <span className="text-sm text-devshare-text_secondary">
              Send me occasional product updates and developer tips (Unsubscribe anytime).
            </span>
          </label>
        </div>

        <Link to="/dashboard" className="block w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-devshare-blue hover:bg-devshare-blue_hover text-white rounded-lg font-bold text-[15px] transition-colors mt-6 shadow-[0_0_20px_rgba(37,157,244,0.3)]"
          >
            Create Account
          </motion.button>
        </Link>
      </form>
    </motion.div>
  );
};

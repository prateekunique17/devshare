import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Github, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-devshare-panel border border-devshare-border rounded-2xl p-6 sm:p-10 w-full shadow-2xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-devshare-text_secondary text-[15px]">Continue your developer journey</p>
      </div>

      <form className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white block">Email or Username</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-devshare-text_secondary" />
            <input 
              type="text" 
              placeholder="name@company.com"
              className="w-full bg-[#0B1016] border border-devshare-border rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors placeholder:text-devshare-text_secondary/50 [&:-webkit-autofill]:[transition-delay:9999s] shadow-[0_0_0_1000px_#0B1016_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-white block">Password</label>
            <a href="#" className="text-sm font-medium text-devshare-blue hover:text-devshare-blue_hover transition-colors">
              Forgot?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-devshare-text_secondary" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••"
              className="w-full bg-[#0B1016] border border-devshare-border rounded-lg py-3 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors placeholder:text-devshare-text_secondary/50 tracking-widest [&:-webkit-autofill]:[transition-delay:9999s] shadow-[0_0_0_1000px_#0B1016_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-devshare-text_secondary hover:text-white transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="pt-1">
          <label className="flex items-center gap-3 cursor-pointer group w-fit" onClick={(e) => { e.preventDefault(); setRememberMe(!rememberMe); }}>
            <div className={`relative flex-shrink-0 w-[18px] h-[18px] rounded border transition-colors flex items-center justify-center ${rememberMe ? 'bg-devshare-blue border-devshare-blue' : 'bg-devshare-bg border-devshare-border group-hover:border-devshare-text_secondary'}`}>
              {rememberMe && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            <span className="text-[13px] font-medium text-devshare-text_secondary group-hover:text-white transition-colors">
              Remember me for 30 days
            </span>
          </label>
        </div>

        <Link to="/dashboard" className="block w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-devshare-blue hover:bg-devshare-blue_hover text-white rounded-lg font-bold text-[15px] transition-colors mt-6 shadow-[0_0_20px_rgba(37,157,244,0.3)]"
          >
            Sign In
          </motion.button>
        </Link>
      </form>

      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-devshare-border flex-1" />
        <span className="text-[10px] text-devshare-text_secondary font-bold tracking-widest uppercase">OR CONTINUE WITH</span>
        <div className="h-px bg-devshare-border flex-1" />
      </div>

      {/* Reduced to just 2 buttons: GitHub and Google */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center p-3 sm:p-4 bg-transparent border border-devshare-border hover:border-devshare-text_secondary transition-colors rounded-xl"
        >
          <Github className="w-6 h-6 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center p-3 sm:p-4 bg-transparent border border-devshare-border hover:border-devshare-text_secondary transition-colors rounded-xl"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </motion.button>
      </div>

      <div className="text-center text-[13px] font-medium text-devshare-text_secondary">
        Don't have an account?{' '}
        <Link to="/signup" className="text-devshare-blue hover:text-devshare-blue_hover transition-colors font-bold">
          Sign up for free
        </Link>
      </div>
    </motion.div>
  );
};

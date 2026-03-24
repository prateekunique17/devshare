import { useState } from 'react';
import { Save, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export const AccountPrivacyPanel = () => {
  const [username, setUsername] = useState('alex_dev_noir');
  const [fullName, setFullName] = useState('Alex Rivera');
  const [bio, setBio] = useState('Full-stack architect. Obsessed with low-latency systems and terminal aesthetics. Building the future of DevShare interfaces.');

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-black text-white mb-1">Account Privacy</h2>
          <p className="text-sm text-devshare-text_secondary">Control your profile information and visibility.</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-devshare-blue hover:bg-devshare-blue_hover text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-devshare-blue/20 transition-all">
          <Save className="w-4 h-4" /> Save Changes
        </motion.button>
      </div>

      {/* Avatar + Banner */}
      <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-devshare-blue/30 to-blue-900/30" />
        <div className="px-6 pb-6 -mt-10">
          <div className="relative w-20 h-20 group">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4" alt="Avatar"
              className="w-20 h-20 rounded-2xl border-4 border-[#0f141b] bg-[#fde1c3]" />
            <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-devshare-text_secondary block mb-3">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#0f141b] border border-devshare-border/60 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-devshare-blue transition-all" />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-devshare-text_secondary block mb-3">Full Name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-[#0f141b] border border-devshare-border/60 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-devshare-blue transition-all" />
        </div>
        <div className="lg:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-devshare-text_secondary block mb-3">Bio / Identity</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
            className="w-full bg-[#0f141b] border border-devshare-border/60 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-devshare-blue transition-all resize-none leading-relaxed" />
        </div>
      </div>

      {/* Privacy Toggles */}
      <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6 space-y-5">
        <h3 className="font-bold text-white mb-2">Privacy Controls</h3>
        {[
          { label: 'Make profile private', desc: 'Only approved followers can see your posts', default: false },
          { label: 'Show online status', desc: 'Let others see when you are active', default: true },
          { label: 'Show activity status', desc: 'Display your recent actions on your profile', default: true },
          { label: 'Allow search engines to index profile', desc: 'Your profile may appear in Google search results', default: false },
        ].map((toggle, i) => (
          <ToggleRow key={i} label={toggle.label} desc={toggle.desc} defaultOn={toggle.default} />
        ))}
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-red-400 mb-1">Archive Account</h4>
          <p className="text-xs text-devshare-text_secondary">Temporarily disable your profile and developer node.</p>
        </div>
        <button className="px-5 py-2.5 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white font-bold text-xs rounded-xl transition-all uppercase tracking-wider">
          Archive
        </button>
      </div>
    </div>
  );
};

const ToggleRow = ({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-[11px] text-devshare-text_secondary">{desc}</p>
      </div>
      <button onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full relative transition-colors ${on ? 'bg-devshare-blue' : 'bg-devshare-border'}`}>
        <div className={`w-4.5 h-4.5 w-[18px] h-[18px] bg-white rounded-full absolute top-[3px] transition-all shadow-sm ${on ? 'left-[22px]' : 'left-[3px]'}`} />
      </button>
    </div>
  );
};

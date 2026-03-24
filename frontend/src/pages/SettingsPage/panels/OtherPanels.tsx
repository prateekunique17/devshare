import { useState } from 'react';
import { languages, blockedAccounts, mutedAccounts, activeSessions, interestedTech } from '../data';
import { X, Monitor, Smartphone } from 'lucide-react';

/* ========== LANGUAGE ========== */
export const LanguagePanel = () => {
  const [selected, setSelected] = useState('English (US)');
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">Language</h2>
        <p className="text-sm text-devshare-text_secondary">Choose your preferred language for DevShare.</p>
      </div>
      <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6">
        <div className="grid grid-cols-2 gap-3">
          {languages.map(lang => (
            <button key={lang} onClick={() => setSelected(lang)}
              className={`p-3 rounded-xl text-sm font-semibold text-left transition-all ${selected === lang ? 'bg-devshare-blue/10 border border-devshare-blue text-devshare-blue' : 'bg-devshare-bg border border-devshare-border/50 text-devshare-text_secondary hover:text-white hover:border-devshare-text_secondary/50'}`}>
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ========== TAGS & MENTIONS ========== */
export const TagsMentionsPanel = () => {
  const [allowTags, setAllowTags] = useState('everyone');
  const [allowMentions, setAllowMentions] = useState('followers');
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">Tags & Mentions</h2>
        <p className="text-sm text-devshare-text_secondary">Control who can tag or mention you in posts and comments.</p>
      </div>
      <OptionGroup title="Who can tag you" value={allowTags} onChange={setAllowTags} options={['everyone', 'followers', 'nobody']} />
      <OptionGroup title="Who can @mention you" value={allowMentions} onChange={setAllowMentions} options={['everyone', 'followers', 'nobody']} />
    </div>
  );
};

/* ========== BLOCKED ========== */
export const BlockedPanel = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-black text-white mb-1">Blocked Accounts</h2>
      <p className="text-sm text-devshare-text_secondary">Users you have blocked will not be able to find or interact with you.</p>
    </div>
    <div className="space-y-3">
      {blockedAccounts.map(acc => (
        <div key={acc.handle} className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={acc.avatar} alt={acc.name} className="w-10 h-10 rounded-full bg-[#fde1c3]" />
            <div>
              <p className="text-sm font-bold text-white">{acc.name}</p>
              <p className="text-[11px] text-devshare-text_secondary">{acc.handle} · Blocked {acc.blockedAt}</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-devshare-border text-xs font-bold text-devshare-text_secondary hover:text-white hover:border-white rounded-xl transition-colors">Unblock</button>
        </div>
      ))}
      {blockedAccounts.length === 0 && <EmptyState text="No blocked accounts." />}
    </div>
  </div>
);

/* ========== MUTED ========== */
export const MutedPanel = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-black text-white mb-1">Muted Accounts</h2>
      <p className="text-sm text-devshare-text_secondary">Muted users will not appear in your feed. They won't be notified.</p>
    </div>
    <div className="space-y-3">
      {mutedAccounts.map(acc => (
        <div key={acc.handle} className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={acc.avatar} alt={acc.name} className="w-10 h-10 rounded-full bg-[#fde1c3]" />
            <div>
              <p className="text-sm font-bold text-white">{acc.name}</p>
              <p className="text-[11px] text-devshare-text_secondary">{acc.handle} · Muted {acc.mutedAt}</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-devshare-border text-xs font-bold text-devshare-text_secondary hover:text-white hover:border-white rounded-xl transition-colors">Unmute</button>
        </div>
      ))}
    </div>
  </div>
);

/* ========== NOTIFICATIONS ========== */
export const NotificationsSettingsPanel = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-black text-white mb-1">Notification Settings</h2>
      <p className="text-sm text-devshare-text_secondary">Customize how and when you receive notifications.</p>
    </div>
    <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6 space-y-5">
      {[
        { label: 'Push Notifications', desc: 'Receive push notifications on your device', def: true },
        { label: 'Email Notifications', desc: 'Get notified about important updates via email', def: true },
        { label: 'New Followers', desc: 'When someone follows you', def: true },
        { label: 'Likes on your code drops', desc: 'When someone sparks your code', def: true },
        { label: 'Comments & Replies', desc: 'When someone comments on your posts', def: true },
        { label: 'Mentions', desc: 'When you are @mentioned in a post or comment', def: true },
        { label: 'Project Updates', desc: 'Updates from projects you are watching', def: false },
        { label: 'Weekly Digest', desc: 'A summary of your weekly dev stats', def: false },
      ].map((t, i) => <ToggleRow key={i} label={t.label} desc={t.desc} defaultOn={t.def} />)}
    </div>
  </div>
);

/* ========== COMMENTS ========== */
export const CommentsPanel = () => {
  const [filter, setFilter] = useState('everyone');
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">Comments</h2>
        <p className="text-sm text-devshare-text_secondary">Control who can comment on your posts and code drops.</p>
      </div>
      <OptionGroup title="Who can comment" value={filter} onChange={setFilter} options={['everyone', 'followers', 'nobody']} />
      <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6 space-y-5">
        {[
          { label: 'Filter offensive comments', desc: 'Automatically hide comments with offensive language', def: true },
          { label: 'Manual approval', desc: 'Manually approve comments before they appear', def: false },
        ].map((t, i) => <ToggleRow key={i} label={t.label} desc={t.desc} defaultOn={t.def} />)}
      </div>
    </div>
  );
};

/* ========== LIKES & SHARES ========== */
export const LikesSharesPanel = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-black text-white mb-1">Likes & Shares</h2>
      <p className="text-sm text-devshare-text_secondary">Control the visibility of your like and share counts.</p>
    </div>
    <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6 space-y-5">
      {[
        { label: 'Show like count on my posts', desc: 'Others can see how many sparks your posts have', def: true },
        { label: 'Show share count', desc: 'Display the number of times a post was shared', def: true },
        { label: 'Hide like count on others\' posts', desc: 'Hide spark counts when browsing the feed', def: false },
        { label: 'Allow sharing of my posts', desc: 'Let others share your posts to their feed', def: true },
      ].map((t, i) => <ToggleRow key={i} label={t.label} desc={t.desc} defaultOn={t.def} />)}
    </div>
  </div>
);

/* ========== WHO CAN VIEW ========== */
export const WhoCanViewPanel = () => {
  const [profile, setProfile] = useState('everyone');
  const [codeDrops, setCodeDrops] = useState('everyone');
  const [projects, setProjects] = useState('followers');
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">Who Can View</h2>
        <p className="text-sm text-devshare-text_secondary">Control who can view different parts of your profile.</p>
      </div>
      <OptionGroup title="Profile" value={profile} onChange={setProfile} options={['everyone', 'followers', 'nobody']} />
      <OptionGroup title="Code Drops" value={codeDrops} onChange={setCodeDrops} options={['everyone', 'followers', 'nobody']} />
      <OptionGroup title="Projects" value={projects} onChange={setProjects} options={['everyone', 'followers', 'nobody']} />
    </div>
  );
};

/* ========== MANAGE ACCOUNT ========== */
export const ManageAccountPanel = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-black text-white mb-1">Manage Account</h2>
      <p className="text-sm text-devshare-text_secondary">Manage your account data and connected services.</p>
    </div>
    <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6 space-y-4">
      <h3 className="font-bold text-white text-sm mb-2">Connected Accounts</h3>
      {[
        { name: 'GitHub', connected: true, handle: '@alex_rivera' },
        { name: 'Google', connected: true, handle: 'alex@gmail.com' },
        { name: 'Twitter / X', connected: false, handle: '' },
      ].map(acc => (
        <div key={acc.name} className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-semibold text-white">{acc.name}</p>
            {acc.handle && <p className="text-[11px] text-devshare-text_secondary">{acc.handle}</p>}
          </div>
          <button className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${acc.connected ? 'border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-devshare-blue hover:bg-devshare-blue_hover text-white'}`}>
            {acc.connected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      ))}
    </div>
    <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6 space-y-4">
      <h3 className="font-bold text-white text-sm mb-2">Data & Storage</h3>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-devshare-text_secondary">Usage Metric</span>
          <span className="text-xs font-bold text-devshare-blue">74%</span>
        </div>
        <div className="w-full bg-devshare-border/40 rounded-full h-2">
          <div className="h-full bg-gradient-to-r from-devshare-blue to-blue-400 rounded-full w-[74%]" />
        </div>
        <p className="text-[11px] text-devshare-text_secondary mt-2">7.4GB / 10GB</p>
      </div>
      <div className="flex gap-3 pt-2">
        <button className="px-4 py-2 border border-devshare-border text-xs font-bold text-devshare-text_secondary hover:text-white rounded-xl transition-colors">Download My Data</button>
        <button className="px-4 py-2 border border-red-500/30 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all">Delete Account</button>
      </div>
    </div>
  </div>
);

/* ========== INTERESTED TECH ========== */
export const InterestedTechPanel = () => {
  const [techs, setTechs] = useState(interestedTech);
  const toggle = (name: string) => setTechs(prev => prev.map(t => t.name === name ? { ...t, selected: !t.selected } : t));
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">Interested Tech</h2>
        <p className="text-sm text-devshare-text_secondary">Select the technologies you're interested in to personalize your feed.</p>
      </div>
      <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6">
        <div className="flex flex-wrap gap-3">
          {techs.map(tech => (
            <button key={tech.name} onClick={() => toggle(tech.name)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${tech.selected ? 'bg-devshare-blue/15 border border-devshare-blue text-devshare-blue shadow-md shadow-devshare-blue/10' : 'bg-devshare-bg border border-devshare-border/50 text-devshare-text_secondary hover:text-white hover:border-devshare-text_secondary/50'}`}>
              {tech.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ========== APPEARANCE ========== */
export const AppearancePanel = () => {
  const [theme, setTheme] = useState('dark');
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">Appearance</h2>
        <p className="text-sm text-devshare-text_secondary">Customize the look and feel of DevShare.</p>
      </div>
      <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6">
        <h3 className="font-bold text-white text-sm mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {['dark', 'light', 'system'].map(t => (
            <button key={t} onClick={() => setTheme(t)}
              className={`p-4 rounded-xl border text-center font-bold text-sm capitalize transition-all ${theme === t ? 'border-devshare-blue bg-devshare-blue/10 text-devshare-blue' : 'border-devshare-border/50 text-devshare-text_secondary hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6 space-y-5">
        <h3 className="font-bold text-white text-sm mb-2">Preferences</h3>
        {[
          { label: 'Reduce animations', desc: 'Minimize motion for accessibility', def: false },
          { label: 'Compact mode', desc: 'Reduce spacing for more content density', def: false },
          { label: 'Show code line numbers', desc: 'Display line numbers on code drops', def: true },
        ].map((t, i) => <ToggleRow key={i} label={t.label} desc={t.desc} defaultOn={t.def} />)}
      </div>
    </div>
  );
};

/* ========== ACTIVE SESSIONS ========== */
export const SessionsPanel = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-black text-white mb-1">Active Sessions</h2>
      <p className="text-sm text-devshare-text_secondary">Manage devices where your account is currently logged in.</p>
    </div>
    <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6 space-y-4">
      {activeSessions.map((session, i) => (
        <div key={i} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-devshare-bg border border-devshare-border rounded-lg flex items-center justify-center">
              {i === 1 ? <Smartphone className="w-4 h-4 text-devshare-text_secondary" /> : <Monitor className="w-4 h-4 text-devshare-text_secondary" />}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{session.device}</p>
              <p className="text-[11px] text-devshare-text_secondary">{session.location}</p>
            </div>
          </div>
          {session.active ? (
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          ) : (
            <button className="text-devshare-text_secondary hover:text-white p-1 transition-colors"><X className="w-4 h-4" /></button>
          )}
        </div>
      ))}
    </div>
    <button className="w-full py-3 bg-devshare-bg border border-devshare-border rounded-xl text-xs font-black text-devshare-text_secondary hover:text-white uppercase tracking-wider transition-colors">
      Log Out All Other Devices
    </button>
  </div>
);

/* ========== SHARED PRIMITIVES ========== */
const ToggleRow = ({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-[11px] text-devshare-text_secondary">{desc}</p>
      </div>
      <button onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${on ? 'bg-devshare-blue' : 'bg-devshare-border'}`}>
        <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[3px] transition-all shadow-sm ${on ? 'left-[22px]' : 'left-[3px]'}`} />
      </button>
    </div>
  );
};

const OptionGroup = ({ title, value, onChange, options }: { title: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6">
    <h3 className="font-bold text-white text-sm mb-4">{title}</h3>
    <div className="space-y-3">
      {options.map(opt => (
        <label key={opt} className="flex items-center gap-3 cursor-pointer group" onClick={() => onChange(opt)}>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${value === opt ? 'border-devshare-blue bg-devshare-blue/20' : 'border-devshare-border group-hover:border-devshare-text_secondary'}`}>
            {value === opt && <div className="w-2.5 h-2.5 rounded-full bg-devshare-blue" />}
          </div>
          <span className={`text-sm capitalize font-medium transition-colors ${value === opt ? 'text-white' : 'text-devshare-text_secondary group-hover:text-white'}`}>{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const EmptyState = ({ text }: { text: string }) => (
  <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-10 text-center text-sm text-devshare-text_secondary">{text}</div>
);

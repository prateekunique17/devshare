
import { Shield, CheckCircle2, AlertTriangle, KeyRound, Fingerprint } from 'lucide-react';

export const SecurityPanel = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-black text-white mb-1">Security</h2>
      <p className="text-sm text-devshare-text_secondary">Manage your account security and authentication methods.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Account Security */}
      <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-devshare-blue" />
          <h3 className="font-bold text-white">Account Security</h3>
        </div>
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm font-bold text-white">Two-Factor Auth</p>
                <p className="text-[11px] text-devshare-text_secondary">Enabled via Authenticator App</p>
              </div>
            </div>
            <button className="text-xs font-black text-red-400 hover:text-red-300 uppercase tracking-wider transition-colors flex-shrink-0">Revoke</button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-sm font-bold text-white">Password Health</p>
                <p className="text-[11px] text-devshare-text_secondary">Last updated 42 days ago</p>
              </div>
            </div>
            <button className="text-xs font-black text-devshare-blue hover:text-devshare-blue_hover uppercase tracking-wider transition-colors flex-shrink-0">Update</button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <KeyRound className="w-5 h-5 text-devshare-text_secondary" />
              <div>
                <p className="text-sm font-bold text-white">Recovery Codes</p>
                <p className="text-[11px] text-devshare-text_secondary">3 of 10 codes remaining</p>
              </div>
            </div>
            <button className="text-xs font-black text-devshare-blue hover:text-devshare-blue_hover uppercase tracking-wider transition-colors flex-shrink-0">Regenerate</button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Fingerprint className="w-5 h-5 text-devshare-text_secondary" />
              <div>
                <p className="text-sm font-bold text-white">Passkey / Biometrics</p>
                <p className="text-[11px] text-devshare-text_secondary">Not configured</p>
              </div>
            </div>
            <button className="text-xs font-black text-devshare-blue hover:text-devshare-blue_hover uppercase tracking-wider transition-colors flex-shrink-0">Setup</button>
          </div>
        </div>
      </div>

      {/* Login Activity */}
      <div className="bg-[#0f141b] border border-devshare-border/60 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-white">Login Activity</h3>
        </div>
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-bold text-white">Mumbai, IN — Chrome</p>
              <p className="text-[11px] text-devshare-text_secondary">Just now · This device</p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-bold text-white">Delhi, IN — Firefox</p>
              <p className="text-[11px] text-devshare-text_secondary">Yesterday</p>
            </div>
            <button className="text-[10px] font-black text-red-400 uppercase tracking-wider flex-shrink-0">Remove</button>
          </div>
        </div>
        <button className="w-full py-2.5 bg-devshare-bg border border-devshare-border rounded-xl text-xs font-black text-devshare-text_secondary hover:text-white uppercase tracking-wider transition-colors">
          Log Out All Other Devices
        </button>
      </div>
    </div>
  </div>
);

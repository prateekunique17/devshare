import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Github, Code, Hash, ArrowRight, User as UserIcon, X } from 'lucide-react';
import { MobileNav } from '../../components/MobileNav';

const PREDEFINED_TAGS = ['React', 'Go', 'OpenAI', 'TypeScript', 'Framer', 'Design', 'Python', 'Rust', 'Node.js', 'Next.js', 'Vue', 'AWS'];

const PREDEFINED_AVATARS = [
  'https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Robot1',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Robot2',
  'https://api.dicebear.com/7.x/pixel-art/svg?seed=Pixel1',
  'https://api.dicebear.com/7.x/pixel-art/svg?seed=Pixel2',
];

export const EditProfilePage = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState(profile?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || PREDEFINED_AVATARS[0]);
  const [githubUrl, setGithubUrl] = useState(profile?.github_url || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [gender, setGender] = useState(profile?.gender || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(profile?.favorite_tags || []);
  const [customTag, setCustomTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCustomTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = customTag.trim();
      if (tag && !selectedTags.includes(tag)) {
        setSelectedTags((prev) => [...prev, tag]);
      }
      setCustomTag('');
    }
  };

  const handleCompleteSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    setError('');

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          username: username,
          avatar_url: avatarUrl,
          github_url: githubUrl,
          bio: bio,
          gender: gender,
          favorite_tags: selectedTags,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      await refreshProfile();
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-devshare-bg text-devshare-text_primary font-inter pb-20 md:pb-0">
      <MobileNav />
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="pt-10 flex justify-center p-4 relative z-10 w-full overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight">Edit Profile</h1>
            <button onClick={() => navigate('/profile')} className="p-2 bg-devshare-panel hover:bg-devshare-panel_hover transition-colors rounded-full border border-devshare-border">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="glass-panel p-8">
            <form onSubmit={handleCompleteSetup} className="space-y-6">
              
              {/* Username */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold text-white mb-1">
                  <UserIcon className="w-4 h-4 text-devshare-blue" />
                  Display Name
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Alex Rivero"
                  className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors"
                  required
                />
              </div>

              {/* Avatar Selection */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold text-white">
                  <UserIcon className="w-4 h-4 text-devshare-blue" />
                  Choose Your Avatar
                </label>
                <div className="flex flex-wrap gap-4 pb-2 items-center">
                  {PREDEFINED_AVATARS.map((url) => (
                    <button
                      key={url}
                      type="button"
                      onClick={() => setAvatarUrl(url)}
                      className={`relative w-16 h-16 rounded-full flex-shrink-0 transition-all ${
                        avatarUrl === url 
                          ? 'ring-4 ring-devshare-blue scale-110 z-10' 
                          : 'ring-1 ring-devshare-border/60 hover:ring-devshare-blue/50 hover:scale-105'
                      }`}
                    >
                      <img src={url} alt="avatar option" className="w-full h-full rounded-full bg-devshare-panel object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* GitHub */}
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-white mb-1">
                    <Github className="w-4 h-4 text-devshare-blue" />
                    GitHub URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors"
                  />
                </div>
              </div>

              {/* Bio & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                    <Code className="w-4 h-4 text-devshare-blue" />
                    Short Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Fullstack dev exploring rust and ai."
                    rows={2}
                    className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors resize-none"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                    <UserIcon className="w-4 h-4 text-devshare-blue" />
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-[#050b12] border border-devshare-border/60 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-devshare-blue transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                  <Hash className="w-4 h-4 text-devshare-blue" />
                  Favorite Tech Stack
                </label>
                <p className="text-xs text-devshare-text_secondary mb-3">
                  Select the technologies you want to see most on your feed.
                </p>
                <div className="flex flex-wrap gap-2">
                  {/* Dynamically render all selected tags first in case they are custom */}
                  {selectedTags.map((tag) => {
                    const isPredefined = PREDEFINED_TAGS.includes(tag);
                    if (!isPredefined) {
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all border bg-devshare-blue text-white border-devshare-blue shadow-lg shadow-devshare-blue/20"
                        >
                          {tag} (x)
                        </button>
                      );
                    }
                    return null;
                  })}

                  {/* Predefined Tags */}
                  {PREDEFINED_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-devshare-blue text-white border-devshare-blue shadow-lg shadow-devshare-blue/20'
                            : 'bg-[#050b12] text-devshare-text_secondary border-devshare-border/60 hover:border-devshare-blue/50 hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                  
                  {/* Custom Tag Input */}
                  <input
                    type="text"
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    onKeyDown={handleCustomTagKeyDown}
                    placeholder="+ Add custom (press Enter)"
                    className="bg-[#050b12] border border-devshare-border/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-devshare-blue transition-colors min-w-[150px]"
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm font-bold">{error}</p>}

              {/* Submit */}
              <div className="pt-4 border-t border-devshare-border/40 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/profile')}
                  className="px-6 py-2.5 rounded-xl border border-devshare-border text-white hover:bg-devshare-panel_hover transition-colors text-sm font-bold"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || selectedTags.length === 0}
                  className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-xl text-sm font-black transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

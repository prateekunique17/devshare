import { motion } from 'framer-motion';
import { Zap, Star, MessageSquare, Github } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const filterMap: Record<string, string> = {
  'All Projects': 'all',
  'In Progress': 'inprogress',
  'Completed': 'completed',
};

interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string | null;
  tags: string[];
  repo_url: string | null;
  status: string;
  created_at: string;
  profiles?: {
    username: string;
    avatar_url: string | null;
  };
  sparks?: number;
  stars?: number;
  comments?: number;
}

interface Props {
  activeFilter: string;
}

export const ProjectList = ({ activeFilter }: Props) => {
  const navigate = useNavigate();
  const filterKey = filterMap[activeFilter];

  // Fetch real projects from the backend
  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-5">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-[#0f141b] border border-devshare-border/30 rounded-2xl p-7 animate-pulse">
            <div className="flex gap-4 mb-4">
              <div className="w-14 h-14 bg-devshare-panel rounded-2xl" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-devshare-panel rounded w-1/4" />
                <div className="h-3 bg-devshare-panel rounded w-1/6" />
              </div>
            </div>
            <div className="space-y-2 ml-[4.5rem]">
              <div className="h-3 bg-devshare-panel rounded" />
              <div className="h-3 bg-devshare-panel rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center border border-red-500/20 bg-red-500/5 rounded-2xl">
        <p className="text-sm font-bold text-red-400">Failed to load projects. Ensure the server is online.</p>
      </div>
    );
  }

  // Filter projects by status
  const filtered = projects.filter((project) => {
    if (filterKey === 'all') return true;
    const statusLower = project.status ? project.status.toLowerCase().replace(/\s+/g, '') : '';
    const filterLower = filterKey.toLowerCase().replace(/\s+/g, '');
    return statusLower === filterLower;
  });

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-devshare-border/40 rounded-2xl bg-[#0f141b]/30 text-center">
        <div className="w-16 h-16 rounded-full bg-devshare-blue/10 flex items-center justify-center mb-4 text-devshare-blue">
          <Zap className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No projects found</h3>
        <p className="text-sm text-devshare-text_secondary max-w-sm mb-6">
          {activeFilter === 'All Projects'
            ? 'There are no projects published in the hub yet. Start the movement by sharing yours!'
            : `No projects currently in "${activeFilter}" status.`}
        </p>
        {activeFilter === 'All Projects' && (
          <button
            onClick={() => navigate('/create-project')}
            className="px-5 py-2.5 bg-devshare-blue hover:bg-devshare-blue_hover text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-devshare-blue/20"
          >
            Publish the First Project
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {filtered.map((project, i) => {
        // Dynamic badge generation
        const s = project.status ? project.status.toLowerCase().replace(/\s+/g, '') : '';
        const badgeColor = s === 'completed'
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          : s === 'inprogress'
          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
        const badgeText = s === 'completed' ? 'COMPLETED' : s === 'inprogress' ? 'ONGOING' : project.status?.toUpperCase() || 'ONGOING';

        // Custom visual rendering
        const renderVisual = () => {
          if (project.image_url) {
            return (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover shadow-lg flex-shrink-0"
              />
            );
          }
          const title = project.title || 'Project';
          const colors = [
            'from-blue-500 to-indigo-600',
            'from-emerald-500 to-teal-600',
            'from-orange-500 to-red-600',
            'from-pink-500 to-rose-600',
            'from-purple-500 to-violet-600',
          ];
          const emojis = ['🚀', '🛡️', '⚙️', '💻', '🧠', '⚡', '🤖', '🌐', '📊', '🔒'];
          const bgGradient = colors[title.length % colors.length];
          const emoji = emojis[title.length % emojis.length];

          return (
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${bgGradient} flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0`}>
              {emoji}
            </div>
          );
        };

        const ownerUsername = project.profiles?.username || 'Unknown Developer';
        const ownerAvatar = project.profiles?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${ownerUsername}`;

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-[#0f141b] border border-devshare-border/60 hover:border-devshare-border rounded-2xl p-5 sm:p-7 group hover:shadow-xl hover:shadow-black/20 transition-all cursor-pointer"
          >
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4 min-w-0">
                {renderVisual()}
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-devshare-blue transition-colors leading-tight truncate">
                    {project.title}
                  </h3>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${badgeColor} whitespace-nowrap`}>
                  {badgeText}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-devshare-text_secondary leading-relaxed mb-5 sm:ml-[4.5rem]">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 sm:ml-[4.5rem] mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-[11px] font-semibold rounded-lg bg-devshare-bg border border-devshare-border/60 text-devshare-text_secondary hover:text-white transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:ml-[4.5rem] pt-4 border-t border-devshare-border/30">
              {/* Creator info */}
              <div className="flex items-center gap-3">
                <img src={ownerAvatar} alt="creator" className="w-8 h-8 rounded-full border-2 border-[#0f141b] bg-[#fde1c3]" />
                <span className="text-xs font-bold text-devshare-text_secondary">
                  by @{ownerUsername}
                </span>
              </div>

              {/* Stats & Repo */}
              <div className="flex items-center gap-5 text-[12px] font-semibold text-devshare-text_secondary">
                <div className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                  <Zap className="w-4 h-4 fill-current text-orange-400" /> {project.sparks || 0}
                </div>
                <div className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                  <Star className="w-4 h-4" /> {project.stars || 0}
                </div>
                <div className="flex items-center gap-1.5 hover:text-devshare-blue transition-colors">
                  <MessageSquare className="w-4 h-4" /> {project.comments || 0}
                </div>
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white text-devshare-blue transition-colors border border-devshare-blue/20 bg-devshare-blue/5 hover:bg-devshare-blue/10 px-2.5 py-1 rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

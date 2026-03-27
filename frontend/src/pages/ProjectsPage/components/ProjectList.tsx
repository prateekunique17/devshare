import { motion } from 'framer-motion';
import { Zap, Star, MessageSquare } from 'lucide-react';
import { projects } from '../data';

const filterMap: Record<string, string> = {
  'All Projects': 'all',
  'In Progress': 'inprogress',
  'Completed': 'completed',
};

interface Props {
  activeFilter: string;
}

export const ProjectList = ({ activeFilter }: Props) => {
  const filterKey = filterMap[activeFilter];
  const filtered = filterKey === 'all' ? projects : projects.filter(p => p.status === filterKey);

  return (
    <div className="space-y-5">
      {filtered.map((project, i) => (
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
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${project.iconBg} flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0`}>
                {project.iconEmoji}
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-devshare-blue transition-colors leading-tight truncate">
                  {project.name}
                </h3>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${project.badgeColor} whitespace-nowrap`}>
                {project.badge}
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
            {/* Contributors */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {project.contributors.map((avatar, idx) => (
                  <img key={idx} src={avatar} alt="contributor" className="w-8 h-8 rounded-full border-2 border-[#0f141b] bg-[#fde1c3]" />
                ))}
              </div>
              {project.extraContributors > 0 && (
                <span className="text-xs font-bold text-devshare-text_secondary">+{project.extraContributors}</span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-5 text-[12px] font-semibold text-devshare-text_secondary">
              <div className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Zap className="w-4 h-4 fill-current text-orange-400" /> {project.sparks}
              </div>
              <div className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <Star className="w-4 h-4" /> {project.stars}
              </div>
              <div className="flex items-center gap-1.5 hover:text-devshare-blue transition-colors">
                <MessageSquare className="w-4 h-4" /> {project.comments}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

import { Rocket, Database, ChevronRight, Star, GitFork } from 'lucide-react';
import { topProjects } from '../data';
import { motion } from 'framer-motion';

export const TopProjects = () => {
  const getIcon = (iconName: string) => {
    if (iconName === 'rocket') return <Rocket className="w-5 h-5" />;
    if (iconName === 'database') return <Database className="w-5 h-5" />;
    return null;
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-white">Top Projects</h2>
        <button className="flex items-center gap-1 text-xs font-bold text-devshare-blue hover:text-devshare-blue_hover transition-colors">
          View all projects <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {topProjects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -2 }}
            className="glass-panel p-6 rounded-xl border border-devshare-border/60 hover:border-devshare-border transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${project.iconColor}`}>
                {getIcon(project.icon)}
              </div>
              <div className="flex items-center gap-4 text-[11px] font-medium text-devshare-text_secondary">
                <div className="flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                  <Star className="w-3.5 h-3.5 fill-current" /> {project.stars}
                </div>
                <div className="flex items-center gap-1 group-hover:text-devshare-text_primary transition-colors">
                  <GitFork className="w-3.5 h-3.5" /> {project.forks}
                </div>
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-2 group-hover:text-devshare-blue transition-colors">
              {project.title}
            </h3>
            <p className="text-[13px] text-devshare-text_secondary leading-relaxed mb-6 flex-1">
              {project.description}
            </p>

            <div className="flex items-center gap-2 mt-auto">
              {project.tags.map(tag => (
                <span key={tag} className="text-[9px] font-bold px-2 py-0.5 bg-devshare-panel/80 border border-devshare-border/80 text-devshare-text_secondary rounded uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

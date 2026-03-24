import { trendingSkills, recentActivity } from '../data';
import { motion } from 'framer-motion';

export const ProfileRightPanel = () => {
  return (
    <div className="p-8 space-y-12">
      {/* Trending Skills */}
      <section>
        <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-devshare-text_secondary mb-6">
          Trending Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingSkills.map((skill) => (
            <motion.span
              key={skill}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 bg-devshare-panel border border-devshare-border hover:border-devshare-text_secondary text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-devshare-text_secondary mb-6">
          Recent Activity
        </h3>
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-devshare-border before:to-transparent">
          {recentActivity.map((activity, i) => (
            <div key={i} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Timeline dot */}
              <div className={`flex items-center justify-center w-3 h-3 rounded-full border-[3px] border-[#0b1016] ${activity.color} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-[5px] mt-1.5`} />
              
              {/* Content */}
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-6 md:ml-0">
                <div className="text-[13px] leading-relaxed">
                  <span className="font-bold text-white">{activity.user}</span>{' '}
                  <span className="text-devshare-text_secondary">{activity.action}</span>{' '}
                  <span className="text-devshare-blue hover:underline cursor-pointer">{activity.target}</span>
                </div>
                <div className="text-[9px] font-bold text-devshare-text_secondary mt-1 tracking-wider uppercase">
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upgrade CTA */}
      <section className="mt-8">
        <div className="p-5 rounded-2xl bg-devshare-blue/5 border border-devshare-blue/20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-devshare-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h4 className="text-sm font-bold text-white mb-4 relative z-10">Want to upgrade your profile visibility?</h4>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 bg-devshare-blue hover:bg-devshare-blue_hover text-white text-xs font-bold rounded-xl transition-colors relative z-10 shadow-lg shadow-devshare-blue/20"
          >
            Get DevShare Pro
          </motion.button>
        </div>
      </section>
    </div>
  );
};

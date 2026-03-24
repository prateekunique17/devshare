import { motion } from 'framer-motion';
import { Zap, Sparkles, Activity } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-5 h-5 text-devshare-blue" />,
    title: "Instant Quick Drops",
    description: "Paste your logic and get instant architectural feedback from the community's best minds."
  },
  {
    icon: <Sparkles className="w-5 h-5 text-devshare-blue" />,
    title: "Developer Sparks",
    description: "Move beyond standard likes. Use Sparks to show appreciation for truly brilliant solutions."
  },
  {
    icon: <Activity className="w-5 h-5 text-devshare-blue" />,
    title: "Live Activity",
    description: "A global heartbeat of creativity. Watch real-time pushes, drops, and conversations as they happen."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 bg-devshare-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Designed for <br/> modern builders
          </h2>
          <p className="text-devshare-text_secondary max-w-xl text-lg">
            Experience a social platform that understands your workflow and celebrates every commit.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-panel p-8 hover:bg-devshare-panel_hover transition-all duration-300 hover:border-devshare-blue/30 group"
            >
              <div className="w-12 h-12 rounded-lg bg-devshare-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-devshare-text_secondary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

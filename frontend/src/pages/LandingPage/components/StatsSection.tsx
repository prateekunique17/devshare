import { motion } from 'framer-motion';

const stats = [
  { value: "8.4k", label: "BUILDERS ONLINE" },
  { value: "1.2M", label: "PROJECTS SHARED" },
  { value: "45k", label: "ACTIVE SPARKS" },
  { value: "200+", label: "DAILY CODE DROPS" },
];

export const StatsSection = () => {
  return (
    <section className="py-20 border-y border-devshare-border/50 bg-[#0c1218]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl md:text-5xl font-black mb-2">{stat.value}</div>
              <div className="text-xs font-bold tracking-widest text-[#8a9ab0] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

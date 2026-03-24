import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative bg-devshare-panel border border-devshare-border rounded-2xl p-12 text-center overflow-hidden"
        >
          {/* subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-devshare-blue/5 to-transparent pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 relative z-10">
            Ready to show the world <br className="hidden md:block"/> what you're building?
          </h2>
          <p className="text-devshare-text_secondary max-w-2xl mx-auto mb-10 text-lg relative z-10">
            Join thousands of developers sharing their journey and scaling their skills together.
          </p>
          
          <Link to="/signup" className="relative z-10 inline-block">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-devshare-blue hover:bg-devshare-blue_hover text-white font-bold text-lg rounded-xl transition-colors shadow-[0_0_20px_rgba(37,157,244,0.3)]"
            >
              Get Started for Free
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

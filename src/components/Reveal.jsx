import { motion } from 'framer-motion';

// Standard fade-up animation variants
export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/**
 * Wrapper: reveals children when scrolled into view.
 * Uses viewport once: true so it only fires once and doesn't thrash.
 */
export default function Reveal({ children, className = '', delay = 0, style = {} }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden:  { opacity: 0, y: 36 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

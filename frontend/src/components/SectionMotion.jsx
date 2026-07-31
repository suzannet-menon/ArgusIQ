import { motion } from "framer-motion";

// Toned down from y:28 slide + fade to a smaller, quicker fade — scroll
// reveals should feel like the page settling into place, not performing.
export function SectionMotion({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
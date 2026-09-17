import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={`mx-auto flex max-w-5xl flex-col ${alignment}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}

      <h2 className="mt-5 font-display text-5xl font-semibold tracking-tight text-ink md:text-6xl lg:text-7xl">
        {title}
      </h2>

      {description && (
        <p className="mt-7 max-w-3xl text-lg leading-8 text-muted md:text-xl">{description}</p>
      )}
    </motion.div>
  );
}
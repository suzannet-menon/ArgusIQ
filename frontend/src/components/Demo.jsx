import { motion } from "framer-motion";
import DemoLaptop from "./DemoLaptop";
import Timeline from "./Timeline";

export default function Demo() {
  return (
    <section id="demo" className="relative overflow-hidden py-32">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="eyebrow">How it works</p>
          <h2 className="mt-8 font-display text-9xl lg:text-5xl font-bold tracking-tight text-ink">
            Predict supplier risks before they happen
          </h2>
          <p className="mx-auto mt-5 max-w-6xl text-xl leading-9 text-muted">
            ArgusIQ continuously monitors supplier operations, financial health, compliance, and public sentiment to generate an explainable AI-powered Supplier Risk Score.
          </p>
        </motion.div>

        <div className="mt-16">
          <DemoLaptop />
        </div>

        <div className="mt-16">
          <Timeline />
        </div>
      </div>
    </section>
  );
}
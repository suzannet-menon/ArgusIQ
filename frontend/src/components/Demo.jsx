import { motion } from "framer-motion";

import AnimatedBackground from "./AnimatedBackground";
import DemoLaptop from "./DemoLaptop";
import Timeline from "./Timeline";

export default function Demo() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden py-36"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-transparent via-cyan-50/40 to-transparent dark:via-cyan-950/20" />
      <AnimatedBackground />

      <div className="absolute left-1/2 top-20 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <div className="section-shell">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="eyebrow">HOW IT WORKS</p>

          <h2 className="mt-6 text-5xl lg:text-7xl font-bold tracking-tight text-slate-950 dark:text-white">
            Predict supplier risks
            <br />
            before they happen.
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-600 dark:text-slate-300">
            SupplyGuard continuously monitors supplier operations,
            financial health, compliance and public sentiment to
            generate an explainable AI-powered Supplier Risk Score.
          </p>
        </motion.div>

        {/* Macbook */}
        <div className="mt-20">
          <DemoLaptop />
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <Timeline />
        </div>

      </div>
    </section>
  );
}
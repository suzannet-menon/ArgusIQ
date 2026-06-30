import { motion } from "framer-motion";
import {
  Factory,
  Radar,
  BrainCircuit,
  TrendingUp,
  BellRing,
  ShieldCheck
} from "lucide-react";

const steps = [
  {
    icon: Factory,
    title: "Healthy Supplier",
    subtitle: "Everything appears normal",
    description:
      "Rajesh Textiles has active purchase orders, valid compliance, and stable delivery history."
  },
  {
    icon: Radar,
    title: "Risk Signals Detected",
    subtitle: "Continuous AI monitoring",
    description:
      "Dispatch delays, GST filing gaps, and negative news are automatically detected across multiple sources."
  },
  {
    icon: BrainCircuit,
    title: "AI Explains Why",
    subtitle: "Explainable Intelligence",
    description:
      "Instead of a black-box score, SupplyGuard highlights the exact operational, financial, compliance, and sentiment drivers behind the risk increase."
  },
  {
    icon: TrendingUp,
    title: "Risk Forecast",
    subtitle: "Predict before disruption",
    description:
      "Machine learning forecasts the Supplier Risk Score over the next 14 days so procurement teams can intervene early."
  },
  {
    icon: BellRing,
    title: "Smart Alerts",
    subtitle: "Real-time notifications",
    description:
      "High-risk suppliers automatically trigger alerts with recommended actions before disruptions impact business."
  },
  {
    icon: ShieldCheck,
    title: "Confident Decisions",
    subtitle: "AI-powered procurement",
    description:
      "Teams prioritize suppliers using explainable intelligence instead of reactive firefighting."
  }
];

export default function Timeline() {
  return (
    <section className="relative py-24">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-20 max-w-4xl text-center"
      >
        <p className="eyebrow">PRODUCT JOURNEY</p>

        <h2 className="mt-5 text-5xl font-bold tracking-tight text-slate-950 dark:text-white lg:text-6xl">
          From hidden supplier risks
          <br />
          to proactive action.
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-600 dark:text-slate-400">
          Every supplier is continuously monitored. SupplyGuard transforms
          thousands of fragmented signals into a single explainable AI-powered
          risk score.
        </p>
      </motion.div>

      {/* Horizontal card grid */}
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              className="flex flex-col rounded-3xl border border-slate-200/60 bg-white/70 p-8 shadow-xl shadow-slate-200/40 backdrop-blur-2xl transition-shadow duration-300 hover:shadow-2xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-xl">
                  <Icon size={26} className="text-primary" />
                </div>
                <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  LIVE
                </div>
              </div>

              <p className="mt-6 text-sm uppercase tracking-[0.25em] text-primary">
                Step {index + 1}
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">
                {step.title}
              </h3>

              <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
                {step.subtitle}
              </p>

              <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-300">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
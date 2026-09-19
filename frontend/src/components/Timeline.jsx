import { motion } from "framer-motion";
import { Factory, Radar, BrainCircuit, TrendingUp, BellRing, ShieldCheck } from "lucide-react";

// Genuine product sequence — each stage leads to the next, so the
// numbering earns its place. Mono indices + a hairline list helps this
// read as a pipeline rather than a generic 3x2 card grid.
const steps = [
  { icon: Factory, title: "Healthy supplier", subtitle: "Everything appears normal", description: "Active purchase orders, valid compliance, stable delivery history." },
  { icon: Radar, title: "Risk signals detected", subtitle: "Continuous monitoring", description: "Dispatch delays, GST filing gaps, and negative news are flagged automatically." },
  { icon: BrainCircuit, title: "AI explains why", subtitle: "Explainable, not a black box", description: "The exact operational, financial, compliance, and sentiment drivers behind the score." },
  { icon: TrendingUp, title: "Risk forecast", subtitle: "Predict before disruption", description: "A 14-day forecast so procurement teams can intervene early." },
  { icon: BellRing, title: "Smart alerts", subtitle: "Real-time notifications", description: "High-risk suppliers trigger alerts with recommended actions." },
  { icon: ShieldCheck, title: "Confident decisions", subtitle: "Data over guesswork", description: "Teams prioritize suppliers using evidence instead of reactive firefighting." },
];

export default function Timeline() {
  return (
    <section id="journey" className="relative scroll-mt-24 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-16 max-w-4xl text-center"
      >
        <p className="eyebrow">Product journey</p>
        <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          From supplier risks to proactive action
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-muted">
          Every supplier is continuously monitored and turned into one explainable risk score.
        </p>
      </motion.div>

      <div className="mx-auto max-w-5xl divide-y divide-slate-200">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="grid gap-3 px-2 py-7 sm:grid-cols-[90px_auto_1fr] sm:items-center sm:gap-8 sm:px-6"
            >
              <span className="font-mono text-xl font-bold uppercase tracking-[0.15em] text-slate-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-amber-50 text-primary">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="font-mono text-[12px] uppercase tracking-wide text-slate-400">
                    {step.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-base leading-7 text-muted sm:text-right">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
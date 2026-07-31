import { motion } from "framer-motion";
import { Factory, Radar, BrainCircuit, TrendingUp, BellRing, ShieldCheck } from "lucide-react";

// This IS a genuine sequence (each stage leads to the next), so numbered
// steps are earning their place here — unlike the removed numbering in
// Problem.jsx.
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
    <section className="relative py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-16 max-w-4xl text-center"
      >
        <p className="eyebrow">Product journey</p>
        <h2 className="mt-5 font-display text-5xl font-bold tracking-tight text-ink lg:text-6xl">
          From hidden supplier risks
          <br />
          to proactive action.
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-muted">
          Every supplier is continuously monitored and turned into one explainable risk score.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-card"
            >
              <div className="flex items-center justify-between">
                <Icon size={26} className="text-primary" />
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-base text-muted">{step.subtitle}</p>
              <p className="mt-5 text-base leading-7 text-slate-600">{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { BadgeCheck, FileSearch, Newspaper, Truck } from "lucide-react";

const inputs = [
  { icon: Truck, label: "Delivery data", weight: 35 },
  { icon: FileSearch, label: "Financial signals", weight: 30 },
  { icon: BadgeCheck, label: "Compliance status", weight: 20 },
  { icon: Newspaper, label: "News sentiment", weight: 15 },
];

// These three steps ARE a real sequence (you literally do them in order),
// so numbering here is legitimate — unlike Problem.jsx's three items.
const steps = ["Add supplier", "Analyze signals", "Get risk score"];

export function Solution() {
  return (
    <section id="solution" className="relative overflow-hidden py-28">
      <div className="section-shell relative">
        <div className="mx-auto max-w-[1300px] text-center">
          <p className="eyebrow">The solution</p>
          <h2 className="mt-4 font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            One clear score from every supplier signal.
          </h2>
          <p className="mx-auto mt-6 max-w-[1000px] text-xl leading-9 text-muted sm:text-2xl">
            Operational, financial, compliance, and sentiment data — weighted and combined into
            one 0-100 supplier risk score.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-lg bg-slate-950 px-8 py-10 text-white sm:px-10 sm:py-12">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Signal inputs, by weight</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {inputs.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-white/10 bg-white/5 p-6"
                >
                  <item.icon className="text-primary" size={24} />
                  <p className="mt-5 font-display text-xl font-semibold tracking-tight text-white">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.weight}% of the score</p>
                  <div className="mt-4 h-1.5 rounded-full bg-slate-700">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${item.weight * 2}%` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Previous version showed TWO different numbers (67 and 74) for
              the same output — confusing, looked like a copy-paste error.
              One number, with its risk band, is the actual output shape. */}
          <div className="rounded-lg bg-slate-50 px-8 py-10 sm:px-10 sm:py-12">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Output</p>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-7xl font-semibold text-ink">47</p>
                <p className="mt-3 text-xl font-semibold text-orange-600">High risk</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-orange-100 px-5 py-3 text-sm font-semibold text-orange-700">
                Declining · forecast 38 in 14 days
              </span>
            </div>
            <p className="mt-6 text-lg leading-8 text-muted">
              One score combines every signal into a clear, decision-ready surface — with the
              reasoning behind it, not a black box.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-8 py-8"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">0{index + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">{step}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { BadgeCheck, FileSearch, Newspaper, Truck } from "lucide-react";

const inputs = [
  { icon: Truck, label: "Delivery data", weight: 35 },
  { icon: FileSearch, label: "Financial signals", weight: 30 },
  { icon: BadgeCheck, label: "Compliance status", weight: 20 },
  { icon: Newspaper, label: "News sentiment", weight: 15 },
];

const steps = ["Add supplier", "Analyze signals", "Get risk score"];

export function Solution() {
  return (
    <section id="solution" className="relative overflow-hidden py-28">
      <div className="section-shell relative">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="eyebrow">The solution</p>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            One clear score from every supplier signal
          </h2>
          <p className="mx-auto mt-6 max-w-[720px] text-xl leading-9 text-muted">
            Operational, financial, compliance, and sentiment data weighted and combined into
            one 0–100 supplier risk score.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-lg border border-slate-200 bg-white p-8 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                Signal inputs, by weight
              </p>
              <span className="inline-flex shrink-0 items-center rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                Sample
              </span>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {inputs.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <item.icon className="text-primary" size={20} />
                      <p className="text-sm font-semibold text-ink">{item.label}</p>
                    </div>
                    <p className="text-sm font-semibold tabular-nums text-muted">{item.weight}%</p>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${item.weight}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Output</p>
            <div className="mt-6 flex flex-col gap-9 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-8xl font-semibold tabular-nums text-ink">47</p>
                <p className="mt-3 text-xl font-semibold text-orange-600">High risk</p>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold tabular-nums text-orange-700">
                  Declining → forecast 38 in 14 days
                </span>
                <span className="inline-flex items-center rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Sample data
                </span>
              </div>
            </div>
            <p className="mt-6 text-lg leading-8 text-muted">
              One score combines every signal into a clear, decision-ready surface with the reasoning
              behind it, not a black box.
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
              className="rounded-lg border border-slate-200 bg-white px-8 py-8"
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
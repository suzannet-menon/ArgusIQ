import { motion } from "framer-motion";
import { BadgeCheck, FileSearch, Newspaper, Truck } from "lucide-react";
import { SectionMotion } from "./SectionMotion.jsx";

const inputs = [
  { icon: Truck, label: "Delivery data" },
  { icon: FileSearch, label: "Financial signals" },
  { icon: BadgeCheck, label: "Compliance status" },
  { icon: Newspaper, label: "News sentiment" }
];

const steps = ["Add supplier", "Analyze signals", "Get risk score"];

export function Solution() {
  return (
    <section id="solution" className="relative overflow-hidden py-32">
      <div className="absolute inset-x-0 top-16 h-96 bg-[radial-gradient(circle,_rgba(56,189,248,0.18),transparent_35%)] blur-3xl" />
      <div className="section-shell relative">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="eyebrow">The solution</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            One clear score from every supplier signal.
          </h2>
          <p className="mx-auto mt-6 max-w-[1100px] text-xl leading-9 text-slate-600 sm:text-2xl">
            ArgusIQ analyzes operational, financial, compliance, and sentiment data to generate a simple 0-100 supplier risk score.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-lg bg-slate-950 px-8 py-10 text-white sm:px-10 sm:py-12">
            <div className="space-y-6">
              <p className="uppercase tracking-[0.2em] text-sm text-slate-400">Signal inputs</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {inputs.map((item, index) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -3 }}
                    className="rounded-lg bg-white/10 p-6"
                  >
                    <item.icon className="text-cyan-300" size={28} />
                    <p className="mt-6 text-2xl font-semibold tracking-tight text-white">{item.label}</p>
                    <div className="mt-5 h-2 rounded-full bg-slate-700">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-sky-300" style={{ width: `${78 - index * 9}%` }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 px-8 py-10 sm:px-10 sm:py-12">
            <div className="space-y-6 text-slate-950">
              <p className="uppercase tracking-[0.2em] text-sm text-slate-500">Output</p>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-7xl font-semibold">67</p>
                  <p className="mt-3 text-xl font-semibold text-orange-600">High supplier risk</p>
                </div>
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-3xl font-semibold">
                  74
                </div>
              </div>
              <p className="text-lg leading-8 text-slate-600">
                One score combines every supplier signal into a clear, decision-ready surface for teams.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-lg bg-slate-50 px-8 py-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.15)]"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">0{index + 1}</span>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{step}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

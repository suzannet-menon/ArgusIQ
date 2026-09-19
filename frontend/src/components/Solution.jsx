import { motion } from "framer-motion";

const steps = [
  {
    index: "01",
    title: "Connect your suppliers",
    copy: "List the vendors behind your orders. ArgusIQ builds a live profile for each one.",
  },
  {
    index: "02",
    title: "Read every signal",
    copy: "Operations, finances, compliance, and news sentiment are monitored continuously.",
  },
  {
    index: "03",
    title: "Get the score + forecast",
    copy: "One explainable 0–100 risk score, plus a 14-day forecast so you can act early.",
  },
];

export function Solution() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 overflow-hidden py-28">
      <div className="section-shell relative">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:whitespace-nowrap lg:text-[1.85rem] xl:text-4xl">
            Three steps from supplier name to clear risk
          </h2>
          <p className="mx-auto mt-6 max-w-[720px] text-xl leading-9 text-muted">
            No data plumbing, no risk-model PhD. Add a supplier and the score does the work.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1200px] gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-amber-200"
            >
              <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Step {step.index}
              </p>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-muted">{step.copy}</p>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
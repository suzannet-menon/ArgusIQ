import { BellRing, BrainCircuit, GitCompareArrows, PieChart } from "lucide-react";
import { SectionMotion } from "./SectionMotion.jsx";

const features = [
  { icon: BellRing, title: "Real-time alerts", copy: "Catch threshold and forecast warnings early." },
  { icon: BrainCircuit, title: "AI explanations", copy: "See why a score moved, in plain language." },
  { icon: PieChart, title: "Risk breakdown", copy: "Operational, financial, compliance, sentiment." },
  { icon: GitCompareArrows, title: "Supplier comparison", copy: "Compare vendors before key orders." },
];

export function Features() {
  return (
    <section id="features" className="py-28 bg-white">
      <div className="section-shell">
        <div className="mx-auto max-w-[1300px] text-center">
          <p className="eyebrow">Features</p>
          <h2 className="mt-4 font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Everything needed for proactive supplier decisions.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <SectionMotion
              key={feature.title}
              delay={index * 0.06}
              className="rounded-lg border border-slate-200 bg-slate-50 px-8 py-10 text-left"
            >
              <feature.icon className="text-primary" size={28} />
              <h3 className="mt-7 font-display text-2xl font-semibold tracking-tight text-ink">{feature.title}</h3>
              <p className="mt-4 text-lg leading-8 text-muted">{feature.copy}</p>
            </SectionMotion>
          ))}
        </div>
      </div>
    </section>
  );
}
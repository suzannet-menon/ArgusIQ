import { BellRing, BrainCircuit, GitCompareArrows, PieChart } from "lucide-react";
import { SectionMotion } from "./SectionMotion.jsx";

const features = [
  {
    icon: BellRing,
    title: "Real-time alerts",
    copy: "Act on threshold and forecast warnings the moment a supplier turns.",
  },
  {
    icon: BrainCircuit,
    title: "Plain-language explanations",
    copy: "See exactly why a score moved, in words your team already uses.",
  },
  {
    icon: PieChart,
    title: "Signal-level risk breakdown",
    copy: "Trace a score to its operational, financial, compliance, and sentiment drivers.",
  },
  {
    icon: GitCompareArrows,
    title: "Supplier comparison",
    copy: "Shortlist vendors side-by-side before committing to key orders.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-canvas py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="eyebrow">Features</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Everything needed for proactive supplier decisions
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <SectionMotion
              key={feature.title}
              delay={index * 0.06}
              className="rounded-lg border border-slate-200 bg-white px-8 py-10 text-left transition-all duration-200 hover:-translate-y-1 hover:border-amber-200 hover:shadow-card"
            >
              <feature.icon className="text-primary" size={28} />
              <h3 className="mt-7 font-display text-xl font-semibold tracking-tight text-ink">{feature.title}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{feature.copy}</p>
            </SectionMotion>
          ))}
        </div>
      </div>
    </section>
  );
}
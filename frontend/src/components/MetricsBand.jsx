import CountUp from "./react-bits/CountUp.jsx";
import { SectionMotion } from "./SectionMotion.jsx";

const stats = [
  { to: 10, suffix: "", label: "Supplier risk profiles" },
  { to: 4, suffix: "", label: "Signal types per score" },
  { to: 14, suffix: "-day", label: "Risk forecast horizon" },
  { to: 5, suffix: "", label: "Active alerts in demo" },
];

const formatSuffix = (suffix, value) => (suffix && value ? `${value}${suffix}` : null);

export function MetricsBand() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="section-shell">
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <SectionMotion
              key={stat.label}
              delay={index * 0.05}
              className="text-center lg:text-left"
            >
              <p className="font-display text-5xl font-semibold tabular-nums tracking-tight text-ink sm:text-6xl">
                <CountUp to={stat.to} duration={1.6} />
                <span className="text-primary">{formatSuffix(stat.suffix, stat.to)}</span>
              </p>
              <p className="mt-3 text-sm font-semibold text-muted">{stat.label}</p>
            </SectionMotion>
          ))}
        </div>
        <p className="pb-8 text-center text-xs text-slate-400">
          Sample build — figures reflect the demo portfolio.
        </p>
      </div>
    </section>
  );
}
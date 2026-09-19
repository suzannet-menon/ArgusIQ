import { Clock, RadioTower, IndianRupee } from "lucide-react";
import { SectionMotion } from "./SectionMotion.jsx";

const problems = [
  {
    icon: Clock,
    index: "01",
    title: "Late deliveries",
    copy: "Ratings drop before teams can react. Recovery is always after the fact.",
  },
  {
    icon: RadioTower,
    index: "02",
    title: "No warning system",
    copy: "Signals stay scattered across spreadsheets, emails, and portals.",
  },
  {
    icon: IndianRupee,
    index: "03",
    title: "Revenue leakage",
    copy: "A failing supplier hits orders, refunds, and headlines in the same week.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="eyebrow">The problem</p>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:whitespace-nowrap lg:text-[2rem] xl:text-4xl">
            Supplier risk is usually visible after the damage
          </h2>
          <p className="mt-6 text-xl leading-8 text-muted">
            Supply teams need early signals, not post-incident spreadsheets.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {problems.map((item, index) => (
            <SectionMotion
              key={item.title}
              delay={index * 0.06}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-amber-200"
            >
              <div className="flex items-center justify-between">
                <item.icon className="text-primary" size={26} />
                <span className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                  {item.index}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-4 text-lg leading-8 text-muted">{item.copy}</p>
            </SectionMotion>
          ))}
        </div>


      </div>
    </section>
  );
}
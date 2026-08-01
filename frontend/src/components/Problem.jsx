import { AlertTriangle, Clock, IndianRupee, RadioTower } from "lucide-react";
import { SectionMotion } from "./SectionMotion.jsx";

const problems = [
  { icon: Clock, title: "Late deliveries", copy: "Ratings drop before teams can react." },
  { icon: RadioTower, title: "No warning system", copy: "Signals stay scattered across tools." },
  { icon: IndianRupee, title: "Revenue leakage", copy: "Supplier failures hit orders directly." },
];

export function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden bg-slate-50 py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-[1300px] text-center">
          <p className="eyebrow">The problem</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-9xl lg:text-5xl">
            Supplier risk is usually visible after the damage
          </h2>
          <p className="mt-9 text-xl leading-5 text-muted sm:text-1xl">
            Supply teams need early signals, not post-incident spreadsheets.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {problems.map((item, index) => (
            <SectionMotion
              key={item.title}
              delay={index * 0.06}
              className="rounded-lg border border-slate-200 bg-white px-8 py-10 transition-all duration-200 hover:-translate-y-1 hover:border-amber-200 hover:shadow-card"
            >
              <item.icon className="text-primary" size={28} />
              <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-ink">{item.title}</h3>
              <p className="mt-4 text-lg leading-8 text-muted">{item.copy}</p>
            </SectionMotion>
          ))}
        </div>

        <SectionMotion className="mt-20 rounded-lg border border-orange-200 bg-orange-50 px-8 py-10 text-ink sm:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <AlertTriangle className="text-orange-600" size={32} />
              <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                60% of sellers face supplier issues annually
              </p>
            </div>
          </div>
        </SectionMotion>
      </div>
    </section>
  );
}
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SectionMotion } from "./SectionMotion.jsx";

export function CTA() {
  return (
    <section id="cta" className="bg-slate-950 py-24 text-white">
      <div className="section-shell">
        <SectionMotion className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-amber-200">
              <ShieldCheck size={16} /> ArgusIQ
            </span>
            <h2 className="mt-7 max-w-[1200px] font-display text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Start tracking your suppliers today
            </h2>
          </div>
        </SectionMotion>
      </div>
    </section>
  );
}
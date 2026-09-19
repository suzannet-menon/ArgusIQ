import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
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
            <h2 className="mt-7 max-w-[720px] font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Start tracking your suppliers today
            </h2>
            <p className="mt-5 max-w-[560px] text-lg leading-8 text-slate-300">
              Sample data included, and you're in the dashboard within a minute.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-600"
            >
              Start tracking suppliers
              <ArrowRight size={16} />
            </Link>
          </div>
        </SectionMotion>
      </div>
    </section>
  );
}
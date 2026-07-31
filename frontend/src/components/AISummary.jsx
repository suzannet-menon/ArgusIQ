import { Sparkles, CheckCircle2 } from "lucide-react";
import GlassCard from "./GlassCard";
import { aiSummary } from "../data/demoData";

export default function AISummary() {
  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">AI intelligence</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white">Explainable summary</h3>
        </div>
        <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
          {aiSummary.confidence} confidence
        </div>
      </div>

      <div className="mt-7 rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="mb-3 flex items-center gap-2 text-primary">
          <Sparkles size={16} />
          <span className="text-sm font-semibold">Why this score</span>
        </div>
        <p className="leading-7 text-slate-300">{aiSummary.explanation}</p>
      </div>

      <div className="mt-7">
        <h4 className="mb-3 text-base font-semibold text-white">Risk drivers</h4>
        <div className="space-y-2.5">
          {aiSummary.drivers.map((driver) => (
            <div key={driver} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <CheckCircle2 size={16} className="shrink-0 text-primary" />
              <span className="text-sm text-slate-300">{driver}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 rounded-xl bg-primary/10 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">Recommendation</p>
        <p className="mt-2 leading-7 text-slate-200">{aiSummary.recommendation}</p>
      </div>
    </GlassCard>
  );
}
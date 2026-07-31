import { TriangleAlert, Clock3, ArrowRight } from "lucide-react";
import GlassCard from "./GlassCard";
import { latestAlert } from "../data/demoData";

export default function AlertCard() {
  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Latest alert</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white">Procurement notice</h3>
        </div>
        <TriangleAlert size={22} className="text-rose-400" />
      </div>

      <div className="mt-7 inline-flex rounded-full bg-rose-500/10 px-4 py-2">
        <span className="font-semibold text-rose-400">{latestAlert.severity} severity</span>
      </div>

      <h4 className="mt-6 font-display text-2xl font-bold text-white">{latestAlert.title}</h4>
      <p className="mt-3 leading-7 text-slate-300">{latestAlert.description}</p>

      <div className="mt-7 flex items-center gap-3 text-slate-400">
        <Clock3 size={16} />
        <span className="text-sm">{latestAlert.time}</span>
      </div>

      <div className="mt-7 flex cursor-pointer items-center justify-between rounded-xl border border-primary/20 bg-primary/10 px-5 py-4 transition-colors hover:border-primary/40">
        <div>
          <p className="font-semibold text-primary">View AI recommendation</p>
          <p className="mt-1 text-sm text-slate-400">Review the suggested mitigation plan</p>
        </div>
        <ArrowRight size={18} className="text-primary" />
      </div>
    </GlassCard>
  );
}
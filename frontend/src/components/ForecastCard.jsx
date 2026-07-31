import { TrendingDown } from "lucide-react";
import GlassCard from "./GlassCard";
import { forecast } from "../data/demoData";

export default function ForecastCard() {
  return (
    <GlassCard className="h-full">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">AI forecast</p>
      <h3 className="mt-2 font-display text-2xl font-bold text-white">14-day prediction</h3>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-slate-400">Current score</p>
          <h2 className="mt-2 font-display text-5xl font-bold text-white">{forecast.current}</h2>
        </div>
        <div>
          <p className="text-sm text-slate-400">Predicted</p>
          <h2 className="mt-2 font-display text-5xl font-bold text-rose-400">{forecast.predicted}</h2>
        </div>
      </div>

      <div className="my-7 h-px bg-white/10" />

      <div className="flex items-center justify-between rounded-xl bg-rose-500/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <TrendingDown size={20} className="text-rose-400" />
          <div>
            <p className="font-semibold text-rose-400">{forecast.direction}</p>
            <p className="text-sm text-slate-400">Expected trend</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-slate-500">Confidence</p>
          <p className="text-lg font-bold text-primary">{forecast.confidence}</p>
        </div>
      </div>
    </GlassCard>
  );
}
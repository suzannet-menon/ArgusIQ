import { Building2, MapPin, TrendingUp, TrendingDown } from "lucide-react";
import GlassCard from "./GlassCard";
import { supplier } from "../data/demoData";

// This is the one card that keeps the icon-in-a-box treatment  it's the
// "identity" card for the whole mockup, so it earns the emphasis. Every
// other card in this set drops the box (see SignalGrid, RiskChart, etc.)
// so the repetition doesn't compound across all six.
export default function SupplierCard() {
  const isUp = supplier.trend === "up";

  return (
    <GlassCard className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 size={24} />
          </div>
          <h3 className="mt-5 font-display text-2xl font-bold text-white">{supplier.name}</h3>
          <p className="mt-2 text-slate-400">{supplier.category}</p>
        </div>
        <div className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2">
          <span className="text-sm font-semibold text-amber-400">{supplier.status}</span>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-3 text-slate-400">
        <MapPin size={17} />
        <span>{supplier.location}</span>
      </div>

      <div className="my-7 h-px bg-white/10" />

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-slate-400">Supplier Risk Score</p>
          <h2 className="mt-2 font-display text-5xl font-bold text-white">{supplier.riskScore}</h2>
        </div>
        <div className="flex items-end justify-end">
          <div className={`flex items-center gap-2 rounded-xl px-4 py-3 ${isUp ? "bg-rose-500/10 text-rose-400" : "bg-emerald-500/10 text-emerald-400"}`}>
            {isUp ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            <span className="text-sm font-semibold">{isUp ? "Increasing risk" : "Improving"}</span>
          </div>
        </div>
      </div>

      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">Overall health</span>
          <span className="font-semibold text-primary">{supplier.riskScore}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-primary" style={{ width: `${supplier.riskScore}%` }} />
        </div>
      </div>
    </GlassCard>
  );
}
import { Activity, Landmark, ShieldCheck, MessageSquare } from "lucide-react";
import GlassCard from "./GlassCard";
import { kpis } from "../data/demoData";

const iconMap = { Operational: Activity, Financial: Landmark, Compliance: ShieldCheck, Sentiment: MessageSquare };

export default function SignalGrid() {
  return (
    <div className="grid grid-cols-2 gap-5">
      {kpis.map((item) => {
        const Icon = iconMap[item.title];
        const isDown = item.change.startsWith("-");
        return (
          <GlassCard key={item.id} className="h-full">
            <div className="flex items-center justify-between">
              <Icon size={20} className="text-slate-400" />
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isDown ? "bg-rose-500/10 text-rose-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                {item.change}
              </span>
            </div>
            <div className="mt-6">
              <p className="text-sm text-slate-400">{item.title}</p>
              <h3 className="mt-2 font-display text-4xl font-bold text-white">{item.value}</h3>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-primary" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
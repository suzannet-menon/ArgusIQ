import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import GlassCard from "./GlassCard";
import { chartData } from "../data/demoData";

export default function RiskChart() {
  return (
    <GlassCard className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Supplier risk trend</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white">14-day forecast</h3>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(148,163,184,0.12)" />
            <XAxis dataKey="day" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[30, 70]} tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ stroke: "#F59E0B", strokeWidth: 1 }}
              contentStyle={{ background: "#161B22", border: "1px solid rgba(255,255,255,.08)", borderRadius: "10px", color: "#fff" }}
            />
            <Area type="monotone" dataKey="score" stroke="#F59E0B" strokeWidth={2.5} fill="url(#riskFill)" connectNulls />
            <Line type="monotone" dataKey="forecast" stroke="#F87171" strokeWidth={2.5} strokeDasharray="7 5" dot={{ r: 3.5, strokeWidth: 0, fill: "#F87171" }} connectNulls />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-slate-400">Actual score</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-[2.5px] w-8 rounded-full bg-rose-400" />
          <span className="text-slate-400">14-day forecast</span>
        </div>
      </div>
    </GlassCard>
  );
}
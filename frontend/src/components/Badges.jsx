// Shared across Dashboard/Suppliers/Alerts/Compare so we don't repeat this logic 4 times. 

const COLOR_STYLES = {
  red: "bg-red-50 text-red-700 border-red-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  yellow: "bg-amber-50 text-amber-700 border-amber-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export function RiskBadge({ srs, band, color }) {
  const cls = COLOR_STYLES[color] || "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-semibold border ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {band} · {srs}
    </span>
  );
}

export function TrendArrow({ trend }) {
  if (trend === "improving") return <span className="font-bold text-emerald-600">▲</span>;
  if (trend === "declining") return <span className="font-bold text-red-600">▼</span>;
  return <span className="font-bold text-slate-400">●</span>;
}

export function AnomalyFlag({ triggered, reason }) {
  if (!triggered) return <span className="text-slate-400">—</span>;
  return (
    <span className="inline-flex items-center gap-1 text-red-600 font-semibold text-xs" title={reason || "Anomaly detected"}>
      ⚠ {reason || "Anomaly"}
    </span>
  );
}
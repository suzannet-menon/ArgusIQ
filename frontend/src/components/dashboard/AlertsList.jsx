import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { RiskBadge, TrendArrow } from "../Badges.jsx";

export default function AlertsList({ onSelectSupplier }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.alerts().then(setData).catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-red-600 p-6">Couldn't load alerts  {error}</div>;
  if (!data) return <div className="text-slate-500 p-6">Loading…</div>;
  if (data.alert_count === 0) {
    return (
      <div className="text-slate-500 p-6 text-center">
        No active alerts. All suppliers are within acceptable risk bands.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
      <h2 className="text-sm font-bold mb-4">
        Active Alerts{" "}
        <span className="text-xs font-normal text-slate-500">high risk, critical, or anomaly-flagged</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-slate-500 border-b border-slate-300">
              <th className="py-2 px-3">Supplier</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3">SRS</th>
              <th className="py-2 px-3">Anomaly Message</th>
              <th className="py-2 px-3">Days to High Risk</th>
              <th className="py-2 px-3">Trend</th>
            </tr>
          </thead>
          <tbody>
            {data.alerts.map((a) => (
              <tr
                key={a.id}
                onClick={() => onSelectSupplier(a.id)}
                className="cursor-pointer border-b border-slate-100 hover:bg-slate-50 bg-amber-50/30"
              >
                <td className="py-3 px-3">
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-xs text-slate-400">{a.id}</div>
                </td>
                <td className="py-3 px-3">{a.category}</td>
                <td className="py-3 px-3">
                  <RiskBadge srs={a.srs} band={a.risk_band} color={a.color} />
                </td>
                <td className="py-3 px-3">{a.anomaly_message}</td>
                <td className="py-3 px-3">{a.days_to_high_risk ?? ""}</td>
                <td className="py-3 px-3">
                  <TrendArrow trend={a.trend} /> {a.trend}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
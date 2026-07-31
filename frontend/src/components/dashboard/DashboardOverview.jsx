import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { RiskBadge, TrendArrow, AnomalyFlag } from "../Badges.jsx";

export default function DashboardOverview({ onSelectSupplier }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // useEffect with an empty [] dependency array = "run once, when this
  // component first mounts" — the React equivalent of the vanilla JS
  // `loadDashboard()` call that ran at the bottom of the script.
  
  useEffect(() => {
    api.portfolio().then(setData).catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-red-600 p-6">Couldn't load portfolio — {error}</div>;
  if (!data) return <div className="text-slate-500 p-6">Loading…</div>;

  const { summary, suppliers } = data;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden mb-6">
        <Kpi label="Total Suppliers" value={summary.total} />
        <Kpi label="Critical" value={summary.critical} valueClassName="text-red-600" />
        <Kpi label="High Risk" value={summary.high} valueClassName="text-orange-600" />
        <Kpi label="Moderate" value={summary.moderate} />
        <Kpi label="Low Risk" value={summary.low} />
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <h2 className="text-sm font-bold mb-4">
          Supplier Portfolio{" "}
          <span className="text-xs font-normal text-slate-500">sorted riskiest first</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-xs uppercase text-slate-500 border-b border-slate-300">
                <th className="py-2 px-3">Supplier</th>
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3">Location</th>
                <th className="py-2 px-3">SRS</th>
                <th className="py-2 px-3">Trend</th>
                <th className="py-2 px-3">14d Forecast</th>
                <th className="py-2 px-3">Top Risk Driver</th>
                <th className="py-2 px-3">Anomaly</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => onSelectSupplier(s.id)}
                  className={`cursor-pointer border-b border-slate-100 hover:bg-slate-50 ${
                    s.anomaly ? "bg-amber-50/40" : ""
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-slate-400">{s.id}</div>
                  </td>
                  <td className="py-3 px-3">{s.category}</td>
                  <td className="py-3 px-3">{s.location}</td>
                  <td className="py-3 px-3">
                    <RiskBadge srs={s.srs} band={s.risk_band} color={s.color} />
                  </td>
                  <td className="py-3 px-3">
                    <TrendArrow trend={s.trend} /> {s.trend}
                  </td>
                  <td className="py-3 px-3">{s.forecast_14d}</td>
                  <td className="py-3 px-3">
                    {s.top_driver ? `${s.top_driver.dimension} — ${s.top_driver.key_signal}` : "—"}
                  </td>
                  <td className="py-3 px-3">
                    <AnomalyFlag triggered={s.anomaly} reason={s.anomaly_reason} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, valueClassName = "" }) {
  return (
    <div className="bg-white p-4">
      <div className="text-xs uppercase text-slate-500 font-semibold">{label}</div>
      <div className={`text-2xl font-mono font-bold mt-1 ${valueClassName}`}>{value}</div>
    </div>
  );
}
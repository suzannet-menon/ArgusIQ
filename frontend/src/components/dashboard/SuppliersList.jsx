/*
YOUR TURN — this is nearly identical to DashboardOverview.jsx, minus the KPI
cards, minus a couple of table columns. Original vanilla JS: loadSuppliers(),
dashboard.html lines ~512-538.

Steps (same recipe as DashboardOverview):
1. useState for `data` and `error`
2. useEffect(() => { api.portfolio().then(setData).catch(...) }, [])
3. Loading / error early returns
4. Render a table with columns: Supplier, Category, Location, SRS, Trend, Anomaly
   (fewer columns than the Dashboard tab — no "14d Forecast" or "Top Risk Driver")
5. Each row onClick calls onSelectSupplier(s.id) — exactly like DashboardOverview

Import the same shared pieces:
  import { useEffect, useState } from "react";
  import { api } from "../../lib/api.js";
  import { RiskBadge, TrendArrow, AnomalyFlag } from "../Badges.jsx";

Once written, export default function SuppliersList({ onSelectSupplier }) { ... }
so it matches how Dashboard.jsx imports it.
*/

import { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { RiskBadge, TrendArrow, AnomalyFlag } from "../Badges.jsx";

export default function SuppliersList({ onSelectSupplier }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.portfolio().then(setData).catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="text-red-600 p-6">Couldn't load portfolio — {error}</div>;
  if (!data) return <div className="text-slate-500 p-6">Loading…</div>;

  const { suppliers } = data;

  return (
  <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
    <h2 className="text-sm font-bold mb-4">Suppliers</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr className="text-left text-xs uppercase text-slate-500 border-b border-slate-300">
            <th className="py-2 px-3">Supplier</th>
            <th className="py-2 px-3">Category</th>
            <th className="py-2 px-3">Location</th>
            <th className="py-2 px-3">SRS</th>
            <th className="py-2 px-3">Trend</th>
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
                  <td className="py-3 px-3">
                    <AnomalyFlag triggered={s.anomaly} reason={s.anomaly_reason} />
                  </td>
                </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}
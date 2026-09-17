import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { api } from "../../lib/api.js";
import { RiskBadge, AnomalyFlag } from "../Badges.jsx";

const DIMENSIONS = [
  { key: "operational", label: "Operational", weight: "35%" },
  { key: "financial", label: "Financial", weight: "30%" },
  { key: "compliance", label: "Compliance", weight: "20%" },
  { key: "sentiment", label: "Sentiment", weight: "15%" },
];

function barColor(score) {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}

export default function SupplierDetail({ supplierId }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // supplierId is a dependency here  when the user clicks a DIFFERENT
  // supplier row, this effect re-runs and refetches. Compare this to
  // DashboardOverview's `[]`  that one only ever needed to run once.
  useEffect(() => {
    setData(null);
    setError(null);
    api.supplier(supplierId).then(setData).catch((err) => setError(err.message));
  }, [supplierId]);

  if (error) return <div className="text-red-600 p-6">{error}</div>;
  if (!data) return <div className="text-slate-500 p-6">Loading {supplierId}…</div>;

  // Recharts wants ONE array of data points, each with keys matching the
  // <Line dataKey="..."> below  unlike Chart.js's two separate datasets,
  // here "actual" and "forecast" live as two possible keys on the same points.
  const history = data.score_history_full.map((p) => ({ day: `Day ${p.day}`, actual: p.srs }));
  const n = history.length;
  const chartData = [...history, { day: `Day ${n + 14}`, forecast: data.forecast.forecast_14_days }];
  // Bridge point: give the last historical day a "forecast" value too, equal
  // to its actual score, so the dashed projection line visually connects
  // instead of starting from a gap.
  chartData[n - 1] = { ...chartData[n - 1], forecast: chartData[n - 1].actual };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm mt-4">
      <h2 className="text-sm font-bold mb-4">
        {data.supplier_name} ({data.supplier_id})  {data.category}, {data.location}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex gap-2 items-center mb-3">
            <RiskBadge srs={data.srs} band={data.risk_band} color={data.color} />
            <AnomalyFlag triggered={data.anomaly_triggered} reason={data.anomaly_reason} />
          </div>

          <div className="space-y-3">
            {DIMENSIONS.map((d) => {
              const score = data.sub_scores[d.key];
              const details = data.sub_score_details[d.key];
              const weakest = Object.entries(details).sort((a, b) => a[1] - b[1])[0];
              return (
                <div key={d.key}>
                  <div className="grid grid-cols-[110px_1fr_44px] items-center gap-2 text-xs">
                    <div>
                      {d.label} <span className="text-slate-400">({d.weight})</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded overflow-hidden">
                      <div className={`h-full ${barColor(score)}`} style={{ width: `${score}%` }} />
                    </div>
                    <div className="text-right font-bold">{score}</div>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Weakest signal: {weakest[0]} ({weakest[1]})
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded p-3 text-xs mt-4 leading-relaxed">
            {data.explanation}
          </div>

          <h3 className="text-sm font-bold mt-4 mb-2">Top Risk Drivers</h3>
          <ul className="text-xs divide-y divide-slate-100">
            {data.top_risk_drivers.map((d, i) => (
              <li key={i} className="flex justify-between py-2">
                <span>{d.dimension}  {d.key_signal}</span>
                <strong>{d.signal_score}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold mb-2">Score History + 14-Day Forecast</h3>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#16213A" dot={{ r: 3 }} name="Actual" />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#9A5B00"
                  strokeDasharray="6 4"
                  dot={{ r: 3 }}
                  name="14d Projection"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-2">{data.forecast.prediction_text}</p>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { api } from "../../lib/api.js";
import { RiskBadge, AnomalyFlag } from "../Badges.jsx";

export default function CompareTab() {
  const [id1, setId1] = useState("");
  const [id2, setId2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCompare() {
    setLoading(true);
    setError(null);
    const a = (id1.trim() || "S001").toUpperCase();
    const b = (id2.trim() || "S010").toUpperCase();
    try {
      const data = await api.compare(a, b);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
      <h2 className="text-sm font-bold mb-4">Compare Two Suppliers</h2>
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          value={id1}
          onChange={(e) => setId1(e.target.value)}
          placeholder="Supplier ID 1, e.g. S001"
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        />
        <input
          value={id2}
          onChange={(e) => setId2(e.target.value)}
          placeholder="Supplier ID 2, e.g. S010"
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        />
        <button
          onClick={handleCompare}
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded text-sm font-semibold disabled:opacity-50"
        >
          {loading ? "Comparing…" : "Compare"}
        </button>
      </div>

      {error && <div className="text-red-600 text-sm mb-4">Compare failed — {error}</div>}

      {!result && !error && (
        <div className="text-center py-8">
          <p className="text-slate-500 text-sm mb-3">
            Pick two suppliers to see a side-by-side risk breakdown, or try an example:
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {[
              ["S002", "S010", "Sunrise Cosmetics vs Anand Textiles"],
              ["S001", "S009", "Delhi Spice Co. vs BrightPack Logistics"],
              ["S003", "S008", "Sharma Textiles vs Navi Mumbai Steel"],
            ].map(([a, b, label]) => (
              <button
                key={label}
                onClick={() => {
                  setId1(a);
                  setId2(b);
                }}
                className="bg-slate-50 border border-slate-300 rounded-full px-3 py-1.5 text-xs hover:bg-amber-50 hover:border-amber-400"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {result && (
        <>
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded p-3 text-sm font-semibold mb-4">
            {result.summary}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <CompareSide r={result.supplier_1} />
            <CompareSide r={result.supplier_2} />
          </div>
        </>
      )}
    </div>
  );
}

function CompareSide({ r }) {
  return (
    <div>
      <h3 className="text-sm font-bold mb-2">
        {r.supplier_name} <span className="text-xs text-slate-400 font-normal">{r.supplier_id}</span>
      </h3>
      <div className="flex gap-2 items-center mb-3">
        <RiskBadge srs={r.srs} band={r.risk_band} color={r.color} />
        <AnomalyFlag triggered={r.anomaly_triggered} reason={r.anomaly_reason} />
      </div>
      <div className="space-y-2 mb-3">
        {Object.entries(r.sub_scores).map(([key, value]) => (
          <div key={key} className="grid grid-cols-[90px_1fr_36px] items-center gap-2 text-xs">
            <div className="capitalize">{key}</div>
            <div className="h-1.5 bg-slate-100 rounded overflow-hidden">
              <div
                className={`h-full ${value >= 70 ? "bg-emerald-500" : value >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                style={{ width: `${value}%` }}
              />
            </div>
            <div className="text-right font-bold">{value}</div>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs leading-relaxed">
        {r.explanation}
      </div>
    </div>
  );
}
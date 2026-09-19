import SupplierCard from "./SupplierCard";
import SignalGrid from "./SignalGrid";
import RiskChart from "./RiskChart";
import ForecastCard from "./ForecastCard";
import AISummary from "./AISummary";
import AlertCard from "./AlertCard";

export default function DemoScreen() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[18px] bg-[#0D1117] p-4 text-white">
      <div className="mb-4 flex shrink-0 items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">ArgusIQ</p>
          <h1 className="mt-1 font-display text-base font-bold leading-tight">Supplier Intelligence Dashboard</h1>
          <p className="mt-1 hidden text-[11px] leading-4 text-slate-400 sm:block">
            Monitors operations, finances, compliance, and sentiment.
          </p>
        </div>

        <div className="shrink-0 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-center">
          <p className="text-[9px] uppercase tracking-widest text-primary">Live</p>
          <p className="font-display text-sm font-bold leading-none">24 / 7</p>
        </div>
      </div>

      <div className="grid shrink-0 grid-cols-12 gap-3">
        <div className="col-span-4"><SupplierCard /></div>
        <div className="col-span-8"><SignalGrid /></div>
      </div>

      <div className="mt-3 grid shrink-0 grid-cols-12 gap-3">
        <div className="col-span-8"><RiskChart /></div>
        <div className="col-span-4"><ForecastCard /></div>
      </div>

      <div className="mt-3 grid shrink-0 grid-cols-12 gap-3">
        <div className="col-span-8"><AISummary /></div>
        <div className="col-span-4"><AlertCard /></div>
      </div>
    </div>
  );
}
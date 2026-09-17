import SupplierCard from "./SupplierCard";
import SignalGrid from "./SignalGrid";
import RiskChart from "./RiskChart";
import ForecastCard from "./ForecastCard";
import AISummary from "./AISummary";
import AlertCard from "./AlertCard";

export default function DemoScreen() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[24px] bg-[#0D1117] p-8 text-white">
      <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">ArgusIQ</p>
          <h1 className="mt-2 font-display text-4xl font-bold">Supplier Intelligence Dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Monitors operations, finances, compliance, and sentiment to flag risk before it hits an order.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/10 px-6 py-4">
          <p className="text-xs uppercase tracking-widest text-primary">Live monitoring</p>
          <h3 className="mt-1 font-display text-3xl font-bold">24 / 7</h3>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4"><SupplierCard /></div>
        <div className="col-span-8"><SignalGrid /></div>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-8"><RiskChart /></div>
        <div className="col-span-4"><ForecastCard /></div>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-8"><AISummary /></div>
        <div className="col-span-4"><AlertCard /></div>
      </div>
    </div>
  );
}
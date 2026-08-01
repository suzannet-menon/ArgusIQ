const SUPPLIERS = [
  { name: "Delhi Spice Co.", srs: 16, dir: "down" },
  { name: "Sunrise Cosmetics", srs: 18, dir: "down" },
  { name: "Mehta Garments", srs: 32, dir: "down" },
  { name: "Ravi Electronics", srs: 43, dir: "down" },
  { name: "Sharma Textiles", srs: 47, dir: "down" },
  { name: "Kapoor Plastics", srs: 53, dir: "flat" },
  { name: "Sharma Exports", srs: 54, dir: "flat" },
  { name: "Navi Mumbai Steel", srs: 66, dir: "up" },
  { name: "BrightPack Logistics", srs: 82, dir: "up" },
  { name: "Anand Textiles", srs: 88, dir: "up" },
];

const DIR_STYLES = {
  down: { arrow: "▼", cls: "text-rose-400" },
  flat: { arrow: "●", cls: "text-slate-500" },
  up: { arrow: "▲", cls: "text-emerald-400" },
};

function TickerRow({ hidden = false }) {
  return (
    <div
      className="flex items-center gap-10 pr-10 text-sm font-semibold text-slate-300 whitespace-nowrap"
      aria-hidden={hidden}
    >
      {SUPPLIERS.map((s) => {
        const d = DIR_STYLES[s.dir];
        return (
          <span key={s.name} className="flex items-center gap-2">
            {s.name} <span className={d.cls}>{s.srs} {d.arrow}</span>
          </span>
        );
      })}
    </div>
  );
}

export default function SupplierTicker() {
  return (
    <div className="bg-slate-950 py-4 overflow-hidden border-y border-white/5">
      <div className="marquee-track flex">
        <TickerRow />
        <TickerRow hidden />
      </div>
    </div>
  );
}
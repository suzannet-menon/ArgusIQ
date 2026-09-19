import { BellRing, BrainCircuit, GitCompareArrows } from "lucide-react";
import CountUp from "./react-bits/CountUp.jsx";
import { SectionMotion } from "./SectionMotion.jsx";

const signalWeights = [
  { label: "Operational", weight: 35 },
  { label: "Financial", weight: 30 },
  { label: "Compliance", weight: 20 },
  { label: "Sentiment", weight: 15 },
];

const alerts = [
  { name: "Kulkarni Foods", level: "Critical", score: 34 },
  { name: "Sharma Textiles", level: "High", score: 47 },
  { name: "Mehta Packaging", level: "High", score: 51 },
];

const explained = [
  { driver: "Dispatch delays", dir: "up" },
  { driver: "GST filing gaps", dir: "up" },
  { driver: "News sentiment", dir: "down" },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-canvas py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="eyebrow">Features</p>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:whitespace-nowrap lg:text-[2rem] xl:text-4xl">
            A risk dashboard built for actual decisions
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Signal breakdown — wide */}
          <SectionMotion className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card md:col-span-3">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  Signal breakdown
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                  One clear score from every signal
                </h3>
              </div>
              <span className="inline-flex items-center rounded bg-slate-100 px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-slate-500">
                Sample
              </span>
            </div>
            <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              <div className="space-y-5">
                {signalWeights.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[13px] font-semibold text-ink">{item.label}</p>
                      <p className="font-mono text-[13px] font-semibold tabular-nums text-muted">
                        {item.weight}%
                      </p>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-primary" style={{ width: `calc(${item.weight}% * 1.8)` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-between rounded-lg border border-slate-100 bg-canvas p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Portfolio avg
                    </p>
                    <p className="mt-1 text-6xl font-semibold tabular-nums tracking-tight text-ink">
                      <CountUp to={47} duration={1.6} />
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1.5 font-mono text-[12px] font-bold tabular-nums text-orange-700">
                    5 active alerts
                  </span>
                </div>
                <p className="mt-5 border-t border-slate-200 pt-4 font-mono text-[12px] leading-5 text-muted">
                  Weighted blend: ops 35 · finance 30 · compliance 20 · sentiment 15
                </p>
              </div>
            </div>
          </SectionMotion>

          {/* AI explanations */}
          <SectionMotion delay={0.05} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
            <BrainCircuit className="text-primary" size={26} />
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
              Explainable, not a black box
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Every score lists the exact drivers behind it in plain language.
            </p>
            <div className="mt-5 space-y-2 border-t border-slate-100 pt-5">
              {explained.map((item) => (
                <div key={item.driver} className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[12px] text-slate-600">{item.driver}</p>
                  <span
                    className={`font-mono text-[12px] font-bold ${
                      item.dir === "up" ? "text-red-500" : "text-emerald-500"
                    }`}
                  >
                    {item.dir === "up" ? "↑" : "↓"}
                  </span>
                </div>
              ))}
            </div>
          </SectionMotion>

          {/* Real-time alerts */}
          <SectionMotion delay={0.1} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
            <BellRing className="text-primary" size={26} />
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
              Real-time alerts
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Threshold and forecast warnings the moment a supplier turns.
            </p>
            <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
              {alerts.map((a) => (
                <div key={a.name} className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[12px] text-slate-600">{a.name}</p>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold tabular-nums ${
                      a.level === "Critical"
                        ? "bg-red-100 text-red-600"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {a.level} · {a.score}
                  </span>
                </div>
              ))}
            </div>
          </SectionMotion>

          {/* Supplier comparison */}
          <SectionMotion delay={0.15} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
            <GitCompareArrows className="text-primary" size={26} />
            <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
              Compare before you commit
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Shortlist vendors side-by-side for key orders.
            </p>
            <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
              <div>
                <div className="flex items-center justify-between font-mono text-[12px]">
                  <span className="text-slate-600">Anand Textiles</span>
                  <span className="font-bold tabular-nums text-emerald-600">88 · Low</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-slate-100">
                  <div className="h-full w-[88%] rounded-full bg-emerald-500" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between font-mono text-[12px]">
                  <span className="text-slate-600">Sharma Textiles</span>
                  <span className="font-bold tabular-nums text-orange-600">47 · High</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-slate-100">
                  <div className="h-full w-[47%] rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </SectionMotion>

          {/* Metrics band */}
          <SectionMotion delay={0.08} className="rounded-2xl border border-slate-200 bg-white px-7 py-8 shadow-card md:col-span-3 md:grid md:grid-cols-4 md:gap-6">
            {[
              { to: 10, label: "Supplier risk profiles" },
              { to: 4, label: "Signal types per score" },
              { to: 14, suffix: "-day", label: "Forecast horizon" },
              { to: 5, label: "Active alerts in demo" },
            ].map((s) => (
              <div key={s.label} className="py-4 text-center lg:py-0 lg:text-left">
                <p className="text-5xl font-semibold tabular-nums tracking-tight text-ink">
                  <CountUp to={s.to} duration={1.6} />
                  {s.suffix && <span className="text-ink">{s.suffix}</span>}
                </p>
                <p className="mt-2 text-sm font-semibold text-muted">{s.label}</p>
              </div>
            ))}
          </SectionMotion>
        </div>
      </div>
    </section>
  );
}
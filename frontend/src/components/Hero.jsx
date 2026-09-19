import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import DotGrid from "./react-bits/DotGrid.jsx";
import TiltedLaptop from "./TiltedLaptop.jsx";
import DemoScreen from "./DemoScreen.jsx";

const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "How it works", href: "#demo" },
  { label: "Product journey", href: "#journey" },
  { label: "Features", href: "#features" },
];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-canvas text-ink">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <DotGrid />
      </div>

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1340px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <a href="#hero" className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-950 text-primary">
              <ShieldCheck size={19} />
            </span>
            ArgusIQ
          </a>

          <div className="hidden items-center justify-center gap-8 text-sm font-semibold text-muted lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-ink">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-ink sm:inline-flex"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-600"
            >
              Start free
            </Link>
          </div>
        </div>
      </nav>

      <div className="section-shell relative mx-auto pt-[150px] pb-24 lg:pt-[170px] lg:pb-28">
        <div className="mx-auto max-w-[900px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">Supplier risk intelligence for e-commerce sellers</p>
            <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Know supplier risk before it costs you
            </h1>
            <p className="mx-auto mt-7 max-w-[680px] text-lg leading-8 text-muted sm:text-xl">
              ArgusIQ combines operations, finance, compliance, and sentiment into one explainable
              0–100 Supplier Risk Score, and forecasts where each supplier is headed 14 days out.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-amber-600"
              >
                Start tracking suppliers
                <ArrowRight size={16} />
              </Link>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:text-ink"
              >
                See how it works
              </a>
            </div>

            <p className="mt-8 text-sm text-muted">
              <span className="mr-2 inline-flex items-center rounded bg-amber-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-700">
                Sample data
              </span>
              10 suppliers scored 0–100 across 4 signal types, forecast 14 days out.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-[1200px] lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <TiltedLaptop
            content={<DemoScreen />}
            caption="The ArgusIQ Supplier Intelligence Dashboard, running on demo data."
          />
        </motion.div>
      </div>
    </section>
  );
}
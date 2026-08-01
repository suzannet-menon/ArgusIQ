import { motion } from "framer-motion";
import { Bell, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

// Mirrors the real 14-day decline pattern from scoring/forecast.py's
// linear-regression logic, instead of an arbitrary invented trend line.
const trend = [
  { risk: 58 }, { risk: 56 }, { risk: 54 }, { risk: 52 },
  { risk: 50 }, { risk: 49 }, { risk: 47 },
];

const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "How it works", href: "#demo" },
  {label: "Product journey", href: "#journey"},
  { label: "Features", href: "#features" },
];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-canvas text-ink">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-amber-100 bg-gradient-to-r from-amber-50 via-white to-white backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12 2xl:px-16">
          <a href="#hero" className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-950 text-primary">
              <ShieldCheck size={19} />
            </span>
            ArgusIQ
          </a>

          <div className="hidden items-center justify-center gap-9 text-sm font-semibold text-muted md:flex">
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
              className="hidden rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 sm:inline-flex"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      <div className="section-shell relative mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-14 pb-20 pt-[120px] text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mx-auto w-full max-w-[2000px] space-y-5">
            <h1 className="font-display text-5xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl lg:text-[4rem] lg:leading-[1.02]">
              Know your supplier risk before it costs you
            </h1>
            <p className="mx-auto max-w-[1000px] text-xl leading-9 text-muted sm:text-2xl">
              ArgusIQ scores every supplier 0-100 across operations, finances, compliance, and
              sentiment  and forecasts where they're headed 14 days out
            </p>
          </div>
        </motion.div>

        <motion.div
          className="relative w-full max-w-[1300px]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="relative overflow-hidden rounded-lg bg-slate-950 px-8 py-10 text-white shadow-soft sm:px-10 lg:px-12">
            <div className="relative grid gap-8 lg:grid-cols-[0.95fr_0.9fr] lg:items-end">
              <div className="space-y-6 text-left">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Portfolio at a glance</p>
                <p className="font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                  One score. Every supplier signal.
                </p>
                <p className="max-w-[560px] text-base leading-8 text-slate-300 sm:text-lg">
                  10 suppliers monitored across categories  2 critical, 3 high risk, 3 moderate,
                  2 low risk, updated on every request.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-white/5 px-6 py-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Suppliers monitored</p>
                    <p className="mt-3 font-display text-4xl font-semibold text-white">10</p>
                  </div>
                  <div className="rounded-lg bg-white/5 px-6 py-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Active alerts</p>
                    <p className="mt-3 font-display text-4xl font-semibold text-white">5</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-900 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                  <div className="text-left">
                    <p className="uppercase tracking-[0.2em]">Active alert</p>
                    <p className="mt-2 font-display text-xl font-semibold text-white">Sharma Textiles  High Risk</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-md bg-amber-500/15 px-3 py-2 text-sm font-semibold text-amber-300">
                    <Bell size={16} /> 47
                  </span>
                </div>
                <div className="mt-8 h-[230px] overflow-hidden rounded-lg bg-slate-950">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trend} margin={{ top: 18, right: 18, left: 18, bottom: 18 }}>
                      <defs>
                        <linearGradient id="heroRisk" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="risk" stroke="#F59E0B" strokeWidth={3} fill="url(#heroRisk)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-5 rounded-lg bg-slate-950/80 px-5 py-4 text-left text-sm text-slate-300">
                  Dispatch delays and open compliance notices are driving this decline.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { Bell, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const trend = [
  { risk: 38 },
  { risk: 41 },
  { risk: 47 },
  { risk: 52 },
  { risk: 59 },
  { risk: 64 },
  { risk: 67 }
];

const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Demo", href: "#demo" },
  { label: "Features", href: "#features" }
];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[820px] bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.18),transparent_45%)] blur-3xl" />

      <nav className="fixed inset-x-0 top-0 z-50 rounded-none border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12 2xl:px-16">
          <a href="#hero" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-950">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-primary to-sky-300 text-slate-950">
              <ShieldCheck size={19} />
            </span>
            ARGUSIQ
          </a>

          <div className="hidden items-center justify-center gap-4 text-sm font-semibold text-slate-600 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-slate-900">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden text-sm font-semibold text-slate-700 transition hover:text-slate-950 sm:inline-flex"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hidden rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 sm:inline-flex"
            >
              Sign Up
            </Link>
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-md bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5"
            >
              Try Demo
            </a>
          </div>
        </div>
      </nav>

      <div className="section-shell relative mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-16 pb-20 pt-[120px] text-center sm:px-8 lg:px-12 2xl:px-16">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <div className="mx-auto w-full max-w-[1400px] space-y-8">
            <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-700">
              <Sparkles size={16} /> AI supplier intelligence
            </span>
            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-[6.4rem] lg:leading-[1.02]">
              Know your supplier risk before it costs you.
            </h1>
            <p className="mx-auto max-w-[1000px] text-xl leading-9 text-slate-600 sm:text-2xl">
              A modern desktop experience for predicting supplier issues, surfacing risk, and making decisions with confidence.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="relative w-full max-w-[1400px]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.14 }}
        >
          <div className="relative overflow-hidden rounded-lg bg-slate-950 px-8 py-10 text-white shadow-[0_48px_140px_-60px_rgba(15,23,42,0.55)] sm:px-10 lg:px-12">
            <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle,_rgba(56,189,248,0.28),transparent_30%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle,_rgba(16,185,129,0.18),transparent_40%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[0.95fr_0.9fr] lg:items-end">
              <div className="space-y-6">
                <p className="uppercase tracking-[0.2em] text-sm text-slate-300">Portfolio risk at a glance</p>
                <p className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                  Live risk monitoring for supplier teams.
                </p>
                <p className="max-w-[1200px] text-base leading-8 text-slate-300 sm:text-lg">
                  One centralized view that keeps every order, alert, and supplier signal visible at scale.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-white/10 px-6 py-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Suppliers monitored</p>
                    <p className="mt-4 text-4xl font-semibold text-white">18</p>
                  </div>
                  <div className="rounded-lg bg-white/10 px-6 py-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Predictive alerts</p>
                    <p className="mt-4 text-4xl font-semibold text-white">3</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-800/90 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                  <div>
                    <p className="uppercase tracking-[0.2em]">Active alert</p>
                    <p className="mt-2 text-xl font-semibold text-white">Dispatch delays rising</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-md bg-orange-100/15 px-3 py-2 text-sm font-semibold text-orange-200">
                    <Bell size={16} /> 67
                  </span>
                </div>
                <div className="mt-8 h-[270px] overflow-hidden rounded-lg bg-slate-950">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trend} margin={{ top: 18, right: 18, left: 18, bottom: 18 }}>
                      <defs>
                        <linearGradient id="heroRisk" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.42} />
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="risk" stroke="#38bdf8" strokeWidth={4} fill="url(#heroRisk)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 rounded-lg bg-slate-950/80 px-5 py-4 text-sm text-slate-300">
                  AI summary: Dispatch delays and factory news are driving risk higher across the portfolio.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
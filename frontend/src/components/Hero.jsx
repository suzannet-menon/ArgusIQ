import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import LaptopMockup from "./LaptopMockup.jsx";
import DemoScreen from "./DemoScreen.jsx";

const KEY_ROWS = [14, 13, 12, 8];
const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Product journey", href: "#journey" },
  { label: "FAQ", href: "#faq" },
];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-canvas text-ink">
      {/* Nav — fixed, mono labels, pill CTAs */}
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="section-shell mx-auto flex items-center justify-between gap-6 py-4">
          <Link to="/" className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-950 text-primary">
              <ShieldCheck size={18} />
            </span>
            ArgusIQ
          </Link>

          <div className="hidden items-center gap-8 text-sm font-semibold text-muted lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-ink">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-600"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="section-shell grid items-center gap-14 pb-24 pt-[150px] lg:grid-cols-2 lg:gap-10 lg:pb-32 lg:pt-[170px]">
        {/* Left column — copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <p className="eyebrow">Supplier risk intelligence for e-commerce sellers</p>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Know supplier risk before it costs you
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 max-w-[560px] text-lg leading-8 text-muted sm:text-xl"
          >
            ArgusIQ turns operations, finance, compliance, and sentiment into one explainable
            0–100 Supplier Risk Score, and forecasts where each supplier is headed 14 days out.
          </motion.p>

          <p className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[12px] text-muted">
            <span className="inline-flex items-center gap-1.5 rounded bg-amber-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-700">
              <ShieldCheck size={11} /> Sample data
            </span>
            10 suppliers scored 0–100 across 4 signal types · forecast 14 days out
          </p>
        </motion.div>

        {/* Right column — TimeMax-style laptop */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="relative"
        >
          <LaptopMockup
            content={<DemoScreen />}
            caption="The ArgusIQ Supplier Intelligence Dashboard, running on demo data."
          />
        </motion.div>
      </div>
    </section>
  );
}
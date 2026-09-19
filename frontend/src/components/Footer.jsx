import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-canvas px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1340px] flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-[360px]">
          <p className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight text-ink">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-slate-950 text-primary">
              <ShieldCheck size={17} />
            </span>
            ArgusIQ
          </p>
          <p className="mt-4 text-sm leading-6 text-muted">
            AI-powered supplier risk intelligence for Indian e-commerce sellers. Built for a hackathon demo.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Product</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><Link to="/dashboard" className="transition hover:text-ink">Dashboard</Link></li>
              <li><Link to="/signup" className="transition hover:text-ink">Sign up</Link></li>
              <li><Link to="/login" className="transition hover:text-ink">Log in</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Live</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <a
                  href="https://argusiq.apps.lemma.work/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-ink"
                >
                  Demo pod
                </a>
              </li>
              <li>
                <a href="#faq" className="transition hover:text-ink">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-[1340px] flex-col justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center">
        <p>&copy; 2026 ArgusIQ. All rights reserved.</p>
        <p>Demo app · Scores from sample data.</p>
      </div>
    </footer>
  );
}
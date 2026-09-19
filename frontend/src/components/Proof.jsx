import { ExternalLink, FlaskConical, ShieldCheck } from "lucide-react";
import { SectionMotion } from "./SectionMotion.jsx";

const items = [
  {
    icon: ExternalLink,
    title: "Live demo pod",
    copy: "Explore the running product with a real conversational RiskAnalyst agent.",
    link: { href: "https://argusiq.apps.lemma.work/", label: "Open the live demo" },
  },
  {
    icon: FlaskConical,
    title: "Sample data, clearly labeled",
    copy: "Every number on this page is marked \"Sample\". The scoring engine runs on demo data, and nothing is dressed up as a real customer.",
    link: null,
  },
  {
    icon: ShieldCheck,
    title: "No invented shelfware",
    copy: "No fake testimonials, logo walls, or unverifiable claims. What you can verify stays verifiable; what's illustrative is labeled as such.",
    link: null,
  },
];

export function Proof() {
  return (
    <section id="proof" className="bg-slate-50 py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="eyebrow">Proof, honestly</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Try the product before you trust the page
          </h2>
          <p className="mt-6 text-xl leading-8 text-muted">
            Built for a hackathon demo. Rather than manufacture social proof, here is exactly what exists.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <SectionMotion
              key={item.title}
              delay={index * 0.06}
              className="flex flex-col rounded-lg border border-slate-200 bg-white p-8"
            >
              <item.icon className="text-primary" size={26} />
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
              <p className="mt-3 flex-1 text-base leading-7 text-muted">{item.copy}</p>
              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-ink transition hover:text-primary"
                >
                  {item.link.label} <ExternalLink size={14} />
                </a>
              )}
            </SectionMotion>
          ))}
        </div>
      </div>
    </section>
  );
}
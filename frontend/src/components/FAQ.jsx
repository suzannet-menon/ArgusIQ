import { ChevronDown } from "lucide-react";
import { SectionMotion } from "./SectionMotion.jsx";

const faqs = [
  {
    q: "How is the Supplier Risk Score computed?",
    a: "Each supplier is scored 0–100 as a weighted blend of four signal groups: operations (35%), finances (30%), compliance (20%), and public/news sentiment (15%). The scoring engine lives in the Python backend, so the number on this page is the same number the API returns.",
  },
  {
    q: "Where does the data come from?",
    a: "This is a hackathon demo, so the portfolio is mock and demo data generated in the scoring layer, mirrored into a live pod. There are no real vendors or real customer claims behind the numbers.",
  },
  {
    q: "What does the 14-day forecast mean?",
    a: "The forecast applies a linear-regression model to recent risk history to project where each supplier is headed over the next two weeks, so procurement teams can intervene before a disruption.",
  },
  {
    q: "Is the AI explanation a black box?",
    a: "No. The explainer surfaces the exact drivers behind a score move — dispatch delays, compliance notices, sentiment — in plain language via the Groq LLM, listed side by side with the numbers.",
  },
  {
    q: "Can I run or deploy this myself?",
    a: "Yes. The frontend is a static Vite/React app and the backend is FastAPI. The README covers local setup (uvicorn + npm) and deployment (Railway for the API, Vercel for the frontend).",
  },
  {
    q: "What does it cost to start?",
    a: "Nothing today. It's a hackathon build with sample data included. Signup takes you straight to the dashboard — no credit card, no setup.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-canvas py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Straight answers, no fluff
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-[900px]">
          {faqs.map((item, index) => (
            <SectionMotion
              key={item.q}
              delay={index * 0.03}
              className="border-b border-slate-200"
            >
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left transition hover:text-primary">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
                    {item.q}
                  </h3>
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <p className="pb-6 pr-10 text-base leading-7 text-muted">{item.a}</p>
              </details>
            </SectionMotion>
          ))}
        </div>
      </div>
    </section>
  );
}
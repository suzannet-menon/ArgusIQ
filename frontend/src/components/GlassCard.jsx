import clsx from "clsx";

// De-glassed: the previous version stacked backdrop-blur, a glow div, a
// ring-highlight div, AND a noise-overlay div on every single card — that
// exact recipe repeated 6+ times is what read as templated. This is one flat
// dark panel with a single hairline border, used only inside the mock
// dashboard screen (DemoScreen.jsx's dark context).
export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/10 bg-[#141922] transition-colors duration-200 hover:border-white/20",
        className
      )}
    >
      <div className="p-6">{children}</div>
    </div>
  );
}
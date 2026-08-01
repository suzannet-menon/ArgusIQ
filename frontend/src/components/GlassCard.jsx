import clsx from "clsx";

export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/10 bg-[#141922] transition-all duration-200 hover:-translate-y-1 hover:border-white/25 hover:shadow-lg",
        className
      )}
    >
      <div className="p-6">{children}</div>
    </div>
  );
}
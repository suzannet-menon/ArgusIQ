// The previous version was 3 floating blurred orbs + a 40s rotating gradient
// ring + a grid overlay + a noise overlay, all animating simultaneously 
// close to the single most common "AI-generated dashboard" tell. Cut to one
// quiet, mostly-static glow. If a section still feels flat without it, the
// fix is better content/type contrast, not more ambient motion.
export default function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 -z-20 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[160px]"
      aria-hidden="true"
    />
  );
}
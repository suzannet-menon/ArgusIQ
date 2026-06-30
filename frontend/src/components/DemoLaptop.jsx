import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import DemoScreen from "./DemoScreen";

export default function DemoLaptop() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [14, 0, -8]);
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -20]);

  return (
    <div ref={ref} className="relative flex justify-center py-10">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/25 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-[130px]" />

      {/* Slow rotating ambient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-0 -z-20 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/10 via-cyan-400/5 to-sky-400/10 blur-[120px]"
      />

      {/* Floating laptop with scroll tilt */}
      <motion.div
        initial={{ opacity: 0, y: 90, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          rotateX,
          y: translateY,
          transformPerspective: 1600
        }}
        className="relative z-20 w-full max-w-[1180px]"
      >
        {/* Subtle continuous float */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          {/* Laptop lid / bezel */}
          <div className="relative mx-auto w-full rounded-t-[22px] border border-white/10 bg-gradient-to-b from-slate-800 to-slate-950 p-3 shadow-[0_60px_160px_-40px_rgba(0,205,176,0.35)] sm:p-4">
            {/* Camera notch */}
            <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-slate-600" />

            {/* Screen */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-[#0D1117] ring-1 ring-white/5">
              <div className="h-full w-full scale-[0.62] origin-top-left sm:scale-[0.78] lg:scale-100">
                <div className="h-[1010px] w-[1620px] sm:h-full sm:w-full">
                  <DemoScreen />
                </div>
              </div>

              {/* Glass reflection */}
              <motion.div
                animate={{ opacity: [0.12, 0.26, 0.12] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent"
              />
              <div className="pointer-events-none absolute -inset-x-10 top-0 h-1/2 -skew-y-6 bg-gradient-to-b from-white/10 to-transparent" />
            </div>
          </div>

          {/* Base / hinge */}
          <div className="mx-auto h-4 w-[92%] rounded-b-2xl bg-gradient-to-b from-slate-700 to-slate-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]" />
          <div className="mx-auto h-1.5 w-[55%] rounded-b-xl bg-slate-800/80" />
        </motion.div>
      </motion.div>

      {/* Soft ground reflection */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 left-1/2 h-[120px] w-[860px] -translate-x-1/2 rounded-full bg-gradient-to-t from-primary/15 to-transparent blur-[60px]"
      />
    </div>
  );
}
import { motion } from "framer-motion";
import DemoScreen from "./DemoScreen";

// Previous version: an infinitely rotating 40s gradient ring, a continuous
// up-down float loop, scroll-driven 3D tilt, AND a pulsing glass reflection 
// four simultaneous animations on one element. Cut to a single one-time
// entrance; the laptop just... sits there, which reads as more confident.
export default function DemoLaptop() {
  return (
    <div className="relative flex justify-center py-10">
      <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[420px] w-[600px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 w-full max-w-[1180px]"
      >
        <div className="relative mx-auto w-full rounded-t-[22px] border border-white/10 bg-gradient-to-b from-slate-800 to-slate-950 p-3 shadow-soft sm:p-4">
          <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-slate-600" />

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-[#0D1117] ring-1 ring-white/5">
            <div className="h-full w-full scale-[0.62] origin-top-left sm:scale-[0.78] lg:scale-100">
              <div className="h-[1010px] w-[1620px] sm:h-full sm:w-full">
                <DemoScreen />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto h-4 w-[92%] rounded-b-2xl bg-gradient-to-b from-slate-700 to-slate-900" />
        <div className="mx-auto h-1.5 w-[55%] rounded-b-xl bg-slate-800/80" />
      </motion.div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "1-on-1", label: "Personalised Support" },
  { value: "60 min", label: "First Visit Assessment" },
  { value: "Your Pace", label: "No Rush. No Pressure." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 32, scale: 0.88 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HeroStats() {
  return (
    <motion.div className="relative w-full" style={{ zIndex: 2 }} variants={container} initial="hidden" animate="show">
      <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 backdrop-blur-md bg-black/30">
        {stats.map((s) => (
          <motion.div key={s.label} variants={item} className="px-3 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-4 text-center sm:text-left">
            <motion.span className="font-black" style={{ color: "#18a3dd", fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(1.1rem, 4vw, 2rem)" }}>
              {s.value}
            </motion.span>
            <span className="text-white/40 font-medium uppercase tracking-wider leading-tight" style={{ fontSize: "clamp(0.55rem, 1.5vw, 0.75rem)" }}>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

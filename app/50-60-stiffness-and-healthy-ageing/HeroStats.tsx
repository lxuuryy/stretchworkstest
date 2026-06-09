"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "1-on-1", label: "Personalised Sessions" },
  { value: "60 min", label: "First Visit Assessment" },
  { value: "Day 1", label: "Feel the Difference" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 32, scale: 0.88 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroStats() {
  return (
    <motion.div className="relative w-full" style={{ zIndex: 2 }} variants={container} initial="hidden" animate="show">
      <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 backdrop-blur-md bg-black/30">
        {stats.map((s) => (
          <motion.div key={s.label} variants={item} className="px-8 py-6 flex items-center gap-4">
            <motion.span className="font-black" style={{ color: "#18a3dd", fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              {s.value}
            </motion.span>
            <span className="text-xs text-white/40 font-medium uppercase tracking-wider leading-tight">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

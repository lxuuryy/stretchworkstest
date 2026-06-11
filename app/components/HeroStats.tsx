"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "121+", label: "5-Star Google Reviews", stars: true },
  { value: "10+ yrs", label: "Stretching Experience" },
  { value: "1000+", label: "People Stretched" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 32, scale: 0.88 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function HeroStats() {
  return (
    <motion.div
      className="relative w-full"
      style={{ zIndex: 2 }}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Glow line that lifts the bar off the video */}
      <div className="absolute -top-px left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #18a3dd, transparent)" }} />

      <div
        className="grid grid-cols-3 divide-x divide-white/10 backdrop-blur-xl"
        style={{
          borderTop: "2px solid rgba(24,163,221,0.6)",
          background: "linear-gradient(to top, rgba(0,8,24,0.94) 0%, rgba(0,8,24,0.82) 100%)",
          boxShadow: "0 -8px 40px rgba(24,163,221,0.18)",
        }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={item}
            className="px-2 sm:px-8 py-4 sm:py-6 flex flex-col items-center justify-center gap-1.5 text-center"
          >
            {s.stars && (
              <div className="flex gap-0.5" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#18a3dd] text-[0.65rem] sm:text-sm leading-none">★</span>
                ))}
              </div>
            )}
            <span
              className="font-black leading-none"
              style={{ color: "#18a3dd", fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(1.25rem, 4vw, 2.4rem)" }}
            >
              {s.value}
            </span>
            <span
              className="text-white/75 font-semibold uppercase tracking-wider leading-tight"
              style={{ fontSize: "clamp(0.58rem, 1.5vw, 0.78rem)" }}
            >
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

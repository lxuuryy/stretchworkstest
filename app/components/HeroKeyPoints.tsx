"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function HeroKeyPoints({ points }: { points: string[] }) {
  return (
    <motion.ul
      className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {points.map((point) => (
        <motion.li
          key={point}
          variants={item}
          className="flex items-center gap-2.5 text-white/90 text-sm sm:text-base"
          style={{ fontFamily: "var(--font-raleway), sans-serif" }}
        >
          <span className="font-bold" style={{ color: "#18a3dd" }}>✓</span>
          {point}
        </motion.li>
      ))}
    </motion.ul>
  );
}

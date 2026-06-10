"use client";

import { useState } from "react";
import { asset } from "../lib/assets";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Athletic", href: "/athletic" },
  { label: "Recovery & Injury", href: "/recovery-and-injury-support" },
  { label: "50s & 60s", href: "/50-60-stiffness-and-healthy-ageing" },
];

export default function Navbar({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/">
            <img
              src={asset("/homeImage.png")}
              alt="StretchWorks"
              width={160}
              height={48}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 text-sm font-semibold text-white/70">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`transition-colors duration-200 ${current === l.href ? "text-white" : "hover:text-white"}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#book"
              className="relative flex items-center gap-2 text-white text-sm font-bold px-4 md:px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #18a3dd 0%, #0e7aaa 100%)",
                boxShadow: "0 0 20px rgba(24,163,221,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                fontFamily: "var(--font-raleway), sans-serif",
              }}
            >
              <span className="relative flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                <span className="hidden sm:inline">Book Session</span>
                <span className="sm:hidden">Book</span>
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
              </span>
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg text-white/70 hover:text-white transition-colors"
              aria-label="Menu"
            >
              <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 inset-x-0 z-40 md:hidden border-b border-white/10"
            style={{ background: "rgba(8,14,26,0.97)", backdropFilter: "blur(16px)" }}
          >
            <div className="flex flex-col py-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-6 py-4 text-base font-semibold border-b border-white/5 transition-colors ${current === l.href ? "text-[#18a3dd]" : "text-white/70 hover:text-white"}`}
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

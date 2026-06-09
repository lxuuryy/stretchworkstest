"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "HumanTrak Assessment",
    body: "We assess your mobility, posture, symmetry, and movement restrictions. That gives us a clear picture of where you're at. not a guess.",
    accent: "#18a3dd",
  },
  {
    n: "02",
    title: "Guided Assisted Stretching",
    body: "Your stretch coach guides every part of the session. Gentle, targeted, and paced around how your body is responding. No forcing. No rushing.",
    accent: "#1591c5",
  },
  {
    n: "03",
    title: "A Clearer Next Step",
    body: "You'll leave with a real sense of where your body is at, what's contributing to how you're feeling, and a consistent support plan that makes sense for you.",
    accent: "#0e7aaa",
  },
];

function Card({
  step,
  i,
  progress,
}: {
  step: typeof steps[0];
  i: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const n = steps.length;
  const chunk = 1 / n;

  const slideStart = i === 0 ? 0 : i * chunk;
  const slideEnd   = i === 0 ? 0 : slideStart + chunk * 0.4;
  const shrinkStart = slideEnd + 0.01;
  const shrinkEnd   = shrinkStart + chunk * 0.3;
  const targetScale = 1 - (n - 1 - i) * 0.05;

  const y = useTransform(
    progress,
    i === 0 ? [0, 1] : [slideStart, slideEnd],
    i === 0 ? ["0vh", "0vh"] : ["100vh", "0vh"]
  );
  const scale = useTransform(
    progress,
    i === n - 1 ? [0, 1] : [shrinkStart, shrinkEnd],
    i === n - 1 ? [1, 1]  : [1, targetScale]
  );

  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{ zIndex: i + 1 }}
    >
      <motion.div
        className="w-full"
        style={{ y, scale, transformOrigin: "top center" }}
      >
        <div
          className="relative w-full rounded-3xl overflow-hidden p-10 md:p-12 mx-auto"
          style={{
            maxWidth: "780px",
            background: "#001835",
            borderTop: `2px solid ${step.accent}`,
            borderLeft: `1px solid ${step.accent}30`,
            borderRight: `1px solid ${step.accent}30`,
            borderBottom: `1px solid ${step.accent}20`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 8px 20px rgba(0,0,0,0.5)",
          }}
        >
          {/* Ghost number */}
          <span
            className="absolute bottom-2 right-8 font-black select-none pointer-events-none"
            style={{ fontSize: "8rem", lineHeight: 1, color: "rgba(255,255,255,0.04)", fontFamily: "var(--font-raleway), sans-serif" }}
          >
            {step.n}
          </span>

          <div className="relative flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-base shrink-0"
                style={{ background: `${step.accent}25`, border: `1px solid ${step.accent}50`, color: step.accent, fontFamily: "var(--font-raleway), sans-serif" }}
              >
                {step.n}
              </div>
              <h3
                className="font-black text-white leading-tight"
                style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)" }}
              >
                {step.title}
              </h3>
            </div>
            <p className="text-white/55 leading-relaxed" style={{ fontSize: "1rem" }}>
              {step.body}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Process() {
  const outerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="process"
      className="relative"
      style={{ background: "linear-gradient(160deg, #001433 0%, #002a5c 60%, #001433 100%)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-20 right-0 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(24,163,221,0.12) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(24,163,221,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      {/* 300vh scroll budget — tighter, cards stack sooner */}
      <div ref={outerRef} style={{ height: "300vh" }}>

        {/* ONE sticky container — heading on top, cards below */}
        <div
          className="sticky top-0 flex flex-col"
          style={{ height: "100vh", overflow: "hidden" }}
        >

          {/* Heading */}
          <div
            className="shrink-0 px-6 pt-10 pb-6 border-b"
            style={{ background: "#001433", borderColor: "rgba(24,163,221,0.15)", zIndex: 20 }}
          >
            <div className="max-w-3xl mx-auto">
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: "#18a3dd", fontFamily: "var(--font-raleway), sans-serif" }}
              >
                The Process
              </span>
              <h2
                className="mt-2 font-black uppercase leading-tight text-white"
                style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
              >
                Supportive. Personal.{" "}
                <span style={{ color: "transparent", WebkitTextStroke: "2px #18a3dd" }}>
                  Not Rushed.
                </span>
              </h2>
              <p className="mt-2 text-white/45 max-w-xl text-sm leading-relaxed">
                Every session is one-to-one, tailored to where your body is right now. Not where it used to be.
              </p>
            </div>
          </div>

          {/* Cards area — overflow hidden clips sliding cards */}
          <div
            className="relative flex-1"
            style={{ background: "linear-gradient(160deg, #001433 0%, #002a5c 100%)" }}
          >
            {steps.map((step, i) => (
              <Card key={step.n} step={step} i={i} progress={scrollYProgress} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

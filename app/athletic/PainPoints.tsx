"use client";

import { useEffect, useRef } from "react";

const cards = [
  {
    n: "01",
    icon: "🏃",
    sport: "Endurance Athletes",
    quote: "My legs never feel fully recovered.",
    detail: "Your calves, glutes, hip flexors and hamstrings are doing more work than you realise. Assisted stretching helps you recover between sessions so you can train again without feeling cooked.",
  },
  {
    n: "02",
    icon: "⛳",
    sport: "Rotational Sports",
    quote: "I've lost range through my back, hips, and shoulders.",
    detail: "If your swing, rotation, or follow-through feels restricted, it usually shows up before you lose performance. We target the areas that help you rotate more freely and move with less strain.",
  },
  {
    n: "03",
    icon: "🏊",
    sport: "Shoulder-Dominant Sports",
    quote: "My shoulders are working, but they don't feel right.",
    detail: "When your shoulders and upper back are tight, everything starts compensating. One-to-one assisted stretching helps create better movement through the joints and muscle groups that carry the load.",
  },
  {
    n: "04",
    icon: "🏋️",
    sport: "Strength and Field Sports",
    quote: "It's never a major injury. Just constant niggles.",
    detail: "Tight hips, angry hamstrings, stubborn adductors, and stiff backs have a way of hanging around. Regular stretching helps you stay ahead of the small issues before they start costing you sessions.",
  },
];

export default function PainPoints() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = cardsRef.current?.querySelectorAll<HTMLElement>("[data-card]");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    /* NO overflow-hidden — it breaks position:sticky */
    <section className="relative py-16 md:py-24 px-6 bg-[#f8fbfe]">

      {/* Gradient blobs — clipped with a wrapper div, not on section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(24,163,221,0.13) 0%, transparent 65%)", filter: "blur(70px)" }}
        />
        <div
          className="absolute top-1/2 -right-60 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,34,86,0.09) 0%, transparent 65%)", filter: "blur(90px)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(24,163,221,0.08) 0%, transparent 65%)", filter: "blur(80px)" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* items-start is required for sticky children inside a grid */}
        <div className="grid md:grid-cols-2 gap-20 items-start">

          {/* LEFT — sticky panel */}
          <div className="md:sticky md:top-32">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: "#18a3dd", fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Sound Familiar?
            </span>

            <h2
              className="mt-5 font-black uppercase leading-[0.95] text-[#1a1a2e]"
              style={{
                fontFamily: "var(--font-raleway), sans-serif",
                fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
              }}
            >
              You're Doing<br />The Work.{" "}
              <span style={{ color: "transparent", WebkitTextStroke: "2px #18a3dd" }}>
                Your Body
              </span>
              <br />
              Just Isn't Keeping Up.
            </h2>

            <p className="mt-7 text-gray-500 leading-relaxed max-w-xs" style={{ fontSize: "1rem" }}>
              For athletes and active adults, tightness rarely starts as a big problem. It starts as the hip that won't open, the shoulder that feels sticky, or the back that always tightens after a session.
            </p>

            {/* numbered index */}
            <div className="mt-10 flex flex-col gap-4 border-l-2 border-gray-100 pl-5">
              {cards.map((c) => (
                <div key={c.n} className="flex items-center gap-3">
                  <span
                    className="text-xs font-black text-[#18a3dd]"
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    {c.n}
                  </span>
                  <span className="text-sm text-gray-400 font-medium">{c.sport}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — scrolling cards */}
          <div ref={cardsRef} className="flex flex-col gap-8">
            {cards.map((item, i) => (
              <div
                key={item.n}
                data-card
                style={{
                  opacity: 0,
                  transform: "translateY(50px)",
                  transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
                }}
              >
                <div className="relative bg-white rounded-3xl border border-gray-100 p-10 hover:border-[#18a3dd]/40 hover:shadow-xl transition-all duration-300 overflow-hidden">

                  {/* Top accent bar */}
                  <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#18a3dd] to-[#002256]" />

                  {/* Icon + sport */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{item.icon}</span>
                    <span
                      className="text-xs font-bold tracking-[0.15em] uppercase text-[#18a3dd]"
                      style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                    >
                      {item.sport}
                    </span>
                  </div>

                  {/* Quote */}
                  <p
                    className="font-black text-[#1a1a2e] leading-tight mb-5"
                    style={{
                      fontFamily: "var(--font-raleway), sans-serif",
                      fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                    }}
                  >
                    "{item.quote}"
                  </p>

                  {/* Detail */}
                  <p className="text-gray-500 leading-relaxed" style={{ fontSize: "1rem" }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

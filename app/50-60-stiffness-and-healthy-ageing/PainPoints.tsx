"use client";

import { useEffect, useRef } from "react";

const cards = [
  {
    n: "01",
    icon: "🌅",
    sport: "Morning Stiffness",
    quote: "It takes me an hour just to loosen up.",
    detail: "Back, hips, shoulders. everything feels locked when you wake up. You shouldn't need half the morning just to feel like yourself. Regular assisted stretching helps reduce that start-up time significantly.",
  },
  {
    n: "02",
    icon: "🪑",
    sport: "Desk & Daily Life",
    quote: "Sitting all day is making everything worse.",
    detail: "Desk stiffness compounds with age-related tightness fast. One weekly session helps undo the accumulation so everyday movement. walking, reaching, bending. stops feeling like a negotiation.",
  },
  {
    n: "03",
    icon: "🏃",
    sport: "Staying Active",
    quote: "I still want to do the things I love. My body just isn't cooperating.",
    detail: "Golf, tennis, walking, swimming. whatever keeps you going. Restricted range and persistent tightness limits how well you can do the things that matter. We target the areas that give you that freedom back.",
  },
  {
    n: "04",
    icon: "💊",
    sport: "Temporary Relief",
    quote: "Massage and chiro help, but it never really lasts.",
    detail: "If the relief wears off too quickly, the underlying tightness is still there. Assisted stretching works on the muscular restrictions. and when done regularly, the results build over time rather than resetting.",
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
    <section className="relative py-32 px-6 bg-[#f8fbfe]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(24,163,221,0.1) 0%, transparent 65%)", filter: "blur(70px)" }} />
        <div className="absolute top-1/2 -right-60 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,34,86,0.07) 0%, transparent 65%)", filter: "blur(90px)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-start">

          {/* LEFT sticky */}
          <div className="md:sticky md:top-32">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#18a3dd]" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              Sound Familiar?
            </span>
            <h2
              className="mt-5 font-black uppercase leading-[0.95] text-[#1a1a2e]"
              style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(2.4rem, 4vw, 3.8rem)" }}
            >
              You Shouldn't<br />
              Need An Hour{" "}
              <span style={{ color: "transparent", WebkitTextStroke: "2px #18a3dd" }}>
                Just To
              </span>
              <br />Loosen Up.
            </h2>
            <p className="mt-7 text-gray-500 leading-relaxed max-w-xs">
              Stiffness and tightness don't have to be a permanent part of getting older. Most of it is addressable. with the right kind of help.
            </p>
            <div className="mt-10 flex flex-col gap-4 border-l-2 border-gray-100 pl-5">
              {cards.map((c) => (
                <div key={c.n} className="flex items-center gap-3">
                  <span className="text-xs font-black text-[#18a3dd]" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>{c.n}</span>
                  <span className="text-sm text-gray-400 font-medium">{c.sport}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT scrolling cards */}
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
                  <div className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r from-[#18a3dd] to-[#002256]" />
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#18a3dd]" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                      {item.sport}
                    </span>
                  </div>
                  <p className="font-black text-[#1a1a2e] leading-snug mb-4" style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)" }}>
                    "{item.quote}"
                  </p>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

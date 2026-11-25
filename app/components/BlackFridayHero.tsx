import HeroKeyPoints from "./HeroKeyPoints";

type BlackFridayHeroProps = {
  /** Anchor the booking button scrolls to */
  ctaHref?: string;
};

const raleway = { fontFamily: "var(--font-raleway), sans-serif" };

// Black Friday 2026 hero copy. Shared by the three stretch landing pages — each page
// keeps its own background video and layout and drops this in as the hero text.
export default function BlackFridayHero({ ctaHref = "#book" }: BlackFridayHeroProps) {
  return (
    <div>
      <p className="text-[#4fc3f0] text-xs sm:text-sm font-bold uppercase tracking-widest" style={raleway}>
        StretchWorks Black Friday Sale
      </p>

      <h1
        className="mt-3 font-black uppercase leading-tight tracking-tight"
        style={{ ...raleway, fontSize: "clamp(1.7rem, 4.2vw, 3.6rem)" }}
      >
        <span className="block text-white">Stiff, Sore Or In Pain?</span>
        <span className="brand-hl inline-block my-1" style={{ fontSize: "0.72em" }}>
          Don&apos;t Love Your Stretch? Get Your Money Back.
        </span>
      </h1>

      <p
        className="mt-3 text-white font-bold uppercase leading-snug"
        style={{ ...raleway, fontSize: "clamp(0.95rem, 1.9vw, 1.35rem)" }}
      >
        50-Minute Trial Stretch + Mobility Assessment For $65
      </p>

      <p className="mt-3 max-w-2xl text-white/85 text-sm sm:text-base leading-relaxed">
        Experience personalised assisted stretching to help ease tightness, improve flexibility and move with
        more confidence. If you don&apos;t love your stretch, we&apos;ll refund you.
      </p>

      <HeroKeyPoints
        points={[
          "Money-back trial offer",
          "No joining fees",
          "No lock-ins",
          "No credit expiry, ever",
        ]}
      />

      <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-x-5 gap-y-3">
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center gap-3 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:opacity-90"
          style={{ ...raleway, backgroundColor: "#18a3dd", boxShadow: "0 8px 32px rgba(24,163,221,0.4)", fontSize: "1rem" }}
        >
          Book Your Black Friday Trial →
        </a>
        <span className="text-white/75 text-xs font-semibold uppercase tracking-widest text-center sm:text-left" style={raleway}>
          Limited Black Friday places available
        </span>
      </div>
    </div>
  );
}

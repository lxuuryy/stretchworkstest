type OfferStripProps = {
  /** Anchor the "Claim Now" link scrolls to */
  ctaHref?: string;
};

// Fixed promo banner pinned above the navbar. Single line, height h-9/h-10 so the
// navbar (positioned with top-9 sm:top-10) sits flush beneath it.
export default function OfferStrip({ ctaHref = "#book" }: OfferStripProps) {
  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] flex h-9 sm:h-10 items-center justify-center overflow-hidden px-4 text-white"
      style={{ background: "linear-gradient(90deg, #002256 0%, #18a3dd 100%)" }}
    >
      <p className="flex items-center gap-2 truncate text-[11px] sm:text-sm" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
        <span className="font-bold uppercase tracking-wide">Limited Offer:</span>
        {/* Full copy on larger screens */}
        <span className="hidden sm:inline">
          Get <span className="font-bold">30% OFF</span> your first session when you book this week.
        </span>
        {/* Short copy on mobile */}
        <span className="sm:hidden"><span className="font-bold">30% OFF</span> your first session.</span>
        <a href={ctaHref} className="ml-1 whitespace-nowrap font-bold underline underline-offset-2 hover:text-white/80">
          Claim Now
        </a>
      </p>
    </div>
  );
}

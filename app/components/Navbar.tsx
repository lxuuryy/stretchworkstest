import { asset } from "../lib/assets";

type NavbarProps = {
  /** CTA button label + target. Defaults to "Book Today" → #book. */
  cta?: { label: string; href: string };
  /** Tailwind top-* class so the bar can sit below an offer strip. */
  topClass?: string;
};

// Minimal navbar: logo + a single CTA. No menu links.
export default function Navbar({ cta = { label: "Book Today", href: "#book" }, topClass = "top-0" }: NavbarProps) {
  return (
    <nav className={`fixed ${topClass} w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/">
          <img
            src={asset("/homeImage.png")}
            alt="StretchWorks"
            width={220}
            height={64}
            className="h-16 md:h-16 w-auto object-contain"
          />
        </a>

        {/* CTA */}
        <a
          href={cta.href}
          className="relative flex items-center gap-2 text-white text-sm font-bold px-5 md:px-7 py-2.5 rounded-full transition-all duration-300 hover:scale-105 overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #18a3dd 0%, #0e7aaa 100%)",
            boxShadow: "0 0 20px rgba(24,163,221,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
            fontFamily: "var(--font-raleway), sans-serif",
          }}
        >
          <span className="relative flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            {cta.label}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </span>
        </a>
      </div>
    </nav>
  );
}

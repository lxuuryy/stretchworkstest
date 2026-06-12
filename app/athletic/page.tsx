import PainPoints from "./PainPoints";
import HeroStats from "../components/HeroStats";
import Process from "./Process";
import { asset } from "../lib/assets";
import Navbar from "../components/Navbar";
import OfferStrip from "../components/OfferStrip";
import OptInForm from "../components/OptInForm";
import YouTubeEmbed from "../components/YouTubeEmbed";

const benefitChips = [
  "Sport-specific focus",
  "Great for recovery blocks",
  "No yoga experience needed",
  "Works alongside physio and chiro",
  "Red light therapy available",
  "Compression therapy available",
];

const whoCards = [
  {
    tag: "Mature Athletes",
    headline: "Still Competitive. Just Not Interested In Breaking Down.",
    body: "You can still train hard and take recovery seriously. This is for active people who want to keep playing golf, cycling, swimming, or lifting without accepting constant tightness as normal.",
    bullets: [
      "Better recovery between sessions",
      "More range through hips, back, and shoulders",
      "A smarter long-term recovery routine",
    ],
  },
  {
    tag: "Performance and Mobility",
    headline: "When Strength Isn't The Issue, Mobility Usually Is.",
    body: "A lot of active people are strong enough, fit enough, and disciplined enough. What holds them back is restricted movement, not effort. That is where assisted stretching fits.",
    bullets: [
      "Better movement quality",
      "Less compensation through tight areas",
      "More confidence heading into sessions and events",
    ],
  },
];

const testimonials = [
  {
    quote: "A really unique experience that couples my workouts with therapeutic stretching. All staff are great in a relaxing environment — professional, patient, and caring.",
    attribution: "Gary Agg · Google Review",
  },
  {
    quote: "Stretch Works helps me with recovery. I train regularly and rarely suffer sore muscles now. Highly recommend to anyone who takes their training seriously.",
    attribution: "Debra Hanson · Google Review",
    featured: true,
  },
  {
    quote: "After a 24km kayak — 6 hours 40 minutes in the saddle — getting an assisted stretch from StretchWorks was exactly what I needed.",
    attribution: "Sharon Young · Google Review",
  },
];

const trustPoints = [
  { title: "Built around your body", body: "No cookie-cutter routine. Your first visit is shaped around how you move and what you train for." },
  { title: "Feel the difference early", body: "Most active clients notice more ease, range, and looseness from the first session." },
  { title: "Boutique studio, limited spots", body: "We keep things personal, so assessment spots are limited each week." },
];

export default function AthleticPage() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a2e] antialiased" style={{ fontFamily: "var(--font-open-sans), sans-serif" }}>

      <OfferStrip ctaHref="#book" />
      <Navbar cta={{ label: "Get in Touch", href: "#book" }} topClass="top-9 sm:top-10" />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-dvh flex flex-col justify-between overflow-hidden pt-32">

        {/* Ambient background video */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
          <source src={asset("/Youtube.mp4")} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ zIndex: 1, background: "linear-gradient(105deg, rgba(0,8,24,0.95) 0%, rgba(0,8,24,0.86) 45%, rgba(0,8,24,0.6) 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ zIndex: 1, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}
        />

        {/* Content */}
        <div className="relative flex-1 flex items-center" style={{ zIndex: 2 }}>
          <div className="max-w-7xl mx-auto px-6 md:px-16 w-full pt-6 pb-16 md:pb-12">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-14 items-center">

              {/* Left — copy */}
              <div>
                <span
                  className="inline-block text-sm md:text-base font-bold tracking-[0.18em] uppercase text-[#18a3dd]"
                  style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                >
                  Your Personalised Assisted Stretching Studio for Active Bodies
                </span>

                <h1
                  className="mt-4 font-black uppercase leading-none tracking-tight lg:whitespace-nowrap"
                  style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(1.9rem, 5.5vw, 4.25rem)" }}
                >
                  <span className="block text-white">Train Hard.</span>
                  <span className="brand-hl inline-block my-1">
                    Recover Properly.
                  </span>
                  <span className="block text-white">Stay In The Game.</span>
                </h1>

                <p className="mt-5 max-w-xl">
                  <span className="text-[#18a3dd] font-bold" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)" }}>New clients get 30% off their first session.</span>
                </p>

                <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href="#book"
                    className="inline-flex items-center justify-center gap-3 text-white font-bold px-7 py-4 rounded-full transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: "#18a3dd", boxShadow: "0 8px 32px rgba(24,163,221,0.4)", fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    Book My Assessment →
                  </a>
                  <a
                    href="tel:+61468021079"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-semibold px-6 py-4 rounded-full transition-all duration-200 text-sm backdrop-blur-sm"
                    style={{ fontFamily: "var(--font-raleway), sans-serif" }}
                  >
                    <span className="text-[#18a3dd]">↗</span> Call Now
                  </a>
                </div>

              </div>

              {/* Right — VSL video + floating badge */}
              <div className="relative">
                <YouTubeEmbed id="hrMfUCiuWO4" title="StretchWorks — Athletic" />
                <div
                  className="absolute -bottom-5 -left-3 sm:-left-5 max-w-[230px] rounded-2xl p-4 backdrop-blur-md"
                  style={{ background: "rgba(8,14,26,0.85)", border: "1px solid rgba(24,163,221,0.4)", boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}
                >
                  <div className="text-[#18a3dd] font-black text-lg leading-none" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                    One session
                  </div>
                  <p className="mt-1 text-white/70 text-xs leading-snug">And I felt the difference at training</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <HeroStats />
      </section>

      <PainPoints />

      <Process />

      {/* ── IN ACTION (VSL #2) + BENEFIT CHIPS ─────────────────────────── */}
      <section className="py-16 md:py-24 px-6 bg-[#f8fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#18a3dd]" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                See It In Action
              </span>
              <h2
                className="mt-4 font-black uppercase leading-tight text-[#1a1a2e]"
                style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                What A Session{" "}
                <span className="brand-hl">Looks Like</span>
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed text-lg">
                It starts with a HumanTrak mobility assessment, then a targeted assisted stretch guided by your coach. No group class, no generic routine. Just a proper one-to-one session built around how your body is moving right now.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {benefitChips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#1a1a2e]"
                    style={{ backgroundColor: "rgba(24,163,221,0.1)", border: "1px solid rgba(24,163,221,0.3)" }}
                  >
                    <span className="text-[#18a3dd] text-xs font-black">✓</span>
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <YouTubeEmbed id="OoYvcSIFxtM" title="StretchWorks — How It Works" />
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#18a3dd]" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              Who It&rsquo;s For
            </span>
            <h2
              className="mt-4 font-black uppercase leading-tight text-[#1a1a2e]"
              style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              For People Who Want Their Body{" "}
              <span className="brand-hl">To Keep Up.</span>
            </h2>
          </div>

          {/* Featured card */}
          <div
            className="mt-12 rounded-3xl p-8 md:p-12"
            style={{ background: "linear-gradient(135deg, rgba(24,163,221,0.12) 0%, rgba(0,34,86,0.06) 100%)", border: "1px solid rgba(24,163,221,0.35)" }}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <span className="inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white" style={{ background: "#18a3dd", fontFamily: "var(--font-raleway), sans-serif" }}>
                  Most Popular &middot; Athletes and Active Adults
                </span>
                <h3 className="mt-5 font-black uppercase leading-tight text-[#1a1a2e]" style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)" }}>
                  Recover Faster. Move Better. Stay Consistent.
                </h3>
                <p className="mt-4 text-gray-500 leading-relaxed">
                  StretchWorks is for people who train, compete, or simply like feeling capable in their body. The goal is not just to feel good for an hour. It is to help you keep showing up, with better movement and fewer setbacks.
                </p>
              </div>
              <ul className="space-y-3 md:pt-2">
                {[
                  "Weekend warriors and committed trainers",
                  "Golfers, cricketers, swimmers, runners, cyclists",
                  "Athletes returning from a small setback or recurring tightness",
                  "People who feel strong, but know mobility is the missing piece",
                  "Adults who want longevity, not just intensity",
                ].map((b) => (
                  <li key={b} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: "rgba(24,163,221,0.18)", border: "1px solid rgba(24,163,221,0.4)" }}>
                      <span className="text-[#18a3dd] text-xs font-black">✓</span>
                    </span>
                    <span className="text-[#1a1a2e] text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Two supporting cards */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {whoCards.map((c) => (
              <div key={c.tag} className="rounded-3xl p-8 bg-[#f8fbfe] border border-gray-100">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#18a3dd]" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                  {c.tag}
                </span>
                <h3 className="mt-3 font-black leading-tight text-[#1a1a2e]" style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(1.25rem, 2vw, 1.6rem)" }}>
                  {c.headline}
                </h3>
                <p className="mt-4 text-gray-500 leading-relaxed text-sm">{c.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-3 items-start">
                      <span className="w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: "rgba(24,163,221,0.15)", border: "1px solid rgba(24,163,221,0.4)" }}>
                        <span className="text-[#18a3dd] text-[10px] font-black">✓</span>
                      </span>
                      <span className="text-gray-600 text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Callout strip */}
          <div
            className="mt-6 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 text-white"
            style={{ background: "linear-gradient(145deg, #002256 0%, #18a3dd 100%)", boxShadow: "0 24px 60px rgba(24,163,221,0.2)" }}
          >
            <div className="flex-1">
              <span className="text-xs font-bold tracking-widest uppercase text-[#a9eee6]">Train hard, sit all day?</span>
              <h3 className="mt-3 font-black uppercase leading-tight" style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                If you train in the morning and sit at a desk all day, your recovery is getting hit from both sides.
              </h3>
              <p className="mt-3 text-white/75 leading-relaxed">
                One weekly session can help undo the stiffness that builds up between workouts and keep you moving better through the week.
              </p>
            </div>
            <a
              href="#book"
              className="shrink-0 inline-flex items-center justify-center gap-3 bg-white font-black px-8 py-4 rounded-full transition-all duration-200 hover:bg-[#f0f9ff]"
              style={{ color: "#18a3dd", fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Start My Assessment →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section id="reviews" className="relative py-16 md:py-16 md:py-24 px-6 overflow-hidden" style={{ background: "linear-gradient(160deg, #001433 0%, #002a5c 60%, #001433 100%)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(24,163,221,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(24,163,221,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="mb-16 max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#18a3dd]" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              Real Results, Real People
            </span>
            <h2 className="mt-3 font-black uppercase leading-tight text-white" style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              This Is What People{" "}
              <span className="brand-hl">Feel Early.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="relative rounded-3xl p-8 flex flex-col gap-5"
                style={{
                  background: t.featured ? "linear-gradient(135deg, rgba(24,163,221,0.15) 0%, rgba(14,122,170,0.1) 100%)" : "rgba(255,255,255,0.04)",
                  border: t.featured ? "1px solid rgba(24,163,221,0.4)" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-base" style={{ color: "#18a3dd" }}>★</span>
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed text-sm flex-1">{t.quote}</p>
                <div className="pt-4 text-white/40 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  {t.attribution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-16 md:py-24 px-6 bg-[#f8fbfe]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest uppercase text-[#18a3dd]">Claim Your Spot</span>
            <h2 className="mt-4 font-black uppercase tracking-tight leading-tight text-[#1a1a2e]" style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Book Your Mobility Assessment
            </h2>
            <p className="mt-6 text-gray-500 text-lg leading-relaxed">
              A 50-minute first visit where we assess how your body is moving, guide you through a targeted assisted stretch, and show you what is most likely holding you back.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-5 gap-8 items-start">
            {/* Trust points */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {trustPoints.map((p) => (
                <div key={p.title} className="rounded-2xl bg-white border border-gray-100 p-6">
                  <h4 className="font-bold text-[#1a1a2e]" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>{p.title}</h4>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>

            {/* Embedded form */}
            <div id="book" className="scroll-mt-28 lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-3 sm:p-5">
              <div className="px-2 pt-2 pb-4">
                <h3 className="font-black text-[#1a1a2e] text-xl" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>Book My Assessment</h3>
                <p className="mt-1 text-sm text-gray-400">Takes 60 seconds. We&rsquo;ll be in touch to confirm your session.</p>
              </div>
              <OptInForm formId="1s5RE0ZUNOV0yCbUIhAS" formName="Athletes_LP Opt In Form" />
              <p className="px-2 pt-3 text-xs text-gray-400">Your details are private. No spam. Just a confirmation call from our team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-3xl p-10 md:p-16 text-center text-white"
            style={{ background: "linear-gradient(145deg, #001433 0%, #18a3dd 130%)", boxShadow: "0 24px 60px rgba(24,163,221,0.2)" }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-[#a9eee6]">Limited Assessment Spots Available</span>
            <h2 className="mt-4 font-black uppercase tracking-tight leading-tight" style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Keep Training.<br />Just With A Body That Feels Better.
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl mx-auto">
              One hour from now, you could have your first session locked in. By next week, you could be recovering and moving noticeably better.
            </p>
            <a
              href="#book"
              className="mt-10 inline-flex items-center gap-3 bg-white font-black text-lg px-12 py-5 rounded-full transition-all duration-200 hover:bg-[#f0f9ff]"
              style={{ color: "#18a3dd", fontFamily: "var(--font-raleway), sans-serif" }}
            >
              Book My Assessment Now →
            </a>
            <p className="mt-5 text-sm text-white/40">No credit card. No lock-in. Just your first step toward better recovery and mobility.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 py-16 px-6 bg-[#001433]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={asset("/homeImage.png")} alt="StretchWorks" width={240} height={70} className="h-16 w-auto object-contain mb-4" />
            <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-xs">
              Personalised assisted stretching in Melbourne for people who train hard and want to stay in the game.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>Studio Hours</h4>
            <ul className="text-sm space-y-1.5 text-gray-400">
              <li>Mon – Thu: 6:00 AM – 7:00 PM</li>
              <li>Friday: 6:00 AM – 4:00 PM</li>
              <li>Saturday: 7:00 AM – 3:00 PM</li>
              <li className="text-gray-300">Sunday: Closed</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-raleway), sans-serif" }}><a href="/contact" className="hover:text-[#18a3dd] transition-colors">Contact</a></h4>
            <ul className="text-sm space-y-1.5 text-gray-400">
              <li>0468 021 079</li>
              <li className="break-all">studio.manager@stretchworks.com.au</li>
              <li>303B Beach Road, Black Rock VIC 3193</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <span>© 2026 StretchWorks. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="https://www.stretchworks.com.au/terms-of-service/" className="hover:text-[#18a3dd] transition-colors">Terms</a>
            <a href="https://www.stretchworks.com.au/privacy-policy-2/" className="hover:text-[#18a3dd] transition-colors">Privacy</a>
            <a href="/contact" className="hover:text-[#18a3dd] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

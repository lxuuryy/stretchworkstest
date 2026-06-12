import { asset } from "../lib/assets";
import PainPoints from "./PainPoints";
import Process from "./Process";
import HeroStats from "../components/HeroStats";
import Navbar from "../components/Navbar";
import OfferStrip from "../components/OfferStrip";
import OptInForm from "../components/OptInForm";

export default function AgingPage() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a2e] antialiased" style={{ fontFamily: "var(--font-open-sans), sans-serif" }}>

      <OfferStrip ctaHref="#book" />
      <Navbar topClass="top-9 sm:top-10" />

      {/* HERO */}
      <section className="relative min-h-dvh flex flex-col justify-between overflow-hidden pt-32">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
          {/* Replace with your ageing-specific video when ready */}
          <source src={asset("/Youtube.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ zIndex: 1, background: "linear-gradient(105deg, rgba(0,8,24,0.92) 0%, rgba(0,8,24,0.75) 45%, rgba(0,8,24,0.25) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ zIndex: 1, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }} />

        <div className="relative flex-1 flex items-center" style={{ zIndex: 2 }}>
          <div className="max-w-7xl mx-auto px-8 md:px-16 w-full py-6">
            <h1
              className="font-black uppercase leading-none tracking-tight"
              style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(2.6rem, 5.2vw, 5rem)" }}
            >
              <span className="block text-white">Move Like</span>
              <span className="brand-hl inline-block my-1">
                Yourself Again.
              </span>
              <span className="block text-white">Without Fighting</span>
              <span className="block text-white/60">Your Body.</span>
            </h1>
            <p className="mt-6 max-w-lg">
              <span className="text-[#18a3dd] font-bold" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>New clients get 30% off their first session.</span>
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#book"
                className="inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: "#18a3dd", boxShadow: "0 8px 32px rgba(24,163,221,0.4)", fontFamily: "var(--font-raleway), sans-serif", fontSize: "1rem" }}
              >
                Book My Assessment →
              </a>
              <a href="tel:+61468021079" className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-semibold px-6 py-4 rounded-full transition-all duration-200 text-sm backdrop-blur-sm" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                <span className="text-[#18a3dd]">↗</span> Call Now
              </a>
            </div>
          </div>
        </div>

        <HeroStats />
      </section>

      {/* PAIN POINTS */}
      <PainPoints />

      {/* PROCESS */}
      <Process />

      {/* WHO IT'S FOR */}
      <section id="who-it-s-for" className="py-16 md:py-24 px-6 bg-[#f8fbfe]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={asset("/firstVisit.jpg")} alt="StretchWorks session" width={700} height={600} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(0,20,51,0.4), transparent)" }} />
            </div>
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#18a3dd]" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                Who It's For
              </span>
              <h2
                className="mt-4 font-black uppercase leading-tight text-[#1a1a2e]"
                style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                Built For People{" "}
                <span className="brand-hl">
                  Who Still Want
                </span>{" "}
                Plenty Out Of Life.
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed text-lg">
                You're not looking to slow down. You just want your body to cooperate. so you can keep doing the things that matter.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { label: "Morning stiffness in your back, hips or shoulders", desc: "Wake up feeling tight and locked every day" },
                  { label: "Still active but range is reducing", desc: "Golf, tennis, walking, swimming. getting harder" },
                  { label: "Temporary relief that doesn't last", desc: "Massage and chiro help briefly, then it returns" },
                  { label: "Want to stay independent and mobile", desc: "Not willing to accept this as just getting older" },
                ].map((item) => (
                  <li key={item.label} className="flex gap-4 items-start">
                    <div className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: "rgba(24,163,221,0.15)", border: "1px solid rgba(24,163,221,0.4)" }}>
                      <span className="text-[#18a3dd] text-xs font-black">✓</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#1a1a2e] text-sm" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>{item.label}</span>
                      <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a href="#book" className="mt-10 inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:opacity-90" style={{ backgroundColor: "#18a3dd", boxShadow: "0 8px 24px rgba(24,163,221,0.3)", fontFamily: "var(--font-raleway), sans-serif" }}>
                Book Assessment →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="relative py-16 md:py-16 md:py-24 px-6 overflow-hidden" style={{ background: "linear-gradient(160deg, #001433 0%, #002a5c 60%, #001433 100%)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(24,163,221,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(24,163,221,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#18a3dd]" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>Client Reviews</span>
              <h2 className="mt-3 font-black uppercase leading-tight text-white" style={{ fontFamily: "var(--font-raleway), sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
                Real Results, <span className="brand-hl">Real People</span>
              </h2>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex gap-1">{[...Array(5)].map((_, i) => <span key={i} className="text-2xl" style={{ color: "#18a3dd" }}>★</span>)}</div>
              <div>
                <div className="text-white font-black text-2xl" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>5.0</div>
                <div className="text-white/40 text-xs">Google Reviews</div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: "Gary Agg", sport: "Active Trainer", text: "A really unique experience that couples my workouts with therapeutic stretching. All staff are great in a relaxing environment. professional, patient, and caring.", featured: false },
              { name: "Debra Hanson", sport: "Regular Trainer", text: "Stretch Works helps me with recovery. I train regularly and rarely suffer sore muscles now. Highly recommend to anyone who takes their training seriously.", featured: true },
              { name: "Sharon Young", sport: "Endurance Athlete", text: "After a 24km kayak. 6 hours 40 minutes in the saddle. getting assisted stretch from StretchWorks was exactly what I needed.", featured: false },
            ].map((t) => (
              <div key={t.name} className="relative rounded-3xl p-8 flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-1" style={{ background: t.featured ? "linear-gradient(135deg, rgba(24,163,221,0.15) 0%, rgba(14,122,170,0.1) 100%)" : "rgba(255,255,255,0.04)", border: t.featured ? "1px solid rgba(24,163,221,0.4)" : "1px solid rgba(255,255,255,0.08)" }}>
                {t.featured && <span className="absolute -top-3 left-8 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white" style={{ background: "#18a3dd", fontFamily: "var(--font-raleway), sans-serif" }}>Most Helpful</span>}
                <div className="flex gap-1">{[...Array(5)].map((_, i) => <span key={i} className="text-base" style={{ color: "#18a3dd" }}>★</span>)}</div>
                <div className="text-5xl leading-none font-black text-white/10 -mb-3" style={{ fontFamily: "Georgia, serif" }}>"</div>
                <p className="text-white/70 leading-relaxed text-sm flex-1">{t.text}</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 text-white" style={{ background: "linear-gradient(135deg, #18a3dd, #0e7aaa)", fontFamily: "var(--font-raleway), sans-serif" }}>{t.name[0]}</div>
                  <div>
                    <div className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>{t.name}</div>
                    <div className="text-white/40 text-xs">{t.sport}</div>
                  </div>
                  <div className="ml-auto text-white/20 text-xs font-bold">G</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK CTA */}
      <section className="py-16 md:py-16 md:py-24 px-6 bg-[#f8fbfe]">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl p-5 sm:p-10 md:p-16 text-center text-white" style={{ background: "linear-gradient(145deg, #002256 0%, #18a3dd 100%)", boxShadow: "0 24px 60px rgba(24,163,221,0.2)" }}>
            <span className="text-xs font-bold tracking-widest uppercase text-[#a9eee6]">First Visit</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
              Finally Move With<br />More Ease Again.
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl mx-auto">
              A 50-minute first visit where we assess how your body is moving, guide you through a targeted assisted stretch, and show you what's most likely holding you back.
            </p>
            <div className="mt-10 grid md:grid-cols-3 gap-4">
              {[
                { title: "Feel looser day one", body: "Most clients notice more ease and less tightness from the very first visit." },
                { title: "Completely personalised", body: "No floor work. No group class. Built around how your body moves right now." },
                { title: "Calm boutique studio", body: "Limited spots each week. Unhurried. Fully one-to-one." },
              ].map((f) => (
                <div key={f.title} className="bg-white/10 border border-white/20 rounded-xl p-5 text-left">
                  <h4 className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>{f.title}</h4>
                  <p className="mt-2 text-xs text-white/60 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
            <div id="book" className="scroll-mt-24 mt-12 bg-white rounded-2xl p-3 sm:p-5 text-left">
              <OptInForm formId="Sbs6nDwOoPj8gFxO7nJv" formName="Adults_LP Opt In Form" height={900} />
            </div>
            <p className="mt-5 text-sm text-white/40">You do not have to keep adapting your life to a tight body.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-16 px-6 bg-[#001433]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={asset("/homeImage.png")} alt="StretchWorks" width={240} height={70} className="h-16 w-auto object-contain mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Personalised assisted stretching for people in their 50s and 60s who want to move better and stay that way.</p>
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
          </div>
        </div>
      </footer>

    </div>
  );
}

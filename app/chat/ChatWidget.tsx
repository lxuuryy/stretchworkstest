"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";

const SESSION_KEY = "sw_chat_session";

function ToolResultCard({ result }: {
  result: {
    refCode: string; name: string; email: string;
    concern: string; preferredTime: string; sessionType: string;
  }
}) {
  const labels: Record<string, string> = {
    athletic: "Athletic Performance",
    recovery: "Recovery & Injury Support",
    "healthy-ageing": "50–60 Healthy Ageing",
    general: "General Session",
  };
  return (
    <div className="mt-2 rounded-xl overflow-hidden text-xs" style={{ border: "1px solid rgba(24,163,221,0.35)", background: "rgba(24,163,221,0.07)" }}>
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: "rgba(24,163,221,0.15)", borderBottom: "1px solid rgba(24,163,221,0.2)" }}>
        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "#18a3dd" }}>
          <span className="text-white" style={{ fontSize: "8px", fontWeight: 900 }}>✓</span>
        </div>
        <span className="font-bold text-white">Consultation Confirmed</span>
        <span className="ml-auto font-mono" style={{ color: "#18a3dd", fontSize: "10px" }}>{result.refCode}</span>
      </div>
      <div className="p-3 grid grid-cols-2 gap-2">
        {[
          { l: "Name", v: result.name },
          { l: "Email", v: result.email },
          { l: "Session", v: labels[result.sessionType] ?? result.sessionType },
          { l: "Time", v: result.preferredTime },
          { l: "Concern", v: result.concern, full: true },
        ].map((r) => (
          <div key={r.l} className={r.full ? "col-span-2" : ""}>
            <div className="text-white/30 uppercase tracking-widest mb-0.5" style={{ fontSize: "9px", fontWeight: 700 }}>{r.l}</div>
            <div className="text-white/75">{r.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Message({ msg }: { msg: UIMessage }) {
  const isUser = msg.role === "user";
  if (!msg.parts?.length) return null;

  return (
    <div className={`flex gap-2 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center mt-0.5" style={{ background: "linear-gradient(135deg,#18a3dd,#0e7aaa)", fontSize: "9px", color: "white", fontWeight: 900, fontFamily: "var(--font-raleway),sans-serif" }}>
          SW
        </div>
      )}
      <div className={`flex flex-col gap-1.5 max-w-[82%] ${isUser ? "items-end" : "items-start"}`}>
        {msg.parts.map((p, i) => {
          // Text part
          if (p.type === "text") {
            return p.text ? (
              <div key={i} className="rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed"
                style={isUser
                  ? { background: "#18a3dd", color: "white", borderBottomRightRadius: 4 }
                  : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.08)", borderBottomLeftRadius: 4 }
                }
              >{p.text}</div>
            ) : null;
          }

          // Tool parts — v6: type is `tool-${name}` or `dynamic-tool`
          // State is directly on the part: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
          const part = p as any;
          const isToolPart = typeof part.type === "string" && (part.type.startsWith("tool-") || part.type === "dynamic-tool");
          if (!isToolPart) return null;

          const toolName = part.type === "dynamic-tool" ? part.toolName : part.type.replace(/^tool-/, "");

          if (part.state === "output-available" && toolName === "setup_consultation") {
            return <ToolResultCard key={i} result={part.output as any} />;
          }

          if (part.state === "input-streaming" || part.state === "input-available") {
            return (
              <div key={i} className="flex items-center gap-1.5 text-xs text-white/30 py-1.5">
                <div className="w-2.5 h-2.5 rounded-full border border-[#18a3dd]/40 animate-pulse" />
                Setting up your consultation…
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  // Mount gate — guarantees the server render and the first client render
  // both produce nothing, so there is no hydration mismatch in production.
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Create the transport once — not on every render.
  // In production the pages are served via the Cloudflare proxy on chatwithresume.app,
  // so call the API directly on Vercel (CORS-enabled) to bypass the Worker entirely.
  const transport = useMemo(() => {
    const apiBase =
      process.env.NODE_ENV === "production" ? "https://stretchworkstest.vercel.app" : "";
    return new DefaultChatTransport({ api: `${apiBase}/api/chat` });
  }, []);

  const { messages, sendMessage, setMessages, status } = useChat({ transport });

  useEffect(() => {
    setMounted(true);
    // Restore saved session into the chat state.
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      }
    } catch {}
    setLoaded(true);
  }, [setMessages]);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(messages)); } catch {}
  }, [messages, loaded]);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const isStreaming = status === "streaming" || status === "submitted";
  const hasMessages = messages.length > 0;

  const submit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    setInput("");
    await sendMessage({ text: trimmed });
  };

  const starters = [
    "My recovery is slow after training",
    "I have morning stiffness every day",
    "I'm recovering from an injury",
    "My hips and back feel locked up",
  ];

  // Don't render anything until mounted on the client (avoids hydration mismatch)
  if (!mounted) return null;

  return (
    <>
      {/* PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[100] flex flex-col overflow-hidden shadow-2xl
              inset-0 rounded-none
              sm:inset-auto sm:bottom-24 sm:right-5 sm:rounded-2xl sm:w-[380px] sm:h-[560px]"
            style={{
              background: "#080e1a",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(24,163,221,0.1)",
            }}
          >
            {/* Header */}
            <div className="shrink-0 flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
              {/* Back arrow on mobile, hidden on desktop */}
              <button
                onClick={() => setOpen(false)}
                className="sm:hidden w-7 h-7 flex items-center justify-center rounded-lg text-white/50 hover:text-white transition-colors shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#18a3dd,#0e7aaa)", fontSize: "10px", color: "white", fontWeight: 900, fontFamily: "var(--font-raleway),sans-serif" }}>
                SW
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm leading-none" style={{ fontFamily: "var(--font-raleway),sans-serif" }}>StretchWorks</div>
                {/* Page links — hidden on small mobile */}
                <div className="hidden xs:flex items-center gap-2 mt-1">
                  {[
                    { label: "Athletic", href: "/athletic" },
                    { label: "Recovery", href: "/recovery-and-injury-support" },
                    { label: "50s & 60s", href: "/50-60-stiffness-and-healthy-ageing" },
                  ].map((l) => (
                    <a key={l.href} href={l.href} className="text-[10px] text-white/30 hover:text-[#18a3dd] transition-colors">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasMessages && (
                  <button
                    onClick={() => { localStorage.removeItem(SESSION_KEY); window.location.reload(); }}
                    className="text-white/25 hover:text-white/50 transition-colors text-[11px]"
                  >
                    Clear
                  </button>
                )}
                {/* X only on desktop — mobile uses back arrow */}
                <button onClick={() => setOpen(false)} className="hidden sm:flex w-6 h-6 items-center justify-center rounded-lg text-white/40 hover:text-white/80 transition-all">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: "none" }}>
              {!hasMessages && (
                <div className="mb-5">
                  <p className="text-white/40 text-[13px] leading-relaxed mb-4">
                    Tell us what's going on — we'll find the right session for you.
                  </p>
                  <div className="flex flex-col gap-2">
                    {starters.map((s) => (
                      <button
                        key={s}
                        onClick={() => submit(s)}
                        className="text-left text-xs px-3.5 py-2.5 rounded-xl border transition-all duration-200 hover:border-[#18a3dd]/40 hover:text-white/70 hover:bg-[#18a3dd]/05"
                        style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.38)" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => <Message key={msg.id} msg={msg} />)}

              {isStreaming && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#18a3dd,#0e7aaa)", fontSize: "9px", color: "white", fontWeight: 900, fontFamily: "var(--font-raleway),sans-serif" }}>SW</div>
                  <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#18a3dd", opacity: 0.6, animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); submit(input); }} className="shrink-0 flex gap-2 px-3 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <input
                ref={inputRef}
                value={input ?? ""}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What's going on?"
                disabled={isStreaming}
                className="flex-1 rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder-white/25 outline-none transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", fontFamily: "var(--font-open-sans),sans-serif" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(24,163,221,0.45)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{ background: "linear-gradient(135deg,#18a3dd,#0e7aaa)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l6 6-6 6M13 7H1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOGGLE BUTTON — hidden on mobile when panel is open (panel is full-screen, back arrow closes it) */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-5 right-5 z-[100] w-14 h-14 rounded-2xl items-center justify-center shadow-lg ${open ? "hidden sm:flex" : "flex"}`}
        style={{ background: open ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg,#18a3dd,#0e7aaa)", boxShadow: open ? "none" : "0 8px 30px rgba(24,163,221,0.45)", border: open ? "1px solid rgba(255,255,255,0.12)" : "none" }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2C6.03 2 2 5.58 2 10c0 2.1.87 4.01 2.3 5.46L3 20l4.85-1.56C9.13 18.8 10.04 19 11 19c4.97 0 9-3.58 9-8s-4.03-9-9-9z" fill="white"/>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread dot — only when closed and has messages */}
        {!open && hasMessages && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#080e1a] animate-pulse" style={{ background: "#18a3dd" }} />
        )}
      </motion.button>
    </>
  );
}

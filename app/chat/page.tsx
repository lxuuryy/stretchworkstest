"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { UIMessage } from "ai";

const SESSION_KEY = "sw_chat_session";

const navLinks = [
  { label: "Athletic", href: "/athletic" },
  { label: "Recovery & Injury", href: "/recovery-and-injury-support" },
  { label: "50s & 60s", href: "/50-60-stiffness-and-healthy-ageing" },
];

function ToolResultCard({ result }: { result: { success: boolean; refCode: string; name: string; email: string; concern: string; preferredTime: string; sessionType: string; message: string } }) {
  const typeLabels: Record<string, string> = {
    athletic: "Athletic Performance",
    recovery: "Recovery & Injury Support",
    "healthy-ageing": "50–60 Stiffness & Healthy Ageing",
    general: "General Session",
  };

  return (
    <div
      className="rounded-2xl overflow-hidden mt-3"
      style={{ border: "1px solid rgba(24,163,221,0.3)", background: "rgba(24,163,221,0.06)" }}
    >
      <div
        className="px-5 py-3 flex items-center gap-3"
        style={{ background: "rgba(24,163,221,0.12)", borderBottom: "1px solid rgba(24,163,221,0.2)" }}
      >
        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: "#18a3dd" }}>
          <span className="text-white text-xs font-black">✓</span>
        </div>
        <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
          Consultation Confirmed
        </span>
        <span className="ml-auto text-xs font-mono" style={{ color: "#18a3dd" }}>{result.refCode}</span>
      </div>
      <div className="px-5 py-4 grid grid-cols-2 gap-3">
        {[
          { label: "Name", value: result.name },
          { label: "Email", value: result.email },
          { label: "Session", value: typeLabels[result.sessionType] || result.sessionType },
          { label: "Preferred Time", value: result.preferredTime.charAt(0).toUpperCase() + result.preferredTime.slice(1) },
          { label: "Concern", value: result.concern, full: true },
        ].map((item) => (
          <div key={item.label} className={item.full ? "col-span-2" : ""}>
            <div className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-0.5">{item.label}</div>
            <div className="text-sm text-white/80">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Message({ msg }: { msg: UIMessage }) {
  const isUser = msg.role === "user";

  const textParts = msg.parts?.filter((p) => p.type === "text") ?? [];
  const toolParts = msg.parts?.filter((p) => p.type === "tool-invocation") ?? [];

  if (!textParts.length && !toolParts.length) return null;

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} mb-6`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center mt-0.5" style={{ background: "linear-gradient(135deg, #18a3dd, #0e7aaa)" }}>
          <span className="text-white text-xs font-black" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>SW</span>
        </div>
      )}

      <div className={`max-w-[78%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        {textParts.map((part, i) =>
          part.type === "text" && part.text ? (
            <div
              key={i}
              className="rounded-2xl px-5 py-4 text-sm leading-relaxed"
              style={
                isUser
                  ? { background: "#18a3dd", color: "white", borderBottomRightRadius: "6px" }
                  : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.08)", borderBottomLeftRadius: "6px" }
              }
            >
              {part.text}
            </div>
          ) : null
        )}

        {toolParts.map((part, i) => {
          if (part.type !== "tool-invocation") return null;
          const inv = part.toolInvocation;
          if (inv.toolName === "setup_consultation" && inv.state === "result") {
            return <ToolResultCard key={i} result={inv.result as any} />;
          }
          if (inv.state === "call" || inv.state === "partial-call") {
            return (
              <div key={i} className="flex items-center gap-2 text-xs text-white/30 py-2">
                <div className="w-3 h-3 rounded-full border border-[#18a3dd]/40 animate-pulse" />
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

export default function ChatPage() {
  const [storedMessages, setStoredMessages] = useState<UIMessage[]>([]);
  const [loaded, setLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load session from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setStoredMessages(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  const { messages, input, setInput, handleSubmit, status } = useChat({
    api: "/api/chat",
    initialMessages: storedMessages,
  });

  // Persist to localStorage on every change
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages, loaded]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isStreaming = status === "streaming" || status === "submitted";

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    window.location.reload();
  };

  if (!loaded) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#080e1a", fontFamily: "var(--font-open-sans), sans-serif" }}>

      {/* NAV */}
      <nav className="border-b flex items-center justify-between px-6 h-14 shrink-0" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(8,14,26,0.95)", backdropFilter: "blur(12px)" }}>
        <Link href="/">
          <Image src="/homeImage.png" alt="StretchWorks" width={130} height={36} className="h-7 w-auto object-contain brightness-0 invert" />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-xs font-semibold text-white/40 hover:text-white/80 transition-colors tracking-wide">
              {l.label}
            </Link>
          ))}
        </div>
        <button onClick={clearSession} className="text-[11px] text-white/25 hover:text-white/50 transition-colors">
          Clear session
        </button>
      </nav>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 md:px-0">
        <div className="max-w-2xl mx-auto py-10">

          {/* Intro — only if no messages */}
          {messages.length === 0 && (
            <div className="mb-10">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, #18a3dd, #0e7aaa)" }}>
                <span className="text-white font-black text-base" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>SW</span>
              </div>
              <h1 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "var(--font-raleway), sans-serif" }}>
                Find your session.
              </h1>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                Tell us a bit about what's going on — we'll point you in the right direction and get you set up.
              </p>

              {/* Quick starters */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  "I train hard but recovery is slow",
                  "I've been dealing with morning stiffness",
                  "I'm recovering from an injury",
                  "My hips and back feel locked up",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setInput(s);
                      setTimeout(() => inputRef.current?.form?.requestSubmit(), 50);
                    }}
                    className="text-xs px-4 py-2 rounded-full border transition-all duration-200 hover:border-[#18a3dd]/60 hover:text-white/80 hover:bg-[#18a3dd]/05"
                    style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <Message key={msg.id} msg={msg} />
          ))}

          {/* Typing indicator */}
          {isStreaming && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #18a3dd, #0e7aaa)" }}>
                <span className="text-white text-xs font-black">SW</span>
              </div>
              <div className="flex items-center gap-1.5 px-5 py-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#18a3dd]/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT */}
      <div className="shrink-0 border-t px-4 py-4" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(8,14,26,0.98)" }}>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex gap-3 items-end"
        >
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What's going on with your body?"
              disabled={isStreaming}
              className="w-full rounded-2xl px-5 py-3.5 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 resize-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "var(--font-open-sans), sans-serif",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(24,163,221,0.5)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
          </div>
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-30"
            style={{ background: "linear-gradient(135deg, #18a3dd, #0e7aaa)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L15 8L8 15M15 8H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
        <p className="text-center text-[10px] text-white/15 mt-3">StretchWorks · 303B Beach Road, Black Rock · 0493 720 274</p>
      </div>

    </div>
  );
}

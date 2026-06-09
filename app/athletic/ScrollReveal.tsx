"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  className?: string;
  style?: React.CSSProperties;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.08,
  baseRotation = 3,
  blurStrength = 4,
  className = "",
  style,
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  as: Tag = "h2",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(() => {
    return children.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span key={index} className="word" style={{ display: "inline-block" }}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const triggers: ScrollTrigger[] = [];

    const t1 = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      }
    );
    if (t1.scrollTrigger) triggers.push(t1.scrollTrigger);

    const wordEls = el.querySelectorAll<HTMLElement>(".word");

    const t2 = gsap.fromTo(
      wordEls,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );
    if (t2.scrollTrigger) triggers.push(t2.scrollTrigger);

    if (enableBlur) {
      const t3 = gsap.fromTo(
        wordEls,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
      if (t3.scrollTrigger) triggers.push(t3.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyTag = Tag as any;

  return (
    <AnyTag ref={containerRef} className={className} style={style}>
      {splitText}
    </AnyTag>
  );
}

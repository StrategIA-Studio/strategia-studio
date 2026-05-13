"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MarqueeStrip({ text, speed = 1.1 }) {
  const innerRef = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    let x = 0;
    let velocity = 0;
    let lastY = window.scrollY;

    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      velocity = dy * 0.28;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const half = inner.scrollWidth / 2;

    const tick = () => {
      x -= speed + velocity;
      velocity *= 0.9;
      if (x <= -half) x += half;
      gsap.set(inner, { x });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("scroll", onScroll);
    };
  }, [text, speed]);

  const items = Array(10).fill(`${text} — `);

  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBlock: "1.1rem" }}>
      <div ref={innerRef} style={{ display: "inline-flex", willChange: "transform" }}>
        {[...items, ...items].map((t, i) => (
          <span key={i}
            className="font-heading font-black uppercase"
            style={{ fontSize: "clamp(2rem, 4.5vw, 5.5rem)", letterSpacing: "-0.03em", paddingRight: "0.4em", color: "rgba(255,255,255,0.22)" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

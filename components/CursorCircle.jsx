"use client";
import { useEffect, useRef } from "react";

export default function CursorCircle() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return; // no cursor on touch-only devices

    const el = ref.current;
    if (!el) return;

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let mx = cx, my = cy;
    let animId;
    let hasMovedMouse = false;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!hasMovedMouse) {
        hasMovedMouse = true;
        checkVisibility();
      }
    };

    const checkVisibility = () => {
      const inHero = window.scrollY < window.innerHeight * 0.85;
      el.style.opacity = (!hasMovedMouse || inHero) ? "0" : "1";
    };

    const tick = () => {
      cx += (mx - cx) * 0.11;
      cy += (my - cy) * 0.11;
      el.style.left = `${cx}px`;
      el.style.top  = `${cy}px`;
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    window.addEventListener("mousemove",  onMove,          { passive: true });
    window.addEventListener("scroll",     checkVisibility, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("scroll",     checkVisibility);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position:      "fixed",
        width:         "40px",
        height:        "40px",
        border:        "1px solid rgba(255,255,255,0.6)",
        borderRadius:  "50%",
        transform:     "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex:        9000,
        opacity:       0,
        transition:    "opacity 0.35s ease",
      }}
    />
  );
}

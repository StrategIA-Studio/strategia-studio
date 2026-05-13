"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ContactPage() {
  const root      = useRef(null);
  const bgRef     = useRef(null);
  const cursorDot    = useRef(null);
  const cursorCircle = useRef(null);

  useEffect(() => {
    const bg     = bgRef.current;
    const dot    = cursorDot.current;
    const circle = cursorCircle.current;

    bg.style.backgroundColor = "#00819F";

    let onMove = null, tick = null;
    if (dot && circle) {
      let mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;
      onMove = (e) => { mx = e.clientX; my = e.clientY; gsap.to(dot, { x: mx, y: my, duration: 0.07, ease: "none", overwrite: true }); };
      tick   = () => { cx += (mx - cx) * 0.11; cy += (my - cy) * 0.11; gsap.set(circle, { x: cx, y: cy }); };
      window.addEventListener("mousemove", onMove, { passive: true });
      gsap.ticker.add(tick);
    }

    const ctx = gsap.context(() => {
      gsap.set(".ct-title", { opacity: 0, y: 60 });
      gsap.set(".ct-sub",   { opacity: 0, y: 14 });
      gsap.set(".ct-form",  { opacity: 0, y: 28 });
      gsap.set(".ct-bar",   { opacity: 0 });

      gsap.timeline({ delay: 0.15 })
        .to(".ct-title", { opacity: 1, y: 0, duration: 0.65, ease: "expo.out" }, 0.1)
        .to(".ct-sub",   { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.45)
        .to(".ct-form",  { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.55)
        .to(".ct-bar",   { opacity: 1, duration: 0.4, ease: "power3.out" }, 0.70);
    }, root);

    return () => {
      ctx.revert();
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (tick)   gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div ref={bgRef} style={{ position: "fixed", inset: 0, zIndex: 0, backgroundColor: "#00819F" }} />
      <div ref={cursorDot}    className="cursor-dot" />
      <div ref={cursorCircle} className="cursor-circle" />

      <main ref={root} className="relative z-[1] min-h-screen overflow-x-hidden">


        <div className="relative z-10 flex min-h-screen flex-col justify-center px-8 pb-32 md:px-14">

          <h1 className="ct-title font-heading font-black uppercase text-white"
            style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            CONTACT
          </h1>

          <p className="ct-sub mb-8 mt-4 font-body text-sm font-light text-white/70">
            Your digital success awaits. Let's get started!
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="ct-form w-full max-w-2xl space-y-5">
            <div className="grid grid-cols-2 gap-8">
              <Field label="Company Name" type="text" />
              <Field label="Type of Business" type="text" />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <Field label="Phone" type="tel" />
              <Field label="Email" type="email" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-body text-[9px] uppercase tracking-[0.18em] text-white">Message</label>
              <textarea rows={2}
                className="resize-none border-b border-white/40 bg-transparent pb-2 pt-1 font-body text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none" />
            </div>
            <div className="pt-1 text-center">
              <button type="submit"
                className="inline-block rounded-full border border-white px-8 py-3 font-body text-xs font-normal text-white transition-colors hover:bg-white hover:text-[#00819F]">
                Send
              </button>
            </div>
          </form>
        </div>

        {/* footer bar */}
        <div className="ct-bar relative z-10 flex items-center justify-between border-t border-white/20 px-8 pt-4 pb-5 md:px-14">
          <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/70">Get in touch!</span>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/strategia.studio/" target="_blank" rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/60">
              <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/strategia-az/?viewAsMember=true" target="_blank" rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/60">
              <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-body text-[10px] uppercase tracking-[0.35em] text-white/70 transition-colors hover:text-white">
            Back to top
          </button>
        </div>

        <div className="pointer-events-none select-none overflow-hidden text-center px-6 pt-10 pb-16">
          <p className="font-heading font-black text-white"
            style={{ fontSize: "clamp(3rem, 9vw, 11rem)", letterSpacing: "-0.04em", lineHeight: 0.88 }}>
            StrategIA
          </p>
        </div>

      </main>
    </>
  );
}

function Field({ label, type }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-[9px] uppercase tracking-[0.18em] text-white">{label}</label>
      <input type={type}
        className="border-b border-white/40 bg-transparent pb-2 pt-1 font-body text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProjectFooter from "@/components/ProjectFooter";

gsap.registerPlugin(ScrollTrigger);

const PARAS = [
  "Davveroo è una startup digitale nata per semplificare la gestione di pagamenti e servizi per aziende, negozi e professionisti attraverso un'unica piattaforma integrata.",
  "Il progetto unisce strumenti come POS, pagamenti a rate, gift card, utilities e marketing digitale in un ecosistema moderno, intuitivo e pensato per rendere il lavoro più veloce ed efficiente.",
  "L'obiettivo di Davveroo è ridurre la complessità che molte attività affrontano ogni giorno, offrendo soluzioni semplici, accessibili e adatte alle nuove esigenze del commercio digitale. Non solo pagamenti, ma un sistema completo pensato per aiutare le aziende a crescere, organizzarsi meglio e migliorare l'esperienza del cliente.",
];

export default function Davveroo() {
  const root         = useRef(null);
  const bgRef        = useRef(null);
  const cursorDot    = useRef(null);
  const cursorCircle = useRef(null);

  useEffect(() => {
    const bg     = bgRef.current;
    const dot    = cursorDot.current;
    const circle = cursorCircle.current;

    bg.style.backgroundColor = "#0B1E38";

    let onMove = null, tick = null;
    if (dot && circle) {
      let mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;
      onMove = (e) => { mx = e.clientX; my = e.clientY; gsap.to(dot, { x: mx, y: my, duration: 0.07, ease: "none", overwrite: true }); };
      tick   = () => { cx += (mx - cx) * 0.11; cy += (my - cy) * 0.11; gsap.set(circle, { x: cx, y: cy }); };
      window.addEventListener("mousemove", onMove, { passive: true });
      gsap.ticker.add(tick);
    }

    const ctx = gsap.context(() => {

      gsap.set(".dv-label", { opacity: 0, y: 10 });
      gsap.set(".dv-title", { opacity: 0, y: 40 });

      gsap.timeline({ delay: 0.2 })
        .to(".dv-title", { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" })
        .to(".dv-label", { opacity: 1, y: 0, duration: 0.40, ease: "power3.out" }, 0.45);

      gsap.set(".dv-img", { clipPath: "inset(0 0 100% 0)" });
      gsap.to(".dv-img", {
        clipPath: "inset(0 0 0% 0)", ease: "power3.out",
        scrollTrigger: { trigger: ".dv-img", start: "top 80%", end: "top 10%", scrub: 1.8 },
      });
      gsap.to(".dv-img img", {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: ".dv-img", start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.set(".dv-para", { opacity: 0.07 });
      gsap.to(".dv-para", {
        opacity: 1, ease: "none", stagger: 0.07, duration: 0.18,
        scrollTrigger: { trigger: ".dv-intro", start: "top 55%", end: "top 5%", scrub: 0.8 },
      });

      gsap.set(".dv-photo", { opacity: 0, y: 30 });
      gsap.to(".dv-photo", {
        opacity: 1, y: 0, ease: "power3.out",
        scrollTrigger: { trigger: ".dv-photo", start: "top 85%", end: "top 35%", scrub: 1.2 },
      });

      gsap.set(".dv-cta", { opacity: 0 });
      gsap.to(".dv-cta", {
        opacity: 1,
        scrollTrigger: { trigger: ".dv-cta", start: "top 80%", end: "top 40%", scrub: 1 },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (tick)   gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div ref={bgRef} style={{ position: "fixed", inset: 0, zIndex: 0, backgroundColor: "#0B1E38" }} />
      <div ref={cursorDot}    className="cursor-dot" />
      <div ref={cursorCircle} className="cursor-circle" />

      <main ref={root} className="overflow-x-hidden" style={{ position: "relative", zIndex: 1 }}>

        {/* ══ HERO ══ */}
        <section className="relative h-screen flex flex-col justify-end px-8 md:px-12 pb-16">
          <p className="dv-label font-body font-light uppercase tracking-[0.32em] text-white/45 mb-5"
            style={{ fontSize: "0.62rem" }}>
            Brand Identity
          </p>
          <h1 className="dv-title font-heading font-black uppercase text-white"
            style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", lineHeight: 0.85, letterSpacing: "-0.04em" }}>
            DAVVEROO
          </h1>
        </section>

        <MarqueeStrip text="DAVVEROO" />

        {/* ══ FOTO SX + TESTO DX ══ */}
        <section className="dv-intro grid gap-16 px-8 md:px-12 py-24"
          style={{ gridTemplateColumns: "clamp(280px, 40vw, 520px) 1fr", alignItems: "stretch" }}>

          <div className="dv-img overflow-hidden" style={{ width: "100%", height: "100%", minHeight: "300px" }}>
            <img src="/works/davveroo.png" alt="Davveroo"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          </div>

          <div style={{ paddingTop: "0.5vw" }}>
            {PARAS.map((p, i) => (
              <p key={i} className="dv-para font-body font-black uppercase text-white mb-10"
                style={{ fontSize: "clamp(1.1rem, 2vw, 2.4rem)", lineHeight: 1.4, letterSpacing: "-0.01em" }}>
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* ══ CTA INSTAGRAM ══ */}
        <section className="dv-cta flex items-center justify-center py-16">
          <a href="https://www.instagram.com/_davveroo/"
            target="_blank" rel="noopener noreferrer"
            className="font-body font-light uppercase text-white"
            style={{ fontSize: "0.95rem", letterSpacing: "0.28em", borderBottom: "1px solid rgba(255,255,255,0.35)", paddingBottom: "5px" }}>
            View IG Profile →
          </a>
        </section>

        {/* ══ FOTO INSTAGRAM ══ */}
        <section className="dv-photo px-8 md:px-12 pb-24">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {[
            "/works/davveroo-1.png",
            "/works/davveroo-2.png",
            "/works/davveroo-3.png",
          ].map((src, i) => (
              <div key={i} style={{ aspectRatio: "1/1", overflow: "hidden" }}>
                <img src={src} alt={`Davveroo — Instagram ${i + 1}`}
                  onError={(e) => { e.currentTarget.src = "/works/davveroo.png"; }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
              </div>
            ))}
          </div>
        </section>

        <ProjectFooter name="Davveroo" />

      </main>
    </>
  );
}

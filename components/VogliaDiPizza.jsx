"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProjectFooter from "@/components/ProjectFooter";

gsap.registerPlugin(ScrollTrigger);

const PARAS = [
  "Voglia di Pizza è una pizzeria diventata punto di riferimento grazie a una proposta veloce, riconoscibile e di qualità, capace di unire tradizione e praticità.",
  "È stata fra le prime realtà in Italia a proporre la pizza in teglia al metro, trasformandola in un format conviviale e accessibile, perfetto per gruppi, famiglie e asporto.",
  "I suoi punti di forza sono impasto curato, ingredienti selezionati, rapidità del servizio, ampia varietà di gusti e una forte continuità nel prodotto che fidelizza il cliente nel tempo.",
];

export default function VogliaDiPizza() {
  const root         = useRef(null);
  const bgRef        = useRef(null);
  const cursorDot    = useRef(null);
  const cursorCircle = useRef(null);
  const videoRef     = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  useEffect(() => {
    const bg     = bgRef.current;
    const dot    = cursorDot.current;
    const circle = cursorCircle.current;

    bg.style.backgroundColor = "#0B1E38";

    /* cursore */
    let onMove = null, tick = null;
    if (dot && circle) {
      let mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;
      onMove = (e) => { mx = e.clientX; my = e.clientY; gsap.to(dot, { x: mx, y: my, duration: 0.07, ease: "none", overwrite: true }); };
      tick   = () => { cx += (mx - cx) * 0.11; cy += (my - cy) * 0.11; gsap.set(circle, { x: cx, y: cy }); };
      window.addEventListener("mousemove", onMove, { passive: true });
      gsap.ticker.add(tick);
    }

    const ctx = gsap.context(() => {

      /* ── HERO — entrata semplice, nessun battito ── */
      gsap.set(".vdp-label", { opacity: 0, y: 10 });
      gsap.set(".vdp-title", { opacity: 0, y: 40 });

      gsap.timeline({ delay: 0.2 })
        .to(".vdp-title", { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" })
        .to(".vdp-label", { opacity: 1, y: 0, duration: 0.40, ease: "power3.out" }, 0.45);

      /* ── IMMAGINE — reveal clip-path + parallax ── */
      gsap.set(".vdp-img1", { clipPath: "inset(0 0 100% 0)" });
      gsap.to(".vdp-img1", {
        clipPath: "inset(0 0 0% 0)", ease: "power3.out",
        scrollTrigger: { trigger: ".vdp-img1", start: "top 80%", end: "top 10%", scrub: 1.8 },
      });
      gsap.to(".vdp-img1 img", {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: ".vdp-img1", start: "top bottom", end: "bottom top", scrub: true },
      });

      /* ── TESTO — grigio → bianco più veloce ── */
      gsap.set(".vdp-para", { opacity: 0.07 });
      gsap.to(".vdp-para", {
        opacity: 1, ease: "none", stagger: 0.07, duration: 0.18,
        scrollTrigger: {
          trigger: ".vdp-intro",
          start: "top 55%", end: "top 5%",
          scrub: 0.8,
        },
      });

      /* ── REEL + VIDEO — reveal ── */
      gsap.set(".vdp-media", { opacity: 0, y: 30 });
      gsap.to(".vdp-media", {
        opacity: 1, y: 0, ease: "power3.out",
        scrollTrigger: { trigger: ".vdp-media", start: "top 80%", end: "top 30%", scrub: 1.2 },
      });

      /* ── CTA ── */
      gsap.set(".vdp-cta", { opacity: 0 });
      gsap.to(".vdp-cta", {
        opacity: 1,
        scrollTrigger: { trigger: ".vdp-cta", start: "top 80%", end: "top 40%", scrub: 1 },
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
          <p className="vdp-label font-body font-light uppercase tracking-[0.32em] text-white/45 mb-5"
            style={{ fontSize: "0.62rem" }}>
            Digital Positioning &amp; Offline Marketing
          </p>
          <h1
            className="vdp-title font-heading font-black uppercase text-white"
            style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", lineHeight: 0.85, letterSpacing: "-0.04em" }}
          >
            VOGLIA<br />DI PIZZA
          </h1>
        </section>

        <MarqueeStrip text="VOGLIA DI PIZZA" />

        {/* ══ FOTO SX + TESTO DX — stessa altezza ══ */}
        <section
          className="vdp-intro grid gap-16 px-8 md:px-12 py-24"
          style={{ gridTemplateColumns: "clamp(280px, 40vw, 520px) 1fr", alignItems: "stretch" }}
        >
          {/* SINISTRA — foto si allunga fino al testo */}
          <div className="vdp-img1 overflow-hidden" style={{ width: "100%", height: "100%", minHeight: "300px" }}>
            <img
              src="/works/voglia-di-pizza.png"
              alt="Voglia di Pizza"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </div>

          {/* DESTRA — testo grande */}
          <div style={{ paddingTop: "0.5vw" }}>
            {PARAS.map((p, i) => (
              <p
                key={i}
                className="vdp-para font-body font-black uppercase text-white mb-10"
                style={{ fontSize: "clamp(1.1rem, 2vw, 2.4rem)", lineHeight: 1.4, letterSpacing: "-0.01em" }}
              >
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* ══ CTA INSTAGRAM ══ */}
        <section className="vdp-cta flex items-center justify-center py-16">
          <a
            href="https://www.instagram.com/vogliadipizzacetraro/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-light uppercase text-white"
            style={{ fontSize: "0.95rem", letterSpacing: "0.28em", borderBottom: "1px solid rgba(255,255,255,0.35)", paddingBottom: "5px" }}
          >
            View IG Profile →
          </a>
        </section>

        {/* ══ VIDEO — centrato, con play ══ */}
        <section className="flex justify-center px-8 md:px-12 pb-24">
          <div
            className="vdp-media"
            style={{ width: "min(340px, 55vw)", aspectRatio: "9/16", position: "relative", overflow: "hidden", backgroundColor: "#060f1c" }}
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src="/videos/voglia-di-pizza.mp4"
              playsInline
              loop
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />

            {/* pulsante PLAY — centro */}
            {!playing && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="font-body font-light uppercase tracking-[0.28em] text-white"
                  style={{ fontSize: "0.65rem", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: "3px" }}>
                  Play
                </span>
              </div>
            )}

            {/* pulsante AUDIO — angolo in basso a destra */}
            <button
              onClick={toggleMute}
              style={{ position: "absolute", bottom: "14px", right: "14px", background: "none", border: "none", padding: 0 }}
            >
              <span className="font-body font-light uppercase tracking-[0.24em] text-white"
                style={{ fontSize: "0.58rem", borderBottom: "1px solid rgba(255,255,255,0.35)", paddingBottom: "2px" }}>
                {muted ? "Audio on" : "Mute"}
              </span>
            </button>
          </div>
        </section>


        <ProjectFooter name="Voglia di Pizza" />

      </main>
    </>
  );
}

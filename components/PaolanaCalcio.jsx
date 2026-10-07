"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProjectFooter from "@/components/ProjectFooter";

gsap.registerPlugin(ScrollTrigger);

const PARAS = [
  "Gestione completa della comunicazione digitale della USD Paolana 1922, dalla strategia editoriale alla produzione dei contenuti. StrategIA cura la presenza del club su Instagram e Facebook, occupandosi di pianificazione editoriale, copywriting, pubblicazione dei contenuti e gestione della comunicazione durante tutta la stagione.",
  "Il progetto comprende la realizzazione dell'intera comunicazione visiva del club: Match Day, Starting XI, Full Time, nuovi acquisti, MVP, comunicati ufficiali, sponsor e contenuti istituzionali.",
  "Durante le partite, in casa e in trasferta, viene realizzata una copertura completa del match day attraverso fotografia sportiva, video verticali, Stories in tempo reale, backstage, reel, carousel fotografici e interviste post-partita. La comunicazione continua durante la settimana con contenuti dagli allenamenti, focus sui calciatori, backstage, format originali e storytelling dedicato a squadra, tifosi e territorio.",
];

export default function PaolanaCalcio() {
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

    let onMove = null, tick = null;
    if (dot && circle) {
      let mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;
      onMove = (e) => { mx = e.clientX; my = e.clientY; gsap.to(dot, { x: mx, y: my, duration: 0.07, ease: "none", overwrite: true }); };
      tick   = () => { cx += (mx - cx) * 0.11; cy += (my - cy) * 0.11; gsap.set(circle, { x: cx, y: cy }); };
      window.addEventListener("mousemove", onMove, { passive: true });
      gsap.ticker.add(tick);
    }

    const ctx = gsap.context(() => {

      gsap.set(".pc-label", { opacity: 0, y: 10 });
      gsap.set(".pc-title", { opacity: 0, y: 40 });

      gsap.timeline({ delay: 0.2 })
        .to(".pc-title", { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" })
        .to(".pc-label", { opacity: 1, y: 0, duration: 0.40, ease: "power3.out" }, 0.45);

      gsap.set(".pc-img", { clipPath: "inset(0 0 100% 0)" });
      gsap.to(".pc-img", {
        clipPath: "inset(0 0 0% 0)", ease: "power3.out",
        scrollTrigger: { trigger: ".pc-img", start: "top 80%", end: "top 10%", scrub: 1.8 },
      });
      gsap.to(".pc-img img", {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: ".pc-img", start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.set(".pc-para", { opacity: 0.07 });
      gsap.to(".pc-para", {
        opacity: 1, ease: "none", stagger: 0.07, duration: 0.18,
        scrollTrigger: { trigger: ".pc-intro", start: "top 55%", end: "top 5%", scrub: 0.8 },
      });

      gsap.set(".pc-media", { opacity: 0, y: 30 });
      gsap.to(".pc-media", {
        opacity: 1, y: 0, ease: "power3.out",
        scrollTrigger: { trigger: ".pc-media", start: "top 80%", end: "top 30%", scrub: 1.2 },
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
        <section className="relative px-8 md:px-12 pt-32 md:pt-40 pb-16">
          <p className="pc-label font-body font-light uppercase tracking-[0.32em] text-white/45 mb-5"
            style={{ fontSize: "0.62rem" }}>
            Social Media Management · Graphic Design · Sports Photography · Content Creation
          </p>
          <h1 className="pc-title font-heading font-black uppercase text-white"
            style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", lineHeight: 0.85, letterSpacing: "-0.04em" }}>
            PAOLANA
          </h1>
        </section>

        <MarqueeStrip text="PAOLANA CALCIO" />

        {/* ══ FOTO SX + TESTO DX ══ */}
        <section className="pc-intro project-intro-grid grid gap-8 md:gap-16 px-8 md:px-12 py-24">

          <div className="pc-img overflow-hidden" style={{ width: "100%", height: "100%", minHeight: "300px" }}>
            <img src="/works/paolana-calcio.jpg" alt="Paolana Calcio"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          </div>

          <div style={{ paddingTop: "0.5vw" }}>
            {PARAS.map((p, i) => (
              <p key={i} className="pc-para font-body font-black uppercase text-white mb-10"
                style={{ fontSize: "clamp(1.1rem, 2vw, 2.4rem)", lineHeight: 1.4, letterSpacing: "-0.01em" }}>
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* ══ VIDEO ══ */}
        <section className="flex justify-center px-8 md:px-12 pb-24">
          <div className="pc-media"
            style={{ width: "min(340px, 55vw)", aspectRatio: "9/16", position: "relative", overflow: "hidden", backgroundColor: "#060f1c" }}
            onClick={togglePlay}>
            <video ref={videoRef} src="/videos/paolana-calcio.mp4"
              playsInline loop muted
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            {!playing && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="font-body font-light uppercase tracking-[0.28em] text-white"
                  style={{ fontSize: "0.65rem", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: "3px" }}>
                  Play
                </span>
              </div>
            )}
            <button onClick={toggleMute}
              style={{ position: "absolute", bottom: "14px", right: "14px", background: "none", border: "none", padding: 0 }}>
              <span className="font-body font-light uppercase tracking-[0.24em] text-white"
                style={{ fontSize: "0.58rem", borderBottom: "1px solid rgba(255,255,255,0.35)", paddingBottom: "2px" }}>
                {muted ? "Audio on" : "Mute"}
              </span>
            </button>
          </div>
        </section>

        <ProjectFooter name="Paolana Calcio" />

      </main>
    </>
  );
}

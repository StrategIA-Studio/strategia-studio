"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Dati ────────────────────────────────────────────────────── */

const HERO = {
  lines: ["OLTRE LA MENTE"],
  body: "Siamo StrategIA, un laboratorio strategico che unisce comunicazione, metodo e intelligenza artificiale per trasformare aziende senza direzione in brand strutturati, riconoscibili e orientati alla crescita.",
  bg: "#0B1E38",
};

const CHAPTERS = [
  {
    id: "c0", n: "01",
    titleLines: ["CHI SIAMO"],
    paras: [
      "Siamo un sistema costruito per evolvere le aziende.",
      "Fondata da Daniel Cetraro, StrategIA nasce dall'unione tra strategia, comunicazione e intelligenza artificiale operativa, con l'obiettivo di aiutare le aziende a costruire una presenza chiara, strutturata e competitiva nel mondo digitale.",
      "Non lavoriamo su contenuti isolati, ma su ecosistemi di comunicazione progettati per crescere nel tempo.",
    ],
    bg: "#00819F",
  },
  {
    id: "c1", n: "02",
    titleLines: ["MISSION"],
    paras: [
      "La missione di StrategIA è aiutare le aziende a costruire un sistema di comunicazione completo, strutturato e intelligente, capace di generare crescita reale nel tempo.",
      "Attraverso strategia, contenuti e intelligenza artificiale integrata in ogni processo, trasformiamo realtà senza una direzione chiara in brand organizzati, riconoscibili e orientati ai risultati.",
      "Non lavoriamo su contenuti isolati o azioni scollegate, ma costruiamo ecosistemi di comunicazione progettati per dare continuità, ordine e competitività alle aziende nel panorama digitale contemporaneo.",
    ],
    bg: "#0B1E38",
  },
  {
    id: "c2", n: "03",
    titleLines: ["VISION"],
    paras: [
      "La visione di StrategIA è ridefinire il modo in cui le aziende comunicano, costruiscono il proprio posizionamento e affrontano il cambiamento digitale.",
      "Vogliamo portare le imprese a ragionare come veri brand, integrando strategia, comunicazione e intelligenza artificiale in un unico sistema capace di evolversi nel tempo.",
      "Crediamo in un futuro in cui l'intelligenza artificiale non sia percepita come una tecnologia distante o complessa, ma come uno strumento concreto, naturale e accessibile, in grado di aumentare qualità, velocità e precisione nei processi di crescita aziendale.",
    ],
    bg: "#00819F",
  },
  {
    id: "c3", n: "04",
    titleLines: ["COSA SIGNIFICA", "\"OLTRE LA MENTE\""],
    paras: [
      "Per noi, «Oltre la Mente» significa superare il modo tradizionale con cui le aziende comunicano, prendono decisioni e costruiscono la propria presenza nel mondo digitale.",
      "Significa unire strategia, comunicazione e intelligenza artificiale in un unico sistema capace di evolversi, adattarsi e anticipare il cambiamento.",
      "È una visione che va oltre il semplice contenuto o la presenza online: ogni processo viene progettato per creare ordine, continuità e una crescita reale, trasformando le aziende in brand più strutturati, riconoscibili e competitivi.",
    ],
    bg: "#0B1E38",
  },
];

/* ─── Componente ──────────────────────────────────────────────── */

export default function OltreLaMente() {
  const root         = useRef(null);
  const bgRef        = useRef(null);
  const cursorDot    = useRef(null);
  const cursorCircle = useRef(null);

  useEffect(() => {
    const bg     = bgRef.current;
    const dot    = cursorDot.current;
    const circle = cursorCircle.current;

    bg.style.backgroundColor = HERO.bg;

    /* cursore */
    let onMove = null, tick = null;
    if (dot && circle) {
      let mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;
      onMove = (e) => { mx = e.clientX; my = e.clientY; gsap.to(dot, { x: mx, y: my, duration: 0.07, ease: "none", overwrite: true }); };
      tick   = () => { cx += (mx - cx) * 0.11; cy += (my - cy) * 0.11; gsap.set(circle, { x: cx, y: cy }); };
      window.addEventListener("mousemove", onMove, { passive: true });
      gsap.ticker.add(tick);
    }

    /* GSAP */
    const ctx = gsap.context(() => {

      /* hero — battito identico alla home, body appare dopo il secondo colpo */
      gsap.set(".olm-hero-line", { opacity: 0, scale: 0.76 });
      gsap.set(".olm-hero-body", { opacity: 0, y: 24 });

      gsap.timeline({ delay: 0.1 })
        .to(".olm-hero-line", { opacity: 1, scale: 1.09, duration: 0.28, ease: "expo.out" })
        .to(".olm-hero-line", { scale: 0.98, duration: 0.13, ease: "power2.out" })
        .to(".olm-hero-line", { scale: 1.42, duration: 0.32, ease: "expo.out" })
        .to(".olm-hero-line", { scale: 1.00, duration: 0.38, ease: "power3.out" })
        .fromTo(".olm-hero-body", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" });

      /* hero pin + exit */
      gsap.timeline({
        scrollTrigger: {
          trigger: ".olm-hero", start: "top top", end: "+=200%",
          scrub: 2, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
        },
      })
        .to(".olm-hero-line", { opacity: 0, yPercent: -45, scale: 0.92, ease: "power2.inOut", duration: 0.35, stagger: 0.04 }, 0.50)
        .to(".olm-hero-body",  { opacity: 0, y: -16, ease: "power2.in", duration: 0.20 }, 0.50);

      /* capitoli */
      CHAPTERS.forEach((ch) => {
        const sel = `.olm-${ch.id}`;

        gsap.set(`${sel} .olm-num`,   { opacity: 0, x: -16 });
        gsap.set(`${sel} .olm-title`, { opacity: 0, yPercent: 55, scale: 0.88 });
        gsap.set(`${sel} .olm-body`,  { opacity: 0, y: 30 });
        gsap.set(`${sel} .olm-para`,  { opacity: 0.03 }); // quasi invisibile (3%) → bianco pieno: stacco cinematografico

        gsap.timeline({
          scrollTrigger: {
            trigger: sel, start: "top top", end: "+=380%",
            scrub: 2.5, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: () => { if (bgRef.current) bgRef.current.style.backgroundColor = ch.bg; },
          },
        })
          /* entrata */
          .to(`${sel} .olm-num`,   { opacity: 1, x: 0,       ease: "power3.out",   duration: 0.08 }, 0.02)
          .to(`${sel} .olm-title`, { opacity: 1, yPercent: 0, scale: 1, ease: "power3.out", duration: 0.20, stagger: 0.06 }, 0.04)
          .to(`${sel} .olm-body`,  { opacity: 1, y: 0,        ease: "power3.out",   duration: 0.16 }, 0.24)
          /* PROGRESSIVE TEXT REVEAL — 3% → 100%, un paragrafo alla volta */
          .to(`${sel} .olm-para`,  { opacity: 1, ease: "none", stagger: 0.12, duration: 0.22 }, 0.25)
          /* respiro titolo */
          .to(`${sel} .olm-title`, { scale: 1.012, ease: "sine.inOut", duration: 0.18 }, 0.34)
          .to(`${sel} .olm-title`, { scale: 1.000, ease: "sine.inOut", duration: 0.18 }, 0.54)
          /* uscita */
          .to(`${sel} .olm-body`,  { opacity: 0, y: -16,      ease: "power2.in",    duration: 0.10 }, 0.72)
          .to(`${sel} .olm-num`,   { opacity: 0, x: -10,      ease: "power2.in",    duration: 0.08 }, 0.74)
          .to(`${sel} .olm-title`, { opacity: 0, yPercent: -45, scale: 0.92, ease: "power2.inOut", duration: 0.18, stagger: 0.04 }, 0.76);
      });

      /* CONTACT — reveal + bg navy */
      gsap.set(".olm-c-title", { opacity: 0, y: 40, scale: 0.96 });
      gsap.set(".olm-c-sub",   { opacity: 0, y: 12 });
      gsap.set(".olm-c-form",  { opacity: 0, y: 24 });
      gsap.set(".olm-c-bar",   { opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".olm-contact", start: "top 75%", end: "top 15%",
          scrub: 1.5,
          onEnter:     () => { if (bgRef.current) bgRef.current.style.backgroundColor = "#00819F"; },
          onLeaveBack: () => { if (bgRef.current) bgRef.current.style.backgroundColor = CHAPTERS[CHAPTERS.length - 1].bg; },
        },
      })
        .to(".olm-c-title", { opacity: 1, y: 0, scale: 1, ease: "expo.out",   duration: 0.40 }, 0)
        .to(".olm-c-sub",   { opacity: 1, y: 0,           ease: "power3.out", duration: 0.20 }, 0.35)
        .to(".olm-c-form",  { opacity: 1, y: 0,           ease: "power3.out", duration: 0.25 }, 0.45)
        .to(".olm-c-bar",   { opacity: 1,                 ease: "power3.out", duration: 0.20 }, 0.65);

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
      <div ref={bgRef} style={{ position: "fixed", inset: 0, zIndex: 0, backgroundColor: HERO.bg }} />
      <div ref={cursorDot}    className="cursor-dot" />
      <div ref={cursorCircle} className="cursor-circle" />

      <main ref={root} className="overflow-x-hidden" style={{ position: "relative", zIndex: 1 }}>

        {/* ══ HERO — centrato ══ */}
        <section className="olm-hero relative h-screen flex flex-col items-center justify-center">
          <div className="text-center px-8">
            <h1 className="olm-hero-line font-heading font-black uppercase text-white"
              style={{ fontSize: "clamp(2.4rem, 8.5vw, 10.5rem)", lineHeight: 0.86, letterSpacing: "-0.04em", whiteSpace: "nowrap" }}>
              {HERO.lines[0]}
            </h1>
            <p className="olm-hero-body font-body font-black uppercase text-white mx-auto mt-12"
              style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.85rem)", lineHeight: 1.45, maxWidth: "600px", letterSpacing: "-0.01em" }}>
              {HERO.body}
            </p>
          </div>
        </section>

        {/* ══ CAPITOLI — layout editoriale: titolo SX, corpo DX ══ */}
        {CHAPTERS.map((ch) => (
          <section key={ch.id} className={`olm-${ch.id} relative h-screen overflow-hidden`}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "clamp(120px, 30vw, 1fr) 48%",
                height: "100%",
                alignItems: "center",
                paddingLeft: "5vw",
                paddingRight: "5vw",
                gap: "4vw",
              }}
            >
              {/* ── SINISTRA: titolo + numero ── */}
              <div>
                {/* numero capitolo */}
                <p className="olm-num font-body font-light uppercase tracking-[0.32em] text-white/40 mb-7"
                  style={{ fontSize: "0.6rem" }}>
                  {ch.n}
                </p>

                {/* titolo principale */}
                {ch.titleLines.map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <h2 className="olm-title font-heading font-black uppercase text-white"
                      style={{
                        fontSize: "clamp(2.6rem, 5.8vw, 7rem)",
                        lineHeight: 0.88,
                        letterSpacing: "-0.04em",
                        whiteSpace: "nowrap",
                        display: "block",
                      }}>
                      {line}
                    </h2>
                  </div>
                ))}

              </div>

              {/* ── DESTRA: paragrafi ── */}
              <div className="olm-body space-y-8">
                {ch.paras.map((p, i) => (
                  <p key={i} className="olm-para font-body font-black uppercase text-white"
                    style={{
                      fontSize: "clamp(0.95rem, 1.5vw, 1.85rem)",
                      lineHeight: 1.45,
                      letterSpacing: "-0.01em",
                    }}>
                    {p}
                  </p>
                ))}
              </div>

            </div>
          </section>
        ))}

        {/* ══ CONTACT ══ */}
        <section id="contact" className="olm-contact relative min-h-screen overflow-hidden">

          <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-14 pt-32 pb-28">

            <div className="overflow-hidden">
              <h2 className="olm-c-title font-heading font-black uppercase text-white"
                style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                CONTACT
              </h2>
            </div>

            <p className="olm-c-sub mb-8 mt-4 font-body text-sm font-light text-white/60">
              Your digital success awaits. Let&apos;s get started!
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="olm-c-form w-full max-w-2xl space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <OlmField label="Company Name" type="text" />
                <OlmField label="Type of Business" type="text" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <OlmField label="Phone" type="tel" />
                <OlmField label="Email" type="email" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-body text-[9px] uppercase tracking-[0.18em] text-white">Message</label>
                <textarea rows={2} className="resize-none border-b border-white/40 bg-transparent pb-2 pt-1 font-body text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none" />
              </div>
              <div className="pt-1 text-center">
                <button type="submit" className="inline-block rounded-full border border-white px-8 py-3 font-body text-xs font-normal text-white transition-colors hover:bg-white hover:text-[#0B1E38]">
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* footer bar */}
          <div className="olm-c-bar absolute bottom-5 left-8 right-8 z-10 flex items-center justify-between border-t border-white/20 pt-4 md:left-14 md:right-14">
            <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/70">Get in touch!</span>
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/company/strategia-az/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/60">
                <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.instagram.com/strategia.studio/" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/60">
                <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-body text-[10px] uppercase tracking-[0.35em] text-white/70 transition-colors hover:text-white">
              Back to top
            </button>
          </div>

        </section>

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

/* ── Field helper ── */
function OlmField({ label, type }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-[9px] uppercase tracking-[0.18em] text-white">{label}</label>
      <input type={type} className="border-b border-white/40 bg-transparent pb-2 pt-1 font-body text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none" />
    </div>
  );
}

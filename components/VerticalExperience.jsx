"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  { name: "Voglia di Pizza", img: "/works/voglia-di-pizza.png" },
  { name: "Expo Energia",    img: "/works/expo-energia.png"    },
  { name: "Davveroo",        img: "/works/davveroo.png"        },
  { name: "Mi Dicriju",      img: "/works/mi-dicriju.png"      },
  { name: "Cellulopoli",     img: "/works/cellulopoli.png"     },
  { name: "Il Rudere",       img: "/works/il-rudere.png"       },
];

export default function VerticalExperience() {
  const root         = useRef(null);
  const cursorDot    = useRef(null);
  const cursorCircle = useRef(null);
  const bgRef        = useRef(null);

  useEffect(() => {
    /* ── cursor ── */
    const dot    = cursorDot.current;
    const circle = cursorCircle.current;

    let onMove = null;
    let tick   = null;

    if (dot && circle) {
      let mx = window.innerWidth / 2, my = window.innerHeight / 2;
      let cx = mx, cy = my;

      onMove = (e) => {
        mx = e.clientX; my = e.clientY;
        gsap.to(dot, { x: mx, y: my, duration: 0.07, ease: "none", overwrite: true });
      };
      tick = () => {
        cx += (mx - cx) * 0.11;
        cy += (my - cy) * 0.11;
        gsap.set(circle, { x: cx, y: cy });
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      gsap.ticker.add(tick);
    }

    /* ── GSAP ── */
    const ctx = gsap.context(() => {

      /* initial states */
      gsap.set(".h-title",  { opacity: 0, scale: 0.76 });
      gsap.set(".m-text",   { opacity: 0, y: 120 });
      gsap.set(".m-label",  { opacity: 0, y: 20 });
      gsap.set(".m-btn",    { opacity: 0, scale: 0.94 });
      gsap.set(".w-title",  { yPercent: 40, opacity: 0 });
      gsap.set(".w-btn",    { opacity: 0, y: 10 });
      gsap.set(".w-item",   { opacity: 0, y: 40 });
      gsap.set(".c-title",  { opacity: 0, y: 60, scale: 0.96 });
      gsap.set(".c-sub",    { opacity: 0, y: 14 });
      gsap.set(".c-form",   { opacity: 0, y: 28 });
      gsap.set(".c-bar",    { opacity: 0 });

      /* HERO TITLE — onda continua: primo colpo → raccordo → secondo colpo */
      gsap.timeline({ delay: 0.1 })
        .to(".h-title", { opacity: 1, scale: 1.09, duration: 0.28, ease: "expo.out" })
        .to(".h-title", { scale: 0.96, duration: 0.24, ease: "power2.out" })
        .to(".h-title", { scale: 1.58, duration: 0.32, ease: "expo.out" })
        .to(".h-title", { scale: 1.00, duration: 0.42, ease: "power3.out" });

      /* SCENA UNIFICATA — scroll-linked, completamente reversibile */
      gsap.timeline({
        scrollTrigger: {
          trigger: ".s-scene", start: "top top", end: "+=540%",
          scrub: 2, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bgRef.current) bgRef.current.style.backgroundColor = self.progress > 0.42 ? "#00819F" : "#0B1E38";
          },
        },
      })
        /* titolo esce — duration esplicita per evitare overlap */
        .fromTo(".h-title",
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0, y: -180, scale: 0.92, duration: 0.22, ease: "power2.inOut", stagger: 0.06 },
          0.04)
        /* manifesto entra solo dopo la fine del titolo (gap netto) */
        .fromTo(".m-text",
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.30, ease: "none" },
          0.42)
        .fromTo(".m-label",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.14, ease: "power3.out" },
          0.62)
        .fromTo(".m-btn",
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.14, ease: "power3.out" },
          0.65)
        .to(".m-label", { opacity: 0, y: -14, duration: 0.12, ease: "power2.in" }, 0.82)
        .to(".m-btn",   { opacity: 0, duration: 0.10, ease: "power2.in" }, 0.83)
        .to(".m-text",  { opacity: 0, duration: 0.12, ease: "power2.in" }, 0.88);

      /* WORKS — tutto ancorato a .s-works, parte presto, riduzione lineare */
      gsap.timeline({
        scrollTrigger: {
          trigger: ".s-works",
          start: "top 92%",   // parte quando la sezione entra dal basso
          end: "bottom 8%",   // finisce quando la sezione sta uscendo
          scrub: 1.5,
        },
      })
        // Titolo appare subito (primo 12% del range)
        .fromTo(".w-title",
          { yPercent: 30, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: "power4.out", duration: 0.12 }, 0)
        .fromTo(".w-btn",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, ease: "power3.out", duration: 0.08 }, 0.10)
        // Si riduce linearmente per tutto il resto — lineare = riduzione costante percepibile
        .to(".w-title", { scale: 0.22, opacity: 0.12, ease: "none", duration: 0.76 }, 0.14)
        .to(".w-btn",   { opacity: 0, ease: "none", duration: 0.28 }, 0.14);

      // Brand emergono in parallelo alla riduzione del titolo
      gsap.fromTo(".w-item",
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0,
          stagger: { amount: 0.5, from: "start" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".s-works",
            start: "top 68%",
            end: "bottom 18%",
            scrub: 1.2,
          },
        });

      /* CONTACT — pin, battuto title */
      gsap.timeline({
        scrollTrigger: {
          trigger: ".s-contact", start: "top top", end: "+=280%",
          scrub: 2, pin: true, anticipatePin: 1,
        },
      })
        .to(".c-title", { opacity: 1, y: 0, scale: 1.02, ease: "expo.out" }, 0.07)
        .to(".c-title", { scale: 1, ease: "expo.out" }, 0.17)
        .to(".c-sub",   { opacity: 1, y: 0, ease: "power3.out" }, 0.22)
        .to(".c-form",  { opacity: 1, y: 0, ease: "power3.out" }, 0.30)
        .to(".c-bar",   { opacity: 1, ease: "power3.out" }, 0.44);

      /* ── BACKGROUND — pattern 1→2→1→2 ── */
      const bg = bgRef.current;
      bg.style.backgroundColor = "#0B1E38";

      // MANIFESTO→WORKS: teal → navy quando works entra nel frame
      ScrollTrigger.create({
        trigger: ".s-works",
        start: "top top",
        onEnter:     () => { bg.style.backgroundColor = "#0B1E38"; },
        onLeaveBack: () => { bg.style.backgroundColor = "#00819F"; },
      });

      // WORKS→CONTACT: navy → teal con scrub breve (legato allo scroll, non snap)
      gsap.to(bg, {
        backgroundColor: "#00819F", ease: "none",
        scrollTrigger: {
          trigger: ".s-contact",
          start: "top 75%", end: "top 55%",
          scrub: 1,
        },
      });

      ScrollTrigger.refresh();
    }, root);

    /* ── HOVER DOMINANCE sui brand della home ── */
    const wItems = gsap.utils.toArray(".w-item", root.current);
    const DIM = 0.32;
    const DUR = 0.42;
    const enterHandlers = wItems.map((_, i) => () => {
      gsap.to(wItems, { opacity: DIM, duration: DUR, ease: "power2.out", overwrite: "auto" });
      gsap.to(wItems[i], { opacity: 1,   duration: DUR, ease: "power2.out", overwrite: "auto" });
    });
    const leaveHandler = () => {
      gsap.to(wItems, { opacity: 1, duration: DUR, ease: "power2.out", overwrite: "auto" });
    };
    wItems.forEach((item, i) => {
      item.addEventListener("mouseenter", enterHandlers[i]);
      item.addEventListener("mouseleave", leaveHandler);
    });

    return () => {
      ctx.revert();
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (tick)   gsap.ticker.remove(tick);
      wItems.forEach((item, i) => {
        item.removeEventListener("mouseenter", enterHandlers[i]);
        item.removeEventListener("mouseleave", leaveHandler);
      });
    };
  }, []);

  return (
    <>
      <div ref={bgRef} style={{ position: "fixed", inset: 0, zIndex: 0, backgroundColor: "#0B1E38", willChange: "background-color" }} />
      <div ref={cursorDot}    className="cursor-dot" />
      <div ref={cursorCircle} className="cursor-circle" />

      <main ref={root} className="overflow-x-hidden" style={{ position: "relative", zIndex: 1 }}>

        {/* ══ SCENA UNIFICATA ═══════════════════════════════════
            FASE 1: titolo "OLTRE LA MENTE" centrato.
            FASE 2: titolo esce, manifesto entra dal basso.
            Tutto scroll-linked e reversibile.
        ═════════════════════════════════════════════════════════ */}
        <section id="home" className="s-scene relative h-screen overflow-hidden">

          {/* FASE 1 — titolo principale */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="h-title font-heading font-black leading-none tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(3rem, 12vw, 14rem)", whiteSpace: "nowrap", opacity: 0 }}
            >
              StrategIA
            </h1>
          </div>

          {/* FASE 2 — manifesto (entra dopo il titolo) */}
          <div className="m-text absolute inset-x-0 flex items-center justify-center px-8" style={{ top: 0, bottom: 0, opacity: 0 }}>
            <p
              className="font-heading font-black uppercase text-white text-center"
              style={{
                fontSize: "clamp(1.3rem, 2.2vw, 2.6rem)",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
                maxWidth: "780px",
              }}
            >
              La nostra forza è trasformare.{" "}
              Osserviamo le aziende in verticale, anticipando il cambiamento
              e costruendo sistemi che uniscono strategia, comunicazione
              e intelligenza artificiale per ridefinire il modo
              in cui le aziende crescono.
            </p>
          </div>

          {/* floating island — Creative Lab + About Us — bottom, separato dal manifesto */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[10vh] z-10 flex flex-col items-center gap-4">
            <p
              className="m-label font-body text-[10px] font-light uppercase tracking-[0.5em]"
              style={{ color: "#00819F", opacity: 0 }}
            >
              Creative Lab
            </p>
            <a
              href="/oltre-la-mente"
              className="m-btn pointer-events-auto inline-block rounded-full border border-white px-7 py-3 font-body text-xs font-normal text-white transition-colors hover:bg-white hover:text-black"
              style={{ opacity: 0 }}
            >
              About Us
            </a>
          </div>

        </section>

        {/* ══ WORKS ════════════════════════════════════════════
            Titolo sticky: entra, resta vivo, perde dominance
            gradualmente mentre i brand emergono dalla stessa scena.
        ═════════════════════════════════════════════════════════ */}
        <section id="works" className="s-works">

          {/* Titolo sticky — accompagna lo scroll */}
          <div className="sticky top-0 z-10 flex h-screen flex-col items-center justify-center gap-7">
            <h2
              className="w-title font-heading font-black uppercase leading-none text-white"
              style={{ fontSize: "clamp(5rem, 20vw, 18rem)", letterSpacing: "-0.03em" }}
            >
              WORKS
            </h2>
            <a
              href="/works"
              className="w-btn inline-block rounded-full border border-white px-7 py-3 font-body text-xs font-normal text-white transition-colors hover:bg-white hover:text-black"
            >
              All Works
            </a>
          </div>

          {/* Grid — scorre naturalmente sotto il titolo */}
          <div className="s-works-grid py-20">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-14">
              {WORKS.map((w) => (
                <a key={w.name} className="w-item block" href="#">
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
                    <img
                      src={w.img}
                      alt={w.name}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center center",
                        display: "block",
                      }}
                    />
                  </div>
                  <p className="pt-3 font-body text-[8px] font-light uppercase tracking-[0.22em] text-white/40">
                    {w.name}
                  </p>
                </a>
              ))}
            </div>
          </div>

        </section>

        {/* ══ CONTACT ═══════════════════════════════════════════
            Coral bg. "CONTACT" huge clip-reveal. Form + Send.
            Footer bar at bottom. "StrategIA" watermark.
        ═════════════════════════════════════════════════════════ */}
        <section
          id="contact"
          className="s-contact relative h-screen overflow-hidden"
        >

          <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-14">

            {/* title */}
            <div className="overflow-hidden">
              <h2
                className="c-title font-heading font-black uppercase text-white"
                style={{
                  fontSize: "clamp(2.5rem, 10vw, 9rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                CONTACT
              </h2>
            </div>

            <p className="c-sub mb-8 mt-4 font-body text-sm font-light text-white/60">
              Your digital success awaits. Let's get started!
            </p>

            {/* form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="c-form w-full max-w-2xl space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field label="Company Name" type="text" />
                <Field label="Type of Business" type="text" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field label="Phone" type="tel" />
                <Field label="Email" type="email" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-body text-[9px] uppercase tracking-[0.18em] text-white">
                  Message
                </label>
                <textarea
                  rows={2}
                  className="resize-none border-b border-white/40 bg-transparent pb-2 pt-1 font-body text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
                />
              </div>
              <div className="pt-1 text-center">
                <button
                  type="submit"
                  className="inline-block rounded-full border border-white px-8 py-3 font-body text-xs font-normal text-white transition-colors hover:bg-white hover:text-[#0B1E38]"
                >
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* footer bar */}
          <div className="c-bar absolute bottom-5 left-8 right-8 z-10 flex items-center justify-between border-t border-white/20 pt-4 md:left-14 md:right-14">
            <span className="font-body text-[10px] font-normal uppercase tracking-[0.35em] text-white/70">
              Get in touch!
            </span>

            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/strategia-az/?viewAsMember=true"
                target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/60"
              >
                <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/strategia.studio/"
                target="_blank" rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/60"
              >
                <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-body text-[10px] font-normal uppercase tracking-[0.35em] text-white/70 transition-colors hover:text-white"
            >
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
function Field({ label, type }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-[9px] uppercase tracking-[0.18em] text-white">
        {label}
      </label>
      <input
        type={type}
        className="border-b border-white/40 bg-transparent pb-2 pt-1 font-body text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
      />
    </div>
  );
}

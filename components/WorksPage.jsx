"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { n: "01", name: "Voglia di Pizza", slug: "voglia-di-pizza", img: "/works/voglia-di-pizza.png" },
  { n: "02", name: "Expo Energia",    slug: "expo-energia",    img: "/works/expo-energia.png"    },
  { n: "03", name: "Davveroo",        slug: "davveroo",        img: "/works/davveroo.png"        },
  { n: "04", name: "Mi Dicriju",      slug: "mi-dicriju",      img: "/works/mi-dicriju.png"      },
  { n: "05", name: "Cellulopoli",     slug: "cellulopoli",     img: "/works/cellulopoli.png"     },
  { n: "06", name: "Il Rudere",       slug: "il-rudere",       img: "/works/il-rudere.png"       },
];

export default function WorksPage() {
  const root         = useRef(null);
  const bgRef        = useRef(null);
  const cursorDot    = useRef(null);
  const cursorCircle = useRef(null);
  const router       = useRouter();

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

      /* ── HERO battito ── */
      gsap.set(".wp-hero", { opacity: 0, scale: 0.76 });
      gsap.timeline({ delay: 0.1 })
        .to(".wp-hero", { opacity: 1, scale: 1.09, duration: 0.28, ease: "expo.out" })
        .to(".wp-hero", { scale: 0.98, duration: 0.13, ease: "power2.out" })
        .to(".wp-hero", { scale: 1.42, duration: 0.32, ease: "expo.out" })
        .to(".wp-hero", { scale: 1.00, duration: 0.38, ease: "power3.out" });

      /* ── SCROLL REVEAL — riga per riga ── */
      ["wp-row-0", "wp-row-1"].forEach((row) => {
        gsap.set(`.${row} .wp-img`, { clipPath: "inset(0 0 100% 0)" });
        gsap.set(`.${row} .wp-meta`, { opacity: 0, y: 14 });

        gsap.to(`.${row} .wp-img`, {
          clipPath: "inset(0 0 0% 0)", ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: `.${row}`, start: "top 85%", end: "top 15%", scrub: 1.8 },
        });
        gsap.to(`.${row} .wp-meta`, {
          opacity: 1, y: 0, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: `.${row}`, start: "top 70%", end: "top 5%", scrub: 1.5 },
        });
      });

      /* parallax su tutte le immagini */
      PROJECTS.forEach((_, i) => {
        gsap.to(`.wp-p${i} .wp-img img`, {
          yPercent: -10, ease: "none",
          scrollTrigger: { trigger: `.wp-p${i}`, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      ScrollTrigger.refresh();
    }, root);

    /* ── HOVER DOMINANCE — editoriale, solo opacità ── */
    const items = gsap.utils.toArray(".wp-item", root.current);
    const DIM = 0.32;
    const DUR = 0.42;

    const enterHandlers = items.map((_, i) => () => {
      gsap.to(items, { opacity: DIM, duration: DUR, ease: "power2.out", overwrite: "auto" });
      gsap.to(items[i], { opacity: 1,   duration: DUR, ease: "power2.out", overwrite: "auto" });
    });
    const leaveHandler = () => {
      gsap.to(items, { opacity: 1, duration: DUR, ease: "power2.out", overwrite: "auto" });
    };

    items.forEach((item, i) => {
      item.addEventListener("mouseenter", enterHandlers[i]);
      item.addEventListener("mouseleave", leaveHandler);
    });

    return () => {
      ctx.revert();
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (tick)   gsap.ticker.remove(tick);
      items.forEach((item, i) => {
        item.removeEventListener("mouseenter", enterHandlers[i]);
        item.removeEventListener("mouseleave", leaveHandler);
      });
    };
  }, []);

  return (
    <>
      <div ref={bgRef} style={{ position: "fixed", inset: 0, zIndex: 0, backgroundColor: "#0B1E38" }} />
      <div ref={cursorDot}    className="cursor-dot" />
      <div ref={cursorCircle} className="cursor-circle" />

      <main ref={root} className="overflow-x-hidden" style={{ position: "relative", zIndex: 1 }}>

        {/* ══ HERO ══ */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <h1 className="wp-hero font-heading font-black uppercase text-white"
            style={{ fontSize: "clamp(6rem, 22vw, 26rem)", letterSpacing: "-0.04em", lineHeight: 1 }}>
            WORKS
          </h1>
        </section>

        {/* ══ GRIGLIA 3+3 ══ */}
        <section className="px-6 md:px-10 pb-28">

          {[0, 1].map((row) => (
            <div key={row} className={`wp-row-${row} grid grid-cols-3 gap-x-4 ${row === 0 ? "mb-24" : ""}`}>
              {PROJECTS.slice(row * 3, row * 3 + 3).map((p, i) => {
                const idx = row * 3 + i;
                return (
                  <div
                    key={p.n}
                    className={`wp-item wp-p${idx}`}
                    onClick={() => router.push(`/works/${p.slug}`)}
                    style={{ cursor: "none" }}
                  >
                    {/* immagine */}
                    <div className="wp-img overflow-hidden" style={{ aspectRatio: "1/1" }}>
                      <img
                        src={p.img} alt={p.name}
                        style={{ width: "100%", height: "116%", objectFit: "cover", objectPosition: "center", display: "block" }}
                      />
                    </div>

                    {/* info */}
                    <div className="wp-meta flex items-baseline gap-3 pt-3">
                      <span className="font-body font-light uppercase tracking-[0.28em] text-white/35"
                        style={{ fontSize: "0.58rem" }}>{p.n}</span>
                      <h2 className="font-heading font-black uppercase text-white"
                        style={{ fontSize: "clamp(1rem, 2.2vw, 2.8rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                        {p.name}
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

        </section>

        {/* ══ FOOTER ══ */}
        <div className="flex items-center justify-between border-t border-white/15 px-8 py-5 md:px-12">
          <span className="font-body text-[10px] uppercase tracking-[0.35em] text-white/40">StrategIA — Works</span>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/strategia.studio/" target="_blank" rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/30 transition-colors hover:border-white">
              <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/strategia-az/?viewAsMember=true" target="_blank" rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/30 transition-colors hover:border-white">
              <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-body text-[10px] uppercase tracking-[0.35em] text-white/40 transition-colors hover:text-white">
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

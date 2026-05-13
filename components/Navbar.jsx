"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

// page: true  → navigazione a pagina separata via router
// brand: true → mantiene casing originale (no uppercase)
const links = [
  { label: "HOME",           href: "/",                page: true,  dash: true },
  { label: "OLTRE LA MENTE", href: "/oltre-la-mente",  page: true             },
  { label: "WORKS",          href: "/works",            page: true             },
  { label: "CONTACT",        href: "/contact",           page: true             },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef     = useRef(null);
  const overlayRef = useRef(null);
  const linkRefs   = useRef([]);
  const router     = useRouter();

  /* entrance */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out", delay: 0.8 }
    );
  }, []);

  /* overlay open / close */
  useEffect(() => {
    if (open) {
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.timeline()
        .to(overlayRef.current, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.6,
          ease: "power4.inOut",
        })
        .fromTo(
          linkRefs.current.filter(Boolean),
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.07, duration: 0.55, ease: "power4.out" },
          "-=0.2"
        )
        .fromTo(
          ".menu-meta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
          "-=0.22"
        );
    } else {
      gsap.timeline()
        .to(linkRefs.current.filter(Boolean), {
          yPercent: -24, opacity: 0,
          stagger: 0.03, duration: 0.25, ease: "power3.in",
        })
        .to(
          overlayRef.current,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.5,
            ease: "power4.inOut",
            onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
          },
          "-=0.1"
        );
    }
  }, [open]);

  const goTo = (e, href, isPage) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      if (isPage) {
        router.push(href);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, 660);
  };

  return (
    <>
      {/* ── Navbar ── */}
      <header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-[300]"
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
          <a href="/" onClick={(e) => goTo(e, "/", true)}
            className="font-heading font-black text-white"
            style={{ fontSize: "1.05rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            StrategIA
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[6px] p-2"
            aria-label="Menu"
          >
            <span className="block h-[1.5px] w-7 bg-white" />
            <span className="block h-[1.5px] w-7 bg-white" />
          </button>
        </div>
      </header>

      {/* ── Menu overlay ── */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 500,
          background: "#00819F",
          display: "none",
          clipPath: "inset(0 0 100% 0)",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0",
        }}
      >
        {/* top bar */}
        <div className="flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
          <span className="font-heading font-black text-black"
            style={{ fontSize: "1.05rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            StrategIA
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Chiudi menu"
            className="flex h-9 w-9 items-center justify-center text-2xl font-light text-black"
          >
            ×
          </button>
        </div>

        {/* links */}
        <nav className="flex flex-1 flex-col justify-center px-7 md:px-12">
          <ul className="space-y-0">
            {links.map((l, i) => (
              <li key={l.href} className="overflow-hidden">
                <a
                  href={l.href}
                  ref={(el) => (linkRefs.current[i] = el)}
                  onClick={(e) => goTo(e, l.href, l.page)}
                  className="block font-heading font-black uppercase leading-[1.0] tracking-[-0.025em] text-black"
                  style={{ fontSize: "clamp(2.2rem, 6.5vw, 6rem)", whiteSpace: "nowrap" }}
                >
                  {l.dash ? `— ${l.label}` : l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* meta */}
        <div className="menu-meta flex items-end justify-between px-7 pb-10 md:px-12 md:pb-12">
          <span />
          <div className="text-right font-body text-sm text-black/70 leading-relaxed">
            <p>comunicazione@strategiazienda.it</p>
            <p>P.IVA 03992420780</p>
          </div>
        </div>
      </div>
    </>
  );
}

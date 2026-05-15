"use client";

export default function CalendlyButton() {
  return (
    <a
      href="https://calendly.com/comunicazione-strategiazienda/30min"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        border: "1px solid rgba(255,255,255,0.35)",
        borderRadius: "999px",
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(0,0,0,0.35)",
        color: "#fff",
        fontFamily: "var(--font-barlow), sans-serif",
        fontSize: "0.62rem",
        fontWeight: 300,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        textDecoration: "none",
        cursor: "none",
        transition: "border-color 0.3s, background-color 0.3s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.75)";
        e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.6)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
        e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.35)";
      }}
    >
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#00819F", flexShrink: 0 }} />
      Book a call
    </a>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function HeroDrawCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const points = [];
    const MAX = 90;
    let animId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
      points.push({ x, y });
      if (points.length > MAX) points.shift();
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const draw = () => {
      animId = requestAnimationFrame(draw);
      const w = canvas.width  / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      if (points.length < 3) return;

      for (let i = 2; i < points.length; i++) {
        const t  = i / points.length;
        const alpha = t * 0.75;
        const width = t * 4.5;

        ctx.beginPath();
        ctx.moveTo(points[i - 1].x, points[i - 1].y);
        ctx.quadraticCurveTo(
          points[i - 1].x,
          points[i - 1].y,
          (points[i - 1].x + points[i].x) / 2,
          (points[i - 1].y + points[i].y) / 2
        );
        ctx.strokeStyle = `rgba(0,198,240,${alpha})`;
        ctx.lineWidth   = width;
        ctx.lineCap     = "round";
        ctx.lineJoin    = "round";
        ctx.shadowColor = "#00c6f0";
        ctx.shadowBlur  = 18;
        ctx.stroke();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

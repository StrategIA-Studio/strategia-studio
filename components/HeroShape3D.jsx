"use client";

import { useEffect, useRef } from "react";

export default function HeroShape3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animId;
    let renderer, scene, camera, mesh;

    async function init() {
      const THREE = await import("three");

      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      renderer.setClearColor(0x000000, 0);

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.set(0, 0, 5);

      /* TorusKnot — forma a spirale simile a 3KDM */
      const geo = new THREE.TorusKnotGeometry(1.1, 0.32, 220, 24, 2, 3);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00819F"),
        roughness: 0.18,
        metalness: 0.72,
        emissive: new THREE.Color("#004f60"),
        emissiveIntensity: 0.35,
      });
      mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      /* Luci */
      const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
      dirLight.position.set(3, 5, 4);
      scene.add(dirLight);

      const rimLight = new THREE.DirectionalLight(0x00c6f0, 1.2);
      rimLight.position.set(-4, -2, -3);
      scene.add(rimLight);

      /* Mouse parallax */
      let mx = 0, my = 0;
      const onMouse = (e) => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse, { passive: true });

      /* Resize */
      const onResize = () => {
        if (!canvas) return;
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      /* Loop */
      const clock = new THREE.Clock();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        mesh.rotation.x = t * 0.28 + my * 0.18;
        mesh.rotation.y = t * 0.18 + mx * 0.22;
        renderer.render(scene, camera);
      };
      animate();

      canvas._cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    }

    init();

    return () => {
      const canvas = canvasRef.current;
      if (canvas?._cleanup) canvas._cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "55%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

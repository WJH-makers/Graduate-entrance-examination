import React, { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    const dpi = window.devicePixelRatio || 1;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006
    }));

    const resize = () => {
      canvas.width = window.innerWidth * dpi;
      canvas.height = window.innerHeight * dpi;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        const px = p.x * canvas.width;
        const py = p.y * canvas.height;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.r * 16 * dpi);
        grad.addColorStop(0, "rgba(34,211,238,0.35)");
        grad.addColorStop(1, "rgba(34,211,238,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, p.r * 10 * dpi, 0, Math.PI * 2);
        ctx.fill();
      });
      animationId = requestAnimationFrame(step);
    };

    step();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;

import React, { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 14;

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(Math.random() * 0.12 + 0.04),
      radius: Math.random() * 1.2 + 1,
      alpha: Math.random() * 0.25 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${p.alpha})`;
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
      }
      draw();
      animationFrameId = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(animationFrameId);
      if (reducedMotion.matches) {
        draw();
      } else {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    const handleResize = () => {
      resize();
      if (reducedMotion.matches) draw();
    };

    window.addEventListener('resize', handleResize);
    reducedMotion.addEventListener('change', start);
    start();

    return () => {
      window.removeEventListener('resize', handleResize);
      reducedMotion.removeEventListener('change', start);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div className="ambient-glow ambient-glow--blue" />
      <div className="ambient-glow ambient-glow--teal" />
      <div className="ambient-glow ambient-glow--sky" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import '../styles/HomeBackground.css';

const STAR_COUNT = 140;
const PARTICLE_COUNT = 36;

const getTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const createStars = (width, height) =>
  Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.6 + 0.3,
    base: Math.random() * 0.6 + 0.3,
    speed: Math.random() * 0.02 + 0.005,
    phase: Math.random() * Math.PI * 2
  }));

const createParticles = (width, height) =>
  Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2 + 0.8,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    alpha: Math.random() * 0.25 + 0.08
  }));

const HomeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const section = canvas.parentElement;
    let animationId = 0;
    let stars = [];
    let particles = [];
    let shooting = null;
    let nextShootingAt = performance.now() + 4000 + Math.random() * 6000;
    let visible = true;
    let reduceMotion = prefersReducedMotion();
    let theme = getTheme();
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(width, height);
      particles = createParticles(width, height);
      drawFrame(performance.now(), true);
    };

    const drawGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      if (theme === 'light') {
        gradient.addColorStop(0, '#dbeafe');
        gradient.addColorStop(0.45, '#eef6ff');
        gradient.addColorStop(1, '#f8fafc');
      } else {
        gradient.addColorStop(0, '#070b14');
        gradient.addColorStop(0.55, '#0e1626');
        gradient.addColorStop(1, '#0a192f');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStars = (now) => {
      stars.forEach((star) => {
        const twinkle = reduceMotion
          ? star.base
          : star.base * (0.55 + 0.45 * Math.sin(now * star.speed + star.phase));
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawParticles = () => {
      particles.forEach((p) => {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
        ctx.beginPath();
        ctx.fillStyle =
          theme === 'light'
            ? `rgba(100, 140, 190, ${p.alpha})`
            : `rgba(180, 210, 255, ${p.alpha * 0.5})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const spawnShootingStar = () => {
      shooting = {
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.4,
        len: 80 + Math.random() * 70,
        speed: 10 + Math.random() * 6,
        life: 0,
        maxLife: 45 + Math.random() * 20
      };
    };

    const drawShootingStar = () => {
      if (!shooting) return;
      shooting.x += shooting.speed;
      shooting.y += shooting.speed * 0.35;
      shooting.life += 1;

      const alpha = 1 - shooting.life / shooting.maxLife;
      const gradient = ctx.createLinearGradient(
        shooting.x,
        shooting.y,
        shooting.x - shooting.len,
        shooting.y - shooting.len * 0.35
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(shooting.x, shooting.y);
      ctx.lineTo(shooting.x - shooting.len, shooting.y - shooting.len * 0.35);
      ctx.stroke();

      if (shooting.life >= shooting.maxLife || shooting.x > width + 50) {
        shooting = null;
        nextShootingAt = performance.now() + 5000 + Math.random() * 8000;
      }
    };

    const drawFrame = (now, forceStatic = false) => {
      drawGradient();
      if (theme === 'dark') {
        drawStars(now);
        if (!reduceMotion && !forceStatic) {
          if (!shooting && now >= nextShootingAt) spawnShootingStar();
          drawShootingStar();
        }
      } else {
        drawParticles();
      }
    };

    const loop = (now) => {
      if (visible && !reduceMotion) {
        drawFrame(now);
      }
      animationId = requestAnimationFrame(loop);
    };

    const onVisibility = ([entry]) => {
      visible = entry.isIntersecting;
      if (visible && reduceMotion) {
        drawFrame(performance.now(), true);
      }
    };

    const onThemeChange = () => {
      theme = getTheme();
      drawFrame(performance.now(), true);
    };

    const onMotionChange = (event) => {
      reduceMotion = event.matches;
      drawFrame(performance.now(), true);
    };

    const observer = new IntersectionObserver(onVisibility, { threshold: 0.05 });
    observer.observe(section);

    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMedia.addEventListener('change', onMotionChange);

    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    window.addEventListener('resize', resize);
    resize();
    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      themeObserver.disconnect();
      motionMedia.removeEventListener('change', onMotionChange);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="home-background"
      aria-hidden="true"
    />
  );
};

export default HomeBackground;

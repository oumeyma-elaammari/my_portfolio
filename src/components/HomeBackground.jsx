import React, { useEffect, useRef } from 'react';
import '../styles/HomeBackground.css';

const getTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCoarsePointer = () =>
  window.matchMedia('(pointer: coarse)').matches ||
  window.matchMedia('(hover: none)').matches;

const nodeCountForSize = (width, height) => {
  const area = width * height;
  if (width < 480) return Math.max(28, Math.min(42, Math.floor(area / 14000)));
  if (width < 900) return Math.max(45, Math.min(70, Math.floor(area / 16000)));
  return Math.max(70, Math.min(110, Math.floor(area / 18000)));
};

const connectionDistance = (width) => {
  if (width < 480) return 90;
  if (width < 900) return 110;
  return 130;
};

const createNodes = (count, width, height) =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.4 + 1.2
  }));

const themePalette = (theme) => {
  if (theme === 'light') {
    return {
      bgTop: '#e8f2fb',
      bgMid: '#f3f7fc',
      bgBottom: '#f8fafc',
      node: 'rgba(11, 123, 184, 0.85)',
      nodeCore: 'rgba(11, 123, 184, 1)',
      line: [11, 123, 184]
    };
  }
  return {
    bgTop: '#070b14',
    bgMid: '#0e1626',
    bgBottom: '#0a192f',
    node: 'rgba(226, 236, 255, 0.9)',
    nodeCore: 'rgba(255, 255, 255, 0.95)',
    line: [20, 157, 221]
  };
};

const HomeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: false });
    const section = canvas.parentElement;
    let animationId = 0;
    let nodes = [];
    let visible = true;
    let reduceMotion = prefersReducedMotion();
    let allowPointer = !isCoarsePointer();
    let theme = getTheme();
    let width = 0;
    let height = 0;
    let dpr = 1;
    let linkDist = 130;
    let mouse = { x: null, y: null, active: false };
    let lastFrame = 0;

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
      linkDist = connectionDistance(width);
      nodes = createNodes(nodeCountForSize(width, height), width, height);
      drawFrame(true);
    };

    const drawBackground = () => {
      const palette = themePalette(theme);
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, palette.bgTop);
      gradient.addColorStop(0.55, palette.bgMid);
      gradient.addColorStop(1, palette.bgBottom);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const drawLinks = () => {
      const [r, g, b] = themePalette(theme).line;
      const maxDistSq = linkDist * linkDist;

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const dx = a.x - other.x;
          const dy = a.y - other.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > maxDistSq) continue;
          const alpha = 1 - Math.sqrt(distSq) / linkDist;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.55})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }

        if (allowPointer && mouse.active && mouse.x != null) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const mouseDist = linkDist * 1.15;
          if (distSq <= mouseDist * mouseDist) {
            const alpha = 1 - Math.sqrt(distSq) / mouseDist;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.75})`;
            ctx.lineWidth = 1.25;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawNodes = () => {
      const palette = themePalette(theme);
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.fillStyle = palette.node;
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = palette.nodeCore;
        ctx.arc(node.x, node.y, Math.max(0.8, node.r * 0.35), 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const stepNodes = (delta) => {
      const speed = Math.min(delta / 16.67, 2);
      nodes.forEach((node) => {
        node.x += node.vx * speed;
        node.y += node.vy * speed;

        if (node.x <= 0 || node.x >= width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(width, node.x));
        }
        if (node.y <= 0 || node.y >= height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(height, node.y));
        }
      });
    };

    const drawFrame = (forceStatic = false) => {
      drawBackground();
      if (!forceStatic && !reduceMotion) {
        // movement applied in loop with delta
      }
      drawLinks();
      drawNodes();
    };

    const loop = (now) => {
      if (visible && !reduceMotion) {
        const delta = lastFrame ? now - lastFrame : 16.67;
        lastFrame = now;
        // Cap catch-up after tab switch to keep motion smooth near 60fps.
        stepNodes(Math.min(delta, 33));
        drawFrame(false);
      }
      animationId = requestAnimationFrame(loop);
    };

    const onVisibility = ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        lastFrame = 0;
        if (reduceMotion) {
          drawFrame(true);
        }
      }
    };

    const onThemeChange = () => {
      theme = getTheme();
      drawFrame(true);
    };

    const onMotionChange = (event) => {
      reduceMotion = event.matches;
      lastFrame = 0;
      drawFrame(true);
    };

    const onPointerChange = () => {
      allowPointer = !isCoarsePointer();
      if (!allowPointer) {
        mouse.active = false;
        mouse.x = null;
        mouse.y = null;
      }
    };

    const onMouseMove = (event) => {
      if (!allowPointer) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    };

    const observer = new IntersectionObserver(onVisibility, { threshold: 0.05 });
    observer.observe(section);

    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerMedia = window.matchMedia('(pointer: coarse)');
    motionMedia.addEventListener('change', onMotionChange);
    pointerMedia.addEventListener('change', onPointerChange);

    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    window.addEventListener('resize', resize);
    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);

    resize();
    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      themeObserver.disconnect();
      motionMedia.removeEventListener('change', onMotionChange);
      pointerMedia.removeEventListener('change', onPointerChange);
      window.removeEventListener('resize', resize);
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
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

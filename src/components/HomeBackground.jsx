import React, { useEffect, useRef } from 'react';
import { HERO_TYPED_STRINGS } from '../data/heroTypedStrings';
import '../styles/HomeBackground.css';

const ZONE_PADDING = 16;
const ZONE_RADIUS = 14;
const ZONE_FEATHER = 12;

const CONTENT_SELECTORS = ['.greeting', 'h1', '.tagline', '.hero-buttons'];

const getTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCoarsePointer = () =>
  window.matchMedia('(pointer: coarse)').matches ||
  window.matchMedia('(hover: none)').matches;

const nodeCountForSize = (width, height) => {
  const area = width * height;
  if (width < 480) return Math.max(28, Math.min(40, Math.floor(area / 14000)));
  if (width < 900) return Math.max(48, Math.min(72, Math.floor(area / 16000)));
  return Math.max(72, Math.min(108, Math.floor(area / 18000)));
};

const connectionDistance = (width) => {
  if (width < 480) return 90;
  if (width < 900) return 110;
  return 130;
};

const pointInRect = (x, y, rect) =>
  x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;

const traceRoundedRect = (context, x, y, w, h, radius) => {
  const r = Math.min(radius, w / 2, h / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + w - r, y);
  context.quadraticCurveTo(x + w, y, x + w, y + r);
  context.lineTo(x + w, y + h - r);
  context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  context.lineTo(x + r, y + h);
  context.quadraticCurveTo(x, y + h, x, y + h - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
};

const themePalette = (theme) => {
  if (theme === 'light') {
    return {
      node: 'rgba(11, 123, 184, 0.85)',
      nodeCore: 'rgba(11, 123, 184, 1)',
      line: [11, 123, 184]
    };
  }
  return {
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

    const ctx = canvas.getContext('2d', { alpha: true });
    const section = canvas.closest('.hero') || canvas.parentElement;
    const contentEl = section?.querySelector('.hero-content') || null;
    const statsGridEl = section?.querySelector('.stats-grid') || null;

    let animationId = 0;
    let nodes = [];
    let clearZones = [];
    let visible = true;
    let reduceMotion = prefersReducedMotion();
    let allowPointer = !isCoarsePointer();
    let theme = getTheme();
    let width = 0;
    let height = 0;
    let dpr = 1;
    let linkDist = 130;
    let measureNode = null;
    let mouse = { x: null, y: null, active: false };
    let lastFrame = 0;

    const toLocalRect = (rect, sectionRect) => ({
      x: rect.left - sectionRect.left,
      y: rect.top - sectionRect.top,
      w: rect.width,
      h: rect.height
    });

    const measureMaxTypedWidth = (taglineEl) => {
      if (!measureNode) {
        measureNode = document.createElement('span');
        measureNode.style.position = 'absolute';
        measureNode.style.visibility = 'hidden';
        measureNode.style.pointerEvents = 'none';
        measureNode.style.whiteSpace = 'nowrap';
        document.body.appendChild(measureNode);
      }

      const typedEl = taglineEl.querySelector('.typed-text') || taglineEl;
      const typedStyle = window.getComputedStyle(typedEl);
      measureNode.style.font = typedStyle.font;
      measureNode.style.fontSize = typedStyle.fontSize;
      measureNode.style.fontWeight = typedStyle.fontWeight;
      measureNode.style.letterSpacing = typedStyle.letterSpacing;

      let maxWidth = 0;
      HERO_TYPED_STRINGS.forEach((value) => {
        measureNode.textContent = value;
        maxWidth = Math.max(maxWidth, measureNode.offsetWidth);
      });

      measureNode.textContent = '|';
      maxWidth = Math.max(maxWidth, measureNode.offsetWidth);

      const taglineStyle = window.getComputedStyle(taglineEl);
      measureNode.style.font = taglineStyle.font;
      measureNode.style.fontSize = taglineStyle.fontSize;
      measureNode.style.fontWeight = taglineStyle.fontWeight;
      measureNode.textContent = "I'm ";
      const prefixWidth = measureNode.offsetWidth;

      return prefixWidth + maxWidth + 10;
    };

    const buildClearZone = (local) => ({
      x: local.x - ZONE_PADDING,
      y: local.y - ZONE_PADDING,
      w: local.w + ZONE_PADDING * 2,
      h: local.h + ZONE_PADDING * 2,
      radius: ZONE_RADIUS
    });

    const updateClearZones = () => {
      if (!section) {
        clearZones = [];
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const zones = [];

      if (contentEl) {
        CONTENT_SELECTORS.forEach((selector) => {
          const el = contentEl.querySelector(selector);
          if (!el) return;

          const local = toLocalRect(el.getBoundingClientRect(), sectionRect);

          if (selector === '.tagline') {
            const maxWidth = measureMaxTypedWidth(el);
            const centerX = local.x + local.w / 2;
            local.w = Math.max(local.w, maxWidth);
            local.x = centerX - local.w / 2;
          }

          zones.push(buildClearZone(local));
        });
      }

      if (statsGridEl) {
        zones.push(buildClearZone(toLocalRect(statsGridEl.getBoundingClientRect(), sectionRect)));
      }

      clearZones = zones.filter((zone) => zone.w > 0 && zone.h > 0);
    };

    const isPointerBlocked = (x, y) =>
      clearZones.some((zone) => pointInRect(x, y, zone));

    const createNodes = (count) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 1.2
      }));

    const eraseSoftRoundedRect = (zone) => {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.shadowColor = 'rgba(0, 0, 0, 1)';
      ctx.shadowBlur = ZONE_FEATHER;
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      traceRoundedRect(ctx, zone.x, zone.y, zone.w, zone.h, zone.radius);
      ctx.fill();
      ctx.restore();
    };

    const punchOutClearZones = () => {
      clearZones.forEach((zone) => eraseSoftRoundedRect(zone));
    };

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
      updateClearZones();
      nodes = createNodes(nodeCountForSize(width, height));
      drawFrame();
    };

    const drawBackground = () => {
      ctx.clearRect(0, 0, width, height);
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

        if (allowPointer && mouse.active && mouse.x != null && mouse.y != null) {
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

    const drawFrame = () => {
      drawBackground();
      drawLinks();
      drawNodes();
      punchOutClearZones();
    };

    const loop = (now) => {
      if (visible && !reduceMotion) {
        const delta = lastFrame ? now - lastFrame : 16.67;
        lastFrame = now;
        stepNodes(Math.min(delta, 33));
        drawFrame();
      }
      animationId = requestAnimationFrame(loop);
    };

    const onVisibility = ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        lastFrame = 0;
        updateClearZones();
        if (reduceMotion) drawFrame();
      }
    };

    const onThemeChange = () => {
      theme = getTheme();
      drawFrame();
    };

    const onMotionChange = (event) => {
      reduceMotion = event.matches;
      lastFrame = 0;
      drawFrame();
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
      mouse.active = !isPointerBlocked(mouse.x, mouse.y);
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    };

    const onLayoutChange = () => {
      updateClearZones();
      drawFrame();
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

    const layoutObserver = new ResizeObserver(onLayoutChange);
    if (contentEl) {
      layoutObserver.observe(contentEl);
      CONTENT_SELECTORS.forEach((selector) => {
        const el = contentEl.querySelector(selector);
        if (el) layoutObserver.observe(el);
      });
    }
    if (statsGridEl) layoutObserver.observe(statsGridEl);

    const typedEl = contentEl?.querySelector('.typed-text');
    const typedObserver = typedEl
      ? new MutationObserver(onLayoutChange)
      : null;
    typedObserver?.observe(typedEl, {
      childList: true,
      characterData: true,
      subtree: true
    });

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onLayoutChange, { passive: true });
    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);

    resize();
    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      themeObserver.disconnect();
      layoutObserver.disconnect();
      typedObserver?.disconnect();
      motionMedia.removeEventListener('change', onMotionChange);
      pointerMedia.removeEventListener('change', onPointerChange);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onLayoutChange);
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      measureNode?.remove();
      measureNode = null;
    };
  }, []);

  return (
    <div className="home-background-wrap">
      <canvas
        ref={canvasRef}
        className="home-background"
        aria-hidden="true"
      />
    </div>
  );
};

export default HomeBackground;

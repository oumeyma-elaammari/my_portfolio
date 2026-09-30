import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/HomeBackground.css';

const ZONE_PADDING = 16;
const ZONE_RADIUS = 14;
const LINE_FADE_BAND = 14;

const CONTENT_SELECTORS = [
  '.greeting',
  '.hero-intro',
  'h1',
  '.tagline',
  '.availability',
  '.hero-buttons'
];

const getTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCoarsePointer = () =>
  window.matchMedia('(pointer: coarse)').matches ||
  window.matchMedia('(hover: none)').matches;

const nodeCountForSize = (width, height) => {
  const area = width * height;
  if (width <= 480) {
    const base = Math.max(28, Math.min(40, Math.floor(area / 14000)));
    return base * 2;
  }
  if (width < 900) return Math.max(48, Math.min(72, Math.floor(area / 16000)));
  return Math.max(72, Math.min(108, Math.floor(area / 18000)));
};

const connectionDistance = (width, height, count) => {
  if (width > 480) return width < 900 ? 110 : 130;
  const spacing = Math.sqrt((width * Math.max(height, 1)) / Math.max(count, 1));
  return Math.round(Math.max(64, spacing * 1.45));
};

const pointInRect = (x, y, rect) =>
  x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;

const distanceToRect = (x, y, rect) => {
  if (pointInRect(x, y, rect)) return 0;
  const nearestX = Math.max(rect.x, Math.min(x, rect.x + rect.w));
  const nearestY = Math.max(rect.y, Math.min(y, rect.y + rect.h));
  return Math.hypot(x - nearestX, y - nearestY);
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
  const { i18n } = useTranslation();

  useEffect(() => {
    const typedStrings = i18n.t('hero.typed', { returnObjects: true });
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    const stage = canvas.closest('.home-stage') || canvas.parentElement;
    const contentEl = stage?.querySelector('.hero-content') || null;
    const heroEl = stage?.querySelector('.hero') || null;
    const statsGridEl = stage?.querySelector('.stats-grid') || null;

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

    const toLocalRect = (rect, stageRect) => ({
      x: rect.left - stageRect.left,
      y: rect.top - stageRect.top,
      w: rect.width,
      h: rect.height
    });

    const measureMaxTypedWidth = (taglineEl) => {
      if (!measureNode) {
        measureNode = document.createElement('span');
        measureNode.style.position = 'fixed';
        measureNode.style.top = '0';
        measureNode.style.left = '0';
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
      (Array.isArray(typedStrings) ? typedStrings : []).forEach((value) => {
        measureNode.textContent = value;
        maxWidth = Math.max(maxWidth, measureNode.offsetWidth);
      });

      measureNode.textContent = '|';
      const cursorWidth = measureNode.offsetWidth;

      return maxWidth + cursorWidth + 8;
    };

    const buildClearZone = (local) => ({
      x: local.x - ZONE_PADDING,
      y: local.y - ZONE_PADDING,
      w: local.w + ZONE_PADDING * 2,
      h: local.h + ZONE_PADDING * 2,
      radius: ZONE_RADIUS
    });

    const updateClearZones = () => {
      if (!stage) {
        clearZones = [];
        return;
      }

      const stageRect = stage.getBoundingClientRect();
      const zones = [];

      if (contentEl) {
        CONTENT_SELECTORS.forEach((selector) => {
          const el = contentEl.querySelector(selector);
          if (!el) return;

          const local = toLocalRect(el.getBoundingClientRect(), stageRect);

          if (selector === '.tagline' && window.innerWidth > 480) {
            const maxWidth = measureMaxTypedWidth(el);
            const centerX = local.x + local.w / 2;
            local.w = Math.max(local.w, maxWidth);
            local.x = centerX - local.w / 2;
          }

          zones.push(buildClearZone(local));
        });
      }

      if (statsGridEl) {
        statsGridEl.querySelectorAll('.stat-item').forEach((card) => {
          zones.push(buildClearZone(toLocalRect(card.getBoundingClientRect(), stageRect)));
        });
      }

      clearZones = zones.filter((zone) => zone.w > 0 && zone.h > 0);
    };

    const isPointerBlocked = (x, y) =>
      clearZones.some((zone) => pointInRect(x, y, zone));

    const minDistanceToZones = (x, y) => {
      let min = Infinity;
      clearZones.forEach((zone) => {
        min = Math.min(min, distanceToRect(x, y, zone));
      });
      return min;
    };

    const lineZoneOpacity = (x1, y1, x2, y2) => {
      if (!clearZones.length) return 1;

      let minDist = Infinity;
      const samples = 16;

      for (let i = 0; i <= samples; i += 1) {
        const t = i / samples;
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        const dist = minDistanceToZones(x, y);
        if (dist <= 0) return 0;
        minDist = Math.min(minDist, dist);
      }

      if (minDist >= LINE_FADE_BAND) return 1;
      return minDist / LINE_FADE_BAND;
    };

    const createNodes = (count) => {
      const aspect = width / Math.max(height, 1);
      const cols = Math.max(3, Math.round(Math.sqrt(count * aspect)));
      const rows = Math.max(3, Math.ceil(count / cols));
      const cellW = width / cols;
      const cellH = height / rows;
      const created = [];

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          if (created.length >= count) break;

          const jitterX = (Math.random() - 0.5) * cellW * 0.42;
          const jitterY = (Math.random() - 0.5) * cellH * 0.42;
          const x = Math.max(6, Math.min(width - 6, (col + 0.5) * cellW + jitterX));
          const y = Math.max(6, Math.min(height - 6, (row + 0.5) * cellH + jitterY));

          created.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.28,
            vy: (Math.random() - 0.5) * 0.28,
            r: Math.random() * 1.2 + 1.1
          });
        }
      }

      return created;
    };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = nodeCountForSize(width, height);
      linkDist = connectionDistance(width, height, count);
      updateClearZones();
      nodes = createNodes(count);
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

          const zoneFade = lineZoneOpacity(a.x, a.y, other.x, other.y);
          if (zoneFade <= 0.02) continue;

          const alpha = (1 - Math.sqrt(distSq) / linkDist) * 0.55 * zoneFade;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
            const zoneFade = lineZoneOpacity(a.x, a.y, mouse.x, mouse.y);
            if (zoneFade <= 0.02) continue;

            const alpha = (1 - Math.sqrt(distSq) / mouseDist) * 0.75 * zoneFade;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
        const dist = minDistanceToZones(node.x, node.y);
        if (dist <= 0) return;

        let fade = 1;
        if (dist < LINE_FADE_BAND) fade = dist / LINE_FADE_BAND;
        if (fade <= 0.02) return;

        const match = palette.node.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        const coreMatch = palette.nodeCore.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);

        ctx.beginPath();
        ctx.fillStyle = match
          ? `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${parseFloat(match[4]) * fade})`
          : palette.node;
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = coreMatch
          ? `rgba(${coreMatch[1]}, ${coreMatch[2]}, ${coreMatch[3]}, ${parseFloat(coreMatch[4]) * fade})`
          : palette.nodeCore;
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
      // Soft clear via opacity only — no destination-out punch (avoids truncated line fans).
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
    observer.observe(stage);

    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerMedia = window.matchMedia('(pointer: coarse)');
    motionMedia.addEventListener('change', onMotionChange);
    pointerMedia.addEventListener('change', onPointerChange);

    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    let cancelled = false;

    const layoutObserver = new ResizeObserver(onLayoutChange);
    if (heroEl) layoutObserver.observe(heroEl);
    if (contentEl) {
      layoutObserver.observe(contentEl);
      CONTENT_SELECTORS.forEach((selector) => {
        const el = contentEl.querySelector(selector);
        if (el) layoutObserver.observe(el);
      });
    }
    if (statsGridEl) {
      layoutObserver.observe(statsGridEl);
      statsGridEl.querySelectorAll('.stat-item').forEach((card) => {
        layoutObserver.observe(card);
      });
    }

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
    stage.addEventListener('mousemove', onMouseMove);
    stage.addEventListener('mouseleave', onMouseLeave);

    resize();
    animationId = requestAnimationFrame(loop);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (cancelled) return;
        updateClearZones();
        drawFrame();
      });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationId);
      observer.disconnect();
      themeObserver.disconnect();
      layoutObserver.disconnect();
      typedObserver?.disconnect();
      motionMedia.removeEventListener('change', onMotionChange);
      pointerMedia.removeEventListener('change', onPointerChange);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onLayoutChange);
      stage.removeEventListener('mousemove', onMouseMove);
      stage.removeEventListener('mouseleave', onMouseLeave);
      measureNode?.remove();
      measureNode = null;
    };
  }, [i18n]);

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

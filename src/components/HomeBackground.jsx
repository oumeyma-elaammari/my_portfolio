import React, { useEffect, useRef } from 'react';
import { HERO_TYPED_STRINGS } from '../data/heroTypedStrings';
import '../styles/HomeBackground.css';

const CONTENT_MARGIN = 14;
const FADE_BAND = 20;
const HALO_DEPTH = 130;
const MIN_SIDE_BAND = 22;

const ZONE_SELECTORS = ['.greeting', 'h1', '.tagline', '.hero-buttons'];

const getTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCoarsePointer = () =>
  window.matchMedia('(pointer: coarse)').matches ||
  window.matchMedia('(hover: none)').matches;

const nodeCountForSize = (width) => {
  if (width < 480) return Math.max(22, Math.min(32, Math.floor(width / 14)));
  if (width < 900) return Math.max(40, Math.min(62, Math.floor(width / 16)));
  return Math.max(68, Math.min(100, Math.floor(width / 14)));
};

const connectionDistance = (width) => {
  if (width < 480) return 88;
  if (width < 900) return 108;
  return 128;
};

const createEmptyZone = () => ({
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  active: false
});

const pointInRect = (x, y, rect, inset = 0) =>
  x >= rect.x + inset &&
  x <= rect.x + rect.w - inset &&
  y >= rect.y + inset &&
  y <= rect.y + rect.h - inset;

const segmentIntersectsRect = (x1, y1, x2, y2, rect) => {
  if (pointInRect(x1, y1, rect) || pointInRect(x2, y2, rect)) return true;

  const edges = [
    [rect.x, rect.y, rect.x + rect.w, rect.y],
    [rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h],
    [rect.x + rect.w, rect.y + rect.h, rect.x, rect.y + rect.h],
    [rect.x, rect.y + rect.h, rect.x, rect.y]
  ];

  const cross = (ax, ay, bx, by, cx, cy) => (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);

  return edges.some(([ex1, ey1, ex2, ey2]) => {
    const d1 = cross(ex1, ey1, ex2, ey2, x1, y1);
    const d2 = cross(ex1, ey1, ex2, ey2, x2, y2);
    const d3 = cross(x1, y1, x2, y2, ex1, ey1);
    const d4 = cross(x1, y1, x2, y2, ex2, ey2);
    return d1 * d2 < 0 && d3 * d4 < 0;
  });
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

    let animationId = 0;
    let nodes = [];
    let visible = true;
    let reduceMotion = prefersReducedMotion();
    let allowPointer = !isCoarsePointer();
    let theme = getTheme();
    let width = 0;
    let height = 0;
    let dpr = 1;
    let linkDist = 128;
    let contentZone = createEmptyZone();
    let measureNode = null;
    let mouse = { x: null, y: null, active: false };
    let lastFrame = 0;

    const withAlpha = (rgba, alpha) => {
      const match = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (!match) return rgba;
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${parseFloat(match[4]) * alpha})`;
    };

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

    const getTextRects = () => {
      if (!contentEl || !section) return [];

      const sectionRect = section.getBoundingClientRect();
      const rects = [];

      ZONE_SELECTORS.forEach((selector) => {
        const el = contentEl.querySelector(selector);
        if (!el) return;

        const local = toLocalRect(el.getBoundingClientRect(), sectionRect);

        if (selector === '.tagline') {
          const maxWidth = measureMaxTypedWidth(el);
          const centerX = local.x + local.w / 2;
          local.w = Math.max(local.w, maxWidth);
          local.x = centerX - local.w / 2;
        }

        rects.push(local);
      });

      return rects;
    };

    const unionRects = (rects) => {
      if (!rects.length) return createEmptyZone();

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      rects.forEach((rect) => {
        minX = Math.min(minX, rect.x);
        minY = Math.min(minY, rect.y);
        maxX = Math.max(maxX, rect.x + rect.w);
        maxY = Math.max(maxY, rect.y + rect.h);
      });

      return {
        x: minX - CONTENT_MARGIN,
        y: minY - CONTENT_MARGIN,
        w: maxX - minX + CONTENT_MARGIN * 2,
        h: maxY - minY + CONTENT_MARGIN * 2,
        active: true
      };
    };

    const clampZone = (zone) => {
      let { x, y, w, h } = zone;
      x = Math.max(0, x);
      y = Math.max(0, y);
      if (x + w > width) w = Math.max(0, width - x);
      if (y + h > height) h = Math.max(0, height - y);
      return { x, y, w, h, active: w > 0 && h > 0 };
    };

    const updateContentZone = () => {
      contentZone = clampZone(unionRects(getTextRects()));
    };

    const distanceToHardZone = (x, y) => {
      if (!contentZone.active) return Infinity;

      const { x: zx, y: zy, w, h } = contentZone;
      const clampedX = Math.max(zx, Math.min(x, zx + w));
      const clampedY = Math.max(zy, Math.min(y, zy + h));
      return Math.hypot(x - clampedX, y - clampedY);
    };

    const zoneOpacityAt = (x, y) => {
      if (!contentZone.active) return 1;

      const dist = distanceToHardZone(x, y);
      if (dist <= 0) return 0;
      if (dist >= FADE_BAND) return 1;
      return dist / FADE_BAND;
    };

    const isHardBlocked = (x, y) =>
      contentZone.active && pointInRect(x, y, contentZone);

    const spawnInHalo = () => {
      if (!contentZone.active) {
        return { x: Math.random() * width, y: Math.random() * height };
      }

      const { x: zx, y: zy, w, h } = contentZone;
      const side = Math.floor(Math.random() * 4);
      const nearEdge = Math.random() * Math.random();
      const depth = nearEdge * HALO_DEPTH + CONTENT_MARGIN * 0.5;
      const spread = Math.random();

      const leftSpace = zx;
      const rightSpace = width - (zx + w);
      const topSpace = zy;
      const bottomSpace = height - (zy + h);

      if (side === 0 && topSpace > 6) {
        return {
          x: zx - HALO_DEPTH + spread * (w + HALO_DEPTH * 2),
          y: Math.max(6, zy - depth)
        };
      }

      if (side === 1 && rightSpace > 6) {
        const band = Math.max(MIN_SIDE_BAND, Math.min(rightSpace - 4, depth + 16));
        return {
          x: Math.min(width - 6, zx + w + band * (0.15 + nearEdge * 0.85)),
          y: zy - HALO_DEPTH + spread * (h + HALO_DEPTH * 2)
        };
      }

      if (side === 2 && bottomSpace > 6) {
        return {
          x: zx - HALO_DEPTH + spread * (w + HALO_DEPTH * 2),
          y: Math.min(height - 6, zy + h + depth)
        };
      }

      if (leftSpace > 6) {
        const band = Math.max(MIN_SIDE_BAND, Math.min(leftSpace - 4, depth + 16));
        return {
          x: Math.max(6, zx - band * (0.15 + nearEdge * 0.85)),
          y: zy - HALO_DEPTH + spread * (h + HALO_DEPTH * 2)
        };
      }

      if (topSpace > 6) {
        return { x: Math.random() * width, y: Math.max(6, zy - depth) };
      }

      if (bottomSpace > 6) {
        return { x: Math.random() * width, y: Math.min(height - 6, zy + h + depth) };
      }

      return {
        x: spread < 0.5 ? 6 : width - 6,
        y: zy + spread * h
      };
    };

    const createHaloNodes = (count) => {
      const created = [];
      let attempts = 0;

      while (created.length < count && attempts < count * 40) {
        attempts += 1;
        const point = spawnInHalo();
        const x = Math.max(4, Math.min(width - 4, point.x));
        const y = Math.max(4, Math.min(height - 4, point.y));
        if (isHardBlocked(x, y)) continue;

        created.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.4 + 1.2
        });
      }

      return created;
    };

    const repelNodeFromZone = (node) => {
      if (!contentZone.active || !pointInRect(node.x, node.y, contentZone)) return;

      const { x: zx, y: zy, w, h } = contentZone;
      const cx = zx + w / 2;
      const cy = zy + h / 2;
      const dx = node.x - cx;
      const dy = node.y - cy;
      const len = Math.max(Math.hypot(dx, dy), 0.001);
      const half = Math.max(w, h) / 2 + 8;

      node.x = cx + (dx / len) * half;
      node.y = cy + (dy / len) * half;
      node.vx += (dx / len) * 0.4;
      node.vy += (dy / len) * 0.4;
    };

    const bounceNodeFromZone = (node) => {
      if (!contentZone.active || !pointInRect(node.x, node.y, contentZone)) return;

      const { x: zx, y: zy, w, h } = contentZone;
      const left = zx;
      const right = zx + w;
      const top = zy;
      const bottom = zy + h;

      const distLeft = node.x - left;
      const distRight = right - node.x;
      const distTop = node.y - top;
      const distBottom = bottom - node.y;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);

      if (minDist === distLeft) {
        node.x = left;
        node.vx = -Math.abs(node.vx) - 0.05;
      } else if (minDist === distRight) {
        node.x = right;
        node.vx = Math.abs(node.vx) + 0.05;
      } else if (minDist === distTop) {
        node.y = top;
        node.vy = -Math.abs(node.vy) - 0.05;
      } else {
        node.y = bottom;
        node.vy = Math.abs(node.vy) + 0.05;
      }
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
      updateContentZone();
      nodes = createHaloNodes(nodeCountForSize(width));
      drawFrame(true);
    };

    const drawBackground = () => {
      ctx.clearRect(0, 0, width, height);
    };

    const drawLink = (x1, y1, x2, y2, baseAlpha, lineWidth) => {
      if (contentZone.active && segmentIntersectsRect(x1, y1, x2, y2, contentZone)) {
        return;
      }

      const fade = Math.min(zoneOpacityAt(x1, y1), zoneOpacityAt(x2, y2));
      if (fade <= 0.01) return;

      const [r, g, b] = themePalette(theme).line;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha * fade})`;
      ctx.lineWidth = lineWidth;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const drawLinks = () => {
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
          drawLink(a.x, a.y, other.x, other.y, alpha * 0.55, 1);
        }

        if (allowPointer && mouse.active && mouse.x != null && mouse.y != null) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const mouseDist = linkDist * 1.15;
          if (distSq <= mouseDist * mouseDist) {
            const alpha = 1 - Math.sqrt(distSq) / mouseDist;
            drawLink(a.x, a.y, mouse.x, mouse.y, alpha * 0.75, 1.25);
          }
        }
      }
    };

    const drawNodes = () => {
      const palette = themePalette(theme);

      nodes.forEach((node) => {
        const fade = zoneOpacityAt(node.x, node.y);
        if (fade <= 0.01 || isHardBlocked(node.x, node.y)) return;

        ctx.beginPath();
        ctx.fillStyle = withAlpha(palette.node, fade);
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = withAlpha(palette.nodeCore, fade);
        ctx.arc(node.x, node.y, Math.max(0.8, node.r * 0.35), 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const stepNodes = (delta) => {
      const speed = Math.min(delta / 16.67, 2);
      nodes.forEach((node) => {
        node.x += node.vx * speed;
        node.y += node.vy * speed;

        repelNodeFromZone(node);
        bounceNodeFromZone(node);

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
        updateContentZone();
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

      if (isHardBlocked(mouse.x, mouse.y)) {
        mouse.active = false;
        return;
      }

      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    };

    const onLayoutChange = () => {
      updateContentZone();
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
      ZONE_SELECTORS.forEach((selector) => {
        const el = contentEl.querySelector(selector);
        if (el) layoutObserver.observe(el);
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

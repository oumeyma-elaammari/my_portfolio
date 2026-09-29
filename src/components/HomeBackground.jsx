import React, { useEffect, useRef } from 'react';
import '../styles/HomeBackground.css';

const CONTENT_MARGIN = 40;
const FADE_BAND = 44;

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

const createEmptyZone = () => ({
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  active: false
});

const pointInRect = (x, y, rect) =>
  x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;

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

const createNodes = (count, width, height, isBlocked) => {
  const nodes = [];
  let attempts = 0;

  while (nodes.length < count && attempts < count * 30) {
    attempts += 1;
    const x = Math.random() * width;
    const y = Math.random() * height;
    if (isBlocked(x, y)) continue;

    nodes.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 1.2
    });
  }

  return nodes;
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
    let linkDist = 130;
    let mobileRestricted = false;
    let contentZone = createEmptyZone();
    let mouse = { x: null, y: null, active: false };
    let lastFrame = 0;

    const withAlpha = (rgba, alpha) => {
      const match = rgba.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (!match) return rgba;
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${parseFloat(match[4]) * alpha})`;
    };

    const updateContentZone = () => {
      if (!contentEl || !section) {
        contentZone = createEmptyZone();
        mobileRestricted = width < 768;
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const contentRect = contentEl.getBoundingClientRect();

      let zoneX = contentRect.left - sectionRect.left - CONTENT_MARGIN;
      let zoneY = contentRect.top - sectionRect.top - CONTENT_MARGIN;
      let zoneW = contentRect.width + CONTENT_MARGIN * 2;
      let zoneH = contentRect.height + CONTENT_MARGIN * 2;

      zoneX = Math.max(0, zoneX);
      zoneY = Math.max(0, zoneY);
      if (zoneX + zoneW > width) zoneW = Math.max(0, width - zoneX);
      if (zoneY + zoneH > height) zoneH = Math.max(0, height - zoneY);

      contentZone = {
        x: zoneX,
        y: zoneY,
        w: zoneW,
        h: zoneH,
        active: zoneW > 0 && zoneH > 0
      };

      mobileRestricted = width < 768 || contentZone.w / Math.max(width, 1) > 0.82;
    };

    const distanceToHardZone = (x, y) => {
      if (!contentZone.active) return Infinity;

      const { x: zx, y: zy, w, h } = contentZone;
      const clampedX = Math.max(zx, Math.min(x, zx + w));
      const clampedY = Math.max(zy, Math.min(y, zy + h));
      const dx = x - clampedX;
      const dy = y - clampedY;
      return Math.hypot(dx, dy);
    };

    const zoneOpacityAt = (x, y) => {
      if (!contentZone.active) return 1;

      const dist = distanceToHardZone(x, y);
      if (dist <= 0) return 0;
      if (dist >= FADE_BAND) return 1;
      return dist / FADE_BAND;
    };

    const mobileOpacityAt = (y) => {
      if (!mobileRestricted) return 1;

      const topBand = height * 0.17;
      const bottomStart = height * 0.8;
      if (y <= topBand || y >= bottomStart) return 1;
      return 0.07;
    };

    const elementOpacityAt = (x, y) => zoneOpacityAt(x, y) * mobileOpacityAt(y);

    const isHardBlocked = (x, y) =>
      contentZone.active && pointInRect(x, y, contentZone);

    const isSpawnBlocked = (x, y) => {
      if (isHardBlocked(x, y)) return true;
      if (mobileRestricted) {
        const topBand = height * 0.17;
        const bottomStart = height * 0.8;
        if (y > topBand && y < bottomStart && Math.random() > 0.12) return true;
      }
      return false;
    };

    const repelNodeFromZone = (node) => {
      if (!contentZone.active) return;

      const { x: zx, y: zy, w, h } = contentZone;
      if (!pointInRect(node.x, node.y, contentZone)) return;

      const cx = zx + w / 2;
      const cy = zy + h / 2;
      const dx = node.x - cx;
      const dy = node.y - cy;
      const len = Math.max(Math.hypot(dx, dy), 0.001);
      const half = Math.max(w, h) / 2 + 10;

      node.x = cx + (dx / len) * half;
      node.y = cy + (dy / len) * half;
      node.vx += (dx / len) * 0.45;
      node.vy += (dy / len) * 0.45;
    };

    const bounceNodeFromZone = (node) => {
      if (!contentZone.active) return;

      const { x: zx, y: zy, w, h } = contentZone;
      const pad = 1.5;
      const left = zx - pad;
      const right = zx + w + pad;
      const top = zy - pad;
      const bottom = zy + h + pad;

      if (node.x <= left || node.x >= right || node.y <= top || node.y >= bottom) return;
      if (!pointInRect(node.x, node.y, contentZone)) return;

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
      nodes = createNodes(nodeCountForSize(width, height), width, height, isSpawnBlocked);
      drawFrame(true);
    };

    const drawBackground = () => {
      ctx.clearRect(0, 0, width, height);
    };

    const drawLink = (x1, y1, x2, y2, baseAlpha, lineWidth) => {
      if (contentZone.active && segmentIntersectsRect(x1, y1, x2, y2, contentZone)) {
        return;
      }

      const fade = Math.min(elementOpacityAt(x1, y1), elementOpacityAt(x2, y2));
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
        const fade = elementOpacityAt(node.x, node.y);
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
        stepNodes(Math.min(delta, 33));
        drawFrame(false);
      }
      animationId = requestAnimationFrame(loop);
    };

    const onVisibility = ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        lastFrame = 0;
        updateContentZone();
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
      drawFrame(true);
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

    const contentObserver = contentEl
      ? new ResizeObserver(onLayoutChange)
      : null;
    contentObserver?.observe(contentEl);

    window.addEventListener('resize', resize);
    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);

    resize();
    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      themeObserver.disconnect();
      contentObserver?.disconnect();
      motionMedia.removeEventListener('change', onMotionChange);
      pointerMedia.removeEventListener('change', onPointerChange);
      window.removeEventListener('resize', resize);
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
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

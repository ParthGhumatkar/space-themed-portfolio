import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";

interface Star { x: number; y: number; r: number; alpha: number; speed: number; }
interface NebulaP { angle: number; radius: number; size: number; alpha: number; }
interface SpiralP { arm: number; baseAngle: number; radius: number; spread: number; alpha: number; size: number; }
interface ProjectNode {
  name: string; sub: string; url: string;
  angle: number; radius: number; orbitSpeed: number;
  hovered: boolean; hoveredScale: number;
}

const PROJECT_DATA = [
  { name: "SEOREPORT", sub: "AI · Next.js · GPT-4",  url: "https://seoreport.parthghumatkar.com", angle: 0.4, radius: 165, orbitSpeed: 0.00022 },
  { name: "SWATANTRA", sub: "Booking · JWT · Neon",   url: "https://swatantra.parthghumatkar.com",  angle: 2.5, radius: 198, orbitSpeed: 0.00017 },
  { name: "NOCTIS",    sub: "Python · Ollama",         url: "https://github.com/ParthGhumatkar/noctis", angle: 4.8, radius: 142, orbitSpeed: 0.00028 },
];

const GalaxyCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const frameRef     = useRef<number>(0);
  const mouseRef     = useRef({ x: 0, y: 0 });
  const cxRef        = useRef(0);
  const cyRef        = useRef(0);
  const starsRef     = useRef<Star[]>([]);
  const nebulaRef    = useRef<NebulaP[]>([]);
  const spiralRef    = useRef<SpiralP[]>([]);
  const projectsRef  = useRef<ProjectNode[]>(
    PROJECT_DATA.map(p => ({ ...p, hovered: false, hoveredScale: 8 }))
  );
  const mobileRef    = useRef(false);
  const isDarkRef    = useRef(true);
  const { theme }    = useTheme();

  useEffect(() => {
    isDarkRef.current = theme === "dark";
  }, [theme]);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    mobileRef.current = window.innerWidth < 768;

    const setup = () => {
      const dpr   = window.devicePixelRatio || 1;
      const w     = container.clientWidth;
      const h     = container.clientHeight;
      canvas.width  = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mob         = mobileRef.current;
      const starCount   = mob ? 100 : 400;
      const spiralCount = mob ? 160 : 480;

      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: 0.3 + Math.random() * 1.1,
        alpha: Math.random(),
        speed: 0.002 + Math.random() * 0.008,
      }));

      nebulaRef.current = Array.from({ length: 80 }, () => ({
        angle:  Math.random() * Math.PI * 2,
        radius: Math.random() * 32,
        size:   2 + Math.random() * 3,
        alpha:  0.02 + Math.random() * 0.04,
      }));

      spiralRef.current = Array.from({ length: spiralCount }, (_, i) => ({
        arm:       i % 4,
        baseAngle: ((i % 4) / 4) * Math.PI * 2 + Math.random() * 0.5,
        radius:    20 + Math.random() * 220,
        spread:    (Math.random() - 0.5) * 40,
        alpha:     0.1 + Math.random() * 0.5,
        size:      0.4 + Math.random() * 1.4,
      }));

      cxRef.current = w * 0.68;
      cyRef.current = h * 0.48;
    };

    setup();
    mouseRef.current = { x: container.clientWidth / 2, y: container.clientHeight / 2 };

    const ro = new ResizeObserver(setup);
    ro.observe(container);

    const draw = () => {
      const dark  = isDarkRef.current;
      const mob   = mobileRef.current;
      const w     = container.clientWidth;
      const h     = container.clientHeight;

      // Lerp center with mouse parallax
      const tCx = w * 0.68 + (mouseRef.current.x - w / 2) * 0.012;
      const tCy = h * 0.48 + (mouseRef.current.y - h / 2) * 0.008;
      cxRef.current += (tCx - cxRef.current) * 0.06;
      cyRef.current += (tCy - cyRef.current) * 0.06;
      const cx = cxRef.current;
      const cy = cyRef.current;

      ctx.clearRect(0, 0, w, h);

      // ─── LAYER 1: Background stars ───────────────────────────────
      starsRef.current.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
        const a = Math.max(0, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(237,234,224,${(a * 0.6).toFixed(3)})`
          : `rgba(0,0,0,${(a * 0.09).toFixed(3)})`;
        ctx.fill();
      });

      // ─── LAYER 2: Nebula core glow ───────────────────────────────
      nebulaRef.current.forEach(n => {
        n.angle += 0.003;
        const nx = cx + Math.cos(n.angle) * n.radius;
        const ny = cy + Math.sin(n.angle) * n.radius;
        const a  = dark ? n.alpha : n.alpha * 0.5;
        ctx.beginPath();
        ctx.arc(nx, ny, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(42,107,74,${a.toFixed(3)})`;
        ctx.fill();
      });

      // ─── LAYER 3: Spiral arm particles ───────────────────────────
      spiralRef.current.forEach(p => {
        p.baseAngle += 0.00018;
        const px = cx + Math.cos(p.baseAngle) * p.radius + p.spread;
        const py = cy + Math.sin(p.baseAngle) * p.radius * 0.4 + p.spread * 0.3;
        const edgeFade = Math.max(0, 1 - p.radius / 240);
        const a = p.alpha * edgeFade;

        ctx.beginPath();
        if (p.arm === 0) {
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = dark
            ? `rgba(42,107,74,${a.toFixed(3)})`
            : `rgba(42,107,74,${(a * 0.7).toFixed(3)})`;
        } else {
          ctx.arc(px, py, p.size * 0.8, 0, Math.PI * 2);
          const sa = dark ? a * 0.4 : a * 0.3;
          ctx.fillStyle = dark
            ? `rgba(160,190,160,${sa.toFixed(3)})`
            : `rgba(80,120,80,${sa.toFixed(3)})`;
        }
        ctx.fill();
      });

      // ─── LAYER 4: Orbit rings ──────────────────────────────
      [142, 198, 165].forEach(r => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = dark ? "rgba(42,107,74,0.06)" : "rgba(42,107,74,0.09)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // ─── LAYER 5: Core ───────────────────────────────────────────
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
      grad.addColorStop(0, dark ? "rgba(42,107,74,0.4)" : "rgba(42,107,74,0.25)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath(); ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();

      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(42,107,74,0.9)"; ctx.fill();

      ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(200,240,200,0.8)"; ctx.fill();

      // ─── LAYER 6: Project nodes ───────────────────────────────────
      const labelColor = dark ? "#EDEAE0" : "#0A0A0A";

      projectsRef.current.forEach(proj => {
        if (!proj.hovered) proj.angle += proj.orbitSpeed * 60;

        const nx = cx + Math.cos(proj.angle) * proj.radius;
        const ny = cy + Math.sin(proj.angle) * proj.radius * 0.4;

        const tSize = proj.hovered ? 14 : 8;
        proj.hoveredScale += (tSize - proj.hoveredScale) * 0.15;

        // Outer halo
        ctx.beginPath(); ctx.arc(nx, ny, 22, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(42,107,74,0.05)"; ctx.fill();

        // Inner halo
        ctx.beginPath(); ctx.arc(nx, ny, 12, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(42,107,74,0.12)"; ctx.fill();

        // Node body
        ctx.beginPath(); ctx.arc(nx, ny, proj.hoveredScale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(42,107,74,0.8)"; ctx.fill();

        // Core dot
        ctx.beginPath(); ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,240,200,0.9)"; ctx.fill();

        const onRight = nx > cx;
        const labelX  = onRight ? nx + 14 : nx - 14;

        if (proj.hovered) {
          // Hover card
          const cardX = onRight ? nx + 8 : nx - 148;
          const cardY = ny - 32;

          ctx.fillStyle = dark ? "rgba(10,10,10,0.88)" : "rgba(245,242,235,0.92)";
          ctx.beginPath(); ctx.rect(cardX, cardY, 140, 64); ctx.fill();
          ctx.strokeStyle = "rgba(42,107,74,0.3)"; ctx.lineWidth = 0.5; ctx.stroke();

          ctx.textAlign   = "left";
          ctx.globalAlpha = 0.9;

          ctx.font      = "bold 13px 'Bebas Neue', sans-serif";
          ctx.fillStyle = dark ? "#EDEAE0" : "#0A0A0A";
          ctx.fillText(proj.name, cardX + 10, cardY + 18);

          ctx.font      = "9px 'IBM Plex Mono', monospace";
          ctx.fillStyle = "rgba(42,107,74,0.8)";
          ctx.fillText(proj.sub, cardX + 10, cardY + 33);

          ctx.font      = "10px 'IBM Plex Mono', monospace";
          ctx.fillStyle = "#2A6B4A";
          ctx.fillText("Visit →", cardX + 10, cardY + 52);

          ctx.globalAlpha = 1;
        } else {
          // Default label — hidden on mobile
          if (!mob) {
            ctx.textAlign   = onRight ? "left" : "right";
            ctx.globalAlpha = 0.85;
            ctx.font      = "18px 'Bebas Neue', sans-serif";
            ctx.fillStyle = labelColor;
            ctx.fillText(proj.name, labelX, ny - 4);

            ctx.globalAlpha = 0.6;
            ctx.font      = "10px 'IBM Plex Mono', monospace";
            ctx.fillStyle = "#2A6B4A";
            ctx.fillText(proj.sub, labelX, ny + 14);

            ctx.globalAlpha = 1;
          }
        }
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };

    const cx = cxRef.current;
    const cy = cyRef.current;
    let anyHov = false;

    projectsRef.current.forEach(proj => {
      const px = cx + Math.cos(proj.angle) * proj.radius;
      const py = cy + Math.sin(proj.angle) * proj.radius * 0.4;
      proj.hovered = Math.sqrt((x - px) ** 2 + (y - py) ** 2) < 28;
      if (proj.hovered) anyHov = true;
    });

    if (canvasRef.current) {
      canvasRef.current.style.cursor = anyHov ? "pointer" : "none";
    }
  };

  const handleMouseLeave = () => {
    const c = containerRef.current;
    if (c) mouseRef.current = { x: c.clientWidth / 2, y: c.clientHeight / 2 };
    projectsRef.current.forEach(p => { p.hovered = false; });
    if (canvasRef.current) canvasRef.current.style.cursor = "none";
  };

  const handleClick = () => {
    const hit = projectsRef.current.find(p => p.hovered);
    if (hit) window.open(hit.url, "_blank");
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", cursor: "none" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
    </div>
  );
};

export default GalaxyCanvas;

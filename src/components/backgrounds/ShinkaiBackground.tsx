import { useEffect, useRef } from "react";

interface StarP { x: number; y: number; r: number; alpha: number; speed: number; }
interface Particle { x: number; y: number; r: number; alpha: number; warm: boolean; }
interface LightRay { x: number; width: number; angle: number; alpha: number; phase: number; speed: number; }

const ShinkaiBackground = () => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const frameRef     = useRef<number>(0);
  const starsRef     = useRef<StarP[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const raysRef      = useRef<LightRay[]>([]);
  const timeRef      = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      const w   = window.innerWidth;
      const h   = window.innerHeight;
      canvas.width  = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      starsRef.current = Array.from({ length: 200 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.75,
        r: 0.3 + Math.random() * 1.5,
        alpha: 0.2 + Math.random() * 0.8,
        speed: 0.002 + Math.random() * 0.006,
      }));

      particlesRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 1.2,
        alpha: 0.1 + Math.random() * 0.3,
        warm: Math.random() > 0.5,
      }));

      raysRef.current = Array.from({ length: 4 }, (_, i) => ({
        x: w * (0.5 + i * 0.15),
        width: 80 + Math.random() * 120,
        angle: -(30 + Math.random() * 30) * (Math.PI / 180),
        alpha: 0.02 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
      }));
    };

    setup();
    window.addEventListener("resize", setup);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Sky gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0,    "#020210");
      grad.addColorStop(0.25, "#0d0b3d");
      grad.addColorStop(0.5,  "#1a1060");
      grad.addColorStop(0.75, "#2d1b8c");
      grad.addColorStop(1,    "#1a0f4a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Stars
      starsRef.current.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0.1) s.speed *= -1;
        const a = Math.max(0, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,210,255,${a.toFixed(3)})`;
        ctx.fill();

        if (s.r > 1.0) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,160,255,${(a * 0.08).toFixed(3)})`;
          ctx.fill();
        }
      });

      // Light rays
      raysRef.current.forEach(ray => {
        const rAlpha = ray.alpha + Math.sin(t * ray.speed + ray.phase) * 0.02;
        ctx.save();
        ctx.translate(ray.x, 0);
        ctx.rotate(ray.angle);
        const rayGrad = ctx.createLinearGradient(0, 0, 0, h * 1.5);
        rayGrad.addColorStop(0, `rgba(150,130,255,${rAlpha})`);
        rayGrad.addColorStop(1, `rgba(150,130,255,0)`);
        ctx.fillStyle = rayGrad;
        ctx.fillRect(-ray.width / 2, 0, ray.width, h * 1.5);
        ctx.restore();
      });

      // Floating particles
      particlesRef.current.forEach(p => {
        p.y -= 0.1;
        if (p.y < -5) p.y = h + 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.warm
          ? `rgba(255,200,150,${p.alpha.toFixed(3)})`
          : `rgba(150,180,255,${p.alpha.toFixed(3)})`;
        ctx.fill();
      });

      // Atmospheric glow at horizon
      const glowX = w / 2;
      const glowY = h * 0.70;
      const ellipse = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, w * 0.35);
      ellipse.addColorStop(0, "rgba(80,50,180,0.09)");
      ellipse.addColorStop(1, "rgba(80,50,180,0)");
      ctx.save();
      ctx.scale(1, 0.35);
      ctx.beginPath();
      ctx.arc(glowX, glowY / 0.35, w * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = ellipse;
      ctx.fill();
      ctx.restore();

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default ShinkaiBackground;

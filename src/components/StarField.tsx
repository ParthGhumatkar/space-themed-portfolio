import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  speed: number;
  offset: number;
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);
  const starsRef  = useRef<Star[]>([]);
  const { theme } = useTheme();
  const isDarkRef = useRef(theme === "dark");

  useEffect(() => {
    isDarkRef.current = theme === "dark";
  }, [theme]);

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

      starsRef.current = Array.from({ length: 180 }, () => ({
        x:         Math.random() * w,
        y:         Math.random() * h,
        radius:    0.2 + Math.random() * 0.8,
        baseAlpha: 0.04 + Math.random() * 0.14,
        speed:     0.002 + Math.random() * 0.006,
        offset:    Math.random() * Math.PI * 2,
      }));
    };

    setup();

    let t = 0;
    const draw = () => {
      const w    = window.innerWidth;
      const h    = window.innerHeight;
      const dark = isDarkRef.current;

      ctx.clearRect(0, 0, w, h);

      starsRef.current.forEach(s => {
        const alpha = s.baseAlpha + Math.sin(t * s.speed + s.offset) * 0.06;
        const a     = Math.max(0, Math.min(1, alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(237,234,224,${a.toFixed(3)})`
          : `rgba(0,0,0,${(a * 0.08).toFixed(3)})`;
        ctx.fill();
      });

      t++;
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default StarField;

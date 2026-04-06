import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; r: number;
  alpha: number; speed: number;
  vx: number; vy: number;
}

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef  = useRef<Star[]>([]);
  const frameRef  = useRef<number>(0);
  const scrollVRef = useRef(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width  = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      starsRef.current = Array.from({ length: 200 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 0.3 + Math.random() * 1.2,
        alpha: Math.random(),
        speed: 0.002 + Math.random() * 0.007,
        vx: 0, vy: 0,
      }));
    };

    setup();
    window.addEventListener("resize", setup);

    const onScroll = (e: Event) => {
      const el = e.target as HTMLElement;
      const curr = el.scrollTop ?? 0;
      scrollVRef.current = curr - lastScrollRef.current;
      lastScrollRef.current = curr;
    };

    const snapContainer = document.querySelector(".snap-container");
    if (snapContainer) snapContainer.addEventListener("scroll", onScroll);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const sv = scrollVRef.current;
      scrollVRef.current *= 0.85;

      ctx.clearRect(0, 0, w, h);

      starsRef.current.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;

        const streak = Math.abs(sv) * 0.04;

        if (streak > 0.5) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x, s.y + sv * 0.3);
          ctx.strokeStyle = `rgba(237,234,224,${Math.min(s.alpha * 0.5, 0.4)})`;
          ctx.lineWidth = s.r * 0.8;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(237,234,224,${(Math.max(0, Math.min(1, s.alpha)) * 0.65).toFixed(3)})`;
          ctx.fill();
        }
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", setup);
      if (snapContainer) snapContainer.removeEventListener("scroll", onScroll);
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

export default SpaceBackground;

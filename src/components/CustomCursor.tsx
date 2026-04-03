import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -200, y: -200 });
  const last    = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const hov     = useRef(false);

  useEffect(() => {
    let raf: number;

    const onMove = (e: MouseEvent) => {
      last.current = { ...pos.current };
      pos.current  = { x: e.clientX, y: e.clientY };
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-hover]"))
        hov.current = true;
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-hover]"))
        hov.current = false;
    };

    const tick = () => {
      const dx    = pos.current.x - last.current.x;
      const dy    = pos.current.y - last.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      last.current = { ...pos.current };

      ring.current.x += (pos.current.x - ring.current.x) * 0.08;
      ring.current.y += (pos.current.y - ring.current.y) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 2.5}px, ${pos.current.y - 2.5}px)`;
        dotRef.current.style.opacity   = hov.current ? "0" : "1";
      }

      if (ringRef.current) {
        const isHov = hov.current;
        const size  = isHov ? 44 : 36;
        const sx    = isHov ? 1 : 1 + Math.min(speed * 0.012, 0.5);
        const sy    = isHov ? 1 : 1 - Math.min(speed * 0.008, 0.3);
        const half  = size / 2;
        ringRef.current.style.width       = `${size}px`;
        ringRef.current.style.height      = `${size}px`;
        ringRef.current.style.transform   = `translate(${ring.current.x - half}px, ${ring.current.y - half}px) scaleX(${sx}) scaleY(${sy})`;
        ringRef.current.style.borderColor = isHov ? "rgba(42,107,74,0.7)" : "rgba(42,107,74,0.4)";
        ringRef.current.style.transition  = speed < 1 ? "transform 0.4s ease, border-color 0.15s, width 0.15s, height 0.15s" : "border-color 0.15s, width 0.15s, height 0.15s";
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 5, height: 5, borderRadius: "50%",
        backgroundColor: "var(--green)",
        pointerEvents: "none", zIndex: 10000,
        willChange: "transform",
        transition: "opacity 0.15s ease",
      }} />
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(42,107,74,0.4)",
        pointerEvents: "none", zIndex: 9999,
        willChange: "transform",
      }} />
    </>
  );
};

export default CustomCursor;

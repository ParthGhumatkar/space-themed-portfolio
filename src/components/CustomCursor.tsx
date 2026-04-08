import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const hov     = useRef(false);

  useEffect(() => {
    let raf: number;

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-hover]")) hov.current = true;
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-hover]")) hov.current = false;
    };

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.08;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 2.5}px,${mouse.current.y - 2.5}px)`;
        dotRef.current.style.opacity   = hov.current ? "0" : "1";
      }
      if (ringRef.current) {
        const scale = hov.current ? 1.5 : 1;
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px,${ring.current.y - 16}px) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 4, height: 4, borderRadius: "50%",
        background: "#C8A96E",
        pointerEvents: "none", zIndex: 10000,
        willChange: "transform",
        transition: "opacity 0.15s ease",
      }} />
      <div id="cursor-ring" ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 28, height: 28, borderRadius: "50%",
        border: "1px solid rgba(200,169,110,0.4)",
        pointerEvents: "none", zIndex: 9999,
        willChange: "transform",
        transition: "transform 0.15s ease",
      }} />
    </>
  );
};

export default CustomCursor;

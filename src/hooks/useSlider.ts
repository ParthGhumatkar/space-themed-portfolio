import { useCallback, useEffect, useRef, useState } from "react";

export function useSlider(total: number) {
  const [current, setCurrent]       = useState(0);
  const [exiting, setExiting]       = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const lockRef      = useRef(false);
  const touchStartY  = useRef(0);

  const goTo = useCallback((idx: number) => {
    if (lockRef.current) return;
    if (idx < 0 || idx >= total) return;
    if (idx === current) return;

    lockRef.current = true;
    setTransitioning(true);
    setExiting(current);
    setCurrent(idx);

    setTimeout(() => {
      setExiting(null);
      setTransitioning(false);
      lockRef.current = false;
    }, 800);
  }, [current, total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (lockRef.current) return;
      if (e.deltaY > 30) next();
      else if (e.deltaY < -30) prev();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); next(); }
      if (["ArrowUp",   "PageUp"  ].includes(e.key)) { e.preventDefault(); prev(); }
    };
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return;
      if (delta > 0) next(); else prev();
    };

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("keydown",    onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("keydown",    onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [next, prev]);

  return { current, exiting, transitioning, goTo, next, prev };
}

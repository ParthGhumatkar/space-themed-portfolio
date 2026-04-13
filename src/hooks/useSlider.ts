import { useState, useEffect, useCallback, useRef } from "react";

const TRANSITION_DURATION = 900;

export function useSlider(total: number) {
  const [currentSlide, setCurrentSlide]   = useState(0);
  const [prevSlide,    setPrevSlide]       = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    if (index < 0 || index >= total) return;
    if (index === currentSlide) return;
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
    setIsTransitioning(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setPrevSlide(null);
    }, TRANSITION_DURATION);
  }, [currentSlide, isTransitioning, total]);

  const goNext = useCallback(() => goTo(currentSlide + 1), [currentSlide, goTo]);
  const goPrev = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);

  // Wheel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('.left-panel-scroll')) {
        return;
      }
      e.preventDefault();
      if (isTransitioning) return;
      if (Math.abs(e.deltaY) < 40) return;
      if (e.deltaY > 0) goNext(); else goPrev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev, isTransitioning]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowUp"   || e.key === "PageUp"  ) { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Touch — 60px threshold
  useEffect(() => {
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      const delta = startY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 60) delta > 0 ? goNext() : goPrev();
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend",   onEnd);
    };
  }, [goNext, goPrev]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return { currentSlide, prevSlide, isTransitioning, goTo, goNext, goPrev };
}

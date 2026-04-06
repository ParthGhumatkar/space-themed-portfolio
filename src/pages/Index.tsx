import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import CustomCursor from "../components/CustomCursor";
import Nav from "../components/Nav";
import ScrollProgress from "../components/ScrollProgress";
import SpaceBackground from "../components/backgrounds/SpaceBackground";
import ShinkaiBackground from "../components/backgrounds/ShinkaiBackground";
import Slide01_Hero from "../components/slides/Slide01_Hero";
import Slide02_Projects from "../components/slides/Slide02_Projects";
import Slide03_Seoreport from "../components/slides/Slide03_Seoreport";
import Slide04_Swatantra from "../components/slides/Slide04_Swatantra";
import Slide05_Noctis from "../components/slides/Slide05_Noctis";
import Slide06_Stack from "../components/slides/Slide06_Stack";
import Slide07_About from "../components/slides/Slide07_About";
import Slide08_Contact from "../components/slides/Slide08_Contact";

const TOTAL = 8;

const Index = () => {
  const { theme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFlags, setActiveFlags] = useState<boolean[]>(
    Array.from({ length: TOTAL }, () => false)
  );
  const [flashOpacity, setFlashOpacity] = useState(0);
  const snapRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const isFirstMount = useRef(true);

  // Activate slide 0 after first paint so CSS transitions fire
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setActiveFlags(prev => { const n = [...prev]; n[0] = true; return n; });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const container = snapRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = slideRefs.current.indexOf(entry.target as HTMLElement);
          if (idx === -1) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSlide(idx);
            setActiveFlags(prev => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    const slides = container.querySelectorAll(".slide");
    slides.forEach((el, i) => {
      slideRefs.current[i] = el as HTMLElement;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isFirstMount.current) { isFirstMount.current = false; return; }
    const t1 = setTimeout(() => setFlashOpacity(0.3), 16);
    const t2 = setTimeout(() => setFlashOpacity(0), 166);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [activeSlide]);

  const scrollToSlide = (idx: number) => {
    const slides = snapRef.current?.querySelectorAll(".slide");
    slides?.[idx]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToSlide(Math.min(activeSlide + 1, TOTAL - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSlide(Math.max(activeSlide - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeSlide]);

  return (
    <>
      {theme === "dark" ? <SpaceBackground /> : <ShinkaiBackground />}
      <CustomCursor />
      <Nav activeSlide={activeSlide} totalSlides={TOTAL} />
      <ScrollProgress
        activeSlide={activeSlide}
        totalSlides={TOTAL}
        onDotClick={scrollToSlide}
      />

      <div ref={snapRef} className="snap-container" style={{ position: "relative", zIndex: 1 }}>
        <Slide01_Hero      isActive={activeFlags[0]} isCurrent={activeSlide === 0} />
        <Slide02_Projects  isActive={activeFlags[1]} isCurrent={activeSlide === 1} />
        <Slide03_Seoreport isActive={activeFlags[2]} isCurrent={activeSlide === 2} />
        <Slide04_Swatantra isActive={activeFlags[3]} isCurrent={activeSlide === 3} />
        <Slide05_Noctis    isActive={activeFlags[4]} isCurrent={activeSlide === 4} />
        <Slide06_Stack     isActive={activeFlags[5]} isCurrent={activeSlide === 5} />
        <Slide07_About     isActive={activeFlags[6]} isCurrent={activeSlide === 6} />
        <Slide08_Contact   isActive={activeFlags[7]} isCurrent={activeSlide === 7} />
      </div>

      {/* Slide transition film-cut flash */}
      <div style={{
        position: 'fixed', inset: 0,
        background: '#000',
        zIndex: 50,
        opacity: flashOpacity,
        transition: 'opacity 0.15s ease',
        pointerEvents: 'none',
      }} />
    </>
  );
};

export default Index;

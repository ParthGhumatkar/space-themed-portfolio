import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useIsMobile } from "../../hooks/useIsMobile";
import GalaxyCanvas from "../GalaxyCanvas";

interface Props { isActive: boolean; isCurrent?: boolean; }

const PROJECTS = [
  { num: "01", name: "SEOREPORT", slide: 2 },
  { num: "02", name: "SWATANTRA", slide: 3 },
  { num: "03", name: "NOCTIS",    slide: 4 },
];

const Slide02_Projects = ({ isActive, isCurrent = false }: Props) => {
  const { theme } = useTheme();
  const [hov, setHov] = useState<number | null>(null);
  const accent = theme === "dark" ? "#2A6B4A" : "#7C6AF7";
  const isMobile = useIsMobile();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    if (isCurrent) {
      imgRef.current.style.transition = 'transform 10s ease-out';
      imgRef.current.style.transform = 'scale(1.0)';
    } else {
      imgRef.current.style.transition = 'none';
      imgRef.current.style.transform = isMobile ? 'scale(1.03)' : 'scale(1.08)';
    }
  }, [isCurrent, isMobile]);

  const scrollToSlide = (idx: number) => {
    const snap = document.querySelector(".snap-container") as HTMLElement;
    const slides = snap?.querySelectorAll(".slide");
    slides?.[idx]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`slide${isActive ? " slide-active" : ""}`}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <img
          ref={imgRef}
          src="/slides/slide-02.png"
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            display: 'block',
            transform: 'scale(1.08)',
            willChange: 'transform',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,10,25,0.4) 0%, rgba(5,10,25,0.75) 100%)',
        }} />
      </div>

      <div style={{
        position: "absolute", inset: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
      }}>
        {/* Left half */}
        <div style={{
          width: isMobile ? "100%" : "50%",
          padding: isMobile ? "80px 24px 40px" : "80px 0 80px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <p className="slide-heading" style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, letterSpacing: "0.15em",
            color: "var(--text2)", textTransform: "uppercase",
            marginBottom: 24,
          }}>
            SELECTED WORK
          </p>

          <h2 className="slide-heading" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(52px, 7vw, 96px)",
            lineHeight: 0.9,
            color: "var(--text)",
            marginBottom: 24,
          }}>
            Three things<br />
            I've actually<br />
            shipped.
          </h2>

          <p className="slide-subtext" style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300, fontSize: 15,
            color: "var(--text2)", lineHeight: 1.65,
            maxWidth: 360, marginBottom: 48,
          }}>
            Not side projects. Not tutorials.<br />
            Real products solving real problems.
          </p>

          <div className="slide-cta">
            {PROJECTS.map((p, i) => (
              <button
                key={p.num}
                onClick={() => scrollToSlide(p.slide)}
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
                className="project-link"
                style={{
                  background: "none", border: "none",
                  width: "100%", textAlign: "left",
                  color: hov === i ? accent : "var(--text)",
                  transform: hov === i ? "translateX(8px)" : "translateX(0)",
                }}
              >
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11, color: "var(--text2)",
                  letterSpacing: "0.1em", flexShrink: 0,
                }}>
                  {"{ " + p.num + " }"}
                </span>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(20px,2.5vw,28px)",
                  letterSpacing: "0.04em", flex: 1,
                }}>
                  {p.name}
                </span>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 14,
                  color: hov === i ? accent : "var(--text2)",
                  transition: "color 0.2s",
                }}>→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right half — galaxy orbital on desktop */}
        {!isMobile && (
          <div style={{
            width: "50%", height: "100%",
            position: "relative",
          }}>
            <GalaxyCanvas />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide02_Projects;

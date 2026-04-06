import { useRef, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useIsMobile } from "../../hooks/useIsMobile";
import GalaxyCanvas from "../GalaxyCanvas";

interface Props { isActive: boolean; isCurrent?: boolean; }

const Slide01_Hero = ({ isActive, isCurrent = false }: Props) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const accent = theme === "dark" ? "#2A6B4A" : "#7C6AF7";
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

  return (
    <div className={`slide${isActive ? " slide-active" : ""}`}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <img
          ref={imgRef}
          src="/slides/slide-01.png"
          alt=""
          loading="eager"
          decoding="async"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            display: 'block',
            transform: 'scale(1.08)',
            willChange: 'transform',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,5,20,0.3) 0%, rgba(5,5,20,0.7) 100%)',
        }} />
      </div>

      <GalaxyCanvas />

      {/* Content */}
      <div style={{
        position: "absolute",
        bottom: isMobile ? 80 : 64,
        left: isMobile ? 24 : 56,
        zIndex: 2,
        maxWidth: isMobile ? "calc(100% - 48px)" : "62%",
      }}>
        <p className="slide-heading" style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          color: "var(--text2)",
          letterSpacing: "0.15em",
          marginBottom: 20,
          textTransform: "uppercase",
        }}>
          PUNE · INDIA · FULL STACK DEVELOPER
        </p>

        <div className="slide-heading">
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(72px, 12vw, 160px)",
            lineHeight: 0.92,
            color: "var(--text)",
            letterSpacing: "0.01em",
          }}>
            <div>FROM IDEA</div>
            <div>
              TO{" "}
              <span style={{ color: accent, fontStyle: "italic" }}>LIVE</span>
              {" "}IN
            </div>
            <div style={{ color: accent }}>DAYS.</div>
          </div>
        </div>

        <p className="slide-subtext" style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 300,
          fontSize: 15,
          color: "var(--text2)",
          lineHeight: 1.65,
          marginTop: 24,
          maxWidth: 400,
        }}>
          Building full-stack products with AI at the core.<br />
          Two live. Always shipping.
        </p>

        <div className="slide-cta" style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          marginTop: 32,
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}>
          <button
            className="btn-primary"
            onClick={() => {
              const snap = document.querySelector(".snap-container") as HTMLElement;
              const slides = snap?.querySelectorAll(".slide");
              slides?.[1]?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            VIEW WORK ↓
          </button>
          <a
            href="https://github.com/ParthGhumatkar"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color: "var(--text2)",
              letterSpacing: "0.1em",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text2)")}
          >
            GitHub ↗
          </a>
        </div>

        <div className="slide-cta" style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 20,
        }}>
          {[
            { name: "seoreport", url: "https://seoreport.parthghumatkar.com" },
            { name: "swatantra", url: "https://swatantra.parthghumatkar.com" },
            { name: "noctis",    url: "https://github.com/ParthGhumatkar/noctis" },
          ].map((p, i) => (
            <span key={p.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <span style={{ color: "var(--text3)", fontSize: 11 }}>·</span>}
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, display: "inline-block" }} />
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  color: "var(--text2)",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = accent)}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text2)")}
              >
                {p.name}
              </a>
            </span>
          ))}
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 9,
            color: "var(--text2)",
            marginLeft: 4,
          }}>— all live</span>
        </div>
      </div>

      {/* Scroll indicator */}
      {!isMobile && (
        <div style={{
          position: "absolute",
          bottom: 40,
          right: 56,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 9,
            color: "var(--text2)",
            letterSpacing: "0.15em",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}>
            SCROLL TO EXPLORE
          </span>
          <div className="scroll-arrow" style={{ color: accent, fontSize: 14 }}>↓</div>
        </div>
      )}
    </div>
  );
};

export default Slide01_Hero;

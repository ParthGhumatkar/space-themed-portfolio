import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useIsMobile } from "../hooks/useIsMobile";

interface NavProps {
  activeSlide: number;
  totalSlides?: number;
}

const Nav = ({ activeSlide, totalSlides = 8 }: NavProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoHov,  setLogoHov]  = useState(false);
  const [displayNum, setDisplayNum] = useState(activeSlide);
  const { theme, toggle } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    setDisplayNum(activeSlide);
  }, [activeSlide]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const scrollToSlide = (idx: number) => {
    const snap = document.querySelector(".snap-container") as HTMLElement;
    if (!snap) return;
    const slides = snap.querySelectorAll(".slide");
    slides[idx]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const pad = (n: number) => String(n + 1).padStart(2, "0");
  const totalPad = String(totalSlides).padStart(2, "0");

  const accentColor = theme === "dark" ? "#2A6B4A" : "#7C6AF7";
  const accentBorder = theme === "dark" ? "rgba(42,107,74,0.3)" : "rgba(124,106,247,0.3)";
  const accentBg = theme === "dark" ? "rgba(42,107,74,0.06)" : "rgba(124,106,247,0.06)";

  const MENU_ITEMS = [
    { label: "Projects",  idx: 1 },
    { label: "Stack",     idx: 5 },
    { label: "About",     idx: 6 },
    { label: "Contact",   idx: 7 },
  ];

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 60,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 24px" : "0 48px",
        background: "transparent",
      }}>
        {/* Left: logo */}
        <button
          onClick={() => scrollToSlide(0)}
          onMouseEnter={() => setLogoHov(true)}
          onMouseLeave={() => setLogoHov(false)}
          aria-label="Home — scroll to top"
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none" }}
        >
          <span style={{
            display: "block", width: 8, height: 8,
            background: accentColor,
            flexShrink: 0,
            transform: logoHov ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          }} />
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 20, letterSpacing: "0.08em",
            color: "var(--text)",
          }}>PG</span>
        </button>

        {/* Centre: slide counter */}
        {!isMobile && (
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11, color: "var(--text2)",
            letterSpacing: "0.1em",
            overflow: "hidden",
            height: 16,
            display: "flex", alignItems: "center",
          }}>
            <span key={displayNum} style={{ display: "inline-block", animation: "countUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards" }}>
              {pad(displayNum)}
            </span>
            <span style={{ margin: "0 4px" }}>/</span>
            <span>{totalPad}</span>
          </div>
        )}

        {/* Right: theme toggle + OTW + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              width: 38, height: 22, borderRadius: 11,
              background: "var(--bg2)",
              border: `1px solid var(--border)`,
              position: "relative", flexShrink: 0,
              transition: "border-color 0.3s",
            }}
          >
            <span style={{
              position: "absolute", top: 3,
              left: theme === "dark" ? 3 : 19,
              width: 14, height: 14, borderRadius: "50%",
              background: accentColor,
              transition: "left 0.35s cubic-bezier(0.16,1,0.3,1)",
              display: "block",
            }} />
          </button>

          <div style={{
            display: "inline-flex", alignItems: "center",
            gap: isMobile ? 0 : 7,
            padding: isMobile ? "5px" : "5px 12px",
            border: `1px solid ${accentBorder}`,
            background: accentBg,
            borderRadius: 100,
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: accentColor,
              animation: "pulseDot 2s infinite",
              flexShrink: 0,
            }} />
            {!isMobile && (
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10, letterSpacing: "0.1em",
                color: accentColor, whiteSpace: "nowrap",
              }}>OPEN TO WORK</span>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ display: "flex", flexDirection: "column", gap: 5, background: "none", border: "none", padding: 4 }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 20, height: 1,
                background: "var(--text)",
                opacity: menuOpen && i === 1 ? 0 : 1,
                transition: "opacity 0.2s",
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div style={{
        position: "fixed", inset: 0,
        background: "var(--bg)", zIndex: 999,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: isMobile ? "80px 24px 40px" : "80px 56px 40px",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute", top: 20, right: 24,
            background: "none", border: "none",
            color: "var(--text)", fontSize: 24,
            padding: 4, minHeight: 44, minWidth: 44,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >✕</button>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {MENU_ITEMS.map((item, i) => (
            <button
              key={item.label}
              onClick={() => scrollToSlide(item.idx)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(40px,10vw,72px)",
                color: "var(--text)",
                background: "none", border: "none",
                textAlign: "left", padding: "6px 0",
                width: "100%",
                transform: menuOpen ? "translateX(0)" : "translateX(40px)",
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.4s ease ${i * 0.06}s, opacity 0.4s ease ${i * 0.06}s`,
              }}
            >{item.label}</button>
          ))}
        </div>

        <div style={{
          opacity: menuOpen ? 1 : 0,
          transition: "opacity 0.4s ease 0.28s",
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "var(--text2)", letterSpacing: "0.05em" }}>
            parthghumatkarofficial@gmail.com
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { l: "GitHub",   h: "https://github.com/ParthGhumatkar" },
              { l: "LinkedIn", h: "https://linkedin.com/in/parth-ghumatkar" },
              { l: "WhatsApp", h: "https://wa.me/919373956958" },
            ].map(s => (
              <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--text2)", textDecoration: "none", letterSpacing: "0.06em" }}>
                {s.l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;

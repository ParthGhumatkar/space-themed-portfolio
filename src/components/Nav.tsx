import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const LINKS = [
  { id: "about",   label: "About"   },
  { id: "work",    label: "Work"    },
  { id: "stack",   label: "Stack"   },
  { id: "contact", label: "Contact" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [togHov,   setTogHov]   = useState(false);
  const lastY = useRef(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > 100 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 64,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 52px",
        transition: "transform 0.45s ease, background 0.3s, border-color 0.3s",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        background: scrolled
          ? (theme === "dark" ? "rgba(8,8,8,0.88)" : "rgba(245,242,235,0.92)")
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}>
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 20,
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "0.08em",
            transition: "letter-spacing 0.3s ease",
            position: "relative",
            paddingBottom: 4,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.letterSpacing = "0.2em"; }}
          onMouseLeave={(e) => { e.currentTarget.style.letterSpacing = "0.08em"; }}
        >
          PG
          <span style={{
            position: "absolute", bottom: -1, left: 0,
            width: "100%", height: 1,
            background: "var(--green)",
            transformOrigin: "left",
          }} />
        </a>

        {/* Right: toggle + availability */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              position: "relative",
              width: 42, height: 24,
              borderRadius: 12,
              background: "var(--bg3)",
              border: `1px solid ${togHov ? "rgba(42,107,74,0.5)" : "var(--border)"}`,
              flexShrink: 0,
              transition: "border-color 0.3s",
            }}
            onMouseEnter={() => setTogHov(true)}
            onMouseLeave={() => setTogHov(false)}
          >
            <div style={{
              position: "absolute",
              top: 3,
              left: theme === "dark" ? 3 : 23,
              width: 16, height: 16,
              borderRadius: "50%",
              background: "var(--green)",
              transition: "left 0.35s cubic-bezier(0.16,1,0.3,1)",
            }} />
          </button>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            border: "1px solid rgba(42,107,74,0.3)",
            background: "rgba(42,107,74,0.06)",
            borderRadius: 100,
            transition: "border-color 0.2s, background 0.2s",
            cursor: "default",
          }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(42,107,74,0.6)";
              el.style.background = "rgba(42,107,74,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(42,107,74,0.3)";
              el.style.background = "rgba(42,107,74,0.06)";
            }}
          >
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "var(--green)",
              animation: "pulseDot 2s infinite",
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              color: "var(--green)",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}>
              OPEN TO WORK
            </span>
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "flex", flexDirection: "column", gap: 5, background: "none", border: "none", padding: 4 }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block",
              width: 22, height: 1,
              background: "var(--text)",
              transition: "opacity 0.2s",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div style={{
        position: "fixed", inset: 0,
        background: "var(--bg)",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 40px",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute", top: 24, right: 24,
            background: "none", border: "none",
            color: "var(--text)",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 14,
          }}
        >
          ✕
        </button>
        {LINKS.map((l, i) => (
          <button
            key={l.id}
            onClick={() => scrollTo(l.id)}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 56,
              color: "var(--text)",
              background: "none",
              border: "none",
              textAlign: "left",
              padding: "6px 0",
              transform: menuOpen ? "translateX(0)" : "translateX(40px)",
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.4s ease ${i * 0.06}s, opacity 0.4s ease ${i * 0.06}s`,
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Nav;

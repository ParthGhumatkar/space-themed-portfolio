import { useState, useRef, useEffect } from "react";

interface NavProps {
  current: number;
  total: number;
  goTo: (idx: number) => void;
}

const MENU_LINKS = [
  { num: "01", label: "The Beginning",    idx: 0 },
  { num: "02", label: "The Work",         idx: 1 },
  { num: "03", label: "The Craft",        idx: 2 },
  { num: "04", label: "The Next Chapter", idx: 3 },
];

const Nav = ({ current, total, goTo }: NavProps) => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [logoHov,  setLogoHov]    = useState(false);
  const [prevNum,  setPrevNum]    = useState(current);
  const [animKey,  setAnimKey]    = useState(0);
  const dirRef = useRef<"up" | "down">("down");

  useEffect(() => {
    if (current === prevNum) return;
    dirRef.current = current > prevNum ? "down" : "up";
    setAnimKey(k => k + 1);
    setPrevNum(current);
  }, [current, prevNum]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: 64, zIndex: 500,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px",
        background: "transparent",
        pointerEvents: "none",
      }}>
        {/* LEFT — Logo */}
        <button
          onClick={() => goTo(0)}
          onMouseEnter={() => setLogoHov(true)}
          onMouseLeave={() => setLogoHov(false)}
          aria-label="Go to top"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "none", border: "none",
            pointerEvents: "all",
          }}
        >
          <span style={{
            display: "block", width: 6, height: 6,
            background: "#C8A96E",
            flexShrink: 0,
            transform: logoHov ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }} />
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 18, letterSpacing: "0.15em",
            color: "#F5EDD8",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}>PG</span>
        </button>

        {/* RIGHT — Counter + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, pointerEvents: "all" }}>
          {/* Rolling counter */}
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11, color: "rgba(200,169,110,0.7)",
            letterSpacing: "0.08em",
            display: "flex", alignItems: "center", gap: 4,
            overflow: "hidden", height: 16,
            pointerEvents: "none",
          }}>
            <span
              key={animKey}
              className={dirRef.current === "down" ? "roll-up" : "roll-down"}
              style={{ display: "inline-block" }}
            >
              {pad(current)}
            </span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              display: "flex", flexDirection: "column", gap: 5,
              background: "none", border: "none",
              padding: 4,
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 1.5,
                background: "var(--text)",
                transformOrigin: "center",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                opacity: menuOpen && i === 1 ? 0 : 1,
                transform: menuOpen && i === 0 ? "translateY(6.5px) rotate(45deg)"
                         : menuOpen && i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                         : "none",
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Fullscreen menu */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 800,
        background: "rgba(10,26,10,0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "80px 56px",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }}>
        {/* Close */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute", top: 24, right: 48,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 20, color: "var(--text2)",
            background: "none", border: "none",
          }}
        >✕</button>

        {/* Links */}
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {menuOpen && MENU_LINKS.map((item) => (
            <a
              key={item.idx}
              href="#"
              className="menu-item"
              onClick={e => { e.preventDefault(); goTo(item.idx); setMenuOpen(false); }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(40px,6vw,72px)",
                fontWeight: 700,
                color: "var(--text2)",
                textDecoration: "none",
                display: "block",
                marginBottom: 4,
                transition: "color 0.25s, transform 0.25s",
                lineHeight: 1.15,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
                (e.currentTarget as HTMLElement).style.transform = "translateX(12px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text2)";
                (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
              }}
            >
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--gold)", marginRight: 16, fontStyle: "normal" }}>
                {item.num} —
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Bottom info */}
        <div style={{
          position: "absolute", bottom: 48, left: 56,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12, color: "var(--text2)",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <span>parthghumatkarofficial@gmail.com</span>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { l: "GitHub",   h: "https://github.com/ParthGhumatkar" },
              { l: "LinkedIn", h: "https://linkedin.com/in/parth-ghumatkar" },
              { l: "WhatsApp", h: "https://wa.me/919373956958" },
            ].map(s => (
              <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--text2)", textDecoration: "none" }}>
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

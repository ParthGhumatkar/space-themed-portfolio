import React, { useState, useRef, useEffect } from "react";

interface Props { isActive: boolean; goTo: (idx: number) => void; }

const PROJECTS = [
  { num: "01", name: "SEOREPORT", badge: "LIVE",        href: "https://seoreport.parthghumatkar.com" },
  { num: "02", name: "SWATANTRA", badge: "LIVE",        href: "https://swatantra.parthghumatkar.com" },
  { num: "03", name: "NOCTIS",    badge: "OPEN SOURCE", href: "https://github.com/ParthGhumatkar/noctis" },
];

const Slide02_Projects = ({ isActive }: Props) => {
  const [hov, setHov] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (isActive) {
      img.style.transition = "none";
      img.style.transform  = "scale(1.06)";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (imgRef.current) imgRef.current.className = "kb-active";
      }));
    } else {
      img.className = "";
      img.style.transform = "scale(1.06)";
    }
  }, [isActive]);

  const d = (ms: number): React.CSSProperties => ({ animationDelay: `${ms}ms`, animationFillMode: "both" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "var(--bg)" }}>

      {/* Layer 0 — Oil painting */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img ref={imgRef} src="/slides/slide-02.png" alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
      </div>

      {/* Layer 1 — Base dark */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(5,12,5,0.62)" }} />

      {/* Layer 2 — Left gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(to right, rgba(5,12,5,0.85) 0%, rgba(5,12,5,0.6) 45%, rgba(5,12,5,0.2) 70%, transparent 100%)",
      }} />

      {/* Layer 3 — Bottom gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(to top, rgba(5,12,5,0.9) 0%, rgba(5,12,5,0.4) 40%, transparent 70%)",
      }} />

      {/* Layer 4 — Content */}
      {isActive && (
        <div style={{ position: "absolute", inset: 0, zIndex: 4 }}>
          <div className="slide-two-col" style={{ display: "flex", height: "100%" }}>

            {/* LEFT */}
            <div className="slide-col" style={{ width: "50%", padding: "80px 48px 80px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p className="fade-up" style={{ ...d(0), fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--gold)", marginBottom: 20, textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                SELECTED WORK
              </p>
              <h2 className="fade-up" style={{ ...d(100), fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(40px,5.5vw,80px)", lineHeight: 0.9, color: "#F5EDD8", marginTop: 20, textShadow: "0 4px 24px rgba(0,0,0,0.9)" }}>
                Three Things<br />I've Actually<br />Shipped.
              </h2>
              <p className="fade-up" style={{ ...d(300), fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: 16, color: "rgba(245,237,216,0.88)", lineHeight: 1.7, marginTop: 20, maxWidth: 360, textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}>
                Not side projects. Not tutorials.<br />Real products, real users,<br />real problems solved.
              </p>
            </div>

            {/* RIGHT — frosted panel */}
            <div className="slide-col" style={{
              width: "50%", padding: "80px 56px 80px 0", display: "flex", flexDirection: "column", justifyContent: "center",
            }}>
              <div style={{
                background: "rgba(5,12,5,0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(200,169,110,0.12)",
                padding: "0 24px",
              }}>
              {PROJECTS.map((p, i) => (
                <a
                  key={p.num}
                  href={p.href}
                  target="_blank" rel="noopener noreferrer"
                  className="fade-up"
                  onMouseEnter={e => {
                    setHov(i);
                    (e.currentTarget as HTMLElement).style.transform = "translateX(8px)";
                    (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(200,169,110,0.4)";
                    const nameEl = (e.currentTarget as HTMLElement).querySelector(".proj-name") as HTMLElement;
                    if (nameEl) nameEl.style.color = "#C8A96E";
                  }}
                  onMouseLeave={e => {
                    setHov(null);
                    (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
                    (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--border)";
                    const nameEl = (e.currentTarget as HTMLElement).querySelector(".proj-name") as HTMLElement;
                    if (nameEl) nameEl.style.color = "#F5EDD8";
                  }}
                  style={{
                    ...d(i * 120),
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "28px 0",
                    borderBottom: "1px solid var(--border)",
                    textDecoration: "none",
                    transition: "transform 0.25s, border-color 0.25s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>
                      <span style={{ color: "var(--gold)" }}>{'{ '}</span>
                      <span style={{ color: "var(--text)" }}>{p.num}</span>
                      <span style={{ color: "var(--gold)" }}>{' }'}</span>
                    </span>
                    <span className="proj-name" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(28px,3.5vw,52px)", letterSpacing: "0.02em", color: "#F5EDD8", marginLeft: 16, textShadow: "0 2px 16px rgba(0,0,0,0.8)", transition: "color 0.25s" }}>
                      {p.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {p.badge === "LIVE" ? (
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "var(--gold)", border: "1px solid rgba(200,169,110,0.3)", padding: "3px 10px" }}>
                        ● LIVE
                      </span>
                    ) : (
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "var(--text2)", border: "1px solid rgba(200,169,110,0.2)", padding: "3px 10px" }}>
                        OPEN SOURCE
                      </span>
                    )}
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, color: hov === i ? "var(--gold)" : "var(--text3)", transition: "color 0.2s" }}>
                      →
                    </span>
                  </div>
                </a>
              ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Slide02_Projects;

import React, { useRef, useEffect } from "react";

interface Props { isActive: boolean; goTo: (idx: number) => void; }

const Slide01_Hero = ({ isActive, goTo }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (isActive) {
      img.style.transition = "none";
      img.style.transform  = "scale(1.06)";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (imgRef.current) {
            imgRef.current.className = "kb-active";
          }
        });
      });
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
        <img ref={imgRef} src="/slides/slide-01.png" alt=""
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

          {/* Bottom-left content */}
          <div className="slide-hero-content" style={{ position: "absolute", bottom: 64, left: 56, maxWidth: 600 }}>

            <p className="fade-up" style={{ ...d(200), fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--gold)", letterSpacing: "0.25em", marginBottom: 24, textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
              PUNE · INDIA · FULL STACK DEVELOPER
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Line 1 — whisper */}
              <span className="reveal-wrap">
                <span className="reveal-inner" style={{
                  animationDelay: "0.35s",
                  display: "block",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700, fontStyle: "italic",
                  fontSize: "clamp(56px,8vw,110px)",
                  lineHeight: 0.95, letterSpacing: "0.01em",
                  color: "rgba(245,237,216,0.65)",
                  textShadow: "0 4px 32px rgba(0,0,0,0.9)",
                }}>from idea</span>
              </span>
              {/* Line 2 — dominant */}
              <span className="reveal-wrap">
                <span className="reveal-inner" style={{
                  animationDelay: "0.5s",
                  display: "block",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: "clamp(80px,12vw,158px)",
                  lineHeight: 0.88, letterSpacing: "-0.01em",
                  color: "#F5EDD8",
                  textShadow: "0 4px 32px rgba(0,0,0,0.9)",
                }}>
                  to <em style={{ color: "#C8A96E", fontStyle: "italic" }}>live</em>
                </span>
              </span>
              {/* Line 3 — echo */}
              <span className="reveal-wrap">
                <span className="reveal-inner" style={{
                  animationDelay: "0.65s",
                  display: "block",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "clamp(56px,8vw,110px)",
                  lineHeight: 0.95, letterSpacing: "0em",
                  color: "#C8A96E",
                  textShadow: "0 4px 32px rgba(0,0,0,0.9)",
                }}>in days.</span>
              </span>
            </div>

            <p className="fade-up" style={{ ...d(800), fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: 16, color: "rgba(245,237,216,0.85)", maxWidth: 380, marginTop: 28, lineHeight: 1.75, textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>
              Building full-stack products with AI at the core. Two live. Always shipping.
            </p>

            <div className="fade-up" style={{ ...d(880), width: 40, height: 1, background: "var(--gold)", opacity: 0.5, margin: "24px 0" }} />

            <div className="fade-up" style={{ ...d(960), display: "flex", alignItems: "center", gap: 24 }}>
              <button
                onClick={() => goTo(1)}
                style={{
                  background: "var(--gold)",
                  border: "none",
                  color: "#0a1a0a",
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.15em",
                  padding: "14px 36px", borderRadius: 0,
                  transition: "background 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >VIEW WORK</button>
              <a
                href="https://github.com/ParthGhumatkar"
                target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: 14, color: "#C8A96E", textDecoration: "none", paddingBottom: 2, borderBottom: "1px solid rgba(200,169,110,0.4)", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderBottomColor = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.borderBottomColor = "rgba(200,169,110,0.4)")}
              >GitHub ↗</a>
            </div>
          </div>

          {/* Scroll indicator — bottom right */}
          <div className="slide-hero-scroll" style={{
            position: "absolute", bottom: 60, right: 56,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "var(--text2)",
              writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0.2em",
            }}>SCROLL</span>
            <span className="bounce" style={{ color: "var(--text2)", fontSize: 14 }}>↓</span>
          </div>

        </div>
      )}
    </div>
  );
};

export default Slide01_Hero;

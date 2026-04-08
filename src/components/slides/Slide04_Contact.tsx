import React, { useRef, useEffect } from "react";

interface Props { isActive: boolean; goTo: (idx: number) => void; }

const Slide04_Contact = ({ isActive }: Props) => {
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
        <img ref={imgRef} src="/slides/slide-04.png" alt=""
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

          {/* Content — bottom left */}
          <div className="slide-contact-content" style={{ position: "absolute", bottom: 72, left: 56 }}>

            <p className="fade-up" style={{ ...d(0), fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--gold)", marginBottom: 24, textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
              GET IN TOUCH
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Line 1 — whisper */}
              <span className="reveal-wrap">
                <span className="reveal-inner" style={{
                  animationDelay: "0.1s", display: "block",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700, fontStyle: "italic",
                  fontSize: "clamp(48px,7vw,100px)",
                  lineHeight: 0.9, letterSpacing: "0.01em",
                  color: "rgba(245,237,216,0.7)",
                  textShadow: "0 4px 32px rgba(0,0,0,0.9)",
                }}>let's build</span>
              </span>
              {/* Line 2 — dominant */}
              <span className="reveal-wrap">
                <span className="reveal-inner" style={{
                  animationDelay: "0.22s", display: "block",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: "clamp(64px,9vw,130px)",
                  lineHeight: 0.88, letterSpacing: "-0.01em",
                  color: "#F5EDD8",
                  textShadow: "0 4px 32px rgba(0,0,0,0.9)",
                }}>something</span>
              </span>
              {/* Line 3 — echo */}
              <span className="reveal-wrap">
                <span className="reveal-inner" style={{
                  animationDelay: "0.34s", display: "block",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "clamp(40px,5.5vw,80px)",
                  lineHeight: 0.95, letterSpacing: "0em",
                  color: "#C8A96E",
                  textShadow: "0 4px 32px rgba(0,0,0,0.9)",
                }}>that matters.</span>
              </span>
            </div>

            <a
              href="mailto:parthghumatkarofficial@gmail.com"
              className="fade-up"
              style={{
                ...d(500),
                display: "block", marginTop: 56,
                fontFamily: "'Manrope', sans-serif", fontWeight: 400,
                fontSize: "clamp(14px,1.8vw,20px)",
                color: "#F5EDD8", textDecoration: "none",
                textShadow: "0 2px 16px rgba(0,0,0,0.9)",
                paddingBottom: 8,
                borderBottom: "1px solid var(--border)",
                width: "fit-content",
                transition: "color 0.25s, border-color 0.25s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--gold2)";
                (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--gold)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "#F5EDD8";
                (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--border)";
              }}
            >
              parthghumatkarofficial@gmail.com
            </a>

            <div className="fade-up" style={{ ...d(640), marginTop: 40, display: "flex", gap: 28 }}>
              {[
                { label: "GitHub",   href: "https://github.com/ParthGhumatkar" },
                { label: "LinkedIn", href: "https://linkedin.com/in/parth-ghumatkar" },
                { label: "WhatsApp", href: "https://wa.me/919373956958" },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: 14,
                    color: "var(--text2)", textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text2)")}
                >
                  <span style={{ color: "var(--gold)", fontStyle: "normal" }}>/ </span>{s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="fade-up slide-footer" style={{
            ...d(760),
            position: "absolute", bottom: 24, left: 56, right: 56,
            display: "flex", justifyContent: "space-between",
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)",
          }}>
            <span>© 2025 PARTH GHUMATKAR</span>
            <span>PUNE, INDIA</span>
            <span>NEXT.JS · VERCEL · WINDSURF</span>
          </div>

        </div>
      )}
    </div>
  );
};

export default Slide04_Contact;

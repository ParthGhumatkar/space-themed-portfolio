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
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
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

          {/* Ghost background text */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 0,
          }}>
            <span style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(180px, 25vw, 360px)",
              fontWeight: 800,
              color: "rgba(200,169,110,0.03)",
              letterSpacing: "-0.04em",
              userSelect: "none",
            }}>CONTACT</span>
          </div>

          {/* Main centered content */}
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}>

            {/* Headline */}
            <h1 className="fade-up" style={{
              ...d(100),
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(56px, 8vw, 120px)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#F5EDD8",
              textAlign: "center",
              textShadow: "0 8px 40px rgba(0,0,0,0.8)",
              margin: 0,
              marginBottom: 48,
            }}>
              START A<br/>PROJECT
            </h1>

            {/* Floating email link */}
            <a
              href="mailto:parthghumatkarofficial@gmail.com"
              className="fade-up"
              style={{
                ...d(300),
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "18px 32px",
                background: "rgba(200,169,110,0.08)",
                border: "1px solid rgba(200,169,110,0.25)",
                borderRadius: 2,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 13,
                letterSpacing: "0.05em",
                color: "#F5EDD8",
                textDecoration: "none",
                transition: "all 0.4s ease",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(200,169,110,0.15)";
                el.style.borderColor = "rgba(200,169,110,0.6)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 40px rgba(200,169,110,0.15)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(200,169,110,0.08)";
                el.style.borderColor = "rgba(200,169,110,0.25)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
              }}
            >
              <span style={{ color: "var(--gold)" }}>✉</span>
              parthghumatkarofficial@gmail.com
            </a>

            {/* Social links */}
            <div className="fade-up" style={{
              ...d(450),
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 48,
            }}>
              {[
                { label: "GITHUB", href: "https://github.com/ParthGhumatkar" },
                { label: "LINKEDIN", href: "https://linkedin.com/in/parth-ghumatkar" },
                { label: "WHATSAPP", href: "https://wa.me/919373956958" },
              ].map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    color: "var(--text2)",
                    textDecoration: "none",
                    transition: "color 0.3s ease, gap 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--gold)";
                    el.style.gap = "12px";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--text2)";
                    el.style.gap = "8px";
                  }}
                >
                  {s.label}
                  <span style={{ opacity: 0.6 }}>→</span>
                </a>
              ))}
            </div>

            {/* Location tag */}
            <div className="fade-up" style={{
              ...d(550),
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'Geist Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.16em",
              color: "var(--text2)",
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--gold)",
                opacity: 0.7,
              }} />
              PUNE, INDIA
            </div>

          </div>

          {/* Footer line */}
          <div className="fade-up" style={{
            ...d(650),
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(to right, transparent, rgba(200,169,110,0.2), transparent)",
          }} />

        </div>
      )}
    </div>
  );
};

export default Slide04_Contact;

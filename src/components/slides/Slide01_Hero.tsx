import React, { useRef, useEffect } from "react";

interface Props { isActive: boolean; goTo: (idx: number) => void; }

const Slide01_Hero = ({ isActive, goTo }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);
  const fireflyRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const container = rippleContainerRef.current;
    if (!container) return;

    let lastRipple = 0;
    const THROTTLE = 60;

    const spawnRipple = (x: number, y: number) => {
      const now = Date.now();
      if (now - lastRipple < THROTTLE) return;
      lastRipple = now;

      const rect = container.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;

      const rings = [
        { size: 8,  delay: 0,   duration: 600,  opacity: 0.9  },
        { size: 22, delay: 60,  duration: 900,  opacity: 0.55 },
        { size: 42, delay: 140, duration: 1200, opacity: 0.3  },
        { size: 68, delay: 240, duration: 1600, opacity: 0.15 },
      ];

      rings.forEach(({ size, delay, duration, opacity }) => {
        const borderWidth = size < 20 ? '1.5px' : size < 50 ? '1px' : '0.5px';
        const ring = document.createElement('div');
        ring.style.cssText = `
          position: absolute;
          left: ${relX}px;
          top: ${relY}px;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: ${borderWidth} solid rgba(200, 169, 110, ${opacity});
          transform: translate(-50%, -50%) scale(0);
          pointer-events: none;
          animation: ripple-expand ${duration}ms cubic-bezier(0.2, 0.8, 0.4, 1) ${delay}ms forwards;
        `;
        container.appendChild(ring);
        setTimeout(() => ring.remove(), duration + delay + 100);
      });
    };

    const onMouseMove = (e: MouseEvent) => spawnRipple(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => spawnRipple(e.touches[0].clientX, e.touches[0].clientY);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [isActive]);

  useEffect(() => {
    const container = fireflyRef.current;
    if (!container) return;

    const FIREFLY_COUNT = 38;

    const colors = [
      'rgba(220, 190, 120, 1)',
      'rgba(200, 169, 110, 1)',
      'rgba(140, 220, 160, 1)',
      'rgba(180, 240, 190, 1)',
      'rgba(255, 245, 200, 1)',
    ];

    for (let i = 0; i < FIREFLY_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'firefly';

      const size = 2.5 + Math.random() * 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const driftX = (Math.random() - 0.5) * 120;
      const driftY = -40 - Math.random() * 120;
      const duration = 6 + Math.random() * 10;
      const glowDuration = 2 + Math.random() * 3;
      const delay = -(Math.random() * duration);

      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${startX}%;
        top: ${startY}%;
        --fc: ${color};
        --fx: ${driftX}px;
        --fy: ${driftY}px;
        --fd: ${duration}s;
        --fg: ${glowDuration}s;
        --fdelay: ${delay}s;
        background: ${color};
        box-shadow: 0 0 ${size * 4}px ${size * 2}px ${color};
      `;
      container.appendChild(el);
    }

    return () => {
      while (container.firstChild) container.removeChild(container.firstChild);
    };
  }, []);

  const d = (ms: number): React.CSSProperties => ({ animationDelay: `${ms}ms`, animationFillMode: "both" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "var(--bg)" }}>

      {/* Layer 0 — Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img ref={imgRef} src="/slides/slide-01.png" alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            transform: "scale(1.06)",
          }} />
      </div>

      {/* Layer 5 — Ripple container (top) */}
      <div
        ref={rippleContainerRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 7,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />

      {/* Layer 1 — Firefly particles */}
      <div
        ref={fireflyRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />

      {/* Layer 2 — Base dark */}
      <div style={{ position: "absolute", inset: 0, zIndex: 3, background: "rgba(5,12,5,0.45)" }} />

      {/* Layer 3 — Left gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4,
        background: "linear-gradient(to right, rgba(3,9,3,0.88) 0%, rgba(5,12,5,0.65) 50%, rgba(5,12,5,0.15) 75%, transparent 100%)",
      }} />

      {/* Layer 4 — Bottom gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 5,
        background: "linear-gradient(to top, rgba(3,9,3,0.85) 0%, rgba(5,12,5,0.5) 35%, rgba(5,12,5,0.2) 60%, transparent 80%)",
      }} />

      {/* Layer 5 — Content */}
      {isActive && (
        <div style={{ position: "absolute", inset: 0, zIndex: 6 }}>

          {/* Bottom-left content */}
          <div className="slide-hero-content" style={{ position: "absolute", top: "clamp(5rem, 10vh, 7rem)", left: "clamp(2rem, 4vw, 4rem)", maxWidth: "55vw" }}>

            <p className="fade-up" style={{ ...d(200), fontFamily: "'Syne Mono', monospace", fontSize: 10, color: "var(--gold)", letterSpacing: "0.25em", marginBottom: 24, textShadow: "0 2px 16px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.9)", animation: "headline-breathe 7s ease-in-out 1s infinite", transformOrigin: "left center" }}>
              PUNE · INDIA · FULL STACK DEVELOPER
            </p>

            <div style={{ display: "flex", flexDirection: "column", overflow: "visible" }}>
              {/* Line 1 — whisper */}
              <span className="reveal-wrap">
                <span className="reveal-inner" style={{
                  animationDelay: "0.35s",
                  display: "block",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(4.5rem, min(9vw, 13vh), 9rem)",
                  lineHeight: 0.88, letterSpacing: "0.01em",
                  color: "rgba(245,237,216,0.65)",
                  textShadow: "0 4px 40px rgba(0,0,0,0.98), 0 0 80px rgba(0,0,0,0.7)",
                  animation: "headline-breathe 5s ease-in-out 1.6s infinite",
                  transformOrigin: "left center",
                  paddingRight: "0.1em",
                  paddingLeft: "0.02em",
                }}>from idea</span>
              </span>
              {/* Line 2 — dominant */}
              <span className="reveal-wrap">
                <span className="reveal-inner" style={{
                  animationDelay: "0.5s",
                  display: "block",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(7rem, min(14vw, 20vh), 14rem)",
                  lineHeight: 0.88, letterSpacing: "-0.01em",
                  color: "#F5EDD8",
                  textShadow: "0 4px 40px rgba(0,0,0,0.98), 0 0 80px rgba(0,0,0,0.7)",
                  animation: "headline-breathe-accent 5s ease-in-out 2s infinite",
                  transformOrigin: "left center",
                  paddingRight: "0.1em",
                  paddingLeft: "0.02em",
                }}>
                  to <em style={{ color: "#C8A96E", fontStyle: "italic" }}>live</em>
                </span>
              </span>
              {/* Line 3 — echo */}
              <span className="reveal-wrap">
                <span className="reveal-inner" style={{
                  animationDelay: "0.65s",
                  display: "block",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(4.5rem, min(9vw, 13vh), 9rem)",
                  lineHeight: 0.88, letterSpacing: "0em",
                  color: "#C8A96E",
                  textShadow: "0 4px 40px rgba(0,0,0,0.98), 0 0 80px rgba(0,0,0,0.7)",
                  animation: "headline-breathe 5s ease-in-out 2.4s infinite",
                  transformOrigin: "left center",
                  paddingRight: "0.1em",
                  paddingLeft: "0.02em",
                }}>in days.</span>
              </span>
            </div>

            <p className="fade-up" style={{ ...d(800), fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(0.85rem, 1.3vh, 1rem)", color: "rgba(245,237,216,0.75)", maxWidth: 380, marginTop: "clamp(1.5rem, 3vh, 2.5rem)", lineHeight: 1.8, letterSpacing: "0.02em", textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8)" }}>
              Building full-stack products with AI at the core. Two live. Always shipping.
            </p>

            <div className="fade-up" style={{ ...d(880), width: "3rem", height: "1px", background: "linear-gradient(to right, #C8A96E, transparent)", opacity: 0.8, margin: "clamp(1rem, 2vh, 1.5rem) 0" }} />

            <div className="fade-up" style={{ ...d(960), display: "flex", alignItems: "center", gap: 24 }}>
              <button
                onClick={() => goTo(1)}
                style={{
                  position: "relative",
                  background: "transparent",
                  border: "1px solid rgba(200,169,110,0.6)",
                  color: "#C8A96E",
                  fontFamily: "'Syne Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  padding: "16px 44px",
                  borderRadius: 0,
                  cursor: "pointer",
                  overflow: "hidden",
                  transition: "color 0.4s ease, border-color 0.4s ease, background 0.4s ease, transform 0.2s ease",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#C8A96E"; el.style.color = "#0a1a0a"; el.style.borderColor = "#C8A96E"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#C8A96E"; el.style.borderColor = "rgba(200,169,110,0.6)"; el.style.transform = "translateY(0)"; }}
              >VIEW WORK</button>
              <a
                href="https://github.com/ParthGhumatkar"
                target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'Syne Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "rgba(245,237,216,0.6)", textDecoration: "none", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "8px", transition: "color 0.3s ease, gap 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#C8A96E"; e.currentTarget.style.gap = "14px"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(245,237,216,0.6)"; e.currentTarget.style.gap = "8px"; }}
              >GITHUB <span style={{ fontSize: 16 }}>↗</span></a>
            </div>
          </div>

          {/* Stat counters — bottom right */}
          <div style={{
            position: "absolute",
            right: "clamp(3rem, 6vw, 7rem)",
            bottom: "clamp(3rem, 8vh, 6rem)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.5rem, 3vh, 2.5rem)",
            alignItems: "flex-end",
          }}>
            {[
              { number: "2", label: "Live products" },
              { number: "3+", label: "Years building" },
              { number: "∞", label: "Lines shipped" },
            ].map((stat, i) => (
              <div
                key={i}
                className="fade-up"
                style={{
                  animationDelay: `${1000 + i * 120}ms`,
                  animationFillMode: "both",
                  textAlign: "right",
                }}
              >
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  lineHeight: 1,
                  color: "#C8A96E",
                  letterSpacing: "-0.02em",
                }}>{stat.number}</div>
                <div style={{
                  fontFamily: "'Syne Mono', monospace",
                  fontSize: "clamp(0.55rem, 0.7vw, 0.65rem)",
                  letterSpacing: "0.2em",
                  color: "rgba(245,237,216,0.45)",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator — bottom center */}
          <div className="slide-hero-scroll" style={{
            position: "absolute", bottom: "clamp(1.5rem, 4vh, 3.5rem)", left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          }}>
            <span style={{
              fontFamily: "'Syne Mono', monospace", fontSize: 9, color: "var(--text2)",
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

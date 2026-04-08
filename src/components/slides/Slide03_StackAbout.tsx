import React, { useRef, useEffect } from "react";

interface Props { isActive: boolean; goTo: (idx: number) => void; }

const PILLS_ROW1 = ["Next.js", "TypeScript", "Neon", "Vercel", "OpenAI", "Tailwind", "Next.js", "TypeScript", "Neon", "Vercel", "OpenAI", "Tailwind"];
const PILLS_ROW2 = ["Python", "Ollama", "Claude AI", "GitHub", "Windsurf", "Docker", "REST APIs", "Groq", "Python", "Ollama", "Claude AI", "GitHub", "Windsurf", "Docker", "REST APIs", "Groq"];

const FACTS = [
  { k: "BASED IN",  v: "Pune, Maharashtra 🇮🇳" },
  { k: "STACK",     v: "Next.js · TypeScript · Neon" },
  { k: "AI TOOLS",  v: "GPT-4 · Ollama · Groq" },
  { k: "IDE",       v: "Windsurf + Cursor" },
  { k: "OPEN TO",   v: "Freelance & Collabs" },
];

const Slide03_StackAbout = ({ isActive }: Props) => {
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
        <img ref={imgRef} src="/slides/slide-03.png" alt=""
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
        <div className="slide-two-col" style={{
          display: "flex", height: "100%",
        }}>
          {/* LEFT — Stack */}
          <div className="slide-col" style={{
            width: "50%",
            padding: "80px 48px 80px 56px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            borderRight: "1px solid var(--border)",
            overflow: "hidden",
          }}>
            <p className="fade-up" style={{ ...d(0), fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--gold)", marginBottom: 16, textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
              THE STACK
            </p>
            <h2 className="fade-up" style={{ ...d(80), fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(40px,5.5vw,72px)", letterSpacing: "0.01em", color: "#F5EDD8", marginBottom: 40, textShadow: "0 4px 24px rgba(0,0,0,0.9)" }}>
              The Stack
            </h2>

            <div className="fade-up" style={{ ...d(200), overflow: "hidden" }}>
              {/* Row 1 — scrolls left */}
              <div style={{ overflow: "hidden", marginBottom: 4 }}>
                <div className="pills-left">
                  {PILLS_ROW1.map((pill, i) => (
                    <span key={i}
                      style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "10px 18px", margin: "4px",
                        border: "1px solid rgba(200,169,110,0.2)",
                        background: "rgba(200,169,110,0.08)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        whiteSpace: "nowrap",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 10, color: "#F5EDD8",
                        transition: "border-color 0.2s, background 0.2s, color 0.2s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C8A96E"; (e.currentTarget as HTMLElement).style.background = "rgba(200,169,110,0.15)"; (e.currentTarget as HTMLElement).style.color = "#C8A96E"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,110,0.2)"; (e.currentTarget as HTMLElement).style.background = "rgba(200,169,110,0.08)"; (e.currentTarget as HTMLElement).style.color = "#F5EDD8"; }}
                    >{pill}</span>
                  ))}
                </div>
              </div>

              {/* Row 2 — scrolls right */}
              <div className="pills-row2-hide" style={{ overflow: "hidden" }}>
                <div className="pills-right">
                  {PILLS_ROW2.map((pill, i) => (
                    <span key={i}
                      style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "10px 18px", margin: "4px",
                        border: "1px solid rgba(200,169,110,0.2)",
                        background: "rgba(200,169,110,0.08)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        whiteSpace: "nowrap",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 10, color: "#F5EDD8",
                        transition: "border-color 0.2s, background 0.2s, color 0.2s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C8A96E"; (e.currentTarget as HTMLElement).style.background = "rgba(200,169,110,0.15)"; (e.currentTarget as HTMLElement).style.color = "#C8A96E"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,110,0.2)"; (e.currentTarget as HTMLElement).style.background = "rgba(200,169,110,0.08)"; (e.currentTarget as HTMLElement).style.color = "#F5EDD8"; }}
                    >{pill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — About */}
          <div className="slide-col" style={{
            width: "50%",
            padding: "80px 56px 80px 48px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            overflow: "hidden",
          }}>
            <p className="fade-up" style={{ ...d(0), fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--gold)", marginBottom: 24, textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
              ABOUT THE ARTIST
            </p>

            <p className="fade-up" style={{ ...d(100), fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: 20, color: "rgba(245,237,216,0.88)", lineHeight: 1.5, maxWidth: 480, marginTop: 24, textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}>
              I wrote my first line of code at 11. Been shipping ever since.
            </p>

            <p className="fade-up" style={{ ...d(220), fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: 15, color: "rgba(245,237,216,0.88)", lineHeight: 1.85, maxWidth: 480, marginTop: 20, textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}>
              Building seoreport and Swatantra while leveraging AI across the full stack. From GPT-4 prompt engineering to local Ollama models. The stack doesn't scare me. Shipping doesn't either.
            </p>

            <div className="fade-up" style={{ ...d(340), marginTop: 28, paddingLeft: 20, borderLeft: "2px solid var(--gold)" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontStyle: "italic", fontSize: 18, color: "rgba(245,237,216,0.88)", textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}>
                "Shipping beats perfect."
              </p>
            </div>

            <div className="fade-up" style={{ ...d(440), marginTop: 32, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
              {FACTS.map((f, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border2)",
                }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)" }}>{f.k}</span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: 14, color: "var(--text)" }}>{f.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Slide03_StackAbout;

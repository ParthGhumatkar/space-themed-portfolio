import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import GalaxyCanvas from "./GalaxyCanvas";

const Hero = () => {
  const { theme } = useTheme();
  const logoColor = theme === "dark" ? "EDEAE0" : "0A0A0A";
  const [up, setUp] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setUp(true), 50);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number, targetOpacity = 1): React.CSSProperties => ({
    opacity: up ? targetOpacity : 0,
    transition: `opacity 0.5s ease ${delay}s`,
  });

  const slide = (delay: string): React.CSSProperties => ({
    display: "block",
    transform: up ? "translateY(0)" : "translateY(105%)",
    transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  return (
    <section id="hero" style={{ position: "relative", height: "100vh", minHeight: "100vh", background: "transparent", overflow: "hidden", margin: 0, padding: 0 }}>

      {/* Dot grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, var(--bg4) 1px, transparent 1px)", backgroundSize: "30px 30px", zIndex: 0, pointerEvents: "none", ...fade(0, 0.8) }} />

      {/* Galaxy canvas — full-bleed background */}
      <GalaxyCanvas />

      {/* Green glow — left atmosphere */}
      <div style={{ position: "absolute", left: "8%", top: "28%", width: 480, height: 340, background: "radial-gradient(ellipse, rgba(42,107,74,0.045) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />

      {/* PUNE · INDIA label */}
      <div style={{ position: "absolute", top: 84, left: 56, zIndex: 3, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)", letterSpacing: "0.25em", textTransform: "uppercase" as const, ...fade(0.35, 0.5) }}>
        PUNE · INDIA · EST. 2011
      </div>

      {/* Top-right logos */}
      <div className="hidden md:flex" style={{ position: "absolute", top: 84, right: 56, zIndex: 3, alignItems: "center", gap: 16, ...fade(0.5, 0.2) }}>
        <img src={`https://cdn.simpleicons.org/nextdotjs/${logoColor}`} alt="Next.js" style={{ height: 18 }} loading="lazy" decoding="async" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        <img src={`https://cdn.simpleicons.org/typescript/${logoColor}`} alt="TypeScript" style={{ height: 18 }} loading="lazy" decoding="async" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
      </div>

      {/* FULL STACK DEVELOPER — vertical */}
      <span className="hidden md:block" style={{ position: "absolute", bottom: 56, right: 56, zIndex: 3, fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "var(--text3)", writingMode: "vertical-rl" as const, transform: "rotate(180deg)", letterSpacing: "0.2em", textTransform: "uppercase" as const, ...fade(1.45, 0.35) }}>
        FULL STACK DEVELOPER
      </span>

      {/* Main content */}
      <div style={{ position: "absolute", bottom: 64, left: 56, zIndex: 2, maxWidth: 520 }}>

        {/* Headline */}
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(88px,12.5vw,158px)", lineHeight: 0.88, letterSpacing: "-0.5px" }}>
          <div style={{ overflow: "hidden" }}>
            <span style={{ ...slide("0.45s"), color: "var(--text)" }}>FROM IDEA</span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <span style={{ ...slide("0.6s"), color: "var(--text)" }}>
              TO <em style={{ color: "var(--green)", fontStyle: "italic" }}>LIVE</em> IN
            </span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <span style={{ ...slide("0.75s"), color: "var(--green)" }}>DAYS.</span>
          </div>
        </div>

        {/* Subtext */}
        <p style={{ marginTop: 28, fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: 15, color: "var(--text2)", maxWidth: 340, lineHeight: 1.78, opacity: up ? 1 : 0, transform: up ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.5s ease 1.2s, transform 0.5s ease 1.2s" }}>
          Building full-stack products with AI at the core. Two live. Always shipping.
        </p>

        {/* Separator */}
        <span style={{ display: "block", width: 40, height: 1, background: "rgba(42,107,74,0.4)", margin: "22px 0", opacity: up ? 1 : 0, transition: "opacity 0.5s ease 1.28s" }} />

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, opacity: up ? 1 : 0, transform: up ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.5s ease 1.35s, transform 0.5s ease 1.35s" }}>
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.12em", background: "var(--green)", color: "var(--bg)", border: "none", padding: "13px 28px", borderRadius: 0, transition: "background 0.2s, transform 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--green2)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            VIEW WORK ↓
          </button>
          <a
            href="https://github.com/ParthGhumatkar"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: "var(--text2)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text2)"; }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, opacity: up ? 1 : 0, transition: "opacity 0.5s ease 1.5s" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", flexShrink: 0 }} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)", letterSpacing: "0.1em" }}>
            seoreport · swatantra · noctis — all live
          </span>
        </div>
      </div>

      {/* Scroll indicator — vertical drip, centered */}
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 4, ...fade(1.6) }}>
        <div style={{ width: 1, height: 48, background: "var(--text3)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 3, height: 3, borderRadius: "50%", background: "var(--green)", left: -1, animation: "drip 1.8s ease-in-out infinite" }} />
        </div>
      </div>

    </section>
  );
};

export default Hero;

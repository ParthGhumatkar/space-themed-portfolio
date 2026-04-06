import { useEffect, useState, useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useIsMobile } from "../../hooks/useIsMobile";

interface Props { isActive: boolean; isCurrent?: boolean; }

const STATS = [
  { num: 2,    suffix: "",  label: "LIVE PRODUCTS" },
  { num: 11,   suffix: "",  label: "YEARS SINCE FIRST LINE" },
  { num: 3,    suffix: "+", label: "YEARS SHIPPING" },
  { num: "∞",  suffix: "",  label: "IDEAS TO BUILD" },
];

function useCountUp(target: number, isActive: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!isActive || typeof target !== "number") return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [isActive, target, duration]);

  return val;
}

const StatItem = ({ stat, isActive, delay }: { stat: typeof STATS[0]; isActive: boolean; delay: number }) => {
  const counted = useCountUp(typeof stat.num === "number" ? stat.num : 0, isActive);

  return (
    <div className="stat-item" style={{
      padding: "28px 0",
      borderBottom: "1px solid var(--border)",
      transitionDelay: `${delay}s`,
    }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(56px, 8vw, 100px)",
        lineHeight: 1,
        color: "var(--text)",
        letterSpacing: "0.01em",
      }}>
        {typeof stat.num === "number" ? counted : stat.num}
        {stat.suffix}
      </div>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11, letterSpacing: "0.12em",
        color: "var(--text2)", marginTop: 4,
      }}>{stat.label}</div>
    </div>
  );
};

const Slide07_About = ({ isActive, isCurrent = false }: Props) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const accent = theme === "dark" ? "#2A6B4A" : "#7C6AF7";
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    if (isCurrent) {
      imgRef.current.style.transition = 'transform 10s ease-out';
      imgRef.current.style.transform = 'scale(1.0)';
    } else {
      imgRef.current.style.transition = 'none';
      imgRef.current.style.transform = isMobile ? 'scale(1.03)' : 'scale(1.08)';
    }
  }, [isCurrent, isMobile]);

  const FACTS = [
    { label: "BASED IN", value: "Pune, India 🇮🇳" },
    { label: "STACK",    value: "Next.js · TypeScript · Neon" },
    { label: "OPEN TO",  value: "Freelance & Collabs" },
    { label: "COLLAB",   value: "Rakshit" },
  ];

  return (
    <div className={`slide${isActive ? " slide-active" : ""}`}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <img
          ref={imgRef}
          src="/slides/slide-07.png"
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
            transform: 'scale(1.08)',
            willChange: 'transform',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,12,8,0.4) 0%, rgba(5,12,8,0.72) 100%)',
        }} />
      </div>

      <div style={{
        position: "absolute", inset: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "stretch",
      }}>
        {/* LEFT — stats */}
        <div style={{
          width: isMobile ? "100%" : "50%",
          padding: isMobile ? "80px 24px 32px" : "80px 48px 80px 56px",
          display: "flex", flexDirection: "column", justifyContent: "center",
          borderRight: isMobile ? "none" : "1px solid var(--border)",
        }}>
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} isActive={isActive} delay={i * 0.1} />
          ))}
        </div>

        {/* RIGHT — text */}
        <div style={{
          width: isMobile ? "100%" : "50%",
          padding: isMobile ? "32px 24px 64px" : "80px 56px 80px 48px",
          display: "flex", flexDirection: "column", justifyContent: "center",
          overflowY: "auto",
        }}>
          <p className="slide-heading" style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, letterSpacing: "0.15em",
            color: "var(--text2)", textTransform: "uppercase",
            marginBottom: 24,
          }}>ABOUT</p>

          <p className="slide-heading" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(20px, 2.2vw, 26px)",
            color: "var(--text)", lineHeight: 1.45,
            marginBottom: 24,
          }}>
            "I wrote my first line of code at 11.<br />
            Been shipping ever since."
          </p>

          <p className="slide-subtext" style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300, fontSize: 15,
            color: "var(--text2)", lineHeight: 1.7,
            marginBottom: 20,
          }}>
            I build full-stack SaaS products that solve real problems —
            seoreport and Swatantra are both live, both used. I leverage
            AI across the full stack, from GPT-4 prompt engineering to
            local Ollama models.
          </p>

          <p className="slide-subtext" style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300, fontSize: 15,
            color: "var(--text2)", lineHeight: 1.7,
            marginBottom: 32,
          }}>
            I care about the whole stack. Schema design, API architecture,
            the last hover state. Shipping beats perfect.
          </p>

          <div className="slide-subtext" style={{
            borderLeft: `2px solid ${accent}`,
            paddingLeft: 20,
            marginBottom: 36,
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic", fontSize: 18,
              color: "var(--text2)", lineHeight: 1.5,
            }}>
              "Shipping beats perfect."
            </p>
          </div>

          <div className="slide-cta">
            {FACTS.map(f => (
              <div key={f.label} style={{
                display: "flex", gap: 16, marginBottom: 10,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11, lineHeight: 1.5,
              }}>
                <span style={{ color: "var(--text2)", letterSpacing: "0.1em", minWidth: 80, flexShrink: 0 }}>
                  {f.label}
                </span>
                <span style={{ color: "var(--text2)" }}>·</span>
                <span style={{ color: "var(--text)", letterSpacing: "0.04em" }}>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide07_About;

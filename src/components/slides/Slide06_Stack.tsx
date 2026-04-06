import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useIsMobile } from "../../hooks/useIsMobile";

interface Props { isActive: boolean; isCurrent?: boolean; }

const STACK = [
  { name: "Next.js",       sub: "App Router",    icon: "https://cdn.simpleicons.org/nextdotjs/EDEAE0" },
  { name: "TypeScript",    sub: "Typed always",  icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Neon",          sub: "PostgreSQL",    icon: "https://cdn.simpleicons.org/neon/00E599" },
  { name: "Vercel",        sub: "Deploy",        icon: "https://cdn.simpleicons.org/vercel/EDEAE0" },
  { name: "OpenAI",        sub: "GPT-4 Turbo",   icon: "https://cdn.simpleicons.org/openai/EDEAE0" },
  { name: "Tailwind CSS",  sub: "Utility-first", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Python",        sub: "3.13",          icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Ollama",        sub: "Local AI",      icon: "https://cdn.simpleicons.org/ollama/EDEAE0" },
  { name: "Claude AI",     sub: "Anthropic",     icon: "https://cdn.simpleicons.org/anthropic/EDEAE0" },
  { name: "GitHub",        sub: "Version ctrl",  icon: "https://cdn.simpleicons.org/github/EDEAE0" },
  { name: "Windsurf",      sub: "AI IDE",        icon: "https://cdn.simpleicons.org/codeium/09B6A2" },
  { name: "Docker",        sub: "Containers",    icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "REST APIs",     sub: "Architect",     icon: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "Groq",          sub: "Fast inf.",     icon: "https://cdn.simpleicons.org/groq/F55036" },
];

const Pill = ({ item, accent }: { item: typeof STACK[0]; accent: string }) => {
  const [hov, setHov] = useState(false);
  const accentBg = accent === "#2A6B4A"
    ? "rgba(42,107,74,0.06)"
    : "rgba(124,106,247,0.1)";
  const accentBorder = accent === "#2A6B4A"
    ? "rgba(42,107,74,0.3)"
    : "rgba(124,106,247,0.25)";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 24px",
        border: `1px solid ${hov ? accent : "var(--border)"}`,
        background: hov ? accentBg : "rgba(255,255,255,0.02)",
        whiteSpace: "nowrap",
        flexShrink: 0,
        marginRight: 12,
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s ease",
      }}
    >
      <img
        src={item.icon}
        alt={item.name}
        width={24} height={24}
        loading="lazy"
        style={{ opacity: hov ? 1 : 0.6, transition: "opacity 0.25s" }}
        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <div>
        <div style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 500, fontSize: 14, color: "var(--text)",
        }}>{item.name}</div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10, color: "var(--text2)", letterSpacing: "0.06em",
        }}>{item.sub}</div>
      </div>
    </div>
  );
};

const Slide06_Stack = ({ isActive, isCurrent = false }: Props) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const accent = theme === "dark" ? "#2A6B4A" : "#7C6AF7";
  const doubled = [...STACK, ...STACK];
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

  return (
    <div className={`slide${isActive ? " slide-active" : ""}`}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <img
          ref={imgRef}
          src="/slides/slide-06.png"
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            transform: 'scale(1.08)',
            willChange: 'transform',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,8,20,0.4) 0%, rgba(5,8,20,0.72) 100%)',
        }} />
      </div>

      <div style={{
        position: "absolute", inset: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        {/* Top section — heading */}
        <div style={{
          padding: isMobile ? "24px 24px 40px" : "32px 56px 48px",
          flexShrink: 0,
        }}>
          <p className="slide-heading" style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, letterSpacing: "0.15em",
            color: "var(--text2)", textTransform: "uppercase",
            marginBottom: 16,
          }}>TOOLS &amp; TECHNOLOGIES</p>

          <h2 className="slide-heading" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(52px, 8vw, 96px)",
            lineHeight: 0.9, color: "var(--text)",
            marginBottom: 16,
          }}>THE STACK</h2>

          <p className="slide-subtext" style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300, fontSize: 15,
            color: "var(--text2)",
          }}>Tools I reach for without thinking.</p>
        </div>

        {/* Pills row */}
        <div style={{
          overflow: "hidden",
          width: "100%",
          flexShrink: 0,
          paddingTop: 8,
          paddingBottom: 8,
        }}>
          {isMobile ? (
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              padding: "0 24px",
            }}>
              {STACK.map(item => (
                <Pill key={item.name} item={item} accent={accent} />
              ))}
            </div>
          ) : (
            <div className="pills-track">
              {doubled.map((item, i) => (
                <Pill key={`${item.name}-${i}`} item={item} accent={accent} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slide06_Stack;

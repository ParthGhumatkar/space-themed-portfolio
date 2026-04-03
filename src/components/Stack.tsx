import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const CELLS = [
  { name: "Next.js",   icon: "nextdotjs",   sub: "App Router · TypeScript"  },
  { name: "Neon",      icon: "postgresql",  sub: "Serverless PostgreSQL"     },
  { name: "Vercel",    icon: "vercel",      sub: "Edge Deployment"           },
  { name: "OpenAI",    icon: "openai",      sub: "GPT-4 Turbo + mini"        },
  { name: "Claude AI", icon: "anthropic",   sub: "AI Development"            },
  { name: "Tailwind",  icon: "tailwindcss", sub: "Utility-first CSS"         },
  { name: "Python",    icon: "python",      sub: "Automation + AI"           },
  { name: "Ollama",    icon: "ollama",      sub: "Local LLMs \u2014 offline"  },
  { name: "ESP8266",   icon: "arduino",     sub: "IoT + Hardware"            },
];

const OpenAISVG = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text2)", opacity: 0.7 }}>
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.369 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.402-.681zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

const Cell = ({ c, delay, visible, logoColor, dataIcon }: { c: typeof CELLS[0]; delay: number; visible: boolean; logoColor: string; dataIcon: string }) => (
  <div
    className="stack-cell"
    data-icon={dataIcon}
    style={{
      background: "var(--bg2)",
      padding: "36px 28px",
      transitionDelay: visible ? `${delay}s` : "0s",
      ...(visible ? { opacity: 1, transform: "translateY(0)" } : {}),
    }}
  >
    {c.name === "OpenAI" ? (
      <OpenAISVG />
    ) : (
      <>
        <img
          src={`https://cdn.simpleicons.org/${c.icon}/${logoColor}`}
          alt={c.name}
          width="30"
          height="30"
          style={{ width: 30, height: 30, minWidth: 30, minHeight: 30, opacity: 0.7, transition: "opacity 0.25s" }}
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = "none";
            const fb = t.nextElementSibling as HTMLElement;
            if (fb) fb.style.display = "flex";
          }}
        />
        <span style={{
          display: "none", width: 30, height: 30,
          alignItems: "center", justifyContent: "center",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--text2)",
        }}>
          {c.name.slice(0, 2).toUpperCase()}
        </span>
      </>
    )}
    <div style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)", marginTop: 20 }}>
      {c.name}
    </div>
    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text2)", marginTop: 5 }}>
      {c.sub}
    </div>
  </div>
);

const Stack = () => {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  const { theme } = useTheme();
  const logoColor = theme === "dark" ? "EDEAE0" : "1a1a1a";

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stack" ref={ref} style={{ background: "var(--bg2)", padding: "140px 56px", borderTop: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 52 }}>
        <div style={{ width: 28, height: 1, background: "var(--text3)" }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>
          TOOLS &amp; STACK
        </span>
      </div>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(56px,8vw,96px)", lineHeight: 1, color: "var(--text)", marginBottom: 12 }}>
        THE STACK
      </h2>
      <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: 15, color: "var(--text2)", lineHeight: 1.82, marginBottom: 56 }}>
        Tools I reach for without thinking twice.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 1, background: "var(--bg3)" }}>
        {CELLS.map((c, i) => (
          <Cell key={c.name} c={c} delay={i * 0.045} visible={vis} logoColor={logoColor} dataIcon={c.icon} />
        ))}
      </div>
    </section>
  );
};

export default Stack;

import { useEffect, useRef, useState } from "react";

const FACTS = [
  { key: "BASED IN", val: "Pune, Maharashtra 🇮🇳"         },
  { key: "STACK",    val: "Next.js · TypeScript · Neon"  },
  { key: "DEPLOYS",  val: "Vercel"                       },
  { key: "AI TOOLS", val: "GPT-4 · Ollama · Groq"        },
  { key: "IDE",      val: "Windsurf + Cursor"             },
  { key: "COLLAB",   val: "Rakshit"                      },
  { key: "OPEN TO",  val: "Freelance & Collabs"          },
];

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className={`reveal${vis ? " revealed" : ""}`}
      style={{ background: "var(--bg)", padding: "160px 56px" }}
    >
      <div className="flex flex-col md:flex-row" style={{ gap: 72 }}>

        {/* LEFT — 55% */}
        <div style={{ flex: "0 0 55%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 52 }}>
            <div style={{ width: 28, height: 1, background: "var(--text3)" }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>ABOUT</span>
          </div>

          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: 22, color: "var(--text)", lineHeight: 1.65, letterSpacing: "0.008em", maxWidth: 500 }}>
            I wrote my first line of code at 11.
            Been shipping ever since.
          </p>

          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: 15, color: "var(--text2)", lineHeight: 1.82, letterSpacing: "0.008em", maxWidth: 500, marginTop: 28 }}>
            I build full-stack SaaS products that solve real problems —
            seoreport, an AI-powered SEO audit tool, and Swatantra,
            a booking platform for India's independent tradespeople.
            Both live. Both used.
          </p>

          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: 15, color: "var(--text2)", lineHeight: 1.82, letterSpacing: "0.008em", maxWidth: 500, marginTop: 16 }}>
            I leverage AI across the full stack —
            from GPT-4 prompt engineering to local Ollama models.
            The stack doesn't scare me. Shipping does not either.
          </p>

          <div style={{ paddingLeft: 20, borderLeft: "2px solid var(--green)", marginTop: 32 }}>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontStyle: "italic", fontSize: 16, color: "var(--text2)", lineHeight: 1.6 }}>
              Shipping beats perfect.
            </p>
          </div>

          <div style={{ height: 1, background: "var(--border)", marginTop: 40 }} />

          <div style={{ marginTop: 24 }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12, color: "var(--text2)" }}>
              {["Pune, India", "Next.js + Neon", "Vercel", "GPT-4 · Ollama"].map((item, i, arr) => (
                <span key={item}>{item}{i < arr.length - 1 && <span style={{ color: "var(--text3)", margin: "0 8px" }}>·</span>}</span>
              ))}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulseDot 2s infinite", flexShrink: 0 }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text2)", letterSpacing: "0.06em" }}>
              Available for freelance &amp; collabs
            </span>
          </div>
        </div>

        {/* RIGHT — 45% */}
        <div style={{ flex: 1 }}>
          {FACTS.map((f, i) => (
            <div key={f.key} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "18px 0",
              borderBottom: "1px solid var(--border)",
            }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)", letterSpacing: "0.12em" }}>
                {f.key}
              </span>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: 14, color: "var(--text)" }}>
                {f.val}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;

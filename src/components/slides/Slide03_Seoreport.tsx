import { useRef, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useIsMobile } from "../../hooks/useIsMobile";

interface Props { isActive: boolean; isCurrent?: boolean; }

const CODE_LINES = [
  [{ text: "export async function ", cls: "syn-keyword" }, { text: "generateReport", cls: "syn-fn" }, { text: "(" }],
  [{ text: "  url", cls: "syn-type" }, { text: ": " }, { text: "string" }],
  [{ text: ") {" }],
  [{ text: "  const snapshot = await ", cls: "syn-keyword" }, { text: "crawlPage", cls: "syn-fn" }, { text: "(url)" }],
  [],
  [{ text: "  const report = await openai.chat" }],
  [{ text: "    .completions.", cls: "syn-fn" }, { text: "create", cls: "syn-keyword" }, { text: "({" }],
  [{ text: "      model: " }, { text: "'gpt-4-turbo-preview'", cls: "syn-string" }, { text: "," }],
  [{ text: "      messages: [" }],
  [{ text: "        { role: " }, { text: "'system'", cls: "syn-string" }, { text: ", content: SEO_PROMPT }," }],
  [{ text: "        { role: " }, { text: "'user'", cls: "syn-string" }, { text: ", content: snapshot }" }],
  [{ text: "      ]," }],
  [{ text: "      response_format: { type: " }, { text: "'json_object'", cls: "syn-string" }, { text: " }" }],
  [{ text: "    })" }],
  [],
  [{ text: "  await db.", cls: "syn-keyword" }, { text: "insert", cls: "syn-fn" }, { text: "(reports)." }, { text: "values", cls: "syn-fn" }, { text: "({" }],
  [{ text: "    url, score: parsed.overall_score," }],
  [{ text: "    createdAt: " }, { text: "new ", cls: "syn-keyword" }, { text: "Date", cls: "syn-type" }, { text: "()" }],
  [{ text: "  })" }],
  [],
  [{ text: "  return", cls: "syn-keyword" }, { text: " parsed" }],
  [{ text: "}" }],
];

const Slide03_Seoreport = ({ isActive, isCurrent = false }: Props) => {
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

  return (
    <div className={`slide${isActive ? " slide-active" : ""}`}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <img
          ref={imgRef}
          src="/slides/slide-03.jpg"
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
          background: 'linear-gradient(to bottom, rgba(5,8,20,0.5) 0%, rgba(5,8,20,0.8) 100%)',
        }} />
      </div>

      <div style={{
        position: "absolute", inset: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
      }}>
        {/* LEFT — project info */}
        <div style={{
          width: isMobile ? "100%" : "50%",
          padding: isMobile ? "80px 24px 32px" : "80px 48px 80px 56px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div className="slide-heading" style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
          }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11, color: "var(--text2)", letterSpacing: "0.1em",
            }}>{"{ 01 }"}</span>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9, letterSpacing: "0.15em",
              color: accent,
              border: `1px solid ${accent}`,
              padding: "2px 8px",
            }}>LIVE</span>
          </div>

          <h2 className="slide-heading" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 9vw, 120px)",
            lineHeight: 0.9, color: "var(--text)",
            marginBottom: 16,
          }}>SEOREPORT</h2>

          <p className="slide-subtext" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontSize: 22,
            color: "var(--text)", lineHeight: 1.4,
            marginBottom: 20,
          }}>
            "AI-powered SEO auditing.<br />
            Drop a URL. Get the truth."
          </p>

          <p className="slide-subtext" style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300, fontSize: 14,
            color: "var(--text2)", lineHeight: 1.65,
            marginBottom: 20,
          }}>
            12-section structured report. GPT-4 Turbo + GPT-4o-mini routing.
            PDF export. Email gating. Admin dashboard.
          </p>

          <div className="slide-subtext" style={{
            display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28,
          }}>
            {["Next.js 14", "GPT-4 Turbo", "TypeScript", "Neon", "Vercel"].map(tag => (
              <span key={tag} style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10, letterSpacing: "0.08em",
                color: "var(--text2)",
                border: "1px solid var(--border)",
                padding: "3px 8px",
              }}>{tag}</span>
            ))}
          </div>

          <div className="slide-cta">
            <a
              href="https://seoreport.parthghumatkar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: "inline-flex", width: "fit-content" }}
            >
              Visit Site →
            </a>
          </div>
        </div>

        {/* RIGHT — code window (hidden on mobile) */}
        {!isMobile && (
          <div style={{
            width: "50%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "80px 56px 80px 0",
          }}>
            <div className="code-window slide-code" style={{ width: "90%", maxWidth: 520 }}>
              <div className="code-tab">
                <span className="code-dot" style={{ background: "#ff5f57" }} />
                <span className="code-dot" style={{ background: "#febc2e" }} />
                <span className="code-dot" style={{ background: "#28c840" }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#555", marginLeft: 8 }}>
                  generate-report.ts
                </span>
              </div>
              <div className="code-body">
                <div style={{ marginBottom: 12 }}>
                  <span className="syn-comment">// seoreport · AI report generation</span>
                </div>
                {CODE_LINES.map((line, i) => (
                  <div key={i} style={{ minHeight: "1.7em" }}>
                    {line.map((tok, j) => (
                      <span key={j} className={tok.cls || "syn-fn"}>{tok.text}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide03_Seoreport;

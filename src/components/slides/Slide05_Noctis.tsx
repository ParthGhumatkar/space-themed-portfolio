import { useRef, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useIsMobile } from "../../hooks/useIsMobile";

interface Props { isActive: boolean; isCurrent?: boolean; }

const CODE_LINES = [
  [{ text: "def ", cls: "syn-keyword" }, { text: "chat_with_ollama", cls: "syn-fn" }, { text: "(" }],
  [{ text: "    self, prompt: ", cls: "syn-type" }, { text: "str" }],
  [{ text: ") -> ", cls: "syn-keyword" }, { text: "str", cls: "syn-type" }, { text: ":" }],
  [{ text: "    response = requests.", cls: "syn-keyword" }, { text: "post", cls: "syn-fn" }, { text: "(" }],
  [{ text: "        " }, { text: "'http://localhost:11434/api/generate'", cls: "syn-string" }, { text: "," }],
  [{ text: "        json={" }],
  [{ text: "            " }, { text: "'model'", cls: "syn-string" }, { text: ": " }, { text: "'phi3:mini'", cls: "syn-string" }, { text: "," }],
  [{ text: "            " }, { text: "'prompt'", cls: "syn-string" }, { text: ": prompt," }],
  [{ text: "            " }, { text: "'stream'", cls: "syn-string" }, { text: ": " }, { text: "False", cls: "syn-keyword" }, { text: "," }],
  [{ text: "            " }, { text: "'context'", cls: "syn-string" }, { text: ": self.context" }],
  [{ text: "        }," }],
  [{ text: "        timeout=" }, { text: "30", cls: "syn-num" }],
  [{ text: "    )" }],
  [],
  [{ text: "    data = response.", cls: "syn-keyword" }, { text: "json", cls: "syn-fn" }, { text: "()" }],
  [{ text: "    self.context = data.", cls: "syn-fn" }, { text: "get", cls: "syn-keyword" }, { text: "(" }, { text: "'context'", cls: "syn-string" }, { text: ", [])" }],
  [{ text: "    text = data[" }, { text: "'response'", cls: "syn-string" }, { text: "]." }, { text: "strip", cls: "syn-fn" }, { text: "()" }],
  [],
  [{ text: "    self.notepad.", cls: "syn-fn" }, { text: "insert", cls: "syn-keyword" }, { text: "(" }],
  [{ text: "        END, f" }, { text: "'\\n>>> {text}\\n'", cls: "syn-string" }],
  [{ text: "    )" }],
  [{ text: "    return", cls: "syn-keyword" }, { text: " text" }],
];

const Slide05_Noctis = ({ isActive, isCurrent = false }: Props) => {
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
          src="/slides/slide-05.png"
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
          background: 'linear-gradient(to bottom, rgba(2,8,12,0.3) 0%, rgba(2,8,12,0.65) 100%)',
        }} />
      </div>

      <div style={{
        position: "absolute", inset: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
      }}>
        {/* LEFT — code window (hidden on mobile) */}
        {!isMobile && (
          <div style={{
            width: "50%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "80px 0 80px 56px",
          }}>
            <div className="code-window slide-code-left" style={{ width: "90%", maxWidth: 520 }}>
              <div className="code-tab">
                <span className="code-dot" style={{ background: "#ff5f57" }} />
                <span className="code-dot" style={{ background: "#febc2e" }} />
                <span className="code-dot" style={{ background: "#28c840" }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#555", marginLeft: 8 }}>ai_chat.py</span>
              </div>
              <div className="code-body">
                <div style={{ marginBottom: 12 }}>
                  <span className="syn-comment"># noctis · local AI, zero cloud</span>
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

        {/* RIGHT — project info */}
        <div style={{
          width: isMobile ? "100%" : "50%",
          padding: isMobile ? "80px 24px 32px" : "80px 56px 80px 48px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div className="slide-heading" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--text2)", letterSpacing: "0.1em" }}>{"{ 03 }"}</span>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9, letterSpacing: "0.15em",
              color: "var(--text2)", border: "1px solid var(--border)", padding: "2px 8px",
            }}>OPEN SOURCE</span>
          </div>

          <h2 className="slide-heading" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 9vw, 120px)",
            lineHeight: 0.9, color: "var(--text)", marginBottom: 16,
          }}>NOCTIS</h2>

          <p className="slide-subtext" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontSize: 22,
            color: "var(--text)", lineHeight: 1.4, marginBottom: 20,
          }}>
            "AI that lives on your machine.<br />
            Zero cloud. Zero compromise."
          </p>

          <p className="slide-subtext" style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300, fontSize: 14,
            color: "var(--text2)", lineHeight: 1.65, marginBottom: 20,
          }}>
            Local-first notepad with inline AI chat. Runs phi3:mini via
            Ollama — completely offline. Terminal-style, not a modal.
            Nothing leaves your machine.
          </p>

          <div className="slide-subtext" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            {["Python 3.13", "CustomTkinter", "Ollama", "phi3:mini"].map(tag => (
              <span key={tag} style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10, letterSpacing: "0.08em",
                color: "var(--text2)", border: "1px solid var(--border)", padding: "3px 8px",
              }}>{tag}</span>
            ))}
          </div>

          <div className="slide-cta">
            <a
              href="https://github.com/ParthGhumatkar/noctis"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: "inline-flex", width: "fit-content" }}
            >View on GitHub →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide05_Noctis;

import { useRef, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useIsMobile } from "../../hooks/useIsMobile";

interface Props { isActive: boolean; isCurrent?: boolean; }

const CODE_LINES = [
  [{ text: "export async function ", cls: "syn-keyword" }, { text: "POST", cls: "syn-fn" }, { text: "(req: " }, { text: "Request", cls: "syn-type" }, { text: ") {" }],
  [{ text: "  const { providerId, slotTime, phone } =" }],
  [{ text: "    await req.", cls: "syn-keyword" }, { text: "json", cls: "syn-fn" }, { text: "()" }],
  [],
  [{ text: "  const conflict = await db" }],
  [{ text: "    .", cls: "syn-keyword" }, { text: "select", cls: "syn-fn" }, { text: "()." }, { text: "from", cls: "syn-keyword" }, { text: "(bookings)" }],
  [{ text: "    ." }, { text: "where", cls: "syn-fn" }, { text: "(" }, { text: "and", cls: "syn-fn" }, { text: "(" }],
  [{ text: "      " }, { text: "eq", cls: "syn-fn" }, { text: "(bookings.providerId, providerId)," }],
  [{ text: "      " }, { text: "eq", cls: "syn-fn" }, { text: "(bookings.slotTime, slotTime)," }],
  [{ text: "      " }, { text: "eq", cls: "syn-fn" }, { text: "(bookings.status, " }, { text: "'confirmed'", cls: "syn-string" }, { text: ")" }],
  [{ text: "    ))" }],
  [],
  [{ text: "  if", cls: "syn-keyword" }, { text: " (conflict.length > " }, { text: "0", cls: "syn-num" }, { text: ") {" }],
  [{ text: "    return ", cls: "syn-keyword" }, { text: "Response.", cls: "syn-type" }, { text: "json", cls: "syn-fn" }, { text: "(" }],
  [{ text: "      { error: " }, { text: "'Slot taken'", cls: "syn-string" }, { text: " }," }],
  [{ text: "      { status: " }, { text: "409", cls: "syn-num" }, { text: " }" }],
  [{ text: "    )" }],
  [{ text: "  }" }],
  [],
  [{ text: "  const [booking] = await db" }],
  [{ text: "    .", cls: "syn-keyword" }, { text: "insert", cls: "syn-fn" }, { text: "(bookings)." }, { text: "values", cls: "syn-fn" }, { text: "({" }],
  [{ text: "      providerId, slotTime," }],
  [{ text: "      customerPhone: phone, status: " }, { text: "'pending'", cls: "syn-string" }],
  [{ text: "    })." }, { text: "returning", cls: "syn-fn" }, { text: "()" }],
  [],
  [{ text: "  return ", cls: "syn-keyword" }, { text: "Response.", cls: "syn-type" }, { text: "json", cls: "syn-fn" }, { text: "(booking)" }],
  [{ text: "}" }],
];

const Slide04_Swatantra = ({ isActive, isCurrent = false }: Props) => {
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
          src="/slides/slide-04.png"
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 60%',
            display: 'block',
            transform: 'scale(1.08)',
            willChange: 'transform',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,15,30,0.35) 0%, rgba(10,15,30,0.7) 100%)',
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
          <div className="slide-heading" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--text2)", letterSpacing: "0.1em" }}>{"{ 02 }"}</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: accent, border: `1px solid ${accent}`, padding: "2px 8px" }}>LIVE</span>
          </div>

          <h2 className="slide-heading" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 9vw, 120px)",
            lineHeight: 0.9, color: "var(--text)", marginBottom: 16,
          }}>SWATANTRA</h2>

          <p className="slide-subtext" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontSize: 22,
            color: "var(--text)", lineHeight: 1.4, marginBottom: 20,
          }}>
            "Booking platform built<br />
            for Bharat's builders."
          </p>

          <p className="slide-subtext" style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300, fontSize: 14,
            color: "var(--text2)", lineHeight: 1.65, marginBottom: 20,
          }}>
            30-min scheduling slots. WhatsApp deep links. JWT + PIN auth.
            Custom public profiles. Built for India's independent tradespeople.
          </p>

          <div className="slide-subtext" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            {["Next.js 14", "Neon", "JWT", "Tailwind", "Vercel"].map(tag => (
              <span key={tag} style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10, letterSpacing: "0.08em",
                color: "var(--text2)", border: "1px solid var(--border)", padding: "3px 8px",
              }}>{tag}</span>
            ))}
          </div>

          <div className="slide-cta">
            <a
              href="https://swatantra.parthghumatkar.com"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: "inline-flex", width: "fit-content" }}
            >Visit Site →</a>
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
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#555", marginLeft: 8 }}>route.ts</span>
              </div>
              <div className="code-body">
                <div style={{ marginBottom: 12 }}>
                  <span className="syn-comment">// swatantra · booking logic</span>
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

export default Slide04_Swatantra;

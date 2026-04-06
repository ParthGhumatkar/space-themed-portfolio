import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useIsMobile } from "../../hooks/useIsMobile";

interface Props { isActive: boolean; isCurrent?: boolean; }

const Slide08_Contact = ({ isActive, isCurrent = false }: Props) => {
  const { theme } = useTheme();
  const [emailHov, setEmailHov] = useState(false);
  const isMobile = useIsMobile();
  const accent = theme === "dark" ? "#2A6B4A" : "#7C6AF7";
  const accent2 = theme === "dark" ? "#3D9962" : "#FF6B9D";
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

  const SOCIALS = [
    { label: "GitHub",   href: "https://github.com/ParthGhumatkar" },
    { label: "LinkedIn", href: "https://linkedin.com/in/parth-ghumatkar" },
    { label: "WhatsApp", href: "https://wa.me/919373956958" },
  ];

  return (
    <div className={`slide${isActive ? " slide-active" : ""}`}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <img
          ref={imgRef}
          src="/slides/slide-08.png"
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
          background: 'linear-gradient(to bottom, rgba(5,5,20,0.35) 0%, rgba(5,5,20,0.78) 100%)',
        }} />
      </div>
      <div style={{
        position: "absolute", inset: 0,
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        padding: isMobile ? "80px 24px 0" : "0 56px",
      }}>
        <div style={{ maxWidth: 800, width: "100%" }}>
          <p className="slide-heading" style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, letterSpacing: "0.15em",
            color: "var(--text2)", textTransform: "uppercase",
            marginBottom: 20,
          }}>GET IN TOUCH</p>

          <h2 className="slide-heading" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 9vw, 128px)",
            lineHeight: 0.88,
            color: "var(--text)",
            marginBottom: 72,
          }}>
            LET'S BUILD<br />
            SOMETHING<br />
            <span style={{ color: accent }}>THAT MATTERS.</span>
          </h2>

          <a
            href="mailto:parthghumatkarofficial@gmail.com"
            className="slide-subtext"
            onMouseEnter={() => setEmailHov(true)}
            onMouseLeave={() => setEmailHov(false)}
            style={{
              display: "block",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 2vw, 22px)",
              color: emailHov ? accent2 : "var(--text)",
              textDecoration: "none",
              borderBottom: `1px solid ${emailHov ? accent : "var(--border)"}`,
              paddingBottom: 12,
              marginBottom: 36,
              transition: "color 0.2s, border-color 0.2s",
              wordBreak: "break-all",
            }}
          >
            parthghumatkarofficial@gmail.com
          </a>

          <div className="slide-cta" style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 13, letterSpacing: "0.08em",
                  color: "var(--text2)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text2)")}
              >
                <span style={{ color: accent }}>/</span> {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer row */}
      <div style={{
        position: "absolute",
        bottom: 28,
        left: isMobile ? 24 : 56,
        right: isMobile ? 24 : 56,
        zIndex: 2,
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 8,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.1em",
        color: "var(--text2)",
      }}>
        <span>© 2025 PARTH GHUMATKAR</span>
        <span>PUNE, INDIA</span>
        <span>NEXT.JS · VERCEL · WINDSURF</span>
      </div>
    </div>
  );
};

export default Slide08_Contact;

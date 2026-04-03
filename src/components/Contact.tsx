import { useEffect, useRef, useState } from "react";

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/ParthGhumatkar" },
  { label: "LinkedIn", href: "https://linkedin.com/in/parth-ghumatkar" },
  { label: "WhatsApp", href: "https://wa.me/919373956958" },
];

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  const [emailHov, setEmailHov] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const slide = (delay: string): React.CSSProperties => ({
    display: "block",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(56px,9vw,128px)",
    lineHeight: 0.88,
    transform: vis ? "translateY(0)" : "translateY(105%)",
    transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  return (
    <>
    <section id="contact" ref={ref} style={{
      background: "rgba(6,6,8,0.5)", padding: "180px 56px",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ghost */}
      <div style={{ position: "absolute", bottom: -40, right: -20, fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(140px,22vw,300px)", color: "var(--text)", opacity: 0.025, pointerEvents: "none", letterSpacing: "-4px", lineHeight: 1, userSelect: "none" }}>
        HELLO
      </div>

      {/* Label */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 64 }}>
        <div style={{ width: 28, height: 1, background: "var(--text3)" }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>GET IN TOUCH</span>
      </div>

      {/* Heading */}
      <div>
        <div style={{ overflow: "hidden" }}><span style={{ ...slide("0s"), color: "var(--text)" }}>LET'S BUILD</span></div>
        <div style={{ overflow: "hidden" }}><span style={{ ...slide("0.1s"), color: "var(--text)" }}>SOMETHING</span></div>
        <div style={{ overflow: "hidden" }}><span style={{ ...slide("0.2s"), color: "var(--green)" }}>THAT MATTERS.</span></div>
      </div>

      {/* Email */}
      <div style={{ marginTop: 72 }}>
        <a
          href="mailto:parthghumatkarofficial@gmail.com"
          style={{
            display: "block", width: "fit-content",
            fontFamily: "'Manrope', sans-serif", fontWeight: 400,
            fontSize: "clamp(16px,2.2vw,24px)",
            color: emailHov ? "var(--green2)" : "var(--text)",
            textDecoration: "none", paddingBottom: 10,
            borderBottom: `1px solid ${emailHov ? "var(--green)" : "var(--border)"}`,
            position: "relative", transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={() => setEmailHov(true)}
          onMouseLeave={() => setEmailHov(false)}
        >
          parthghumatkarofficial@gmail.com
          <span style={{ position: "absolute", right: -24, top: 0, opacity: emailHov ? 1 : 0, transition: "opacity 0.2s" }}>↗</span>
        </a>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)", marginTop: 12, letterSpacing: "0.05em" }}>
          Usually responds within 24 hours
        </p>
      </div>

      {/* Socials */}
      <div style={{ marginTop: 60, display: "flex", gap: 36 }}>
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: 12, color: "var(--text2)", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.2s", display: "inline-flex", alignItems: "center", gap: 4 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text)";
              const prefix = e.currentTarget.querySelector(".social-prefix") as HTMLElement;
              if (prefix) { prefix.style.opacity = "0"; }
              const arrow = e.currentTarget.querySelector(".social-arrow") as HTMLElement;
              if (arrow) { arrow.style.opacity = "1"; }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text2)";
              const prefix = e.currentTarget.querySelector(".social-prefix") as HTMLElement;
              if (prefix) { prefix.style.opacity = "1"; }
              const arrow = e.currentTarget.querySelector(".social-arrow") as HTMLElement;
              if (arrow) { arrow.style.opacity = "0"; }
            }}
          >
            <span className="social-prefix" style={{ color: "var(--green)", transition: "opacity 0.15s", position: "relative" }}>/</span>
            <span className="social-arrow" style={{ color: "var(--green)", opacity: 0, transition: "opacity 0.15s", position: "absolute" }}>↗</span>
            {s.label}
          </a>
        ))}
      </div>

      {/* Right decorative element */}
      <div
        className="hidden md:flex"
        style={{
          position: "absolute",
          right: 56,
          top: "50%",
          transform: "translateY(-50%)",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          opacity: vis ? 1 : 0,
          transition: "opacity 0.6s ease 0.4s",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          {[80, 120, 60, 100, 40, 90].map((h, i) => (
            <div key={i} style={{ width: 1, height: h, background: "var(--border)" }} />
          ))}
        </div>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 9,
          color: "var(--text3)",
          writingMode: "vertical-rl" as const,
          letterSpacing: "0.2em",
          marginTop: 16,
          textTransform: "uppercase" as const,
        }}>
          AVAILABLE FOR COLLABS
        </span>
      </div>
    </section>

    {/* Bottom CTA bar */}
    <div style={{
      borderTop: "1px solid rgba(255,255,255,0.04)",
      padding: "32px 56px",
      background: "rgba(8,8,10,0.9)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: 15, color: "var(--text2)" }}>
        Open to freelance projects starting now.
      </p>
      <a href="mailto:parthghumatkarofficial@gmail.com" className="btn-primary">
        Send a message →
      </a>
    </div>
    </>
  );
};

export default Contact;

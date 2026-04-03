import { useEffect, useRef, useState } from "react";

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/ParthGhumatkar" },
  { label: "LinkedIn", href: "https://linkedin.com/in/parth-ghumatkar" },
  { label: "WhatsApp", href: "https://wa.me/919373956958" },
];

const EMAIL = "parthghumatkarofficial@gmail.com";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

// ── Copy-to-clipboard email with mouse-tracking tooltip ───────────────
const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const [show,   setShow]   = useState(false);
  const [flash,  setFlash]  = useState(false);
  const [pos,    setPos]    = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left + 14, y: e.clientY - rect.top - 44 });
  };

  const onClick = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 500);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={ref}
      style={{ position: "relative", width: "fit-content", cursor: "pointer", marginTop: 72 }}
      onMouseMove={onMove}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={onClick}
    >
      <span style={{
        display: "block",
        fontFamily: "'Manrope', sans-serif", fontWeight: 400,
        fontSize: "clamp(16px,2.2vw,24px)",
        color: flash ? "var(--green2)" : "var(--text)",
        paddingBottom: 10,
        borderBottom: `1px solid ${show ? "var(--green)" : "var(--border)"}`,
        transition: "color 0.2s, border-color 0.2s",
        userSelect: "none" as const,
      }}>
        {EMAIL}
        <span style={{ marginLeft: 10, opacity: show ? 1 : 0, transition: "opacity 0.2s" }}>↗</span>
      </span>

      {/* Cursor-tracking tooltip */}
      <div style={{
        position: "absolute",
        top: pos.y, left: pos.x,
        pointerEvents: "none",
        opacity: show ? 1 : 0,
        transition: "opacity 0.12s",
        zIndex: 30,
      }}>
        <div style={{
          background: copied ? "var(--green)" : "var(--bg4)",
          border: "1px solid var(--border)",
          padding: "5px 12px",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          color: copied ? "#060608" : "var(--text2)",
          letterSpacing: "0.08em",
          whiteSpace: "nowrap" as const,
          transition: "background 0.18s, color 0.18s",
        }}>
          {copied ? "Copied! ✓" : "Click to copy"}
        </div>
      </div>

      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)", marginTop: 12, letterSpacing: "0.05em", pointerEvents: "none" }}>
        Usually responds within 24 hours
      </p>
    </div>
  );
};

// ── Letter-scramble social link ────────────────────────────────────────
const ScrambleLink = ({ label, href }: { label: string; href: string }) => {
  const [display, setDisplay] = useState(label.toUpperCase());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef(0);

  const scramble = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    frameRef.current = 0;
    const total = 14;
    timerRef.current = setInterval(() => {
      frameRef.current++;
      if (frameRef.current >= total) {
        clearInterval(timerRef.current!);
        setDisplay(label.toUpperCase());
        return;
      }
      const progress = frameRef.current / total;
      setDisplay(
        label.toUpperCase().split("").map((ch, i) =>
          progress > i / label.length
            ? ch
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        ).join("")
      );
    }, 38);
  };

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplay(label.toUpperCase());
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={scramble}
      onMouseLeave={reset}
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 13,
        color: "var(--text2)",
        textDecoration: "none",
        letterSpacing: "0.08em",
        transition: "color 0.2s",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span style={{ color: "var(--green)" }}>/</span>{display}
    </a>
  );
};

// ── Magnetic CTA button ────────────────────────────────────────────────
const MagneticBtn = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 80;
      if (dist < radius) {
        const strength = (radius - dist) / radius;
        setPos({ x: dx * strength * 0.42, y: dy * strength * 0.42 });
        setHov(true);
      } else {
        setPos({ x: 0, y: 0 });
        setHov(false);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrapRef} style={{ padding: "24px", margin: "-24px", display: "inline-block" }}>
      <a
        href={`mailto:${EMAIL}`}
        className="btn-primary"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: hov
            ? "transform 0.08s ease, box-shadow 0.3s ease"
            : "transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease",
          boxShadow: hov
            ? "0 0 36px rgba(42,107,74,0.45), 0 0 12px rgba(42,107,74,0.25)"
            : "none",
        }}
      >
        SEND A MESSAGE →
      </a>
    </div>
  );
};

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

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

      <CopyEmail />

      {/* Socials */}
      <div style={{ marginTop: 60, display: "flex", gap: 36 }}>
        {SOCIALS.map((s) => (
          <ScrambleLink key={s.label} label={s.label} href={s.href} />
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
      <MagneticBtn />
    </div>
    </>
  );
};

export default Contact;

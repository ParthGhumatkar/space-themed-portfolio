import { useRef, useState } from "react";

const PROJECTS = [
  {
    num: "01",
    name: "SEOREPORT",
    year: "2024–2025",
    desc: "AI SEO auditing. Drop a URL, get a 12-section structured report. GPT-4 Turbo + GPT-4o-mini routing, PDF export, email gating, admin dashboard.",
    stack: "Next.js 14 · GPT-4 Turbo · TypeScript · Neon · Vercel",
    url: "https://seoreport.parthghumatkar.com",
  },
  {
    num: "02",
    name: "SWATANTRA",
    year: "2024–2025",
    desc: "Booking platform for India's independent tradespeople. 30-min slots, WhatsApp flows, JWT + PIN auth, public profiles.",
    stack: "Next.js 14 · Neon · JWT · Tailwind · Vercel",
    url: "https://swatantra.parthghumatkar.com",
  },
  {
    num: "03",
    name: "NOCTIS",
    year: "2024",
    desc: "Local-first AI notepad. Runs phi3:mini via Ollama — completely offline. Terminal-style chat, not a modal.",
    stack: "Python 3.13 · CustomTkinter · Ollama · phi3:mini",
    url: "https://github.com/ParthGhumatkar/noctis",
  },
];

const ProjectRow = ({ p }: { p: typeof PROJECTS[0] }) => {
  const [hovered, setHovered]  = useState(false);
  const rowRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current || !contentRef.current) return;
    const r  = rowRef.current.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = ((e.clientX - cx) / (r.width  / 2)) * 6;
    const dy = ((e.clientY - cy) / (r.height / 2)) * 6;
    contentRef.current.style.transform  = `translate(${dx}px,${dy}px)`;
    contentRef.current.style.transition = "transform 0.1s ease";
  };

  const onLeave = () => {
    setHovered(false);
    if (contentRef.current) {
      contentRef.current.style.transform  = "translate(0,0)";
      contentRef.current.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
    }
  };

  return (
    <div
      ref={rowRef}
      style={{
        position: "relative",
        borderBottom: "1px solid var(--border)",
        padding: "44px 0",
        overflow: "hidden",
        backgroundColor: hovered ? "var(--bg2)" : "transparent",
        transition: "background-color 0.35s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      {/* Featured accent — SEOREPORT only */}
      {p.num === "01" && (
        <div style={{
          position: "absolute", left: 0, top: 0,
          width: 2,
          height: hovered ? "100%" : "0%",
          background: "var(--green)",
          transition: "height 0.5s cubic-bezier(0.16,1,0.3,1)",
        }} />
      )}
      {/* Ghost number */}
      <span
        className="hidden md:block"
        style={{
          position: "absolute",
          right: -8,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 200,
          lineHeight: 1,
          color: "var(--text)",
          opacity: hovered ? 0.08 : 0.03,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {p.num}
      </span>

      {/* 4-column row */}
      <div
        ref={contentRef}
        style={{ willChange: "transform", position: "relative", zIndex: 1 }}
        className="flex flex-col md:flex-row items-start"
      >
        {/* Col A — 200px */}
        <div className="w-full md:w-[200px] md:flex-shrink-0 mb-6 md:mb-0">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.05em" }}>
              <span style={{ color: "var(--green)", fontSize: 11 }}>&#123;</span>
              <span style={{ color: "var(--text)", fontSize: 13 }}> {p.num} </span>
              <span style={{ color: "var(--green)", fontSize: 11 }}>&#125;</span>
            </div>
            {(p.num === "01" || p.num === "02") && (
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 9,
                color: "var(--green)",
                border: "1px solid rgba(42,107,74,0.3)",
                padding: "2px 7px",
                letterSpacing: "0.06em",
                lineHeight: 1.6,
              }}>&#9679; LIVE</span>
            )}
          </div>
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(36px,4.5vw,60px)",
            lineHeight: 0.95,
            color: "var(--text)",
            marginTop: 10,
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.35s var(--ease-out, cubic-bezier(0.16,1,0.3,1))",
          }}>
            {p.name}
          </h3>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            color: "var(--text3)",
            display: "block",
            marginTop: 10,
          }}>
            {p.year}
          </span>
        </div>

        {/* Col B — 280px shimmer placeholder */}
        <div className="hidden md:block w-[280px] flex-shrink-0 px-[40px]">
          <div style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
            <div className="shimmer" style={{ position: "absolute", inset: 0 }} />
            <span style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9,
              color: "var(--text3)",
              whiteSpace: "nowrap",
            }}>
              [ IMAGE COMING SOON ]
            </span>
            <span style={{
              position: "absolute",
              bottom: 6, right: 8,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9,
              color: "var(--border)",
              letterSpacing: "0.05em",
              opacity: 0.6,
            }}>
              {p.url.replace("https://", "")}
            </span>
          </div>
        </div>

        {/* Col C — flex-1 */}
        <div className="flex-1 px-0 md:px-8 mb-6 md:mb-0">
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300,
            fontSize: 14,
            color: "var(--text2)",
            lineHeight: 1.8,
            maxWidth: 400,
          }}>
            {p.desc}
          </p>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            color: "var(--text3)",
            marginTop: 14,
            letterSpacing: "0.05em",
          }}>
            {p.stack}
          </p>
        </div>

        {/* Col D — 140px */}
        <div
          className="w-full md:w-[140px] md:flex-shrink-0 md:self-end"
          style={{ paddingBottom: 2 }}
        >
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: hovered ? 10 : 6,
              padding: "8px 16px",
              border: `1px solid ${hovered ? "var(--green)" : "var(--border)"}`,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.1em",
              color: hovered ? "var(--green)" : "var(--text2)",
              textDecoration: "none",
              background: hovered ? "rgba(42,107,74,0.04)" : "transparent",
              transition: "all 0.2s",
              whiteSpace: "nowrap" as const,
            }}
          >
            VISIT →
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => (
  <section id="work" style={{ background: "var(--bg)", padding: "0 56px 160px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 28, height: 1, background: "var(--text3)" }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)", letterSpacing: "0.2em", textTransform: "uppercase" as const }}>SELECTED WORK</span>
      </div>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "var(--text3)" }}>(3 Projects)</span>
    </div>
    <div style={{ borderBottom: "1px solid var(--border)" }} />

    {PROJECTS.map((p) => (
      <ProjectRow key={p.num} p={p} />
    ))}
  </section>
);

export default Projects;

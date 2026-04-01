import ScrollFade from "./ScrollFade";
import { useState } from "react";

const projects = [
  {
    num: "01",
    name: "seoreport",
    year: "2024–2025",
    desc: "AI SEO auditing. Drop a URL, get a 12-section report. GPT-4 Turbo + GPT-4o-mini routing, PDF export, email gating.",
    stack: "Next.js 14 · GPT-4 Turbo · TypeScript · Neon",
    url: "https://seoreport.parthghumatkar.com",
  },
  {
    num: "02",
    name: "Swatantra",
    year: "2024–2025",
    desc: "Booking platform for India's independent tradespeople. 30-min slots, WhatsApp flows, JWT + PIN auth.",
    stack: "Next.js 14 · Neon · JWT · Tailwind",
    url: "https://swatantra.parthghumatkar.com",
  },
  {
    num: "03",
    name: "Noctis",
    year: "2024",
    desc: "Local-first AI notepad. Runs phi3:mini via Ollama — completely offline. Terminal-style chat, not a modal.",
    stack: "Python 3.13 · CustomTkinter · Ollama",
    url: "https://github.com/ParthGhumatkar/noctis",
  },
];

const ProjectRow = ({ p }: { p: typeof projects[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative border-t border-border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ghost number */}
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 font-display font-black text-[160px] leading-none select-none pointer-events-none transition-opacity duration-300"
        style={{ color: `rgba(13,13,13,${hovered ? 0.09 : 0.04})` }}
      >
        {p.num}
      </span>

      <div className="relative z-10 flex items-start py-8 gap-0">
        {/* Left: name + year */}
        <div className="w-[200px] shrink-0">
          <h3 className="font-display font-bold text-[32px] leading-tight">{p.name}</h3>
          <span className="font-mono text-[10px] text-muted-foreground mt-1 block">{p.year}</span>
        </div>

        {/* Centre: desc + stack */}
        <div className="flex-1 px-12">
          <p className="font-body text-sm text-muted-foreground max-w-[460px]" style={{ fontWeight: 300, color: "#666" }}>
            {p.desc}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground mt-2">{p.stack}</p>
        </div>

        {/* Right: visit link */}
        <div className="w-[160px] shrink-0 text-right pt-1">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Visit →
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => (
  <section id="work" className="px-[52px] py-[48px]">
    <ScrollFade>
      <span className="mono-label text-muted-foreground mb-12 block">Selected Work</span>
    </ScrollFade>

    <ScrollFade>
      <div>
        {projects.map((p) => (
          <ProjectRow key={p.num} p={p} />
        ))}
        <div className="border-t border-border" />
      </div>
    </ScrollFade>
  </section>
);

export default Projects;

import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    num: "01",
    name: "seoreport",
    desc: "AI-powered SEO audit tool. Drop a URL, get a structured 12-section report. GPT-4 Turbo + GPT-4o-mini routing, PDF export, email gating, admin dashboard.",
    stack: ["Next.js 14", "GPT-4 Turbo", "TypeScript", "Neon", "Vercel"],
    link: "https://seoreport.parthghumatkar.com",
    year: "2024–2025",
  },
  {
    num: "02",
    name: "Swatantra",
    desc: "Booking platform for India's independent tradespeople. 30-min scheduling slots, WhatsApp flows, JWT + PIN auth, custom public profiles.",
    stack: ["Next.js 14", "Neon", "JWT", "Tailwind", "Vercel"],
    link: "https://swatantra.parthghumatkar.com",
    year: "2024–2025",
  },
  {
    num: "03",
    name: "Noctis",
    desc: "Local-first AI notepad desktop app. Runs phi3:mini via Ollama — completely offline, zero cloud. Terminal-style inline chat, not a modal.",
    stack: ["Python 3.13", "CustomTkinter", "Ollama", "phi3:mini"],
    link: "https://github.com/ParthGhumatkar/noctis",
    year: "2024",
  },
];

const Projects = () => (
  <section id="work" className="px-6 max-w-content mx-auto py-24">
    <ScrollReveal>
      <p className="label-mono mb-4">Work</p>
    </ScrollReveal>

    <div>
      {projects.map((p) => (
        <ScrollReveal key={p.num}>
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 py-10 border-b border-border transition-colors duration-200 hover:bg-primary/[0.03]">
            <span className="font-display text-[80px] leading-none text-muted-foreground/30 font-bold select-none shrink-0 w-20">
              {p.num}
            </span>

            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-[40px] leading-tight mb-2">{p.name}</h3>
              <p className="font-body text-sm text-muted-foreground mb-3 max-w-lg">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="font-mono text-[10px] text-primary uppercase tracking-wider">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 text-right md:pt-4 flex flex-col items-end gap-1">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-primary hover:opacity-70 transition-opacity duration-200 cursor-none"
              >
                Visit →
              </a>
              <span className="label-mono-muted">{p.year}</span>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>

    <hr className="section-divider mt-24" />
  </section>
);

export default Projects;

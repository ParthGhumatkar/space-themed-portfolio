import ScrollReveal from "./ScrollReveal";

const tools = [
  { cat: "FRAMEWORK", val: "Next.js 14 App Router + TypeScript" },
  { cat: "DATABASE", val: "Neon PostgreSQL — serverless, edge-ready" },
  { cat: "AI", val: "OpenAI GPT-4 Turbo · Ollama · Groq" },
  { cat: "DEPLOYMENT", val: "Vercel + GitHub Actions" },
  { cat: "STYLING", val: "Tailwind CSS" },
  { cat: "HARDWARE", val: "ESP8266 · Arduino · Python automation" },
  { cat: "IDE", val: "Windsurf (Cascade AI) · Cursor" },
];

const Stack = () => (
  <section id="stack" className="px-6 max-w-content mx-auto py-24">
    <ScrollReveal>
      <p className="label-mono mb-4">Tools</p>
    </ScrollReveal>

    <ScrollReveal>
      <div>
        {tools.map((t) => (
          <div key={t.cat} className="flex justify-between items-baseline py-4 border-b border-border">
            <span className="label-mono-muted w-32 shrink-0">{t.cat}</span>
            <span className="font-body text-sm text-foreground text-right">{t.val}</span>
          </div>
        ))}
      </div>
    </ScrollReveal>

    <hr className="section-divider mt-24" />
  </section>
);

export default Stack;

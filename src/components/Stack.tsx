import ScrollFade from "./ScrollFade";

const items = [
  "Next.js 14", "TypeScript", "Neon PostgreSQL", "Vercel",
  "OpenAI GPT-4", "Tailwind CSS", "Ollama", "Python",
  "ESP8266", "Arduino", "Windsurf", "Cursor",
  "GitHub Actions", "Groq",
];

const Stack = () => (
  <section id="stack" className="py-[200px] px-[52px]">
    <ScrollFade>
      <span className="mono-label text-muted-foreground mb-6 block">Tools & Stack</span>
      <h2 className="font-display font-bold text-[52px] leading-none mb-12">
        What I build <em className="italic font-light text-primary">with</em>
      </h2>
    </ScrollFade>

    <ScrollFade>
      <div className="overflow-x-auto pb-4 -mx-[52px] px-[52px]" style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-3 w-max">
          {items.map((item) => (
            <span
              key={item}
              className="border border-border px-6 py-3 font-mono text-[11px] text-foreground whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-all duration-150"
              style={{ borderRadius: 2 }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </ScrollFade>

    <ScrollFade className="mt-12">
      <div className="font-body text-[13px] text-muted-foreground space-y-1 max-w-copy" style={{ fontWeight: 300 }}>
        <p>Deployed on Vercel. Data on Neon.</p>
        <p>AI via OpenAI and local Ollama models.</p>
        <p>Hardware when screens aren't enough.</p>
      </div>
    </ScrollFade>
  </section>
);

export default Stack;

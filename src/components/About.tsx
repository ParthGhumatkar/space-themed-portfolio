import ScrollReveal from "./ScrollReveal";

const facts = [
  { key: "STATUS", value: "Final Year, B.E. CS" },
  { key: "BASED IN", value: "Pune, India" },
  { key: "STACK", value: "Next.js · TypeScript · Neon" },
  { key: "DEPLOYS TO", value: "Vercel" },
  { key: "COBUILDING WITH", value: "Rakshit" },
  { key: "OPEN TO", value: "Freelance & Collabs" },
];

const About = () => (
  <section id="about" className="px-6 max-w-content mx-auto py-24">
    <ScrollReveal>
      <p className="label-mono mb-4">About</p>
    </ScrollReveal>

    <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
      <div className="lg:w-[60%]">
        <ScrollReveal>
          <p className="font-display italic text-[22px] leading-relaxed mb-6" style={{ fontWeight: 400 }}>
            I started writing code at 11. I haven't stopped.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p className="font-display italic text-[22px] leading-relaxed mb-6" style={{ fontWeight: 400 }}>
            Right now I'm building two live SaaS products while finishing my CS degree — seoreport, an AI-powered SEO tool, and Swatantra, a booking platform for India's independent tradespeople.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p className="font-display italic text-[22px] leading-relaxed" style={{ fontWeight: 400 }}>
            I care about the whole stack. Schema design, API architecture, the last CSS transition. Also tinkering with ESP8266 and home automation when the compiler cooperates.
          </p>
        </ScrollReveal>
      </div>

      <div className="lg:w-[40%]">
        <ScrollReveal>
          <div className="space-y-0">
            {facts.map((f) => (
              <div key={f.key} className="flex justify-between items-baseline py-3 border-b border-border">
                <span className="label-mono-muted">{f.key}</span>
                <span className="font-body text-[13px] text-foreground">{f.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[11px] text-primary tracking-wide uppercase">Available for work</span>
          </div>
        </ScrollReveal>
      </div>
    </div>

    <hr className="section-divider mt-24" />
  </section>
);

export default About;

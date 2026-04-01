import ScrollFade from "./ScrollFade";

const facts = [
  "B.E. Computer Science",
  "Pune, India",
  "Next.js + Neon + Vercel",
];

const About = () => (
  <section id="about" className="relative py-[200px]">
    {/* Rotated label bleeds to left edge */}
    <div
      className="absolute left-0 top-[200px] w-[120px] flex items-start justify-center"
      style={{ height: 300 }}
    >
      <span
        className="mono-label-green text-[10px]"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        About
      </span>
    </div>

    <div className="pl-[120px] pr-[52px] max-w-[760px]">
      <ScrollFade>
        <p className="editorial-body text-[24px]">
          I started writing code at 11. Haven't stopped since.
        </p>
      </ScrollFade>

      <ScrollFade className="mt-8">
        <p className="editorial-body text-[24px]">
          Right now I'm finishing a CS degree while running two live SaaS products — seoreport, an AI-powered SEO audit tool, and Swatantra, a booking platform built for India's independent tradespeople.
        </p>
      </ScrollFade>

      <ScrollFade className="mt-8">
        <p className="editorial-body text-[24px]">
          I care about the whole stack. From the database index to the last hover state. Also tinkering with ESP8266 and home automation when the compiler cooperates.
        </p>
      </ScrollFade>

      <ScrollFade className="mt-12">
        <div className="border-t border-border pt-6 flex flex-wrap items-center gap-0 font-body text-xs text-foreground">
          {facts.map((f, i) => (
            <span key={f} className="flex items-center">
              {i > 0 && <span className="mx-4 text-border">|</span>}
              {f}
            </span>
          ))}
          <span className="mx-4 text-border">|</span>
          <span className="flex items-center gap-1.5">
            Available for work
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
          </span>
        </div>
      </ScrollFade>
    </div>
  </section>
);

export default About;

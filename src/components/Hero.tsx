const Hero = () => (
  <section className="h-screen relative px-[52px] pb-[52px] flex flex-col justify-end">
    {/* Top left label */}
    <span
      className="mono-label text-muted-foreground absolute"
      style={{ top: 88, left: 52 }}
    >
      Est. 2011 — Pune, India
    </span>

    {/* Bottom right vertical label */}
    <span
      className="mono-label absolute text-[9px]"
      style={{
        bottom: 52,
        right: 52,
        writingMode: "vertical-rl",
        transform: "rotate(180deg)",
        color: "#CCCCCC",
        letterSpacing: "0.15em",
      }}
    >
      Full Stack Developer
    </span>

    {/* Headline */}
    <div>
      <div className="overflow-hidden">
        <h1
          className="font-display font-black hero-line hero-line-1"
          style={{ fontSize: "clamp(64px, 9vw, 128px)", lineHeight: 0.88 }}
        >
          I build things
        </h1>
      </div>
      <div className="overflow-hidden">
        <h1
          className="font-display font-black hero-line hero-line-2"
          style={{ fontSize: "clamp(64px, 9vw, 128px)", lineHeight: 0.88 }}
        >
          people{" "}
          <em className="font-display italic font-light text-primary">actually</em>
        </h1>
      </div>
      <div className="overflow-hidden">
        <h1
          className="font-display font-black hero-line hero-line-3"
          style={{ fontSize: "clamp(64px, 9vw, 128px)", lineHeight: 0.88 }}
        >
          use.
        </h1>
      </div>
    </div>

    {/* Subtitle */}
    <p
      className="font-body text-[15px] text-muted-foreground mt-8 max-w-[400px] hero-line hero-sub"
      style={{ fontWeight: 300 }}
    >
      Final-year CS student. Two live products. Building a third.
    </p>

    {/* Links */}
    <div className="flex items-center gap-6 mt-10 hero-line hero-links">
      <a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="font-body text-[13px] text-foreground relative group"
      >
        View work ↓
        <span className="absolute bottom-[-2px] left-0 w-full h-px bg-foreground origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
      </a>
      <a
        href="https://github.com/ParthGhumatkar"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        GitHub ↗
      </a>
    </div>
  </section>
);

export default Hero;

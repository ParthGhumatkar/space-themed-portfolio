import ScrollReveal from "./ScrollReveal";

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center px-6 max-w-content mx-auto relative">
    <ScrollReveal>
      <p className="label-mono mb-8">Pune, India — Full Stack Developer</p>
    </ScrollReveal>

    <ScrollReveal>
      <h1 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(56px, 10vw, 120px)" }}>
        Building things<br />that <em className="text-primary italic">matter.</em>
      </h1>
    </ScrollReveal>

    <ScrollReveal className="mt-8">
      <p className="font-body text-muted-foreground text-lg max-w-lg" style={{ fontWeight: 300 }}>
        Final-year CS student. Two live products. Always shipping.
      </p>
    </ScrollReveal>

    <ScrollReveal className="mt-10 flex items-center gap-6">
      <a
        href="#work"
        onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
        className="bg-primary text-primary-foreground px-6 py-3 font-body text-sm cursor-none inline-block transition-opacity duration-200 hover:opacity-90"
      >
        View Work →
      </a>
      <a
        href="https://github.com/ParthGhumatkar"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-none"
      >
        GitHub ↗
      </a>
    </ScrollReveal>

    <hr className="section-divider absolute bottom-0 left-6 right-6" />
  </section>
);

export default Hero;

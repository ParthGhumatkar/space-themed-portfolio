import ScrollReveal from "./ScrollReveal";

const Contact = () => (
  <section id="contact" className="px-6 max-w-content mx-auto py-32 text-center">
    <ScrollReveal>
      <p className="label-mono mb-4">Say hello</p>
    </ScrollReveal>

    <ScrollReveal>
      <h2 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(40px, 8vw, 80px)" }}>
        Let's build<br />something.
      </h2>
    </ScrollReveal>

    <ScrollReveal>
      <p className="font-body text-muted-foreground mt-6 text-lg" style={{ fontWeight: 300 }}>
        Open to freelance, collabs, and interesting problems.
      </p>
    </ScrollReveal>

    <ScrollReveal className="mt-10">
      <a
        href="mailto:parth@parthghumatkar.com"
        className="font-body text-xl text-primary underline underline-offset-4 hover:opacity-70 transition-opacity duration-200 cursor-none"
      >
        parth@parthghumatkar.com
      </a>
    </ScrollReveal>

    <ScrollReveal className="mt-8 flex items-center justify-center gap-6">
      {[
        { label: "GitHub", href: "https://github.com/ParthGhumatkar" },
        { label: "LinkedIn", href: "https://linkedin.com/in/parthghumatkar" },
        { label: "WhatsApp", href: "https://wa.me/919876543210" },
      ].map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-none"
        >
          / {l.label}
        </a>
      ))}
    </ScrollReveal>
  </section>
);

export default Contact;

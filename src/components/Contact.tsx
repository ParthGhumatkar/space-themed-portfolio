import ScrollFade from "./ScrollFade";

const Contact = () => (
  <section id="contact" className="bg-contact-bg text-contact-fg">
    <div className="px-[52px] py-[120px]">
      <ScrollFade>
        <span className="mono-label text-contact-muted mb-8 block">Get In Touch</span>
      </ScrollFade>

      <ScrollFade>
        <h2
          className="font-display font-black"
          style={{ fontSize: "clamp(56px, 8vw, 112px)", lineHeight: 0.92 }}
        >
          Got something<br />
          to <em className="italic font-light text-contact-accent">build?</em>
        </h2>
      </ScrollFade>

      <ScrollFade className="mt-10">
        <a
          href="mailto:parth@parthghumatkar.com"
          className="font-body text-lg text-contact-accent border-b border-contact-accent pb-1 hover:text-contact-fg transition-colors duration-200 inline-block"
        >
          parth@parthghumatkar.com
        </a>
      </ScrollFade>

      <ScrollFade className="mt-12 flex items-center gap-6">
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
            className="font-body text-xs text-contact-dim hover:text-contact-fg transition-colors duration-200"
          >
            / {l.label}
          </a>
        ))}
      </ScrollFade>
    </div>

    {/* Footer */}
    <div className="border-t border-contact-border px-[52px] py-5 flex items-center justify-between">
      <span className="font-mono text-[10px] text-contact-muted">© 2025 Parth Ghumatkar</span>
      <span className="font-mono text-[10px] text-contact-muted">Pune, India</span>
    </div>
  </section>
);

export default Contact;

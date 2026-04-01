const Nav = () => {
  const links = ["About", "Work", "Stack", "Contact"];

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80">
      <div className="max-w-content mx-auto flex items-center justify-between px-6 py-5">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-display text-xl font-bold tracking-tight cursor-none">
          PG
        </button>
        <div className="flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="nav-link text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-none"
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => scrollTo("Contact")}
            className="bg-primary text-primary-foreground px-4 py-2 font-body text-xs tracking-wide cursor-none transition-opacity duration-200 hover:opacity-90"
          >
            Let's talk
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

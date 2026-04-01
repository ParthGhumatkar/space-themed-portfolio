const Nav = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-[52px] py-6 flex items-center justify-between">
      <span className="font-body text-xs tracking-wide text-foreground">Parth Ghumatkar</span>
      <div className="flex items-center gap-6">
        {["about", "work", "contact"].map((s) => (
          <button
            key={s}
            onClick={() => scrollTo(s)}
            className="font-body text-[11px] text-muted-foreground hover:text-foreground transition-colors duration-200 capitalize"
          >
            {s}
          </button>
        ))}
        <div className="flex items-center gap-2 ml-2">
          <span
            className="w-2 h-2 rounded-full bg-primary"
            style={{ animation: "pulse-dot 2s ease infinite" }}
          />
          <span className="font-mono text-[10px] text-muted-foreground">open to work</span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

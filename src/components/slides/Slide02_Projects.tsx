import React, { useState, useRef, useEffect } from "react";

interface Props { isActive: boolean; goTo: (idx: number) => void; }

const PROJECTS = [
  {
    num: "01",
    name: "SEOREPORT",
    badge: "LIVE",
    href: "https://seoreport.parthghumatkar.com",
    desc: "AI-powered SEO audit SaaS. GPT-4 Turbo.",
    stack: ["Next.js", "TypeScript", "OpenAI", "Neon", "Tailwind"],
    preview: "/previews/seoreport.png",
  },
  {
    num: "02",
    name: "SWATANTRA",
    badge: "LIVE",
    href: "https://swatantra.parthghumatkar.com",
    desc: "Booking platform for Indian tradespeople.",
    stack: ["Next.js", "Neon", "TypeScript", "Tailwind", "i18n"],
    preview: "/previews/swatantra.png",
  },
  {
    num: "03",
    name: "NOCTIS",
    badge: "OPEN SOURCE",
    href: "https://github.com/ParthGhumatkar/noctis",
    github: "https://github.com/ParthGhumatkar/noctis",
    desc: "Local-first AI notepad. Runs on Ollama.",
    stack: ["Python", "CustomTkinter", "Ollama", "phi3:mini"],
    preview: "/previews/noctis.png",
    previewBg: "#0d1117",
  },
];

const STACK_CATEGORIES = [
  {
    label: "FRONTEND",
    items: [
      { name: "Next.js",    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg",                   invert: true  },
      { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",            invert: false },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",  invert: false },
      { name: "Tailwind",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",invert: false },
    ]
  },
  {
    label: "BACKEND & DB",
    items: [
      { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",          invert: false },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",  invert: false },
      { name: "Docker",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",          invert: false },
      { name: "Neon",       icon: null, textColor: "#00e5cc" },
    ]
  },
  {
    label: "AI & INFRA",
    items: [
      { name: "OpenAI",     icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg", invert: true },
      { name: "Groq",       icon: null, textColor: "#f55036" },
      { name: "Ollama",     icon: null, textColor: "#ffffff" },
      { name: "Claude AI",  icon: null, textColor: "#cc785c" },
    ]
  },
  {
    label: "INFRA & HW",
    items: [
      { name: "Arduino",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg", invert: false },
      { name: "ESP8266",    icon: null, textColor: "#E8A838" },
      { name: "AWS",        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg",             invert: true  },
      { name: "Vercel",     icon: null, textColor: "#ffffff" },
    ]
  },
];

const Slide02_Projects = ({ isActive }: Props) => {
  const [hov, setHov] = useState<number | null>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const currentTilt = useRef({ x: 0, y: 0 });
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const magRafId = useRef<number>(0);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (isActive) {
      img.style.transition = "none";
      img.style.transform = "scale(1.06)";
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (imgRef.current) imgRef.current.className = "kb-active";
      }));
    } else {
      img.className = "";
      img.style.transform = "scale(1.06)";
    }
  }, [isActive]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    if (preview === null) {
      if (tiltRef.current) {
        tiltRef.current.style.transform =
          'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(0.85) translate(-50%, -50%)';
        tiltRef.current.style.opacity = '0';
      }
      currentTilt.current = { x: 0, y: 0 };
      cancelAnimationFrame(rafId.current);
      return;
    }
    const card = tiltRef.current;
    if (!card) return;
    const animate = () => {
      const rect = card.getBoundingClientRect();
      if (rect.width === 0) { rafId.current = requestAnimationFrame(animate); return; }
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mousePos.current.x - cx;
      const dy = mousePos.current.y - cy;
      const targetY = -(dx / (window.innerWidth / 2)) * 8;
      const targetX = (dy / (window.innerHeight / 2)) * 5;
      currentTilt.current.x += (targetX - currentTilt.current.x) * 0.08;
      currentTilt.current.y += (targetY - currentTilt.current.y) * 0.08;
      const clampedY = Math.max(-8, Math.min(8, currentTilt.current.y));
      const clampedX = Math.max(-5, Math.min(5, currentTilt.current.x));
      card.style.transform =
        `perspective(1200px) rotateX(${clampedX}deg) rotateY(${clampedY}deg) scale(1) translate(-50%, -50%)`;
      card.style.opacity = '1';
      const shineX = ((dx / rect.width) + 0.5) * 100;
      const shineY = ((dy / rect.height) + 0.5) * 100;
      const shine = card.querySelector('.tilt-shine') as HTMLElement;
      if (shine) {
        shine.style.background =
          `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(200,169,110,0.12) 0%, transparent 60%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [preview]);

  useEffect(() => {
    if (!isActive) {
      cancelAnimationFrame(magRafId.current);
      iconRefs.current.forEach(el => {
        if (el) {
          el.style.transform = 'translate(0,0) scale(1)';
          el.style.boxShadow = 'none';
          el.style.borderColor = 'rgba(200,169,110,0.12)';
        }
      });
      return;
    }

    const MAGNETIC_RADIUS = 80;
    const MAGNETIC_FORCE = 0.35;
    const LERP = 0.12;

    const offsets = iconRefs.current.map(() => ({ x: 0, y: 0 }));
    const targets = iconRefs.current.map(() => ({ x: 0, y: 0 }));

    const animate = () => {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      iconRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNETIC_RADIUS) {
          const force = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_FORCE;
          targets[i].x = dx * force;
          targets[i].y = dy * force;
        } else {
          targets[i].x = 0;
          targets[i].y = 0;
        }

        offsets[i].x += (targets[i].x - offsets[i].x) * LERP;
        offsets[i].y += (targets[i].y - offsets[i].y) * LERP;

        if (Math.abs(offsets[i].x) > 0.1 || Math.abs(offsets[i].y) > 0.1) {
          el.style.transform = `translate(${offsets[i].x}px, ${offsets[i].y}px) scale(${
            dist < MAGNETIC_RADIUS ? 1 + (1 - dist / MAGNETIC_RADIUS) * 0.15 : 1
          })`;
        } else {
          el.style.transform = 'translate(0px, 0px) scale(1)';
        }

        if (dist < MAGNETIC_RADIUS) {
          const intensity = 1 - dist / MAGNETIC_RADIUS;
          el.style.boxShadow = `0 0 ${intensity * 20}px rgba(200,169,110,${intensity * 0.4})`;
          el.style.borderColor = `rgba(200,169,110,${0.15 + intensity * 0.6})`;
        } else {
          el.style.boxShadow = 'none';
          el.style.borderColor = 'rgba(200,169,110,0.12)';
        }
      });

      magRafId.current = requestAnimationFrame(animate);
    };

    magRafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(magRafId.current);
  }, [isActive]);

  const d = (ms: number): React.CSSProperties => ({
    animationDelay: `${ms}ms`,
    animationFillMode: "both",
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "var(--bg)" }}>

      {/* Layer 0 — Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img ref={imgRef} src="/slides/slide-02.png" alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
      </div>

      {/* Layer 1 — Base dark */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(5,12,5,0.55)" }} />

      {/* Layer 2 — Left column darker */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(to right, rgba(2,6,2,0.98) 0%, rgba(3,9,3,0.96) 45%, rgba(5,12,5,0.5) 68%, transparent 100%)",
      }} />

      {/* Layer 3 — Bottom gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(to top, rgba(3,9,3,0.85) 0%, transparent 50%)",
      }} />

      {/* Layer 4 — Content */}
      {isActive && (
        <div style={{ position: "absolute", inset: 0, zIndex: 4 }}>
          <div style={{ display: "flex", height: "100%" }}>

            {/* ─── LEFT — Stack ─── */}
            <div style={{
              width: "45%",
              padding: "clamp(3rem, 6vh, 5rem) clamp(2rem, 4vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "clamp(1rem, 2vh, 1.5rem)",
            }}>
              <div>
                <p className="fade-up" style={{
                  ...d(0),
                  fontFamily: "'Syne Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.3em",
                  color: "var(--gold)",
                  marginBottom: "0.5rem",
                }}>THE STACK</p>

                <h2 className="fade-up" style={{
                  ...d(80),
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(2.5rem, min(5vw, 7vh), 4.5rem)",
                  lineHeight: 0.92,
                  color: "#F5EDD8",
                  textShadow: "0 4px 24px rgba(0,0,0,0.9)",
                }}>What I<br />Build With.</h2>
              </div>

              {/* Categorized stack grid */}
              <div className="fade-up" style={{
                ...d(180),
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0.75rem, 1.5vh, 1.25rem)",
              }}>
                {(() => {
                  let idx = 0;
                  return STACK_CATEGORIES.map((cat, ci) => (
                  <div key={ci}>
                    <p style={{
                      fontFamily: "'Syne Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      color: "rgba(200,169,110,0.75)",
                      marginBottom: "0.6rem",
                    }}>{cat.label}</p>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "8px",
                    }}>
                      {cat.items.map((item, ii) => (
                        <div
                          key={ii}
                          ref={el => { iconRefs.current[idx++] = el; }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "5px",
                            padding: "clamp(0.65rem, 1.2vh, 0.9rem) 0.5rem",
                            border: "1px solid rgba(200,169,110,0.12)",
                            background: "rgba(200,169,110,0.03)",
                            transition: "border-color 0.2s ease, background 0.2s ease",
                            cursor: "default",
                            willChange: "transform",
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = "rgba(200,169,110,0.08)";
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = "rgba(200,169,110,0.03)";
                          }}
                        >
                          {item.icon ? (
                            <img
                              src={item.icon}
                              alt={item.name}
                              style={{
                                width: "clamp(24px, 2.5vw, 32px)",
                                height: "clamp(24px, 2.5vw, 32px)",
                                objectFit: "contain",
                                filter: item.invert ? "brightness(0) invert(1)" : "none",
                                opacity: 0.9,
                              }}
                              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                            />
                          ) : (
                            <span style={{
                              fontSize: "clamp(0.55rem, 0.75vw, 0.7rem)",
                              fontFamily: "'Syne Mono', monospace",
                              fontWeight: 600,
                              color: (item as { textColor?: string }).textColor || "#C8A96E",
                              letterSpacing: "0.04em",
                              textAlign: "center",
                              lineHeight: 1,
                              height: "clamp(24px, 2.5vw, 32px)",
                              display: "flex",
                              alignItems: "center",
                            }}>
                              {item.name.toUpperCase()}
                            </span>
                          )}
                          <span style={{
                            fontFamily: "'Syne Mono', monospace",
                            fontSize: "clamp(0.5rem, 0.65vw, 0.6rem)",
                            letterSpacing: "0.04em",
                            color: "rgba(245,237,216,0.75)",
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            maxWidth: "100%",
                            textOverflow: "ellipsis",
                          }}>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  ));
                })()}
              </div>
            </div>

            {/* ─── DIVIDER ─── */}
            <div style={{
              width: "1px",
              alignSelf: "stretch",
              margin: "10% 0",
              background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.25), transparent)",
            }} />

            {/* ─── RIGHT — Projects ─── */}
            <div style={{
              flex: 1,
              padding: "clamp(3rem, 6vh, 5rem) clamp(2rem, 4vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              overflow: "visible",
            }}>

              <p className="fade-up" style={{
                ...d(0),
                fontFamily: "'Syne Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "var(--gold)",
                marginBottom: "0.5rem",
              }}>SELECTED WORK</p>

              <h2 className="fade-up" style={{
                ...d(80),
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, min(3.5vw, 5vh), 3rem)",
                lineHeight: 0.92,
                color: "#F5EDD8",
                textShadow: "0 4px 24px rgba(0,0,0,0.9)",
                marginBottom: "clamp(1.5rem, 3vh, 2.5rem)",
              }}>Three Things<br />I've Shipped.</h2>

              {/* Project list */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {PROJECTS.map((p, i) => (
                  <div
                    key={p.num}
                    className="fade-up"
                    onMouseEnter={() => { setHov(i); setPreview(i); }}
                    onMouseLeave={() => { setHov(null); setPreview(null); }}
                    style={{
                      ...d(200 + i * 100),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "clamp(1rem, 2vh, 1.5rem) 0",
                      paddingLeft: hov === i ? "12px" : "0px",
                      borderBottom: "1px solid rgba(200,169,110,0.18)",
                      borderTop: i === 0 ? "1px solid rgba(200,169,110,0.18)" : "none",
                      borderLeft: `2px solid ${hov === i ? "#C8A96E" : "transparent"}`,
                      cursor: "pointer",
                      transition: "padding-left 0.3s ease, border-color 0.3s ease",
                    }}
                    onClick={() => window.open(p.href, "_blank")}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{
                          fontFamily: "'Syne Mono', monospace",
                          fontSize: "0.55rem",
                          color: "rgba(200,169,110,0.5)",
                          letterSpacing: "0.15em",
                        }}>{p.num}</span>
                        <span style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 300,
                          fontSize: "clamp(2rem, min(3.5vw, 5vh), 3.25rem)",
                          letterSpacing: "0.04em",
                          color: hov === i ? "#C8A96E" : "#F5EDD8",
                          textShadow: "0 2px 20px rgba(0,0,0,0.95)",
                          transition: "color 0.3s ease",
                        }}>{p.name}</span>
                      </div>
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic",
                        fontSize: "clamp(0.75rem, 1vh, 0.9rem)",
                        color: hov === i ? "rgba(245,237,216,0.75)" : "rgba(245,237,216,0.45)",
                        paddingLeft: "calc(0.55rem + 12px)",
                        transition: "color 0.3s ease",
                      }}>{p.desc}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                      {p.badge === "LIVE" ? (
                        <span style={{
                          fontFamily: "'Syne Mono', monospace",
                          fontSize: "0.5rem",
                          color: "#4ade80",
                          border: "1px solid rgba(74,222,128,0.3)",
                          padding: "3px 10px",
                          letterSpacing: "0.1em",
                        }}>● LIVE</span>
                      ) : (
                        <span style={{
                          fontFamily: "'Syne Mono', monospace",
                          fontSize: "0.5rem",
                          color: "rgba(200,169,110,0.6)",
                          border: "1px solid rgba(200,169,110,0.2)",
                          padding: "3px 10px",
                          letterSpacing: "0.1em",
                        }}>OSS</span>
                      )}
                      <span style={{
                        fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
                        color: hov === i ? "#C8A96E" : "rgba(245,237,216,0.3)",
                        transition: "color 0.2s, transform 0.2s",
                        transform: hov === i ? "translateX(4px)" : "translateX(0)",
                        display: "inline-block",
                      }}>→</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ─── 3D TILT PREVIEW CARD ─── */}
              <div
                ref={tiltRef}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "58%",
                  right: "auto",
                  marginTop: "0",
                  width: "380px",
                  background: "rgba(5,15,5,0.88)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(200,169,110,0.25)",
                  overflow: "hidden",
                  opacity: 0,
                  transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(0.85) translate(-50%, -50%)",
                  transition: "opacity 0.35s ease, transform 0.1s ease",
                  zIndex: 20,
                  boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(200,169,110,0.2), inset 0 1px 0 rgba(200,169,110,0.1)",
                  pointerEvents: "none",
                  willChange: "transform",
                }}
              >
                {/* Specular shine overlay */}
                <div
                  className="tilt-shine"
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: "none",
                    transition: "background 0.1s ease",
                  }}
                />
                {/* Dynamic accent bar */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "3px",
                  background: preview !== null
                    ? PROJECTS[preview].badge === "LIVE"
                      ? "linear-gradient(to right, #4ade80, #22c55e)"
                      : "linear-gradient(to right, #C8A96E, #a07840)"
                    : "transparent",
                  zIndex: 2,
                  transition: "background 0.3s ease",
                }} />

                {preview !== null && (() => {
                  const p = PROJECTS[preview];
                  return (
                    <div style={{ position: "relative", zIndex: 3 }}>
                      {/* Screenshot */}
                      <div style={{
                        width: "100%",
                        height: "210px",
                        overflow: "hidden",
                        borderBottom: "1px solid rgba(200,169,110,0.15)",
                        background: (p as { previewBg?: string }).previewBg || "#0a1a0a",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <img
                          src={p.preview}
                          alt={p.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top",
                            display: "block",
                            filter: preview !== null && PROJECTS[preview].badge === "OPEN SOURCE"
                              ? "brightness(1.4) contrast(1.1) saturate(1.2)"
                              : "brightness(1.05)",
                          }}
                          onError={e => {
                            const el = e.currentTarget as HTMLImageElement;
                            el.style.display = "none";
                            const parent = el.parentElement;
                            if (parent) {
                              parent.style.display = "flex";
                              parent.style.alignItems = "center";
                              parent.style.justifyContent = "center";
                              parent.innerHTML = `<span style="font-family:'Syne Mono',monospace;font-size:0.55rem;color:rgba(200,169,110,0.4);letter-spacing:0.2em">${p.name}</span>`;
                            }
                          }}
                        />
                        {/* Gradient over screenshot bottom */}
                        <div style={{
                          position: "absolute",
                          bottom: 0, left: 0, right: 0,
                          height: "60px",
                          background: "linear-gradient(to top, rgba(5,15,5,0.95) 0%, rgba(5,15,5,0.6) 50%, transparent 100%)",
                          pointerEvents: "none",
                        }} />
                      </div>

                      {/* Info section */}
                      <div style={{ padding: "18px 20px" }}>
                        <p style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.75rem",
                          fontWeight: 300,
                          color: "#F5EDD8",
                          letterSpacing: "0.06em",
                          marginBottom: "8px",
                        }}>{p.name}</p>

                        <div style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                          marginBottom: "14px",
                        }}>
                          {p.stack.map((s, si) => (
                            <span key={si} style={{
                              fontFamily: "'Syne Mono', monospace",
                              fontSize: "0.62rem",
                              letterSpacing: "0.1em",
                              color: "#C8A96E",
                              border: "1px solid rgba(200,169,110,0.25)",
                              padding: "5px 12px",
                              background: "rgba(200,169,110,0.06)",
                            }}>{s}</span>
                          ))}
                        </div>

                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontFamily: "'Syne Mono', monospace",
                            fontSize: "0.6rem",
                            letterSpacing: "0.15em",
                            color: "#0a1a0a",
                            background: "#C8A96E",
                            padding: "9px 20px",
                            textDecoration: "none",
                            textTransform: "uppercase",
                            pointerEvents: "auto",
                          }}
                        >{p.badge === "LIVE" ? "VISIT →" : "GITHUB →"}</a>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Slide02_Projects;

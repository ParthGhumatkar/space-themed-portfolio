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

const baseVideos = [
  { id: "9xN_c7dH8EA", title: "Contactless Automatic Hand Sanitizer Dispenser - Covid-19", url: "https://www.youtube.com/watch?v=9xN_c7dH8EA" },
  { id: "4ZPQ9KFTB5M", title: "Robotic Arm Part-1", url: "https://www.youtube.com/watch?v=4ZPQ9KFTB5M" },
  { id: "LD3r_izDWRc", title: "ALEXA USED AS A T.V REMOTE!", url: "https://www.youtube.com/watch?v=LD3r_izDWRc" },
  { id: "q3yYeDS2EQg", title: "Hacking Fortnite using hardware automation", url: "https://www.youtube.com/watch?v=q3yYeDS2EQg" },
  { id: "1Z_ygTjK-Gc", title: "HACKING PIANO TILES USING PYTHON!!", url: "https://www.youtube.com/watch?v=1Z_ygTjK-Gc" },
];

const videos = [...baseVideos, ...baseVideos, ...baseVideos];

const Slide02_Projects = ({ isActive }: Props) => {
  const [hov, setHov] = useState<number | null>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const currentTilt = useRef({ x: 0, y: 0 });
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const scrollAnimRef = useRef<number | null>(null);

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

  const handleVideoListMouseEnter = () => {
    const el = videoScrollRef.current;
    if (!el) return;
    const oneThird = el.scrollHeight / 3;
    if (el.scrollTop === 0) {
      el.scrollTop = oneThird;
    }
    const scroll = () => {
      if (!videoScrollRef.current) return;
      videoScrollRef.current.scrollTop += 0.7;
      const { scrollTop, scrollHeight } = videoScrollRef.current;
      const third = scrollHeight / 3;
      if (scrollTop >= third * 2) {
        videoScrollRef.current.scrollTop = third;
      }
      scrollAnimRef.current = requestAnimationFrame(scroll);
    };
    scrollAnimRef.current = requestAnimationFrame(scroll);
  };

  const handleVideoListMouseLeave = () => {
    if (scrollAnimRef.current) {
      cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (scrollAnimRef.current) {
        cancelAnimationFrame(scrollAnimRef.current);
      }
    };
  }, []);

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
          {/* ─── Panel divider ─── */}
          <div style={{ position: "absolute", left: "45%", top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.25) 20%, rgba(200,169,110,0.25) 80%, transparent)", pointerEvents: "none", zIndex: 5 }} />
          <div style={{ display: "flex", height: "100vh" }}>

            {/* ─── LEFT — YouTube ─── */}
            <div style={{
              width: "45%",
              height: "100vh",
              paddingTop: 80,
              paddingLeft: 40,
              paddingRight: 24,
              paddingBottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 12,
              borderRight: "1px solid var(--border)",
              background: "linear-gradient(to right, rgba(10,26,10,0.6) 0%, rgba(10,26,10,0.2) 100%)",
            }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                <div style={{ width: 18, height: 13, borderRadius: 3, background: "#ff0000", display: "inline-flex", alignItems: "center", justifyContent: "center", marginRight: 8, flexShrink: 0 }}>
                  <div style={{ borderLeft: "7px solid white", borderTop: "4px solid transparent", borderBottom: "4px solid transparent", marginLeft: 1 }} />
                </div>
                <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: "0.2em", fontWeight: 600, color: "var(--gold)", margin: 0 }}>ON YOUTUBE</p>
              </div>

              <a
                href="https://youtube.com/@parthghumatkar606"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, color: "var(--text2)", textDecoration: "none", marginBottom: 12 }}
              >@parthghumatkar606 ↗</a>

              <div style={{ position: "relative", width: "100%" }}>
                <div className="video-scroll" ref={videoScrollRef} onMouseEnter={handleVideoListMouseEnter} onMouseLeave={handleVideoListMouseLeave} style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%", overflowY: "auto", maxHeight: "calc(100vh - 180px)" }}>
                {videos.map((video, vi) => (
                  <div
                    key={video.id}
                    onClick={() => window.open(video.url, '_blank')}
                    onMouseEnter={() => setHoveredVideo(video.id)}
                    onMouseLeave={() => setHoveredVideo(null)}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 130,
                      overflow: "hidden",
                      cursor: "pointer",
                      borderRadius: 3,
                      flexShrink: 0,
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{ position: "absolute", inset: 0 }}>
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`; }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transform: hoveredVideo === video.id ? "scale(1.06)" : "scale(1)",
                          transition: "transform 0.5s ease",
                        }}
                      />
                    </div>
                    {/* Dark gradient overlay */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: hoveredVideo === video.id
                        ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(10,26,10,0.4) 50%, rgba(200,169,110,0.08) 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
                      transition: "background 0.3s ease",
                    }} />
                    {/* Gold left border flash */}
                    <div style={{
                      position: "absolute",
                      left: 0, top: 0, bottom: 0,
                      width: hoveredVideo === video.id ? 3 : 0,
                      background: "var(--gold)",
                      transition: "width 0.25s ease",
                    }} />
                    {/* Video index */}
                    <span style={{
                      position: "absolute",
                      top: 10, left: 12,
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.1em",
                    }}>{String((vi % 5 + 1)).padStart(2, '0')}</span>
                    {/* Bottom content */}
                    <div style={{
                      position: "absolute",
                      bottom: 0, left: 0, right: 0,
                      padding: "10px 14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}>
                      <span style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#ffffff",
                        lineHeight: 1.3,
                        textShadow: "0 1px 8px rgba(0,0,0,0.8)",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        maxWidth: "75%",
                      }}>{video.title}</span>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        opacity: hoveredVideo === video.id ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: "50%",
                          background: "var(--gold)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <div style={{ width: 0, height: 0, borderLeft: "8px solid #0a1a0a", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", marginLeft: 2 }} />
                        </div>
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.16em", color: "var(--gold)", fontWeight: 600 }}>WATCH</span>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, rgba(10,26,10,0.95) 0%, transparent 100%)", pointerEvents: "none", zIndex: 4 }} />
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: 6, opacity: 0.5 }}>
                <div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", animation: "bounceY 1.5s ease-in-out infinite" }}>
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                    <path d="M1 1L7 7L13 1" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* ─── RIGHT — Projects ─── */}
            <div className="right-panel-scroll" style={{
              width: "55%",
              height: "100vh",
              paddingTop: 80,
              paddingLeft: 40,
              paddingRight: 56,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflowY: "auto",
              position: "relative",
            }}>

              <p className="fade-up" style={{
                ...d(0),
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                fontWeight: 600,
                color: "var(--gold)",
                marginBottom: "0.5rem",
              }}>SELECTED WORK</p>

              <h2 className="fade-up" style={{
                ...d(80),
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 3.2vw, 46px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "var(--text)",
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
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 11,
                          color: "var(--gold)",
                          opacity: 0.7,
                          letterSpacing: "0.1em",
                        }}>{p.num}</span>
                        <span style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 800,
                          fontSize: "clamp(24px, 3vw, 40px)",
                          letterSpacing: "-0.03em",
                          color: hov === i ? "#C8A96E" : "var(--text)",
                          textShadow: "0 2px 20px rgba(0,0,0,0.95)",
                          transition: "color 0.3s ease",
                        }}>{p.name}</span>
                      </div>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: 14,
                        color: "rgba(245,237,216,0.6)",
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
                  left: "70%",
                  right: "auto",
                  marginTop: "0",
                  width: "320px",
                  maxWidth: 320,
                  background: "rgba(5,15,5,0.88)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(200,169,110,0.25)",
                  overflow: "hidden",
                  opacity: 0,
                  transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(0.85) translate(-50%, -50%)",
                  transition: "opacity 0.35s ease, transform 0.1s ease",
                  zIndex: 10,
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

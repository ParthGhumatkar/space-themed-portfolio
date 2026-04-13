import React, { useRef, useEffect, useState } from "react";

interface Props { isActive: boolean; }

const MILESTONES = [
  {
    year: "2015",
    age: "AGE 11",
    title: "The Accident",
    body: "A knee injury ended my football career before it started. Stuck at home, I found YouTube. One video about a pencil sharpener motor changed everything.",
    quote: "I didn't choose tech. Tech found me on a bad day.",
    image: "/milestones/parth coding on table.jpg",
    imagePosition: "center center",
  },
  {
    year: "2016",
    age: "AGE 12",
    title: "First Robot",
    body: "Joined a Robotics class in Pune. Completed Lego Advanced Robotics Levels 1–3. Started teaching myself C++ and Arduino at home. No tutor. Just forums and YouTube.",
    quote: "Google and YouTube were my only teachers.",
    image: "/milestones/workinprogressrasberry.JPG",
    imagePosition: "center top",
  },
  {
    year: "2017",
    age: "AGE 13",
    title: "First Drone",
    body: "Built a drone from scratch — frame, ESCs, motors, flight controller. Assembled, calibrated, and flew it. All self-taught.",
    quote: "When it finally lifted off the ground, I knew this was it.",
    image: "/milestones/parth drone.png",
    imagePosition: "center center",
  },
  {
    year: "2018",
    age: "AGE 14",
    title: "Youngest Speaker",
    body: "Spoke at the Nelkinda Tech Kids Meetup, December 9th. Recognised as the most passionate young coder. Received a speaker mug that read Passionate Young Coder. At 14.",
    quote: "They said age was a barrier. I said it was an advantage.",
    image: "/milestones/Parth Nelkinda 9 Dec 2018 Mug.jpg",
    imagePosition: "60% 60%",
  },
  {
    year: "NOW",
    age: "AGE 20",
    title: "Shipping Products",
    body: "Two live SaaS products — seoreport and Swatantra. Full-stack with AI at the core. A developer who genuinely loves what he builds. Still learning. Never stopped.",
    quote: "Shipping beats perfect. Always has.",
    image: null,
    imagePosition: "center center",
  },
];

const Slide03_StackAbout = ({ isActive }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState(4);

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

  const d = (ms: number): React.CSSProperties => ({
    animationDelay: `${ms}ms`,
    animationFillMode: "both",
  });

  const m = MILESTONES[active];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "var(--bg)" }}>

      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img ref={imgRef} src="/slides/slide-03.png" alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            display: "block",
          }} />
      </div>

      {/* Overlays */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(5,12,5,0.65)" }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(to right, rgba(2,6,2,0.96) 0%, rgba(3,9,3,0.9) 48%, rgba(5,12,5,0.4) 70%, transparent 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(to top, rgba(3,9,3,0.85) 0%, transparent 50%)",
      }} />

      {/* Content */}
      {isActive && (
        <div style={{ position: "absolute", inset: 0, zIndex: 4, display: "flex" }}>

          {/* ─── LEFT — Story panel ─── */}
          <div className="left-panel-scroll" style={{
            width: "52%",
            minWidth: 0,
            height: "100vh",
            overflowY: "auto",
            paddingTop: 72,
            paddingLeft: 56,
            paddingRight: 40,
            paddingBottom: 32,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 8,
          }}>

            <p className="fade-up" style={{
              ...d(0),
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.18em",
              color: "var(--gold)",
              marginTop: 0,
              marginBottom: 12,
            }}>THE ORIGIN STORY</p>

            {/* Year + age */}
            <div style={{
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
            }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(44px, 5.5vw, 72px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginTop: 8,
                color: "#C8A96E",
                lineHeight: 1,
                transition: "all 0.35s ease",
              }}>{m.year}</span>
              <span style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 13,
                letterSpacing: "0.2em",
                color: "rgba(245,237,216,0.5)",
                marginLeft: 12,
                transition: "all 0.35s ease",
              }}>{m.age}</span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 24,
              fontStyle: "normal",
              lineHeight: 1,
              color: "var(--text)",
              marginTop: 4,
              transition: "all 0.35s ease",
              margin: 0,
            }}>{m.title}</h2>

            {/* Body */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              color: "rgba(245,237,216,0.75)",
              lineHeight: 1.65,
              maxWidth: "460px",
              textShadow: "0 1px 8px rgba(0,0,0,0.8)",
              transition: "all 0.35s ease",
              margin: 0,
            }}>{m.body}</p>

            {/* Pull quote */}
            <div style={{
              borderLeft: "2px solid #C8A96E",
              paddingLeft: "1rem",
              transition: "all 0.35s ease",
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: 14,
                color: "var(--gold)",
                lineHeight: 1.5,
                textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                margin: 0,
                transition: "all 0.35s ease",
              }}>"{m.quote}"</p>
            </div>

            {/* Milestone photo */}
            {m.image && (
              <>
              <div style={{ width: "100%", maxWidth: 520, aspectRatio: "4/3", overflow: "hidden", borderRadius: 3, marginTop: 20, position: "relative", background: "rgba(0,0,0,0.15)" }}
                onMouseEnter={e => {
                  const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLElement;
                  if (img) { img.style.transform = "scale(1.04)"; img.style.filter = "contrast(1.1) saturate(1.0)"; }
                }}
                onMouseLeave={e => {
                  const img = (e.currentTarget as HTMLElement).querySelector("img") as HTMLElement;
                  if (img) { img.style.transform = "scale(1)"; img.style.filter = "contrast(1.05) saturate(0.9)"; }
                }}
              >
                {/* Main photo frame — kept as wrapper for corner accents */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    key={m.image}
                    src={m.image}
                    alt={m.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: (m as { imagePosition?: string }).imagePosition || "center center",
                      filter: "contrast(1.05) saturate(0.9)",
                      transition: "transform 0.6s ease, filter 0.4s ease",
                      display: "block",
                    }}
                  />
                  {/* Corner accents */}
                  <div style={{ position: "absolute", top: 0, left: 0, width: 24, height: 24, borderTop: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)", zIndex: 2, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 0, right: 0, width: 24, height: 24, borderTop: "2px solid var(--gold)", borderRight: "2px solid var(--gold)", zIndex: 2, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, width: 24, height: 24, borderBottom: "2px solid var(--gold)", borderLeft: "2px solid var(--gold)", zIndex: 2, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderBottom: "2px solid var(--gold)", borderRight: "2px solid var(--gold)", zIndex: 2, pointerEvents: "none" }} />
                  {/* Bottom gradient overlay */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(10,26,10,0.6) 0%, transparent 100%)", pointerEvents: "none", zIndex: 1 }} />
                </div>

              </div>
              <p style={{
                marginTop: 8,
                textAlign: "left",
                fontFamily: "'Geist Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.3em",
                color: "rgba(200,169,110,0.5)",
                margin: "8px 0 0 0",
              }}>{m.year} · ARCHIVE</p>
              </>
            )}

          </div>

          {/* ─── DIVIDER ─── */}
          <div style={{
            width: "1px",
            alignSelf: "stretch",
            margin: "8% 0",
            background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.2), transparent)",
            flexShrink: 0,
          }} />

          {/* ─── RIGHT — Timeline ─── */}
          <div style={{
            minWidth: 280,
            maxWidth: 320,
            flexShrink: 0,
            paddingTop: 72,
            paddingLeft: 48,
            paddingRight: 40,
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}>

            {/* Timeline label */}
            <div className="fade-up" style={{
              ...d(100),
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}>
              <div style={{ width: 24, height: 1, background: "var(--gold)", opacity: 0.6 }} />
              <span style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "var(--gold)",
                fontWeight: 600,
                opacity: 1,
              whiteSpace: "nowrap",
              }}>TIMELINE — HOVER TO EXPLORE</span>
            </div>

            {/* Vertical connecting line */}
            <div style={{
              position: "absolute",
              left: 48,
              top: "calc(80px + 1rem + 32px + 1.5rem)",
              bottom: "calc(32px + 52px + 20px + 1.5rem)",
              width: 1,
              background: "rgba(200,169,110,0.2)",
              marginLeft: 4,
            }} />

            {/* Milestone nodes */}
            {MILESTONES.map((milestone, i) => (
              <div
                key={i}
                className="fade-up"
                onMouseEnter={() => setActive(i)}
                style={{
                  ...d(200 + i * 80),
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "14px 0",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Active accent line */}
                {active === i && (
                  <div style={{
                    position: "absolute",
                    left: -24,
                    top: "50%",
                    width: 16,
                    height: 2,
                    background: "var(--gold)",
                    transform: "translateY(-50%)",
                    borderRadius: 1,
                  }} />
                )}

                {/* Dot */}
                {active === i ? (
                  <div style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "var(--gold)",
                    flexShrink: 0,
                    boxShadow: "0 0 0 3px rgba(200,169,110,0.2), 0 0 12px rgba(200,169,110,0.4)",
                    transition: "all 0.3s ease",
                  }} />
                ) : (
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "transparent",
                    border: "1.5px solid rgba(200,169,110,0.35)",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }} />
                )}

                {/* Label */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: active === i ? 32 : 28,
                      fontWeight: active === i ? 800 : 700,
                      color: active === i ? "var(--gold)" : "var(--text)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      transition: "all 0.3s ease",
                    }}>{milestone.year}</span>
                    <span style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 12,
                      letterSpacing: "0.14em",
                      fontWeight: 500,
                      color: active === i ? "rgba(245,237,216,0.7)" : "rgba(245,237,216,0.35)",
                      marginLeft: 8,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 160,
                      transition: "all 0.3s ease",
                    }}>— {milestone.title.toUpperCase()}</span>
                  </div>
                  <span style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "rgba(245,237,216,0.4)",
                    marginTop: 4,
                    display: "block",
                    transition: "all 0.3s ease",
                  }}>{milestone.age}</span>
                </div>
              </div>
            ))}

            {/* Profile card */}
            <div className="fade-up" style={{
              ...d(700),
              marginTop: 32,
              paddingTop: 20,
              borderTop: "1px solid rgba(200,169,110,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}>
              <div>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--text)",
                  margin: 0,
                  lineHeight: 1.2,
                }}>Parth Ghumatkar</p>
                <p style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--text2)",
                  margin: "4px 0 0 0",
                whiteSpace: "nowrap",
                }}>DEVELOPER · BUILDER · ENTHUSIAST</p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Slide03_StackAbout;

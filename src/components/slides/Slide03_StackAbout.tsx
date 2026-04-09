import React, { useRef, useEffect, useState } from "react";

interface Props { isActive: boolean; goTo: (idx: number) => void; }

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
          <div style={{
            width: "52%",
            minWidth: 0,
            overflow: "visible",
            padding: "clamp(3rem, 6vh, 5rem) clamp(2rem, 4vw, 4rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(0.5rem, 1vh, 1rem)",
          }}>

            <p className="fade-up" style={{
              ...d(0),
              fontFamily: "'Syne Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: "var(--gold)",
              margin: 0,
            }}>THE ORIGIN STORY</p>

            {/* Year + age */}
            <div style={{
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                fontWeight: 300,
                color: "#C8A96E",
                lineHeight: 1,
                transition: "all 0.35s ease",
              }}>{m.year}</span>
              <span style={{
                fontFamily: "'Syne Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: "rgba(200,169,110,0.5)",
                transition: "all 0.35s ease",
              }}>{m.age}</span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(1.75rem, min(3.5vw, 5vh), 3rem)",
              lineHeight: 0.95,
              color: "#F5EDD8",
              textShadow: "0 4px 24px rgba(0,0,0,0.9)",
              transition: "all 0.35s ease",
              margin: 0,
            }}>{m.title}</h2>

            {/* Body */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(0.85rem, 1.3vh, 1.05rem)",
              color: "rgba(245,237,216,0.75)",
              lineHeight: 1.8,
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
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(0.95rem, 1.5vh, 1.25rem)",
                color: "rgba(200,169,110,0.85)",
                lineHeight: 1.5,
                textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                margin: 0,
                transition: "all 0.35s ease",
              }}>"{m.quote}"</p>
            </div>

            {/* Milestone photo */}
            {m.image && (
              <div style={{
                marginTop: "clamp(0.5rem, 1vh, 1rem)",
                width: "calc(100% + clamp(4rem, 8vw, 8rem))",
                marginLeft: "calc(-1 * clamp(2rem, 4vw, 4rem))",
                height: "clamp(220px, 35vh, 320px)",
                overflow: "hidden",
                border: "1px solid rgba(200,169,110,0.25)",
                position: "relative",
                flexShrink: 0,
              }}>
                <img
                  key={m.image}
                  src={m.image}
                  alt={m.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: (m as { imagePosition?: string }).imagePosition || "center center",
                    display: "block",
                    filter: "brightness(0.95) contrast(1.1) saturate(0.85)",
                    animation: "imgFadeIn 0.4s ease forwards",
                  }}
                />
                {/* Gold corner accents */}
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: "20px", height: "20px",
                  borderTop: "2px solid #C8A96E",
                  borderLeft: "2px solid #C8A96E",
                  pointerEvents: "none", zIndex: 2,
                }} />
                <div style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: "20px", height: "20px",
                  borderBottom: "2px solid #C8A96E",
                  borderRight: "2px solid #C8A96E",
                  pointerEvents: "none", zIndex: 2,
                }} />
                <div style={{
                  position: "absolute",
                  bottom: "8px", left: "10px",
                  fontFamily: "'Syne Mono', monospace",
                  fontSize: "0.45rem",
                  letterSpacing: "0.15em",
                  color: "rgba(200,169,110,0.8)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                  zIndex: 2,
                }}>{m.year} · {m.age}</div>
              </div>
            )}

            {!m.image && (
              <div style={{
                marginTop: "clamp(0.75rem, 1.5vh, 1.25rem)",
                width: "100%",
                height: "clamp(180px, 28vh, 260px)",
                border: "1px solid rgba(200,169,110,0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(200,169,110,0.02)",
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "'Syne Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  color: "rgba(200,169,110,0.4)",
                }}>
                  {m.year === "NOW"
                    ? "THE STORY CONTINUES"
                    : "NO PHOTO FROM THIS ERA"}
                </span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  color: "rgba(200,169,110,0.25)",
                  marginTop: "6px",
                  display: "block",
                }}>
                  {m.year === "NOW"
                    ? "still building · still shipping"
                    : "the memory lives in the code"}
                </span>
              </div>
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
            flex: 1,
            padding: "clamp(3rem, 6vh, 5rem) clamp(2rem, 4vw, 3.5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}>

            <p className="fade-up" style={{
              ...d(100),
              fontFamily: "'Syne Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: "rgba(200,169,110,0.5)",
              marginBottom: "clamp(1.5rem, 3vh, 2rem)",
            }}>TIMELINE — HOVER TO EXPLORE</p>

            {/* Vertical connecting line */}
            <div style={{
              position: "absolute",
              left: "clamp(2rem, 4vw, 3.5rem)",
              top: "calc(clamp(3rem, 6vh, 5rem) + 2rem + clamp(1.5rem, 3vh, 2rem))",
              bottom: "calc(clamp(3rem, 6vh, 5rem) + 80px)",
              width: "1px",
              background: "linear-gradient(to bottom, rgba(200,169,110,0.3), rgba(200,169,110,0.08))",
              marginLeft: "7px",
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
                  alignItems: "flex-start",
                  gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
                  padding: "clamp(0.6rem, 1.2vh, 1rem) 0",
                  cursor: "pointer",
                }}
              >
                {/* Dot */}
                <div style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  border: `2px solid ${active === i ? "#C8A96E" : "rgba(200,169,110,0.25)"}`,
                  background: active === i ? "#C8A96E" : "transparent",
                  flexShrink: 0,
                  marginTop: "4px",
                  transition: "all 0.25s ease",
                  boxShadow: active === i ? "0 0 12px rgba(200,169,110,0.6)" : "none",
                }} />

                {/* Label */}
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                      fontWeight: 300,
                      color: active === i ? "#C8A96E" : "#F5EDD8",
                      transition: "color 0.25s ease",
                    }}>{milestone.year}</span>
                    <span style={{
                      fontFamily: "'Syne Mono', monospace",
                      fontSize: "0.48rem",
                      letterSpacing: "0.12em",
                      color: active === i ? "rgba(200,169,110,0.65)" : "rgba(245,237,216,0.3)",
                      transition: "color 0.25s ease",
                    }}>— {milestone.title.toUpperCase()}</span>
                  </div>
                  {active === i && (
                    <p style={{
                      fontFamily: "'Syne Mono', monospace",
                      fontSize: "0.48rem",
                      letterSpacing: "0.1em",
                      color: "rgba(200,169,110,0.45)",
                      margin: "2px 0 0 0",
                    }}>{milestone.age}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Profile card */}
            <div className="fade-up" style={{
              ...d(700),
              marginTop: "clamp(1.5rem, 3vh, 2rem)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingTop: "clamp(1rem, 2vh, 1.5rem)",
              borderTop: "1px solid rgba(200,169,110,0.1)",
            }}>
              <img
                src="/profile.jpg"
                alt="Parth Ghumatkar"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid rgba(200,169,110,0.4)",
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.95rem",
                  color: "#F5EDD8",
                  margin: 0,
                  lineHeight: 1.2,
                }}>Parth Ghumatkar</p>
                <p style={{
                  fontFamily: "'Syne Mono', monospace",
                  fontSize: "0.45rem",
                  letterSpacing: "0.1em",
                  color: "rgba(200,169,110,0.5)",
                  margin: "2px 0 0 0",
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

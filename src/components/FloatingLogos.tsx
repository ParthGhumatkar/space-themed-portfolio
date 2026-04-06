import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";

interface BubbleData {
  name: string;
  icon: string;
  size: number;
  top: string;
  left: string;
  imgSize: number;
  floatClass: string;
  duration: string;
  delay: string;
  fallback?: string;
}

const BUBBLES: BubbleData[] = [
  { name: "Next.js",      icon: "nextdotjs",   size: 128, top: "10%", left: "6%",  imgSize: 50, floatClass: "float-a", duration: "4.2s", delay: "-1.1s" },
  { name: "TypeScript",   icon: "typescript",  size: 92,  top: "62%", left: "17%", imgSize: 36, floatClass: "float-c", duration: "5.8s", delay: "-2.4s" },
  { name: "Python",       icon: "python",      size: 115, top: "15%", left: "34%", imgSize: 44, floatClass: "float-b", duration: "6.1s", delay: "-0.7s" },
  { name: "Arduino",      icon: "arduino",     size: 94,  top: "42%", left: "28%", imgSize: 38, floatClass: "float-b", duration: "5.1s", delay: "-1.5s", fallback: "UNO" },
  { name: "TS-Center",    icon: "typescript",  size: 88,  top: "28%", left: "43%", imgSize: 34, floatClass: "float-e", duration: "5.6s", delay: "-0.9s" },
  { name: "PostgreSQL",   icon: "postgresql",  size: 86,  top: "58%", left: "46%", imgSize: 34, floatClass: "float-e", duration: "3.9s", delay: "-1.9s" },
  { name: "Vercel",       icon: "vercel",      size: 82,  top: "35%", left: "52%", imgSize: 32, floatClass: "float-c", duration: "4.4s", delay: "-1.3s" },
  { name: "Anthropic",    icon: "anthropic",   size: 88,  top: "55%", left: "67%", imgSize: 34, floatClass: "float-f", duration: "4.8s", delay: "-1.7s" },
  { name: "Tailwind",     icon: "tailwindcss", size: 106, top: "20%", left: "76%", imgSize: 40, floatClass: "float-a", duration: "5.4s", delay: "-2.1s" },
  { name: "Ollama",       icon: "ollama",      size: 90,  top: "60%", left: "86%", imgSize: 36, floatClass: "float-c", duration: "6.6s", delay: "-2.0s" },
  { name: "GitHub",       icon: "github",      size: 74,  top: "12%", left: "91%", imgSize: 30, floatClass: "float-e", duration: "3.7s", delay: "-2.8s" },
];

const Bubble = ({
  b, offset, logoColor, isDark,
}: {
  b: BubbleData;
  offset: { x: number; y: number };
  logoColor: string;
  isDark: boolean;
}) => {
  const [hov, setHov] = useState(false);
  const moving = Math.abs(offset.x) > 1 || Math.abs(offset.y) > 1;
  const bubbleBg     = isDark ? "rgba(20,22,26,0.85)" : "rgba(220,216,208,0.85)";
  const bubbleBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{
      position: "absolute",
      top: b.top, left: b.left,
      width: b.size, height: b.size,
      marginTop: -b.size / 2, marginLeft: -b.size / 2,
      animation: `${b.floatClass} ${b.duration} ease-in-out infinite`,
      animationDelay: b.delay,
    }}>
      <div
        style={{
          width: "100%", height: "100%",
          borderRadius: "50%",
          background: bubbleBg,
          border: `1px solid ${hov ? "rgba(42,107,74,0.5)" : bubbleBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${hov ? 1.08 : 1})`,
          transition: hov
            ? "transform 0.25s ease, border-color 0.3s"
            : moving
              ? "border-color 0.3s"
              : "transform 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.3s",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <img
          src={`https://cdn.simpleicons.org/${b.icon}/${logoColor}`}
          alt={b.name}
          style={{ width: b.imgSize, height: b.imgSize, opacity: hov ? 1 : 0.9, pointerEvents: "none", transition: "opacity 0.25s" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const fb = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
            if (fb) fb.removeAttribute("hidden");
          }}
        />
        <span hidden style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--text2)" }}>
          {b.fallback ?? b.name.replace("TS-Center", "TS").slice(0, 2).toUpperCase()}
        </span>
        <span style={{
          position: "absolute", bottom: -22, left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "var(--text2)",
          whiteSpace: "nowrap", opacity: hov ? 1 : 0,
          transition: "opacity 0.2s", pointerEvents: "none",
        }}>
          {b.name}
        </span>
      </div>
    </div>
  );
};

const MOBILE_VISIBLE = new Set(["Next.js", "TypeScript", "Python", "Anthropic", "GitHub"]);

const FloatingLogos = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>(
    BUBBLES.map(() => ({ x: 0, y: 0 }))
  );
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(() => window.innerWidth < 1024);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const logoColor = isDark ? "EDEAE0" : "1a1a1a";

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setOffsets(
        BUBBLES.map((b) => {
          const bx = (parseFloat(b.left) / 100) * rect.width;
          const by = (parseFloat(b.top)  / 100) * rect.height;
          const dx = mx - bx;
          const dy = my - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const angle = Math.atan2(by - my, bx - mx);
            const force = (140 - dist) / 140;
            return { x: Math.cos(angle) * force * 35, y: Math.sin(angle) * force * 35 };
          }
          return { x: 0, y: 0 };
        })
      );
    };
    const onLeave = () => setOffsets(BUBBLES.map(() => ({ x: 0, y: 0 })));

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const sectionHeight = isMobile ? 280 : isTablet ? 360 : 480;

  return (
    <div ref={sectionRef} style={{
      position: "relative", width: "100%", height: sectionHeight,
      backgroundColor: "rgba(6,6,8,0.35)",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      overflow: "hidden",
    }}>
      {BUBBLES.map((b, i) => {
        if (isMobile && !MOBILE_VISIBLE.has(b.name)) return null;
        const scaledB = isMobile
          ? { ...b, size: Math.round(b.size * 0.6), imgSize: Math.round(b.imgSize * 0.6) }
          : b;
        return (
          <div key={b.name + b.left}>
            <Bubble b={scaledB} offset={offsets[i]} logoColor={logoColor} isDark={isDark} />
          </div>
        );
      })}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 100% at center, transparent 40%, rgba(6,6,8,0.5) 100%)",
        pointerEvents: "none", zIndex: 2,
      }} />
    </div>
  );
};

export default FloatingLogos;

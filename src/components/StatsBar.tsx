import { useEffect, useRef, useState } from "react";

const STATS = [
  { end: 2,    label: "LIVE PRODUCTS RUNNING NOW",      suffix: "",  symbol: null },
  { end: 5,    label: "AI TOOLS SHIPPED WITH",           suffix: "+", symbol: null },
  { end: 3,    label: "YEARS OF FULL-STACK SHIPPING",   suffix: "+", symbol: null },
  { end: null, label: "IDEAS LEFT TO BUILD",            suffix: "",  symbol: "\u221e"  },
];

const StatItem = ({ stat, trigger, isLast, isFirst, index, isMobile }: { stat: typeof STATS[0]; trigger: boolean; isLast: boolean; isFirst: boolean; index: number; isMobile: boolean }) => {
  const [count, setCount] = useState(0);
  const [flash, setFlash] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!trigger || stat.end === null) return;
    const duration = 2000;
    let start: number;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setCount(Math.round(stat.end! * (1 - Math.pow(2, -10 * p))));
      if (p < 1) { requestAnimationFrame(step); }
      else { setCount(stat.end!); setFlash(true); setTimeout(() => { setFlash(false); setDone(true); }, 400); }
    };
    requestAnimationFrame(step);
  }, [trigger, stat.end]);

  const noBorderRight = isLast || (isMobile && index % 2 === 1);

  return (
    <div style={{ padding: isMobile ? "0 20px" : "0 48px", borderRight: noBorderRight ? "none" : "1px solid var(--border)" }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: isMobile ? "clamp(52px,12vw,72px)" : "clamp(72px,9vw,120px)",
        color: flash ? "#fff" : "var(--text)",
        lineHeight: 1,
        transition: flash ? "color 0.4s ease" : "none",
        fontVariantNumeric: "tabular-nums",
        WebkitFontSmoothing: "antialiased",
      }}>
        {stat.symbol ?? `${count}${stat.suffix}`}
      </div>
      {isFirst && done && (
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          color: "var(--text3)",
          letterSpacing: "0.08em",
          marginTop: 4,
          opacity: done ? 1 : 0,
          transition: "opacity 0.4s ease 0.4s",
        }}>
          + and counting
        </div>
      )}
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "var(--text2)", letterSpacing: "0.15em", marginTop: 14, textTransform: "uppercase" as const }}>
        {stat.label}
      </div>
    </div>
  );
};

const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(() => window.innerWidth < 1024);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth < 1024);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const padding = isMobile ? "48px 20px" : isTablet ? "64px 40px" : "88px 56px";

  return (
    <div ref={ref} style={{ background: "rgba(8,8,10,0.4)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: isMobile ? "32px 0" : 0,
      }}>
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} trigger={triggered} isLast={i === STATS.length - 1} isFirst={i === 0} index={i} isMobile={isMobile} />
        ))}
      </div>
    </div>
  );
};

export default StatsBar;

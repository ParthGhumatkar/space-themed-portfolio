import { useEffect, useRef, useState } from "react";

const STATS = [
  { end: 2,    label: "LIVE PRODUCTS RUNNING NOW",      suffix: "",  symbol: null },
  { end: 5,    label: "AI TOOLS SHIPPED WITH",           suffix: "+", symbol: null },
  { end: 3,    label: "YEARS OF FULL-STACK SHIPPING",   suffix: "+", symbol: null },
  { end: null, label: "IDEAS LEFT TO BUILD",            suffix: "",  symbol: "\u221e"  },
];

const StatItem = ({ stat, trigger, isLast, isFirst }: { stat: typeof STATS[0]; trigger: boolean; isLast: boolean; isFirst: boolean }) => {
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

  return (
    <div style={{ flex: 1, padding: "0 48px", borderRight: isLast ? "none" : "1px solid var(--border)" }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(72px,8vw,112px)",
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

  return (
    <div ref={ref} style={{ background: "rgba(8,8,10,0.75)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "80px 56px" }}>
      <div style={{ display: "flex" }}>
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} trigger={triggered} isLast={i === STATS.length - 1} isFirst={i === 0} />
        ))}
      </div>
    </div>
  );
};

export default StatsBar;

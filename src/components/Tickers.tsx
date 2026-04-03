const T1_ITEMS = [
  "FROM IDEA", "TO LIVE IN DAYS", "NEXT.JS", "TYPESCRIPT",
  "NEON POSTGRESQL", "VERCEL", "OPEN AI", "PYTHON", "FULL STACK DEVELOPER",
];
const T2_ITEMS = [
  "BUILDING THINGS", "PUNE INDIA", "ALWAYS SHIPPING",
  "TWO LIVE PRODUCTS", "EST. 2011", "OPEN TO WORK",
];

const SEP1 = <span style={{ color: "var(--green)", margin: "0 20px", flexShrink: 0 }}>·</span>;
const SEP2 = <span style={{ color: "var(--bg4)",   margin: "0 20px", flexShrink: 0 }}>·</span>;

const Strip = ({
  items,
  dir,
  color,
  sep,
}: {
  items: string[];
  dir: "left" | "right";
  color: string;
  sep: React.ReactNode;
}) => {
  const repeated = [...items, ...items, ...items];
  return (
    <div style={{ height: 44, overflow: "hidden", display: "flex", alignItems: "center" }}>
      <div className={`ticker-track ticker-${dir}`}>
        {repeated.map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              color,
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}>
              {item}
            </span>
            {sep}
          </span>
        ))}
      </div>
    </div>
  );
};

const Tickers = () => (
  <div style={{ background: "rgba(10,10,12,0.8)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
    <Strip items={T1_ITEMS} dir="left"  color="var(--text3)" sep={SEP1} />
    <div style={{ height: 1, background: "var(--border2)" }} />
    <Strip items={T2_ITEMS} dir="right" color="var(--text3)" sep={SEP2} />
  </div>
);

export default Tickers;

interface CodeWindowProps {
  filename: string;
  lines: Array<{ tokens: Array<{ text: string; cls?: string }> }>;
  comment: string;
}

const CodeWindow = ({ filename, lines, comment }: CodeWindowProps) => (
  <div className="code-window slide-code" style={{ width: "90%", maxWidth: 520 }}>
    <div className="code-tab">
      <span className="code-dot" style={{ background: "#ff5f57" }} />
      <span className="code-dot" style={{ background: "#febc2e" }} />
      <span className="code-dot" style={{ background: "#28c840" }} />
      <span style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11, color: "#555", marginLeft: 8,
      }}>{filename}</span>
    </div>
    <div className="code-body">
      <div style={{ marginBottom: 12 }}>
        <span className="syn-comment">{comment}</span>
      </div>
      {lines.map((line, i) => (
        <div key={i} style={{ minHeight: "1.7em" }}>
          {line.tokens.map((tok, j) => (
            <span key={j} className={tok.cls || "syn-fn"}>{tok.text}</span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default CodeWindow;

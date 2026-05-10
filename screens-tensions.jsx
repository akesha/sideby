// Tension screens (Section 2) and constellation summary.

function TensionScreen({ tension, data, onChange, vizStyle }) {
  const t = window.TENSIONS[tension];
  const valueKey = "tension." + t.id;
  const whyKey = "tension." + t.id + ".why";
  const value = data[valueKey];
  const setValue = (v) => onChange(valueKey, v);
  return (
    <div className="page page--full">
      <div className="tension">
        <div className="tension-eyebrow">
          <span className="seq">{t.number} / 06</span>
          <span>Tension</span>
        </div>
        <h2 className="tension-title">{t.title}</h2>
        <p className="tension-intro">{t.intro}</p>
        <TensionViz
          style={vizStyle}
          value={value}
          onChange={setValue}
          leftLabel={t.left}
          rightLabel={t.right}
          leftShort={t.leftShort}
          rightShort={t.rightShort}
        />
        <div className="tension-why">
          <Field
            id={whyKey}
            label="One sentence on why."
            placeholder={"\u201CI don\u2019t know\u201D is allowed but it has to be earned."}
            rows={3}
            value={data[whyKey]}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

function ConstellationScreen({ data, onChange }) {
  const tensions = window.TENSIONS;
  const W = 700;
  const H = 360;
  const margin = { top: 30, right: 24, bottom: 30, left: 24 };
  const innerW = W - margin.left - margin.right;
  const rowH = (H - margin.top - margin.bottom) / tensions.length;
  // Marks
  const marks = tensions.map((t, i) => {
    const v = data["tension." + t.id];
    const has = v != null;
    const x = margin.left + ((has ? v : 50) / 100) * innerW;
    const y = margin.top + i * rowH + rowH / 2;
    return { t, has, x, y, v };
  });
  // Average
  const have = marks.filter((m) => m.has);
  const avg = have.length ? have.reduce((s, m) => s + m.v, 0) / have.length : null;

  let summary = "";
  if (have.length === 0) summary = "No marks yet — go back to place yours.";
  else if (avg < 35) summary = "Your marks lean left — favoring speed and integration.";
  else if (avg > 65) summary = "Your marks lean right — favoring caution and student-centered design.";
  else summary = "Your marks cluster near the middle — a mixed, deliberative stance.";

  return (
    <div className="page page--narrow">
      <div className="eyebrow" style={{ color: "var(--accent)" }}>Look at your six marks together</div>
      <h2 className="h-section">Your constellation.</h2>
      <p className="body body--soft">
        Stand back from the page. {summary} A mix is fine and probably honest. Whatever pattern you see, write one sentence describing your overall position in your own words.
      </p>

      <svg className="constellation-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {/* row tracks */}
        {marks.map((m, i) => (
          <g key={m.t.id}>
            <line
              x1={margin.left} x2={W - margin.right}
              y1={m.y} y2={m.y}
              stroke="var(--rule)" strokeWidth="1"
            />
            <line x1={margin.left + innerW / 2} x2={margin.left + innerW / 2}
              y1={m.y - 4} y2={m.y + 4}
              stroke="var(--ink-muted)" strokeWidth="1"
            />
            {/* labels at edges */}
            <text x={margin.left} y={m.y - 10}
              fontFamily="var(--font-ui)" fontSize="10" fill="var(--ink-muted)"
              textAnchor="start" style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {m.t.leftShort}
            </text>
            <text x={W - margin.right} y={m.y - 10}
              fontFamily="var(--font-ui)" fontSize="10" fill="var(--ink-muted)"
              textAnchor="end" style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {m.t.rightShort}
            </text>
            <text x={margin.left + innerW / 2} y={m.y + 22}
              fontFamily="var(--font-ui)" fontSize="9" fill="var(--ink-muted)"
              textAnchor="middle" style={{ letterSpacing: "0.1em" }}>
              {m.t.number}
            </text>
            {/* mark */}
            {m.has && (
              <g>
                <circle cx={m.x} cy={m.y} r="14" fill="var(--accent-soft)" />
                <circle cx={m.x} cy={m.y} r="6" fill="var(--accent)" />
              </g>
            )}
            {!m.has && (
              <circle cx={margin.left + innerW / 2} cy={m.y} r="3"
                fill="none" stroke="var(--ink-muted)" strokeDasharray="2 2" />
            )}
          </g>
        ))}
        {/* connecting line through marks */}
        {have.length >= 2 && (
          <polyline
            points={marks.filter((m) => m.has).map((m) => `${m.x},${m.y}`).join(" ")}
            fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3"
            opacity="0.5"
          />
        )}
      </svg>

      <div style={{ marginTop: 32 }}>
        <Field
          id="overall.stance"
          label="My working stance on AI in my teaching, in one sentence"
          placeholder="The honest version, not the one you'd say out loud at a department meeting."
          rows={4}
          value={data["overall.stance"]}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

Object.assign(window, { TensionScreen, ConstellationScreen });

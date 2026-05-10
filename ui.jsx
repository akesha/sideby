// Shared UI primitives + autosave hook.

const STORAGE_KEY = "aixed.workbook.v1";

function useAutosave() {
  const [data, setData] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });
  React.useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }, [data]);
  const update = React.useCallback((key, value) => {
    setData((d) => ({ ...d, [key]: value }));
  }, []);
  const reset = React.useCallback(() => {
    if (confirm("Clear all your responses? This cannot be undone.")) {
      setData({});
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    }
  }, []);
  return [data, update, reset];
}

function Field({ id, label, placeholder, rows = 3, value, onChange }) {
  const v = value || "";
  if (rows <= 1) {
    return (
      <div>
        <div className="field-label">{label}</div>
        <input
          className="field-input"
          type="text"
          placeholder={placeholder}
          value={v}
          onChange={(e) => onChange(id, e.target.value)}
        />
      </div>
    );
  }
  return (
    <div>
      <div className="field-label">{label}</div>
      <textarea
        className="field-area"
        placeholder={placeholder}
        rows={rows}
        value={v}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  );
}

function Quote({ q, panelist }) {
  return (
    <div className="quote">
      <div className="avatar" data-speaker={panelist.id}>{panelist.initials}</div>
      <div>
        <p className="quote-body">{q.body}</p>
        <span className="quote-attr">— {q.attribution}</span>
      </div>
    </div>
  );
}

// Continuum slider — drag handle along a line, returns 0–100
function Continuum({ value, onChange, leftLabel, rightLabel, leftShort, rightShort }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const v = value == null ? 50 : value;
  const set = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    onChange(Math.round(pct));
  };
  React.useEffect(() => {
    if (!dragging) return;
    const move = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      set(x);
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  });
  const onTrackClick = (e) => {
    set(e.clientX);
  };
  const ticks = Array.from({ length: 11 }).map((_, i) => i);
  const lean = v < 40 ? leftShort : v > 60 ? rightShort : "balanced";
  return (
    <div>
      <div className="continuum">
        <div className="cont-pole left">{leftLabel}</div>
        <div className="cont-pole right">{rightLabel}</div>
        <div className="cont-track-wrap">
          <div className="cont-track" ref={trackRef} onMouseDown={(e) => { setDragging(true); set(e.clientX); }} onTouchStart={(e) => { setDragging(true); set(e.touches[0].clientX); }}>
            <div className="cont-fill" style={{ width: v + "%" }}></div>
            <div className="cont-ticks">
              {ticks.map((t) => (
                <div key={t} className={"cont-tick" + (t === 5 ? " major" : "")}></div>
              ))}
            </div>
            <div
              className={"cont-handle" + (dragging ? " dragging" : "")}
              style={{ left: v + "%" }}
              onMouseDown={(e) => { e.stopPropagation(); setDragging(true); }}
              onTouchStart={(e) => { e.stopPropagation(); setDragging(true); }}
            ></div>
          </div>
          <div className="cont-readout">
            you sit <strong>{lean}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dot scale variant — 7 dots
function DotScale({ value, onChange, leftLabel, rightLabel, leftShort, rightShort }) {
  // map 0–100 to 0..6
  const i = value == null ? 3 : Math.round((value / 100) * 6);
  const dots = [0, 1, 2, 3, 4, 5, 6];
  const lean = i < 3 ? leftShort : i > 3 ? rightShort : "balanced";
  return (
    <div>
      <div className="continuum">
        <div className="cont-pole left">{leftLabel}</div>
        <div className="cont-pole right">{rightLabel}</div>
        <div className="cont-track-wrap" style={{ paddingTop: 0 }}>
          <div className="dotscale">
            {dots.map((d) => (
              <button
                key={d}
                className={"dot-btn" + (i === d ? " selected" : "") + (d === 3 ? " middle" : "")}
                onClick={() => onChange(Math.round((d / 6) * 100))}
                aria-label={"option " + (d + 1)}
              ></button>
            ))}
          </div>
          <div className="cont-readout" style={{ marginTop: 16 }}>
            you sit <strong>{lean}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// Balance scale — pour weight onto left or right pan
function Balance({ value, onChange, leftLabel, rightLabel, leftShort, rightShort }) {
  const v = value == null ? 50 : value;
  // tilt: -8deg at v=0 (left heavy), +8deg at v=100 (right heavy). Wait — heavier on left should tip down on left.
  // v=100 means more right-leaning. Tilt right pan down -> beam rotates clockwise positive.
  const tilt = ((v - 50) / 50) * 7; // -7deg .. +7deg
  // weights — fill bars on each pan inversely
  const leftWeight = 100 - v; // 0..100
  const rightWeight = v;
  const lean = v < 40 ? leftShort : v > 60 ? rightShort : "balanced";
  return (
    <div>
      <div className="continuum">
        <div className="cont-pole left">{leftLabel}</div>
        <div className="cont-pole right">{rightLabel}</div>
        <div style={{ gridColumn: "1 / -1" }}>
          <div className="balance">
            <div className="balance-base"></div>
            <div className="balance-pivot"></div>
            <div className="balance-beam" style={{ transform: `translate(-50%, -50%) rotate(${tilt}deg)` }}>
              <div className="balance-pan left">
                <div className="balance-weight" style={{ height: (leftWeight * 0.55) + "px" }}></div>
              </div>
              <div className="balance-pan right">
                <div className="balance-weight" style={{ height: (rightWeight * 0.55) + "px" }}></div>
              </div>
            </div>
          </div>
          <input
            className="balance-knob"
            type="range" min="0" max="100" value={v}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
          />
          <div className="cont-readout">
            you sit <strong>{lean}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function TensionViz({ style, ...props }) {
  if (style === "dots") return <DotScale {...props} />;
  if (style === "balance") return <Balance {...props} />;
  return <Continuum {...props} />;
}

Object.assign(window, {
  STORAGE_KEY,
  useAutosave,
  Field,
  Quote,
  Continuum,
  DotScale,
  Balance,
  TensionViz,
});

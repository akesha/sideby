// Section 3: Apply it (pathway picker + pathway work)

function PathwayPickerScreen({ data, onChange }) {
  const selected = data["pathway.choice"];
  return (
    <div className="page page--narrow">
      <div className="section-num">Section 03</div>
      <h2 className="h-section">Apply it.</h2>
      <p className="body body--soft">
        Pick a pathway to start with. Each takes about 25 minutes. Pick the one that maps to a real problem you have right now, not the one that sounds most interesting in the abstract. <em>You can do more than one</em> — your responses to each are kept separately.
      </p>
      <div className="pathway-picker">
        {window.PATHWAYS.map((p) => {
          const hasWork = p.steps.some((s) => {
            const v = data["pathway." + p.id + "." + s.id];
            return v && String(v).trim().length > 0;
          });
          return (
            <div
              key={p.id}
              className={"pathway-card" + (selected === p.id ? " selected" : "")}
              onClick={() => onChange("pathway.choice", p.id)}
            >
              <div className="pathway-letter">{p.id}</div>
              <div>
                <h3 className="pathway-title">{p.title}</h3>
                <p className="pathway-subtitle">{p.subtitle}</p>
                <p className="pathway-when">{p.when}</p>
              </div>
              <div className="pathway-arrow">{hasWork ? "✎" : selected === p.id ? "→" : "→"}</div>
            </div>
          );
        })}
      </div>
      {!selected && (
        <p className="small" style={{ marginTop: 24, textAlign: "center" }}>
          Pick one to continue. You can come back and do another later.
        </p>
      )}
    </div>
  );
}

function PathwayWorkScreen({ data, onChange }) {
  const initial = data["pathway.choice"] || "A";
  const [active, setActive] = React.useState(initial);
  React.useEffect(() => {
    if (data["pathway.choice"] && data["pathway.choice"] !== active) {
      setActive(data["pathway.choice"]);
    }
    // eslint-disable-next-line
  }, [data["pathway.choice"]]);

  const p = window.PATHWAYS.find((x) => x.id === active) || window.PATHWAYS[0];

  const hasWork = (id) => window.PATHWAYS.find((x) => x.id === id).steps.some((s) => {
    const v = data["pathway." + id + "." + s.id];
    return v && String(v).trim().length > 0;
  });

  return (
    <div className="page page--narrow">
      <div className="eyebrow" style={{ color: "var(--accent)" }}>Pathway {p.id}</div>
      <h2 className="h-section">{p.title}</h2>
      <p className="body body--soft">{p.subtitle}</p>

      <div className="pathway-tabs" role="tablist">
        {window.PATHWAYS.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={active === x.id}
            className={"pathway-tab" + (active === x.id ? " active" : "") + (hasWork(x.id) ? " has-work" : "")}
            onClick={() => setActive(x.id)}
          >
            <span className="tab-letter">{x.id}</span>
            <span className="tab-title">{x.title}</span>
            {hasWork(x.id) && <span className="tab-mark" aria-label="started">●</span>}
          </button>
        ))}
      </div>

      <div className="example-box">
        <div className="example-label">{p.example.title}</div>
        <p className="example-body">{p.example.body}</p>
      </div>
      {p.steps.map((s, i) => (
        <div className="pathway-step" key={s.id}>
          <div className="step-num">Step {i + 1} · {s.id}</div>
          <h3 className="step-q">{s.label}</h3>
          <Field
            id={"pathway." + p.id + "." + s.id}
            label=""
            placeholder="Write here. Save is automatic."
            rows={s.rows}
            value={data["pathway." + p.id + "." + s.id]}
            onChange={onChange}
          />
        </div>
      ))}

      <div style={{ marginTop: 36, padding: "20px 24px", background: "var(--bg-soft)", borderRadius: "var(--radius-card)", textAlign: "center" }}>
        <p className="small" style={{ margin: 0 }}>
          Done with pathway {p.id}? You can <a
            href="#"
            onClick={(e) => { e.preventDefault(); const remaining = window.PATHWAYS.find((x) => x.id !== active && !hasWork(x.id)); if (remaining) setActive(remaining.id); }}
            style={{ color: "var(--accent)", borderBottom: "1px solid var(--accent-soft)", textDecoration: "none" }}
          >try another pathway</a> using the tabs above, or continue to commit.
        </p>
      </div>
    </div>
  );
}

Object.assign(window, { PathwayPickerScreen, PathwayWorkScreen });

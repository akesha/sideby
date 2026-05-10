// Bonus section: "What we didn't have time for"

function BonusScreen() {
  const panelistById = (id) => window.PANELISTS.find((p) => p.id === id) || window.MODERATOR;
  const akesha = window.BONUS.find((b) => b.speaker === "akesha");
  const yousuf = window.BONUS.find((b) => b.speaker === "yousuf");
  const anne = window.BONUS.find((b) => b.speaker === "anne");

  const renderEssay = (entry) => {
    const p = panelistById(entry.speaker);
    return (
      <article className="bonus-essay" key={entry.speaker}>
        <header className="bonus-essay-head">
          <div className="avatar avatar--lg" data-speaker={entry.speaker}>{p.initials}</div>
          <div>
            <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 4 }}>Afterword</div>
            <h3 className="bonus-name">{p.name}</h3>
            <p className="bonus-role">{p.role}</p>
          </div>
        </header>
        <p className="lede" style={{ marginTop: 28 }}>{entry.title}</p>
        <p className="small">{entry.deck}</p>
        {entry.sections.map((s, i) => (
          <section className="bonus-section" key={i}>
            <h4 className="bonus-h">{s.heading}</h4>
            {(s.body || []).map((para, j) => <p className="body" key={j}>{para}</p>)}
            {s.callout && <p className="bonus-callout">{s.callout}</p>}
            {(s.bodyAfter || []).map((para, j) => <p className="body" key={"a" + j}>{para}</p>)}
            {s.list && (
              <ol className="bonus-list">
                {s.list.map((it, j) => (
                  <li key={j}>
                    <strong className="bonus-list-label">{it.label}</strong>{" "}
                    <span>{it.body}</span>
                  </li>
                ))}
              </ol>
            )}
            {s.items && (
              <dl className="bonus-lines">
                {s.items.map((it, j) => (
                  <div key={j} className="bonus-line">
                    <dt>{it.tag}</dt>
                    <dd>{it.body}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        ))}
      </article>
    );
  };

  const renderPlaceholder = (entry) => {
    const p = panelistById(entry.speaker);
    return (
      <article className="bonus-pending" key={entry.speaker}>
        <header className="bonus-essay-head">
          <div className="avatar avatar--lg" data-speaker={entry.speaker}>{p.initials}</div>
          <div>
            <div className="eyebrow" style={{ color: "var(--ink-muted)", marginBottom: 4 }}>Coming soon</div>
            <h3 className="bonus-name">{p.name}</h3>
            <p className="bonus-role">{p.role}</p>
          </div>
        </header>
        <p className="bonus-pending-body">{entry.placeholder}</p>
        <div className="bonus-pending-rule"></div>
      </article>
    );
  };

  return (
    <div className="page page--narrow">
      <div className="eyebrow">Bonus</div>
      <h2 className="h-section">What we didn't have time for.</h2>
      <p className="body body--soft">
        Panels run sixty minutes. Thinking does not. Each panelist was asked to write the part they would have said if the clock had cooperated. Akesha's afterword is below. Yousuf's and Anne's will join when they are ready.
      </p>
      <hr className="hr" />
      {renderEssay(akesha)}
      {renderPlaceholder(yousuf)}
      {renderPlaceholder(anne)}
    </div>
  );
}

Object.assign(window, { BonusScreen });

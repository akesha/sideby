// Section screens: cover, panel, how-to, exchanges, section intros.

function CoverScreen({ onBegin, hasProgress }) {
  return (
    <div className="page page--full">
      <div className="cover">
        <div className="cover-inner">
          <div className="cover-meta">
            <span className="cover-byline">A self-paced workbook</span>
            <span className="dot"></span>
            <span className="cover-byline">60–75 minutes</span>
            <span className="dot"></span>
            <span className="cover-byline">sideby</span>
          </div>
          <h1 className="h-display">
            Teaching, <em>Learning,</em><br />
            and AI.
          </h1>
          <p className="lede" style={{ maxWidth: 580 }}>
            A short, deliberate workbook for educators thinking about how AI fits into their teaching. Drawn from a panel discussion on the <em>how</em>, not the <em>what</em>.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <button className="navbtn navbtn--primary" onClick={onBegin}>
              {hasProgress ? "Resume" : "Begin"} <span className="arrow">→</span>
            </button>
            <a href="Pick a Framing.html#top" style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--ink-soft)", borderBottom: "1px solid var(--rule)", textDecoration: "none", paddingBottom: 2 }}>
              Short on time? Read the panel as a 5-minute interactive →
            </a>
            <a href="Library.html" style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--ink-soft)", borderBottom: "1px solid var(--rule)", textDecoration: "none", paddingBottom: 2 }}>
              Browse the Library →
            </a>
          </div>
          <dl className="cover-promise">
            <div>
              <dt>You will need</dt>
              <dd>A course, program, or assignment you actually work on. Pick something real. Generic answers produce generic results.</dd>
            </div>
            <div>
              <dt>You will leave with</dt>
              <dd>A short statement of your <em>why</em>, a position on six tensions, a revised assignment or policy, and a one-page commitment with a date.</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function PanelInner() {
  return (
    <>
      <div className="eyebrow">The panel</div>
      <h2 className="h-section">Three educators learning, in public.</h2>
      <p className="lede">
        This workbook is built from a panel discussion on how educators are learning to incorporate AI into their work. The conversation focused on the <em>how</em> — how educators develop their own AI fluency, how that connects to student learning, and what habits help them stay current in a field that is changing weekly.
      </p>
      <div className="divider">Moderator</div>
      <div className="panelists" style={{ borderTop: 0, marginTop: 0 }}>
        <div className="panelist-row">
          <div className="avatar" data-speaker="kippy">{window.MODERATOR.initials}</div>
          <div>
            <div className="panelist-name">{window.MODERATOR.name}</div>
            <p className="panelist-role">{window.MODERATOR.role}</p>
            <p className="panelist-where">Asked the questions that shaped this workbook.</p>
          </div>
        </div>
      </div>
      <div className="divider">Panelists</div>
      <div className="panelists" style={{ borderTop: 0, marginTop: 0 }}>
        {window.PANELISTS.map((p) => (
          <div className="panelist-row" key={p.id}>
            <div className="avatar" data-speaker={p.id}>{p.initials}</div>
            <div>
              <div className="panelist-name">{p.name}</div>
              <p className="panelist-role">{p.role}</p>
              <p className="panelist-where">{p.where}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function HowInner() {
  return (
    <>
      <div className="eyebrow">How to use this</div>
      <h2 className="h-section">Plan for sixty to seventy-five minutes.</h2>
      <p className="body body--soft">
        You can do it in one sitting or break it into four shorter sessions. Your responses save automatically as you write. Pick a real course, program, or assignment to work on — generic answers produce generic results.
      </p>
      <div className="divider">What's inside</div>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 18 }}>
        {[
          { n: "01", t: "What was said", body: "Curated panel excerpts with reading prompts.", min: "15 min" },
          { n: "02", t: "Where you stand", body: "Values mapping on six tensions.", min: "15 min" },
          { n: "03", t: "Apply it", body: "A guided revision of one assignment, policy, or activity.", min: "25 min" },
          { n: "04", t: "Commit", body: "Your one-page commitment document.", min: "15 min" },
        ].map((s) => (
          <li key={s.n} style={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: 18, alignItems: "baseline", paddingBottom: 14, borderBottom: "1px solid var(--rule-soft)" }}>
            <span className="eyebrow tabular" style={{ color: "var(--accent)" }}>{s.n}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500 }}>{s.t}</div>
              <div className="small" style={{ marginTop: 4 }}>{s.body}</div>
            </div>
            <span className="small tabular">{s.min}</span>
          </li>
        ))}
      </ol>
      <div style={{
        marginTop: 40, padding: "22px 26px", background: "var(--accent-soft)",
        borderRadius: "var(--radius-card)", borderLeft: "2px solid var(--accent)",
      }}>
        <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 8 }}>A note before you start</div>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--ink)" }}>
          The panelists do not agree on everything. That is the point. This workbook is not designed to convince you that AI is good or bad for teaching. It is designed to help you make a clear, defensible decision in your own context, with your own students, for your own reasons. If your honest answer to a prompt is <em>"I don't know yet,"</em> write that down. It is a real position.
        </p>
      </div>
    </>
  );
}

function PanelScreen() {
  return <div className="page page--narrow"><PanelInner /></div>;
}

function HowScreen() {
  return <div className="page page--narrow"><HowInner /></div>;
}

function AboutScreen() {
  return (
    <div className="page page--narrow">
      <PanelInner />
      <hr className="hr" style={{ margin: "56px 0" }} />
      <HowInner />
    </div>
  );
}

function SectionPreamble({ n, title, body }) {
  return (
    <div className="section-preamble">
      <div className="section-num">{n}</div>
      <h2 className="h-section" style={{ fontSize: "clamp(32px, 4.4vw, 44px)", marginBottom: 20 }}>
        {title}
      </h2>
      <hr className="hr--short" />
      <p className="lede" style={{ fontSize: 18, fontStyle: "normal", color: "var(--ink)" }}>
        {body}
      </p>
    </div>
  );
}

function SectionIntroScreen({ page }) {
  return (
    <div className="page page--narrow">
      <div className="section-intro">
        <div className="section-num">{page.n}</div>
        <h1 className="h-section" style={{ fontSize: "clamp(40px, 5.5vw, 60px)", marginBottom: 28 }}>
          {page.title}
        </h1>
        <hr className="hr--short" />
        <p className="lede" style={{ fontSize: 22, fontStyle: "normal", color: "var(--ink)" }}>
          {page.body}
        </p>
      </div>
    </div>
  );
}

function ExchangeScreen({ exchange, data, onChange, preamble }) {
  const ex = window.EXCHANGES[exchange];
  const panelistById = (id) => window.PANELISTS.find((p) => p.id === id);
  return (
    <div className="page page--narrow">
      {preamble && <SectionPreamble {...preamble} />}
      <div className="eyebrow">Exchange {ex.number}</div>
      <h2 className="h-section">{ex.title}</h2>
      <p className="body body--soft">{ex.intro}</p>
      <div className="quote-stack">
        {ex.quotes.map((q, i) => (
          <Quote key={i} q={q} panelist={panelistById(q.speaker)} />
        ))}
      </div>
      <div className="prompt-block">
        <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 8 }}>{ex.prompt.title}</div>
        <p className="body" style={{ margin: "0 0 8px" }}>{ex.prompt.body}</p>
        <div className="prompt-fields">
          {ex.prompt.fields.map((f) => (
            <Field
              key={f.id}
              id={f.id}
              label={f.label}
              placeholder={f.placeholder}
              rows={f.rows}
              value={data[f.id]}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CoverScreen, PanelScreen, HowScreen, AboutScreen, SectionIntroScreen, ExchangeScreen, SectionPreamble });

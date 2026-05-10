// Section 4 (commit), reading list, facilitate, export.

function CommitScreen({ data, onChange }) {
  return (
    <div className="page page--narrow">
      <div className="section-num">Section 04</div>
      <h2 className="h-section">Commit.</h2>
      <p className="body body--soft" style={{ marginBottom: 36 }}>
        This is the page you keep. Fill it in, sign it, put it somewhere you will see it. The point is not to predict the future. The point is to make a decision concrete enough that you can tell, later, whether you followed through.
      </p>
      <div className="commit">
        <h3 className="commit-h">My commitment</h3>
        <p className="commit-deck">A working document, not a contract.</p>

        <div className="commit-block">
          <h3>Three things I will change</h3>
          <p className="hint">Small and specific. Not "rethink my grading." Try "add an annotation log to the source analysis assignment by week three."</p>
          <div className="changes">
            {[1, 2, 3].map((n) => (
              <div className="change-row" key={n}>
                <span className="num">{n}.</span>
                <Field id={"commit.change" + n} label="" placeholder="A change small enough to actually do." rows={3} value={data["commit.change" + n]} onChange={onChange} />
              </div>
            ))}
          </div>
        </div>

        <div className="commit-block">
          <h3>One thing I will watch for</h3>
          <p className="hint">A concern, blind spot, or equity question the panel raised that you are not sure you have a handle on yet. Name what evidence would tell you it is or is not a problem in your context.</p>
          <Field id="commit.watch" label="" placeholder="The thing you might miss." rows={4} value={data["commit.watch"]} onChange={onChange} />
        </div>

        <div className="commit-block">
          <h3>One person I will talk to</h3>
          <p className="hint">Anne, Akesha, and Yousuf all named peer learning as the move that worked. Not webinars. Not certificates. People.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            <Field id="commit.person.name" label="Name and role" placeholder="A real person." rows={1} value={data["commit.person.name"]} onChange={onChange} />
            <Field id="commit.person.ask" label="What I want to ask them" placeholder="One question." rows={1} value={data["commit.person.ask"]} onChange={onChange} />
          </div>
        </div>

        <div className="signature-line">
          <div className="sig-box">
            <div className="lbl">Date I will revisit this</div>
            <input
              className="sig-input"
              type="text"
              placeholder="No more than 90 days out."
              value={data["commit.date"] || ""}
              onChange={(e) => onChange("commit.date", e.target.value)}
            />
          </div>
          <div className="sig-box">
            <div className="lbl">Signature</div>
            <input
              className="sig-input"
              type="text"
              placeholder="Your name."
              value={data["commit.sig"] || ""}
              onChange={(e) => onChange("commit.sig", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadingScreen() {
  return (
    <div className="page page--narrow">
      <div className="eyebrow">After</div>
      <h2 className="h-section">Reading list.</h2>
      <p className="body body--soft">
        Each of these came up in the panel, either by name or by clear reference. Start with whichever sits closest to your six marks.
      </p>
      <div style={{ marginTop: 32 }}>
        {window.READING_LIST.map((sec, i) => (
          <div className="reading-section" key={i}>
            <div className="lbl">{sec.section}</div>
            {sec.note && <p className="small" style={{ marginTop: -4, marginBottom: 12 }}>{sec.note}</p>}
            {sec.items.map((it, j) => (
              <div className="reading-item" key={j}>
                <p className="title">{it.title}</p>
                <p className="author">{it.author}</p>
                {it.note && <p className="note">{it.note}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FacilitateScreen() {
  return (
    <div className="page page--narrow">
      <div className="eyebrow">After</div>
      <h2 className="h-section">Facilitate this with your team.</h2>
      <p className="body body--soft">
        If you want to run this as a live workshop, here are three formats that map onto the workbook. The self-paced version is the default; everything below is a remix.
      </p>
      <div style={{ marginTop: 32 }}>
        {window.FACILITATE.map((f) => (
          <div className="format-card" key={f.id}>
            <h3>{f.title}</h3>
            <p className="when">{f.when}</p>
            {f.steps.map((s, i) => (
              <div className="format-step" key={i}>
                <div className="time">{s.time}</div>
                <div className="body"><strong>{s.label}.</strong> {s.body}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 24, padding: "20px 24px", borderRadius: "var(--radius-card)",
        background: "var(--accent-soft)", borderLeft: "2px solid var(--accent)"
      }}>
        <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 8 }}>Pre-work and follow-up</div>
        <p className="body" style={{ margin: "0 0 8px", fontSize: 15 }}>
          <strong style={{ fontFamily: "var(--font-display)" }}>Pre-work:</strong> ask participants to bring one assignment and the prior 24 hours of their own AI use written down without judgment.
        </p>
        <p className="body" style={{ margin: 0, fontSize: 15 }}>
          <strong style={{ fontFamily: "var(--font-display)" }}>Follow-up:</strong> schedule a 30-minute check-in 60 days out. Ask each participant which of their three commitments held, which slipped, and what they learned from the slips. The slips are the data.
        </p>
      </div>
    </div>
  );
}

function ExportScreen({ data }) {
  const has = (k) => data[k] && String(data[k]).trim().length > 0;
  const ans = (k) => has(k) ? <p className="ans">{data[k]}</p> : <p className="ans empty">— not yet written —</p>;
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  const handlePrint = () => {
    window.print();
  };

  const workedPathways = window.PATHWAYS.filter((p) =>
    p.steps.some((s) => has("pathway." + p.id + "." + s.id))
  );

  return (
    <div className="page page--narrow">
      <div className="export-toolbar">
        <button className="export-btn" onClick={handlePrint}>↓ Print / save as PDF</button>
      </div>
      <div className="export-doc">
        <div className="eyebrow">Personal copy · {today}</div>
        <h1>Teaching, Learning, and AI</h1>
        <p style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>
          Signed by {data["commit.sig"] || <span className="empty">(unsigned)</span>}.
          Revisit on {data["commit.date"] || <span className="empty">(no date set)</span>}.
        </p>

        <h2>My why</h2>
        {ans("ex1.why")}

        <h2>One assignment, examined</h2>
        <h3>Assignment</h3>{ans("ex2.assignment")}
        <h3>Where the productive struggle lives</h3>{ans("ex2.struggle")}
        <h3>What AI might flatten</h3>{ans("ex2.flatten")}

        <h2>One triumph, one disaster</h2>
        <h3>Triumph</h3>{ans("ex3.triumph")}
        <h3>Rule it taught me</h3>{ans("ex3.triumph_rule")}
        <h3>Disaster or near-miss</h3>{ans("ex3.disaster")}
        <h3>Rule it taught me</h3>{ans("ex3.disaster_rule")}

        <h2>Where I stand on six tensions</h2>
        {window.TENSIONS.map((t) => {
          const v = data["tension." + t.id];
          return (
            <div key={t.id} style={{ borderTop: "1px solid var(--rule)", paddingTop: 14, marginTop: 14 }}>
              <h3 style={{ marginTop: 0 }}>{t.number}. {t.title}</h3>
              <div className="export-tension-row">
                <div className="pole">{t.leftShort}</div>
                <div className="vis">
                  <div className="vis-line"></div>
                  {v != null && <div className="vis-mark" style={{ left: v + "%" }}></div>}
                </div>
                <div className="pole right">{t.rightShort}</div>
              </div>
              {ans("tension." + t.id + ".why")}
            </div>
          );
        })}

        <h2>My working stance, in one sentence</h2>
        {ans("overall.stance")}

        {workedPathways.map((pathway) => (
          <React.Fragment key={pathway.id}>
            <h2>Pathway {pathway.id}: {pathway.title}</h2>
            {pathway.steps.map((s) => (
              <div key={s.id}>
                <h3>{s.id}. {s.label}</h3>
                {ans("pathway." + pathway.id + "." + s.id)}
              </div>
            ))}
          </React.Fragment>
        ))}

        <h2>My commitment</h2>
        <h3>Three things I will change</h3>
        {[1, 2, 3].map((n) => <div key={n}>{ans("commit.change" + n)}</div>)}
        <h3>One thing I will watch for</h3>{ans("commit.watch")}
        <h3>One person I will talk to</h3>
        {ans("commit.person.name")}
        <h3>What I want to ask them</h3>
        {ans("commit.person.ask")}

        <p style={{ marginTop: 48, fontSize: 13, color: "var(--ink-muted)", borderTop: "1px solid var(--rule)", paddingTop: 16 }}>
          Built from a panel discussion hosted by Side By Side. Quotes lightly edited. The framings, prompts, and pathways are this workbook's contribution.
        </p>
      </div>
    </div>
  );
}

Object.assign(window, { CommitScreen, ReadingScreen, FacilitateScreen, ExportScreen });

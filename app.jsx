// Main App: shell, navigation, autosave, tweaks panel.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "sage",
  "type": "serif",
  "tensionViz": "continuum"
}/*EDITMODE-END*/;

function App() {
  const [data, update, reset] = useAutosave();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Resume from last page if any
  const initialIdx = (() => {
    const saved = data["__page"];
    if (typeof saved === "number" && saved >= 0 && saved < window.PAGES.length) return saved;
    return 0;
  })();
  const [pageIdx, setPageIdx] = React.useState(initialIdx);

  React.useEffect(() => {
    update("__page", pageIdx);
  }, [pageIdx]);

  // Apply theme attrs to body
  React.useEffect(() => {
    document.body.dataset.palette = t.palette || "sage";
    document.body.dataset.type = t.type || "serif";
  }, [t.palette, t.type]);

  // Keyboard nav
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight") setPageIdx((i) => Math.min(window.PAGES.length - 1, i + 1));
      if (e.key === "ArrowLeft") setPageIdx((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const page = window.PAGES[pageIdx];
  const next = () => setPageIdx((i) => Math.min(window.PAGES.length - 1, i + 1));
  const prev = () => setPageIdx((i) => Math.max(0, i - 1));

  const renderPage = () => {
    switch (page.kind) {
      case "cover":
        return <CoverScreen onBegin={next} hasProgress={Object.keys(data).filter((k) => k !== "__page").length > 0} />;
      case "panel":
        return <PanelScreen />;
      case "how":
        return <HowScreen />;
      case "about":
        return <AboutScreen />;
      case "section-intro":
        return <SectionIntroScreen page={page} />;
      case "exchange":
        return <ExchangeScreen exchange={page.exchange} data={data} onChange={update} preamble={page.preamble} />;
      case "tension":
        return <TensionScreen tension={page.tension} data={data} onChange={update} vizStyle={t.tensionViz || "continuum"} />;
      case "tension-group":
        return <TensionGroupScreen tensions={page.tensions} data={data} onChange={update} vizStyle={t.tensionViz || "continuum"} preamble={page.preamble} />;
      case "constellation":
        return <ConstellationScreen data={data} onChange={update} />;
      case "pathway-pick":
        return <PathwayPickerScreen data={data} onChange={update} />;
      case "pathway-work":
        return <PathwayWorkScreen data={data} onChange={update} />;
      case "commit":
        return <CommitScreen data={data} onChange={update} />;
      case "bonus":
        return <BonusScreen />;
      case "reading":
        return <ReadingScreen />;
      case "facilitate":
        return <FacilitateScreen />;
      case "export":
        return <ExportScreen data={data} />;
      case "resources":
        return <ResourcesScreen data={data} />;
      default:
        return <div>Unknown page</div>;
    }
  };

  // Section indicator
  const currentSection = page.section;

  // Page label for nav
  const pageLabel = (p) => {
    if (!p) return "";
    if (p.kind === "cover") return "Cover";
    if (p.kind === "panel") return "The panel";
    if (p.kind === "how") return "How to use";
    if (p.kind === "about") return "About this workbook";
    if (p.kind === "section-intro") return p.title;
    if (p.kind === "exchange") return "Exchange " + (p.exchange + 1);
    if (p.kind === "tension") return "Tension " + (p.tension + 1) + "/6";
    if (p.kind === "tension-group") {
      const first = p.tensions[0] + 1;
      const last = p.tensions[p.tensions.length - 1] + 1;
      return "Tensions " + first + "\u2013" + last + "/6";
    }
    if (p.kind === "constellation") return "Your constellation";
    if (p.kind === "pathway-pick") return "Pick a pathway";
    if (p.kind === "pathway-work") {
      const c = data["pathway.choice"];
      return c ? "Pathway " + c : "Pathway";
    }
    if (p.kind === "commit") return "Commit";
    if (p.kind === "bonus") return "Bonus \u2014 afterwords";
    if (p.kind === "reading") return "Reading list";
    if (p.kind === "facilitate") return "Facilitate";
    if (p.kind === "export") return "Your copy";
    if (p.kind === "resources") return "Resources & your copy";
    return "";
  };

  // Section labels for pips
  const sectionPips = window.SECTIONS.map((s) => {
    const isActive = currentSection === s.n;
    const isDone = currentSection > s.n;
    return (
      <div key={s.n} className={"pip" + (isActive ? " active" : isDone ? " done" : "")} title={s.label}></div>
    );
  });

  return (
    <>
      <div className="app-bg"></div>
      <div className="shell">
        <header className="topbar">
          <a className="brand" href="index.html" aria-label="All materials">
            <div className="brand-mark"></div>
            <span className="brand-text">The Workbook</span>
          </a>
          <nav className="topbar-nav">
            <a href="Pick a Framing.html">Framings</a>
            <a href="Library.html">Library</a>
            <a href="Afterwords.html">Afterwords</a>
          </nav>
          <div className="progress">
            <span className="tabular">{String(pageIdx + 1).padStart(2, "0")} / {String(window.PAGES.length).padStart(2, "0")}</span>
            <div className="section-pips">{sectionPips}</div>
          </div>
        </header>

        <main className="main">
          <div className="page-outer" key={pageIdx}>
            {renderPage()}
          </div>
        </main>

        <div className="sponsor-strip">
          {window.SPONSOR.text}{" "}
          <a href={window.SPONSOR.url} target="_blank" rel="noopener noreferrer">{window.SPONSOR.label}</a>
        </div>

        <footer className="bottombar">
          <button className="navbtn" onClick={prev} disabled={pageIdx === 0}>
            <span className="arrow">←</span> Back
          </button>
          <div className="navposition">
            <span className="navlabel">{window.SECTIONS[currentSection].label}</span>
            <span className="where">{pageLabel(page)}</span>
          </div>
          <button className="navbtn navbtn--primary" onClick={next} disabled={pageIdx === window.PAGES.length - 1}>
            {pageIdx === window.PAGES.length - 1 ? "Done" : "Continue"} <span className="arrow">→</span>
          </button>
        </footer>
      </div>

      <TweaksPanel>
        <TweakSection label="Type" />
        <TweakRadio
          label="Family"
          value={t.type}
          options={[
            { value: "serif", label: "Serif" },
            { value: "sans", label: "Sans" },
            { value: "mixed", label: "Mixed" },
          ]}
          onChange={(v) => setTweak("type", v)}
        />

        <TweakSection label="Palette" />
        <TweakSelect
          label="Theme"
          value={t.palette}
          options={[
            { value: "sage", label: "Sage paper" },
            { value: "linen", label: "Linen" },
            { value: "cool", label: "Cool morning" },
            { value: "dusk", label: "Dusk" },
          ]}
          onChange={(v) => setTweak("palette", v)}
        />

        <TweakSection label="Section 2 visualization" />
        <TweakRadio
          label="Style"
          value={t.tensionViz}
          options={[
            { value: "continuum", label: "Slider" },
            { value: "dots", label: "Dots" },
            { value: "balance", label: "Scale" },
          ]}
          onChange={(v) => setTweak("tensionViz", v)}
        />

        <TweakSection label="Data" />
        <TweakButton label="Clear all responses" onClick={reset} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

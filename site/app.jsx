// app.jsx: top-level App, TweaksToggle, TweaksPanel, and root render.

const DEFAULTS = { palette: 'cream', accent: 'coral' };

function App() {
  const normalizePage = (id) => (
    id === 'timeline' && !window.FEATURE_FLAGS.timeline ? 'about' : id
  );
  const [page, setRawPage]          = React.useState(() => normalizePage(localStorage.getItem('ed_page') || 'about'));
  const [hasNavigated, setHasNavigated] = React.useState(false);
  const reducedMotion = window.useReducedMotion();
  const mainRef = React.useRef(null);
  const previousPageRef = React.useRef(page);
  const tweaksToggleRef = React.useRef(null);
  const supportsViewTransition = Boolean(!reducedMotion && document.startViewTransition);
  const setPage = (id) => {
    const next = normalizePage(id);
    if (next === page) return;
    const commitPage = () => {
      setRawPage(next);
      setHasNavigated(true);
    };
    if (supportsViewTransition) {
      document.startViewTransition(() => {
        if (window.ReactDOM && window.ReactDOM.flushSync) {
          window.ReactDOM.flushSync(commitPage);
        } else {
          commitPage();
        }
      });
    } else {
      commitPage();
    }
  };
  const [paletteKey, setPaletteKey] = React.useState(() => localStorage.getItem('ed_palette') || DEFAULTS.palette);
  const [accentKey, setAccentKey]   = React.useState(() => localStorage.getItem('ed_accent')  || DEFAULTS.accent);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  React.useEffect(() => { localStorage.setItem('ed_page',    page); },       [page]);
  React.useEffect(() => { localStorage.setItem('ed_palette', paletteKey); }, [paletteKey]);
  React.useEffect(() => { localStorage.setItem('ed_accent',  accentKey); },  [accentKey]);
  const palette = window.PALETTES[paletteKey] || window.PALETTES.cream;
  const viewport = window.useViewport();
  const compact = viewport.width < 1100;

  React.useEffect(() => {
    if (previousPageRef.current === page) return undefined;
    previousPageRef.current = page;
    const main = mainRef.current;
    if (!main) return undefined;
    main.scrollTop = 0;
    const heading = main.querySelector('[data-page-heading]');
    const frame = requestAnimationFrame(() => {
      if (heading) heading.focus({ preventScroll: true });
      if (compact) main.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [page, compact]);

  React.useEffect(() => {
    if (!tweaksOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setTweaksOpen(false);
      requestAnimationFrame(() => tweaksToggleRef.current?.focus());
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [tweaksOpen]);

  const PageComp = {
    about:    window.AboutPage,
    research: window.ResearchPage,
    work:     window.WorkPage,
    projects: window.ProjectsPage,
    timeline: window.TimelinePage,
  }[page];

  return (
    <window.MotionContext.Provider value={{
      animateEntrance: !hasNavigated || !supportsViewTransition,
      reducedMotion,
    }}>
    <div className="portfolio-app" style={{
      display: 'flex', minHeight: '100vh', background: palette.bg,
      color: palette.ink, fontFamily: 'Inter, system-ui, sans-serif',
      flexDirection: compact ? 'column' : 'row',
    }}>
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <window.Sidebar page={page} setPage={setPage}
        palette={palette} accentKey={accentKey} compact={compact} />

      <main ref={mainRef} id="main-content" tabIndex={-1}
        aria-labelledby={`page-heading-${page}`}
        className="app-scroll" style={{
        flex: 1, minWidth: 0, background: palette.bg,
        overflowY: 'auto', height: compact ? 'auto' : '100vh',
      }}>
        <PageComp palette={palette} setPage={setPage} />
      </main>

      <TweaksToggle buttonRef={tweaksToggleRef} open={tweaksOpen}
        onToggle={() => setTweaksOpen(o => !o)} palette={palette} />

      {tweaksOpen && (
        <TweaksPanel
          palette={palette}
          paletteKey={paletteKey}
          accentKey={accentKey}
          onPalette={setPaletteKey}
          onAccent={setAccentKey}
        />
      )}
    </div>
    </window.MotionContext.Provider>
  );
}

function TweaksToggle({ buttonRef, open, onToggle, palette }) {
  const P = palette;
  return (
    <button ref={buttonRef} type="button" onClick={onToggle}
      aria-label={open ? 'Close display tweaks' : 'Open display tweaks'}
      aria-expanded={open} aria-controls="display-tweaks"
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 101,
        width: 44, height: 44, borderRadius: '50%',
        background: P.paper, border: `1px solid ${P.rule}`,
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 14,
        color: P.ink, letterSpacing: 0.5,
        transition: 'transform .25s var(--ease-out-quart), border-color .2s var(--ease-out-quart)',
        transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = P.ink; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = P.rule; }}
    >
      {open ? '×' : '⚙'}
    </button>
  );
}

function TweaksPanel({ palette, paletteKey, accentKey, onPalette, onAccent }) {
  const P = palette, A = window.ACCENTS;
  return (
    <div id="display-tweaks" role="region" aria-label="Display tweaks" style={{
      position: 'fixed', bottom: 76, right: 20, width: 280,
      background: P.paper, border: `1px solid ${P.rule}`,
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      padding: '16px 18px', zIndex: 100, animation: 'slideInR 320ms var(--ease-out-quart) both',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
        letterSpacing: 1.4, color: P.inkMute, marginBottom: 12,
      }}>// TWEAKS</div>

      <div style={{
        fontFamily: '"Fraunces", serif', fontSize: 13, color: P.ink,
        marginBottom: 8, letterSpacing: -0.1,
      }}>Paper</div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
        {Object.keys(window.PALETTES).map(k => {
          const p = window.PALETTES[k];
          const active = paletteKey === k;
          return (
            <button key={k} type="button" aria-pressed={active}
              onClick={() => onPalette(k)} style={{
              flex: 1, padding: '10px 8px', cursor: 'pointer',
              minHeight: 44,
              background: p.bg, border: `1px solid ${active ? P.ink : P.rule}`,
              borderRadius: 0, textAlign: 'left',
              fontFamily: 'Inter, sans-serif', fontSize: 11,
              color: p.ink, letterSpacing: 0.2,
              boxShadow: active ? `inset 0 0 0 1px ${P.ink}` : 'none',
            }}>
              <div style={{ fontWeight: 500 }}>{k}</div>
              <div style={{ fontSize: 9, color: p.inkMute, marginTop: 2, fontFamily: '"JetBrains Mono", monospace' }}>
                {k === 'cream' ? 'warm' : 'cool'}
              </div>
            </button>
          );
        })}
      </div>

      <div style={{
        fontFamily: '"Fraunces", serif', fontSize: 13, color: P.ink,
        marginBottom: 8, letterSpacing: -0.1,
      }}>Signal accent</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {Object.entries(A).map(([k, v]) => {
          const active = accentKey === k;
          const textColor = window.ACCENT_TEXT[k] || v;
          return (
            <button key={k} type="button" aria-pressed={active}
              onClick={() => onAccent(k)} style={{
              flex: 1, padding: '8px 6px', cursor: 'pointer',
              minHeight: 44,
              background: P.bg, border: `1px solid ${active ? v : P.rule}`,
              borderRadius: 0, textAlign: 'center',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              color: active ? textColor : P.inkSoft, letterSpacing: 0.3,
            }}>
              <div aria-hidden="true" style={{
                width: 14, height: 14, background: v, borderRadius: '50%',
                margin: '2px auto 6px',
                boxShadow: active ? `0 0 0 3px ${v.replace(')', ' / 0.22)')}` : 'none',
              }} />
              {k}
            </button>
          );
        })}
      </div>

      <div style={{
        marginTop: 14, paddingTop: 10, borderTop: `1px dashed ${P.rule}`,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        color: P.inkMute, lineHeight: 1.5, letterSpacing: 0.2,
      }}>
        accent changes section emphasis. paper changes the mood.
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

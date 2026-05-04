// sidebar.jsx: persistent left column

window.Sidebar = function Sidebar({ page, setPage, palette, accentKey, compact = false }) {
  const P = palette;
  const A = window.ACCENTS;
  const { width } = window.useViewport();
  const narrow = compact && width < 680;
  const tiny = compact && width < 520;

  const pageAccent = (id) => A[window.PAGE_ACCENT[id]] || A[accentKey];

  const nav = [
    { id: 'about',    label: 'about' },
    { id: 'research', label: 'research' },
    { id: 'work',     label: 'work' },
    { id: 'projects', label: 'projects' },
    { id: 'timeline', label: 'timeline' },
  ].filter((n) => n.id !== 'timeline' || window.FEATURE_FLAGS.timeline);

  return (
    <aside style={{
      position: compact ? 'relative' : 'sticky', top: 0,
      height: compact ? 'auto' : '100vh',
      width: compact ? '100%' : 300, flexShrink: 0,
      borderRight: compact ? 'none' : `1px solid ${P.rule}`,
      borderBottom: compact ? `1px solid ${P.rule}` : 'none',
      background: P.bgAlt,
      display: 'flex', flexDirection: narrow ? 'column' : compact ? 'row' : 'column',
      padding: compact ? '18px 20px 16px' : '30px 26px',
      fontFamily: 'Inter, system-ui, sans-serif', color: P.ink,
      gap: narrow ? 14 : compact ? 18 : 0,
      alignItems: narrow ? 'stretch' : compact ? 'center' : 'stretch',
      overflowX: narrow ? 'visible' : compact ? 'auto' : 'visible',
    }}>
      <div style={{ minWidth: narrow ? 0 : compact ? 170 : 'auto' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 1.6,
          color: P.inkMute, marginBottom: 8,
        }}>PORTFOLIO</div>
        <div style={{
          fontFamily: '"Fraunces", Georgia, serif', fontSize: 34, lineHeight: 0.95,
          letterSpacing: -1, color: P.ink, fontWeight: 400,
        }}>Erik Dyer</div>
        <div style={{
          marginTop: 10, fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: P.inkMute, letterSpacing: 0.4, lineHeight: 1.7,
        }}>
          princeton · ece<br/>ai systems · infra
        </div>
      </div>

      <nav style={{
        borderTop: compact ? 'none' : `1px solid ${P.rule}`,
        paddingTop: compact ? 0 : 16,
        display: 'flex', flexDirection: compact ? 'row' : 'column',
        gap: narrow ? 6 : compact ? 8 : 2,
        flex: narrow ? '0 0 auto' : compact ? '1 0 auto' : '0 0 auto',
        width: narrow ? '100%' : 'auto',
        overflowX: narrow ? 'visible' : compact ? 'auto' : 'visible',
        flexWrap: narrow ? 'wrap' : 'nowrap',
      }}>
        {nav.map((n, i) => {
          const active = page === n.id;
          const nAcc = pageAccent(n.id);
          return (
            <button key={n.id} onClick={() => setPage(n.id)}
              aria-current={active ? 'page' : undefined}
              style={{
                textAlign: 'left', background: 'transparent', border: 'none',
                padding: tiny ? '8px 6px' : compact ? '8px 10px' : '8px 2px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: tiny ? 14 : 15,
                color: active ? P.ink : P.inkSoft,
                letterSpacing: -0.2, display: 'flex', alignItems: 'center', gap: 12,
                transition: 'color .2s',
                minHeight: 44,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = P.ink; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = P.inkSoft; }}
            >
              <span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                background: active ? nAcc : 'transparent',
                border: `1px solid ${nAcc}`,
                boxShadow: active ? `0 0 0 4px ${nAcc.replace(')', ' / 0.18)')}` : 'none',
                transition: 'all .2s',
              }} />
              <span style={{ flex: 1 }}>{n.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

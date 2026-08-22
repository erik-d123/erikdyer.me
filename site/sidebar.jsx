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
      flexWrap: compact ? 'wrap' : 'nowrap',
    }}>
      <div style={{ minWidth: narrow ? 0 : compact ? 170 : 'auto' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 1.6,
          color: P.inkMute, marginBottom: 8,
          animation: 'inkFade 360ms var(--ease-out-quart) both',
        }}>PORTFOLIO</div>
        <div style={{
          fontFamily: '"Fraunces", Georgia, serif', fontSize: 34, lineHeight: 0.95,
          letterSpacing: -1, color: P.ink, fontWeight: 400,
          animation: 'inkFade 500ms var(--ease-out-expo) both',
          animationDelay: '70ms',
        }}>Erik Dyer</div>
        <div style={{
          marginTop: 10, fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: P.inkMute, letterSpacing: 0.4, lineHeight: 1.7,
          animation: 'inkFade 380ms var(--ease-out-quart) both',
          animationDelay: '180ms',
        }}>
          princeton · ece<br/>ai systems · infra
        </div>
      </div>

      <nav aria-label="Portfolio sections" style={{
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
            <button key={n.id} type="button" onClick={() => setPage(n.id)}
              aria-current={active ? 'page' : undefined}
              style={{
                textAlign: 'left', background: 'transparent', border: 'none',
                padding: tiny ? '8px 6px' : compact ? '8px 10px' : '8px 2px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: tiny ? 14 : 15,
                color: active ? P.ink : P.inkSoft,
                letterSpacing: -0.2, display: 'flex', alignItems: 'center', gap: 12,
                transition: 'color .2s var(--ease-out-quart)',
                minHeight: 44,
                whiteSpace: 'nowrap',
                animation: 'inkFade 380ms var(--ease-out-quart) both',
                animationDelay: `${260 + i * 60}ms`,
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = P.ink; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = P.inkSoft; }}
            >
              <span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                background: active ? nAcc : 'transparent',
                border: `1px solid ${nAcc}`,
                boxShadow: active ? `0 0 0 4px ${nAcc.replace(')', ' / 0.18)')}` : 'none',
                transition: 'background-color .25s var(--ease-out-quart), box-shadow .25s var(--ease-out-quart)',
                viewTransitionName: active ? 'nav-active-dot' : undefined,
              }} />
              <span style={{ flex: 1 }}>{n.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{
        marginTop: compact ? 0 : 'auto',
        paddingTop: compact ? 8 : 16,
        borderTop: `1px dashed ${P.rule}`,
        display: 'flex', flexWrap: 'wrap', gap: compact ? 8 : 6,
        width: compact ? '100%' : 'auto',
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
        letterSpacing: 0.4,
        animation: 'inkFade 420ms var(--ease-out-quart) both',
        animationDelay: '520ms',
      }}>
        {Object.entries(window.CONTACT_LINKS).map(([k, href]) => (
          <a key={k} href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              color: P.inkMute, textDecoration: 'none',
              transition: 'color .2s var(--ease-out-quart)',
              display: 'inline-flex', alignItems: 'center', minHeight: 44,
              padding: '0 4px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = P.ink; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = P.inkMute; }}
          >{k}</a>
        ))}
      </div>
    </aside>
  );
};

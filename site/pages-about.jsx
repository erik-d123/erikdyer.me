// pages-about.jsx

window.PageShell = function PageShell({ palette, title, subtitle, accent, children }) {
  const P = palette;
  const { width } = window.useViewport();
  const compact = width < 1100;
  const narrow = width < 640;
  const { animateEntrance } = React.useContext(window.MotionContext);
  return (
    <div key={title} className={`page-shell ${animateEntrance ? 'page-shell--enter' : 'page-shell--settled'}`}>
      <div style={{
        padding: compact ? '34px 24px 24px' : '60px 72px 32px',
        borderBottom: `1px solid ${P.rule}`,
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: compact ? 20 : 40,
        alignItems: 'end',
      }}>
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 2,
            color: P.inkMute, marginBottom: 14,
          }}>
            <span style={{
              color: accent, display: 'inline-block',
              animation: 'dotPop 320ms var(--ease-out-quart) both',
              viewTransitionName: 'section-dot',
            }}>●</span>
            <span style={{
              marginLeft: 10, display: 'inline-block',
              animation: 'inkFade 360ms var(--ease-out-quart) both',
              animationDelay: '60ms',
              viewTransitionName: 'section-label',
            }}>{title.toUpperCase()}</span>
          </div>
          <h1 id={`page-heading-${title}`} className="page-heading" tabIndex={-1} data-page-heading style={{
            margin: 0, fontFamily: '"Fraunces", Georgia, serif', fontWeight: 400,
            fontSize: narrow ? 40 : compact ? 'clamp(44px, 8vw, 60px)' : 'clamp(52px, 6vw, 76px)',
            lineHeight: 1, letterSpacing: -1.2, color: P.ink,
            textWrap: 'pretty',
            animation: 'inkFade 600ms var(--ease-out-expo) both',
            animationDelay: '140ms',
            viewTransitionName: 'hero-title',
          }}>{subtitle}</h1>
        </div>
      </div>
      <div style={{
        padding: compact ? '30px 24px 72px' : '48px 72px 96px',
        animation: 'inkFade 500ms var(--ease-out-quart) both',
        animationDelay: '280ms',
      }}>{children}</div>
    </div>
  );
};

window.AboutPage = function AboutPage({ palette }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.about];
  const { width } = window.useViewport();
  const compact = width < 1100;

  return (
    <window.PageShell palette={P}
      title="about" accent={accent}
      subtitle={<><em style={{ color: accent }}>Backend systems</em> and applied ML</>}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? '1fr' : 'minmax(0, 1fr) minmax(390px, 0.82fr)',
        gap: compact ? 32 : 64, maxWidth: 1080, alignItems: 'start',
      }}>
        <div style={{ maxWidth: 650 }}>
          <p style={{
            margin: 0, fontSize: compact ? 18 : 20, lineHeight: 1.7,
            color: P.inkSoft, textWrap: 'pretty',
          }}>
            I build data and AI systems that have to work under real constraints:
            distributed metadata APIs, authorization infrastructure, agent evaluation,
            and synthetic perception pipelines.
          </p>
        </div>

        <aside style={{
          width: '100%', background: P.paper, border: `1px solid ${P.rule}`,
          padding: '26px 28px',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 1.4,
            color: P.inkMute, marginBottom: 16,
          }}>// CURRENT SNAPSHOT</div>
          {[
            ['school',   'Princeton, 2027'],
            ['degree',   'Electrical & Computer Eng.'],
            ['focus',    'distributed systems · applied ML'],
            ['industry', 'Databricks · Amazon · BlueHalo'],
          ].map(([k, v], i) => (
            <div key={k} style={{
              display: 'grid', gridTemplateColumns: '80px minmax(0, 1fr)', gap: 14,
              alignItems: 'baseline',
              padding: '9px 0', borderTop: i === 0 ? 'none' : `1px dashed ${P.rule}`,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
              animation: 'inkFade 420ms var(--ease-out-quart) both',
              animationDelay: `${380 + i * 55}ms`,
            }}>
              <span style={{ color: P.inkMute, letterSpacing: 0.3 }}>{k}</span>
              <span style={{ color: P.ink, textAlign: 'right' }}>{v}</span>
            </div>
          ))}
        </aside>
      </div>
    </window.PageShell>
  );
};

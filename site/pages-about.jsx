// pages-about.jsx

window.PageShell = function PageShell({ palette, title, subtitle, accent, children }) {
  const P = palette;
  const { width } = window.useViewport();
  const compact = width < 1100;
  const narrow = width < 640;
  return (
    <div key={title} style={{ animation: 'pageIn 500ms ease-out both' }}>
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
            <span style={{ color: accent }}>●</span>
            <span style={{ marginLeft: 10 }}>{title.toUpperCase()}</span>
          </div>
          <h1 style={{
            margin: 0, fontFamily: '"Fraunces", Georgia, serif', fontWeight: 400,
            fontSize: narrow ? 40 : compact ? 'clamp(44px, 8vw, 60px)' : 'clamp(52px, 6vw, 76px)',
            lineHeight: 1, letterSpacing: -1.2, color: P.ink,
            textWrap: 'pretty',
          }}>{subtitle}</h1>
        </div>
      </div>
      <div style={{ padding: compact ? '30px 24px 72px' : '48px 72px 96px' }}>{children}</div>
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
      subtitle={<><em style={{ color: accent }}>Electrical & Computer Engineering</em> at Princeton</>}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? '1fr' : 'minmax(0, 1fr) minmax(360px, 0.78fr)',
        gap: compact ? 24 : 56,
        maxWidth: 1080,
        alignItems: 'start',
      }}>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 18, lineHeight: 1.7,
          color: P.inkSoft, textWrap: 'pretty', maxWidth: 660,
        }}>
          <p style={{ marginTop: 0 }}>
            Junior at Princeton exploring how LLM agents coordinate and fail on long-horizon tasks. Drawn to the systems work that turns agents into reliable products: agent infrastructure, inference, and the problems underneath
          </p>
        </div>

        <aside style={{
          background: P.paper, border: `1px solid ${P.rule}`,
          padding: '26px 28px', alignSelf: 'start',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 1.4,
            color: P.inkMute, marginBottom: 16,
          }}>// CURRENT SNAPSHOT</div>
          {[
            ['school',   'Princeton, 2027'],
            ['degree',   'Electrical & Computer Eng.'],
            ['lane',     'agents · ML systems'],
            ['builds',   'evals · agent infra · serving'],
            ['industry', 'Databricks · Amazon · BlueHalo'],
          ].map(([k, v], i) => (
            <div key={k} style={{
              display: 'grid', gridTemplateColumns: '72px minmax(0, 1fr)', gap: 16,
              alignItems: 'baseline',
              padding: '9px 0', borderTop: i === 0 ? 'none' : `1px dashed ${P.rule}`,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
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

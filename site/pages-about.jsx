// pages-about.jsx

window.PageShell = function PageShell({ palette, title, subtitle, accent, children }) {
  const P = palette;
  const { width } = window.useViewport();
  const compact = width < 900;
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
            fontSize: narrow ? 42 : 'clamp(48px, 7vw, 64px)',
            lineHeight: 1, letterSpacing: -1.2, color: P.ink,
            textWrap: 'pretty',
          }}>{subtitle}</h1>
        </div>
      </div>
      <div style={{ padding: compact ? '30px 24px 72px' : '48px 72px 96px' }}>{children}</div>
    </div>
  );
};

window.AboutPage = function AboutPage({ palette, setPage }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.about];
  const { width } = window.useViewport();
  const compact = width < 900;

  return (
    <window.PageShell palette={P}
      title="about" accent={accent}
      subtitle={<>I work on <em style={{ color: accent }}>AI systems</em> that need to be measured, debugged, and shipped.</>}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? '1fr' : '1.35fr 1fr',
        gap: compact ? 28 : 64,
        maxWidth: 1080,
        alignItems: 'start',
      }}>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 16.5, lineHeight: 1.75,
          color: P.inkSoft, textWrap: 'pretty',
        }}>
          <p style={{ marginTop: 0 }}>
            I'm a junior in Princeton ECE. I split my time between NLP research, vision research, systems coursework, and infrastructure internships.
          </p>
          <p>
            The common thread is practical evaluation. I like work where the first answer is not enough: long-horizon agents that need a real benchmark, LiDAR pipelines that need clean data contracts, infrastructure that has to stay correct under scale.
          </p>
          <p style={{ marginBottom: 0 }}>
            Recently that has meant LLM agents in Princeton NLP, synthetic indoor LiDAR in PVL, AWS IAM, and Unity Catalog at Databricks.
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
            ['school',   'Princeton ECE, 2027'],
            ['research', 'LLM agents · 3D perception'],
            ['labs',     'NLP · Vision & Learning'],
            ['industry', 'Databricks · Amazon · BlueHalo'],
            ['focus',    'evals · data pipelines · infra'],
            ['tools',    'Python · Java · Rust · TypeScript · C'],
          ].map(([k, v], i) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              padding: '9px 0', borderTop: i === 0 ? 'none' : `1px dashed ${P.rule}`,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
            }}>
              <span style={{ color: P.inkMute, letterSpacing: 0.3 }}>{k}</span>
              <span style={{ color: P.ink }}>{v}</span>
            </div>
          ))}
        </aside>
      </div>

      <div style={{
        marginTop: compact ? 44 : 72,
        display: 'grid',
        gridTemplateColumns: compact ? '1fr' : 'repeat(3, 1fr)',
        gap: 20,
        maxWidth: 1080,
      }}>
        {[
          { key: 'research', label: 'research', note: 'LLM agents, long-context evaluation, and 3D perception', acc: A[window.PAGE_ACCENT.research] },
          { key: 'work',     label: 'work',     note: 'Databricks, Amazon IAM, and BlueHalo ML infrastructure', acc: A[window.PAGE_ACCENT.work] },
          { key: 'projects', label: 'projects', note: 'Coursework and research code worth opening', acc: A[window.PAGE_ACCENT.projects] },
        ].map(c => (
          <button key={c.key} onClick={() => setPage(c.key)} style={{
            textAlign: 'left', background: P.paper, border: `1px solid ${P.rule}`,
            padding: '22px 24px', cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all .2s', position: 'relative',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = c.acc; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = P.rule; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              letterSpacing: 1.4, color: c.acc, marginBottom: 18,
            }}>{c.label.toUpperCase()}</div>
            <div style={{
              fontFamily: '"Fraunces", serif', fontSize: 28, letterSpacing: -0.6,
              color: P.ink, marginBottom: 6, fontWeight: 400,
            }}>{c.label}</div>
            <div style={{ fontSize: 13, color: P.inkSoft, lineHeight: 1.55 }}>{c.note}</div>
            <div style={{
              position: 'absolute', top: 22, right: 24, fontSize: 18, color: c.acc,
            }}>→</div>
          </button>
        ))}
      </div>
    </window.PageShell>
  );
};

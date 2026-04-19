// pages-about.jsx

window.PageShell = function PageShell({ palette, plate, title, subtitle, accent, mode, page, children }) {
  const P = palette;
  return (
    <div key={title} style={{ animation: 'pageIn 500ms ease-out both' }}>
      <div style={{
        padding: '60px 72px 32px', borderBottom: `1px solid ${P.rule}`,
        display: 'grid', gridTemplateColumns: '1fr 260px', gap: 40, alignItems: 'end',
      }}>
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: 2,
            color: P.inkMute, marginBottom: 14,
          }}>
            <span style={{ color: accent }}>●</span>
            <span style={{ marginLeft: 10 }}>PLATE {plate} ·</span>
            <span style={{ marginLeft: 8 }}>{title.toUpperCase()}</span>
          </div>
          <h1 style={{
            margin: 0, fontFamily: '"Fraunces", Georgia, serif', fontWeight: 400,
            fontSize: 64, lineHeight: 1, letterSpacing: -1.6, color: P.ink,
            textWrap: 'pretty',
          }}>{subtitle}</h1>
        </div>
        {/* mini figure echo in the header, tinted */}
        <div style={{ color: accent, opacity: 0.35, height: 120, overflow: 'hidden' }}>
          <window.Figure mode={mode} page={page} color={accent}
            style={{ width: '100%', height: 260, marginTop: -70 }} />
        </div>
      </div>
      <div style={{ padding: '48px 72px 96px' }}>{children}</div>
    </div>
  );
};

window.AboutPage = function AboutPage({ palette, setPage, mode }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.about];

  return (
    <window.PageShell palette={P} plate="I" page="about" mode={mode}
      title="about" accent={accent}
      subtitle={<>Junior at <em style={{ color: accent }}>Princeton</em>, studying ECE and Neuroscience. I build AI systems and think a lot about how biology got there first.</>}
    >
      <div style={{
        display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 64, maxWidth: 1080,
        alignItems: 'start',
      }}>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 16.5, lineHeight: 1.75,
          color: P.inkSoft, textWrap: 'pretty',
        }}>
          <p style={{ marginTop: 0 }}>
            I'm most interested in where <span style={{ color: P.ink, fontWeight: 500 }}>intelligent systems</span> meet <span style={{ color: P.ink, fontWeight: 500 }}>living ones</span>. That shows up for me as LLM agents that have to coordinate, computer-vision stacks trying to understand 3D space, and the quiet infrastructure that lets any of it actually run.
          </p>
          <p>
            Summers I work on infra teams at big companies (<span style={{ color: P.ink }}>BlueHalo</span>, <span style={{ color: P.ink }}>Amazon</span>, <span style={{ color: P.ink }}>Databricks</span>). Semesters I'm in two labs at Princeton. In between I read a lot of Cajal plates and old papers and try to build small things.
          </p>
          <p style={{ marginBottom: 0 }}>
            If you care about any of this — agents, vision, systems, biology — say hi.
          </p>
        </div>

        <aside style={{
          background: P.paper, border: `1px solid ${P.rule}`,
          padding: '26px 28px', alignSelf: 'start',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 1.4,
            color: P.inkMute, marginBottom: 16,
          }}>// FIELD NOTES</div>
          {[
            ['field',    'ECE + Neuroscience'],
            ['class',    '2027'],
            ['labs',     'Princeton NLP · PVL'],
            ['summers',  'BlueHalo → Amazon → Databricks'],
            ['location', 'Princeton, NJ'],
            ['stack',    'Python · Rust · TypeScript · C'],
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
        marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
        maxWidth: 1080,
      }}>
        {[
          { key: 'research', plate: 'II',  label: 'research',  note: 'Two labs, senior thesis in progress.', acc: A[window.PAGE_ACCENT.research], n: '02' },
          { key: 'work',     plate: 'III', label: 'work',      note: 'Three summers on infrastructure teams.', acc: A[window.PAGE_ACCENT.work], n: '03' },
          { key: 'projects', plate: 'IV',  label: 'projects',  note: 'Small systems I build for myself.', acc: A[window.PAGE_ACCENT.projects], n: '04' },
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
            }}>PLATE {c.plate} → {c.n}</div>
            <div style={{
              fontFamily: '"Fraunces", serif', fontSize: 28, letterSpacing: -0.6,
              color: P.ink, marginBottom: 6, fontWeight: 400,
            }}>{c.label}.</div>
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

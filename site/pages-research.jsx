// pages-research.jsx

window.ResearchPage = function ResearchPage({ palette }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.research];
  const textAccent = window.ACCENT_TEXT[window.PAGE_ACCENT.research] || accent;
  const { width } = window.useViewport();
  const compact = width < 760;

  const labs = [
    {
      id: 'nlp',
      name: 'Princeton NLP Lab',
      advisor: 'Karthik R. Narasimhan',
      role: 'Undergraduate Researcher',
      period: '2026 to present',
      topic: 'Agent Evaluation & Coordination',
      desc: 'Evaluating long-horizon AI agents to characterize error compounding, context drift, and recovery failures',
      tags: ['llm agents', 'benchmarks', 'context', 'evaluation'],
    },
    {
      id: 'pvl',
      name: 'Princeton Vision & Learning Lab',
      advisor: 'Jia Deng',
      role: 'Undergraduate Researcher',
      period: '2024 to present',
      topic: '3D Perception & Synthetic Data',
      desc: 'Added material-aware LiDAR simulation with pose and semantic ground truth to Infinigen, contributing to an 8.4% reduction in learned SLAM localization error through procedural pretraining',
      tags: ['3d vision', 'lidar', 'slam', 'point clouds'],
    },
  ];

  return (
    <window.PageShell palette={P}
      title="research" accent={accent}
      subtitle={<><em style={{ color: accent }}>Agent evaluation</em> and 3D perception</>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 1000 }}>
        {labs.map((lab, i) => (
          <article key={lab.id} style={{
            display: 'grid',
            gridTemplateColumns: compact ? '1fr' : '160px 1fr',
            gap: compact ? 18 : 48,
            padding: compact ? '28px 0' : '34px 0',
            borderTop: i === 0 ? 'none' : `1px solid ${P.rule}`,
            animation: 'inkFade 460ms var(--ease-out-quart) both',
            animationDelay: `${320 + i * 90}ms`,
          }}>
            <div style={{ position: 'relative', paddingTop: 4 }}>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                letterSpacing: 1, color: textAccent, marginBottom: 8,
              }}>{lab.period}</div>
              <div style={{
                fontFamily: '"Fraunces", serif', fontStyle: 'italic',
                fontSize: 15, color: P.inkSoft, lineHeight: 1.4,
              }}>{lab.role}</div>
            </div>

            <div>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap',
                marginBottom: 8,
              }}>
                <h2 style={{
                  margin: 0, fontFamily: '"Fraunces", serif', fontWeight: 400,
                  fontSize: 40, letterSpacing: -1, color: P.ink,
                }}>{lab.name}</h2>
              </div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                color: P.inkMute, letterSpacing: 0.6, marginBottom: 14,
              }}>
                ADVISED BY <span style={{ color: P.ink }}>{lab.advisor}</span>
                <span style={{ margin: '0 10px', color: P.inkMute }}>·</span>
                TOPIC <span style={{ color: textAccent }}>{lab.topic.toUpperCase()}</span>
              </div>

              <p style={{
                margin: 0, fontSize: 16, lineHeight: 1.75, color: P.inkSoft,
                maxWidth: 640, textWrap: 'pretty',
              }}>{lab.desc}</p>

              <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {lab.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                    padding: '3px 9px', border: `1px solid ${P.rule}`,
                    color: P.inkSoft, letterSpacing: 0.3, background: P.paper,
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </window.PageShell>
  );
};

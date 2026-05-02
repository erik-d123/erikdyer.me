// pages-research.jsx

window.ResearchPage = function ResearchPage({ palette }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.research];
  const { width } = window.useViewport();
  const compact = width < 760;

  const labs = [
    {
      id: 'nlp',
      name: 'Princeton NLP',
      advisor: 'Karthik R. Narasimhan',
      role: 'Senior Thesis',
      period: '2025 to present',
      topic: 'Multi-Agent Systems',
      desc: 'Studying how LLM agents coordinate under long-horizon task pressure. Current work focuses on grounded handoff memory, benchmark design, and evaluation protocols that separate useful coordination from impressive-looking transcripts.',
      tags: ['llm agents', 'benchmarks', 'memory', 'evaluation'],
    },
    {
      id: 'pvl',
      name: 'Princeton Vision & Learning',
      advisor: 'Jia Deng',
      role: 'Undergraduate Researcher',
      period: '2024 to 2025',
      topic: 'Computer Vision, SLAM & Segmentation',
      desc: 'Research engineering for 3D scene understanding. Recent work has centered on synthetic indoor LiDAR, odometry pipeline debugging, Pointcept-compatible point clouds, and evaluation contracts for spatial models.',
      tags: ['3d vision', 'lidar', 'slam', 'point clouds'],
    },
  ];

  return (
    <window.PageShell palette={P}
      title="research" accent={accent}
      subtitle={<>Two labs, one <em style={{ color: accent }}>through-line.</em> Evaluation has to be as real as the model.</>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 1000 }}>
        {labs.map((lab, i) => (
          <article key={lab.id} style={{
            display: 'grid',
            gridTemplateColumns: compact ? '1fr' : '160px 1fr',
            gap: compact ? 18 : 48,
            padding: '36px 0', borderTop: i === 0 ? 'none' : `1px solid ${P.rule}`,
          }}>
            <div style={{ position: 'relative', paddingTop: 4 }}>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                letterSpacing: 1, color: accent, marginBottom: 8,
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
                TOPIC <span style={{ color: accent }}>{lab.topic.toUpperCase()}</span>
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

      <div style={{
        marginTop: 64, maxWidth: 760, paddingTop: 28,
        borderTop: `1px solid ${P.rule}`,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          letterSpacing: 1.4, color: P.inkMute, marginBottom: 12,
        }}>CURRENT THREADS</div>
        <blockquote style={{
          margin: 0, fontFamily: '"Fraunces", serif', fontStyle: 'italic',
          fontSize: 22, lineHeight: 1.5, color: P.inkSoft, textWrap: 'pretty',
        }}>
          Long-horizon agents, long-context reasoning, and spatial perception all fail in ways that look fine until the evaluation gets specific.
        </blockquote>
      </div>
    </window.PageShell>
  );
};

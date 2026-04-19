// pages-research.jsx

window.ResearchPage = function ResearchPage({ palette, mode }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.research];

  const labs = [
    {
      id: 'nlp',
      name: 'Princeton NLP',
      advisor: 'Karthik R. Narasimhan',
      role: 'Senior Thesis',
      period: '2025 — present',
      topic: 'Multi-Agent Systems',
      desc: 'Exploring how LLM agents coordinate — when structure emerges, when it collapses, and which communication primitives actually hold up under load. Building evaluation harnesses and ablations for agent collectives.',
      tags: ['llm agents', 'coordination', 'evaluation'],
    },
    {
      id: 'pvl',
      name: 'Princeton Vision & Learning',
      advisor: 'Jia Deng',
      role: 'Undergraduate Researcher',
      period: '2024 — 2025',
      topic: 'Computer Vision — SLAM & Segmentation',
      desc: '3D scene understanding. Pushing on SLAM and semantic segmentation methods with an eye toward more robust spatial priors.',
      tags: ['slam', 'segmentation', '3d vision'],
    },
  ];

  return (
    <window.PageShell palette={P} plate="II" page="research" mode={mode}
      title="research" accent={accent}
      subtitle={<>Two labs. One <em style={{ color: accent }}>thesis in progress.</em> Both about systems that have to make sense of something bigger than themselves.</>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 1000 }}>
        {labs.map((lab, i) => (
          <article key={lab.id} style={{
            display: 'grid', gridTemplateColumns: '160px 1fr', gap: 48,
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
        }}>MARGINALIA</div>
        <blockquote style={{
          margin: 0, fontFamily: '"Fraunces", serif', fontStyle: 'italic',
          fontSize: 22, lineHeight: 1.5, color: P.inkSoft, textWrap: 'pretty',
        }}>
          "Nature doesn't produce a monolithic algorithm. It produces systems
          that somehow still add up to one."
        </blockquote>
      </div>
    </window.PageShell>
  );
};

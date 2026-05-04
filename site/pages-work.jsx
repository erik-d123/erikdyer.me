// pages-work.jsx

window.WorkPage = function WorkPage({ palette }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.work];
  const { width } = window.useViewport();
  const compact = width < 760;

  const jobs = [
    {
      co: 'Databricks',
      role: 'Software Engineer Intern',
      team: 'Unity Catalog',
      loc: 'Seattle, WA',
      period: 'May 2026 to Aug 2026',
      tag: 'incoming',
      desc: 'Incoming on Unity Catalog, the governance and access-control layer for data and AI at lake scale',
      stack: ['scala', 'spark', 'catalog', 'distributed systems'],
    },
    {
      co: 'Amazon',
      role: 'Software Development Engineer Intern',
      team: 'Identity & Access Management',
      loc: 'Seattle, WA',
      period: 'May 2025 to Aug 2025',
      desc: 'Worked on AWS IAM, the identity and policy engine that brokers access for AWS API calls at cloud scale',
      stack: ['java', 'aws', 'authz', 'distributed services'],
    },
    {
      co: 'BlueHalo',
      role: 'Software Engineer Intern',
      team: 'ML Inference Systems',
      loc: 'Remote',
      period: 'May 2024 to Aug 2024',
      desc: 'Built inference infrastructure for production computer vision models, optimizing throughput and latency for real-time deployment',
      stack: ['python', 'pytorch', 'triton', 'cv'],
    },
  ];

  return (
    <window.PageShell palette={P}
      title="work" accent={accent}
      subtitle={<><em style={{ color: accent }}>Infrastructure</em> for AI systems</>}
    >
      <div style={{ maxWidth: 1040, position: 'relative' }}>
        {!compact && <div style={{
          position: 'absolute', left: 180, top: 0, bottom: 0, width: 1,
          background: P.rule,
        }} />}
        {jobs.map((j, i) => (
          <article key={j.co} style={{
            position: 'relative', display: 'grid',
            gridTemplateColumns: compact ? '1fr' : '160px 40px 1fr',
            gap: compact ? 14 : 0,
            padding: '36px 0', borderBottom: i === jobs.length - 1 ? 'none' : `1px dashed ${P.rule}`,
          }}>
            <div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                color: accent, letterSpacing: 0.8, marginBottom: 6,
              }}>{j.period.split(' to ')[0]}</div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                color: P.inkMute, letterSpacing: 0.8,
              }}>to {j.period.split(' to ')[1]}</div>
              {j.tag && (
                <div style={{
                  display: 'inline-block', marginTop: 10,
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                  padding: '3px 8px', border: `1px solid ${accent}`,
                  color: accent, letterSpacing: 1,
                }}>{j.tag.toUpperCase()}</div>
              )}
            </div>
            {!compact && <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 16, top: 6,
                width: 14, height: 14, borderRadius: '50%',
                background: P.bg, border: `2px solid ${accent}`,
                boxShadow: `0 0 0 5px ${accent.replace(')', ' / 0.12)')}`,
              }} />
            </div>}
            <div style={{ paddingLeft: compact ? 0 : 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <h2 style={{
                  margin: 0, fontFamily: '"Fraunces", serif', fontWeight: 400,
                  fontSize: 42, letterSpacing: -1, color: P.ink,
                }}>{j.co}</h2>
                <span style={{
                  fontFamily: '"Fraunces", serif', fontStyle: 'italic',
                  fontSize: 19, color: accent,
                }}>· {j.team}</span>
              </div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                color: P.inkMute, letterSpacing: 0.6, marginTop: 6,
              }}>{j.role.toUpperCase()} · {j.loc.toUpperCase()}</div>
              <p style={{
                margin: '16px 0 0', fontSize: 16, lineHeight: 1.75, color: P.inkSoft,
                maxWidth: 640, textWrap: 'pretty',
              }}>{j.desc}</p>
              <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {j.stack.map(s => (
                  <span key={s} style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                    padding: '3px 9px', border: `1px solid ${P.rule}`,
                    color: P.inkSoft, letterSpacing: 0.3, background: P.paper,
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{
        marginTop: 56, padding: '28px 32px', background: P.paper,
        border: `1px solid ${P.rule}`, maxWidth: 1040,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 20, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            letterSpacing: 1.4, color: P.inkMute, marginBottom: 6,
          }}>// APPENDIX</div>
          <div style={{
            fontFamily: '"Fraunces", serif', fontSize: 22,
            letterSpacing: -0.4, color: P.ink,
          }}>Resume</div>
        </div>
        <a href="https://drive.google.com/file/d/1yym7v8DOnX1Zk_fqZzd2ga_3XL06BaVl/view?usp=sharing"
          target="_blank" rel="noopener noreferrer" style={{
          textDecoration: 'none', padding: '12px 22px',
          background: P.ink, color: P.bg, fontFamily: 'Inter, sans-serif',
          fontSize: 14, fontWeight: 500, letterSpacing: 0.2,
          display: 'inline-flex', alignItems: 'center', gap: 10,
        }}>resume.pdf ↗</a>
      </div>
    </window.PageShell>
  );
};

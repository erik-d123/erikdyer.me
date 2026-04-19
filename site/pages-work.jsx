// pages-work.jsx

window.WorkPage = function WorkPage({ palette, mode }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.work];

  const jobs = [
    {
      co: 'Databricks',
      role: 'Software Engineer Intern',
      team: 'Unity Catalog',
      loc: 'Seattle, WA',
      period: 'May 2026 — Aug 2026',
      tag: 'upcoming',
      desc: 'Working on Unity Catalog — governance, lineage, and access control for data and AI assets at data-lake scale.',
      stack: ['scala', 'spark', 'catalog', 'distributed systems'],
    },
    {
      co: 'Amazon',
      role: 'Software Development Engineer Intern',
      team: 'Identity & Access Management',
      loc: 'Seattle, WA',
      period: 'May 2025 — Aug 2025',
      desc: 'Shipped improvements to AWS IAM — auth at internet scale, where a one-in-a-million edge case happens many thousands of times per second.',
      stack: ['java', 'aws', 'authz', 'distributed services'],
    },
    {
      co: 'BlueHalo',
      role: 'Software Engineer Intern',
      team: 'MLOps — Data Ingestion',
      loc: 'Remote',
      period: 'May 2024 — Aug 2024',
      desc: 'Designed and built ETL ingestion pipelines feeding downstream ML workloads — moving terabytes of heterogeneous sensor data into a shape models could actually learn from.',
      stack: ['python', 'airflow', 'etl', 'sensor data'],
    },
  ];

  return (
    <window.PageShell palette={P} plate="III" page="work" mode={mode}
      title="work" accent={accent}
      subtitle={<>Three summers. Three <em style={{ color: accent }}>infrastructure</em> teams. A pattern I didn't plan but will happily claim.</>}
    >
      <div style={{ maxWidth: 1040, position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 180, top: 0, bottom: 0, width: 1,
          background: P.rule,
        }} />
        {jobs.map((j, i) => (
          <article key={j.co} style={{
            position: 'relative', display: 'grid',
            gridTemplateColumns: '160px 40px 1fr', gap: 0,
            padding: '36px 0', borderBottom: i === jobs.length - 1 ? 'none' : `1px dashed ${P.rule}`,
          }}>
            <div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                color: accent, letterSpacing: 0.8, marginBottom: 6,
              }}>{j.period.split(' — ')[0]}</div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                color: P.inkMute, letterSpacing: 0.8,
              }}>— {j.period.split(' — ')[1]}</div>
              {j.tag && (
                <div style={{
                  display: 'inline-block', marginTop: 10,
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                  padding: '3px 8px', border: `1px solid ${accent}`,
                  color: accent, letterSpacing: 1,
                }}>{j.tag.toUpperCase()}</div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 16, top: 6,
                width: 14, height: 14, borderRadius: '50%',
                background: P.bg, border: `2px solid ${accent}`,
                boxShadow: `0 0 0 5px ${accent.replace(')', ' / 0.12)')}`,
              }} />
            </div>
            <div style={{ paddingLeft: 24 }}>
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
          }}>Full resume, one page.</div>
        </div>
        <a href="#" onClick={(e) => e.preventDefault()} style={{
          textDecoration: 'none', padding: '12px 22px',
          background: P.ink, color: P.bg, fontFamily: 'Inter, sans-serif',
          fontSize: 14, fontWeight: 500, letterSpacing: 0.2,
          display: 'inline-flex', alignItems: 'center', gap: 10,
        }}>⤓ resume.pdf</a>
      </div>
    </window.PageShell>
  );
};

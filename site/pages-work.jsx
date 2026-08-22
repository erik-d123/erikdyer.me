// pages-work.jsx

window.WorkPage = function WorkPage({ palette }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.work];
  const textAccent = window.ACCENT_TEXT[window.PAGE_ACCENT.work] || accent;
  const { width } = window.useViewport();
  const compact = width < 760;

  const jobs = [
    {
      co: 'Databricks',
      role: 'Software Engineer Intern',
      team: 'Unity Catalog',
      loc: 'Bellevue, WA',
      period: 'May 2026 to Aug 2026',
      tag: 'completed',
      desc: 'Redesigned a resumable metadata API that resolved 479 daily timeouts across 34 workspaces and cut p95 latency by 79% for requests spanning 1,500+ tables',
      stack: ['scala', 'unity catalog', 'apis', 'distributed systems'],
    },
    {
      co: 'Amazon',
      role: 'Software Development Engineer Intern',
      team: 'Identity & Access Management',
      loc: 'Seattle, WA',
      period: 'May 2025 to Aug 2025',
      tag: 'completed',
      desc: 'Consolidated DynamoDB checks in Amazon Verified Permissions to cut p99 account-access latency by 32%, then provisioned tenant-isolated authorization infrastructure for 1M+ accounts',
      stack: ['java', 'dynamodb', 'aws cdk', 'authorization'],
    },
    {
      co: 'BlueHalo',
      role: 'Software Engineer Intern',
      team: 'Data Platforms',
      loc: 'Baltimore, MD',
      period: 'May 2024 to Aug 2024',
      tag: 'completed',
      desc: 'Migrated ETL pipelines to Spark on EMR with Airflow, reducing dataset onboarding time by 25% while processing more than 5M records per run',
      stack: ['python', 'spark', 'emr', 'airflow'],
    },
  ];

  return (
    <window.PageShell palette={P}
      title="work" accent={accent}
      subtitle={<><em style={{ color: accent }}>Systems</em> that hold up at scale</>}
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
            padding: compact ? '28px 0' : '34px 0',
            borderBottom: i === jobs.length - 1 ? 'none' : `1px dashed ${P.rule}`,
            animation: 'inkFade 460ms var(--ease-out-quart) both',
            animationDelay: `${320 + i * 90}ms`,
          }}>
            <div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                color: textAccent, letterSpacing: 0.8, marginBottom: 6,
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
                  color: textAccent, letterSpacing: 1,
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
                  fontSize: 19, color: textAccent,
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
    </window.PageShell>
  );
};

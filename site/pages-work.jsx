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
      loc: 'Bellevue, WA',
      period: 'May 2026 to Aug 2026',
      tag: 'completed',
      bullets: [
        'Resolved 479 daily timeouts across 34 workspaces via a resumable Unity Catalog metadata API redesign',
        'Reduced p95 latency by 79% for previously timed-out metadata requests spanning 1,500+ tables via pagination',
        'Eliminated 5.8K database queries per request recovery across servers via affinity routing and versioned caching',
      ],
    },
    {
      co: 'Amazon',
      role: 'Software Engineer Intern',
      loc: 'Seattle, WA',
      period: 'May 2025 to Aug 2025',
      tag: 'completed',
      bullets: [
        'Cut p99 IAM account-access latency by 32% by consolidating DynamoDB checks in Amazon Verified Permissions',
        'Provisioned capacity for 1M+ accounts via tenant-isolated AWS CDK infrastructure for granular authorization',
        'Supported 1.2K authorization decisions per second by building tenant throttling, fault isolation, and SLO alerting',
      ],
    },
    {
      co: 'BlueHalo',
      role: 'Software Engineer Intern',
      loc: 'Baltimore, MD',
      period: 'May 2024 to Aug 2024',
      tag: 'completed',
      bullets: [
        'Cut dataset onboarding time by 25% by migrating ETL pipelines to Spark on EMR orchestrated with Airflow',
        'Processed 5M+ records per run by partitioning datasets and parallelizing ETL across Spark workers',
        'Lowered redundant processing by 20% with idempotent writes and checkpointed incremental Spark loads',
      ],
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
              </div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                color: P.inkMute, letterSpacing: 0.6, marginTop: 6,
              }}>{j.role.toUpperCase()} · {j.loc.toUpperCase()}</div>
              <ul style={{
                margin: '18px 0 0', paddingLeft: 20, maxWidth: 700,
                color: P.inkSoft,
              }}>
                {j.bullets.map(bullet => (
                  <li key={bullet} style={{
                    marginTop: 9, paddingLeft: 4, fontSize: 15.5,
                    lineHeight: 1.65, textWrap: 'pretty',
                  }}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </window.PageShell>
  );
};

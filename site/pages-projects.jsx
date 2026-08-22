// pages-projects.jsx

window.ProjectsPage = function ProjectsPage({ palette }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.projects];
  const textAccent = window.ACCENT_TEXT[window.PAGE_ACCENT.projects] || accent;
  const { width } = window.useViewport();
  const compact = width < 900;
  const contactLinks = Object.entries(window.CONTACT_LINKS)
    .filter(([label]) => label !== 'resume');

  const projects = [
    {
      name: 'TigerJunction',
      tagline: 'Course planning for 3,000+ Princeton students',
      desc: 'Built backend services for course search and scheduling, including sub-200 ms p95 search across more than 1,500 course offerings with Redis caching and invalidation',
      stack: ['typescript', 'postgresql', 'aws lambda', 'redis'],
      status: 'public',
      statusLabel: 'production software',
      proof: 'TigerApps public repository',
      href: 'https://github.com/TigerAppsOrg/tiger-junction',
      linkLabel: 'repository',
    },
    {
      name: 'MineBench model integration',
      tagline: 'Production model support for a spatial AI benchmark',
      desc: 'Added Muse Spark 1.2 across provider registration, structured-output handling, request tests, and model configuration in a merged 580-line open-source change',
      stack: ['typescript', 'model apis', 'testing', 'open source'],
      status: 'public',
      statusLabel: 'merged contribution',
      proof: 'MineBench pull request #77',
      href: 'https://github.com/Ammaar-Alam/minebench/pull/77',
      linkLabel: 'merged PR',
    },
    {
      name: 'HELMET long-context evals',
      tagline: 'Long-context evaluation beyond retrieval',
      desc: 'Local experiments using the open-source HELMET benchmark to compare retrieval strength with answer quality, including cases where answer quality dropped despite strong retrieval',
      stack: ['python', 'llm evals', 'analysis'],
      status: 'public',
      statusLabel: 'public experiment',
      proof: 'Public HELMET fork',
      href: 'https://github.com/erik-d123/HELMET',
      linkLabel: 'repository',
    },
    {
      name: 'Synthetic LiDAR Point Clouds',
      tagline: 'Synthetic data for indoor 3D perception',
      desc: 'PVL research pipeline spanning synthetic scene generation, LiDAR simulation, odometry outputs, and Pointcept-compatible point clouds',
      stack: ['python', 'point clouds', 'slam'],
      status: 'research',
      statusLabel: 'ongoing research',
      proof: 'Princeton Vision & Learning Lab research',
    },
    {
      name: 'CityLearn hybrid RL',
      tagline: 'Residual reinforcement learning for energy control',
      desc: 'COS435 final project for CityLearn energy management: a hybrid expert controller with residual PPO, evaluated with attention to seeds, aggregation, and released-evaluation consistency',
      stack: ['python', 'ppo', 'citylearn'],
      status: 'course',
      statusLabel: 'course project',
      proof: 'COS435 final project',
      href: 'https://github.com/Ammaar-Alam/cos435-citylearn',
      linkLabel: 'repository',
    },
  ];

  return (
    <window.PageShell palette={P}
      title="projects" accent={accent}
      subtitle={<>Public work, research, and <em style={{ color: accent }}>systems</em></>}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? '1fr' : 'repeat(2, minmax(0, 1fr))',
        gap: 20,
        maxWidth: 1040,
      }}>
        {projects.map((p, i) => {
          const statusAccent = window.ACCENT_TEXT[window.STATUS_ACCENT[p.status]] || textAccent;
          return (
          <article key={p.name} style={{
            background: P.paper, border: `1px solid ${P.rule}`,
            padding: '28px 30px 26px', position: 'relative',
            transition: 'border-color .2s var(--ease-out-quart)',
            animation: 'inkFade 460ms var(--ease-out-quart) both',
            animationDelay: `${320 + i * 70}ms`,
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = accent;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = P.rule;
            }}
          >
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              letterSpacing: 1.4, color: statusAccent, marginBottom: 14,
            }}>{p.statusLabel.toUpperCase()}</div>
            <h2 style={{
              margin: 0, fontFamily: '"Fraunces", serif', fontWeight: 400,
              fontSize: 32, letterSpacing: -0.8, color: P.ink,
            }}>{p.name}</h2>
            <div style={{
              marginTop: 6, fontFamily: '"Fraunces", serif', fontStyle: 'italic',
              fontSize: 16, color: textAccent, letterSpacing: -0.2,
            }}>{p.tagline}</div>
            <p style={{
              margin: '18px 0 0', fontSize: 14.5, lineHeight: 1.7, color: P.inkSoft,
              textWrap: 'pretty',
            }}>{p.desc}</p>
            <div style={{
              marginTop: 18, fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10, color: P.inkMute, letterSpacing: 0.5,
              display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8,
            }}>
              <span>{p.proof}</span>
              {p.href && (
                <a href={p.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    color: textAccent, textDecoration: 'underline', display: 'inline-flex',
                    alignItems: 'center', minHeight: 44, padding: '0 4px',
                  }}>
                  {p.linkLabel || 'open'} ↗
                </a>
              )}
            </div>
            <div style={{
              marginTop: 22, paddingTop: 14, borderTop: `1px dashed ${P.rule}`,
              display: 'flex', flexWrap: 'wrap', gap: 6,
            }}>
              {p.stack.map(s => (
                <span key={s} style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                  padding: '3px 8px', border: `1px solid ${P.rule}`,
                  color: P.inkSoft, letterSpacing: 0.3, background: P.bgAlt,
                }}>{s}</span>
              ))}
            </div>
          </article>
          );
        })}
      </div>

      <div style={{
        marginTop: 72, paddingTop: 28, borderTop: `1px solid ${P.rule}`,
        maxWidth: 1040, display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', flexWrap: 'wrap', gap: 24,
      }}>
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            letterSpacing: 1.4, color: P.inkMute, marginBottom: 10,
          }}>// CONTACT</div>
          <div style={{
            fontFamily: '"Fraunces", serif', fontSize: 32,
            letterSpacing: -0.8, color: P.ink, maxWidth: 620, lineHeight: 1.15,
          }}>Say hi</div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {contactLinks.map(([x, href]) => (
            <a key={x} href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
              padding: '10px 18px', border: `1px solid ${P.ink}`,
              minHeight: 44, display: 'inline-flex', alignItems: 'center',
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
              color: P.ink, textDecoration: 'none', letterSpacing: 0.2,
              transition: 'all .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = P.ink; e.currentTarget.style.color = P.bg; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = P.ink; }}
            >{x} ↗</a>
          ))}
        </div>
      </div>
    </window.PageShell>
  );
};

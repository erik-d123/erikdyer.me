// pages-projects.jsx

window.ProjectsPage = function ProjectsPage({ palette }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.projects];
  const { width } = window.useViewport();
  const compact = width < 900;
  const contactLinks = {
    email: 'mailto:erikdyer@princeton.edu',
    github: 'https://github.com/erik-d123',
    linkedin: 'https://www.linkedin.com/in/erikcdyer/',
  };

  const projects = [
    {
      name: 'Grounded agent memory',
      tagline: 'Long-horizon browser-agent evaluation.',
      desc: 'Course and research project on handoff memory for long-running agents. The work centers on WebArena-style tasks, validator design, and whether remembered context actually improves task completion.',
      stack: ['python', 'browsergym', 'agents'],
      status: 'research',
      proof: 'Private/course project',
    },
    {
      name: 'HELMET long-context evals',
      tagline: 'Retrieval was not the whole story.',
      desc: 'Experiment work around HELMET and long-context reasoning. The useful diagnosis was that retrieval could stay strong while answer quality still dropped, pointing to answer-time dilution and locality issues.',
      stack: ['python', 'llm evals', 'analysis'],
      status: 'public',
      proof: 'Public repo',
      href: 'https://github.com/erik-d123/HELMET',
    },
    {
      name: 'Indoor LiDAR pipeline',
      tagline: 'Synthetic scenes, real evaluation contracts.',
      desc: 'Research engineering for indoor 3D perception: LiDAR export, odometry debugging, KITTI-style sidecars, Pointcept-compatible point clouds, and pipeline checks against brittle learned baselines.',
      stack: ['python', 'point clouds', 'slam'],
      status: 'research',
      proof: 'PVL research',
    },
    {
      name: 'CityLearn hybrid RL',
      tagline: 'Residual RL around an expert controller.',
      desc: 'Final-project system for CityLearn energy management. Built a hybrid expert plus residual PPO approach, then audited leaderboard claims, seed aggregation, and released-evaluation consistency.',
      stack: ['python', 'ppo', 'citylearn'],
      status: 'course',
      proof: 'COS435 final project',
    },
  ];

  return (
    <window.PageShell palette={P}
      title="projects" accent={accent}
      subtitle={<>Selected <em style={{ color: accent }}>systems</em>, with honest status labels and concise proof.</>}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? '1fr' : 'repeat(2, minmax(0, 1fr))',
        gap: 20,
        maxWidth: 1040,
      }}>
        {projects.map((p, i) => (
          <article key={p.name} style={{
            background: P.paper, border: `1px solid ${P.rule}`,
            padding: '28px 30px 26px', position: 'relative',
            transition: 'all .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = P.rule; }}
          >
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              letterSpacing: 1.4, color: accent, marginBottom: 14,
            }}>{p.status.toUpperCase()}</div>
            <h2 style={{
              margin: 0, fontFamily: '"Fraunces", serif', fontWeight: 400,
              fontSize: 32, letterSpacing: -0.8, color: P.ink,
            }}>{p.name}</h2>
            <div style={{
              marginTop: 6, fontFamily: '"Fraunces", serif', fontStyle: 'italic',
              fontSize: 16, color: accent, letterSpacing: -0.2,
            }}>{p.tagline}</div>
            <p style={{
              margin: '18px 0 0', fontSize: 14.5, lineHeight: 1.7, color: P.inkSoft,
              textWrap: 'pretty',
            }}>{p.desc}</p>
            <div style={{
              marginTop: 18, fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10, color: P.inkMute, letterSpacing: 0.5,
            }}>
              {p.proof}
              {p.href && (
                <a href={p.href} target="_blank" rel="noopener noreferrer"
                  style={{ color: accent, marginLeft: 12, textDecoration: 'underline' }}>
                  open ↗
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
        ))}
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
          }}>Say hi. I usually write back.</div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {Object.entries(contactLinks).map(([x, href]) => (
            <a key={x} href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
              padding: '10px 18px', border: `1px solid ${P.ink}`,
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

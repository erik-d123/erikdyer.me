// pages-projects.jsx

window.ProjectsPage = function ProjectsPage({ palette, mode }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.projects];

  const projects = [
    {
      name: 'cortex.cli',
      tagline: 'Keyboard-driven second brain.',
      desc: 'A terminal shell for capturing, linking, and wandering your own notes. Fast, local-first, built around the keyboard.',
      stack: ['typescript', 'sqlite'],
      status: 'active',
    },
    {
      name: 'latency.sim',
      tagline: 'Probe inference stacks under load.',
      desc: 'A small, honest benchmarking harness for LLM inference — stress the queue, measure the tails, graph the pain.',
      stack: ['rust', 'tokio'],
      status: 'hacking',
    },
    {
      name: 'visor',
      tagline: 'Observe the agent as it thinks.',
      desc: 'Lightweight instrumentation for agent loops — every message, tool call, and cycle of self-doubt, in one timeline.',
      stack: ['python', 'otel', 'svelte'],
      status: 'prototype',
    },
    {
      name: 'myelin',
      tagline: 'Re-pace dense text to your eye.',
      desc: 'A browser extension that visually tunes reading rhythm on long-form pages.',
      stack: ['ts', 'chrome ext'],
      status: 'idea',
    },
  ];

  return (
    <window.PageShell palette={P} plate="IV" page="projects" mode={mode}
      title="projects" accent={accent}
      subtitle={<>Small <em style={{ color: accent }}>systems</em> I build for myself. Not everything needs a paper behind it.</>}
    >
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20,
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
            }}>FIG. 0{i + 1} · {p.status.toUpperCase()}</div>
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
          }}>Say hi — I usually write back.</div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['email', 'github', 'linkedin'].map(x => (
            <a key={x} href="#" onClick={e => e.preventDefault()} style={{
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

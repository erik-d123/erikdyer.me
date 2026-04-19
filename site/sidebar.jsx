// sidebar.jsx — persistent left column

window.Sidebar = function Sidebar({ page, setPage, palette, accentKey, mode }) {
  const P = palette;
  const A = window.ACCENTS;
  const accent = A[accentKey];
  const t = window.useTick();

  const pageAccent = (id) => A[window.PAGE_ACCENT[id]] || accent;

  const nav = [
    { id: 'about',    label: 'about',    n: '01' },
    { id: 'research', label: 'research', n: '02' },
    { id: 'work',     label: 'work',     n: '03' },
    { id: 'projects', label: 'projects', n: '04' },
    { id: 'timeline', label: 'timeline', n: '05' },
  ];

  const pageColor = pageAccent(page);
  const plateRoman = { about: 'I', research: 'II', work: 'III', projects: 'IV', timeline: 'V' }[page];
  const caption = mode === 'compbio' ? {
    about:    'double helix. DNA as the original system.',
    research: 'protein tertiary structure.',
    work:     'phylogeny of engineered systems.',
    projects: 'gene regulatory network.',
    timeline: 'expression over time.',
  }[page] : {
    about:    'cortical microcircuit (pyramidal + interneuron).',
    research: 'purkinje cell — dendritic arborization.',
    work:     'myelinated axon bundle.',
    projects: 'chemical synapse, close-up.',
    timeline: 'hippocampus — the seat of memory.',
  }[page];

  return (
    <aside style={{
      position: 'sticky', top: 0, height: '100vh', width: 300, flexShrink: 0,
      borderRight: `1px solid ${P.rule}`, background: P.bgAlt,
      display: 'flex', flexDirection: 'column', padding: '30px 26px',
      fontFamily: 'Inter, system-ui, sans-serif', color: P.ink,
    }}>
      <div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 1.6,
          color: P.inkMute, marginBottom: 8,
        }}>PLATE {plateRoman} · HOST</div>
        <div style={{
          fontFamily: '"Fraunces", Georgia, serif', fontSize: 34, lineHeight: 0.95,
          letterSpacing: -1, color: P.ink, fontWeight: 400,
        }}>Erik Dyer</div>
        <div style={{
          marginTop: 10, fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: P.inkMute, letterSpacing: 0.4, lineHeight: 1.7,
        }}>
          princeton · ece + neuroscience<br/>class of 2027
        </div>
      </div>

      <div style={{
        flex: 1, margin: '18px -6px 8px', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 6, fontFamily: '"JetBrains Mono", monospace',
          fontSize: 9, letterSpacing: 1.2, color: P.inkMute,
        }}>fig. {{about:'01',research:'02',work:'03',projects:'04',timeline:'05'}[page]}</div>
        <div style={{
          position: 'absolute', bottom: 0, left: 6, right: 6,
          fontFamily: '"Fraunces", serif', fontStyle: 'italic',
          fontSize: 11, color: P.inkMute, textAlign: 'center', lineHeight: 1.4,
        }}>{caption}</div>
        <div key={page + mode} style={{
          animation: 'inkFade 700ms ease-out both',
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <window.Figure mode={mode} page={page} color={pageColor}
            style={{ width: '100%', height: '100%', maxHeight: 420 }} />
        </div>
      </div>

      <nav style={{
        borderTop: `1px solid ${P.rule}`, paddingTop: 16,
        display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        {nav.map((n, i) => {
          const active = page === n.id;
          const nAcc = pageAccent(n.id);
          return (
            <button key={n.id} onClick={() => setPage(n.id)}
              style={{
                textAlign: 'left', background: 'transparent', border: 'none',
                padding: '8px 2px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: active ? P.ink : P.inkSoft,
                letterSpacing: -0.2, display: 'flex', alignItems: 'center', gap: 12,
                transition: 'color .2s',
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = P.ink; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = P.inkSoft; }}
            >
              <span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                background: active ? nAcc : 'transparent',
                border: `1px solid ${nAcc}`,
                boxShadow: active ? `0 0 0 4px ${nAcc.replace(')', ' / 0.18)')}` : 'none',
                transition: 'all .2s',
              }} />
              <span style={{ flex: 1 }}>{n.label}</span>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                color: P.inkMute,
              }}>{n.n}</span>
            </button>
          );
        })}
      </nav>

      <div style={{
        marginTop: 16, paddingTop: 14, borderTop: `1px solid ${P.rule}`,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          letterSpacing: 1, color: P.inkMute, marginBottom: 4,
        }}>
          <span>◉ {mode === 'compbio' ? 'expression' : 'live signal'}</span>
          <span>{(38 + Math.sin(t * 0.6) * 6).toFixed(1)} {mode === 'compbio' ? 'kb/s' : 'Hz'}</span>
        </div>
        <div style={{ color: accent }}>
          <window.EEGTrace t={t} accent={accent} height={32} />
        </div>
      </div>
    </aside>
  );
};

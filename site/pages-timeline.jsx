// site/pages-timeline.jsx — microblog timeline with map + polaroids

window.TimelinePage = function TimelinePage({ palette, mode }) {
  const P = palette;
  const A = window.ACCENTS;
  const pin = A[window.PAGE_ACCENT.timeline || 'coral'];
  const events = window.TIMELINE_EVENTS;

  const [selectedId, setSelectedId] = React.useState(events[1].id); // Taiwan by default
  const selected = events.find(e => e.id === selectedId) || events[0];
  const city = window.CITIES[selected.city] || window.CITIES.remote;

  // Group events by year
  const grouped = React.useMemo(() => {
    const g = {};
    events.forEach(e => { (g[e.year] = g[e.year] || []).push(e); });
    return Object.entries(g).sort((a, b) => b[0] - a[0]);
  }, [events]);

  const t = window.useTick();

  return (
    <div style={{ padding: '70px 60px 120px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: 2,
          color: P.inkMute, marginBottom: 14,
        }}>PLATE V · CHRONOLOGY</div>
        <div style={{
          fontFamily: '"Fraunces", Georgia, serif', fontSize: 72,
          letterSpacing: -2, lineHeight: 0.95, color: P.ink, fontWeight: 400,
          marginBottom: 22,
        }}>
          A timeline, of sorts.
        </div>
        <div style={{
          maxWidth: 620, fontSize: 15, lineHeight: 1.7, color: P.inkSoft,
        }}>
          A microblog of places I've been and work I've done. Click an event to
          pin it on the map — the world is mostly a pretext for the photos and the notes.
        </div>
      </div>

      {/* Main 2-col layout */}
      <div style={{
        display: 'grid', gridTemplateColumns: '340px 1fr', gap: 56,
        alignItems: 'start',
      }}>
        {/* LEFT — event list */}
        <div style={{
          borderTop: `1px solid ${P.rule}`,
          borderBottom: `1px solid ${P.rule}`,
          paddingTop: 18, paddingBottom: 8,
        }}>
          {grouped.map(([year, evs], gi) => (
            <div key={year} style={{ marginBottom: 28 }}>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
                color: P.inkMute, letterSpacing: 1.5, marginBottom: 14,
              }}>{year}</div>
              {evs.map(e => {
                const active = e.id === selectedId;
                return (
                  <button key={e.id} onClick={() => setSelectedId(e.id)}
                    style={{
                      display: 'grid', gridTemplateColumns: '48px 1fr', gap: 14,
                      width: '100%', textAlign: 'left', background: 'transparent',
                      border: 'none', padding: '9px 0', cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      alignItems: 'baseline',
                    }}
                    onMouseEnter={(ev) => {
                      if (!active) ev.currentTarget.querySelector('.tl-title').style.color = P.ink;
                    }}
                    onMouseLeave={(ev) => {
                      if (!active) ev.currentTarget.querySelector('.tl-title').style.color = P.inkSoft;
                    }}>
                    {active ? (
                      <span style={{
                        display: 'inline-block', padding: '2px 8px 3px',
                        background: pin, color: P.paper,
                        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                        letterSpacing: 0.8, fontWeight: 500,
                        clipPath: 'polygon(0 0, 86% 0, 100% 50%, 86% 100%, 0 100%)',
                        textAlign: 'center', justifySelf: 'start',
                      }}>{e.month}</span>
                    ) : (
                      <span style={{
                        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                        color: P.inkMute, letterSpacing: 0.8,
                        padding: '2px 4px',
                      }}>{e.month}</span>
                    )}
                    <span className="tl-title" style={{
                      fontSize: 14, color: active ? P.ink : P.inkSoft,
                      fontWeight: active ? 500 : 400,
                      letterSpacing: -0.1, transition: 'color .2s',
                      lineHeight: 1.35,
                    }}>{e.title}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* RIGHT — map + photos + note */}
        <div style={{ position: 'relative' }}>
          {/* MAP */}
          <MapCard palette={P} accent={pin} city={city} t={t} event={selected} mode={mode} />

          {/* PHOTOS + STICKY */}
          <div style={{ marginTop: 28 }}>
            <div key={selected.id} style={{
              animation: 'pageIn 500ms ease-out',
              display: 'flex', flexWrap: 'wrap', gap: 36,
              alignItems: 'flex-start', paddingTop: 14,
            }}>
              <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                <PhotosRow photos={(selected.photos || []).filter(p => p.src)} palette={P} accent={pin} />
              </div>
              {!selected.noSticky && (
                <div style={{ flex: '0 1 320px', minWidth: 260 }}>
                  <StickyNote event={selected} palette={P} accent={pin} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAP — cream-colored stylized world map with pin
// ─────────────────────────────────────────────────────────────
function MapCard({ palette, accent, city, t, event, mode }) {
  const P = palette;
  const mapW = 960, mapH = 500;
  const aspect = mapH / mapW;

  const pathCities = React.useMemo(() => {
    const keys = event.path && event.path.length ? event.path : [event.city];
    return keys.map(k => window.CITIES[k]).filter(Boolean);
  }, [event.id]);

  // center-and-zoom: compute viewBox centered on city/path with soft easing
  const [zoomed, setZoomed] = React.useState(true);
  const computeTarget = React.useCallback(() => {
    return zoomed
      ? computeViewBox(pathCities, mapW, mapH)
      : { x: 0, y: 0, w: mapW, h: mapH };
  }, [zoomed, pathCities]);

  const [vb, setVb] = React.useState(() => computeTarget());
  React.useEffect(() => {
    const target = computeTarget();
    const start = performance.now();
    const from = { ...vb };
    let raf;
    const animate = (now) => {
      const p = Math.min(1, (now - start) / 900);
      const e = 1 - Math.pow(1 - p, 3);
      setVb({
        x: from.x + (target.x - from.x) * e,
        y: from.y + (target.y - from.y) * e,
        w: from.w + (target.w - from.w) * e,
        h: from.h + (target.h - from.h) * e,
      });
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [event.id, zoomed]);

  // when the event changes, re-enter zoomed mode
  React.useEffect(() => { setZoomed(true); }, [event.id]);

  const pinPulse = (Math.sin(t * 2.6) + 1) / 2;
  const zoomScale = vb.w / mapW;

  return (
    <div style={{
      position: 'relative', background: P.paper,
      border: `1px solid ${P.rule}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.03), 0 12px 40px rgba(0,0,0,0.06)',
      paddingTop: `${aspect * 100}%`,
    }}>
      {/* tack on top */}
      <div style={{
        position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
        width: 16, height: 16, borderRadius: '50%',
        background: accent,
        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        zIndex: 3,
      }} />
      <div style={{
        position: 'absolute', top: 4, left: '50%',
        width: 1, height: 30, background: P.inkMute, opacity: 0.4,
        transformOrigin: 'top', transform: 'translateX(-50%) rotate(-4deg)',
        zIndex: 2,
      }} />

      <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        onClick={() => setZoomed(z => !z)}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          display: 'block',
          cursor: zoomed ? 'zoom-out' : 'zoom-in',
        }}>
        {/* graticule — non-scaling-stroke keeps lines thin regardless of zoom */}
        <g stroke={P.rule} strokeWidth="0.6" opacity="0.6" vectorEffect="non-scaling-stroke">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line key={'h'+i} x1="0" x2={mapW} y1={i * mapH / 5} y2={i * mapH / 5} vectorEffect="non-scaling-stroke"/>
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <line key={'v'+i} x1={i * mapW / 8} x2={i * mapW / 8} y1="0" y2={mapH} vectorEffect="non-scaling-stroke"/>
          ))}
        </g>

        {/* continents */}
        <path d={window.WORLD_MAP_PATH}
          fill={P.bgAlt}
          stroke={P.inkMute}
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.85"
          vectorEffect="non-scaling-stroke"/>

        {/* city dots for all events (faint) */}
        {Object.entries(window.CITIES).map(([k, c]) => (
          <circle key={k} cx={c.x} cy={c.y} r={1.6 * zoomScale}
            fill={P.inkMute} opacity="0.4"/>
        ))}

        {/* trajectory line for multi-city trips */}
        {pathCities.length > 1 && (
          <g>
            <polyline
              points={pathCities.map(c => `${c.x},${c.y}`).join(' ')}
              fill="none"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="4 4"
              opacity="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            {pathCities.slice(0, -1).map((c, i) => (
              <circle key={i} cx={c.x} cy={c.y} r={2.6 * zoomScale}
                fill={accent} stroke={P.paper} strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"/>
            ))}
          </g>
        )}

        {/* active pin (final stop) — pulse */}
        <g>
          <circle cx={city.x} cy={city.y} r={(10 + pinPulse * 6) * zoomScale}
            fill={accent} opacity={0.18 - pinPulse * 0.1}/>
          <circle cx={city.x} cy={city.y} r={(4 + pinPulse * 1.2) * zoomScale}
            fill={accent} opacity={0.35}/>
          <circle cx={city.x} cy={city.y} r={3 * zoomScale} fill={accent}/>
          <circle cx={city.x} cy={city.y} r={1.2 * zoomScale} fill={P.paper}/>
        </g>

        {/* city label (for primary/active pin) */}
        <g transform={`translate(${city.x + 8 * zoomScale}, ${city.y - 4 * zoomScale})`}>
          <rect x={-2 * zoomScale} y={-10 * zoomScale}
            width={(city.label.length * 5.2 + 10) * zoomScale}
            height={14 * zoomScale} fill={P.paper} opacity="0.85"/>
          <text x={4 * zoomScale} y={0} fontSize={9 * zoomScale}
            fontFamily='"JetBrains Mono", monospace'
            fill={P.ink} letterSpacing={0.3 * zoomScale}>{city.label}</text>
        </g>
      </svg>

      {/* corner markers */}
      <div style={{
        position: 'absolute', top: 10, left: 12,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        color: P.inkMute, letterSpacing: 1,
      }}>N ↑</div>
      <div style={{
        position: 'absolute', bottom: 10, right: 12,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        color: P.inkMute, letterSpacing: 1,
      }}>{event.month.toLowerCase()} {event.year}</div>
      <div style={{
        position: 'absolute', bottom: 10, left: 12,
        fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontSize: 11,
        color: P.inkMute,
      }}>fig. v — {event.category}</div>
    </div>
  );
}

function computeViewBox(cities, mapW, mapH) {
  if (!cities || !cities.length) return { x: 0, y: 0, w: mapW, h: mapH };

  const aspect = mapH / mapW;
  const xs = cities.map(c => c.x);
  const ys = cities.map(c => c.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  // target zoom: single-city ≈ 320×167; multi-city fits bounds + padding
  const bboxW = Math.max(maxX - minX, (maxY - minY) / aspect);
  const baseW = cities.length > 1 ? bboxW + 140 : 320;
  let w = Math.max(260, Math.min(mapW, baseW));
  let h = w * aspect;

  let x = cx - w / 2;
  let y = cy - h / 2;
  // clamp to map bounds
  x = Math.max(0, Math.min(mapW - w, x));
  y = Math.max(0, Math.min(mapH - h, y));
  return { x, y, w, h };
}

// ─────────────────────────────────────────────────────────────
// POLAROIDS — rotated photo placeholders
// ─────────────────────────────────────────────────────────────
function PhotosRow({ photos, palette, accent }) {
  const P = palette;
  if (!photos.length) return null;
  const rotations = [-4, 3, -2, 5];

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 16,
      alignItems: 'flex-start', marginLeft: -4,
    }}>
      {photos.map((p, i) => (
        <Polaroid key={i} photo={p} idx={i} rotate={rotations[i % 4]}
          palette={P} accent={accent} />
      ))}
    </div>
  );
}

function Polaroid({ photo, idx, rotate, palette, accent }) {
  const P = palette;
  // generate a unique placeholder gradient from the label string (fallback mode)
  const seed = photo.label || photo.caption || '';
  const hue = (seed.charCodeAt(0) + seed.length * 17) % 360;
  const hue2 = (hue + 40) % 360;

  return (
    <div style={{
      width: 164, padding: 8, paddingBottom: 34,
      background: '#fbfbf7',
      boxShadow: '0 4px 10px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.1)',
      transform: `rotate(${rotate}deg)`,
      position: 'relative',
    }}>
      {/* tack */}
      <div style={{
        position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
        width: 12, height: 12, borderRadius: '50%',
        background: accent,
        boxShadow: '0 1px 2px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.3)',
      }}/>
      {photo.src ? (
        <div style={{
          width: '100%', aspectRatio: '1 / 1',
          background: '#1a1a18', position: 'relative', overflow: 'hidden',
        }}>
          <img src={photo.src} alt={photo.caption}
            loading="lazy"
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              filter: 'saturate(0.95) contrast(1.02)',
            }}
          />
          {/* subtle vignette for polaroid feel */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse at 30% 20%,
              rgba(255,255,255,0.10) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 100%,
              rgba(0,0,0,0.18) 0%, transparent 60%)`,
          }}/>
        </div>
      ) : (
        <div style={{
          width: '100%', aspectRatio: '1 / 1',
          background: `linear-gradient(135deg,
            oklch(0.72 0.08 ${hue}) 0%,
            oklch(0.58 0.10 ${hue2}) 100%)`,
          position: 'relative', overflow: 'hidden',
        }}>
          <PhotoGlyph label={photo.label} />
          {/* film grain */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 30% 20%,
              rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}/>
        </div>
      )}
      <div style={{
        position: 'absolute', bottom: 6, left: 12, right: 12,
        fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontSize: 11,
        color: 'rgba(40,30,20,0.7)', textAlign: 'center',
      }}>{photo.caption}</div>
    </div>
  );
}

function PhotoGlyph({ label }) {
  // tiny decorative vignette per label
  const l = (label || '').toLowerCase();
  if (l.includes('taipei') || l.includes('101')) {
    return (
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g stroke="rgba(255,255,255,0.55)" fill="none" strokeWidth="1">
          <path d="M 50 10 L 40 20 L 42 32 L 38 38 L 42 46 L 38 52 L 42 60 L 38 68 L 50 76 L 62 68 L 58 60 L 62 52 L 58 46 L 62 38 L 58 32 L 60 20 Z"/>
          <path d="M 50 10 L 50 4"/>
          <path d="M 20 90 L 80 90" strokeDasharray="2 2"/>
        </g>
      </svg>
    );
  }
  if (l.includes('alhambra') || l.includes('sagrada') || l.includes('retiro')) {
    return (
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g stroke="rgba(255,255,255,0.55)" fill="none" strokeWidth="1">
          <path d="M 20 80 L 20 50 Q 30 30 40 50 L 40 80 Z"/>
          <path d="M 50 80 L 50 40 Q 62 22 74 40 L 74 80 Z"/>
          <circle cx="30" cy="60" r="3"/>
          <circle cx="62" cy="50" r="3"/>
          <path d="M 10 85 L 90 85"/>
        </g>
      </svg>
    );
  }
  if (l.includes('matterhorn') || l.includes('ajax') || l.includes('groomer') || l.includes('lift')) {
    return (
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g stroke="rgba(255,255,255,0.55)" fill="none" strokeWidth="1">
          <path d="M 10 80 L 35 30 L 50 55 L 70 20 L 92 80 Z"/>
          <path d="M 30 38 L 38 42 L 35 30"/>
          <path d="M 62 32 L 72 36 L 70 20"/>
        </g>
      </svg>
    );
  }
  if (l.includes('seattle') || l.includes('market') || l.includes('slu') || l.includes('badge')) {
    return (
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g stroke="rgba(255,255,255,0.55)" fill="none" strokeWidth="1">
          <path d="M 48 20 L 48 60"/>
          <ellipse cx="48" cy="60" rx="14" ry="5"/>
          <path d="M 38 65 L 42 85 M 54 65 L 58 85"/>
          <path d="M 12 88 L 88 88"/>
        </g>
      </svg>
    );
  }
  if (l.includes('coast') || l.includes('jiufen')) {
    return (
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g stroke="rgba(255,255,255,0.55)" fill="none" strokeWidth="1">
          <path d="M 0 60 Q 25 55 50 60 T 100 58"/>
          <path d="M 0 68 Q 25 63 50 68 T 100 66"/>
          <path d="M 0 76 Q 25 71 50 76 T 100 74"/>
          <path d="M 20 40 L 40 20 L 60 35 L 80 15 L 100 30 L 100 60 L 0 60 L 0 45 Z"/>
        </g>
      </svg>
    );
  }
  if (l.includes('office') || l.includes('cs') || l.includes('nassau') || l.includes('friend')) {
    return (
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g stroke="rgba(255,255,255,0.55)" fill="none" strokeWidth="1">
          <rect x="20" y="28" width="60" height="50"/>
          <path d="M 20 28 L 50 12 L 80 28"/>
          {[32, 46, 60].map(x => <rect key={x} x={x} y="40" width="8" height="12"/>)}
          <rect x="46" y="62" width="8" height="16"/>
        </g>
      </svg>
    );
  }
  // default — abstract landscape
  return (
    <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <g stroke="rgba(255,255,255,0.5)" fill="none" strokeWidth="1">
        <circle cx="72" cy="28" r="8"/>
        <path d="M 0 65 Q 30 50 60 60 T 100 55"/>
        <path d="M 0 75 Q 30 60 60 70 T 100 65"/>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// STICKY NOTE — event body + links
// ─────────────────────────────────────────────────────────────
function StickyNote({ event, palette, accent }) {
  const P = palette;
  return (
    <div style={{
      position: 'relative', width: '100%',
      background: 'oklch(0.96 0.05 88)',
      padding: '20px 22px 22px',
      boxShadow: '0 4px 14px rgba(0,0,0,0.09), 0 1px 2px rgba(0,0,0,0.06)',
      transform: 'rotate(1.5deg)',
      fontFamily: 'Inter, sans-serif',
      marginTop: 12,
    }}>
      {/* tape */}
      <div style={{
        position: 'absolute', top: -12, left: '40%', width: 60, height: 20,
        background: 'rgba(255,255,255,0.55)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
        transform: 'rotate(-3deg)',
      }}/>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        letterSpacing: 1.5, color: 'rgba(80,60,30,0.6)', marginBottom: 8,
      }}>
        {event.month.toUpperCase()} {event.year} · {event.category.toUpperCase()}
      </div>
      <div style={{
        fontFamily: '"Fraunces", serif', fontSize: 22,
        letterSpacing: -0.5, lineHeight: 1.1, color: 'rgba(40,30,15,0.92)',
        marginBottom: 12, fontWeight: 500,
      }}>{event.title}</div>
      <div style={{
        fontSize: 13, lineHeight: 1.6, color: 'rgba(50,40,20,0.82)',
      }}>{event.body}</div>
      {event.links && event.links.length > 0 && (
        <div style={{
          marginTop: 14, paddingTop: 10,
          borderTop: '1px dashed rgba(100,80,30,0.25)',
          display: 'flex', gap: 10, flexWrap: 'wrap',
        }}>
          {event.links.map((l, i) => (
            <a key={i} href={l.href}
              style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                color: accent, textDecoration: 'underline',
                letterSpacing: 0.3,
              }}>
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

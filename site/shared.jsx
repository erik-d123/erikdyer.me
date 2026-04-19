// shared.jsx — tokens, Cajal + Comp-bio illustrations, atoms

window.PALETTES = {
  cream: {
    name: 'cream',
    bg: 'oklch(0.97 0.012 85)',
    bgAlt: 'oklch(0.94 0.015 85)',
    ink: 'oklch(0.22 0.02 60)',
    inkSoft: 'oklch(0.40 0.02 60)',
    inkMute: 'oklch(0.60 0.015 70)',
    rule: 'oklch(0.82 0.02 70)',
    paper: 'oklch(0.99 0.008 85)',
  },
  paper: {
    name: 'paper',
    bg: 'oklch(0.97 0.005 240)',
    bgAlt: 'oklch(0.94 0.008 240)',
    ink: 'oklch(0.22 0.015 260)',
    inkSoft: 'oklch(0.42 0.015 260)',
    inkMute: 'oklch(0.60 0.012 260)',
    rule: 'oklch(0.85 0.01 250)',
    paper: 'oklch(0.99 0.003 240)',
  },
};

window.ACCENTS = {
  sage:       'oklch(0.60 0.10 150)',
  periwinkle: 'oklch(0.58 0.14 265)',
  coral:      'oklch(0.65 0.17 28)',
};

// per-page accent assignment (mode-aware; section accent differentiation)
window.PAGE_ACCENT = {
  about:    'periwinkle',
  research: 'sage',
  work:     'coral',
  projects: 'periwinkle',
  timeline: 'coral',
};

// ──────────────────────────────────────────────────────────────
// Figure — hero-scale illustration (Cajal or Comp-bio)
//   props: mode ('neuro' | 'compbio'), page, color
// ──────────────────────────────────────────────────────────────
window.Figure = function Figure({ mode, page, color, style, variant = 'hero' }) {
  const M = mode === 'compbio' ? CompBioFigures : NeuroFigures;
  const Comp = M[page] || M.about;
  return <Comp color={color} style={style} variant={variant} />;
};

// ──────────────────────────────────────────────────────────────
// NEURO FIGURES — Cajal-inspired, hand-drawn feeling
// ──────────────────────────────────────────────────────────────
const strokeCommon = (color) => ({
  stroke: color, fill: 'none',
  strokeWidth: 1, strokeLinecap: 'round', strokeLinejoin: 'round',
});

const NeuroFigures = {
  // ABOUT — cortical microcircuit: pyramidal + interneuron + connections
  about: ({ color, style, variant }) => (
    <svg viewBox="0 0 400 520" style={{ overflow: 'visible', ...style }}>
      <defs>
        <filter id="inkBlur"><feGaussianBlur stdDeviation="0.25"/></filter>
      </defs>
      <g {...strokeCommon(color)} filter="url(#inkBlur)">
        {/* big pyramidal cell (left) — apical tree reaching up */}
        <g transform="translate(130,0)">
          {/* apical tufts */}
          <path d="M0 220 L0 110" />
          <path d="M0 110 C -12 96 -28 84 -52 70" />
          <path d="M0 110 C 12 96 28 84 52 70" />
          <path d="M0 150 C -14 140 -26 126 -34 108" />
          <path d="M0 150 C 14 140 26 126 34 108" />
          <path d="M-52 70 C -62 58 -66 42 -58 26" />
          <path d="M-52 70 C -68 64 -82 58 -94 50" />
          <path d="M52 70 C 62 58 66 42 58 26" />
          <path d="M52 70 C 68 64 82 58 94 50" />
          <path d="M-34 108 C -42 96 -50 80 -46 62" />
          <path d="M34 108 C 42 96 50 80 46 62" />
          {/* tiny terminal hairs */}
          {[-94,-82,-66,-58,-46,46,58,66,82,94].map((x,i)=>(
            <g key={i}>
              <path d={`M${x} ${i<5?50:50} L${x + (x<0?-4:4)} ${i<5?36:36}`} strokeWidth="0.6"/>
              <path d={`M${x} ${i<5?50:50} L${x + (x<0?-8:8)} ${i<5?44:44}`} strokeWidth="0.6"/>
            </g>
          ))}
          <path d="M-58 26 L -62 12" strokeWidth="0.6"/>
          <path d="M58 26 L 62 12" strokeWidth="0.6"/>
          <path d="M-94 50 L -110 42" strokeWidth="0.6"/>
          <path d="M94 50 L 110 42" strokeWidth="0.6"/>
          {/* soma — triangular pyramidal body */}
          <path d="M0 220 L -22 262 L 22 262 Z" />
          <circle cx="0" cy="244" r="4" fill={color} stroke="none"/>
          {/* basal dendrites */}
          <path d="M-22 262 C -44 274 -60 290 -72 316" />
          <path d="M22 262 C 44 274 60 290 72 316" />
          <path d="M-16 262 C -30 282 -42 302 -44 326" />
          <path d="M16 262 C 30 282 42 302 44 326" />
          <path d="M0 262 C -6 290 6 310 0 330" />
          {/* basal twigs */}
          <path d="M-72 316 L -86 324" strokeWidth="0.6"/>
          <path d="M-72 316 L -78 334" strokeWidth="0.6"/>
          <path d="M72 316 L 86 324" strokeWidth="0.6"/>
          <path d="M72 316 L 78 334" strokeWidth="0.6"/>
          {/* axon */}
          <path d="M0 262 L 0 360" />
          <path d="M0 300 C -8 308 -18 312 -26 308" strokeWidth="0.7"/>
          <path d="M0 330 C 10 338 20 342 28 338" strokeWidth="0.7"/>
          <path d="M0 360 C -6 388 4 410 0 440" />
          <path d="M0 440 C -10 460 -18 478 -24 498" />
          <path d="M0 440 C 10 460 18 478 24 498" />
          <path d="M0 470 L 0 508" strokeWidth="0.8"/>
          <circle cx="-24" cy="498" r="2.4" fill={color} stroke="none"/>
          <circle cx="24" cy="498" r="2.4" fill={color} stroke="none"/>
          <circle cx="0" cy="508" r="2.4" fill={color} stroke="none"/>
        </g>

        {/* small interneuron (right) — bipolar, more compact */}
        <g transform="translate(310,220)">
          <ellipse cx="0" cy="0" rx="10" ry="8"/>
          <circle cx="0" cy="0" r="2.5" fill={color} stroke="none"/>
          <path d="M0 -8 C -4 -20 -12 -34 -8 -50" />
          <path d="M0 -8 C 4 -20 12 -34 8 -50" />
          <path d="M-8 -50 C -12 -60 -22 -66 -30 -64" strokeWidth="0.6"/>
          <path d="M8 -50 C 12 -60 22 -66 30 -64" strokeWidth="0.6"/>
          <path d="M0 8 C -4 20 -12 34 -8 50" />
          <path d="M0 8 C 4 20 12 34 8 50" />
          <path d="M-8 50 C -18 70 -30 86 -40 90" strokeWidth="0.6"/>
          <path d="M8 50 C 18 70 30 86 40 90" strokeWidth="0.6"/>
        </g>

        {/* afferent fibers entering from top */}
        <path d="M40 20 C 60 60 90 80 114 90" strokeWidth="0.6" opacity="0.7"/>
        <path d="M370 12 C 360 40 350 70 340 88" strokeWidth="0.6" opacity="0.7"/>
        <path d="M20 100 C 50 120 80 130 98 140" strokeWidth="0.6" opacity="0.6"/>

        {/* connection pyramidal→interneuron (recurrent) */}
        <path d="M152 244 C 200 220 240 210 280 214" strokeWidth="0.7"/>
        <circle cx="280" cy="214" r="1.8" fill={color} stroke="none"/>
        <path d="M300 226 C 260 260 220 270 158 262" strokeWidth="0.7" strokeDasharray="2 2"/>
      </g>
    </svg>
  ),

  // RESEARCH — purkinje + granule cells + parallel fibers. Lush.
  research: ({ color, style }) => (
    <svg viewBox="0 0 400 520" style={{ overflow: 'visible', ...style }}>
      <g {...strokeCommon(color)}>
        {/* parallel fibers across the top (granule cell axons) */}
        {[40, 60, 80, 100, 120, 140, 160, 180].map((y, i) => (
          <path key={i}
            d={`M10 ${y} C 120 ${y + (i%2?-2:2)} 260 ${y + (i%2?2:-2)} 390 ${y}`}
            strokeWidth="0.5" opacity="0.55"/>
        ))}

        {/* Purkinje cell — central */}
        <g transform="translate(200,0)">
          {/* soma */}
          <ellipse cx="0" cy="330" rx="14" ry="11"/>
          <circle cx="0" cy="330" r="3.2" fill={color} stroke="none"/>
          {/* trunk */}
          <path d="M0 319 C -4 294 4 270 0 240" />
          {/* primary branches */}
          <path d="M0 240 C -26 220 -56 210 -78 200" />
          <path d="M0 240 C 26 220 56 210 78 200" />
          <path d="M0 240 C -14 218 -22 200 -12 180" />
          <path d="M0 240 C 14 218 22 200 12 180" />
          {/* secondary fan */}
          {Array.from({ length: 18 }).map((_, i) => {
            const a = (i / 17) * Math.PI * 0.95 - Math.PI * 0.47 - Math.PI/2;
            const r0 = 60, r1 = 120, r2 = 170;
            const x0 = Math.cos(a) * r0, y0 = 240 + Math.sin(a) * r0 + 10;
            const x1 = Math.cos(a) * r1, y1 = 240 + Math.sin(a) * r1 - 20;
            const x2 = Math.cos(a) * r2, y2 = 240 + Math.sin(a) * r2 - 40;
            return <path key={i} d={`M${x0} ${y0} C ${x1*0.9} ${y1}, ${x1} ${y1-4}, ${x2} ${y2}`} strokeWidth="0.7"/>;
          })}
          {/* tertiary twigs */}
          {Array.from({ length: 34 }).map((_, i) => {
            const a = (i / 33) * Math.PI - Math.PI/2;
            const r1 = 170, r2 = 210;
            const x1 = Math.cos(a) * r1, y1 = 200 + Math.sin(a) * r1;
            const x2 = Math.cos(a) * r2 + (i%2?3:-3), y2 = 180 + Math.sin(a) * r2;
            return <path key={'t'+i} d={`M${x1} ${y1} C ${x1+1} ${y1-3}, ${x2-1} ${y2+3}, ${x2} ${y2}`} strokeWidth="0.45"/>;
          })}
          {/* climbing fiber wrapping */}
          <path d="M-40 400 C -30 360 -10 320 -4 280" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.8"/>
          <path d="M-4 280 C -12 260 -18 240 -14 220" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.8"/>
          {/* axon */}
          <path d="M0 341 L 0 430" />
          <path d="M0 420 C -14 436 -26 452 -34 476" />
          <path d="M0 420 C 14 436 26 452 34 476" />
          <path d="M0 450 L 0 490"/>
          <circle cx="-34" cy="476" r="2.2" fill={color} stroke="none"/>
          <circle cx="34" cy="476" r="2.2" fill={color} stroke="none"/>
          <circle cx="0" cy="490" r="2.2" fill={color} stroke="none"/>
        </g>

        {/* granule cells below as dots */}
        {Array.from({length: 14}).map((_,i)=>{
          const x = 50 + i * 24 + (i%2?4:-4);
          return <g key={i}>
            <circle cx={x} cy="440" r="2" fill={color} stroke="none"/>
            <path d={`M${x} 438 L${x} 420`} strokeWidth="0.5"/>
            <path d={`M${x} 420 L${x-6} 405`} strokeWidth="0.4"/>
            <path d={`M${x} 420 L${x+6} 405`} strokeWidth="0.4"/>
          </g>;
        })}
      </g>
    </svg>
  ),

  // WORK — myelinated axon bundle with nodes of Ranvier, branching into terminals
  work: ({ color, style }) => (
    <svg viewBox="0 0 400 520" style={{ overflow: 'visible', ...style }}>
      <g {...strokeCommon(color)}>
        {/* bundle of 5 axons */}
        {[80, 140, 200, 260, 320].map((x, i) => (
          <g key={i}>
            <path d={`M${x} 20 C ${x + (i%2?14:-14)} 180, ${x + (i%2?-10:10)} 340, ${x + (i%2?-6:6)} 460`} strokeWidth="0.9"/>
            {/* myelin segments */}
            {Array.from({length: 9}).map((_, k) => {
              const prog = (k + 1) / 10;
              const y = 20 + prog * 440;
              const xoff = x + Math.sin(prog * Math.PI * 2 + i) * 10 + (i%2?-1:1) * (prog * 6);
              return <ellipse key={k} cx={xoff} cy={y} rx="7" ry="18" strokeWidth="0.7"/>;
            })}
          </g>
        ))}
        {/* terminal arbor */}
        {[80, 140, 200, 260, 320].map((x, i) => (
          <g key={'t'+i}>
            <path d={`M${x-4} 460 C ${x-16} 474 ${x-24} 488 ${x-30} 504`} strokeWidth="0.7"/>
            <path d={`M${x-4} 460 C ${x+6} 474 ${x+12} 488 ${x+18} 504`} strokeWidth="0.7"/>
            <path d={`M${x-4} 460 L ${x-4} 510`} strokeWidth="0.7"/>
            <circle cx={x-30} cy="504" r="2" fill={color} stroke="none"/>
            <circle cx={x+18} cy="504" r="2" fill={color} stroke="none"/>
            <circle cx={x-4} cy="510" r="2" fill={color} stroke="none"/>
          </g>
        ))}
        {/* top: cells of origin sketched */}
        {[80, 140, 200, 260, 320].map((x, i) => (
          <g key={'o'+i} transform={`translate(${x}, 20)`}>
            <circle cx="0" cy="-6" r="6"/>
            <circle cx="0" cy="-6" r="2" fill={color} stroke="none"/>
            <path d="M-6 -12 L -12 -22" strokeWidth="0.5"/>
            <path d="M6 -12 L 12 -22" strokeWidth="0.5"/>
            <path d="M0 -12 L 0 -26" strokeWidth="0.5"/>
          </g>
        ))}
      </g>
    </svg>
  ),

  // PROJECTS — synaptic cleft close-up with vesicles + receptors
  projects: ({ color, style }) => (
    <svg viewBox="0 0 400 520" style={{ overflow: 'visible', ...style }}>
      <g {...strokeCommon(color)}>
        {/* incoming axon */}
        <path d="M60 20 C 120 80 180 100 200 200" />
        <path d="M200 200 C 178 240 178 280 200 300" />
        {/* presynaptic bulb */}
        <ellipse cx="200" cy="300" rx="110" ry="54"/>
        {/* vesicles */}
        {Array.from({length: 26}).map((_, i) => {
          const a = (i/26) * Math.PI * 2 + (i%3)*0.3;
          const r = 18 + (i%5)*8;
          const cx = 200 + Math.cos(a) * r, cy = 298 + Math.sin(a) * r * 0.6;
          return <circle key={i} cx={cx} cy={cy} r="4.5" strokeWidth="0.6"/>;
        })}
        {/* fusing vesicle at membrane */}
        <path d="M186 348 C 186 356 194 358 200 358 C 206 358 214 356 214 348" strokeWidth="0.8"/>
        {/* synaptic cleft — dashed bilayer */}
        <path d="M70 358 L 330 358" strokeDasharray="3 3"/>
        <path d="M70 372 L 330 372" strokeDasharray="3 3"/>
        {/* neurotransmitter cluster in cleft */}
        {[170, 186, 200, 214, 230].map((cx, i) => (
          <g key={i}>
            <circle cx={cx + (i%2?2:-2)} cy="365" r="2" fill={color} stroke="none"/>
          </g>
        ))}
        {/* postsynaptic density */}
        <rect x="120" y="372" width="160" height="4" strokeWidth="0.7"/>
        {/* receptors — channel shapes */}
        {Array.from({length: 8}).map((_, i) => {
          const cx = 140 + i * 22;
          return <g key={i}>
            <path d={`M${cx-4} 376 L${cx-4} 392 L${cx+4} 392 L${cx+4} 376`} strokeWidth="0.7"/>
            <path d={`M${cx-2} 388 L${cx+2} 388`} strokeWidth="0.5"/>
          </g>;
        })}
        {/* postsynaptic dendrite */}
        <ellipse cx="200" cy="420" rx="120" ry="38"/>
        <path d="M200 458 C 180 478 160 490 150 510"/>
        <path d="M200 458 C 220 478 240 490 250 510"/>
        <path d="M200 458 L 200 512"/>
        {/* labels — dotted callouts */}
        <path d="M250 240 L 310 220" strokeWidth="0.4" strokeDasharray="2 2"/>
        <path d="M280 366 L 348 366" strokeWidth="0.4" strokeDasharray="2 2"/>
      </g>
    </svg>
  ),
};

// ──────────────────────────────────────────────────────────────
// COMP-BIO FIGURES
// ──────────────────────────────────────────────────────────────
const CompBioFigures = {
  // ABOUT — double helix, long and elegant
  about: ({ color, style }) => (
    <svg viewBox="0 0 400 520" style={{ overflow: 'visible', ...style }}>
      <g {...strokeCommon(color)}>
        {(() => {
          const N = 44, H = 480, top = 20, cx = 200, amp = 90;
          const pts1 = [], pts2 = [];
          for (let i = 0; i < N; i++) {
            const y = top + (i / (N - 1)) * H;
            const phase = (i / (N - 1)) * Math.PI * 5;
            pts1.push([cx + Math.cos(phase) * amp, y]);
            pts2.push([cx + Math.cos(phase + Math.PI) * amp, y]);
          }
          const path = (pts) => {
            let d = `M${pts[0][0]} ${pts[0][1]}`;
            for (let i = 1; i < pts.length; i++) {
              const [x0, y0] = pts[i-1], [x1, y1] = pts[i];
              const mx = (x0 + x1) / 2;
              d += ` Q ${mx} ${y0}, ${x1} ${y1}`;
            }
            return d;
          };
          return (
            <>
              <path d={path(pts1)} strokeWidth="1.1"/>
              <path d={path(pts2)} strokeWidth="1.1"/>
              {/* rungs */}
              {pts1.map((p, i) => {
                const q = pts2[i];
                // vary base pair style
                const isAT = i % 2 === 0;
                return (
                  <g key={i}>
                    <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]}
                      strokeWidth={isAT ? 0.5 : 0.8}
                      strokeDasharray={isAT ? '2 1.5' : 'none'}
                      opacity={0.75}/>
                    {/* mid-dots */}
                    <circle cx={(p[0]+q[0])/2} cy={(p[1]+q[1])/2} r="1" fill={color} stroke="none" opacity="0.8"/>
                  </g>
                );
              })}
              {/* sugar-phosphate backbone beads */}
              {pts1.filter((_,i)=>i%2===0).map((p,i)=>(
                <circle key={'a'+i} cx={p[0]} cy={p[1]} r="1.8" fill={color} stroke="none"/>
              ))}
              {pts2.filter((_,i)=>i%2===0).map((p,i)=>(
                <circle key={'b'+i} cx={p[0]} cy={p[1]} r="1.8" fill={color} stroke="none"/>
              ))}
            </>
          );
        })()}
      </g>
    </svg>
  ),

  // RESEARCH — protein ribbon/fold with alpha helices + beta sheets
  research: ({ color, style }) => (
    <svg viewBox="0 0 400 520" style={{ overflow: 'visible', ...style }}>
      <g {...strokeCommon(color)}>
        {/* alpha helix 1 — coils */}
        {(() => {
          const coils = [];
          const N = 60;
          for (let i = 0; i < N; i++) {
            const t = i / (N - 1);
            const y = 40 + t * 140;
            const x = 120 + Math.cos(t * 24) * 22;
            coils.push([x, y]);
          }
          let d = `M${coils[0][0]} ${coils[0][1]}`;
          for (let i = 1; i < coils.length; i++) d += ` L${coils[i][0]} ${coils[i][1]}`;
          return <path d={d} strokeWidth="1.4"/>;
        })()}
        {/* connecting loop */}
        <path d="M120 180 C 110 210 200 220 240 200" strokeWidth="1"/>
        {/* beta sheet arrows (3 strands) */}
        {[0, 18, 36].map((dx, i) => (
          <g key={i} transform={`translate(${240 + dx}, 210)`}>
            <path d="M0 0 L 0 90 L -5 90 L 8 102 L 21 90 L 16 90 L 16 0 Z" strokeWidth="0.9"/>
          </g>
        ))}
        {/* connecting turn */}
        <path d="M268 310 C 260 340 200 340 180 310" strokeWidth="1"/>
        {/* alpha helix 2 */}
        {(() => {
          const coils = [];
          const N = 50;
          for (let i = 0; i < N; i++) {
            const t = i / (N - 1);
            const y = 310 + t * 120;
            const x = 180 + Math.cos(t * 20 + 0.5) * 20;
            coils.push([x, y]);
          }
          let d = `M${coils[0][0]} ${coils[0][1]}`;
          for (let i = 1; i < coils.length; i++) d += ` L${coils[i][0]} ${coils[i][1]}`;
          return <path d={d} strokeWidth="1.4"/>;
        })()}
        {/* terminal loop */}
        <path d="M180 430 C 170 460 220 475 260 468" strokeWidth="1"/>
        {/* side chain dots */}
        {Array.from({length: 20}).map((_, i) => {
          const yy = 50 + i * 22;
          const xx = 90 + ((i * 37) % 220);
          return <circle key={i} cx={xx} cy={yy} r="1.5" fill={color} stroke="none" opacity="0.6"/>;
        })}
        {/* N and C termini labels as little caps */}
        <circle cx="120" cy="40" r="3" fill={color} stroke="none"/>
        <text x="110" y="34" fontSize="9" fontFamily='"JetBrains Mono", monospace' fill={color} stroke="none">N</text>
        <circle cx="260" cy="468" r="3" fill={color} stroke="none"/>
        <text x="268" y="472" fontSize="9" fontFamily='"JetBrains Mono", monospace' fill={color} stroke="none">C</text>
      </g>
    </svg>
  ),

  // WORK — phylogenetic tree, dendrogram style
  work: ({ color, style }) => (
    <svg viewBox="0 0 400 520" style={{ overflow: 'visible', ...style }}>
      <g {...strokeCommon(color)}>
        {/* root */}
        <path d="M30 260 L 80 260"/>
        {/* first split */}
        <path d="M80 180 L 80 340"/>
        <path d="M80 180 L 140 180"/>
        <path d="M80 340 L 140 340"/>
        {/* second splits */}
        <path d="M140 120 L 140 240"/>
        <path d="M140 120 L 210 120"/>
        <path d="M140 240 L 210 240"/>
        <path d="M140 300 L 140 400"/>
        <path d="M140 300 L 210 300"/>
        <path d="M140 400 L 210 400"/>
        {/* third splits */}
        <path d="M210 80 L 210 160"/>
        <path d="M210 80 L 300 80"/>
        <path d="M210 160 L 300 160"/>
        <path d="M210 210 L 210 270"/>
        <path d="M210 210 L 300 210"/>
        <path d="M210 270 L 300 270"/>
        <path d="M210 270 L 210 330"/>
        <path d="M210 330 L 300 330"/>
        <path d="M210 370 L 210 430"/>
        <path d="M210 370 L 300 370"/>
        <path d="M210 430 L 300 430"/>
        {/* leaves — tips of branches */}
        {[80, 160, 210, 270, 330, 370, 430].map((y, i) => (
          <g key={i} transform={`translate(300, ${y})`}>
            <circle cx="0" cy="0" r="3" fill={color} stroke="none"/>
            <path d="M0 0 L 30 0" strokeWidth="0.6" strokeDasharray="1 2"/>
          </g>
        ))}
        {/* branch length ticks as leaf length variation */}
        <path d="M80 120 L 140 120 L 140 120" strokeWidth="0" />
        {/* time axis at bottom */}
        <path d="M30 490 L 370 490" strokeWidth="0.6"/>
        {[30, 100, 170, 240, 310, 370].map((x, i) => (
          <path key={i} d={`M${x} 490 L${x} 496`} strokeWidth="0.6"/>
        ))}
        <text x="30" y="512" fontSize="8" fontFamily='"JetBrains Mono", monospace' fill={color} stroke="none" opacity="0.7">t0</text>
        <text x="340" y="512" fontSize="8" fontFamily='"JetBrains Mono", monospace' fill={color} stroke="none" opacity="0.7">now</text>
      </g>
    </svg>
  ),

  // PROJECTS — gene regulatory network
  projects: ({ color, style }) => (
    <svg viewBox="0 0 400 520" style={{ overflow: 'visible', ...style }}>
      <defs>
        <marker id="arrow-compbio" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L 10 5 L 0 10 Z" fill={color}/>
        </marker>
        <marker id="inhibit-compbio" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M8 0 L 8 10" stroke={color} strokeWidth="1.5"/>
        </marker>
      </defs>
      <g {...strokeCommon(color)}>
        {/* nodes — genes */}
        {(() => {
          const nodes = [
            { id: 'A', x: 100, y: 90,  label: 'GENE_A' },
            { id: 'B', x: 300, y: 90,  label: 'GENE_B' },
            { id: 'C', x: 80,  y: 240, label: 'REG_1'  },
            { id: 'D', x: 200, y: 200, label: 'HUB'    },
            { id: 'E', x: 320, y: 250, label: 'REG_2'  },
            { id: 'F', x: 120, y: 380, label: 'OUT_X'  },
            { id: 'G', x: 280, y: 380, label: 'OUT_Y'  },
            { id: 'H', x: 200, y: 460, label: 'OUT_Z'  },
          ];
          const edges = [
            { from: 'A', to: 'D', kind: 'pos' },
            { from: 'B', to: 'D', kind: 'pos' },
            { from: 'C', to: 'D', kind: 'pos' },
            { from: 'E', to: 'D', kind: 'neg' },
            { from: 'D', to: 'F', kind: 'pos' },
            { from: 'D', to: 'G', kind: 'pos' },
            { from: 'F', to: 'H', kind: 'pos' },
            { from: 'G', to: 'H', kind: 'neg' },
            { from: 'A', to: 'C', kind: 'pos' },
            { from: 'B', to: 'E', kind: 'pos' },
          ];
          const nm = Object.fromEntries(nodes.map(n=>[n.id,n]));
          return (
            <>
              {edges.map((e, i) => {
                const a = nm[e.from], b = nm[e.to];
                const dx = b.x - a.x, dy = b.y - a.y;
                const len = Math.hypot(dx, dy);
                const ux = dx/len, uy = dy/len;
                const x1 = a.x + ux * 18, y1 = a.y + uy * 18;
                const x2 = b.x - ux * 20, y2 = b.y - uy * 20;
                return (
                  <path key={i}
                    d={`M${x1} ${y1} Q ${(x1+x2)/2 + uy*18} ${(y1+y2)/2 - ux*18} ${x2} ${y2}`}
                    strokeWidth="0.8"
                    markerEnd={`url(#${e.kind === 'pos' ? 'arrow-compbio' : 'inhibit-compbio'})`}
                    strokeDasharray={e.kind === 'neg' ? '3 2' : 'none'}
                    opacity="0.85"/>
                );
              })}
              {nodes.map(n => (
                <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                  <circle cx="0" cy="0" r="16" fill="var(--paper, white)"/>
                  <circle cx="0" cy="0" r="16"/>
                  <text x="0" y="3" textAnchor="middle"
                    fontSize="9" fontFamily='"JetBrains Mono", monospace'
                    fill={color} stroke="none">{n.id}</text>
                </g>
              ))}
            </>
          );
        })()}
      </g>
    </svg>
  ),
};

// legacy alias for sidebar still referencing InkNeuron
window.InkNeuron = ({ kind, color, style }) => {
  const mapping = { network: 'about', purkinje: 'research', 'axon-bundle': 'work', synapse: 'projects' };
  const page = mapping[kind] || 'about';
  return <window.Figure mode="neuro" page={page} color={color} style={style} />;
};

// EEG trace
window.EEGTrace = function EEGTrace({ t, accent, width = 260, height = 40 }) {
  const pts = [];
  const N = 160;
  for (let i = 0; i < N; i++) {
    const x = i / (N - 1);
    const y = 0.5
      + 0.22 * Math.sin(x * 30 + t * 3.0)
      + 0.10 * Math.sin(x * 85 - t * 2.2)
      + 0.04 * Math.sin(x * 210 + t * 5.4);
    pts.push([x * width, y * height]);
  }
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height }}>
      <polyline points={pts.map(p => p.join(',')).join(' ')}
        fill="none" stroke={accent} strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
};

window.useTick = function useTick() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, start = performance.now();
    const loop = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
};

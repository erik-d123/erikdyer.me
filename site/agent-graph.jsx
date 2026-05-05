// agent-graph.jsx
// A live force-directed graph of LLM agent rollouts: nodes are sampled
// rollouts, edges are pairwise agreement weights. Settles under Verlet
// physics, drifts continuously, repels under the cursor. Renders edges and
// nodes via WebGL2. Pure shader, no library. Skips on prefers-reduced-motion
// or when WebGL2 is unavailable.

window.AgentGraph = function AgentGraph({
  accent,
  nodeCount = 120,
  height = 340,
}) {
  const wrapRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const cleanupRef = React.useRef(null);
  const [hovered, setHovered] = React.useState(null);

  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || reduce) return;

    const gl = canvas.getContext('webgl2', { premultipliedAlpha: false, antialias: true, alpha: true });
    if (!gl) return;

    const tint = parseAccentToRgb(accent);
    const inkRgb = [0.13, 0.13, 0.15];

    // ---------- Build the graph ----------
    const N = nodeCount;
    const nodes = new Array(N);
    // Cluster initial positions: 3 loose clusters mimicking sampled rollouts.
    // Spread horizontally so a wide panel doesn't collapse them in the center.
    const clusters = 3;
    const clusterCenters = [
      { x: 0.22, y: 0.46 },
      { x: 0.50, y: 0.58 },
      { x: 0.78, y: 0.42 },
    ];
    for (let i = 0; i < N; i++) {
      const ci = i % clusters;
      const c = clusterCenters[ci];
      nodes[i] = {
        x: c.x + (Math.random() - 0.5) * 0.18,
        y: c.y + (Math.random() - 0.5) * 0.30,
        vx: 0, vy: 0,
        cluster: ci,
        agreement: 0.5 + Math.random() * 0.5, // assigned per-rollout meta
      };
    }
    // Edges: within-cluster k-nearest (strong), plus a few inter-cluster bridges.
    const edges = [];
    const seen = new Set();
    const addEdge = (i, j, w, target) => {
      const k = i < j ? `${i},${j}` : `${j},${i}`;
      if (seen.has(k)) return;
      seen.add(k);
      edges.push({ a: i, b: j, w, target });
    };
    // Within-cluster k-NN
    for (let ci = 0; ci < clusters; ci++) {
      const members = [];
      for (let i = 0; i < N; i++) if (nodes[i].cluster === ci) members.push(i);
      for (const i of members) {
        const ds = members
          .filter((j) => j !== i)
          .map((j) => {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            return { j, d: dx * dx + dy * dy };
          })
          .sort((a, b) => a.d - b.d);
        const k = 3;
        for (let n = 0; n < Math.min(k, ds.length); n++) {
          const j = ds[n].j;
          const w = 0.55 + Math.random() * 0.4;
          addEdge(i, j, w, 0.055 + (1 - w) * 0.04);
        }
      }
    }
    // A few inter-cluster bridges (sparse, low-weight)
    const bridges = 6;
    for (let b = 0; b < bridges; b++) {
      const ci = b % clusters;
      const cj = (ci + 1) % clusters;
      const aMembers = [];
      const bMembers = [];
      for (let i = 0; i < N; i++) {
        if (nodes[i].cluster === ci) aMembers.push(i);
        if (nodes[i].cluster === cj) bMembers.push(i);
      }
      const ai = aMembers[(b * 7) % aMembers.length];
      const bi = bMembers[(b * 11) % bMembers.length];
      addEdge(ai, bi, 0.18, 0.30);
    }

    // ---------- GL programs ----------
    const edgeVert = `#version 300 es
      in vec2 a_pos;
      in float a_alpha;
      out float v_alpha;
      uniform vec2 u_size;
      void main() {
        vec2 ndc = (a_pos * 2.0 - 1.0) * vec2(1.0, -1.0);
        gl_Position = vec4(ndc, 0.0, 1.0);
        v_alpha = a_alpha;
      }`;
    const edgeFrag = `#version 300 es
      precision highp float;
      in float v_alpha;
      uniform vec3 u_tint;
      uniform vec3 u_ink;
      out vec4 fragColor;
      void main() {
        // Mostly ink, slight tint for higher-weight edges
        vec3 c = mix(u_ink, u_tint, smoothstep(0.3, 1.0, v_alpha));
        fragColor = vec4(c, v_alpha * 0.85);
      }`;

    const nodeVert = `#version 300 es
      in vec2 a_pos;
      in float a_size;
      in float a_glow;
      out float v_glow;
      uniform vec2 u_size;
      void main() {
        vec2 ndc = (a_pos * 2.0 - 1.0) * vec2(1.0, -1.0);
        gl_Position = vec4(ndc, 0.0, 1.0);
        gl_PointSize = a_size;
        v_glow = a_glow;
      }`;
    const nodeFrag = `#version 300 es
      precision highp float;
      in float v_glow;
      uniform vec3 u_tint;
      uniform vec3 u_ink;
      out vec4 fragColor;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c) * 2.0;
        float core = smoothstep(1.0, 0.0, d);
        float halo = smoothstep(1.6, 0.55, d) * v_glow * 0.6;
        vec3 col = mix(u_ink, u_tint, 0.45 + 0.55 * v_glow);
        float a = core + halo;
        if (a < 0.02) discard;
        fragColor = vec4(col, a);
      }`;

    const edgeProg = makeProgram(gl, edgeVert, edgeFrag);
    const nodeProg = makeProgram(gl, nodeVert, nodeFrag);
    if (!edgeProg || !nodeProg) return;

    const edgeBuf = gl.createBuffer();   // 2 verts per edge × (x, y, alpha)
    const nodeBuf = gl.createBuffer();   // 1 vert per node × (x, y, size, glow)
    const edgeData = new Float32Array(edges.length * 2 * 3);
    const nodeData = new Float32Array(N * 4);

    const eLoc = {
      a_pos:   gl.getAttribLocation(edgeProg, 'a_pos'),
      a_alpha: gl.getAttribLocation(edgeProg, 'a_alpha'),
      u_tint:  gl.getUniformLocation(edgeProg, 'u_tint'),
      u_ink:   gl.getUniformLocation(edgeProg, 'u_ink'),
      u_size:  gl.getUniformLocation(edgeProg, 'u_size'),
    };
    const nLoc = {
      a_pos:  gl.getAttribLocation(nodeProg, 'a_pos'),
      a_size: gl.getAttribLocation(nodeProg, 'a_size'),
      a_glow: gl.getAttribLocation(nodeProg, 'a_glow'),
      u_tint: gl.getUniformLocation(nodeProg, 'u_tint'),
      u_ink:  gl.getUniformLocation(nodeProg, 'u_ink'),
      u_size: gl.getUniformLocation(nodeProg, 'u_size'),
    };

    // ---------- Pointer state ----------
    const cursor = { x: -1, y: -1, active: false };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) {
        cursor.active = false;
        return;
      }
      cursor.x = x;
      cursor.y = y;
      cursor.active = true;
    };
    const onLeave = () => { cursor.active = false; };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    // ---------- Hover detection (DOM-side, throttled) ----------
    let lastHover = null;
    const hoverFn = () => {
      if (!cursor.active) {
        if (lastHover !== null) { lastHover = null; setHovered(null); }
        return;
      }
      let best = -1, bestD = 0.0009;
      for (let i = 0; i < N; i++) {
        const dx = nodes[i].x - cursor.x;
        const dy = nodes[i].y - cursor.y;
        const d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = i; }
      }
      if (best !== lastHover) {
        lastHover = best;
        setHovered(best >= 0 ? { idx: best, agreement: nodes[best].agreement, cluster: nodes[best].cluster } : null);
      }
    };

    // ---------- Resize ----------
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ---------- Physics (Verlet) ----------
    // Operate in aspect-corrected world coords: x in [0..a], y in [0..1].
    // We store node positions in normalized [0..1]^2 but scale x by aspect
    // when computing forces (so geometry feels uniform), and apply boundary
    // springs in the same normalized space so the panel stays full-width.
    const REPULSION = 0.00040;
    const REPULSION_CUTOFF_SQ = 0.06; // world-space squared distance cutoff
    const SPRING_K = 0.060;
    const CENTER_K = 0.0050;
    const DAMP = 0.84;
    const CURSOR_R = 0.18;
    const CURSOR_F = 0.0070;
    const JITTER = 0.00010;

    const step = () => {
      const a = canvas.width / canvas.height;
      const ia = 1 / a;
      // Pairwise repulsion (O(N^2); local cutoff for stability)
      for (let i = 0; i < N; i++) {
        const ni = nodes[i];
        let fx = 0, fy = 0;
        for (let j = 0; j < N; j++) {
          if (i === j) continue;
          const nj = nodes[j];
          let dx = (ni.x - nj.x) * a;
          let dy = (ni.y - nj.y);
          const d2 = dx * dx + dy * dy + 1e-5;
          if (d2 > REPULSION_CUTOFF_SQ) continue;
          const inv = REPULSION / d2;
          fx += dx * inv;
          fy += dy * inv;
        }
        // Center pull — balanced, normalized space (no aspect multiplier on x)
        fx += (0.5 - ni.x) * CENTER_K;
        fy += (0.5 - ni.y) * CENTER_K;
        // Continuous slow drift so it never fully freezes
        fx += (Math.random() - 0.5) * JITTER;
        fy += (Math.random() - 0.5) * JITTER;
        // Cursor repulsion
        if (cursor.active) {
          let dx = (ni.x - cursor.x) * a;
          let dy = (ni.y - cursor.y);
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CURSOR_R) {
            const f = (1 - d / CURSOR_R) * CURSOR_F / Math.max(d, 0.01);
            fx += dx * f;
            fy += dy * f;
          }
        }
        // Convert force back to normalized space when integrating x
        ni.vx = (ni.vx + fx * ia) * DAMP;
        ni.vy = (ni.vy + fy) * DAMP;
      }
      // Spring forces along edges
      for (let e = 0; e < edges.length; e++) {
        const ed = edges[e];
        const ni = nodes[ed.a], nj = nodes[ed.b];
        let dx = (nj.x - ni.x) * a;
        let dy = (nj.y - ni.y);
        const d = Math.sqrt(dx * dx + dy * dy) + 1e-5;
        const f = (d - ed.target) * SPRING_K * ed.w;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        ni.vx += fx * ia; ni.vy += fy;
        nj.vx -= fx * ia; nj.vy -= fy;
      }
      // Soft continuous wall: pushes nodes inward as they approach edges.
      // Stronger than a hard bounce; keeps padding so nodes don't pile.
      const WALL_STRENGTH = 0.020;
      const WALL_PAD_X = 0.10;
      const WALL_PAD_Y = 0.13;
      for (let i = 0; i < N; i++) {
        const n = nodes[i];
        const distLeft = n.x - WALL_PAD_X;
        const distRight = (1 - WALL_PAD_X) - n.x;
        const distTop = n.y - WALL_PAD_Y;
        const distBot = (1 - WALL_PAD_Y) - n.y;
        if (distLeft < 0)  n.vx += -distLeft * WALL_STRENGTH;
        if (distRight < 0) n.vx -= -distRight * WALL_STRENGTH;
        if (distTop < 0)   n.vy += -distTop * WALL_STRENGTH;
        if (distBot < 0)   n.vy -= -distBot * WALL_STRENGTH;
      }
      // Integrate + hard outer bound (safety net only)
      for (let i = 0; i < N; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0.015) { n.x = 0.015; n.vx = 0; }
        if (n.x > 0.985) { n.x = 0.985; n.vx = 0; }
        if (n.y < 0.025) { n.y = 0.025; n.vy = 0; }
        if (n.y > 0.975) { n.y = 0.975; n.vy = 0; }
      }
    };

    // ---------- Render ----------
    const render = () => {
      // Build edge buffer
      const dpr = canvas.width / canvas.clientWidth;
      // Mark connections to hovered for emphasis
      const hi = lastHover;
      // Edge data: 2 verts per edge, each (x, y, alpha)
      let p = 0;
      for (let i = 0; i < edges.length; i++) {
        const ed = edges[i];
        const a = nodes[ed.a], b = nodes[ed.b];
        let alpha = ed.w;
        if (hi !== null && (ed.a === hi || ed.b === hi)) alpha = Math.min(1.0, ed.w + 0.4);
        edgeData[p++] = a.x; edgeData[p++] = a.y; edgeData[p++] = alpha;
        edgeData[p++] = b.x; edgeData[p++] = b.y; edgeData[p++] = alpha;
      }
      // Node data: (x, y, size, glow)
      let q = 0;
      for (let i = 0; i < N; i++) {
        const n = nodes[i];
        let size = 8.0 * dpr + n.agreement * 4.0 * dpr;
        let glow = n.agreement * 0.55;
        if (hi !== null) {
          if (i === hi) { size += 7.0 * dpr; glow = 1.0; }
          else {
            // Brighten neighbors of hovered
            for (let e = 0; e < edges.length; e++) {
              const ed = edges[e];
              if (ed.a === hi && ed.b === i) { glow = Math.max(glow, ed.w); size += 2.0 * dpr; break; }
              if (ed.b === hi && ed.a === i) { glow = Math.max(glow, ed.w); size += 2.0 * dpr; break; }
            }
          }
        }
        nodeData[q++] = n.x; nodeData[q++] = n.y; nodeData[q++] = size; nodeData[q++] = glow;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      // Edges
      gl.useProgram(edgeProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, edgeBuf);
      gl.bufferData(gl.ARRAY_BUFFER, edgeData, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(eLoc.a_pos);
      gl.vertexAttribPointer(eLoc.a_pos, 2, gl.FLOAT, false, 12, 0);
      gl.enableVertexAttribArray(eLoc.a_alpha);
      gl.vertexAttribPointer(eLoc.a_alpha, 1, gl.FLOAT, false, 12, 8);
      gl.uniform3f(eLoc.u_tint, tint[0], tint[1], tint[2]);
      gl.uniform3f(eLoc.u_ink, inkRgb[0], inkRgb[1], inkRgb[2]);
      gl.uniform2f(eLoc.u_size, canvas.width, canvas.height);
      gl.lineWidth(1.5);
      gl.drawArrays(gl.LINES, 0, edges.length * 2);

      // Nodes
      gl.useProgram(nodeProg);
      gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuf);
      gl.bufferData(gl.ARRAY_BUFFER, nodeData, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(nLoc.a_pos);
      gl.vertexAttribPointer(nLoc.a_pos, 2, gl.FLOAT, false, 16, 0);
      gl.enableVertexAttribArray(nLoc.a_size);
      gl.vertexAttribPointer(nLoc.a_size, 1, gl.FLOAT, false, 16, 8);
      gl.enableVertexAttribArray(nLoc.a_glow);
      gl.vertexAttribPointer(nLoc.a_glow, 1, gl.FLOAT, false, 16, 12);
      gl.uniform3f(nLoc.u_tint, tint[0], tint[1], tint[2]);
      gl.uniform3f(nLoc.u_ink, inkRgb[0], inkRgb[1], inkRgb[2]);
      gl.uniform2f(nLoc.u_size, canvas.width, canvas.height);
      gl.drawArrays(gl.POINTS, 0, N);
    };

    let raf = 0;
    let visible = true;
    const onVis = () => { visible = !document.hidden; if (visible) raf = requestAnimationFrame(loop); };
    document.addEventListener('visibilitychange', onVis);

    const loop = () => {
      if (!visible) { raf = 0; return; }
      step();
      hoverFn();
      render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
      ro.disconnect();
      gl.deleteBuffer(edgeBuf);
      gl.deleteBuffer(nodeBuf);
      gl.deleteProgram(edgeProg);
      gl.deleteProgram(nodeProg);
    };
    return () => { if (cleanupRef.current) cleanupRef.current(); };
  }, [accent, nodeCount]);

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height }}>
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        display: 'block', cursor: 'crosshair',
      }} />
      {hovered && (
        <div style={{
          position: 'absolute', top: 12, right: 14, pointerEvents: 'none',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          letterSpacing: 0.5, color: 'oklch(0.40 0.02 60)',
          background: 'oklch(0.99 0.008 85)', padding: '5px 9px',
          border: '1px solid oklch(0.82 0.02 70)',
        }}>
          rollout #{String(hovered.idx).padStart(3, '0')} · cluster {hovered.cluster + 1} · agreement {hovered.agreement.toFixed(2)}
        </div>
      )}
    </div>
  );
};

function makeProgram(gl, vertSrc, fragSrc) {
  const make = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('shader error:', gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  };
  const vs = make(gl.VERTEX_SHADER, vertSrc);
  const fs = make(gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) return null;
  const p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('program link error:', gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

function parseAccentToRgb(str) {
  const c = document.createElement('canvas');
  c.width = c.height = 1;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = str;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [d[0] / 255, d[1] / 255, d[2] / 255];
}

// paper-bloom.jsx
// A slow ink-on-paper wash rendered in WebGL2: layered domain-warped value
// noise drifting across the hero, masked away from the title text band, with
// a soft cursor halo. Pure shader, no library. Skips on prefers-reduced-motion
// or when WebGL2 is unavailable.

window.PaperBloom = function PaperBloom({ accent, opacity = 0.16 }) {
  const canvasRef = React.useRef(null);
  const cleanupRef = React.useRef(null);

  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;

    const gl = canvas.getContext('webgl2', { premultipliedAlpha: false, antialias: false, alpha: true });
    if (!gl) return;

    const tint = parseAccentToRgb(accent);

    const vertSrc = `#version 300 es
      in vec2 a_pos;
      out vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }`;

    const fragSrc = `#version 300 es
      precision highp float;
      in vec2 v_uv;
      uniform vec2 u_res;       // canvas size in CSS pixels
      uniform float u_time;     // seconds since start
      uniform vec3 u_tint;
      uniform float u_alpha;
      uniform vec2 u_cursor;    // 0..1, normalized
      uniform float u_cursorPulse;
      out vec4 fragColor;

      // Hash + value-noise (good enough for a slow wash, fast)
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 78.233);
        return fract(p.x * p.y);
      }

      float vnoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      // Two-octave fbm with warped coordinates
      float fbm(vec2 p, float t) {
        // Domain warp using a coarse noise field
        vec2 q = vec2(vnoise(p + vec2(0.0, t * 0.06)),
                      vnoise(p + vec2(5.2, 1.3 - t * 0.05)));
        vec2 r = vec2(vnoise(p + 4.0 * q + vec2(1.7, 9.2 + t * 0.04)),
                      vnoise(p + 4.0 * q + vec2(8.3, 2.8 - t * 0.04)));
        float n = vnoise(p + 4.0 * r);
        n = n * 0.65 + vnoise(p * 2.1 + r * 1.5) * 0.35;
        return n;
      }

      void main() {
        // Aspect-corrected coordinate; controls grain scale
        vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
        vec2 p = v_uv * aspect * 2.4;
        float t = u_time * 0.05;            // slow drift

        float n = fbm(p, t);

        // Soft contrast: a thresholded but smooth bloom, sparse on the page
        float bloom = smoothstep(0.48, 0.82, n);

        // Mask away from the title text band (vertical 0.30 - 0.78)
        float yMid = abs(v_uv.y - 0.55);
        float textBand = smoothstep(0.10, 0.32, yMid);

        // Edge fade horizontally so the wash never crashes into card edges
        float xEdge = smoothstep(0.0, 0.20, v_uv.x) * smoothstep(1.0, 0.80, v_uv.x);

        // Subtle cursor halo: a wider warm bloom near the cursor
        float cd = distance(v_uv, u_cursor);
        float halo = smoothstep(0.22, 0.0, cd) * u_cursorPulse * 0.55;

        float a = (bloom * textBand * xEdge + halo * textBand * xEdge * 0.6) * u_alpha;
        fragColor = vec4(u_tint, a);
      }`;

    const prog = makeProgram(gl, vertSrc, fragSrc);
    if (!prog) return;

    const quadBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const loc = {
      a_pos:         gl.getAttribLocation(prog, 'a_pos'),
      u_res:         gl.getUniformLocation(prog, 'u_res'),
      u_time:        gl.getUniformLocation(prog, 'u_time'),
      u_tint:        gl.getUniformLocation(prog, 'u_tint'),
      u_alpha:       gl.getUniformLocation(prog, 'u_alpha'),
      u_cursor:      gl.getUniformLocation(prog, 'u_cursor'),
      u_cursorPulse: gl.getUniformLocation(prog, 'u_cursorPulse'),
    };

    const cursor = { x: 0.5, y: 0.5, pulse: 0 };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) return;
      cursor.x = x;
      cursor.y = y;
      cursor.pulse = Math.min(1, cursor.pulse + 0.3);
    };
    window.addEventListener('mousemove', onMove);

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

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const onVis = () => { visible = !document.hidden; if (visible) raf = requestAnimationFrame(loop); };
    document.addEventListener('visibilitychange', onVis);

    const loop = () => {
      if (!visible) { raf = 0; return; }
      const now = (performance.now() - start) / 1000;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
      gl.enableVertexAttribArray(loc.a_pos);
      gl.vertexAttribPointer(loc.a_pos, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(loc.u_res, canvas.width, canvas.height);
      gl.uniform1f(loc.u_time, now);
      gl.uniform3f(loc.u_tint, tint[0], tint[1], tint[2]);
      gl.uniform1f(loc.u_alpha, opacity);
      gl.uniform2f(loc.u_cursor, cursor.x, cursor.y);
      gl.uniform1f(loc.u_cursorPulse, cursor.pulse);

      cursor.pulse *= 0.96;

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      ro.disconnect();
      gl.deleteBuffer(quadBuf);
      gl.deleteProgram(prog);
    };
    return () => { if (cleanupRef.current) cleanupRef.current(); };
  }, [accent, opacity]);

  return (
    <canvas ref={canvasRef} aria-hidden="true" style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', display: 'block',
    }} />
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

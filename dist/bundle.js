(function(){
/* ---- shared.jsx ---- */
window.PALETTES = {
  cream: {
    name: "cream",
    bg: "oklch(0.97 0.012 85)",
    bgAlt: "oklch(0.94 0.015 85)",
    ink: "oklch(0.22 0.02 60)",
    inkSoft: "oklch(0.40 0.02 60)",
    inkMute: "oklch(0.60 0.015 70)",
    rule: "oklch(0.82 0.02 70)",
    paper: "oklch(0.99 0.008 85)"
  },
  paper: {
    name: "paper",
    bg: "oklch(0.97 0.005 240)",
    bgAlt: "oklch(0.94 0.008 240)",
    ink: "oklch(0.22 0.015 260)",
    inkSoft: "oklch(0.42 0.015 260)",
    inkMute: "oklch(0.60 0.012 260)",
    rule: "oklch(0.85 0.01 250)",
    paper: "oklch(0.99 0.003 240)"
  }
};
window.ACCENTS = {
  sage: "oklch(0.60 0.10 150)",
  periwinkle: "oklch(0.58 0.14 265)",
  coral: "oklch(0.65 0.17 28)"
};
window.PAGE_ACCENT = {
  about: "periwinkle",
  research: "sage",
  work: "coral",
  projects: "periwinkle",
  timeline: "coral"
};
window.STATUS_ACCENT = {
  research: "sage",
  public: "periwinkle",
  course: "coral"
};
window.CONTACT_LINKS = {
  email: "mailto:erikdyer@princeton.edu",
  github: "https://github.com/erik-d123",
  linkedin: "https://www.linkedin.com/in/erikcdyer"
};
window.FEATURE_FLAGS = {
  timeline: false
};
window.useTick = function useTick() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, start = performance.now();
    const loop = (now) => {
      setT((now - start) / 1e3);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
};
window.useViewport = function useViewport() {
  const read = () => ({
    width: window.innerWidth || 1024,
    height: window.innerHeight || 768
  });
  const [viewport, setViewport] = React.useState(read);
  React.useEffect(() => {
    const onResize = () => setViewport(read());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return viewport;
};

/* ---- sidebar.jsx ---- */
window.Sidebar = function Sidebar({ page, setPage, palette, accentKey, compact = false }) {
  const P = palette;
  const A = window.ACCENTS;
  const { width } = window.useViewport();
  const narrow = compact && width < 680;
  const tiny = compact && width < 520;
  const pageAccent = (id) => A[window.PAGE_ACCENT[id]] || A[accentKey];
  const nav = [
    { id: "about", label: "about" },
    { id: "research", label: "research" },
    { id: "work", label: "work" },
    { id: "projects", label: "projects" },
    { id: "timeline", label: "timeline" }
  ].filter((n) => n.id !== "timeline" || window.FEATURE_FLAGS.timeline);
  return /* @__PURE__ */ React.createElement("aside", { style: {
    position: compact ? "relative" : "sticky",
    top: 0,
    height: compact ? "auto" : "100vh",
    width: compact ? "100%" : 300,
    flexShrink: 0,
    borderRight: compact ? "none" : `1px solid ${P.rule}`,
    borderBottom: compact ? `1px solid ${P.rule}` : "none",
    background: P.bgAlt,
    display: "flex",
    flexDirection: narrow ? "column" : compact ? "row" : "column",
    padding: compact ? "18px 20px 16px" : "30px 26px",
    fontFamily: "Inter, system-ui, sans-serif",
    color: P.ink,
    gap: narrow ? 14 : compact ? 18 : 0,
    alignItems: narrow ? "stretch" : compact ? "center" : "stretch",
    overflowX: narrow ? "visible" : compact ? "auto" : "visible"
  } }, /* @__PURE__ */ React.createElement("div", { style: { minWidth: narrow ? 0 : compact ? 170 : "auto" } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10,
    letterSpacing: 1.6,
    color: P.inkMute,
    marginBottom: 8,
    animation: "inkFade 360ms var(--ease-out-quart) both"
  } }, "PORTFOLIO"), /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: '"Fraunces", Georgia, serif',
    fontSize: 34,
    lineHeight: 0.95,
    letterSpacing: -1,
    color: P.ink,
    fontWeight: 400,
    animation: "inkFade 500ms var(--ease-out-expo) both",
    animationDelay: "70ms"
  } }, "Erik Dyer"), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: 10,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10,
    color: P.inkMute,
    letterSpacing: 0.4,
    lineHeight: 1.7,
    animation: "inkFade 380ms var(--ease-out-quart) both",
    animationDelay: "180ms"
  } }, "princeton \xB7 ece", /* @__PURE__ */ React.createElement("br", null), "ai systems \xB7 infra")), /* @__PURE__ */ React.createElement("nav", { style: {
    borderTop: compact ? "none" : `1px solid ${P.rule}`,
    paddingTop: compact ? 0 : 16,
    display: "flex",
    flexDirection: compact ? "row" : "column",
    gap: narrow ? 6 : compact ? 8 : 2,
    flex: narrow ? "0 0 auto" : compact ? "1 0 auto" : "0 0 auto",
    width: narrow ? "100%" : "auto",
    overflowX: narrow ? "visible" : compact ? "auto" : "visible",
    flexWrap: narrow ? "wrap" : "nowrap"
  } }, nav.map((n, i) => {
    const active = page === n.id;
    const nAcc = pageAccent(n.id);
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: n.id,
        onClick: () => setPage(n.id),
        "aria-current": active ? "page" : void 0,
        style: {
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: tiny ? "8px 6px" : compact ? "8px 10px" : "8px 2px",
          cursor: "pointer",
          fontFamily: "Inter, sans-serif",
          fontSize: tiny ? 14 : 15,
          color: active ? P.ink : P.inkSoft,
          letterSpacing: -0.2,
          display: "flex",
          alignItems: "center",
          gap: 12,
          transition: "color .2s var(--ease-out-quart)",
          minHeight: 44,
          whiteSpace: "nowrap",
          animation: "inkFade 380ms var(--ease-out-quart) both",
          animationDelay: `${260 + i * 60}ms`
        },
        onMouseEnter: (e) => {
          if (!active) e.currentTarget.style.color = P.ink;
        },
        onMouseLeave: (e) => {
          if (!active) e.currentTarget.style.color = P.inkSoft;
        }
      },
      /* @__PURE__ */ React.createElement("span", { style: {
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: active ? nAcc : "transparent",
        border: `1px solid ${nAcc}`,
        boxShadow: active ? `0 0 0 4px ${nAcc.replace(")", " / 0.18)")}` : "none",
        transition: "background-color .25s var(--ease-out-quart), box-shadow .25s var(--ease-out-quart)",
        viewTransitionName: active ? "nav-active-dot" : void 0
      } }),
      /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }, n.label)
    );
  })), (!compact || narrow) && /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: compact ? 4 : "auto",
    paddingTop: 16,
    borderTop: `1px dashed ${P.rule}`,
    display: "flex",
    flexWrap: "wrap",
    gap: 14,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 11,
    letterSpacing: 0.4,
    animation: "inkFade 420ms var(--ease-out-quart) both",
    animationDelay: "520ms"
  } }, Object.entries(window.CONTACT_LINKS).map(([k, href]) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: k,
      href,
      target: href.startsWith("http") ? "_blank" : void 0,
      rel: href.startsWith("http") ? "noopener noreferrer" : void 0,
      style: {
        color: P.inkMute,
        textDecoration: "none",
        transition: "color .2s var(--ease-out-quart)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.color = P.ink;
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.color = P.inkMute;
      }
    },
    k
  ))));
};

/* ---- paper-bloom.jsx ---- */
window.PaperBloom = function PaperBloom({ accent, opacity = 0.16 }) {
  const canvasRef = React.useRef(null);
  const cleanupRef = React.useRef(null);
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: false, antialias: false, alpha: true });
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
      a_pos: gl.getAttribLocation(prog, "a_pos"),
      u_res: gl.getUniformLocation(prog, "u_res"),
      u_time: gl.getUniformLocation(prog, "u_time"),
      u_tint: gl.getUniformLocation(prog, "u_tint"),
      u_alpha: gl.getUniformLocation(prog, "u_alpha"),
      u_cursor: gl.getUniformLocation(prog, "u_cursor"),
      u_cursorPulse: gl.getUniformLocation(prog, "u_cursorPulse")
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
    window.addEventListener("mousemove", onMove);
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
    const onVis = () => {
      visible = !document.hidden;
      if (visible) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);
    const loop = () => {
      if (!visible) {
        raf = 0;
        return;
      }
      const now = (performance.now() - start) / 1e3;
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
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      gl.deleteBuffer(quadBuf);
      gl.deleteProgram(prog);
    };
    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [accent, opacity]);
  return /* @__PURE__ */ React.createElement("canvas", { ref: canvasRef, "aria-hidden": "true", style: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    display: "block"
  } });
};
function makeProgram(gl, vertSrc, fragSrc) {
  const make = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error("shader error:", gl.getShaderInfoLog(s));
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
    console.error("program link error:", gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}
function parseAccentToRgb(str) {
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = str;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [d[0] / 255, d[1] / 255, d[2] / 255];
}

/* ---- pages-about.jsx ---- */
window.PageShell = function PageShell({ palette, title, subtitle, accent, children, backdrop = null }) {
  const P = palette;
  const { width } = window.useViewport();
  const compact = width < 1100;
  const narrow = width < 640;
  return /* @__PURE__ */ React.createElement("div", { key: title }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: compact ? "34px 24px 24px" : "60px 72px 32px",
    borderBottom: `1px solid ${P.rule}`,
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: compact ? 20 : 40,
    alignItems: "end",
    position: "relative",
    overflow: "hidden",
    minHeight: backdrop ? compact ? 220 : 300 : void 0
  } }, backdrop, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 11,
    letterSpacing: 2,
    color: P.inkMute,
    marginBottom: 14
  } }, /* @__PURE__ */ React.createElement("span", { style: {
    color: accent,
    display: "inline-block",
    animation: "dotPop 320ms var(--ease-out-quart) both",
    viewTransitionName: "section-dot"
  } }, "\u25CF"), /* @__PURE__ */ React.createElement("span", { style: {
    marginLeft: 10,
    display: "inline-block",
    animation: "inkFade 360ms var(--ease-out-quart) both",
    animationDelay: "60ms",
    viewTransitionName: "section-label"
  } }, title.toUpperCase())), /* @__PURE__ */ React.createElement("h1", { style: {
    margin: 0,
    fontFamily: '"Fraunces", Georgia, serif',
    fontWeight: 400,
    fontSize: narrow ? 40 : compact ? "clamp(44px, 8vw, 60px)" : "clamp(52px, 6vw, 76px)",
    lineHeight: 1,
    letterSpacing: -1.2,
    color: P.ink,
    textWrap: "pretty",
    animation: "inkFade 600ms var(--ease-out-expo) both",
    animationDelay: "140ms",
    viewTransitionName: "hero-title"
  } }, subtitle))), /* @__PURE__ */ React.createElement("div", { style: {
    padding: compact ? "30px 24px 72px" : "48px 72px 96px",
    animation: "inkFade 500ms var(--ease-out-quart) both",
    animationDelay: "280ms"
  } }, children));
};
window.AboutPage = function AboutPage({ palette }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.about];
  const { width } = window.useViewport();
  const compact = width < 1100;
  return /* @__PURE__ */ React.createElement(
    window.PageShell,
    {
      palette: P,
      title: "about",
      accent,
      subtitle: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("em", { style: { color: accent } }, "Electrical & Computer Engineering"), " at Princeton"),
      backdrop: /* @__PURE__ */ React.createElement(window.PaperBloom, { accent, opacity: 0.24 })
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      display: "grid",
      gridTemplateColumns: compact ? "1fr" : "minmax(0, 1fr) minmax(360px, 0.78fr)",
      gap: compact ? 24 : 56,
      maxWidth: 1080,
      alignItems: "start"
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: "Inter, sans-serif",
      fontSize: 18,
      lineHeight: 1.7,
      color: P.inkSoft,
      textWrap: "pretty",
      maxWidth: 660
    } }, /* @__PURE__ */ React.createElement("p", { style: { marginTop: 0 } }, "Junior at Princeton exploring how LLM agents coordinate and fail on long-horizon tasks. Drawn to the systems work that turns agents into reliable products: agent infrastructure, inference, and the problems underneath")), /* @__PURE__ */ React.createElement("aside", { style: {
      background: P.paper,
      border: `1px solid ${P.rule}`,
      padding: "26px 28px",
      alignSelf: "start"
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10,
      letterSpacing: 1.4,
      color: P.inkMute,
      marginBottom: 16
    } }, "// CURRENT SNAPSHOT"), [
      ["school", "Princeton, 2027"],
      ["degree", "Electrical & Computer Eng."],
      ["lane", "agents \xB7 ML systems"],
      ["builds", "evals \xB7 agent infra \xB7 serving"],
      ["industry", "Databricks \xB7 Amazon \xB7 BlueHalo"]
    ].map(([k, v], i) => /* @__PURE__ */ React.createElement("div", { key: k, style: {
      display: "grid",
      gridTemplateColumns: "64px minmax(0, 1fr)",
      gap: 14,
      alignItems: "baseline",
      padding: "9px 0",
      borderTop: i === 0 ? "none" : `1px dashed ${P.rule}`,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 12,
      animation: "inkFade 420ms var(--ease-out-quart) both",
      animationDelay: `${380 + i * 55}ms`
    } }, /* @__PURE__ */ React.createElement("span", { style: { color: P.inkMute, letterSpacing: 0.3 } }, k), /* @__PURE__ */ React.createElement("span", { style: { color: P.ink, textAlign: "right" } }, v)))))
  );
};

/* ---- pages-research.jsx ---- */
window.ResearchPage = function ResearchPage({ palette }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.research];
  const { width } = window.useViewport();
  const compact = width < 760;
  const labs = [
    {
      id: "nlp",
      name: "Princeton NLP Lab",
      advisor: "Karthik R. Narasimhan",
      role: "Senior Thesis",
      period: "2025 to present",
      topic: "Agentic Systems",
      desc: "Studying how LLM agents coordinate, and fail, on long-horizon tasks",
      tags: ["llm agents", "benchmarks", "memory", "evaluation"]
    },
    {
      id: "pvl",
      name: "Princeton Vision & Learning Lab",
      advisor: "Jia Deng",
      role: "Undergraduate Researcher",
      period: "2024 to present",
      topic: "Computer Vision, SLAM & Segmentation",
      desc: "Research engineering for 3D scene understanding with sim-to-real data, point clouds, and spatial models",
      tags: ["3d vision", "lidar", "slam", "point clouds"]
    }
  ];
  return /* @__PURE__ */ React.createElement(
    window.PageShell,
    {
      palette: P,
      title: "research",
      accent,
      subtitle: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("em", { style: { color: accent } }, "Agentic systems"), " and perception")
    },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 0, maxWidth: 1e3 } }, labs.map((lab, i) => /* @__PURE__ */ React.createElement("article", { key: lab.id, style: {
      display: "grid",
      gridTemplateColumns: compact ? "1fr" : "160px 1fr",
      gap: compact ? 18 : 48,
      padding: "36px 0",
      borderTop: i === 0 ? "none" : `1px solid ${P.rule}`,
      animation: "inkFade 460ms var(--ease-out-quart) both",
      animationDelay: `${320 + i * 90}ms`
    } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", paddingTop: 4 } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      letterSpacing: 1,
      color: accent,
      marginBottom: 8
    } }, lab.period), /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"Fraunces", serif',
      fontStyle: "italic",
      fontSize: 15,
      color: P.inkSoft,
      lineHeight: 1.4
    } }, lab.role)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      alignItems: "baseline",
      gap: 12,
      flexWrap: "wrap",
      marginBottom: 8
    } }, /* @__PURE__ */ React.createElement("h2", { style: {
      margin: 0,
      fontFamily: '"Fraunces", serif',
      fontWeight: 400,
      fontSize: 40,
      letterSpacing: -1,
      color: P.ink
    } }, lab.name)), /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: P.inkMute,
      letterSpacing: 0.6,
      marginBottom: 14
    } }, "ADVISED BY ", /* @__PURE__ */ React.createElement("span", { style: { color: P.ink } }, lab.advisor), /* @__PURE__ */ React.createElement("span", { style: { margin: "0 10px", color: P.inkMute } }, "\xB7"), "TOPIC ", /* @__PURE__ */ React.createElement("span", { style: { color: accent } }, lab.topic.toUpperCase())), /* @__PURE__ */ React.createElement("p", { style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.75,
      color: P.inkSoft,
      maxWidth: 640,
      textWrap: "pretty"
    } }, lab.desc), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, display: "flex", flexWrap: "wrap", gap: 6 } }, lab.tags.map((tag) => /* @__PURE__ */ React.createElement("span", { key: tag, style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10,
      padding: "3px 9px",
      border: `1px solid ${P.rule}`,
      color: P.inkSoft,
      letterSpacing: 0.3,
      background: P.paper
    } }, tag))))))),
    /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 64,
      maxWidth: 760,
      paddingTop: 28,
      borderTop: `1px solid ${P.rule}`
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10,
      letterSpacing: 1.4,
      color: P.inkMute,
      marginBottom: 12
    } }, "CURRENT THREADS"), /* @__PURE__ */ React.createElement("blockquote", { style: {
      margin: 0,
      fontFamily: '"Fraunces", serif',
      fontStyle: "italic",
      fontSize: 22,
      lineHeight: 1.5,
      color: P.inkSoft,
      textWrap: "pretty"
    } }, "The failures that matter, in agents or in spatial perception, are usually the ones least seen. Better evaluation is the throughline."))
  );
};

/* ---- pages-work.jsx ---- */
window.WorkPage = function WorkPage({ palette }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.work];
  const { width } = window.useViewport();
  const compact = width < 760;
  const jobs = [
    {
      co: "Databricks",
      role: "Software Engineer Intern",
      team: "Unity Catalog",
      loc: "Seattle, WA",
      period: "May 2026 to Aug 2026",
      tag: "incoming",
      desc: "Incoming on Unity Catalog, the governance and access-control layer for data and AI at lake scale",
      stack: ["scala", "spark", "catalog", "distributed systems"]
    },
    {
      co: "Amazon",
      role: "Software Development Engineer Intern",
      team: "Identity & Access Management",
      loc: "Seattle, WA",
      period: "May 2025 to Aug 2025",
      desc: "Worked on AWS IAM, the identity and policy engine that brokers access for AWS API calls at cloud scale",
      stack: ["java", "aws", "authz", "distributed services"]
    },
    {
      co: "BlueHalo",
      role: "Software Engineer Intern",
      team: "ML Inference Systems",
      loc: "Remote",
      period: "May 2024 to Aug 2024",
      desc: "Built inference infrastructure for production computer vision models, optimizing throughput and latency for real-time deployment",
      stack: ["python", "pytorch", "triton", "cv"]
    }
  ];
  return /* @__PURE__ */ React.createElement(
    window.PageShell,
    {
      palette: P,
      title: "work",
      accent,
      subtitle: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("em", { style: { color: accent } }, "Infrastructure"), " for AI systems")
    },
    /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1040, position: "relative" } }, !compact && /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      left: 180,
      top: 0,
      bottom: 0,
      width: 1,
      background: P.rule
    } }), jobs.map((j, i) => /* @__PURE__ */ React.createElement("article", { key: j.co, style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: compact ? "1fr" : "160px 40px 1fr",
      gap: compact ? 14 : 0,
      padding: "36px 0",
      borderBottom: i === jobs.length - 1 ? "none" : `1px dashed ${P.rule}`,
      animation: "inkFade 460ms var(--ease-out-quart) both",
      animationDelay: `${320 + i * 90}ms`
    } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: accent,
      letterSpacing: 0.8,
      marginBottom: 6
    } }, j.period.split(" to ")[0]), /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: P.inkMute,
      letterSpacing: 0.8
    } }, "to ", j.period.split(" to ")[1]), j.tag && /* @__PURE__ */ React.createElement("div", { style: {
      display: "inline-block",
      marginTop: 10,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 9,
      padding: "3px 8px",
      border: `1px solid ${accent}`,
      color: accent,
      letterSpacing: 1
    } }, j.tag.toUpperCase())), !compact && /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      left: 16,
      top: 6,
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: P.bg,
      border: `2px solid ${accent}`,
      boxShadow: `0 0 0 5px ${accent.replace(")", " / 0.12)")}`
    } })), /* @__PURE__ */ React.createElement("div", { style: { paddingLeft: compact ? 0 : 24 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("h2", { style: {
      margin: 0,
      fontFamily: '"Fraunces", serif',
      fontWeight: 400,
      fontSize: 42,
      letterSpacing: -1,
      color: P.ink
    } }, j.co), /* @__PURE__ */ React.createElement("span", { style: {
      fontFamily: '"Fraunces", serif',
      fontStyle: "italic",
      fontSize: 19,
      color: accent
    } }, "\xB7 ", j.team)), /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      color: P.inkMute,
      letterSpacing: 0.6,
      marginTop: 6
    } }, j.role.toUpperCase(), " \xB7 ", j.loc.toUpperCase()), /* @__PURE__ */ React.createElement("p", { style: {
      margin: "16px 0 0",
      fontSize: 16,
      lineHeight: 1.75,
      color: P.inkSoft,
      maxWidth: 640,
      textWrap: "pretty"
    } }, j.desc), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 } }, j.stack.map((s) => /* @__PURE__ */ React.createElement("span", { key: s, style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10,
      padding: "3px 9px",
      border: `1px solid ${P.rule}`,
      color: P.inkSoft,
      letterSpacing: 0.3,
      background: P.paper
    } }, s))))))),
    /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 56,
      padding: "28px 32px",
      background: P.paper,
      border: `1px solid ${P.rule}`,
      maxWidth: 1040,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 20,
      flexWrap: "wrap"
    } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10,
      letterSpacing: 1.4,
      color: P.inkMute,
      marginBottom: 6
    } }, "// APPENDIX"), /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"Fraunces", serif',
      fontSize: 22,
      letterSpacing: -0.4,
      color: P.ink
    } }, "Resume")), /* @__PURE__ */ React.createElement(
      "a",
      {
        href: "https://drive.google.com/file/d/1yym7v8DOnX1Zk_fqZzd2ga_3XL06BaVl/view?usp=drive_link",
        target: "_blank",
        rel: "noopener noreferrer",
        style: {
          textDecoration: "none",
          padding: "12px 22px",
          background: P.ink,
          color: P.bg,
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: 0.2,
          display: "inline-flex",
          alignItems: "center",
          gap: 10
        }
      },
      "resume.pdf \u2197"
    ))
  );
};

/* ---- pages-projects.jsx ---- */
window.ProjectsPage = function ProjectsPage({ palette }) {
  const P = palette, A = window.ACCENTS;
  const accent = A[window.PAGE_ACCENT.projects];
  const { width } = window.useViewport();
  const compact = width < 900;
  const contactLinks = window.CONTACT_LINKS;
  const projects = [
    {
      name: "Inter-Agent Alignment",
      tagline: "Wisdom of the crowds, applied at inference time",
      desc: "NLP research on aligning LLM agents through aggregation. Treating wisdom of the crowds as the inference algorithm: many sampled rollouts combined into a single decision rather than trusting any one agent in isolation",
      stack: ["python", "llm agents", "inference"],
      status: "research",
      proof: "NLP research"
    },
    {
      name: "HELMET long-context evals",
      tagline: "Retrieval was not the whole story.",
      desc: "Experiment work around HELMET and long-context reasoning. The useful diagnosis was that retrieval could stay strong while answer quality still dropped, pointing to answer-time dilution and locality issues.",
      stack: ["python", "llm evals", "analysis"],
      status: "public",
      proof: "Public repo",
      href: "https://github.com/erik-d123/HELMET"
    },
    {
      name: "Synthetic LiDAR Point Clouds",
      tagline: "From simulator to spatial perception",
      desc: "Research engineering for indoor 3D perception: synthetic scene generation, LiDAR and odometry pipelines, and Pointcept-compatible point clouds for downstream spatial models trained on simulated data",
      stack: ["python", "point clouds", "slam"],
      status: "research",
      proof: "PVL research"
    },
    {
      name: "CityLearn hybrid RL",
      tagline: "Residual RL around an expert controller.",
      desc: "Final-project system for CityLearn energy management. Built a hybrid expert plus residual PPO approach, then audited leaderboard claims, seed aggregation, and released-evaluation consistency.",
      stack: ["python", "ppo", "citylearn"],
      status: "course",
      proof: "COS435 final project"
    }
  ];
  return /* @__PURE__ */ React.createElement(
    window.PageShell,
    {
      palette: P,
      title: "projects",
      accent,
      subtitle: /* @__PURE__ */ React.createElement(React.Fragment, null, "Agents, perception, and ", /* @__PURE__ */ React.createElement("em", { style: { color: accent } }, "ML systems"))
    },
    /* @__PURE__ */ React.createElement("div", { style: {
      display: "grid",
      gridTemplateColumns: compact ? "1fr" : "repeat(2, minmax(0, 1fr))",
      gap: 20,
      maxWidth: 1040
    } }, projects.map((p, i) => {
      const statusAccent = A[window.STATUS_ACCENT[p.status]] || accent;
      return /* @__PURE__ */ React.createElement(
        "article",
        {
          key: p.name,
          style: {
            background: P.paper,
            border: `1px solid ${P.rule}`,
            padding: "28px 30px 26px",
            position: "relative",
            transition: "border-color .2s var(--ease-out-quart), transform .25s var(--ease-out-quart)",
            animation: "inkFade 460ms var(--ease-out-quart) both",
            animationDelay: `${320 + i * 70}ms`
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.borderColor = accent;
            e.currentTarget.style.transform = "translateY(-2px)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.borderColor = P.rule;
            e.currentTarget.style.transform = "translateY(0)";
          }
        },
        /* @__PURE__ */ React.createElement("div", { style: {
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          letterSpacing: 1.4,
          color: statusAccent,
          marginBottom: 14
        } }, p.status.toUpperCase()),
        /* @__PURE__ */ React.createElement("h2", { style: {
          margin: 0,
          fontFamily: '"Fraunces", serif',
          fontWeight: 400,
          fontSize: 32,
          letterSpacing: -0.8,
          color: P.ink
        } }, p.name),
        /* @__PURE__ */ React.createElement("div", { style: {
          marginTop: 6,
          fontFamily: '"Fraunces", serif',
          fontStyle: "italic",
          fontSize: 16,
          color: accent,
          letterSpacing: -0.2
        } }, p.tagline),
        /* @__PURE__ */ React.createElement("p", { style: {
          margin: "18px 0 0",
          fontSize: 14.5,
          lineHeight: 1.7,
          color: P.inkSoft,
          textWrap: "pretty"
        } }, p.desc),
        /* @__PURE__ */ React.createElement("div", { style: {
          marginTop: 18,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: P.inkMute,
          letterSpacing: 0.5
        } }, p.proof, p.href && /* @__PURE__ */ React.createElement(
          "a",
          {
            href: p.href,
            target: "_blank",
            rel: "noopener noreferrer",
            style: { color: accent, marginLeft: 12, textDecoration: "underline" }
          },
          "open \u2197"
        )),
        /* @__PURE__ */ React.createElement("div", { style: {
          marginTop: 22,
          paddingTop: 14,
          borderTop: `1px dashed ${P.rule}`,
          display: "flex",
          flexWrap: "wrap",
          gap: 6
        } }, p.stack.map((s) => /* @__PURE__ */ React.createElement("span", { key: s, style: {
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          padding: "3px 8px",
          border: `1px solid ${P.rule}`,
          color: P.inkSoft,
          letterSpacing: 0.3,
          background: P.bgAlt
        } }, s)))
      );
    })),
    /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 72,
      paddingTop: 28,
      borderTop: `1px solid ${P.rule}`,
      maxWidth: 1040,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexWrap: "wrap",
      gap: 24
    } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10,
      letterSpacing: 1.4,
      color: P.inkMute,
      marginBottom: 10
    } }, "// CONTACT"), /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: '"Fraunces", serif',
      fontSize: 32,
      letterSpacing: -0.8,
      color: P.ink,
      maxWidth: 620,
      lineHeight: 1.15
    } }, "Say hi")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, Object.entries(contactLinks).map(([x, href]) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: x,
        href,
        target: href.startsWith("http") ? "_blank" : void 0,
        rel: href.startsWith("http") ? "noopener noreferrer" : void 0,
        style: {
          padding: "10px 18px",
          border: `1px solid ${P.ink}`,
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: P.ink,
          textDecoration: "none",
          letterSpacing: 0.2,
          transition: "all .2s"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.background = P.ink;
          e.currentTarget.style.color = P.bg;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = P.ink;
        }
      },
      x,
      " \u2197"
    ))))
  );
};

/* ---- timeline-data.jsx ---- */
window.WORLD_MAP_PATH = `M321.1,455L320.4,456.3L319.6,457.5L314,457.2L308,457.3L304.7,456.4L304.7,456.3L303.2,455.5L309.2,455.6L315,455.9L317,454.8L318.4,453.9ZM55.4,453.5L50.3,453.9L46.8,452.9L45.3,452L45.2,451.8L43.4,451.1L45.1,450.1L50,450.5L52.7,451.4L54.7,452.3ZM359.6,449.7L362.9,450.8L364,452.4L364.3,453.6L364.4,454.9L360.3,455.8L356,456.4L351,457.1L345.4,457.6L339.1,457.4L335.6,456.5L336,455.5L341.7,454.7L344,453.8L345.7,452.7L346.9,451.7L348.5,450.7L350.2,449.7L351.6,449.7L355.6,449.1ZM156.8,437.5L160.2,437.9L163.4,437.5L161.9,438.4L159.4,439.1L155.7,438.9L153,437.9L153.6,437.1ZM145.2,437.5L149.3,438.5L147.7,438.4L144.2,438.2L140.6,437.4L142.5,436.9ZM216.1,433.3L219,433.7L221.9,433.4L223.5,434.9L221.4,434.7L218.1,434.8L214.9,434.7L211.2,434.9L208.5,434.3L207.1,433.2L208.8,432.8L212.2,433.1ZM297.5,430.7L297.8,431.9L297.3,433L296.6,434L293.4,434.3L290.5,434.9L287,434.8L288.3,433.8L285.1,434.1L282.2,434.5L280.1,433.7L280,432.6L282.9,431.6L284.7,431.3L287.8,431.4L288.6,430L288.7,429L288.7,426.9L290.2,425.6L292.7,425.2L294.1,426.2L294.7,427.2L295.8,428.4L296.7,429.5ZM0,467.4L0,467.4L0,467.4L0.2,467.5L2.5,465.9L7.3,466.7L7.6,466.6L8.4,466.4L9.3,466.1L10.1,465.9L10.4,465.8L10.8,465.8L11.1,465.8L15,467L18.4,465.8L19,465.7L26.8,465.2L29.3,465.8L30.6,466.2L34.6,467L42.2,467.7L48.2,468.6L58.5,469.2L66.2,468.5L77.5,469L83.9,469.8L91,469L98.4,468.3L99,467L88.5,466.9L79.8,466.3L77.6,465.3L70.4,464.7L70.9,463.5L71.9,462.4L72.9,461.4L72.4,460.3L67.9,459.6L65.9,458.6L61.8,457.8L68.2,458L74.4,457.5L78.3,458.4L83,457.6L87.4,456.7L89.6,455.8L88.6,454.7L85.2,453.9L81.2,453.1L75.8,453L71,452.6L65.8,452.4L64.1,451.4L60.6,450.5L58.5,449.6L57.7,446.6L59,446.8L61.4,447.7L65.8,447.4L70,447L72.2,448.2L76.4,447.9L80,447.3L83.3,446.6L86.4,445.7L90.4,445.5L90.3,444.5L89.3,443.5L90.1,442.5L93.6,442.1L95.1,443L99.2,442.4L102.3,441.8L106.1,441.7L109.7,441.4L113.3,440.8L116.2,440.2L119.4,439.7L121.5,439.8L123.3,440L127.3,439.7L130.9,440.1L134.5,440.1L138,439.7L141.6,440L145.6,440.2L149.3,440.1L153.2,440.2L157.1,440.2L160.8,440.1L163.5,439.4L166.7,438.9L170.1,439.5L173.3,439L176.2,438.1L177.9,438.9L178.8,439.9L180.5,440.8L183.3,440L186.5,441L190.1,441.3L193.2,442L196.9,441.9L200.3,441.4L204.3,441.5L208,441.9L211.6,442.3L213,441.2L211.3,440.3L210,439.4L206.5,439.1L205,438.2L204.5,437.2L203.5,435.2L205.6,435.5L209.1,435.7L212.5,435.5L215.6,436L218.4,436.7L219.5,437.7L223.1,437.8L226.6,437.5L230.2,437L233.5,436.6L236.2,437.3L239.8,437.1L242.1,435L244.2,436.2L247.3,436.7L250.6,436.4L252.8,437.5L256.3,437.6L259.6,437.9L262.7,438.5L264.8,437.5L265.9,436.5L268.5,437.6L272.2,437.3L274.9,437.9L276.7,438.8L280.3,438.5L283.1,437.9L285.8,437.3L289,436.9L292.8,436.6L296.2,436.2L298.8,435.6L300.3,434.8L301,433.7L300.7,432.6L299.8,431.5L298.9,430.5L298.1,429.4L297.4,428.5L297.2,427.4L297.5,426.4L298.7,425.4L299.8,424.3L300.2,423.3L299.7,422.1L299.4,421.1L300.7,419.9L302.1,419.1L303.9,418.1L305.7,417.2L307.8,416.5L308.9,415.3L310.3,414.6L312,413.9L314.6,413.8L316.2,412.9L318.1,412.4L320.3,412.1L322.2,411.4L323.7,410.6L325.8,410.2L327.4,410.9L326.4,411.8L323.7,412.6L322.5,413.2L320.6,412.8L318.4,413L316.5,413.6L314.6,414.3L313.3,415.1L312.9,416.2L313.1,417.1L314.3,418L312.5,418.7L310,418.9L308.5,419.8L307,420.6L305.3,421.7L304.9,422.7L305.8,423.8L307.2,424.7L309.4,425.3L311.5,426.1L312.6,427.2L313.1,428.2L313.9,429.2L315.2,430.1L316,431.1L316.3,433.6L317.1,434.5L317.3,435.6L318.2,436.6L317.8,438L316.3,439.1L314.8,440L311.2,440.4L310,441.3L308.4,442.2L304.4,443.2L300.8,443.6L297.5,444.2L293.9,444.8L291.7,445.9L287.4,446L282.8,445.9L278.5,446.1L274,446.1L274.9,447.1L278.9,447.6L281.9,448.3L283.6,449.3L280.6,450.1L276,449.9L272.2,450.5L272,451.6L271.9,452.7L275.1,453.6L275.6,454.6L279,455.6L284.7,456L289.5,456.7L293.3,457.5L298.2,458.4L304.8,458.8L311.3,459.5L315.9,460.3L320.8,461.2L323.4,462.5L324.7,463.4L328,462.5L332.4,461.7L337,460.9L342.6,460.2L347.3,459.5L353.9,459.4L360.5,459.8L365.8,460.4L367.6,459.3L371.3,458.5L378,458.4L383.3,457.9L388.3,457.3L393.8,456.9L399.7,456.4L403.9,455.8L402,454.8L400.8,453.9L400.8,452.9L395.7,453L390.2,453.4L385,453.4L384.2,452.4L384.6,450.4L385.8,449.9L389.6,449.2L394.1,448.6L397.3,447.8L400.6,447L403,446L406.6,445.5L410.2,445.2L412.1,444.9L416.2,444.8L420.1,444.5L423.4,444L426.6,443.3L429.6,442.7L433.3,441.9L435.6,441L438.1,440.2L438.9,439.1L436.1,438.5L437,437.4L438.8,436.6L441.6,436.1L444.5,435.4L447.2,434.6L449.3,433.6L450.6,432.3L452.5,431.6L455.7,431.7L457,432.6L460.2,432.7L460.3,431.7L461.7,430.7L464.6,430.9L465.2,431.9L468.4,432.1L471.9,431.6L475.2,431.3L478.2,431.5L479.4,432.6L482.3,431.7L485,431.2L488.1,430.8L491,430.5L493.8,429.8L496.7,429.4L499,428.8L500.6,427.9L502.6,428.6L505.4,428.2L507.3,429.5L508.8,430.4L511.9,429.9L513.1,428.8L515.8,428.1L519.3,428.3L520.3,429.3L522.5,428.3L525.4,428L528.5,427.9L531.4,427.9L534.3,428.2L537.2,428.4L538.5,429.3L540.2,430.1L543.1,429.6L546.2,429.5L549.3,429.5L552.2,429.4L554.9,429.1L557.7,428.7L560.1,428L562.6,427.5L565.3,427.3L567.3,426.6L568.8,425.1L570.3,424.2L573.1,424.6L574.1,425.6L576.4,426.2L579.2,426L581.1,426.9L583.1,427.6L585.8,427L586.7,425.8L589.1,425.4L591.9,424.5L594.5,424.1L597.6,423.6L599.7,423L601.9,422.4L604,421.8L606.5,422.1L608.9,421.2L610.6,420.4L613.1,420.5L615.3,419.9L615.9,418.9L618.1,418.2L620.3,417.7L623,417.2L625.4,417L627.8,417.2L630.3,417.5L632.4,418.2L632.7,419.3L635,420.2L636.7,421L639.8,421.3L641.6,422L643.8,422.7L646.4,422.9L648.5,422.4L650.8,421.3L653.3,421.8L655.9,422.2L658.4,422.5L661,422.7L663.7,422.7L665.9,425.5L665.8,426.1L665.5,427.3L662.9,428L660.8,429L661.2,430.1L664.2,430L663.8,431L662.5,432L661.2,433.1L663.2,434L666.3,434.2L669.4,433.8L670.9,432.7L671.7,431.7L673.2,430.9L674.9,430.1L675.6,429.2L677,427.9L678.6,427.6L681.7,427.5L684.3,427.2L687.1,426.8L688.4,425.7L689.1,424.7L691,423.7L693.6,423L695.8,422.5L697.3,421.6L698.8,421.2L700.7,420.8L703.4,421L705.8,420.8L708.4,420.4L711.3,420.6L713.3,419.9L714.6,418.1L715.6,418.8L716.9,420.1L719.1,420.6L721.7,420.8L724.2,420.5L727,420.7L729.5,420.8L731.1,420.5L733.4,420.6L735.4,421.2L737.8,420.9L740.7,420.9L743.1,420.5L745.9,420.9L747.7,420L749,419.1L750.9,418.3L754.2,416.4L755.9,416.7L758,417.5L759.8,418.4L763.2,420L765.8,420.1L768.2,420.1L771.1,419.8L774,419.4L776.2,418.7L778,417.9L781,417.8L782.9,417.2L785,417.7L786.4,418.6L788.3,419.4L791.2,419.3L793,420L796.2,420.6L799.6,420.9L802.3,420.7L804.4,419.9L806.2,419L808.6,418.8L811,419.2L813.8,419.4L816.3,419L818.7,419L821,419.3L823.5,419.6L825.9,419.1L828.7,418.7L831.5,418.6L834.5,418.6L836.9,418.3L839.4,418.1L840.1,416.8L840.2,415.7L841.9,416.4L842.3,417.6L843.2,418.7L844.3,419.6L846.6,420.1L849.6,419.9L853.1,419.9L855.5,419.7L859,419.7L861.5,419.7L865,419.8L868,420L869.9,420.8L869.3,421.8L871.1,422.6L873.9,423.2L876.9,423.9L880.4,424.4L884,424.8L886.7,425.2L889.7,425.2L891.4,424.4L893.8,425.1L895.8,425.9L898.2,426.6L901.4,426.8L904.5,427.1L905.8,428.2L908.8,428.8L910.9,429.7L913.8,430.2L916.9,430.1L919.8,430.3L923,430.2L926.2,430.4L929.1,430.8L931.9,431.4L934.7,431.9L936.5,432.7L936.2,433.8L934.8,434.7L933.6,435.9L932.7,436.8L931.4,437.9L927.9,438.4L926.4,439.3L922.9,439.9L921.7,440.9L919.9,441.9L918,442.8L916.9,443.8L916.2,444.8L915.9,446L916,447L917.5,448.1L918.1,449.1L919.3,450L924.3,450.4L925.3,451.5L920.5,451.9L916.4,452.5L911.4,452.6L909.1,454.1L908.7,455.4L907.5,456.4L906.1,457.4L909.7,458.3L911,459.4L913.3,460.4L916.6,461.2L920.3,462.1L924.3,462.9L930.4,463.8L931.7,465.1L939.4,465.6L939.9,465.8L941.9,466.6L949.3,466L955.4,466.8L960,467.4L960,481.5L480,481.5L0,481.5ZM299.3,385.1L302.8,386.7L306.5,387.4L305.3,388.7L302.8,388.9L301.4,387.9L300.6,389L298.3,389.8L295.4,389.5L293.4,388.7L290.7,388.3L287.3,386.8L284.6,385.4L280.9,382.4L283.1,383L286.8,384.8L290.4,385.7L291.8,384.5L292.6,382.7L295.1,381.6L297,381.9L298,383.1ZM323.9,377.8L326,379L325.2,379.9L321.6,380.7L320.4,379.8L318.1,381L316.8,379.8L320,378.2L322.3,378.9ZM667.4,374.1L663.3,374.3L663.3,372.8L663.6,371.7L663.8,371.2L665.5,372L668.1,372.4L668.2,372.9ZM867.7,350.3L870.3,351.2L871.8,350.9L873.8,350.4L875.4,350.5L875.6,353.7L874.7,354.6L874.4,356.8L873.5,356L871.7,357.9L871.1,357.7L869.5,357.7L867.8,355.4L867.5,353.6L865.9,351.3L866,350.1ZM941.4,350.6L942,351.7L943.9,350.7L944.7,351.8L944.7,352.9L943.7,354.2L941.9,356.1L940.6,357.2L941.5,358.5L939.5,358.5L937.2,359.5L936.5,361.3L935,363.9L932.9,365.1L931.6,365.9L929.1,365.8L927.4,365L924.5,364.8L924,363.8L925.5,361.8L928.8,359.2L930.5,358.7L932.4,357.7L934.7,356.3L936.3,354.9L937.5,352.9L938.5,352.2L938.9,350.7L940.8,349.5ZM945.6,337.9L947.6,340.8L947.6,338.9L948.8,339.7L949.2,341.7L951.4,342.5L953.2,342.8L954.7,341.7L956,342.1L955.4,344.4L954.6,346L952.6,345.9L951.8,346.7L952.1,347.9L951.7,348.4L950.7,349.8L949.4,351.6L947.3,352.7L946.8,352L945.7,351.6L947.3,349.4L946.4,347.9L943.5,346.9L943.6,345.9L945.5,345L946,342.9L945.9,341.2L944.8,339.4L944.9,339L943.6,337.9L941.5,335.5L940.4,333.6L941.4,333.4L942.8,334.9L944.9,335.6ZM925.7,300.6L924.6,301.3L923.2,300.5L921.3,299.3L919.5,297.9L917.8,296L917.4,295.1L918.6,295.2L920.1,296.1L921.2,297L922.1,297.7L924.3,299.4ZM955.7,287.8L956.6,288.5L956.1,289.9L954.5,290.3L953,290L952.8,288.8L953.8,287.9L955,288.2ZM960,285.7L958.3,286.3L956.6,286.9L956.3,285.9L957.6,285.4L958.4,285.2L960,284.4L960,285.7ZM0,284.4L0,284.4L0.5,284.3L0.2,285.5L0,285.7L0,285.7L0,285.7L0,284.4ZM927.6,285.4L926.7,285.8L925.8,284.6L925.9,283.9ZM925.6,281.4L926.1,283.5L925.3,283.2L924.8,283.3L924.4,282.6L924.3,280.5ZM613.5,277.7L613.9,280.9L614.6,282.1L614.3,283.4L613.9,284.2L613,282.6L612.5,283.4L613,285.4L612.7,286.5L612,287.1L611.8,289.4L610.8,292.5L609.5,296.2L607.8,301.2L606.8,304.9L605.6,308L603.4,308.7L601.1,309.8L599.6,309.1L597.4,308.2L596.7,306.8L596.5,304.4L595.6,302.3L595.3,300.3L595.8,298.4L597,298L597.1,297.1L598.3,295.1L598.6,293.4L598,292.1L597.5,290.4L597.2,288L598.2,286.5L598.5,284.8L599.9,284.7L601.3,284.1L602.3,283.6L603.5,283.6L605,282.1L607.2,280.4L608,279.1L607.6,278L608.8,278.3L610.2,276.4L610.3,274.8L611.2,273.6L612.1,274.8L612.8,275.9ZM862.8,278.2L863.8,280.3L865.5,279.3L866.4,280.4L867.7,281.5L867.4,282.7L868,285L868.4,286.3L869,286.6L869.8,288.9L869.5,290.3L870.4,292.1L873.3,293.5L875.1,294.7L876.9,295.9L876.6,296.5L878.1,298.2L879.1,301.1L880.2,300.5L881.3,301.7L881.9,301.3L882.4,304.1L884.3,305.7L885.5,306.8L887.6,308.9L888.4,311.1L888.4,312.6L888.2,314.2L889.5,316.5L889.4,318.8L888.9,320.1L888.2,322.5L888.2,324L887.7,325.9L886.5,328.3L884.6,329.6L883.6,331.7L882.7,333L881.9,335.3L880.9,336.7L880.2,338.6L879.9,340.5L880,341.3L878.5,342.3L875.5,342.4L873,343.4L871.8,344.5L870.2,345.6L868,344.4L866.3,344L866.8,342.6L865.3,343.1L863,345L860.7,344.3L859.1,343.9L857.6,343.7L855,342.9L853.3,341.3L852.8,339.2L852.2,337.9L850.9,336.8L848.3,336.5L849.2,335.2L848.6,333.2L847.2,335.1L844.9,335.6L846.3,334.1L846.7,332.5L847.7,331.2L847.5,329.3L845.3,331.5L843.7,332.4L842.6,334.6L840.6,333.5L840.6,332.1L839,330.1L837.6,329.1L838.1,328.5L834.6,326.9L832.8,326.8L830.2,325.5L825.4,325.8L822,326.7L818.9,327.6L816.4,327.4L813.6,328.8L811.3,329.4L810.7,330.8L809.8,331.9L807.5,332L805.8,332.2L803.5,331.7L801.6,332L799.7,332.1L798.1,333.6L797.4,333.4L796,334.2L794.7,335L792.8,334.9L791,334.9L788.2,333.2L786.7,332.7L786.8,331.2L788.1,330.8L788.6,330.2L788.5,329.3L788.8,327.4L788.5,325.8L787.1,323.1L786.7,321.6L786.8,320.1L785.7,318.4L785.6,317.6L784.5,316.5L784.1,314.4L782.6,312.3L782.2,311.2L783.4,312.3L782.5,309.9L783.8,310.6L784.6,311.7L784.6,310.3L783.3,308.2L783,307.4L782.4,306.6L782.7,305L783.2,304.4L783.6,303L783.3,301.5L784.4,299.5L784.6,301.6L785.7,299.7L787.9,298.8L789.2,297.7L791.2,296.7L792.4,296.5L793.2,296.9L795.3,295.9L796.9,295.6L797.3,295L798,294.7L799.5,294.8L802.3,294L803.7,292.8L804.4,291.4L806,290.1L806.1,289L806.2,287.5L808,285.3L809.2,287.6L810.3,287L809.3,285.8L810.2,284.5L811.4,285.1L811.7,283L813.1,281.7L813.8,280.7L815.1,280.2L815.2,279.5L816.3,279.8L816.4,279.1L817.6,278.7L818.8,278.4L820.8,279.6L822.3,281.2L824,281.2L825.7,281.4L825.1,280L826.4,277.8L827.6,277.1L827.2,276.5L828.3,275L829.9,274L831.3,274.3L833.5,273.8L833.5,272.5L831.5,271.6L833,271.2L834.7,271.9L836.1,273L838.4,273.6L839.1,273.4L840.8,274.2L842.4,273.4L843.4,273.7L844,273.1L845.2,274.5L844.5,275.9L843.5,277L842.6,277.1L842.9,278.1L842.1,279.5L841.1,280.8L841.3,281.5L843.5,283L845.5,283.8L846.9,284.8L848.8,286.3L849.6,286.3L851,287L851.4,287.9L853.9,288.8L855.7,287.8L856.2,286.4L856.7,285.2L857.1,283.8L857.9,281.6L857.5,280.4L857.7,279.6L857.4,278.1L857.7,276L858.2,275.5L857.8,274.6L858.5,273.2L859,271.7L859,271L860,270L860.8,271.3L861,273L861.6,273.3L861.8,274.4L862.7,275.8L862.9,277.3ZM912.3,269.5L913.1,270.4L911.2,270.4L910.2,268.7L911.8,269.4ZM801.9,268.8L800.8,268.9L797.3,267L799.7,266.5L801.1,267.3L802.1,268.1ZM908.9,267.9L907.9,267.9L906.3,267.6L905.7,267.2L905.9,266.2L907.6,266.6L908.5,267.2ZM911.1,267.1L910.7,267.6L908.8,265.3L908.2,263.7L909.1,263.7L910.1,265.8ZM811.8,268.6L809.5,269.2L809.2,268.8L809.5,267.9L810.6,266.3L813.3,265.2L813.6,264.6L815.9,264L817.7,263.9L818.6,263.6L819.6,263.9L818.6,264.6L815.8,265.8L813.6,266.6ZM794.4,263.1L795.4,263.8L797,263.6L797.7,264.7L794.6,265.3L792.7,265.6L791.3,265.6L792.2,264.1L793.7,264.1ZM807.7,263.1L807.3,264.6L803.3,265.4L799.8,265L799.8,264L801.9,263.5L803.6,264.3L805.4,264.1ZM906.3,263.8L906.5,264.3L904.4,263.2L902.9,262.2L901.9,261.3L902.3,261L903.5,261.7L905.7,262.9ZM900.1,261.1L899.6,261.3L898.4,260.7L897.3,259.6L897.4,259.1L899,260.3ZM769.7,259.6L774.8,259.9L775.4,258.8L780.3,260L781.3,261.8L785.3,262.3L788.6,263.8L785.5,264.9L782.6,263.8L780.2,263.9L777.4,263.7L774.9,263.2L771.8,262.2L769.9,261.9L768.7,262.2L763.9,261.1L763.4,260L761,259.8L762.8,257.3L766,257.4L768.2,258.5L769.3,258.7ZM839.3,258.1L837.9,259.9L837.6,257.9L838.1,256.9L838.7,256L839.3,256.8ZM895.7,259.7L894.9,260L893.8,259L892.6,257.3L892,255.2L892.4,255L892.7,255.8L893.5,256.4L894.8,258.1L896.1,259ZM885.3,256.1L883.9,256.4L883.5,257.1L882,257.8L880.6,258.4L879.2,258.4L877,257.6L875.5,256.9L875.7,256L878.1,256.4L879.6,256.2L880,254.9L880.4,254.9L880.6,256.3L882.2,256.1L882.9,255.2L884.4,254.2L884.1,252.6L885.7,252.6L886.2,253L886.2,254.5ZM819.3,250.8L818.3,251.6L816.5,251.1L816,250L818.7,249.9ZM827.9,249.8L828.9,251.8L826.6,250.7L824.4,250.5L822.9,250.7L821.1,250.6L821.7,249.1L825,249ZM888.4,253.5L887.5,254.2L887,252.7L886.4,251.6L885.2,250.8L883.7,249.6L881.8,248.8L882.5,248.2L883.9,248.9L884.9,249.5L886,250.2L887,251.3L888.1,252.1ZM837.7,244.6L838.5,248.9L841.2,250.5L843.4,247.7L846.5,246.1L848.9,246.1L851.2,247L853.1,248L856,248.5L860.6,250.3L865.6,251.8L867.4,253.2L868.9,254.5L869.3,256.1L873.7,257.8L874.4,259.2L871.9,259.5L872.5,261.2L874.9,263L876.6,265.8L878.2,265.7L878,266.9L880.1,267.4L879.3,267.9L882.1,269L881.8,269.7L880.1,269.9L879.4,269.2L877.1,268.9L874.4,268.5L872.4,266.8L870.8,265.4L869.5,263L866,261.9L863.7,262.6L862.1,263.5L862.4,265.5L860.3,266.4L858.9,266L856.1,265.8L853.7,263.7L851,263.1L850.3,263.9L847,264L848.1,261.8L849.8,261L849.1,258.1L847.8,255.9L842.6,253.7L840.4,253.4L836.4,251L835.7,252.3L834.6,252.5L834,251.5L834,250.4L832,249L834.8,248.1L836.7,248.1L836.5,247.4L832.6,247.4L831.6,245.8L829.2,245.3L828.1,244L831.6,243.4L833,242.5L837.3,243.6ZM814,237.7L811.8,240.4L809.8,240.9L807.3,240.4L802.8,240.5L800.5,240.9L800.1,242.9L802.5,245.3L803.9,244.1L808.9,243.2L808.7,244.4L807.5,244L806.4,245.6L804,246.6L806.5,250L806.1,250.9L808.5,254L808.4,255.8L807,256.6L806,255.6L807.3,253.4L804.6,254.5L804,253.7L804.3,252.7L802.4,251.1L802.6,248.5L800.8,249.3L801,252.5L801.1,256.3L799.5,256.7L798.3,255.9L799.1,253.4L798.7,250.8L797.5,250.8L796.7,249L797.8,247.3L798.2,245.1L799.5,241.1L800.1,240L802.4,238L804.5,238.8L807.8,239.2L810.9,239.1L813.5,237.1ZM823.2,238.5L823,240.8L821.7,240.6L821.3,242.2L822.3,243.6L821.6,243.9L820.5,242.2L819.7,238.8L820.3,236.7L821.2,235.7L821.3,237.2L822.9,237.4ZM762.2,257.1L759.2,257.2L757,255L753.6,252.8L752.4,251.2L750.4,249L749.1,247L747,243.3L744.7,241L743.9,238.7L742.9,236.7L740.5,235L739.1,232.7L737.1,231.2L734.4,228.3L734.1,226.9L735.8,227L740,227.5L742.3,230.1L744.4,232L745.9,233.1L748.4,235.9L751.1,236L753.3,237.8L754.9,240L756.9,241.3L755.8,243.4L757.4,244.4L758.3,244.4L758.8,246.3L759.7,247.8L761.7,248L763,249.7L762.3,253ZM794.3,236.7L797.3,239.1L794.2,239.4L793.3,241.3L793.4,243.7L790.8,245.5L790.8,248.2L789.7,252.2L789.3,251.3L786.3,252.5L785.2,250.9L783.3,250.7L782,249.8L778.8,250.8L777.9,249.5L776.1,249.7L773.9,249.4L773.5,245.8L772.2,245L770.9,242.8L770.5,240.4L770.8,237.9L772.4,236.2L774.4,237.1L776.4,236.6L777,234.3L778.1,233.8L781.3,233.3L783.2,231.1L784.5,229.5L785.6,228.5L787.9,227L789.9,225.1L791.3,223.1L792.3,223.1L793.7,224.4L793.8,225.6L795.6,226.3L797.8,227.1L797.6,228.2L795.8,228.3L796.3,229.6L794.4,230.5L792.8,232.9L794.8,235.4ZM817,219.1L817.3,220.9L817.4,222.4L816.5,224.8L815.5,222.1L814.3,223.4L815.2,225.4L814.4,226.6L811.3,225.1L810.5,223.2L811.3,221.9L809.6,220.6L808.8,221.7L807.5,221.6L805.6,223.1L805.1,222.3L806.2,220.1L807.8,219.4L809.3,218.3L810.2,219.6L812.3,218.8L812.7,217.6L814.6,217.6L814.4,215.5L816.6,216.8L816.8,218.1ZM696.6,225L694.3,225.6L693,223.5L692.5,219.7L693.7,215.3L695.6,216.8L696.8,218.7L698.1,221.5L697.7,224.2ZM317.5,214.6L315.3,214.9L314.8,214.6L315.6,213.9L315.5,212.8L317.1,212.5L317.6,212.6ZM810.6,214.1L809.7,215L808.8,216.7L808,217.5L806.4,215.6L806.9,214.9L807.6,214.2L807.9,212.5L809.3,212.4L808.9,214.1L810.9,211.6ZM796,216.7L792.5,219.2L793.8,217.3L795.7,215.7L797.3,213.9L798.7,211.2L799.2,213.4L797.4,214.9ZM805,209.8L806.6,210.6L808.3,210.6L808.3,211.8L807,212.9L805.3,213.7L805.2,212.4L805.4,211.1ZM814.7,209.1L815.4,212.1L813.4,211.4L813.4,212.3L814.1,213.9L812.8,214.5L812.7,212.6L811.9,212.5L811.5,210.9L813,211.1L813,210.1L811.4,208L813.9,208.1ZM804.1,206.7L803.4,209L802.2,207.6L800.9,205.6L803.1,205.7ZM803.5,192.2L805.2,192.9L806,192.3L806.2,192.9L805.8,194L806.7,195.9L806,198.2L804.4,199L804,201.2L804.6,203.3L806,203.6L807.2,203.3L810.5,204.8L810.3,206.2L811.2,206.9L810.9,208.1L808.8,206.8L807.8,205.4L807.1,206.4L805.4,204.8L803,205.2L801.7,204.6L801.8,203.5L802.6,202.8L801.8,202.2L801.5,203.1L800.2,201.6L799.8,200.4L799.7,197.9L800.8,198.8L801,194.6L801.9,192.2ZM305.1,192.9L304.4,193.6L302.4,193.6L300.8,193.7L300.7,192.5L301.1,192.1L303.2,192.2L304.6,192.4ZM274.9,193.9L274.1,194.3L272.6,193.9L271.1,192.9L271.4,192.3L272.5,192.1L273.2,192.2L274.9,192.5L276.4,193.1L276.8,193.8ZM286.5,188.5L288.8,189L289.1,188.5L291.2,188.5L292.8,189.2L293.5,189.1L293.9,190.1L295.4,190L295.3,190.8L296.5,190.9L297.8,191.9L296.8,193L295.6,192.4L294.3,192.5L293.5,192.4L293,192.9L292,193L291.5,192.4L290.7,192.8L289.6,194.6L288.9,194.2L288.8,193.4L287,193L285.7,193.1L284.1,192.9L282.9,193.4L281.4,192.6L281.7,191.8L284.1,192.1L286.2,192.3L287.1,191.7L285.9,190.6L285.9,189.6L284.2,189.2L284.8,188.4ZM774.2,191.7L771.9,193L769.7,192.2L769.7,189.9L771,188.7L773.9,187.9L775.4,188L776,189L774.9,190.2ZM65.2,190.6L64.8,191.1L64.2,190.7L64.2,190L63.8,189L63.9,188.7L64.4,188.3L64.2,187.7L64.4,187.5L64.6,187.5L65.6,188L66.1,188.2L66.5,188.6L67.2,189.5L67.1,189.7L66.1,190.2ZM63.8,186.5L62.9,186.7L62.4,186.1L62.1,185.9L62.1,185.7L62.4,185.5L63.3,185.7L64,186.2ZM62,185.1L61.9,185.3L60.5,185.3L60.7,184.9ZM59.6,184.7L59.4,184.8L59.3,184.8L58.3,184.7L58,184.1L57.9,184L58.6,183.6L58.8,183.8ZM55.1,182.9L54.8,183.2L53.9,182.7L54,182.5L54.4,182.2L55,182.3ZM267.5,180.8L268.6,181.8L271.1,181.5L272,182.1L274.3,183.8L275.9,185L276.8,184.9L278.4,185.5L278.2,186.2L280.2,186.3L282.2,187.4L281.9,188.1L280.1,188.4L278.3,188.5L276.5,188.3L272.7,188.6L274.4,187.1L273.4,186.4L271.6,186.2L270.7,185.5L270.1,183.9L268.6,184L266.1,183.3L265.3,182.8L261.8,182.3L260.9,181.8L261.9,181.2L259.3,181L257.4,182.4L256.2,182.4L255.9,183.1L254.5,183.4L253.4,183.1L254.8,182.3L255.4,181.4L256.6,180.8L258,180.2L260,180L260.6,179.7L262.9,179.9L265,179.9ZM273.2,178.2L272.6,178.3L271.9,176.8L270.9,176L271.5,174.3L272.3,174.4L273.2,176.6ZM803.1,180.8L802,182.9L800.6,180.7L800.3,178.7L801.8,176.1L804,174.1L805.2,174.9L804.7,176.5ZM272.5,170.6L269.6,171.1L269.4,170.1L270.6,169.9L272.4,170ZM274.7,170.6L274.2,172.5L273.7,172.2L273.8,170.8L272.6,169.7L272.6,169.4ZM839,150.5L839.4,151.4L837.9,153L836.8,152.1L835.4,152.8L834.7,154.3L833,153.6L833,152.3L834.5,150.7L836,151L837.1,149.9ZM572.2,146.4L570.4,147.5L570.6,148L570.7,148.3L567.9,149.3L566.6,149L566,147.9L567.3,147.8L567.5,147.8L567.9,147.2L569.8,147.2ZM543.2,146.3L544.7,147.2L546.7,147.1L548.7,147.2L548.7,147.7L550.1,147.4L549.8,148.2L545.9,148.4L546,148L542.7,147.4ZM521.4,139.6L520.4,141.7L520.8,142.5L520.3,143.9L518.2,142.9L516.9,142.6L513.2,141.2L513.5,139.9L516.6,140.1L519.4,139.8ZM504.6,131.6L506.2,133.5L505.8,137.1L504.6,136.9L503.5,137.8L502.5,137.1L502.4,133.9L501.8,132.3L503.2,132.5ZM855.9,142.5L854.9,144.6L855.4,145.9L854,147.8L850.6,149.1L845.9,149.2L842.1,152.3L840.3,151.3L840.2,149.3L835.6,149.9L832.4,151.1L829.3,151.2L832,153.1L830.2,157.7L828.5,158.8L827.2,157.7L827.9,155.3L826.2,154.6L825.1,152.7L827.6,151.9L829,150.2L831.7,148.9L833.6,147L839,146.2L841.8,146.8L844.6,142L846.4,143.3L850.3,140.7L851.8,139.6L853.5,136.4L853,133.4L854.1,131.7L857,131.2L858.4,134.9L858.4,137L855.9,139.7ZM505.5,129.1L504.6,131.2L503.4,130.6L502.8,128.8L503.3,127.9L505,126.8ZM863.8,123.7L865.6,124.3L867.5,123.2L868.1,126.2L864.2,126.9L861.8,129.5L857.6,127.7L856.2,130.6L853.2,130.7L852.8,128L854.2,126L857,125.8L857.8,122.1L858.6,120.1L861.7,122.8ZM310.2,117.4L312.2,117.8L314.6,117.7L313.3,118.8L312.3,118.9L309,117.8L308.3,116.9L309.3,116.1ZM315.2,110.6L313.9,110.6L310.4,109.8L308,108.5L308.9,108.3L312.4,109L315.1,110.1ZM150.6,112.2L149.3,112.5L144.9,111.3L144.1,110.4L141.7,109.4L141.3,108.7L138.5,108.2L137.5,106.8L137.7,106.1L140.5,106.7L142.1,107.1L144.7,107.4L145.6,108.3L146.9,109.6L149.5,110.7ZM330.3,106.4L328.5,108.7L330.3,107.8L332.1,108.4L331.1,109.3L333.5,110L334.7,109.4L337.4,110.2L336.6,112.2L338.4,111.7L338.8,113.1L339.6,114.8L338.5,117.1L337.3,117.2L335.5,116.7L336.1,114.5L335.4,114.2L332.3,116.5L330.7,116.4L332.6,115.2L330,114.5L327.1,114.7L322,114.6L321.5,113.8L323.2,112.9L322,112.1L324.3,110.5L327,106.3L328.7,104.8L331,103.8L332.3,104L331.7,104.7ZM126.1,97.4L128.7,97.2L127.9,100.2L130.2,102.4L129.1,102.4L127.5,101.2L126.5,99.9L125.2,99.1L124.7,97.9L124.8,97.1ZM863.1,106.2L865.7,110.9L861.8,110L860.2,113.9L862.8,116.6L862.7,118.5L860.7,116.9L858.9,118.9L858.4,116.7L858.7,114.1L858.4,111.2L859,109.2L859.2,105.7L857.6,103L857.8,99.4L860.3,98.2L859.2,96.9L860.4,96.6L861.1,98.3L862,100.9L862,103.5ZM461.9,102.2L457.2,103.7L453.4,103.3L455.6,100.6L454.2,97.8L457.8,95.8L459.8,94.5L462,94.4L464.9,96L463.5,97.9L463.9,99.8ZM513.8,93.2L512.2,95.4L509.4,93.9L509.1,92.8L513,91.9ZM72,89.2L69.3,90.2L68,89.5L67.5,88.3L70,87.3L71.4,86.9L73.2,87.1L74.3,87.9ZM472,85.2L469.1,88.1L471.9,87.7L474.8,87.7L474.1,89.9L471.7,92.3L474.4,92.4L477,95.9L478.9,96.3L480.5,99.3L481.3,100.4L484.5,100.9L484.2,102.6L482.8,103.4L483.9,104.8L481.5,106.2L477.9,106.1L473.4,106.9L472.1,106.3L470.4,107.6L467.9,107.3L466,108.3L464.6,107.8L468.5,105L470.9,104.4L466.7,103.9L466,102.9L468.7,102.1L467.3,100.6L467.8,98.9L471.8,99.1L472.1,97.6L470.3,95.9L467.1,95.4L466.4,94.7L467.4,93.5L466.5,92.8L465.1,94L464.9,91.5L463.6,90.1L464.6,87.3L466.6,85.2L468.8,85.4ZM38.5,81.8L36.8,82.2L35.1,81.7L33.5,81L36.1,80.5L38.2,80.7ZM268.6,75.8L267.6,77.2L266.4,76.9L265.7,76.2L265.8,76L266.9,75.2L267.9,75.2ZM261.6,74.3L258.5,75.8L256.6,75.7L256,75L258,73.8L261.7,73.8ZM22.1,71.4L23.7,71.9L25.4,71.7L27.5,72.4L30.2,72.7L29.9,73L27.9,73.6L25.9,73L24.9,72.5L22.5,72.7L21.9,72.4ZM252.9,66.4L253.4,67.6L254.8,67.2L256.3,67.9L259.2,68.8L262.3,69.6L262.5,70.9L264.5,70.7L266.4,71.6L264,72.4L259.9,71.8L258.4,70.6L255.7,72L251.9,73.4L251,71.8L247.4,72.1L249.7,70.8L250.1,68.7L251,66.2ZM441.3,64.3L440.7,66L443.7,67.9L440.2,69.9L432.6,71.7L430.2,72.2L426.7,71.8L419.3,71L421.9,69.8L416.1,68.5L420.8,68L420.7,67.2L415.1,66.6L416.9,64.8L421,64.4L425.1,66.2L429.2,64.8L432.5,65.5L436.9,64.1ZM277.7,62.5L274.7,62.6L274,61.3L275.2,59.8L277.6,59.4L279.7,60.2L279.7,61.3L279.4,61.7ZM611,131.4L612.3,133.3L613.6,133.5L614.4,134.2L612.2,134.4L611.7,136.5L611.3,137.4L610.3,138L610.4,139.3L611.2,141.3L613.7,141.9L615.6,143.2L619.4,143.7L623.5,143L623.8,142.3L623.3,140.4L623.7,137.7L621.6,136.8L622.3,134.9L620.5,134.8L621.1,132.5L623.6,133.2L626,132.3L624,130.7L623.3,129.2L621.1,129.9L620.8,131.8L620,130.1L619.9,129.5L620.5,128.3L620,127.4L616.9,126.5L615.7,124.1L614.2,123.4L614.1,122.6L616.7,122.8L616.8,120.9L619.1,120.4L621.4,120.8L621.9,118.2L621.4,116.6L618.8,116.7L616.5,116.1L613.4,117.2L610.9,117.8L609.7,119.4L607.1,119.8L604.5,122.6L606.9,125.1L606.6,126.9L609.6,130ZM960,68.2L960,68.3L956.6,69.4L953.1,69.2L955.5,70.7L957.1,72.9L958.3,73.6L958.6,74.7L957.9,75.4L953,74.8L945.5,76.8L943.1,77.1L939.1,79L935.2,80.6L934.2,81.8L930.4,80L923.5,82.1L922.2,81.1L919.7,82.2L916.1,81.9L915.2,83.6L912,86.2L912.1,87.3L915.2,87.9L914.8,91.8L912.3,91.9L911.2,94.1L912.3,95.2L907.7,96.6L906.7,99.7L902.7,100.3L901.9,103L898.1,105.5L897.1,103.7L896,99.8L894.5,93.8L895.8,90.1L898,88.6L898.2,87.3L902.3,86.7L907.1,83.4L911.7,80.6L916.5,78.5L918.6,74.7L915.4,75L913.8,77.1L907,80.1L904.8,76.8L897.9,77.7L891.2,82.2L893.5,83.8L887.5,84.5L883.4,84.8L883.6,82.8L879.4,82.4L876.1,83.8L868,83.3L859.2,84.1L850.6,89.3L840.3,95.6L844.5,95.9L845.8,97.6L848.4,98.2L850.1,96.8L853.1,97L856.9,100L857,102.2L854.9,104.9L854.7,108.1L853.5,112.3L849.5,116.2L848.6,118L845,121.1L841.4,124.2L839.7,125.8L836.1,127.4L834.4,127.4L832.7,126.1L829.2,128.1L828.7,128.9L827.7,128.8L826.6,129.7L825.8,130.6L825.9,132.5L824.5,133.1L824,133.6L823,134.4L821.3,134.8L820.1,135.5L820,136.7L819.7,137L820.8,137.4L822.3,138.6L824.6,141.7L825.2,143.4L825.3,146.5L824.2,148L821.8,148.5L819.7,149.6L817.3,149.8L817,148.4L817.5,146.4L816.3,143.6L818.3,143.1L816.5,140.9L815.2,140.4L814.8,140.9L814.1,141.1L814,140.6L813.3,140.3L812.6,139.9L813.3,138.7L813.9,138.4L813.7,137.9L814.4,136.5L814.2,136.1L812.6,135.8L811.4,135.1L807.6,135.8L805.7,137.1L802.8,137.8L804.2,136.6L803.7,135.5L805.8,133.7L804.4,132.3L802.1,133.3L799,135.1L797.4,136.9L794.8,137L793.4,138.2L794.8,140L797,140.5L797.1,141.7L799.2,142.4L802.2,140.5L804.6,141.6L806.3,141.6L806.7,143L802.9,143.8L801.7,145.2L799.1,146.6L797.7,148.4L800.6,149.9L801.7,152.5L803.3,155L805.1,157L805,159L803.4,159.7L804,161.1L805.6,162L805.2,164.1L804.5,166.3L803,166.5L801.1,169.4L798.9,172.9L796.4,176.1L792.7,178.5L789,180.8L786,181.1L784.4,182.3L783.5,181.4L782,182.7L778.3,184.1L775.4,184.5L774.5,187.3L773,187.4L772.3,185.5L773,184.5L769.4,183.6L768.1,184.1L764.6,186.3L762.4,188.9L761.8,190.7L763.8,193.5L766.3,197L768.7,198.6L770.3,200.8L771.6,205.7L771.2,210.4L769,212.2L765.9,213.9L763.7,216.1L760.4,218.6L759.5,216.9L760.2,215.1L758.2,213.6L756,213.2L754.9,211.8L753.6,209L751.2,207.8L748.9,207.9L749.3,205.8L746.9,205.8L746.7,208.7L745.3,212.6L744.4,215L744.6,216.9L746.3,217L747.4,219.4L747.9,221.7L749.4,223.2L751,223.6L752.4,224.9L753,225.2L754.6,226.8L755.7,228.6L755.8,230.4L755.6,231.6L755.8,232.5L756,234.1L756.9,234.8L758,237.2L757.9,238.1L756.1,238.3L753.5,236.3L750.4,234.2L750.1,232.8L748.5,231L748.2,228.8L747.2,227.4L747.5,225.4L746.9,224.3L745.8,223.3L745.4,221.9L744,220.4L742.7,219.2L742.2,220.7L741.7,219.3L742,217.6L742.8,215L742.5,213.1L743.4,211L742.5,209.4L742.7,206.5L741.6,205.2L740.7,202L740.3,198.6L739.1,196.4L737.3,197.7L734.3,199.6L732.8,199.4L731.2,198.8L732.1,195.5L731.5,193L729.4,189.9L729.8,188.9L728.2,188.6L726.3,186.4L725.6,185L725.4,183.7L724.9,182.4L723.8,180.8L721.3,180.7L721.6,181.8L720.7,183.3L719.6,182.8L719.2,183.2L718.5,182.9L717.4,182.7L717,183.7L715.2,183.7L711.9,184.2L712.1,186.2L710.7,187.8L706.8,189.6L703.8,192.7L701.8,194.4L699.2,196.1L699.2,197.4L697.9,198L695.5,199L694.2,199.1L693.4,201.2L694,204.6L694.1,206.8L693,209.4L693,213.9L691.6,214L690.4,216.1L691.2,216.9L688.7,217.7L687.8,219.5L686.8,220.3L684.2,217.8L683,214.1L682,211.4L681.1,210.1L679.6,207.5L679,204.2L678.5,202.5L676.1,198.9L675,193.7L674.2,190.3L674.2,187.1L673.7,184.6L669.8,186.2L667.9,185.9L664.4,182.6L665.7,181.7L664.9,180.6L661.8,178.4L659.9,177.7L659.1,175.8L657,173.7L652.1,174.2L647.7,174.3L644,174.7L639,173.8L636.1,173.2L633.1,172.9L631.9,169.6L630.7,169.1L628.6,169.6L625.9,170.9L622.7,170L620,168L617.4,167.2L615.6,164.7L613.6,161.1L612.2,161.6L610.5,160.7L609.5,161.7L607.9,161.6L608.5,162.8L608.3,163.4L609.1,165.4L610.2,167.7L611.5,168.3L611.9,169.2L613.7,170.4L613.9,171.5L613.6,172.3L614,173.2L614.7,174L615.1,174.9L615.5,175.5L615.3,173.6L616,172.2L616.8,171.9L617.6,172.7L617.6,174.3L617,175.9L617.5,176.9L618,176.7L618.1,177.5L620.2,177.1L622.4,177.1L624,177.2L625.8,175.4L627.8,173.7L629.5,172L630.3,171.1L630.6,171.4L630.4,172.5L630,173L630.4,175.1L631.6,176.9L633.1,177.8L635,178.2L636.6,178.7L637.8,180.2L638.5,181.1L639.5,181.4L639.5,182L638.5,183.6L638.1,184.4L637,185.2L636,187L634.8,186.9L634.2,187.5L633.8,188.9L634.1,190.7L633.9,191L632.6,191L631,192L630.7,193.3L630.1,193.9L628.4,193.8L627.4,194.5L627.4,195.6L626.1,196.3L624.6,196.1L622.9,197L621.6,197.1L619.7,197.8L619.2,199L619.1,199.9L616.5,201.1L612.2,202.3L609.8,204.2L608.6,204.3L607.8,204.2L606.3,205.3L604.6,205.8L602.3,205.9L601.7,206.1L601.1,206.8L600.4,207L600,207.7L598.7,207.6L597.8,208L596,207.8L595.3,206.3L595.3,204.8L594.9,204L594.4,202.1L593.6,201L594.2,200.8L593.9,199.6L594.2,199.1L594.1,197.9L593.7,196.8L592.9,196L592.7,194.9L591.3,194L589.9,191.7L589.2,189.6L587.3,187.7L586.1,187.3L584.4,184.8L584.1,182.9L584.2,181.3L582.6,178.4L581.4,177.3L580,176.8L579.1,175.2L579.2,174.6L578.5,173.3L577.7,172.7L576.7,170.7L575,168.5L573.7,166.7L572.3,166.7L572.8,165.2L572.9,164.3L573.2,163.2L573.1,162.9L572.4,163.9L571.8,165.9L571.1,167.3L570.5,167.8L569.6,166.9L568.4,165.7L566.5,161.9L566.2,162.2L567.3,165L568.9,167.7L570.9,171.8L571.9,173.3L572.8,174.8L575.2,177.7L574.7,178.2L574.7,179.9L577.8,182.3L578.3,182.9L579.2,185.5L578.6,186L579,188.7L580,191.9L581,192.5L582.4,193.5L584,196.6L584.7,199.1L586.2,200.4L589.8,202.9L591.3,204.4L592.7,205.9L593.6,206.9L594.9,207.7L595.5,208.5L595.4,209.6L593.9,210.2L595.1,211L595.9,211.5L596.4,212.6L597.6,213.7L599,213.7L601.5,213L604.4,212.7L606.7,211.9L608.1,211.7L609,211.2L610.5,211.1L611.4,211L612.6,210.6L614,210.4L615.3,209.5L616.3,209.5L616.4,210.2L616.1,211.8L616.1,213.1L615.6,214.1L614.8,217L613.5,220L611.9,223.4L609.6,227.3L607.3,230.3L604.2,233.9L601.5,236.1L597.5,238.7L595,240.7L592.1,244L591.5,245.4L590.9,246L589,247.1L588.4,248.2L587.4,248.4L587,250.3L586.1,251.3L585.6,253.1L584.5,254L583.3,257.3L583.5,258.8L585.2,259.8L585.3,260.5L584.5,262.1L584.7,262.9L584.5,264.2L585.4,265.8L586.5,268.5L587.5,269L587.9,270.2L587.8,272.9L588.2,275.2L588.3,279.4L588.7,280.7L587.9,282.6L586.9,284.5L585.2,286.1L582.8,287.1L579.8,288.4L576.8,291.3L575.7,291.8L573.9,293.7L572.8,294.3L572.5,296.2L573.8,298.2L574.3,299.8L574.4,300.6L574.8,300.4L574.8,303L574.3,304.3L575,304.7L574.6,305.9L573.4,306.8L571.2,307.7L568,309.1L566.9,310.1L567.1,311.3L567.8,311.4L567.5,312.8L566.9,314.8L566.6,317L565.9,318.2L564.1,319.5L563.5,319.9L562.4,321.3L561.7,322.7L560.1,324.6L557.1,327.3L555.3,328.9L553.2,330.1L550.5,331.2L549.1,331.3L548.8,332L547.1,331.7L545.8,332.2L542.9,331.6L541.3,332L540.2,331.8L537.5,332.9L535.2,333.3L533.5,334.3L532.3,334.4L531.2,333.4L530.3,333.4L529.1,332.2L529,332.6L528.6,331.8L528.7,330.3L527.8,328.5L528.7,328L528.6,326L526.8,323.5L525.5,321.2L525.5,321.2L523.6,317.7L521.6,315.7L520.6,313.8L520,311.2L519.3,309.2L518.4,305.1L518.4,301.9L518,300.5L517,299.4L515.6,297.2L514.2,294L513.6,292.3L511.5,289.7L511.3,287.7L511,286L511.4,283.6L512.3,281.2L512.5,280.1L513.3,277.7L514,276.6L515.5,274.8L516.4,273.6L516.6,271.7L516.5,270.1L515.7,269.2L515,267.6L514.3,266L514.5,265.4L515.3,264.4L514.5,261.8L513.9,260L512.6,258.3L512.9,257.8L512.5,257L511.8,255L509.6,252.1L506.8,249.4L505.1,247.2L503.5,244.5L503.5,243.6L504.1,242.8L504.8,240.8L505.3,238.8L504.8,238.4L505.7,235.4L506.1,233.3L505.1,231.6L503.9,231.1L503.3,229.9L502.6,229.5L502.7,228.8L499.9,229.8L498.9,229.6L497.9,230.2L495.7,230.2L494.3,228.5L493.4,226.6L491.5,224.8L489.5,224.8L487.2,224.8L485,225.1L482.8,225.7L478.6,227.3L477.2,228.2L474.8,229L472.4,228.2L471.2,228.2L469.3,227.7L467.6,227.7L464.4,228.2L462.6,229L460,230L459.4,229.9L458.7,229.9L456,228.6L453.6,226.6L451.3,225.2L449.5,223.4L448.8,223.2L446.9,222.2L445.5,220.7L445,219.8L444.7,217.8L443.5,216.2L442.5,215.2L441.8,214.8L441.1,214.3L440.8,213.1L440.4,212.5L439.7,212.1L438.2,211L437.1,210.8L436.5,210L436.5,209.6L435.7,209.1L435.5,208.5L435.1,206.5L435.4,205.3L434.3,203.2L433,202.2L434.2,201.7L435.5,199.9L436.1,198.5L435.9,197.1L436.6,195.7L436.9,193.2L436.7,190.6L436.3,189.3L436.6,187.9L435.9,186.7L434.5,185.5L434.6,184.4L434.7,183.2L435.8,182.4L436.6,181L436.5,180.1L437.4,178.3L438.9,176.6L439.8,176.1L440.5,174.6L440.5,173.2L441.5,171.5L443.3,170.5L445,167.8L446.3,166.8L448.8,166.5L450.9,164.6L452.3,163.9L454.5,161.7L453.8,158.4L454.8,156.1L455.2,154.7L456.9,152.9L459.6,151.7L461.6,150.6L463.3,147.8L464.2,146.2L466.2,146.2L467.8,147.3L470.3,147.1L473.1,147.7L474.2,147.7L476.8,146.3L479.7,145.8L481.3,144.7L483.9,143.9L488.4,143.4L492.8,143.2L494.2,143.6L496.7,142.6L499.6,142.5L500.6,143.2L502.5,143L505.4,141.9L507.2,142.2L507.1,143.6L509.4,142.6L509.6,143.1L508.3,144.4L508.2,145.7L509.2,146.3L508.8,148.6L507.1,150L507.6,151.4L508.9,151.5L509.6,152.7L510.6,153.2L513.8,154.1L514.9,153.9L517.1,154.3L520.7,155.5L521.9,157.9L524.3,158.4L528.1,159.5L530.9,160.8L532.2,160.1L533.5,158.9L532.9,156.9L533.7,155.6L535.6,154.3L537.5,153.9L541.1,154.5L542,155.7L543,155.7L543.8,156.1L546.5,156.5L547.1,157.3L550.7,157.3L553.2,158L555.9,158.8L557.1,159.2L559.2,158.4L560.3,157.6L562.6,157.4L564.5,157.7L565.2,159L565.8,158.2L568,158.8L570.1,158.9L571.4,158.3L572.1,157.4L572,157.2L572.7,156L573.2,154L573.6,153.3L573.7,153.3L574.6,151.1L575.9,149.2L576,149.1L575.7,147.1L576.4,146L575.4,144.8L576.4,143.8L574.8,144L572.6,143.4L570.7,144.9L566.7,145.2L564.5,143.8L561.7,143.7L561,144.8L559.2,145.1L556.6,143.7L553.7,143.8L552.1,141.1L550.2,139.6L551.5,137.6L549.8,136.3L552.7,133.7L556.9,133.6L558,131.6L563.1,132L566.3,130.2L569.4,129.5L573.8,129.4L578.4,131.3L582.3,132.3L585.4,131.9L587.7,132.2L590.8,130.8L591.2,129.6L590.5,127.8L589,126.8L587.5,126.5L586.5,125.7L583.1,123.4L580.1,122.4L577.8,120.9L579.7,120.4L582,118.2L580.5,117.2L584.4,116.1L584.3,115.5L581.9,115.9L579.8,116.1L578,117L575.5,117.1L573.2,118.1L573.4,119.8L574.7,120.4L577.4,120.3L576.9,121.2L574,121.7L570.4,123.2L568.9,122.7L569.5,121.4L566.5,120.7L567,120.1L569.6,119.3L568.8,118.6L564.6,118L564.5,117L562,117.3L561,118.8L558.9,120.7L559,121.4L557.7,122L556.9,121.8L556.2,125L554.8,126.1L553.8,128L554.7,129.5L555,130.5L557.3,131.4L556.8,132L553.6,132.2L552.5,133L550.3,134.5L549.5,133.2L549.5,132.7L547.9,132.6L546.5,132.3L543.2,133L545.1,134.5L543.7,135L542.3,135L540.8,133.6L540.3,134.2L540.9,135.8L542.3,137L541.3,137.6L542.8,138.8L544.1,139.6L544.1,141.1L541.6,140.4L542.4,141.8L540.7,142L541.7,144.4L540,144.4L537.8,143.3L536.8,141.1L536.3,139.4L535.3,138.1L533.9,136.6L533.7,135.9L533.3,135.7L533.2,135.1L531.7,134.2L531.5,132.9L531.7,131.1L532.1,130.3L531.7,129.9L531.1,129.6L530.3,128.8L529.2,128.2L526.7,127.3L525.1,126.3L522.7,125.5L520.5,123.5L521,123.3L519.8,122.2L519.7,121.3L518,120.9L517.2,122.1L516.4,121.2L516.5,120.2L516.6,120.2L517.2,120L515,119.6L512.9,120.5L513,121.8L512.7,122.6L513.6,123.9L516.1,125.3L517.4,127.5L520.4,129.6L522.5,129.6L523.1,130.2L522.4,130.8L524.8,131.7L526.7,132.5L529,133.9L529.3,134.4L528.8,135.4L527.3,134.1L525,133.7L523.9,135.4L525.8,136.4L525.5,137.8L524.4,137.9L522.9,140.2L521.8,140.4L521.8,139.6L522.4,138.2L523,137.6L521.9,136.1L521.1,134.7L520,134.4L519.2,133.2L517.5,132.8L516.3,131.7L514.4,131.5L512.3,130.3L509.8,128.6L508,127L507.2,124.4L505.9,124.1L503.7,123.2L502.5,123.6L500.9,124.8L499.8,125L497.4,126.5L492.1,125.8L488.3,126.7L488,128.3L488.1,129.8L485.6,131.6L482.2,132.2L481.9,133.1L480.3,134.5L479.3,136.7L480.3,138.2L478.8,139.4L478.2,141.1L476.2,141.7L474.3,143.7L470.9,143.8L468.4,143.7L466.7,144.7L465.7,145.7L464.4,145.4L463.4,144.5L462.6,143L460.1,142.6L459,143.3L457.6,142.9L456.3,143.2L456.7,141.1L456.4,139.5L455.2,139.2L454.6,138.2L454.8,136.5L455.9,135.5L456.1,134.4L456.6,132.8L456.6,131.7L456,130.7L455.9,129.8L456,127.9L454.9,126.8L458.7,124.9L462,125.3L465.6,125.3L468.4,125.8L470.6,125.6L474.9,125.7L476.3,124.1L476.8,118.8L474.1,116L472.1,114.7L468,113.6L467.8,111.7L471.2,111.1L475.7,111.8L474.8,108.8L477.4,109.9L483.6,107.9L484.4,105.7L486.7,105.1L488.8,104.6L490.2,103.9L492.6,99.9L496.2,98.8L498.4,98.9L498.9,98.3L501.2,98.2L501.7,98.8L503.5,97.5L502.9,96.5L502.7,95L501.7,93.5L501.6,90.8L502,90L502.8,89.2L505.1,89.1L506.1,88.3L508.2,87.6L508.1,89L507.3,89.8L507.7,90.6L509.1,91L508.5,92L507.7,91.7L505.7,93.6L506.5,94.9L506.5,95.9L509.2,96.6L509.2,97.5L511.9,97L513.4,96.3L516.4,97.3L517.7,98.2L519.5,97.4L523.6,96.2L527,95.3L529.7,95.7L529.9,96.4L532.4,96.4L533,95.2L536.7,94.4L536.1,92.1L536.2,90.1L537.5,88.4L540.1,87.5L542.2,89.5L544.3,89.5L544.8,87.4L545.1,85.8L544.2,86.2L542.5,85.2L542.2,83.7L545.6,83L549,82.6L551.9,83L554.6,82.9L557.7,81.5L554.9,80.2L550,80.4L545.3,81.4L541,81.9L539.4,80.5L536.9,79.6L537.5,77L536.2,74.6L537.4,73L539.9,71.3L545.9,68.5L547.7,67.9L547.5,66.8L543.7,65.5L539.2,66.3L536.6,68.1L537,69.8L532.7,71.9L527.6,74.2L525.7,78L527.6,79.8L530.1,81.3L527.7,84.3L524.9,84.9L523.9,89.4L522.4,91.9L519.1,91.7L517.6,93.8L514.5,93.9L513.7,91.4L511.4,88.3L509.4,84.6L507.6,82.9L502.4,86L498.8,86.6L495.1,85.3L494.2,82.4L493.3,76.3L495.8,74.6L502.8,72.3L508.1,69.6L513,65.8L519.4,60.7L523.8,58.7L531.2,55.3L537,54.2L541.4,54.3L545.5,52.1L550.3,52.2L555.1,51.7L563.4,53.7L560,54.4L562.9,56L565.7,55.1L570.1,56.7L577.4,57.4L587.4,60.4L589.5,61.6L589.7,63.4L586.7,64.8L582.4,65.5L570.4,63.5L568.5,63.8L572.8,65.8L573.2,69.8L576.6,70.6L578.7,71.3L579,70L577.4,68.8L579.1,67.8L585.6,69.5L587.8,68.8L586,66.9L592.2,64.3L594.7,64.4L597.2,65.3L598.7,63.5L596.5,61.9L597.8,60.3L595.9,58.7L603.3,59.5L604.9,61L601.5,61.4L601.5,62.8L603.6,63.7L607.7,63.2L608.4,61.5L613.9,60.2L623.2,57.9L625.3,58L622.6,59.7L625.9,59.9L627.8,59L632.8,59L636.8,57.8L639.8,59.5L642.9,57.7L640.1,56.1L641.5,55.3L649.3,56.1L653,56.9L662.7,59.9L664.5,58.6L661.8,57.1L661.7,56.6L658.5,56.3L659.4,55.1L657.9,53L657.9,52.1L662.8,49.7L664.5,47.3L666.5,46.8L673.6,47.5L674.1,48.9L671.6,51.1L673.3,52L674.1,53.8L673.5,57.5L676.5,59.1L675.3,60.9L670.1,64.7L673.1,65.1L674.2,64.1L677.1,63.4L677.8,62.1L680.1,60.8L678.6,59.3L679.8,57.6L676.9,57.3L676.3,55.9L678.4,53.2L674.9,51L679.7,49.2L679.1,47.3L680.4,47.2L681.8,48.7L680.8,51.3L683.6,51.8L682.4,49.9L686.9,48.8L692.4,48.7L697.3,50.2L695,48L694.7,45.1L699.3,44.6L705.8,44.7L711.5,44.4L709.4,43L712.4,41.2L715.5,41.1L720.7,39.8L727.7,39.5L728.6,38.7L735.6,38.5L737.8,39.1L743.8,37.7L748.7,37.7L749.4,36.6L752,35.4L758.3,34.3L762.8,35.2L759.2,35.9L765.3,36.3L766,37.6L768.4,36.9L776.2,37L782.2,38.3L784.4,39.3L783.7,40.7L780.7,41.4L773.7,42.9L771.7,43.7L775,44.1L779,44.8L781.4,44.3L782.7,46L783.9,45.3L788.2,44.9L796.7,45.3L797.4,46.5L808.5,46.9L808.7,44.9L814.3,45.4L818.6,45.4L822.9,46.8L824.1,48.5L822.6,49.6L825.9,51.7L830.1,52.8L832.7,50L837,51.2L841.5,50.4L846.7,51.3L848.6,50.5L853,50.9L851.1,48.4L854.6,47.3L878.7,49L880.9,50.6L887.9,52.6L898.7,52.1L904,52.6L906.2,53.7L905.9,55.6L909.2,56.4L912.7,55.8L917.5,55.7L922.5,56.3L927.6,56L932.2,58.3L935.5,57.5L933.4,55.8L934.5,54.6L943,55.3L948.6,55.2L956.3,56.5L960,57.6L960,68.2ZM0,57.6L0,57.6L0,57.6L6.5,59.7L13.5,62.3L13.3,64L15.1,64.6L14.5,62.7L21.7,63.1L26.9,65.6L24.3,66.7L19.9,67L19.9,69.6L18.8,70.2L16.3,70.1L14.3,69.2L10.7,68.4L10.1,67.2L7.4,66.8L4.4,67.2L2.9,66.2L3.5,65.2L0.3,65.9L1.5,67.1L0,68.2L0,68.2L0,57.6ZM224.9,57.2L223.3,58.2L219.7,57.4L217.5,57.7L213.9,56.5L216.2,55.6L218.1,54.5L220.9,55.2L222.5,55.7L223.3,56.2ZM960,51.7L960,52.6L957.1,52.8L956.6,51.9L960,50.8L960,51.7ZM0,50.8L0,50.8L0,50.8L0,51.7L0,50.8ZM0,50.8L0.3,50.7L2.6,50.7L6.5,51.5L6.2,51.8L3.5,52.5L0,52.6ZM238.5,56.2L238.5,58.9L242.1,56.8L245.3,58.6L244.5,60.5L247.1,62.3L249.9,60.4L251.8,58.1L251.9,55.2L255.7,55.4L259.7,55.8L263.3,57.1L263.4,58.4L261.4,59.8L263.3,61.3L263,62.6L257.7,64.4L254,64.8L251.3,64L250.5,65.4L247.9,67.6L247.1,68.8L244,70.6L240.2,70.8L238.1,71.9L237.9,73.6L234.8,74L231.6,76.1L228.7,79.1L227.7,81.2L227.5,84.3L231.4,84.8L232.6,87.3L233.9,89.3L237.6,88.8L242.6,89.9L245.2,90.9L247.1,92.2L250.5,92.9L253.3,94.1L257.7,94.2L260.6,94.5L260.2,96.8L261,99.5L262.9,102.4L266.9,105L269,104.1L270.4,101.4L269,97.1L267.1,95.7L271.4,94.5L274.4,92.6L275.9,90.8L275.7,89L273.9,86.7L270.6,84.7L273.8,81.9L272.6,79.5L271.7,75.3L273.6,74.7L278.1,75.5L280.9,75.7L283.1,75L285.6,75.9L288.9,77.5L289.7,78.5L294.4,78.7L294.3,80.9L295.2,84.3L297.7,84.7L299.6,86.3L303.5,84.8L306,81.9L307.8,80.6L309.9,83L313.3,86.4L316.3,89.6L315.2,91.3L318.8,92.8L321.2,94.3L325.4,95L327.1,95.9L328.2,98.1L330.2,98.5L331.3,99.5L331.5,102.5L329.6,103.5L327.7,104.4L323.3,105.4L319.9,107.5L315.4,108L309.7,107.4L305.7,107.4L302.9,107.6L300.7,109.5L297.3,110.7L293.5,114.2L290.4,116.7L292.6,116.2L296.9,112.7L302.5,110.5L306.5,110.2L308.9,111.5L306.4,113.3L307.2,116.2L308.1,118.2L311.5,119.6L315.9,119.2L318.6,116.2L318.8,118.1L320.5,119.1L317.2,120.8L311.3,122.4L308.7,123.5L305.7,125.4L303.7,125.2L303.6,123L308.2,120.7L303.9,120.8L301,121.2L301.4,122L298.6,123.3L295.8,124.2L293,125L291.5,126.8L291.2,127.2L291.1,128.6L292,130L293.1,130.1L292.8,129.1L293.6,129.7L293.4,130.5L291.6,130.9L290.3,130.9L288.4,131.3L287.2,131.5L285.7,131.6L283.4,132.4L287.4,131.9L288.1,132.4L284.4,133.2L282.7,133.2L282.8,132.9L282,133.6L282.8,133.7L282.2,135.6L280.2,137.7L280.1,137L279.5,136.9L278.6,136.2L279.1,137.6L279.8,138.1L279.9,139.1L279,140.2L277.5,142.3L277.3,142.2L278.1,140.4L276.7,139.3L276.4,137.1L275.9,138.3L276.5,140L274.8,139.6L276.5,140.4L276.6,143L277.4,143.1L277.7,144.1L278.1,146.7L276.4,148.7L273.6,149.5L271.9,151.1L270.5,151.2L269.2,152.2L268.8,153.1L265.9,154.8L264.4,156.1L263.1,157.7L262.7,159.6L263.2,161.4L264.1,163.7L265.2,165.6L265.3,166.8L266.5,169.8L266.4,171.6L266.3,172.7L265.7,174.3L264.9,174.6L263.5,174.3L263.1,173.2L262.1,172.5L260.7,170.2L259.5,168.2L259,167.2L259.6,165.4L258.9,163.9L256.8,161.7L255.7,161.3L253,162.5L252.6,162.4L251.3,161.1L249.6,160.5L246.6,160.8L244.2,160.5L242.2,160.7L241,161.1L241.6,161.8L241.5,162.9L242.1,163.4L241.6,163.8L240.6,163.4L239.6,163.9L237.7,163.8L235.7,162.4L233.3,162.7L231.4,162.1L229.7,162.3L227.5,162.9L225.1,164.9L222.4,166L221,167.3L220.4,168.5L220.3,170.4L220.5,171.6L221,172.5L221,172.5L221,172.6L219.9,174.9L219.5,176.8L219.3,180.4L219,181.7L219.5,183.1L220.3,184.4L220.8,186.5L222.6,188.5L223.2,190L224.3,191.3L227.1,192L228.2,193.1L230.5,192.4L232.6,192.1L234.6,191.6L236.2,191.2L237.9,190.1L238.6,188.5L238.8,186.3L239.3,185.5L241.1,184.8L243.9,184.2L246.2,184.3L247.9,184.1L248.5,184.6L248.4,185.9L247,187.5L246.3,189.1L246.8,189.6L246.4,190.8L245.8,192.8L245.1,192.1L244.5,192.2L244.5,192.6L245.1,192.6L245,193.3L244.6,194.5L244.8,194.9L244.5,195.8L244.7,196.1L244.4,197.4L243.9,198.2L243.4,198.2L242.9,199.2L243.7,199.6L243.9,199.2L244.7,199.6L245,199.7L245.6,199.2L246.4,199.2L246.6,199.4L247,199.3L248.3,199.5L249.5,199.4L250.4,199.1L250.7,198.8L251.5,199L252.1,199.2L252.8,199.1L253.4,198.9L254.6,199.2L255,199.3L255.8,199.8L256.6,200.4L257.6,200.8L258.3,201.5L258,201.8L257.9,202.4L258.2,203.4L257.6,204.3L257.3,205.3L257.2,206.5L257.3,207.2L257.4,208.4L257,208.7L256.7,209.8L256.9,210.5L256.4,211.2L256.5,211.9L256.9,212.4L257.6,213.8L258.6,214.9L259.9,216L260.8,217L260.8,217.5L261.8,217.7L262.1,217.4L262.8,218.1L264.1,217.9L265.3,217.2L266.9,216.7L267.8,215.9L269.3,216.1L269.2,216.3L270.7,216.4L271.9,216.9L272.7,217.7L273.7,218.4L275.1,218.5L277.1,216.6L278.2,216.3L278.2,215.5L278.7,213.2L280.2,212L281.9,211.9L282.1,211.4L284.2,211.6L286.3,210.2L287.4,209.6L288.7,208.4L289.6,208.5L290.3,209.2L289.8,210.1L289.7,210.8L288.1,211.1L289,212.3L289,213.7L287.8,215.2L288.8,217.3L290,217.2L290.6,215.2L289.7,214.3L289.6,212.3L292.9,211.2L292.6,209.9L293.5,209.1L294.4,211L296.3,211L298,212.5L298.2,213.4L300.5,213.4L303.4,213.1L304.9,214.3L307,214.7L308.5,213.8L308.5,213.1L311.8,213L315,213L312.7,213.7L313.6,215L315.8,215.2L317.8,216.5L318.2,218.6L319.6,218.6L320.6,219.2L322.4,220.2L324,221.9L324.1,223.3L325.1,223.4L326.6,224.7L327.6,225.6L330.8,226.1L331.1,225.7L333.2,225.5L336.1,226.2L337,226.5L339,227.1L341.8,229.4L342.2,230.4L343.2,230.3L343.8,231.8L345.3,236.5L346.7,236.9L346.8,238.7L344.8,240.9L345.6,241.7L350.3,242.2L350.4,244.8L352.5,243.1L355.8,244L360.3,245.7L361.5,247.2L361.1,248.7L364.2,247.9L369.4,249.3L373.4,249.2L377.3,251.4L380.7,254.4L382.8,255.2L385.1,255.3L386,256.1L386.9,259.5L387.4,261.1L386.3,265.5L385,267.3L381.2,271L379.5,274L377.5,276.3L376.9,276.3L376.1,278.3L376.3,283.3L375.6,287.4L375.3,289.2L374.4,290.2L374,293.8L371.3,297.3L370.8,300L368.7,301.2L368,302.8L365.1,302.8L360.9,303.8L359.1,305L356.1,305.8L352.9,307.9L350.7,310.5L350.3,312.5L350.7,314L350.2,316.7L349.6,318L347.8,319.5L344.8,324.2L342.5,326.3L340.7,327.5L339.4,330.1L337.7,331.6L336.5,333.3L333.5,334.7L331.5,334.2L330.1,334.5L327.6,333.3L325.8,333.4L324.2,332L324,333.3L327.4,335.6L327,337.5L328.7,338.6L328.6,339.9L326,343.4L322,344.8L316.7,345.3L313.8,345.1L314.3,346.7L313.8,348.7L314.3,350L312.7,350.9L309.9,351.3L307.4,350.3L306.3,351L306.7,353.7L308.5,354.5L310,353.6L310.8,355L308.3,355.9L306.2,357.5L305.8,360.2L305.2,361.6L302.6,361.6L300.6,363L299.8,365L302.4,367L305,367.5L304,369.9L300.9,371.4L299.2,374.5L296.7,375.6L295.6,376.8L296.5,379.6L298.3,381.1L297.1,381L294.8,381L293.5,381.6L291.1,382.6L290.7,385.1L289.5,385.1L286.5,384.3L283.5,382.4L280.1,380.9L279.3,379.2L280.1,377.6L278.7,375.9L278.4,371.3L279.5,368.8L282.3,366.7L278.3,365.9L280.8,363.6L281.7,359.1L284.7,360.1L286.1,354.5L284.3,353.8L283.5,357.2L281.8,356.8L282.6,353L283.5,348L284.7,346.2L284,343.6L283.8,340.6L284.9,340.5L286.5,336.2L288.4,332L289.5,328L288.9,324L289.7,321.8L289.4,318.5L290.9,315.2L291.4,310.1L292.3,304.5L293.1,298.6L292.9,294.2L292.3,290.5L289.7,288.9L289.4,287.8L284.1,285.2L279.4,282.2L277.3,280.6L276.2,278.4L276.6,277.6L274.4,274.1L271.8,269.2L269.2,263.9L268.1,262.7L267.3,260.7L265.2,259L263.3,257.9L264.2,256.7L262.9,254.2L263.7,252.3L265.9,250.6L267.3,248.6L266.7,247.4L265.7,248.7L264.1,247.5L264.6,246.8L264.2,244.3L265.1,243.9L265.6,242.3L266.6,240.6L266.4,239.5L267.9,238.9L269.7,237.8L269.4,237L270.3,236.8L270.2,235.5L270.9,234.5L272.2,234.3L273.3,232.7L274.3,231.3L273.3,230.6L273.8,229.1L273.2,226.6L273.8,225.9L273.4,223.7L272.3,222.3L271.4,221.5L270.9,220.1L271.5,219.3L270.8,219.2L270.3,218.3L269,217.5L267.8,217.7L267.3,218.6L266.2,219.3L265.6,219.4L265.4,220L266.7,221.4L265.9,221.7L265.5,222.1L264.3,222.3L263.8,220.7L263.5,221.1L262.6,221L262.1,219.9L261,219.7L260.3,219.4L259.1,219.4L259.1,220L258.8,219.6L257.3,219L256.8,218.4L257.1,218L257,217.4L256.2,216.8L255.2,216.2L254.3,215.9L254.1,215.1L253.4,214.6L253.6,215.4L253,216L252.4,215.3L251.6,215L251.2,214.5L251.2,213.7L251.6,212.8L250.8,212.5L251.4,212L250.5,211.1L249.3,210L248.7,209.1L247.6,208.3L246.2,207.1L246.5,206.7L247,207.1L247.2,206.9L246.7,206.1L245.9,205.8L245.6,206.5L244,206.4L243.1,206.2L242,205.6L240.5,205.5L239.7,204.9L238.4,204.4L236.7,204.4L235.5,203.9L234.1,202.8L231,199.9L229.7,199L227.5,198.3L226,198.5L223.9,199.5L222.5,199.8L220.6,199.1L218.6,198.6L216.1,197.4L214.1,197L211.1,195.7L208.9,194.5L208.2,193.8L206.7,193.6L204,192.7L202.9,191.5L200,190L198.7,188.3L198.1,187L198.9,186.8L198.7,186L199.3,185.3L199.3,184.4L198.4,183.2L198.2,182.1L197.3,180.8L194.9,178.1L192.2,176.1L190.9,174.4L188.6,173.3L188.2,172.7L188.6,171L187.2,170.4L185.6,169.1L185,167.2L183.5,167L182,165.6L180.7,164.3L180.6,163.5L179.2,161.5L178.2,159.4L178.3,158.4L176.3,157.3L175.5,157.5L173.9,156.7L173.5,157.8L173.9,159.1L174.2,161.1L175.1,162.2L177.1,164L177.5,164.7L177.9,164.8L178.3,165.8L178.8,165.7L179.3,167.4L180.1,168.1L180.7,169.1L182.4,170.4L183.2,172.9L184,174.1L184.8,175.3L184.9,176.7L186.2,176.8L187.3,178L188.2,179.2L188.2,179.7L187.1,180.7L186.6,180.7L185.9,179L184.1,177.5L182.2,176.2L180.8,175.6L180.9,173.6L180.5,172.2L179.3,171.3L177.4,170.1L177.1,170.5L176.4,169.8L174.8,169.1L173.2,167.6L173.4,167.4L174.5,167.5L175.5,166.6L175.6,165.4L173.5,163.4L171.9,162.7L171,161L170,159.3L168.7,157.2L167.7,154.8L167.2,153.4L165.5,151.9L164.2,151.5L164,150.8L162.5,150.7L161.5,149.9L159,149.7L158.3,149.2L158,147.8L155.4,145.1L153.2,141.4L153.3,140.8L152.1,139.9L150.1,137.7L149.7,135.5L148.3,134L148.9,131.8L148.8,129.5L147.9,127.5L149,125L149.6,120.1L149.1,116.6L148.3,114.3L147.5,113L147.8,112.5L151.7,113.4L153.1,115.9L153.8,115.2L153.3,113L152.4,110.9L152.1,110.9L146.9,108.2L145,107.1L140.2,106L138.7,103.6L139.1,102L135.6,100.8L135.2,98.7L132,96.8L131.9,95.4L130.4,94.4L128.1,93.5L127.3,91.2L123.9,89.1L122.5,86.5L119.9,86.4L115.7,86.3L112.5,85.5L107,82.8L104.5,82.3L99.8,81.3L96.1,81.5L90.9,80.3L87.7,79.2L84.7,79.7L85.3,81.6L83.8,81.8L80.7,82.3L78.4,83.2L75.4,83.8L75,82.2L76.2,79.6L79.1,78.8L78.3,78.1L74.9,79.6L73.1,81.4L69.3,83.3L71.2,84.6L68.7,86.5L65.8,87.6L63.2,88.4L62.5,89.6L58.3,91L57.5,92.2L54.4,93.3L52.6,93.1L50.1,93.9L47.4,94.8L45.1,95.7L40.6,96.4L40.2,96L43.1,94.8L45.7,93.9L48.5,92.5L51.8,92.2L53.1,91.1L56.8,89.5L57.4,88.9L59.4,88L59.9,86L61.2,84.4L58.1,85.2L57.3,84.8L55.8,85.7L54.1,84.4L53.4,85.3L52.4,84L49.7,85.1L48.1,85.1L47.9,83.5L48.3,82.5L46.6,81.6L43.2,82.1L40.9,80.8L39.1,80.2L39.1,78.7L37,77.5L38,76L40.2,74.5L41.2,73.1L43.3,72.9L45.2,73.4L47.3,72.1L49.2,72.3L51.3,71.5L50.8,70.3L49.3,69.8L51.3,68.8L49.6,68.8L46.8,69.4L46,70L43.9,69.4L40.1,69.7L36.2,69L35.1,68L31.7,66.4L35.5,65.3L41.4,64L43.6,64L43.2,65.3L48.9,65.2L46.7,63.6L43.4,62.5L41.5,61.2L39,60.1L35.3,59.2L36.8,57.8L41.5,57.8L44.9,56.5L45.5,55.2L48.2,54L50.8,53.7L55.9,52.5L58.3,52.7L62.4,51.2L66.5,51.8L68.4,53L69.6,52.5L74.1,52.6L74,53.3L78,53.7L80.7,53.4L86.4,54.3L91.5,54.5L93.5,54.9L97.1,54.5L101.1,55.3L104,55.6L109,56.3L113.2,57.6L116,57.8L118.3,56.7L121.6,55.9L125.5,56.2L129.5,55L133.9,54.3L135.7,55.4L137.7,54.8L138.3,53.6L140.1,53.9L144.7,56.2L148.2,54.4L148.6,56.5L151.8,56L152.8,55.2L156.1,55.4L160.1,56.5L166.4,57.5L170.1,57.9L172.7,57.8L176.3,59.1L172.5,60.5L177.3,61L184.5,60.7L186.8,60.2L189.7,61.8L192.5,60.5L189.8,59.4L191.6,58.4L194.8,58.3L196.9,58.1L199.1,58.7L201.8,60.1L204.7,59.9L209.5,61.1L213.6,60.7L217.5,60.8L217.2,59.1L219.5,58.7L223.7,59.6L223.7,62.1L225.4,60L227.5,60L228.7,57.3L225.9,55.7L222.7,54.6L223,51.7L226.1,49.7L229.6,50.2L232.3,51.3L236,54.4L233.6,55.7ZM175.6,46.5L174.2,47.8L180.2,47L183.9,48.3L186.9,47L189.3,47.8L191.5,50.5L192.8,49.4L190.9,46.6L193.3,46.2L195.9,46.7L198.9,47.7L200.6,50.3L201.4,52.2L205.9,53.5L210.7,54.8L210.4,56L206,56.2L207.8,57.2L206.9,58.2L202,57.8L197.4,57L194.3,57.2L189.3,58.1L181.4,58.6L177.8,58.8L176.4,57.5L172.7,56.8L170.4,57.1L167.1,55L168.9,54.7L173,54.2L176.7,54.3L180.2,53.9L175.1,53.3L169.4,53.5L165.6,53.4L164.2,52.4L170.4,51.4L166.3,51.4L161.6,50.7L163.8,48.7L165.7,47.6L172.8,46ZM201.3,45.7L199,47.5L194.8,45.6L195.7,45.3L199.3,45.2ZM276.4,46.6L276.7,47.3L273.8,47.2L271,47.2L268,47.5L267.3,47.4L264.3,46L264.4,45L265.7,44.8L271.8,45.1ZM249.2,46.4L251.3,48.1L253.7,46L260.5,44.9L265.1,47.6L264.7,49.4L269.9,48.6L272.5,47.5L278.4,48.9L282.1,50.1L282.4,51.3L287.4,50.7L290.1,52.4L296.6,53.5L298.9,54.5L301.4,57L296.5,58.3L302.8,60L307,60.6L310.9,63.1L315.1,63.2L314.2,65.1L309.6,68.2L306.3,67.1L302.1,64.5L298.6,64.8L298.3,66.4L301.1,67.9L304.7,69.1L305.8,69.8L307.5,72.5L306.6,74.4L303.3,73.7L296.6,71.5L300.3,73.8L303.1,75.4L303.6,76.4L296.3,75.3L290.6,73.8L287.4,72.5L288.3,71.7L284.3,70.3L280.4,69.1L280.5,69.8L272.8,70.2L270.5,69.3L272.3,67.4L277.3,67.3L282.8,67L281.9,66L282.8,64.7L286.3,62.1L285.5,60.9L284.5,60L280.4,58.7L275,57.8L276.7,57.1L273.9,55.5L271.5,55.3L269.4,54.4L268,55.2L263.2,55.5L253.5,55L247.8,54.2L243.5,53.8L241.3,52.8L244.1,51.6L240.3,51.6L239.5,48.9L241.5,46.5L244.2,45.4L251.1,44.7ZM212.4,44.6L215.6,45.2L220.3,44.8L221,45.6L218.5,46.9L222.6,48L222.1,50.4L217.7,51.5L215.1,51.2L213.3,50.2L206.7,48.2L206.7,47.3L212.2,47.6L209.2,45.9ZM862.9,46.3L858.9,46.3L853.4,46L853,45.9L855.5,44.8L858.8,44.6L862.6,45.6ZM231.5,47.5L228.6,49.5L225.6,49.4L223.9,47L224,45.7L225.3,44.6L228,43.8L233.6,43.9L238.6,44.6L234.7,46.9ZM158.8,51.1L151.8,52.5L150.3,51.3L144.2,49.9L145.1,49L147.2,46.8L149.5,45L146.9,43.4L155.9,43L159.7,43.6L166.5,43.7L169.1,44.5L172,45.6L168.6,46.3L162.1,48.1L158.8,50ZM882,41.3L878.9,42.4L874.6,42.1L869.7,41.1L870.3,40.2L875.3,40.6ZM230.4,41.6L228.9,42.6L225,42.4L221.8,41.7L223.2,40.5L227.1,39.8L229.4,40.7ZM866.9,40L864.8,42L855,41.9L850.5,42.6L845.3,40.8L846.7,39L850.2,38.5L857.3,38.6ZM217.3,36.9L219.4,38.2L219.5,39.5L218.2,41.5L213.8,41.8L211,41.4L211,39.8L206.7,40L206.5,38L209.4,38L213.4,37.1L217.1,37.3ZM191.4,38.3L192.5,39.3L194.9,38.8L197.6,38.9L198.1,40.2L196.5,41.5L187.5,41.9L180.7,43.1L176.7,43.1L176.3,42.3L181.9,41.1L169.8,41.4L166.1,40.9L169.7,38.3L172.3,37.6L179.8,38.5L184.5,40.1L189.2,40.3L185.3,37.7L187.8,36.7L190.5,37.1ZM633.4,52.9L631.9,53.2L623.1,52.8L622.4,51.6L617.6,50.9L617.2,49.5L619.9,48.9L619.8,47.5L625.1,45.2L622.7,44.9L629.1,42.5L628.4,41.3L634.3,39.9L643.1,38.2L652,37.7L656.6,36.7L661.8,36.4L663.6,37.4L661.8,38.2L652.4,39.6L644.2,40.8L635.9,43.4L632,46L627.8,48.5L628.3,50.8ZM227.5,35.9L230.5,36.8L235.7,36.8L238,37.7L237.4,38.7L240.5,39.3L242.2,39.9L245.8,40L249.7,40.2L253.9,39.7L259.3,39.4L263.7,39.6L266.5,40.6L267.1,41.7L265.4,42.4L261.5,43L258.1,42.7L250.4,43.1L244.9,43.1L240.6,42.8L233.5,42L232.6,40.5L232.3,39.2L229.6,38L224.1,37.7L221,36.9L222,35.8ZM170.1,34.5L169.8,36.5L167.7,37.4L165.2,37.6L160.3,38.7L156,39.1L152.4,38.5L156.9,36.6L162.4,34.8L166.5,34.9ZM229.8,34.8L228.5,34.9L223.5,34.7L222.8,34L228.2,34L230.1,34.5ZM186.2,34.3L181.2,35.1L177.2,34.2L179.4,33.4L183.3,33.1L187.1,33.5ZM545.9,33.9L540,35L535.3,34.4L537.1,33.7L535.5,32.8L541,32.3L542.1,33.3ZM187.6,31.9L184.3,32.4L179.9,32.4L179.9,32.1L182.7,31.3L184.1,31.4ZM224.5,33.4L220.5,33.9L218.3,33.3L217.2,32.3L217,31.2L220.4,31.3L222,31.5L225.2,32.4ZM213.2,32.7L214.2,33.8L209.9,33.5L205.5,32.6L199.5,32.5L202.1,31.7L198.9,31.1L198.7,30.1L203.9,30.4L211.1,31.4ZM760.2,32.7L745.2,33.7L750,30.2L752.2,29.9L754.2,30.1L761,31.6ZM528.7,29L537.5,31L530.7,32L529.3,34L526.9,34.5L525.7,36.7L522.4,36.8L516.7,35.2L519.1,34.2L515.1,33.5L509.9,31.2L507.9,29.1L515.1,28.2L516.6,29.1L520.4,29.1L521.4,28.2L525.3,28.1ZM547.9,27.1L553.1,28L549.1,29.5L541.4,29.8L533.5,29.4L533.1,28.6L529.2,28.6L526.3,27.3L534.6,26.6L538.4,27.2L541.1,26.4ZM616.4,26.7L612.8,27.1L610.4,27.3L610,27.7L606.9,28.2L604,27.5L605.5,26.7L599.6,26.6L604.8,26.1L608.8,26.1L609.4,26.8L610.9,26.2L613.4,25.7L617.4,26.3ZM746.5,31.2L740.7,31.5L733.3,30.7L728.8,29.7L726.8,27.8L723.1,27.3L730.1,25.5L735.8,24.9L741,26.2L747.2,28.8ZM248,29.1L251.2,30L247.5,30.8L242.6,32.8L237.9,33L232.3,32.6L229.5,31.5L229.5,30.6L231.6,29.8L226.7,29.9L223.8,29L222.1,27.8L224,26.6L225.8,25.8L228.5,25.6L227.4,25L233.6,24.8L237,26.3L241.5,26.8L245.8,27.3ZM297.3,19.9L304.5,20.1L310.2,20.5L315.1,21.2L315,21.9L308.4,23.1L302,23.6L299.6,24.2L305.4,24.2L299.1,25.8L294.8,26.5L290.2,28.7L284.7,29.2L283,29.7L274.9,30L278.6,30.3L276.7,30.8L279,32.1L276.4,33L272.3,33.8L271,34.8L267.3,35.6L267.7,36.2L272.2,36.1L272.3,36.8L265.2,38.4L258.2,37.7L250.4,38.1L246.4,37.7L241.4,37.6L241,36.3L246,35.7L244.6,33.8L246.3,33.6L253.4,34.8L249.8,33L245.4,32.5L247.6,31.5L252.3,30.9L253.1,29.9L249.3,28.9L248.2,27.5L255.5,27.6L257.6,27.9L261.7,27L255.7,26.6L246.4,26.8L241.7,25.9L239.5,24.8L236.4,24.1L235.8,23.1L239.7,22.6L242.8,22.5L248.1,22.1L252,21.1L255.3,21.3L258.2,22L260.2,20.6L263.7,20.1L268.5,19.8L276.7,19.7L278.1,20L285.8,19.6L291.6,19.7ZM407.7,18.8L424.4,20.9L419.5,21.9L409.3,22.1L394.9,22.3L396.3,22.8L405.7,22.5L413.7,23.4L418.9,22.6L421.1,23.6L418.2,25.1L425,24.1L437.9,23.1L445.9,23.6L447.4,24.8L436.6,26.6L435.1,27.3L426.5,27.7L432.7,27.8L429.6,29.8L427.5,31.5L427.5,34.5L430.7,36.2L426.6,36.3L422.2,37.2L427.1,38.6L427.7,40.9L424.9,41.1L428.3,43.4L422.4,43.6L425.5,44.7L424.6,45.6L420.9,46L417.2,46L420.5,47.8L420.5,49L415.3,47.9L413.9,48.6L417.5,49.3L421,50.9L422,53.1L417.2,53.6L415.2,52.6L411.9,51L412.8,52.9L409.7,54.3L416.7,54.4L420.4,54.5L413.3,56.8L406,58.9L398.2,59.9L395.3,59.9L392.5,60.9L388.8,63.7L383.1,65.6L381.2,65.7L377.7,66.3L373.8,67L371.6,68.6L371.5,70.5L370.2,72.2L365.8,74.4L366.9,76.5L365.7,78.7L364.3,81.3L360.6,81.4L356.6,79.3L351.3,79.2L348.7,77.8L346.9,75.2L342.3,71.9L341,70.1L340.6,67.7L336.9,65.3L337.9,63.3L336.1,62.4L338.7,59.2L342.7,58.2L343.8,57.1L344.3,55.1L341.3,56L339.8,56.4L337.5,56.8L334.2,55.9L334,54.1L335,52.7L337.5,52.6L343,53.3L338.4,51.6L336,50.7L333.3,51.1L331.1,50.4L334.1,48L332.5,47L330.3,45.1L327.1,42.3L323.7,41.3L323.8,40.1L316.6,38.6L311,38.4L303.8,38.5L297.3,38.7L294.2,37.9L289.6,36.2L296.6,35.3L302,35.2L290.6,34.5L284.5,33.4L284.9,32.4L295,31.1L304.8,29.8L305.8,28.8L298.6,27.9L300.9,26.8L310.2,25L314,24.7L312.9,23.5L319.3,22.8L327.5,22.4L335.6,22.3L338.5,23.2L345.6,21.7L352,22.7L355.7,22.9L361.3,23.8L354.9,22.3L355.3,21.2L364.2,19.6L373.6,19.7L377,18.7L386.4,18.5Z`;
window.CITIES = {
  princeton: { x: 280.9, y: 133.9, label: "Princeton, NJ" },
  seattle: { x: 153.8, y: 114.6, label: "Seattle, WA" },
  remote: { x: 217.1, y: 135.3, label: "United States" },
  orlando: { x: 263, y: 165.4, label: "Orlando, FL" },
  tampa: { x: 260.1, y: 165.5, label: "Tampa, FL" },
  austin: { x: 219.4, y: 160.8, label: "Austin, TX" },
  taipei: { x: 804.2, y: 174.8, label: "Taipei, Taiwan" },
  madrid: { x: 470.1, y: 133.7, label: "Madrid, Spain" },
  tokyo: { x: 852.5, y: 146.4, label: "Tokyo, Japan" },
  zermatt: { x: 500.7, y: 118.8, label: "Zermatt, Switzerland" },
  aspen: { x: 195.2, y: 137, label: "Aspen, CO" },
  parkcity: { x: 182.7, y: 133.1, label: "Park City, UT" },
  breckenridge: { x: 197.2, y: 136.2, label: "Breckenridge, CO" },
  cambridge: { x: 290.4, y: 128.5, label: "Cambridge, MA" },
  valencia: { x: 479, y: 136.3, label: "Valencia, Spain" },
  tainan: { x: 800.6, y: 180.2, label: "Tainan, Taiwan" },
  paris: { x: 486.3, y: 111.2, label: "Paris, France" },
  lucerne: { x: 502.2, y: 116.1, label: "Lucerne, Switzerland" },
  munich: { x: 510.9, y: 113.2, label: "Munich, Germany" },
  london: { x: 479.7, y: 104.2, label: "London, UK" }
};
window.TIMELINE_EVENTS = [
  {
    id: "databricks26",
    year: 2026,
    month: "Jun",
    title: "Databricks \xB7 SWE (incoming)",
    city: "seattle",
    category: "work",
    body: "Returning to Seattle for the summer on the Unity Catalog team",
    links: [{ label: "Unity Catalog", href: "https://www.databricks.com/product/unity-catalog" }]
  },
  {
    id: "taiwan26",
    year: 2026,
    month: "Mar",
    title: "Taiwan spring break",
    city: "tainan",
    category: "travel",
    path: ["taipei", "tainan"],
    body: "9 days split between Tainan and Taipei. Night markets, temples, the best beef noodle soup",
    photos: [
      { caption: "Yongkang Street, Taipei", src: "site/photos/taiwan-2026-1.jpg" },
      { caption: "Night Markets", src: "site/photos/taiwan-2026-2.jpg" },
      { caption: "Shennong Street, Tainan", src: "site/photos/taiwan-2026-3.jpg" }
    ]
  },
  {
    id: "spain26",
    year: 2026,
    month: "Jan",
    title: "Spain winter break",
    city: "valencia",
    category: "travel",
    path: ["madrid", "valencia"],
    body: "Winter break: Madrid down through the coast to Valencia. Paella at the source.",
    photos: [
      { caption: "madrid rooftops", src: "site/photos/spain-2026-1.jpg" },
      { caption: "valencia, albufera", src: "site/photos/spain-2026-2.jpg" }
    ]
  },
  {
    id: "amazon25",
    year: 2025,
    month: "May",
    title: "Amazon \xB7 SDE intern",
    city: "seattle",
    category: "work",
    body: "Summer on the IAM team in Seattle. Identity and access at AWS scale",
    photos: [
      { caption: "Rattlesnake Hike", src: "site/photos/amazon-2025-1.jpg" },
      { caption: "The Cut", src: "site/photos/amazon-2025-2.jpg" },
      { caption: "Off-Hour Wanders", src: "site/photos/amazon-2025-3.jpg" }
    ],
    links: [{ label: "AWS IAM", href: "https://aws.amazon.com/iam/" }]
  },
  {
    id: "bluehalo24",
    year: 2024,
    month: "May",
    title: "BlueHalo \xB7 SWE intern",
    city: "tampa",
    category: "work",
    body: "Worked on ML inference systems for production computer vision: throughput, latency, and deployment tooling",
    links: [{ label: "AeroVironment", href: "https://www.avinc.com/" }]
  },
  {
    id: "breckenridge23",
    year: 2023,
    month: "Dec",
    title: "Breckenridge",
    city: "breckenridge",
    category: "travel",
    body: "Winter break skiing in Breckenridge",
    photos: [
      { caption: "summit, bluebird", src: "site/photos/breckenridge-2023-1.jpg" }
    ]
  },
  {
    id: "orientation23",
    year: 2023,
    month: "Sep",
    title: "Move-in & orientation",
    city: "princeton",
    category: "research",
    body: "Started at Princeton in ECE. Move-in, orientation week, and first PSETs",
    photos: [
      { caption: "My attempt at kayaking", src: "site/photos/orientation-2023-1.jpg" },
      { caption: "Opening exercises", src: "site/photos/orientation-2023-2.jpg" }
    ]
  },
  {
    id: "collegetour23",
    year: 2023,
    month: "Apr",
    title: "College visits: Princeton",
    city: "princeton",
    category: "research",
    body: "Accepted students weekend at Princeton: walked campus and made it home",
    photos: [
      { caption: "Whitman College", src: "site/photos/collegetour-2023-1.jpg" },
      { caption: "Nassau Hall", src: "site/photos/collegetour-2023-2.jpg" },
      { caption: "McCosh Walk", src: "site/photos/collegetour-2023-3.jpg" }
    ]
  },
  {
    id: "parkcity23",
    year: 2023,
    month: "Mar",
    title: "Park City",
    city: "parkcity",
    category: "travel",
    body: "First time skiing",
    photos: [
      { caption: "Park City Ridge", src: "site/photos/parkcity-2023-1.jpg" }
    ]
  }
];

/* ---- pages-timeline.jsx ---- */
window.TimelinePage = function TimelinePage({ palette }) {
  const P = palette;
  const A = window.ACCENTS;
  const pin = A[window.PAGE_ACCENT.timeline || "coral"];
  const events = window.TIMELINE_EVENTS;
  const { width } = window.useViewport();
  const compact = width < 920;
  const narrow = width < 640;
  const [selectedId, setSelectedId] = React.useState(events[1].id);
  const selected = events.find((e) => e.id === selectedId) || events[0];
  const city = window.CITIES[selected.city] || window.CITIES.remote;
  const grouped = React.useMemo(() => {
    const g = {};
    events.forEach((e) => {
      (g[e.year] = g[e.year] || []).push(e);
    });
    return Object.entries(g).sort((a, b) => b[0] - a[0]);
  }, [events]);
  const t = window.useTick();
  return /* @__PURE__ */ React.createElement("div", { style: {
    padding: narrow ? "36px 22px 80px" : compact ? "52px 34px 96px" : "70px 60px 120px",
    maxWidth: 1400,
    margin: "0 auto"
  } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 48 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10,
    letterSpacing: 2,
    color: P.inkMute,
    marginBottom: 14
  } }, "CHRONOLOGY"), /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: '"Fraunces", Georgia, serif',
    fontSize: narrow ? 46 : compact ? 58 : 72,
    letterSpacing: narrow ? -1 : -2,
    lineHeight: 0.95,
    color: P.ink,
    fontWeight: 400,
    marginBottom: 22
  } }, "Travel, work, and ", /* @__PURE__ */ React.createElement("em", { style: { color: pin } }, "everything in-between"))), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: compact ? "1fr" : "340px 1fr",
    gap: compact ? 32 : 56,
    alignItems: "start"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    borderTop: `1px solid ${P.rule}`,
    borderBottom: `1px solid ${P.rule}`,
    paddingTop: 18,
    paddingBottom: 8,
    maxHeight: compact ? "none" : "calc(100vh - 210px)",
    overflowY: compact ? "visible" : "auto"
  } }, grouped.map(([year, evs], gi) => /* @__PURE__ */ React.createElement("div", { key: year, style: { marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 11,
    color: P.inkMute,
    letterSpacing: 1.5,
    marginBottom: 14
  } }, year), evs.map((e) => {
    const active = e.id === selectedId;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: e.id,
        onClick: () => setSelectedId(e.id),
        style: {
          display: "grid",
          gridTemplateColumns: "48px 1fr",
          gap: 14,
          width: "100%",
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: "9px 0",
          cursor: "pointer",
          fontFamily: "Inter, sans-serif",
          alignItems: "baseline"
        },
        onMouseEnter: (ev) => {
          if (!active) ev.currentTarget.querySelector(".tl-title").style.color = P.ink;
        },
        onMouseLeave: (ev) => {
          if (!active) ev.currentTarget.querySelector(".tl-title").style.color = P.inkSoft;
        }
      },
      active ? /* @__PURE__ */ React.createElement("span", { style: {
        display: "inline-block",
        padding: "2px 8px 3px",
        background: pin,
        color: P.paper,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 10,
        letterSpacing: 0.8,
        fontWeight: 500,
        clipPath: "polygon(0 0, 86% 0, 100% 50%, 86% 100%, 0 100%)",
        textAlign: "center",
        justifySelf: "start"
      } }, e.month) : /* @__PURE__ */ React.createElement("span", { style: {
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 10,
        color: P.inkMute,
        letterSpacing: 0.8,
        padding: "2px 4px"
      } }, e.month),
      /* @__PURE__ */ React.createElement("span", { className: "tl-title", style: {
        fontSize: 14,
        color: active ? P.ink : P.inkSoft,
        fontWeight: active ? 500 : 400,
        letterSpacing: -0.1,
        transition: "color .2s",
        lineHeight: 1.35
      } }, e.title)
    );
  })))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(MapCard, { palette: P, accent: pin, city, t, event: selected }), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 28 } }, /* @__PURE__ */ React.createElement("div", { key: selected.id, style: {
    animation: "pageIn 500ms ease-out",
    display: "flex",
    flexWrap: "wrap",
    gap: 36,
    alignItems: "flex-start",
    paddingTop: 14
  } }, /* @__PURE__ */ React.createElement("div", { style: { flex: "1 1 auto", minWidth: 0 } }, /* @__PURE__ */ React.createElement(PhotosRow, { photos: (selected.photos || []).filter((p) => p.src), palette: P, accent: pin })), !selected.noSticky && /* @__PURE__ */ React.createElement("div", { style: { flex: "0 1 320px", minWidth: 260 } }, /* @__PURE__ */ React.createElement(StickyNote, { event: selected, palette: P, accent: pin })))))));
};
function MapCard({ palette, accent, city, t, event }) {
  const P = palette;
  const mapW = 960, mapH = 500;
  const aspect = mapH / mapW;
  const pathCities = React.useMemo(() => {
    const keys = event.path && event.path.length ? event.path : [event.city];
    return keys.map((k) => window.CITIES[k]).filter(Boolean);
  }, [event.id]);
  const eventDots = React.useMemo(() => {
    const keys = /* @__PURE__ */ new Set();
    window.TIMELINE_EVENTS.forEach((e) => {
      const route = e.path && e.path.length ? e.path : [e.city];
      route.forEach((k) => keys.add(k));
    });
    return Array.from(keys).map((k) => window.CITIES[k]).filter(Boolean);
  }, []);
  const [zoomed, setZoomed] = React.useState(true);
  const computeTarget = React.useCallback(() => {
    return zoomed ? computeViewBox(pathCities, mapW, mapH) : { x: 0, y: 0, w: mapW, h: mapH };
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
        h: from.h + (target.h - from.h) * e
      });
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [event.id, zoomed]);
  React.useEffect(() => {
    setZoomed(true);
  }, [event.id]);
  const zoomScale = vb.w / mapW;
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "relative",
    background: P.paper,
    border: `1px solid ${P.rule}`,
    boxShadow: "0 2px 8px rgba(0,0,0,0.03), 0 12px 40px rgba(0,0,0,0.06)",
    paddingTop: `${aspect * 100}%`
  } }, /* @__PURE__ */ React.createElement(
    "svg",
    {
      viewBox: `${vb.x} ${vb.y} ${vb.w} ${vb.h}`,
      onClick: () => setZoomed((z) => !z),
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        cursor: zoomed ? "zoom-out" : "zoom-in"
      }
    },
    /* @__PURE__ */ React.createElement("g", { stroke: P.rule, strokeWidth: "0.6", opacity: "0.6", vectorEffect: "non-scaling-stroke" }, [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ React.createElement("line", { key: "h" + i, x1: "0", x2: mapW, y1: i * mapH / 5, y2: i * mapH / 5, vectorEffect: "non-scaling-stroke" })), [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => /* @__PURE__ */ React.createElement("line", { key: "v" + i, x1: i * mapW / 8, x2: i * mapW / 8, y1: "0", y2: mapH, vectorEffect: "non-scaling-stroke" }))),
    /* @__PURE__ */ React.createElement(
      "path",
      {
        d: window.WORLD_MAP_PATH,
        fill: P.bgAlt,
        stroke: P.inkMute,
        strokeWidth: "1",
        strokeLinejoin: "round",
        opacity: "0.85",
        vectorEffect: "non-scaling-stroke"
      }
    ),
    eventDots.map((c, i) => /* @__PURE__ */ React.createElement(
      "circle",
      {
        key: `${c.label}-${i}`,
        cx: c.x,
        cy: c.y,
        r: 0.9 * zoomScale,
        fill: P.inkMute,
        opacity: "0.2"
      }
    )),
    pathCities.length > 1 && /* @__PURE__ */ React.createElement(
      "path",
      {
        d: routePath(pathCities),
        fill: "none",
        stroke: accent,
        strokeWidth: "1.25",
        opacity: "0.55",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        vectorEffect: "non-scaling-stroke"
      }
    ),
    pathCities.map((c, i) => {
      const label = routeLabelOffset(pathCities.length, i);
      const labelW = (c.label.length * 6.1 + 18) * zoomScale;
      const markerScale = Math.min(zoomScale, 0.78);
      return /* @__PURE__ */ React.createElement("g", { key: `pin-${i}` }, /* @__PURE__ */ React.createElement(
        "circle",
        {
          cx: c.x,
          cy: c.y,
          r: 3.4 * markerScale,
          fill: P.paper,
          stroke: accent,
          strokeWidth: "1.25",
          vectorEffect: "non-scaling-stroke"
        }
      ), /* @__PURE__ */ React.createElement("circle", { cx: c.x, cy: c.y, r: 1.25 * markerScale, fill: accent }), /* @__PURE__ */ React.createElement("g", { transform: `translate(${c.x + label.dx * zoomScale}, ${c.y + label.dy * zoomScale})` }, /* @__PURE__ */ React.createElement(
        "rect",
        {
          x: -3 * zoomScale,
          y: -12 * zoomScale,
          width: labelW,
          height: 17 * zoomScale,
          fill: P.paper,
          stroke: P.rule,
          strokeWidth: "0.6",
          opacity: "0.97",
          vectorEffect: "non-scaling-stroke"
        }
      ), /* @__PURE__ */ React.createElement(
        "text",
        {
          x: 6 * zoomScale,
          y: 0,
          fontSize: 10.5 * zoomScale,
          fontFamily: '"JetBrains Mono", monospace',
          fill: P.ink,
          letterSpacing: 0.25 * zoomScale
        },
        c.label
      )));
    })
  ), /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: 10,
    left: 12,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 9,
    color: P.inkMute,
    letterSpacing: 1
  } }, "N \u2191"), /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    bottom: 10,
    right: 12,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 9,
    color: P.inkMute,
    letterSpacing: 1
  } }, event.month.toLowerCase(), " ", event.year), /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    bottom: 10,
    left: 12,
    fontFamily: '"Fraunces", serif',
    fontStyle: "italic",
    fontSize: 11,
    color: P.inkMute
  } }, event.category));
}
function computeViewBox(cities, mapW, mapH) {
  if (!cities || !cities.length) return { x: 0, y: 0, w: mapW, h: mapH };
  const aspect = mapH / mapW;
  const xs = cities.map((c) => c.x);
  const ys = cities.map((c) => c.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const bboxW = Math.max(maxX - minX, (maxY - minY) / aspect);
  const baseW = cities.length > 1 ? Math.max(340, bboxW + 160) : 320;
  let w = Math.max(260, Math.min(mapW, baseW));
  let h = w * aspect;
  let x = cx - w / 2;
  let y = cy - h / 2;
  x = Math.max(0, Math.min(mapW - w, x));
  y = Math.max(0, Math.min(mapH - h, y));
  return { x, y, w, h };
}
function routePath(cities) {
  if (!cities || cities.length < 2) return "";
  const segments = [`M ${cities[0].x} ${cities[0].y}`];
  for (let i = 1; i < cities.length; i++) {
    const b = cities[i];
    segments.push(`L ${b.x} ${b.y}`);
  }
  return segments.join(" ");
}
function routeLabelOffset(count, index) {
  if (count < 2) return { dx: 10, dy: -6 };
  return index % 2 === 0 ? { dx: 10, dy: -10 } : { dx: 10, dy: 20 };
}
function PhotosRow({ photos, palette, accent }) {
  const P = palette;
  if (!photos.length) return null;
  const rotations = [-4, 3, -2, 5];
  return /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "flex-start",
    marginLeft: -4
  } }, photos.map((p, i) => /* @__PURE__ */ React.createElement(
    Polaroid,
    {
      key: i,
      photo: p,
      idx: i,
      rotate: rotations[i % 4],
      palette: P,
      accent
    }
  )));
}
function Polaroid({ photo, idx, rotate, palette, accent }) {
  const P = palette;
  const seed = photo.label || photo.caption || "";
  const hue = (seed.charCodeAt(0) + seed.length * 17) % 360;
  const hue2 = (hue + 40) % 360;
  return /* @__PURE__ */ React.createElement("div", { style: {
    width: 164,
    padding: 8,
    paddingBottom: 34,
    background: "#fbfbf7",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.1)",
    transform: `rotate(${rotate}deg)`,
    position: "relative"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: -8,
    left: "50%",
    width: 12,
    height: 22,
    transform: "translateX(-50%)",
    pointerEvents: "none"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    left: "50%",
    top: 8,
    width: 1,
    height: 16,
    background: "rgba(70,50,35,0.38)",
    transform: "translateX(-50%) rotate(-4deg)",
    transformOrigin: "top"
  } }), /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    left: 1,
    top: 0,
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: accent,
    boxShadow: "0 1px 2px rgba(0,0,0,0.13)"
  } })), photo.src ? /* @__PURE__ */ React.createElement("div", { style: {
    width: "100%",
    aspectRatio: "1 / 1",
    background: "#1a1a18",
    position: "relative",
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: photo.src,
      alt: photo.caption,
      loading: "lazy",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        filter: "saturate(0.95) contrast(1.02)"
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: `radial-gradient(ellipse at 30% 20%,
              rgba(255,255,255,0.10) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 100%,
              rgba(0,0,0,0.18) 0%, transparent 60%)`
  } })) : /* @__PURE__ */ React.createElement("div", { style: {
    width: "100%",
    aspectRatio: "1 / 1",
    background: `linear-gradient(135deg,
            oklch(0.72 0.08 ${hue}) 0%,
            oklch(0.58 0.10 ${hue2}) 100%)`,
    position: "relative",
    overflow: "hidden"
  } }, /* @__PURE__ */ React.createElement(PhotoGlyph, { label: photo.label }), /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    inset: 0,
    background: `radial-gradient(ellipse at 30% 20%,
              rgba(255,255,255,0.15) 0%, transparent 50%)`
  } })), /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    bottom: 6,
    left: 12,
    right: 12,
    fontFamily: '"Fraunces", serif',
    fontStyle: "italic",
    fontSize: 11,
    color: "rgba(40,30,20,0.7)",
    textAlign: "center"
  } }, photo.caption));
}
function PhotoGlyph({ label }) {
  const l = (label || "").toLowerCase();
  if (l.includes("taipei") || l.includes("101")) {
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 100", style: { position: "absolute", inset: 0, width: "100%", height: "100%" } }, /* @__PURE__ */ React.createElement("g", { stroke: "rgba(255,255,255,0.55)", fill: "none", strokeWidth: "1" }, /* @__PURE__ */ React.createElement("path", { d: "M 50 10 L 40 20 L 42 32 L 38 38 L 42 46 L 38 52 L 42 60 L 38 68 L 50 76 L 62 68 L 58 60 L 62 52 L 58 46 L 62 38 L 58 32 L 60 20 Z" }), /* @__PURE__ */ React.createElement("path", { d: "M 50 10 L 50 4" }), /* @__PURE__ */ React.createElement("path", { d: "M 20 90 L 80 90", strokeDasharray: "2 2" })));
  }
  if (l.includes("alhambra") || l.includes("sagrada") || l.includes("retiro")) {
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 100", style: { position: "absolute", inset: 0, width: "100%", height: "100%" } }, /* @__PURE__ */ React.createElement("g", { stroke: "rgba(255,255,255,0.55)", fill: "none", strokeWidth: "1" }, /* @__PURE__ */ React.createElement("path", { d: "M 20 80 L 20 50 Q 30 30 40 50 L 40 80 Z" }), /* @__PURE__ */ React.createElement("path", { d: "M 50 80 L 50 40 Q 62 22 74 40 L 74 80 Z" }), /* @__PURE__ */ React.createElement("circle", { cx: "30", cy: "60", r: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "62", cy: "50", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M 10 85 L 90 85" })));
  }
  if (l.includes("matterhorn") || l.includes("ajax") || l.includes("groomer") || l.includes("lift")) {
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 100", style: { position: "absolute", inset: 0, width: "100%", height: "100%" } }, /* @__PURE__ */ React.createElement("g", { stroke: "rgba(255,255,255,0.55)", fill: "none", strokeWidth: "1" }, /* @__PURE__ */ React.createElement("path", { d: "M 10 80 L 35 30 L 50 55 L 70 20 L 92 80 Z" }), /* @__PURE__ */ React.createElement("path", { d: "M 30 38 L 38 42 L 35 30" }), /* @__PURE__ */ React.createElement("path", { d: "M 62 32 L 72 36 L 70 20" })));
  }
  if (l.includes("seattle") || l.includes("market") || l.includes("slu") || l.includes("badge")) {
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 100", style: { position: "absolute", inset: 0, width: "100%", height: "100%" } }, /* @__PURE__ */ React.createElement("g", { stroke: "rgba(255,255,255,0.55)", fill: "none", strokeWidth: "1" }, /* @__PURE__ */ React.createElement("path", { d: "M 48 20 L 48 60" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "48", cy: "60", rx: "14", ry: "5" }), /* @__PURE__ */ React.createElement("path", { d: "M 38 65 L 42 85 M 54 65 L 58 85" }), /* @__PURE__ */ React.createElement("path", { d: "M 12 88 L 88 88" })));
  }
  if (l.includes("coast") || l.includes("jiufen")) {
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 100", style: { position: "absolute", inset: 0, width: "100%", height: "100%" } }, /* @__PURE__ */ React.createElement("g", { stroke: "rgba(255,255,255,0.55)", fill: "none", strokeWidth: "1" }, /* @__PURE__ */ React.createElement("path", { d: "M 0 60 Q 25 55 50 60 T 100 58" }), /* @__PURE__ */ React.createElement("path", { d: "M 0 68 Q 25 63 50 68 T 100 66" }), /* @__PURE__ */ React.createElement("path", { d: "M 0 76 Q 25 71 50 76 T 100 74" }), /* @__PURE__ */ React.createElement("path", { d: "M 20 40 L 40 20 L 60 35 L 80 15 L 100 30 L 100 60 L 0 60 L 0 45 Z" })));
  }
  if (l.includes("office") || l.includes("cs") || l.includes("nassau") || l.includes("friend")) {
    return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 100", style: { position: "absolute", inset: 0, width: "100%", height: "100%" } }, /* @__PURE__ */ React.createElement("g", { stroke: "rgba(255,255,255,0.55)", fill: "none", strokeWidth: "1" }, /* @__PURE__ */ React.createElement("rect", { x: "20", y: "28", width: "60", height: "50" }), /* @__PURE__ */ React.createElement("path", { d: "M 20 28 L 50 12 L 80 28" }), [32, 46, 60].map((x) => /* @__PURE__ */ React.createElement("rect", { key: x, x, y: "40", width: "8", height: "12" })), /* @__PURE__ */ React.createElement("rect", { x: "46", y: "62", width: "8", height: "16" })));
  }
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 100 100", style: { position: "absolute", inset: 0, width: "100%", height: "100%" } }, /* @__PURE__ */ React.createElement("g", { stroke: "rgba(255,255,255,0.5)", fill: "none", strokeWidth: "1" }, /* @__PURE__ */ React.createElement("circle", { cx: "72", cy: "28", r: "8" }), /* @__PURE__ */ React.createElement("path", { d: "M 0 65 Q 30 50 60 60 T 100 55" }), /* @__PURE__ */ React.createElement("path", { d: "M 0 75 Q 30 60 60 70 T 100 65" })));
}
function StickyNote({ event, palette, accent }) {
  const P = palette;
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "relative",
    width: "100%",
    background: "oklch(0.96 0.05 88)",
    padding: "20px 22px 22px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.09), 0 1px 2px rgba(0,0,0,0.06)",
    transform: "rotate(1.5deg)",
    fontFamily: "Inter, sans-serif",
    marginTop: 12
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    top: -12,
    left: "40%",
    width: 60,
    height: 20,
    background: "rgba(255,255,255,0.55)",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
    transform: "rotate(-3deg)"
  } }), /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 9,
    letterSpacing: 1.5,
    color: "rgba(80,60,30,0.6)",
    marginBottom: 8
  } }, event.month.toUpperCase(), " ", event.year, " \xB7 ", event.category.toUpperCase()), /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: '"Fraunces", serif',
    fontSize: 22,
    letterSpacing: -0.5,
    lineHeight: 1.1,
    color: "rgba(40,30,15,0.92)",
    marginBottom: 12,
    fontWeight: 500
  } }, event.title), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "rgba(50,40,20,0.82)"
  } }, event.body), event.links && event.links.length > 0 && /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: 14,
    paddingTop: 10,
    borderTop: "1px dashed rgba(100,80,30,0.25)",
    display: "flex",
    gap: 10,
    flexWrap: "wrap"
  } }, event.links.map((l, i) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: i,
      href: l.href,
      style: {
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 10,
        color: accent,
        textDecoration: "underline",
        letterSpacing: 0.3
      }
    },
    l.label,
    " \u2197"
  ))));
}

/* ---- app.jsx ---- */
const DEFAULTS = { palette: "cream", accent: "coral" };
function App() {
  const normalizePage = (id) => id === "timeline" && !window.FEATURE_FLAGS.timeline ? "about" : id;
  const [page, setRawPage] = React.useState(() => normalizePage(localStorage.getItem("ed_page") || "about"));
  const setPage = (id) => {
    const next = normalizePage(id);
    if (next === page) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && document.startViewTransition) {
      document.startViewTransition(() => {
        if (window.ReactDOM && window.ReactDOM.flushSync) {
          window.ReactDOM.flushSync(() => setRawPage(next));
        } else {
          setRawPage(next);
        }
      });
    } else {
      setRawPage(next);
    }
  };
  const [paletteKey, setPaletteKey] = React.useState(() => localStorage.getItem("ed_palette") || DEFAULTS.palette);
  const [accentKey, setAccentKey] = React.useState(() => localStorage.getItem("ed_accent") || DEFAULTS.accent);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  React.useEffect(() => {
    localStorage.setItem("ed_page", page);
  }, [page]);
  React.useEffect(() => {
    localStorage.setItem("ed_palette", paletteKey);
  }, [paletteKey]);
  React.useEffect(() => {
    localStorage.setItem("ed_accent", accentKey);
  }, [accentKey]);
  const palette = window.PALETTES[paletteKey] || window.PALETTES.cream;
  const viewport = window.useViewport();
  const compact = viewport.width < 1100;
  const PageComp = {
    about: window.AboutPage,
    research: window.ResearchPage,
    work: window.WorkPage,
    projects: window.ProjectsPage,
    timeline: window.TimelinePage
  }[page];
  return /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    minHeight: "100vh",
    background: palette.bg,
    color: palette.ink,
    fontFamily: "Inter, system-ui, sans-serif",
    flexDirection: compact ? "column" : "row"
  } }, /* @__PURE__ */ React.createElement(
    window.Sidebar,
    {
      page,
      setPage,
      palette,
      accentKey,
      compact
    }
  ), /* @__PURE__ */ React.createElement("main", { className: "app-scroll", style: {
    flex: 1,
    minWidth: 0,
    background: palette.bg,
    overflowY: "auto",
    height: compact ? "auto" : "100vh"
  } }, /* @__PURE__ */ React.createElement(PageComp, { palette, setPage })), /* @__PURE__ */ React.createElement(TweaksToggle, { open: tweaksOpen, onToggle: () => setTweaksOpen((o) => !o), palette }), tweaksOpen && /* @__PURE__ */ React.createElement(
    TweaksPanel,
    {
      palette,
      paletteKey,
      accentKey,
      onPalette: setPaletteKey,
      onAccent: setAccentKey,
      onClose: () => setTweaksOpen(false)
    }
  ));
}
function TweaksToggle({ open, onToggle, palette }) {
  const P = palette;
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onToggle,
      "aria-label": open ? "Close tweaks" : "Open tweaks",
      style: {
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 101,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: P.paper,
        border: `1px solid ${P.rule}`,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 14,
        color: P.ink,
        letterSpacing: 0.5,
        transition: "transform .25s var(--ease-out-quart), border-color .2s var(--ease-out-quart)",
        transform: open ? "rotate(45deg)" : "rotate(0deg)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = P.ink;
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = P.rule;
      }
    },
    open ? "\xD7" : "\u2699"
  );
}
function TweaksPanel({ palette, paletteKey, accentKey, onPalette, onAccent }) {
  const P = palette, A = window.ACCENTS;
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    bottom: 76,
    right: 20,
    width: 280,
    background: P.paper,
    border: `1px solid ${P.rule}`,
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    padding: "16px 18px",
    zIndex: 100,
    animation: "slideInR 320ms var(--ease-out-quart) both",
    fontFamily: "Inter, sans-serif"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10,
    letterSpacing: 1.4,
    color: P.inkMute,
    marginBottom: 12
  } }, "// TWEAKS"), /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: '"Fraunces", serif',
    fontSize: 13,
    color: P.ink,
    marginBottom: 8,
    letterSpacing: -0.1
  } }, "Paper"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 18 } }, Object.keys(window.PALETTES).map((k) => {
    const p = window.PALETTES[k];
    const active = paletteKey === k;
    return /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => onPalette(k), style: {
      flex: 1,
      padding: "10px 8px",
      cursor: "pointer",
      background: p.bg,
      border: `1px solid ${active ? P.ink : P.rule}`,
      borderRadius: 0,
      textAlign: "left",
      fontFamily: "Inter, sans-serif",
      fontSize: 11,
      color: p.ink,
      letterSpacing: 0.2,
      boxShadow: active ? `inset 0 0 0 1px ${P.ink}` : "none"
    } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 500 } }, k), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9, color: p.inkMute, marginTop: 2, fontFamily: '"JetBrains Mono", monospace' } }, k === "cream" ? "warm" : "cool"));
  })), /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: '"Fraunces", serif',
    fontSize: 13,
    color: P.ink,
    marginBottom: 8,
    letterSpacing: -0.1
  } }, "Signal accent"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, Object.entries(A).map(([k, v]) => {
    const active = accentKey === k;
    return /* @__PURE__ */ React.createElement("button", { key: k, onClick: () => onAccent(k), style: {
      flex: 1,
      padding: "8px 6px",
      cursor: "pointer",
      background: P.bg,
      border: `1px solid ${active ? v : P.rule}`,
      borderRadius: 0,
      textAlign: "center",
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10,
      color: active ? v : P.inkSoft,
      letterSpacing: 0.3
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      width: 14,
      height: 14,
      background: v,
      borderRadius: "50%",
      margin: "2px auto 6px",
      boxShadow: active ? `0 0 0 3px ${v.replace(")", " / 0.22)")}` : "none"
    } }), k);
  })), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: 14,
    paddingTop: 10,
    borderTop: `1px dashed ${P.rule}`,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 9,
    color: P.inkMute,
    lineHeight: 1.5,
    letterSpacing: 0.2
  } }, "accent changes section emphasis. paper changes the mood."));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));

})();
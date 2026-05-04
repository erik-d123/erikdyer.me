// shared.jsx: tokens, viewport, and shared atoms

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

// per-page accent assignment
window.PAGE_ACCENT = {
  about:    'periwinkle',
  research: 'sage',
  work:     'coral',
  projects: 'periwinkle',
  timeline: 'coral',
};

window.STATUS_ACCENT = {
  research: 'sage',
  public:   'periwinkle',
  course:   'coral',
};

window.FEATURE_FLAGS = {
  timeline: false,
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

window.useViewport = function useViewport() {
  const read = () => ({
    width: window.innerWidth || 1024,
    height: window.innerHeight || 768,
  });
  const [viewport, setViewport] = React.useState(read);
  React.useEffect(() => {
    const onResize = () => setViewport(read());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return viewport;
};

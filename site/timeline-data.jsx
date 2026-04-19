// site/timeline-data.jsx — events + SVG world map path

// World map path (Natural Earth 110m simplified). Stylized, cream-colored.
// Source: simplified from public-domain Natural Earth data.
// This is a HAND-WRITTEN simplified silhouette of continents for the aesthetic —
// NOT pixel-accurate, meant to read as cream-toned cartography.

window.WORLD_MAP_PATH = `
M 158 218 L 182 206 L 204 208 L 228 196 L 252 192 L 278 194 L 298 200 L 318 210 L 332 226 L 338 246 L 330 264 L 314 272 L 294 268 L 276 270 L 256 282 L 238 288 L 220 284 L 204 288 L 186 296 L 168 302 L 148 298 L 132 286 L 124 272 L 126 258 L 134 244 L 146 232 Z
M 100 178 L 114 168 L 132 164 L 152 168 L 168 178 L 176 194 L 170 208 L 154 212 L 138 206 L 124 210 L 108 204 L 96 194 Z
M 344 170 L 368 160 L 394 156 L 418 160 L 438 172 L 450 190 L 448 208 L 436 220 L 418 226 L 398 224 L 378 228 L 360 224 L 346 214 L 340 200 Z
M 456 178 L 478 166 L 502 162 L 528 168 L 548 178 L 562 192 L 558 210 L 544 222 L 522 226 L 500 228 L 480 232 L 464 224 L 452 212 L 450 196 Z
M 388 242 L 408 232 L 430 232 L 450 242 L 464 258 L 458 276 L 442 286 L 420 288 L 398 284 L 382 274 L 378 258 Z
M 404 302 L 428 296 L 450 298 L 468 312 L 470 332 L 456 348 L 432 352 L 408 346 L 396 332 L 398 314 Z
M 592 182 L 616 172 L 644 168 L 672 172 L 696 182 L 714 198 L 720 218 L 712 238 L 696 250 L 674 258 L 650 260 L 624 256 L 602 248 L 584 236 L 578 218 L 582 198 Z
M 722 240 L 748 232 L 776 232 L 800 242 L 816 258 L 814 278 L 798 290 L 774 296 L 748 292 L 726 284 L 714 270 L 712 252 Z
M 802 322 L 826 314 L 852 314 L 878 322 L 894 338 L 890 358 L 872 370 L 848 374 L 822 370 L 804 358 L 798 340 Z
M 708 320 L 726 314 L 742 318 L 754 330 L 748 344 L 732 348 L 716 342 L 706 332 Z
M 552 280 L 574 274 L 594 278 L 610 290 L 608 306 L 594 316 L 574 318 L 556 312 L 548 298 Z
`;

// City coordinates on the map (matched to viewBox 960x500)
window.CITIES = {
  princeton: { x: 248, y: 230, label: 'Princeton, NJ' },
  seattle:   { x: 152, y: 210, label: 'Seattle, WA' },
  remote:    { x: 200, y: 232, label: 'United States' },
  orlando:   { x: 252, y: 252, label: 'Orlando, FL' },
  austin:    { x: 208, y: 250, label: 'Austin, TX' },
  taiwan:    { x: 778, y: 264, label: 'Taipei, Taiwan' },
  madrid:    { x: 448, y: 214, label: 'Madrid, Spain' },
  tokyo:     { x: 820, y: 232, label: 'Tokyo, Japan' },
  zermatt:   { x: 474, y: 208, label: 'Zermatt, Switzerland' },
  aspen:     { x: 176, y: 228, label: 'Aspen, CO' },
};

window.TIMELINE_EVENTS = [
  {
    id: 'databricks26', year: 2026, month: 'Jun',
    title: 'Databricks · SWE (incoming)',
    city: 'seattle', category: 'work',
    body: 'Returning to Seattle for the summer on the Unity Catalog team. Data governance at lake-scale.',
    photos: [
      { caption: 'space needle, last summer', label: 'seattle' },
      { caption: 'pike place, 6am', label: 'market' },
    ],
    links: [{ label: 'databricks.com', href: '#' }],
  },
  {
    id: 'taiwan26', year: 2026, month: 'Mar',
    title: 'Taiwan — spring break',
    city: 'taiwan', category: 'travel',
    body: 'Ten days through Taipei, Jiufen, and Hualien. Night markets, mountains, the best dumplings of my life.',
    photos: [
      { caption: 'taipei 101, 2am', label: 'taipei' },
      { caption: 'jiufen old street', label: 'jiufen' },
      { caption: 'hualien coast', label: 'coast' },
    ],
  },
  {
    id: 'thesis26', year: 2026, month: 'Feb',
    title: 'Senior thesis kickoff',
    city: 'princeton', category: 'research',
    body: 'Started thesis with Prof. Karthik Narasimhan at Princeton NLP. Multi-agent systems; emergent coordination between LLM agents.',
    photos: [
      { caption: 'friend hall, 11pm', label: 'office' },
    ],
    links: [{ label: 'princeton nlp', href: '#' }],
  },
  {
    id: 'ski25', year: 2025, month: 'Dec',
    title: 'Ski trip — Aspen',
    city: 'aspen', category: 'travel',
    body: 'Annual family ski week in Aspen. Snow was deep; blue runs became black runs by Thursday.',
    photos: [
      { caption: 'top of ajax', label: 'ajax' },
      { caption: 'sunrise groomer', label: 'groomer' },
    ],
  },
  {
    id: 'pvl25', year: 2025, month: 'Oct',
    title: 'PVL Lab — CV research',
    city: 'princeton', category: 'research',
    body: 'Joined Jia Deng\'s PVL Lab. Working on SLAM and segmentation — spatial understanding of 3D scenes.',
    photos: [
      { caption: 'cs building at dusk', label: 'cs' },
    ],
  },
  {
    id: 'spain25', year: 2025, month: 'Sep',
    title: 'Spain — before classes',
    city: 'madrid', category: 'travel',
    body: 'Solo trip before junior year. Madrid → Granada → Barcelona. Re-learned how to be bored.',
    photos: [
      { caption: 'alhambra, morning', label: 'alhambra' },
      { caption: 'parque del retiro', label: 'retiro' },
      { caption: 'sagrada familia', label: 'sagrada' },
    ],
  },
  {
    id: 'amazon25', year: 2025, month: 'May',
    title: 'Amazon · SDE intern',
    city: 'seattle', category: 'work',
    body: 'Summer on the IAM team in Seattle. Identity & access at internet scale — auth flows, policy evaluation, scale testing.',
    photos: [
      { caption: 'day one badge', label: 'badge' },
      { caption: 'south lake union', label: 'slu' },
    ],
    links: [{ label: 'amazon.jobs', href: '#' }],
  },
  {
    id: 'zermatt25', year: 2025, month: 'Mar',
    title: 'Zermatt w/ roommates',
    city: 'zermatt', category: 'travel',
    body: 'Spring break skiing under the Matterhorn. 11 hours of travel for three of the best days.',
    photos: [
      { caption: 'matterhorn at 6:42am', label: 'matterhorn' },
      { caption: 'klein matterhorn lift', label: 'lift' },
    ],
  },
  {
    id: 'bluehalo24', year: 2024, month: 'May',
    title: 'BlueHalo · SWE intern',
    city: 'remote', category: 'work',
    body: 'First internship. MLOps team — ETL ingestion pipelines for sensor data feeding downstream ML. BlueHalo was acquired by AeroVironment later that year.',
    links: [{ label: 'aerovironment', href: '#' }],
  },
  {
    id: 'princeton23', year: 2023, month: 'Sep',
    title: 'Arrived at Princeton',
    city: 'princeton', category: 'research',
    body: 'Started Princeton as ECE + Neuroscience. First exposure to both silicon and synapses.',
    photos: [
      { caption: 'nassau hall, move-in day', label: 'nassau' },
    ],
  },
];

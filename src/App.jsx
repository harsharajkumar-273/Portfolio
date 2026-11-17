import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ArrowLeft, Code2, FileText, X, GitPullRequest, Mail, MapPin, GraduationCap, Pause, Play } from 'lucide-react';

const loadDemos = () => import('./demos/InteractiveDemos');
const CodeGraphDemo = lazy(() => loadDemos().then(m => ({ default: m.CodeGraphDemo })));
const ProofdeskDemo = lazy(() => loadDemos().then(m => ({ default: m.ProofdeskDemo })));
const PulseStreamDemo = lazy(() => loadDemos().then(m => ({ default: m.PulseStreamDemo })));

const asset = path => `${import.meta.env.BASE_URL}${path}`;
const resume = asset('Harsha-Raj-Kumar-Resume.pdf');
const github = 'https://github.com/harsharajkumar-273';
const upstream = 'https://github.com/pytorch/pytorch/pull/200585';
const coreFix = 'https://github.com/pytorch/pytorch/pull/191092';
const pulseBenchmark = `${github}/PulseStream#benchmark`;
const linkedIn = 'https://www.linkedin.com/in/harsharajkumar273/';
const email = 'harsha.raj.kumar@vanderbilt.edu';

const projects = [
  { id: 'pulse', tags: ['systems'], name: 'PulseStream', category: 'DISTRIBUTED SYSTEMS', repo: 'PulseStream',
    intro: 'From an HTTP request to stored telemetry.',
    description: 'A telemetry pipeline connecting an Express API, Kafka transport, and PostgreSQL persistence.',
    stack: ['TypeScript', 'Kafka / Redpanda', 'PostgreSQL', 'Redis'],
    contribution: 'Built the ingestion API and consumer, then added transaction isolation, replay-conflict handling, and API-level failure tests.',
    decision: 'Acknowledge ingestion after broker publication; keep database persistence in a separate consumer.',
    result: '430 events/s', unit: '854 ms p99 from send to durable row (local Docker run)',
    primary: { href: pulseBenchmark, label: 'Benchmark' },
    links: [],
    details: ['The API-level suite submits events through HTTP and checks acknowledged IDs, persisted payloads, and dead-letter contents across 11 scenarios, including malformed batches, concurrent retries, Redis outages, and consumer crashes.', 'PostgreSQL savepoints isolate a bad record; offsets advance only after the database transaction commits. CI also runs a pre-fix consumer and requires the batch-isolation regression to fail.', 'Canonical payload fingerprints reject conflicting reuse of a cached idempotency key. After Redis state loss or lock expiry, the consumer preserves the stored payload and dead-letters a conflicting replay.', 'In a 30-second, 50-connection run on a MacBook Air with Docker Desktop, all 12,945 acknowledged events reached PostgreSQL. The consumer drained in 0.1 s after sending stopped. The run measured 430 durable events/s and 854 ms p99 from send to durable row.', 'HTTP 202 acknowledges broker publication, not completed database persistence. Dead-letter delivery is at-least-once.'],
    command: 'npm run test:integration',
    screenshot: { src: 'screens/pulsestream-dashboard.webp', width: 1600, height: 788, alt: 'PulseStream live monitor showing 23 ingested events, average temperature and CPU load, a real-time metrics chart, an event injector with a 202 Accepted response, and a WebSocket log feed' } },
  { id: 'lsm', tags: ['systems'], name: 'LSM-Tree', category: 'STORAGE ENGINE · C++', repo: 'lsm_tree',
    intro: 'A collaborative C++ storage engine, built in the open.',
    description: 'A log-structured merge-tree key-value store with a MemTable, write-ahead log, and SSTables.',
    stack: ['C++', 'SkipList', 'WAL', 'SSTables'],
    contribution: 'Started the project and maintain it. I added sorted range scans that merge MemTable and SSTable cursors and resolve versions and tombstones. Contributors implemented the SkipList, WAL, and compaction internals.',
    decision: 'Require ordering and recovery regression tests before WAL changes merge.',
    result: 'Range scans', unit: 'Merge MemTable and SSTable cursors; resolve versions and tombstones',
    primary: { href: `${github}/lsm_tree/pull/137`, label: 'Range-scan PR' },
    links: [{ href: `${github}/lsm_tree/issues/14`, label: 'WAL design review' }],
    details: ['Range scans merge sorted cursors from the MemTable and every SSTable, then resolve versions and tombstones so a scan returns each live key once with its newest value.', 'As maintainer I reviewed the write-ahead log design, including explicit append offsets, and requested append-ordering and crash-recovery regression tests.', 'Contributors implemented the SkipList, WAL, and compaction internals; I coordinate the work and review the changes.'],
    nodes: ['MemTable', 'WAL', 'SSTable', 'Scan'] },
  { id: 'proof', tags: ['dev'], name: 'Proofdesk', category: 'COLLABORATIVE DEVELOPER TOOLS', repo: 'Proofdesk',
    intro: 'Write together. Preview in the browser.',
    description: 'A deployed textbook editor with collaborative authoring, browser previews, and queued builds. A professor uses it to publish and update Interactive Linear Algebra.',
    live: 'https://proofdesk.duckdns.org/',
    primary: { href: 'https://proofdesk.duckdns.org/', label: 'Live app' },
    links: [{ href: `${github}/Proofdesk/blob/main/benchmarks/docker_pipeline/README.md`, label: 'Preview measurements' }],
    stack: ['React / Monaco', 'Node / Express', 'Y.js', 'Docker / CI/CD'],
    contribution: 'Co-developed the editor and core integrations; maintain queued Docker builds and GitHub Actions CI/CD with open-source contributors.',
    decision: 'Separate the immediate XML-to-HTML preview from the fuller server build toolchain.',
    result: 'In the browser', unit: 'Live preview via Pyodide; full PDF builds run on the server',
    details: ['The browser path is a PreTeXt-to-HTML transformer written in Python and run on Pyodide, with KaTeX for math. Full PDF builds stay on the server.', 'GitHub Actions runs automated tests and frontend builds. Deployment workflows rebuild the Docker Compose stack and check application readiness. Contributors also expanded PreTeXt coverage and hardened authorization.', 'I added the in-browser preview in June 2026, after my Mathematics Department appointment, and continue to maintain the project. A professor uses Proofdesk to publish and maintain an online textbook.'],
    command: 'npx playwright test -c playwright.benchmark.config.ts',
    screenshot: { src: 'screens/proofdesk-editor.webp', width: 1600, height: 792, alt: 'Proofdesk editor with PreTeXt source in Monaco on the left and the in-browser preview on the right, rendering a section title, a displayed square-root formula, and an exercise block' } },
  { id: 'codegraph', tags: ['dev'], name: 'CodeGraph', category: 'DEVELOPER TOOLING', repo: 'CodeGraph',
    intro: 'Understand what a change can affect.',
    description: 'A published static-analysis CLI that maps dependencies and calls, then traces change impact across a codebase.',
    stack: ['TypeScript', 'Tree-sitter', 'Graph traversal', 'npm'],
    contribution: 'Built codegraph-engine: source extraction, dependency and call-graph resolution, and confidence-aware reverse traversal for change impact.',
    decision: 'Label uncertain edges rather than presenting every inferred dependency as fact.',
    result: '4 languages', unit: 'TypeScript, JavaScript, Python and Go',
    primary: { href: 'https://codegraph-eta.vercel.app/', label: 'Explorer' },
    links: [
      { href: 'https://www.npmjs.com/package/codegraph-engine', label: 'npm package' },
      { href: `${github}/CodeGraph/blob/main/docs/ORACLE-EVAL.md`, label: 'Evaluation method' }
    ],
    details: ['Published codegraph-engine on npm. The current repository and hosted explorer support TypeScript, JavaScript, Python, and Go. The portfolio sample runs traversal over a prepared graph.', 'Reverse traversal over call and inheritance edges identifies potentially affected symbols; importer analysis distinguishes direct and transitive test dependencies.', 'Resolved, probable, and ambiguous labels make inference uncertainty visible. The repository documents its evaluation samples and known failure modes; these are not independent production-accuracy guarantees.', 'Known limits include dynamic dispatch, name collisions, and ambiguous resolution. Consult the current repository methodology before relying on a dependency edge.'],
    command: 'npm test && npm run typecheck', nodes: ['Source', 'AST', 'Graph', 'Impact'] },
];

const others = [
  { name: 'Satya', tag: 'verification tool', tags: ['dev'], text: 'Checks UI claims against API or reload-persisted state.', links: [{ href: `${github}/Satya-`, label: 'Source' }] },
  { name: 'Engram', tag: 'agent prototype', tags: ['dev'], text: 'Explores bounded agent execution and persistent memory.', links: [{ href: `${github}/ENGRAM`, label: 'Source' }] },
  { name: 'ARIA', shot: 'aria', tag: 'Vanderbilt Global Good Hackathon 2025 · finalist', tags: ['hack'], text: 'Disaster-response routing prototype that adjusts routes around reported hazards.', links: [{ href: `${github}/ARIA`, label: 'Source' }] },
  { name: 'Checkout Release Recovery', shot: 'checkout-release-recovery', tag: 'GitLab AI Hackathon', tags: ['hack'], text: 'GitLab Duo proposes a fix for a checkout pricing bug; independent regression checks validate it before human review.', links: [{ href: 'https://checkout-release-recovery-16890129443.us-central1.run.app/#challenge', label: 'Demo' }, { href: 'https://gitlab.com/gitlab-ai-hackathon/transcend-october-2026/43176085/showcase/-/tree/submission-source-2026-10-26', label: 'GitLab' }] },
  { name: 'ProofPay', shot: 'proofpay', tag: 'PayPal AI hackathon', tags: ['hack'], text: 'An agent patches a broken site; independent Playwright checks and buyer-approved rules gate a sandbox payment.', links: [{ href: `${github}/Paypal-AI-hackathon-`, label: 'Source' }] },
  { name: 'Little Worlds', shot: 'little-worlds', tag: 'hackathon', tags: ['hack'], text: 'Twitch viewers request AI art with !draw; the streamer approves each piece before it appears in OBS.', links: [{ href: `${github}/little-worlds`, label: 'Source' }] },
];

const filters = [
  ['all', 'All'],
  ['systems', 'Systems'],
  ['dev', 'Developer tools'],
  ['hack', 'Hackathons'],
];

const toolkit = [
  ['Languages', ['C++', 'Python', 'TypeScript', 'JavaScript', 'Go', 'Java', 'SQL']],
  ['Services & data', ['Node / Express', 'FastAPI', 'Kafka / Redpanda', 'PostgreSQL', 'Redis']],
  ['Infrastructure', ['Docker', 'GitHub Actions', 'Prometheus', 'AWS Lambda']],
  ['Frontend & ML', ['React', 'PyTorch']],
];

const jobs = [
  { id: 'amplify', date: 'Aug 2026 – Present', role: 'Research Assistant, Software Engineering', org: 'Amplify GenAI Innovation Center', text: 'Implemented the Projects feature across React/TypeScript and Python/AWS Lambda: schema-validated project, file-manifest, and memory APIs backed by three DynamoDB tables, ownership checks, and server-side chat-context integration. Also developed Majik APIs and PostgreSQL/pgvector retrieval.', links: [{ href: 'https://github.com/gaiin-platform/amplify-genai-backend/pull/393', label: 'Backend PR' }, { href: 'https://github.com/gaiin-platform/amplify-genai-frontend/pull/335', label: 'Frontend PR' }] },
  { id: 'beam', date: 'Oct 2025 – Aug 2026', role: 'Research Assistant, Machine Learning', org: 'VU-BEAM Lab', text: 'Implemented contrastive pretraining and supervised fine-tuning in ReCL, with PyTorch data loading and augmentation for ultrasound research.', links: [] },
  { id: 'math', date: 'Sep 2025 – May 2026', role: 'Research Assistant, Software Engineering', org: 'Mathematics Department', text: 'Co-developed Proofdesk with React/Monaco, Node/Express, and Y.js collaboration. Continue to maintain browser previews, queued Docker builds, and GitHub Actions CI/CD after the appointment.', links: [{ href: 'https://proofdesk.duckdns.org/', label: 'Live app' }, { href: `${github}/Proofdesk`, label: 'Source' }] },
];

const posts = [
  ['discord-message-storage', 'Why Discord Coalesced Reads Before Moving to ScyllaDB'],
  ['twitter-snowflake', 'Why Twitter Built Snowflake IDs'],
  ['safe-retries', 'Safe Retries: What If the Server Already Did It?'],
  ['https-with-curl', 'What happens when curl connects to an HTTPS server?'],
];

const navItems = [
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['open-source', 'Open source'],
  ['writing', 'Writing'],
  ['about', 'Background'],
];
const ease = [0.2, 0.7, 0.2, 1];

const iconProps = { width: 16, height: 16, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false };
const GithubIcon = () => <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const LinkedinIcon = () => <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const MediumIcon = () => <svg {...iconProps} fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>;

function External({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={15} aria-hidden="true" /></a>;
}

function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return <Tag className={className} initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, delay, ease }}>{children}</Tag>;
}

function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) { setN(to); return undefined; }
    const controls = animate(0, to, { duration: 1.3, ease: 'easeOut', onUpdate: v => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{n}</span>;
}

function DemoFallback() {
  return <div className="try-demo demo-loading" aria-busy="true"><div className="try-header"><strong>Loading demo…</strong></div></div>;
}

const demos = { codegraph: CodeGraphDemo, proof: ProofdeskDemo, pulse: PulseStreamDemo };

function Demo({ project }) {
  const Component = demos[project.id];
  if (!Component) return null;
  return <Suspense fallback={<DemoFallback/>}><Component/></Suspense>;
}

function GraphThumb({ project }) {
  return <div className="graph-thumb" aria-hidden="true">
    {project.nodes.map((node, i) => <React.Fragment key={node}>
      <span className={`graph-node n${i}`}>{node}</span>
      {i < project.nodes.length - 1 && <i className="graph-edge"/>}
    </React.Fragment>)}
  </div>;
}

function CaseStudy({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    function keydown(event) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const items = ref.current.querySelectorAll('a[href],button,input,select,textarea');
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', keydown); previous?.focus(); };
  }, [onClose]);
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <motion.section className={`case-modal${demos[project.id] ? '' : ' no-demo'}`} ref={ref} role="dialog" aria-modal="true" aria-labelledby="case-title" tabIndex={-1} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.26, ease }}>
      <button className="close-button" onClick={onClose} aria-label="Close case study"><X size={20}/></button>
      {demos[project.id] && <div className="case-demo"><Demo project={project}/></div>}
      <div className="case-notes">
        <p className="eyebrow">{project.category}</p><h2 id="case-title">{project.name}</h2><p className="case-intro">{project.intro}</p>
        <h3>My contribution</h3><p>{project.contribution}</p><h3>Engineering decision</h3><p>{project.decision}</p>
        <h3>Evidence</h3><ul>{project.details.map(item => <li key={item}>{item}</li>)}</ul>
        {project.command && <div className="reproduce"><span>Repository command</span><code>{project.command}</code><small>Follow repository setup instructions first.</small></div>}
        <div className="case-actions"><External className="button primary" href={`${github}/${project.repo}`}>Repository</External>{project.live && <External className="button secondary" href={project.live}>Live app</External>}{project.links.map(link => <External key={link.href} className="button secondary" href={link.href}>{link.label}</External>)}</div>
      </div>
    </motion.section>
  </motion.div>;
}

function ProjectCard({ project, onOpen }) {
  const reduce = useReducedMotion();
  const shot = project.screenshot;
  const external = project.primary.href.startsWith('#') ? { href: `${github}/${project.repo}`, label: 'Source' } : project.primary;
  return <motion.article className="project-card slide" whileHover={reduce ? undefined : { y: -4 }}>
    <button className="card-thumb" onClick={() => onOpen(project)} aria-label={`Open ${project.name} demo and engineering notes`}>
      {shot ? <img src={asset(shot.src)} width={shot.width} height={shot.height} alt={shot.alt} loading="lazy" decoding="async"/> : <GraphThumb project={project}/>}
      <span className="thumb-cta">{demos[project.id] ? 'Try the demo' : 'Read the notes'} <ArrowRight size={14}/></span>
    </button>
    <div className="card-body">
      <p className="eyebrow">{project.category}</p>
      <h3>{project.name}</h3>
      <p className="card-intro">{project.intro}</p>
      <div className="stack">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="metric"><strong>{project.result}</strong><span>{project.unit}</span></div>
      <div className="card-actions">
        <button className="button primary sm" onClick={() => onOpen(project)}>{demos[project.id] ? 'Demo & notes' : 'Engineering notes'} <ArrowRight size={15}/></button>
        <External className="button ghost sm" href={external.href}>{external.label}</External>
        <External className="button ghost sm" href={`${github}/${project.repo}`}><Code2 size={14}/> Code</External>
      </div>
    </div>
  </motion.article>;
}

const categoryLabel = { systems: 'Systems', dev: 'Developer tools', hack: 'Hackathon' };

function MiniCard({ item }) {
  return <article className="mini-card slide">
    <div className="mini-thumb" aria-hidden={item.shot ? undefined : 'true'}>{item.shot ? <img src={asset(`screens/${item.shot}.webp`)} alt={`${item.name} screenshot`} loading="lazy" decoding="async"/> : <span>{categoryLabel[item.tags[0]]}</span>}</div>
    <div className="mini-body">
      <h4>{item.name}</h4>
      <span className="mini-tag">{item.tag}</span>
      <p>{item.text}</p>
      <div className="mini-links">{item.links.map(link => <External key={link.href} href={link.href}>{link.label}</External>)}</div>
    </div>
  </article>;
}

function Projects({ onOpen }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState('all');
  const [playing, setPlaying] = useState(true);
  const [edge, setEdge] = useState({ start: true, end: false });
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const hold = useRef(false);
  const visible = useInView(wrapRef, { amount: 0.3 });
  const matches = tags => filter === 'all' || tags.includes(filter);
  const flagships = projects.filter(p => matches(p.tags));
  const rest = others.filter(o => matches(o.tags));
  const count = id => id === 'all' ? projects.length + others.length : projects.filter(p => p.tags.includes(id)).length + others.filter(o => o.tags.includes(id)).length;
  
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);
  const step = () => { const el = trackRef.current; const first = el?.firstElementChild; return first ? first.getBoundingClientRect().width + 20 : 0; };
  const go = dir => trackRef.current?.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' });

  useEffect(() => { trackRef.current?.scrollTo({ left: 0 }); measure(); }, [filter, measure]);
  useEffect(() => {
    if (!playing || reduce || !visible) return undefined;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el || hold.current) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) el.scrollTo({ left: 0, behavior: 'smooth' });
      else el.scrollBy({ left: step(), behavior: 'smooth' });
    }, 4500);
    return () => clearInterval(id);
  }, [playing, reduce, visible, filter]);

  return <div ref={wrapRef} onMouseEnter={() => { hold.current = true; }} onMouseLeave={() => { hold.current = false; }} onFocus={() => { hold.current = true; }} onBlur={() => { hold.current = false; }}>
    <div className="carousel-bar">
      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map(([id, label]) => <button key={id} className={filter === id ? 'active' : ''} aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}<span>{count(id)}</span></button>)}
      </div>
      <div className="carousel-controls">
        {!reduce && <button onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause automatic scrolling' : 'Resume automatic scrolling'}>{playing ? <Pause size={16}/> : <Play size={16}/>}</button>}
        <button onClick={() => go(-1)} disabled={edge.start} aria-label="Previous projects"><ArrowLeft size={18}/></button>
        <button onClick={() => go(1)} disabled={edge.end} aria-label="Next projects"><ArrowRight size={18}/></button>
      </div>
    </div>
    <div className="track" ref={trackRef} onScroll={measure} role="region" aria-label="Projects, scrollable" tabIndex={0}>
      {flagships.map(project => <ProjectCard key={project.id} project={project} onOpen={onOpen}/>)}
      {rest.map(item => <MiniCard key={item.name} item={item}/>)}
    </div>
  </div>;
}

function SectionHead({ eyebrow, title, children }) {
  return <Reveal className="section-head"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{children && <p>{children}</p>}</Reveal>;
}

function Header({ active }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <header className={`site-header${stuck ? ' stuck' : ''}`}>
    <div className="wrap header-row">
      <a className="wordmark" href="#top">Harsha Raj Kumar</a>
      <nav aria-label="Main navigation">
        {navItems.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
      </nav>
      <a className="button primary sm header-cta" href="#contact">Contact</a>
    </div>
    <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true"/>
  </header>;
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState('');
  const reduce = useReducedMotion();
  const close = useCallback(() => setSelected(null), []);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    navItems.forEach(([id]) => { const el = document.getElementById(id); if (el) spy.observe(el); });
    return () => spy.disconnect();
  }, []);
  const fade = (delay = 0) => reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease } };
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header active={active}/>
    <main id="main">
      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <motion.div className="availability" {...fade(0)}><span/>Available for 2027 new-grad roles</motion.div>
          <motion.h1 {...fade(0.08)}>Software engineer focused on systems, performance, and correctness.</motion.h1>
          <motion.p className="hero-description" {...fade(0.16)}>I’m Harsha Raj Kumar. I write C++, Python, and TypeScript, and I care about measured performance: a Kafka pipeline with load-tested latency, a C++ LSM-tree storage engine, and two merged fixes in PyTorch. I also work at Vanderbilt’s Amplify GenAI Innovation Center.</motion.p>
          <motion.div className="hero-actions" {...fade(0.24)}>
            <a className="button primary" href="#work">See my work <ArrowRight size={16}/></a>
            <a className="button secondary" href={resume} target="_blank" rel="noreferrer"><FileText size={16}/>Résumé</a>
            <a className="text-link" href={`mailto:${email}`}><Mail size={15}/>{email}</a>
          </motion.div>
          <motion.ul className="facts" {...fade(0.3)}>
            <li><GraduationCap size={16}/>M.S. Computer Science, Vanderbilt · April 2027</li>
            <li><MapPin size={16}/>Nashville, TN · open to relocation</li>
          </motion.ul>
        </div>
        <motion.div className="hero-visual" {...(reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.2, ease } })}>
          <div className="frame-wrap">
          <a className="frame" href="#work" aria-label="See Proofdesk in the projects section">
            <div className="frame-bar"><i/><i/><i/><span>proofdesk — editor</span></div>
            <img src={asset('screens/proofdesk-editor.webp')} width="1600" height="792" alt="Proofdesk showing collaborative textbook source and its rendered preview" fetchPriority="high"/>
          </a>
          <motion.a className="float-badge" href={upstream} target="_blank" rel="noreferrer" animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <GitPullRequest size={18}/><span><strong>PyTorch contributor</strong>Two merged fixes</span>
          </motion.a>
          </div>
          <div className="site-links" role="group" aria-label="Profiles and résumé">
            <a href={github} target="_blank" rel="noreferrer"><GithubIcon/>GitHub</a>
            <a href={linkedIn} target="_blank" rel="noreferrer"><LinkedinIcon/>LinkedIn</a>
            <a href="https://medium.com/@simplyharsha" target="_blank" rel="noreferrer"><MediumIcon/>Medium</a>
            <a className="resume-link" href={resume} target="_blank" rel="noreferrer"><FileText size={16}/>Résumé</a>
          </div>
        </motion.div>
      </section>

      <section className="stats wrap" aria-label="Highlights">
        <Reveal className="stat"><strong><CountUp to={2}/></strong><span>merged PyTorch fixes (C++ and Python), with regression tests</span></Reveal>
        <Reveal className="stat" delay={0.06}><strong><CountUp to={430}/></strong><span>durable events/s in a local PulseStream run</span></Reveal>
        <Reveal className="stat" delay={0.12}><strong><CountUp to={854}/><small>ms</small></strong><span>p99 from send to durable row in that run</span></Reveal>
        <Reveal className="stat" delay={0.18}><strong><CountUp to={11}/></strong><span>failure scenarios tested through HTTP</span></Reveal>
      </section>

      <section className="section wrap" id="work">
        <SectionHead eyebrow="Selected work" title="Things I’ve built">Swipe or use the arrows. Open a project for engineering notes and, where available, a hands-on demo.</SectionHead>
        <Projects onOpen={setSelected}/>
      </section>

      <section className="section band" id="experience">
        <div className="wrap">
          <SectionHead eyebrow="Experience" title="Where I’ve worked">Research and engineering roles at Vanderbilt.</SectionHead>
          <ol className="timeline">
            {jobs.map((job, i) => <Reveal as="li" className="job" delay={i * 0.06} key={job.id}>
              <div className="job-date">{job.date}</div>
              <div className="job-main">
                <h3>{job.org}</h3><p className="job-role">{job.role}</p>
                <p className="job-text">{job.text}</p>
                {job.links.length > 0 && <div className="mini-links">{job.links.map(link => <External key={link.href} href={link.href}>{link.label}</External>)}</div>}
              </div>
            </Reveal>)}
          </ol>
        </div>
      </section>

      <section className="section wrap" id="open-source">
        <SectionHead eyebrow="Open source" title="Contributions upstream">Merged fixes in PyTorch, each with regression tests, plus a storage engine I maintain.</SectionHead>
        <div className="oss-grid">
          {[
            [upstream, 'PYTORCH · DISTRIBUTED C++', 'Empty tensors, correct collectives', 'Fixed NCCL2 all_gather misclassifying empty outputs as aliased buffers, with distributed regression tests. Landed upstream in October 2026.'],
            [coreFix, 'PYTORCH · CORE', 'Clear validation for zero-sized dimensions', 'Fixed torch.unravel_index error handling while preserving empty-input behavior; added regression tests.'],
            [`${github}/lsm_tree`, 'LSM-TREE · MAINTAINER', 'Reviewing a storage engine in the open', 'Review contributor work such as WAL append ordering and require recovery regression tests before merge.'],
          ].map(([href, tag, title, text], i) => <Reveal key={href} delay={i * 0.07}><External className="oss" href={href}><small>{tag}</small><strong>{title}</strong><p>{text}</p></External></Reveal>)}
        </div>
      </section>

      <section className="section band" id="writing">
        <div className="wrap split">
          <div>
            <SectionHead eyebrow="Writing" title="How systems get built">My take on how engineering teams build and scale their systems.</SectionHead>
            <Reveal><ul className="writing-list">{posts.map(([slug, title]) => <li key={slug}><a className="writing-post" href={asset(`writing/${slug}/index.html`)}><span>{title}</span><ArrowRight size={16} aria-hidden="true"/></a></li>)}</ul>
              <External className="text-link spaced" href="https://medium.com/@simplyharsha">More writing on Medium</External></Reveal>
          </div>
          <div>
            <SectionHead eyebrow="Publication" title="Research and credentials"/>
            <Reveal className="pub-stack">
              <External className="pub" href="https://ieeexplore.ieee.org/abstract/document/11399172"><small>IEEE CICT 2025 · CO-AUTHOR</small><strong>Industrial IoT anomaly detection</strong><p>Compared GCN, GAT, and autoencoder approaches.</p></External>
              <External className="pub" href={asset('AWS Certified AI Practitioner.pdf')}><small>CERTIFICATION</small><strong>AWS Certified AI Practitioner</strong></External>
              <div className="pub static"><small>CERTIFICATION</small><strong>Microsoft Azure AI Fundamentals</strong></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section wrap" id="about">
        <SectionHead eyebrow="Background" title="Education and toolkit"/>
        <div className="about-grid">
          <Reveal className="edu-card">
            <h3 className="card-label">Education</h3>
            <div className="edu-item">
              <div className="edu-top"><strong>Vanderbilt University</strong><span>Apr 2027</span></div>
              <p>M.S. Computer Science · GPA 3.6/4.0</p>
              <ul className="tags"><li>Operating Systems</li><li>Systems for AI</li><li>Cyber-Physical AI</li><li>Representation Learning</li><li>Cloud Computing</li></ul>
            </div>
            <div className="edu-item">
              <div className="edu-top"><strong>VIT Chennai</strong><span>May 2025</span></div>
              <p>B.Tech. Computer Science · GPA 3.5/4.0</p>
            </div>
          </Reveal>
          <Reveal className="tool-card" delay={0.08}>
            <h3 className="card-label">Toolkit</h3>
            <dl className="tool-list">
              {toolkit.map(([label, items]) => <div key={label}><dt>{label}</dt><dd>{items.map(item => <span key={item}>{item}</span>)}</dd></div>)}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="contact wrap" id="contact">
        <Reveal className="contact-card">
          <div><h2>Let’s talk.</h2><p>Seeking 2027 software engineering opportunities. Nashville, TN · open to relocation.</p></div>
          <div className="contact-actions">
            <a className="button light" href={`mailto:${email}`}><Mail size={16}/>{email}</a>
            <div className="contact-links"><External href={github}>GitHub</External><External href={linkedIn}>LinkedIn</External><External href="https://medium.com/@simplyharsha">Medium</External><a href={resume} target="_blank" rel="noreferrer">Résumé<ArrowUpRight size={15}/></a></div>
          </div>
        </Reveal>
      </section>
    </main>
    <footer className="foot wrap"><span>© {new Date().getFullYear()} Harsha Raj Kumar</span><a href="#top">Back to top ↑</a></footer>
    <AnimatePresence>{selected && <CaseStudy project={selected} onClose={close}/>}</AnimatePresence>
  </>;
}

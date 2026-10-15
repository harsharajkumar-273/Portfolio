import React, { useEffect, useRef, useState } from 'react';
import { CodeGraphDemo, ProofdeskDemo, PulseStreamDemo } from './demos/InteractiveDemos';
import { ArrowUpRight, ArrowRight, Code2, FileText, X, GitPullRequest } from 'lucide-react';

const github = 'https://github.com/harsharajkumar-273';
const upstream = 'https://github.com/pytorch/pytorch/commit/e96d01e48edf389ee8e7e6e9bacfef1888dce711';
const coreFix = 'https://github.com/pytorch/pytorch/commit/f594cadbd10e281c04c0e471b40c3b0569e47c43';
const projects = [
  { id: 'pulse', name: 'PulseStream', category: 'DISTRIBUTED SYSTEMS', repo: 'PulseStream', number: '01',
    intro: 'From an HTTP request to stored telemetry.',
    description: 'A telemetry pipeline connecting an Express API, Kafka transport, and PostgreSQL persistence.',
    stack: ['TypeScript', 'Kafka / Redpanda', 'PostgreSQL', 'Redis'],
    contribution: 'Built the ingestion API and consumer, then added transaction isolation, replay-conflict handling, and API-level failure tests.',
    decision: 'Acknowledge ingestion after broker publication; keep database persistence in a separate consumer.',
    evidence: 'Persisted to PostgreSQL · local Docker benchmark', result: '2,933 events/s', unit: '30-second send window · 11 API failure scenarios in CI',
    details: ['The API-level suite submits events through HTTP and checks acknowledged IDs, persisted payloads, and dead-letter contents across 11 scenarios, including malformed batches, concurrent retries, Redis outages, and consumer crashes.', 'PostgreSQL savepoints isolate a bad record; offsets advance only after the database transaction commits. CI also runs a pre-fix consumer and requires the batch-isolation regression to fail.', 'Canonical payload fingerprints reject conflicting reuse of a cached idempotency key. After Redis state loss or lock expiry, the consumer preserves the stored payload and dead-letters a conflicting replay.', 'The documented local Docker benchmark persisted 88,004 events over a 30-second send window, or 2,933 events/s. Under load, persistence lag reached 3.7 s p50 and 10.3 s p99; HTTP acknowledgments measure a separate stage.', 'HTTP 202 acknowledges broker publication, not completed database persistence. Dead-letter delivery is at-least-once.'],
    command: 'npm run test:integration',
    screenshot: { src: 'screens/pulsestream-dashboard.webp', width: 1600, height: 788, label: 'LIVE MONITOR', tag: '02 / DASHBOARD', alt: 'PulseStream live monitor showing 23 ingested events, average temperature and CPU load, a real-time metrics chart, an event injector with a 202 Accepted response, and a WebSocket log feed', caption: 'Running locally against Redpanda, Redis and PostgreSQL' } },
  { id: 'proof', name: 'Proofdesk', category: 'COLLABORATIVE DEVELOPER TOOLS', repo: 'Proofdesk', number: '02',
    intro: 'Write together. Preview in the browser.',
    description: 'A deployed textbook editor with collaborative authoring, browser previews, and queued builds, used by a professor to publish and update an online book.',
    live: 'https://proofdesk.duckdns.org/',
    stack: ['React / Monaco', 'Node / Express', 'Y.js', 'Docker / CI/CD'],
    contribution: 'Co-developed the editor and core integrations; maintain queued Docker builds and GitHub Actions CI/CD with open-source contributors.',
    decision: 'Separate the immediate XML-to-HTML preview from the fuller server build toolchain.',
    evidence: 'Browser preview · median of 5 runs', result: '358 ms', unit: 'no server round trip',
    details: ['The browser path is a PreTeXt-to-HTML transformer written in Python and run on Pyodide, with KaTeX for math. Full PDF builds stay on the server.', 'The main-branch benchmark reports 358 ms median across five local browser-preview runs (p95 3,382 ms). This is preview generation, not publishing or a full server build; the sample is small and variable.', 'GitHub Actions runs automated tests and frontend builds. Deployment workflows rebuild the Docker Compose stack and check application readiness. Contributors also expanded PreTeXt coverage and hardened authorization.', 'I added the in-browser preview in June 2026, after my Mathematics Department appointment, and continue to maintain the project. A professor uses Proofdesk to publish and maintain an online textbook; workflow time savings have not been measured.'],
    command: 'npx playwright test -c playwright.benchmark.config.ts',
    screenshot: { src: 'screens/proofdesk-editor.webp', width: 1600, height: 792, label: 'EDITOR', tag: '01 / SPLIT VIEW', alt: 'Proofdesk editor with PreTeXt source in Monaco on the left and the in-browser preview on the right, rendering a section title, a displayed square-root formula, and an exercise block', caption: 'PreTeXt source on the left, in-browser Pyodide preview on the right' } },
  { id: 'codegraph', name: 'CodeGraph', category: 'DEVELOPER TOOLING', repo: 'CodeGraph', number: '03',
    intro: 'Understand what a change can affect.',
    description: 'A published static-analysis CLI that maps dependencies and calls, then traces change impact across a codebase.',
    stack: ['TypeScript', 'Tree-sitter', 'Graph traversal', 'npm'],
    contribution: 'Built codegraph-engine: source extraction, dependency and call-graph resolution, and confidence-aware reverse traversal for change impact.',
    decision: 'Label uncertain edges rather than presenting every inferred dependency as fact.',
    evidence: 'Source analysis · JavaScript, TypeScript, Python', result: '3 languages', unit: 'dependency graphs and change-impact traversal',
    details: ['Published codegraph-engine on npm with support for JavaScript, TypeScript, and Python source analysis.', 'Reverse traversal over call and inheritance edges identifies potentially affected symbols; importer analysis distinguishes direct and transitive test dependencies.', 'Resolved, probable, and ambiguous labels make inference uncertainty visible. The repository documents its evaluation samples and known failure modes; these are not independent production-accuracy guarantees.', 'Known limits include dynamic dispatch, name collisions, and ambiguous resolution. Consult the current repository methodology before relying on a dependency edge.'],
    command: 'npm test && npm run typecheck', nodes: ['Source files', 'Tree-sitter AST', 'Confidence graph', 'Change impact'], labels: ['extract', 'resolve', 'traverse'],
    visualTag: '03 / CHANGE IMPACT', diagramLabel: 'Confidence-aware analysis', diagramNote: 'Calls, imports, and affected symbols', diagramFooter: 'packages/extractors · packages/analysis' },
];

const featuredProjects = ['proof', 'pulse', 'codegraph'].map(id => projects.find(project => project.id === id));

function External({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
}

function Visual({ project }) {
  if (project.id === 'codegraph') return <CodeGraphDemo/>;
  if (project.id === 'proof') return <ProofdeskDemo/>;
  if (project.id === 'pulse') return <PulseStreamDemo/>;
  const shot = project.screenshot;
  if (shot) {
    const src = `${import.meta.env.BASE_URL}${shot.src}`;
    return <figure className="architecture screenshot">
      <div className="diagram-header"><span className="diagram-dot" />{shot.label}<span>{shot.tag}</span></div>
      <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size ${project.name} screenshot`}><img src={src} width={shot.width} height={shot.height} alt={shot.alt} loading="lazy" decoding="async" /></a>
      <figcaption className="diagram-footer">{shot.caption}</figcaption>
    </figure>;
  }
  return <div className="architecture" aria-label={`${project.name} architecture`}>
    <div className="diagram-header"><span className="diagram-dot" />IMPLEMENTATION MAP<span>{project.visualTag || `${project.number} / MEMORY LOOP`}</span></div>
    <div className="flow-map">{project.nodes.map((node, i) => <React.Fragment key={node}><div className="map-node"><span className="node-index">0{i + 1}</span><strong>{node}</strong></div>{i < 3 && <div className="flow-link"><span>{project.labels[i]}</span><ArrowRight size={18}/></div>}</React.Fragment>)}</div>
    <div className="diagram-note"><span>{project.diagramLabel || 'Inspectable steps'}</span> {project.diagramNote || 'Retrieval, actions, and persisted state'}</div>
    <div className="diagram-footer">{project.diagramFooter || 'src/agent · src/recall · src/storage'}</div>
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
        const items = ref.current.querySelectorAll('a[href],button');
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', keydown); previous?.focus(); };
  }, [onClose]);
  return <div className="modal-backdrop" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="case-modal" ref={ref} role="dialog" aria-modal="true" aria-labelledby="case-title" tabIndex={-1}>
      <button className="close-button" onClick={onClose} aria-label="Close case study"><X size={22}/></button>
      <p className="eyebrow">{project.category}</p><h2 id="case-title">{project.name}</h2><p className="case-intro">{project.intro}</p>
      <h3>My contribution</h3><p>{project.contribution}</p><h3>Engineering decision</h3><p>{project.decision}</p>
      <h3>Evidence</h3><ul>{project.details.map(item => <li key={item}>{item}</li>)}</ul>
      <div className="reproduce"><span>Repository command</span><code>{project.command}</code><small>Follow repository setup instructions first.</small></div>
      <div className="case-actions"><External className="button primary" href={`${github}/${project.repo}`}>Explore the repository</External>{project.live && <External className="button secondary" href={project.live}>Open live app</External>}</div>
    </section>
  </div>;
}

export default function App() {
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];
    if (!reduce) {
      const revealEls = document.querySelectorAll('.project, .secondary-work > article, .experience-list > article, .open-grid, .background-section > div, footer > div');
      revealEls.forEach(el => el.classList.add('reveal'));
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); obs.unobserve(entry.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      revealEls.forEach(el => io.observe(el));
      cleanups.push(() => io.disconnect());
    }
    const navLinks = new Map();
    document.querySelectorAll('nav a[href^="#"]').forEach(a => navLinks.set(a.getAttribute('href').slice(1), a));
    const sections = ['work', 'experience', 'open-source'].map(id => document.getElementById(id)).filter(Boolean);
    if (sections.length) {
      const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
            const link = navLinks.get(entry.target.id);
            if (link) { link.classList.add('active'); link.setAttribute('aria-current', 'location'); }
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(s => spy.observe(s));
      cleanups.push(() => spy.disconnect());
    }
    return () => cleanups.forEach(fn => fn());
  }, []);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="wordmark" href="#about">HAR<span>SHA.</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#open-source">Open source</a><a className="nav-contact" href="mailto:harsha.raj.kumar@vanderbilt.edu">Let’s talk <ArrowUpRight size={15}/></a></nav></header>
    <main id="main">
      <section className="hero wrap" id="about">
        <div className="hero-main">
          <div className="availability"><span/>Available for 2027 new-grad roles</div>
          <h1>Harsha Raj Kumar<span>Software<br/>Engineering<span className="hero-period">.</span></span></h1>
          <p className="hero-description">I build collaborative applications, reliable data systems, and tools that help developers understand their code.</p>
          <p className="hero-meta">M.S. Computer Science, Vanderbilt <span>·</span> April 2027</p>
          <div className="hero-actions"><a className="button primary" href="#work">View selected work <ArrowRight size={17}/></a><a className="button secondary" href="/Harsha-Raj-Kumar-Resume.pdf" target="_blank" rel="noreferrer"><FileText size={16}/>Résumé</a><a className="contact-link" href="mailto:harsha.raj.kumar@vanderbilt.edu">Contact me <ArrowUpRight size={15}/></a></div>
        </div>
        <a className="hero-feature" href="#project-proof" aria-label="Explore Proofdesk, the collaborative textbook editor">
          <div className="feature-top"><span><i/> IN USE / PROOFDESK</span><ArrowUpRight size={18}/></div>
          <div className="hero-screen"><img src={`${import.meta.env.BASE_URL}screens/proofdesk-editor.webp`} width="1600" height="792" alt="Proofdesk showing collaborative textbook source and its rendered preview" fetchPriority="high"/></div>
          <div className="feature-bottom"><strong>From an idea to a published textbook.</strong><span>Collaborative editing · Browser previews · CI/CD</span></div>
        </a>
      </section>
      <div className="proof-strip wrap"><div className="proof-label"><GitPullRequest size={20}/><strong>PyTorch contributor</strong><span>Two merged fixes</span></div><div className="proof-links"><External href={upstream}><span className="proof-tag">C++ / DISTRIBUTED</span>NCCL2 all_gather</External><External href={coreFix}><span className="proof-tag">PYTHON / CORE</span>Input validation</External></div></div>
      <section className="work-section wrap" id="work"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Useful software.<br/>Considered engineering.</h2></div><p>An application people use, a pipeline built for failures,<br className="desktop-break"/> and a tool for navigating code.</p></div>
        {featuredProjects.map((project, index) => <article id={`project-${project.id}`} className={`project project-${project.id}`} key={project.id}>
          <div className="project-copy"><div className="project-kicker"><span>0{index + 1}</span>{project.category}</div><h3>{project.name}</h3><p className="project-intro">{project.intro}</p><p className="project-description">{project.description}</p><div className="stack">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="ownership"><strong>My contribution</strong><p>{project.contribution}</p></div><div className="project-links">{project.live && <External className="project-live" href={project.live}>Open live app</External>}<button onClick={() => setSelected(project)}>Engineering notes <ArrowRight size={16}/></button><External href={`${github}/${project.repo}`}>Source <Code2 size={15}/></External></div></div>
          <div className="project-visual"><Visual project={project}/><div className="evidence-strip"><div><span>{project.evidence}</span><strong>{project.result}</strong></div><p>{project.unit}</p></div></div>
        </article>)}
        <div className="secondary-work"><article><div><p className="eyebrow">PROJECT LEAD & MAINTAINER</p><h3>LSM-Tree <span>C++</span></h3></div><div><p>Architecture documentation, review, and integration for a collaborative storage engine. Contributors implemented the SkipList, WAL, and compaction internals.</p><External href={`${github}/lsm_tree/issues/14`}>A concrete WAL design review</External></div></article><article><div><p className="eyebrow">MORE DEVELOPER TOOLS</p><h3>Satya &amp; Engram</h3></div><div><p>Satya checks UI claims against API or reload-persisted state. Engram explores bounded agent execution and persistent memory. Both complement the selected projects above.</p><div className="more-links"><External href={`${github}/Satya-`}>Satya verification tool</External><External href={`${github}/ENGRAM`}>Engram prototype</External></div></div></article></div>
      </section>
      <section className="experience-section wrap" id="experience"><div className="section-heading"><div><p className="eyebrow">02 / EXPERIENCE</p><h2>Built at Vanderbilt.<br/>Maintained in the open.</h2></div><p>Software engineering, research software,<br className="desktop-break"/> and tools for technical authors.</p></div><div className="experience-list">
        <article><div className="role-date">AUG 2026 - PRESENT<span>Vanderbilt University</span></div><div><h3>Research Assistant <span>Software Engineering</span></h3><h4>Amplify GenAI Innovation Center</h4><p>Implemented the Projects feature across React/TypeScript and Python/AWS Lambda: schema-validated project, file-manifest, and memory APIs backed by three DynamoDB tables, ownership checks, and server-side chat-context integration. Also developed Majik APIs and PostgreSQL/pgvector retrieval. Projects was tested, with deployment pending at last confirmation.</p><div className="experience-evidence"><External href="https://github.com/gaiin-platform/amplify-genai-backend/pull/393">Projects backend PR</External><External href="https://github.com/gaiin-platform/amplify-genai-frontend/pull/335">Projects frontend PR</External></div></div></article>
        <article><div className="role-date">OCT 2025 - AUG 2026<span>Vanderbilt University</span></div><div><h3>Research Assistant <span>Machine Learning Research</span></h3><h4>VU-BEAM Lab</h4><p>Implemented contrastive pretraining and supervised fine-tuning in ReCL, with PyTorch data loading and augmentation for ultrasound research.</p></div></article>
        <article><div className="role-date">SEP 2025 - MAY 2026<span>Vanderbilt University</span></div><div><h3>Research Assistant <span>Software Engineering</span></h3><h4>Mathematics Department</h4><p>Co-developed Proofdesk with React/Monaco, Node/Express, and Y.js collaboration. Continue to maintain browser previews, queued Docker builds, and GitHub Actions CI/CD after the appointment.</p></div></article>
      </div></section>
      <section className="open-section" id="open-source"><div className="wrap open-grid"><div><p className="eyebrow">03 / OPEN SOURCE</p><h2>Building includes<br/>reviewing and maintaining.</h2><p>Implementation is one kind of contribution. Design review, integration, and giving other contributors clear credit are part of the work too.</p></div><div className="contribution-list"><External href={upstream}><span><small>PYTORCH / DISTRIBUTED C++</small><strong>Empty tensors, correct collectives</strong><p>Fixed NCCL2 all_gather misclassifying empty outputs as aliased buffers, with distributed regression tests. Landed upstream in October 2026.</p></span></External><External href={coreFix}><span><small>PYTORCH / CORE</small><strong>Clear validation for zero-sized dimensions</strong><p>Fixed torch.unravel_index error handling while preserving empty-input behavior; added regression tests.</p></span></External><External href={`${github}/lsm_tree/issues/14`}><span><small>LSM-TREE / MAINTAINERSHIP</small><strong>WAL append ordering</strong><p>Reviewed explicit append offsets and requested ordering and recovery regression tests.</p></span></External></div></div></section>
      <section className="background-section wrap"><div><p className="eyebrow">EDUCATION</p><h3>Vanderbilt University</h3><p>MS Computer Science · Expected Apr 2027<br/>GPA 3.6/4.0</p><h3>VIT Chennai</h3><p>B.Tech Computer Science · May 2025<br/>GPA 3.5/4.0</p></div><div><p className="eyebrow">TOOLKIT</p><p className="toolkit">TypeScript / JavaScript · Python · C++ · Java · Go · SQL</p><p>Node / Express · FastAPI · Kafka / Redpanda · PostgreSQL · Redis · Docker · GitHub Actions · Prometheus · React · PyTorch</p></div><div><p className="eyebrow">PUBLICATION & CREDENTIALS</p><External href="https://ieeexplore.ieee.org/abstract/document/11399172">IEEE CICT 2025 co-author</External><p>GCN, GAT, and autoencoder approaches to Industrial IoT anomaly detection.</p><p>AWS Certified AI Practitioner<br/>Microsoft Azure AI Fundamentals</p></div></section>
      <footer className="wrap"><div><p className="eyebrow">LET’S CONNECT</p><h2>Let’s build something<br/>worth using.</h2><p className="footer-intro">Seeking 2027 software engineering opportunities.</p><a className="contact-email" href="mailto:harsha.raj.kumar@vanderbilt.edu">harsha.raj.kumar@vanderbilt.edu <ArrowUpRight size={21}/></a></div><div className="footer-links"><External href={github}>GitHub</External><External href="https://linkedin.com/in/harsharajkumar273">LinkedIn</External><span>Nashville, TN · Open to relocation</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Harsha Raj Kumar</span><a href="#about">Back to top ↑</a></div></footer>
    </main>{selected && <CaseStudy project={selected} onClose={() => setSelected(null)}/>}
  </>;
}

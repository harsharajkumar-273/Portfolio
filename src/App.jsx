import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Code2, FileText, X, Check, Layers, GitPullRequest } from 'lucide-react';

const github = 'https://github.com/harsharajkumar-273';
const upstream = 'https://github.com/pytorch/pytorch/commit/f594cadbd10e281c04c0e471b40c3b0569e47c43';
const projects = [
  { id: 'pulse', name: 'PulseStream', category: 'EVENT-DRIVEN BACKEND', repo: 'PulseStream', number: '01',
    intro: 'From an HTTP request to stored telemetry.',
    description: 'A telemetry pipeline connecting an Express API, Kafka transport, and PostgreSQL persistence.',
    stack: ['TypeScript', 'Kafka / Redpanda', 'PostgreSQL', 'Redis'],
    contribution: 'Built the ingestion API and consumer, with request idempotency and database conflict handling.',
    decision: 'Acknowledge ingestion after broker publication; keep database persistence in a separate consumer.',
    evidence: 'Recorded local ingestion test', result: '~3,991', unit: 'HTTP responses / sec',
    details: ['The historical local Docker run used 50 connections over 30 seconds, with approximately 120K requests and no reported non-2xx/network errors.', 'The measurement covers ingestion acknowledgments, not completed database persistence. It has not been rerun for the latest corrections.', 'The prepared consumer corrections commit offsets after database and DLQ effects. Six focused failure-path tests pass; a live restart and ID-reconciliation test is still outstanding.', 'KEDA configuration exists. A working autoscaling deployment has not been demonstrated.'],
    command: 'node benchmarks/load_test.js', nodes: ['Express API', 'Redpanda', 'Consumer', 'PostgreSQL'], labels: ['publish', 'consume', 'persist'] },
  { id: 'proof', name: 'Proofdesk', category: 'COLLABORATIVE DEVELOPER TOOLS', repo: 'Proofdesk', number: '02',
    intro: 'Write together. Preview in the browser.',
    description: 'A technical-document editor with collaborative editing, browser previews, and queued server builds.',
    stack: ['React / Monaco', 'Node / Express', 'Y.js', 'Pyodide'],
    contribution: 'Introduced the editor and core integrations; maintain the application with open-source contributors.',
    decision: 'Separate the immediate XML-to-HTML preview from the fuller server build toolchain.',
    evidence: 'Two distinct execution paths', result: 'Browser + server', unit: 'preview and build workflows',
    details: ['The browser path is a custom PreTeXt/XML-to-HTML transformation through Pyodide, not a full in-browser LaTeX/PDF compiler.', 'Recorded local medians were 358 ms for browser XML preview and 2,914 ms for primed server HTML preview, with five samples per path. The paths use different inputs and cache treatment, so no comparative compiler speedup is claimed.', 'Community work includes parser expansion, security corrections, and Redis-outage queue fallback. Current functionality is not all my sole implementation.', 'The browser-preview work continued after my Mathematics Department appointment ended in May 2026.'],
    command: 'npx playwright test -c playwright.benchmark.config.ts', nodes: ['Monaco editor', 'Y.js sync', 'Pyodide preview', 'Queued build'], labels: ['collaborate', 'preview', 'server path'] },
  { id: 'engram', name: 'Engram', category: 'AGENT INFRASTRUCTURE', repo: 'ENGRAM', number: '03',
    intro: 'Memory that persists beyond one run.',
    description: 'A TypeScript ReAct prototype with SQLite memory, retrieval scoring, and structured execution traces.',
    stack: ['TypeScript', 'SQLite', 'ReAct', 'Memory retrieval'],
    contribution: 'Built the bounded agent loop and memory layer, including decay, entity associations, and retrieval scoring.',
    decision: 'Persist memory separately from the immediate context and make tool steps inspectable.',
    evidence: 'Local verification after corrections', result: '73 tests', unit: 'passing, plus TypeScript checking',
    details: ['The comparison uses seven hand-written memories, three queries, synthetic vectors, and supplied contradiction decisions. It demonstrates mechanisms, not general superiority to RAG.', 'The sliding-window baseline also achieves full recall in this fixture. Context size uses an approximate character-based token estimate.', 'Prepared corrections restrict ordinary file access to a working directory, make shell execution opt-in, and bind the server to loopback. These guards are not an OS sandbox.', 'A caller deadline does not guarantee cancellation of arbitrary custom-tool side effects.'],
    command: 'npm test && npm run benchmark', nodes: ['Task', 'Retrieve memory', 'Tool-use loop', 'SQLite + traces'], labels: ['recall', 'act', 'persist'] },
];

function External({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
}

function Architecture({ project }) {
  if (project.id === 'proof') return <div className="architecture" aria-label="Simplified Proofdesk architecture">
    <div className="diagram-header"><span className="diagram-dot" />IMPLEMENTATION MAP<span>02 / EDITOR</span></div>
    <div className="editor-map"><div className="map-node editor-node"><Layers size={24}/><strong>Monaco editor</strong><span>React · TypeScript</span></div><div className="branch-line"/><div className="map-branches"><div className="map-node"><strong>Y.js</strong><span>Shared editing state</span></div><div className="map-node"><strong>Pyodide</strong><span>Browser XML preview</span></div><div className="map-node"><strong>Node + BullMQ</strong><span>Server build path</span></div></div></div>
    <div className="diagram-footer">Simplified architecture · not a product screenshot</div>
  </div>;
  return <div className="architecture" aria-label={`Simplified ${project.name} architecture`}>
    <div className="diagram-header"><span className="diagram-dot" />IMPLEMENTATION MAP<span>{project.number} / {project.id === 'pulse' ? 'EVENT FLOW' : 'MEMORY LOOP'}</span></div>
    <div className="flow-map">{project.nodes.map((node, i) => <React.Fragment key={node}><div className="map-node"><span className="node-index">0{i + 1}</span><strong>{node}</strong></div>{i < 3 && <div className="flow-link"><span>{project.labels[i]}</span><ArrowRight size={18}/></div>}</React.Fragment>)}</div>
    <div className="diagram-note">{project.id === 'pulse' ? <><span>Redis</span> Request idempotency at ingestion</> : <><span>Inspectable steps</span> Retrieval, actions, and persisted state</>}</div>
    <div className="diagram-footer">Simplified architecture · not a live system</div>
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
      <h3>Evidence and limits</h3><ul>{project.details.map(item => <li key={item}>{item}</li>)}</ul>
      <div className="reproduce"><span>Repository command</span><code>{project.command}</code><small>Follow repository setup instructions first.</small></div>
      <External className="button primary" href={`${github}/${project.repo}`}>Explore the repository</External>
    </section>
  </div>;
}

export default function App() {
  const [selected, setSelected] = useState(null);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="wordmark" href="#about">HAR<span>SHA.</span></a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#open-source">Open source</a><a className="nav-contact" href="mailto:harsha.raj.kumar@vanderbilt.edu">Let’s talk <ArrowUpRight size={15}/></a></nav></header>
    <main id="main">
      <section className="hero wrap" id="about">
        <div className="hero-main"><div className="availability"><span/>Seeking 2027 new-grad roles</div><h1>Harsha Raj Kumar<span>Software Developer.</span></h1><p className="hero-description">I build event-driven services and developer tools, and maintain a collaborative C++ storage-engine project. MS Computer Science at Vanderbilt, graduating April 2027.</p><div className="hero-actions"><a className="button primary" href="#work">Explore my work <ArrowRight size={17}/></a><a className="button secondary" href="/Harsha%20Raj%20Kumar%20CV.pdf" target="_blank" rel="noreferrer"><FileText size={16}/>Resume</a><External className="icon-link" href={github}><Code2 size={19}/>GitHub</External></div></div>
        <aside className="hero-aside"><div className="aside-label">A CONTRIBUTION IN THE WILD</div><div className="upstream-symbol"><GitPullRequest size={35}/><span>PyTorch</span></div><h2>A small fix. <br/>In upstream core.</h2><p>Input validation and regression tests for a zero-dimension edge case in <code>torch.unravel_index</code>.</p><External href={upstream}>Read the accepted change</External><div className="aside-foot"><Check size={14}/>Accepted after maintainer review</div></aside>
      </section>
      <section className="work-section wrap" id="work"><div className="section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2>Built to be understood.</h2></div><p>Three projects. The systems behind them,<br className="desktop-break"/> and the decisions I can explain.</p></div>
        {projects.map(project => <article className={`project project-${project.id}`} key={project.id}><div className="project-copy"><div className="project-kicker"><span>{project.number}</span>{project.category}</div><h3>{project.name}</h3><p className="project-intro">{project.intro}</p><p className="project-description">{project.description}</p><div className="stack">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="ownership"><strong>My contribution</strong><p>{project.contribution}</p></div><div className="project-links"><button onClick={() => setSelected(project)}>Read the case study <ArrowRight size={16}/></button><External href={`${github}/${project.repo}`}>Source <Code2 size={15}/></External></div></div><div className="project-visual"><Architecture project={project}/><div className="evidence-strip"><div><span>{project.evidence}</span><strong>{project.result}</strong></div><p>{project.unit}</p></div></div></article>)}
        <div className="secondary-work"><article><p className="eyebrow">PROJECT LEAD & MAINTAINER</p><h3>LSM-Tree <span>C++</span></h3><p>Architecture documentation, review, and integration for a collaborative storage engine. Contributors implemented the SkipList, WAL, and compaction internals.</p><External href={`${github}/lsm_tree/issues/14`}>A concrete WAL design review</External></article><article><p className="eyebrow">EXPERIMENT / COMPUTER VISION</p><h3>Pixel Guard <span>Python · OpenCV</span></h3><p>A local inspection prototype that uses image measurements to choose its next action and saves a trace. Synthetic scenes and deterministic policy; real-world accuracy is not established.</p><External href={`${github}/pixel-gaurd`}>Explore the prototype</External></article></div>
      </section>
      <section className="experience-section wrap" id="experience"><div className="section-heading"><div><p className="eyebrow">EXPERIENCE</p><h2>Where I’ve contributed.</h2></div><p>Backend work, research software,<br className="desktop-break"/> and tools for technical authors.</p></div><div className="experience-list">
        <article><div className="role-date">AUG 2026 - PRESENT<span>Vanderbilt University</span></div><div><h3>Software Engineer <span>Backend & Platform Systems</span></h3><h4>Amplify GenAI Innovation Center</h4><p>Developed FastAPI/Redis REST and streaming APIs for Majik, added PostgreSQL/pgvector retrieval, and investigated save, delete, and sharing defects in Amplify’s interface.</p></div></article>
        <article><div className="role-date">OCT 2025 - AUG 2026<span>Vanderbilt University</span></div><div><h3>Systems & Software Engineer <span>Research Assistant</span></h3><h4>VU-BEAM Lab</h4><p>Implemented contrastive pretraining and supervised fine-tuning in ReCL, with PyTorch data loading and augmentation for ultrasound research.</p></div></article>
        <article><div className="role-date">SEP 2025 - MAY 2026<span>Vanderbilt University</span></div><div><h3>Software Engineer</h3><h4>Mathematics Department</h4><p>Developed the Proofdesk editor with React/Monaco and Node/Express. Continued the open-source project after the appointment, including later browser-preview integrations.</p></div></article>
      </div></section>
      <section className="open-section" id="open-source"><div className="wrap open-grid"><div><p className="eyebrow">OPEN SOURCE</p><h2>Building includes<br/>reviewing and maintaining.</h2><p>Implementation is one kind of contribution. Design review, integration, and giving other contributors clear credit are part of the work too.</p></div><div className="contribution-list"><External href={upstream}><span><small>PYTORCH / ACCEPTED FIX</small><strong>Input validation & regression tests</strong><p>Zero-size shape handling in torch.unravel_index. The contribution acknowledges AI assistance and maintainer co-authorship.</p></span></External><External href={`${github}/lsm_tree/issues/14`}><span><small>LSM-TREE / MAINTAINERSHIP</small><strong>WAL append ordering</strong><p>Reviewed explicit append offsets and requested ordering and recovery regression tests.</p></span></External></div></div></section>
      <section className="background-section wrap"><div><p className="eyebrow">EDUCATION</p><h3>Vanderbilt University</h3><p>MS Computer Science · Expected Apr 2027<br/>GPA 3.6/4.0</p><h3>VIT Chennai</h3><p>B.Tech Computer Science · May 2025<br/>GPA 3.5/4.0</p></div><div><p className="eyebrow">TOOLKIT</p><p className="toolkit">TypeScript / JavaScript · Python · C++ · Java · Go · SQL</p><p>Node / Express · FastAPI · Kafka / Redpanda · PostgreSQL · Redis · Docker · GitHub Actions · Prometheus · React · PyTorch</p></div><div><p className="eyebrow">PUBLICATION & CREDENTIALS</p><External href="https://ieeexplore.ieee.org/abstract/document/11399172">IEEE CICT 2025 co-author</External><p>GCN, GAT, and autoencoder approaches to Industrial IoT anomaly detection.</p><p>AWS Certified AI Practitioner<br/>Microsoft Azure AI Fundamentals</p></div></section>
      <footer className="wrap"><div><p className="eyebrow">LET’S CONNECT</p><h2>Hiring a software developer<br/>graduating in 2027?</h2><a className="contact-email" href="mailto:harsha.raj.kumar@vanderbilt.edu">harsha.raj.kumar@vanderbilt.edu <ArrowUpRight size={21}/></a></div><div className="footer-links"><External href={github}>GitHub</External><External href="https://linkedin.com/in/harsharajkumar273">LinkedIn</External><span>Nashville, TN · Open to relocation</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Harsha Raj Kumar</span><a href="#about">Back to top ↑</a></div></footer>
    </main>{selected && <CaseStudy project={selected} onClose={() => setSelected(null)}/>}
  </>;
}

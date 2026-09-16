import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import LSMTreeSim from './components/LSMTreeSim';
import PulseStreamSim from './components/PulseStreamSim';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Publications from './components/Publications';
import TerminalDrawer from './components/TerminalDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [modalTab, setModalTab] = useState('sandbox');

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Open a project's modal, defaulting to the interactive sandbox when the
  // project has one and otherwise straight to the architecture details.
  const openProject = (proj) => {
    setModalTab(proj.simulator ? 'sandbox' : 'benchmark');
    setActiveModalProject(proj.id);
  };

  // HCI Best Practice: Global keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Escape key closes the active modal
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
      // 2. ⌘K or Ctrl+K triggers functional shortcut shown in Hero
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.location.href = 'mailto:harsha.raj.kumar@vanderbilt.edu';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const projects = [
  {
    "id": "proofdesk",
    "title": "Proofdesk Collaborative Editor",
    "label": "Developer tools",
    "desc": "React/TypeScript and Node/Express editor with Y.js collaboration, browser-side PreTeXt/XML previews using Pyodide, and queued server builds.",
    "bullets": [
      "Introduced core editor and preview integrations, then maintained the application with open-source contributors.",
      "Browser preview uses a custom XML-to-HTML transformation. Server builds handle the fuller toolchain.",
      "Community contributions include parser expansion, security corrections, and Redis-outage queue fallback."
    ],
    "tags": [
      "React",
      "Node / Express",
      "Pyodide",
      "Y.js",
      "BullMQ"
    ],
    "links": [
      {
        "label": "Code",
        "href": "https://github.com/harsharajkumar-273/Proofdesk",
        "primary": true
      }
    ],
    "featured": true,
    "simulator": null,
    "categories": [
      "web"
    ],
    "benchmarkDetails": {
      "tool": "Evidence and scope",
      "command": "npx playwright test -c playwright.benchmark.config.ts",
      "methodology": "Recorded local runs: five samples per preview path and 30 localhost collaboration rounds. The preview paths use different files and cache treatment, so no comparative speedup is claimed.",
      "bullets": [
        "Browser XML preview: recorded median 358 ms, five local samples.",
        "Primed server HTML preview: recorded median 2,914 ms, five local samples. Different workflow and output scope.",
        "Y.js synchronization: recorded average 0.43 ms over localhost. This is not Internet latency."
      ]
    }
  },
  {
    "id": "pulsestream",
    "title": "PulseStream Telemetry Pipeline",
    "label": "Backend and event processing",
    "desc": "Express ingestion API, Redpanda/Kafka transport, Redis request idempotency, and PostgreSQL persistence.",
    "bullets": [
      "Publish device-keyed events to Redpanda before returning HTTP 202; persistence runs in a separate consumer.",
      "Use Redis request keys and PostgreSQL conflict handling to manage duplicate submissions.",
      "Includes consumer metrics, malformed-message DLQ routing, and a KEDA configuration. Production capacity is not established."
    ],
    "tags": [
      "TypeScript",
      "Express",
      "Kafka / Redpanda",
      "Redis",
      "PostgreSQL"
    ],
    "links": [
      {
        "label": "Code",
        "href": "https://github.com/harsharajkumar-273/PulseStream",
        "primary": true
      }
    ],
    "featured": true,
    "simulator": <PulseStreamSim />,
    "categories": [
      "systems",
      "web"
    ],
    "benchmarkDetails": {
      "tool": "Evidence and scope",
      "command": "node benchmarks/load_test.js",
      "methodology": "Historical local Docker run: 50 connections, 30 seconds, about 120K requests. Measures HTTP responses after broker publication, not completed database persistence.",
      "bullets": [
        "Recorded average: about 3,991 HTTP responses/sec; no reported non-2xx/network errors in that run.",
        "The consumer executes individual inserts inside a transaction. No 1,000-row bulk-upsert claim.",
        "The KEDA Kafka trigger targets the consumer topic. An autoscaling experiment on Kubernetes has not been demonstrated here."
      ]
    }
  },
  {
    "id": "engram",
    "title": "Engram Memory and Agent Prototype",
    "label": "Agent tooling",
    "desc": "A TypeScript ReAct loop with SQLite memory, retrieval scoring, decay, and structured traces.",
    "bullets": [
      "Implemented the memory store and agent loop, with a bounded number of steps and error handling.",
      "All 73 tests and TypeScript checking passed after the September 15 corrections.",
      "The comparison with simple RAG and sliding-window baselines uses a small synthetic fixture."
    ],
    "tags": [
      "TypeScript",
      "SQLite",
      "ReAct",
      "Memory retrieval"
    ],
    "links": [
      {
        "label": "Code",
        "href": "https://github.com/harsharajkumar-273/ENGRAM",
        "primary": true
      }
    ],
    "featured": true,
    "simulator": null,
    "categories": [
      "web"
    ],
    "benchmarkDetails": {
      "tool": "Evidence and scope",
      "command": "npm test && npm run benchmark",
      "methodology": "Seven hand-written memories, three queries, synthetic vectors, and supplied contradiction decisions. Demonstrates mechanisms rather than general retrieval superiority.",
      "bullets": [
        "The sliding-window baseline also reaches full recall in this fixture.",
        "Context size uses an approximate character-based token estimate.",
        "Tool execution is local; filesystem restrictions do not constitute an OS sandbox."
      ]
    }
  },
  {
    "id": "lsmtree",
    "title": "LSM-Tree Storage Engine",
    "label": "Project lead and maintainer",
    "desc": "A collaborative C++ storage-engine project. My role is architecture documentation, review, and integration; contributors wrote the storage internals.",
    "bullets": [
      "Selected explicit WAL append offsets in a design review and requested ordering and recovery regression tests.",
      "Integrated contributor changes and maintained architecture and benchmark documentation.",
      "SkipList, WAL, and compaction implementation credit belongs to the contributors."
    ],
    "tags": [
      "C++",
      "Code review",
      "WAL",
      "Storage systems"
    ],
    "links": [
      {
        "label": "Code",
        "href": "https://github.com/harsharajkumar-273/lsm_tree",
        "primary": true
      }
    ],
    "featured": false,
    "simulator": <LSMTreeSim />,
    "categories": [
      "systems",
      "web"
    ],
    "benchmarkDetails": {
      "tool": "Evidence and scope",
      "command": "cmake --build build && ./build/bench_write",
      "methodology": "See issue #14 and PR #125 for the review and contributor implementation. The write benchmark compares different durability modes.",
      "bullets": [
        "Historical single-machine Docker result: 254,095 sequential writes/sec, without per-record fsync in the io_uring arm.",
        "The synchronous baseline uses fdatasync per record, so the ratio is not an equivalent-durability speedup.",
        "The interactive diagram is illustrative and does not execute the C++ engine."
      ]
    }
  },
  {
    "id": "pixelguard",
    "title": "Pixel Guard",
    "label": "New computer-vision prototype",
    "desc": "Python/OpenCV inspection prototype with a deterministic decision loop, FastAPI endpoints, and JSON session traces.",
    "bullets": [
      "Uses blur, contour coverage, and geometric defect heuristics to choose a follow-up action.",
      "Sharpening simulates recapture; ticket and human-review actions are recorded outcomes, not external integrations.",
      "Synthetic scenes support local testing. No real-defect accuracy, deployed AWS system, or COOL speedup is claimed."
    ],
    "tags": [
      "Python",
      "OpenCV",
      "FastAPI",
      "JSON traces"
    ],
    "links": [
      {
        "label": "Code",
        "href": "https://github.com/harsharajkumar-273/pixel-gaurd",
        "primary": true
      }
    ],
    "featured": false,
    "simulator": null,
    "categories": [
      "web"
    ],
    "benchmarkDetails": {
      "tool": "Evidence and scope",
      "command": "python scripts/benchmark.py --image data/samples/pass.jpg --n 50",
      "methodology": "New September 2026 prototype. Benchmark timing covers one local image-analysis call, not HTTP throughput, camera operation, or production inspection accuracy.",
      "bullets": [
        "Uses blur, contour coverage, and geometric defect heuristics to choose a follow-up action.",
        "Sharpening simulates recapture; ticket and human-review actions are recorded outcomes, not external integrations.",
        "Synthetic scenes support local testing. No real-defect accuracy, deployed AWS system, or COOL speedup is claimed."
      ]
    }
  }
];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  const filteredOthers = otherProjects.filter(
    (p) => activeTab === 'all' || p.categories.includes(activeTab)
  );

  const selectedProjForModal = projects.find(p => p.id === activeModalProject);

  // Single project card, reused across the Featured and More Projects tiers.
  const renderCard = (p) => (
    <div
      key={p.id}
      className="glass-card"
      style={{
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1.2rem',
        borderTop: p.featured ? '3px solid var(--primary)' : '1px solid var(--border)'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--primary)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {p.label}
          </span>
          <button
            onClick={() => openProject(p)}
            className="btn"
            style={{
              padding: '0.25rem 0.75rem',
              fontSize: '0.65rem',
              borderColor: 'rgba(79, 70, 229, 0.25)',
              color: 'var(--primary)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {p.simulator ? 'Simulate ⚡' : 'Details →'}
          </button>
        </div>

        <h3 className="font-space" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
          {p.title}
        </h3>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
          {p.desc}
        </p>
      </div>

      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {p.tags.map((tag) => (
            <span key={tag} className="tag tag-blue" style={{ fontSize: '0.58rem', padding: '0.22rem 0.55rem' }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {p.links.map((link, lIdx) => (
            <a
              key={lIdx}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={link.primary ? 'btn btn-primary' : 'btn'}
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                fontSize: '0.7rem',
                padding: '0.4rem 0.9rem',
                flexGrow: 1
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main style={{ flexGrow: 1, paddingBottom: '6rem' }}>
        <Hero />
        
        <Experience />
        
        <Education />
        
        {/* Projects Section */}
        <section id="projects" className="container" style={{ marginTop: '4rem' }}>
          <div className="kicker" style={{ justifyContent: 'center' }}>Featured Work</div>
          <h2 className="font-space" style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '1rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, var(--text-main) 0%, var(--primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.04em'
          }}>
            Projects I'd Point To First
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            marginBottom: '2.5rem',
            maxWidth: '640px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}>
            Selected projects with source, contribution history, and explicit measurement limits. Open a card for evidence and scope.
          </p>

          {/* Featured tier */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
            marginBottom: '4rem'
          }}>
            {featuredProjects.map((p) => renderCard(p))}
          </div>

          {/* More projects */}
          <div className="kicker" style={{ justifyContent: 'center' }}>More Projects</div>
          <h2 className="font-space" style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            marginBottom: '0.5rem',
            textAlign: 'center',
            color: 'var(--text-main)',
            letterSpacing: '-0.03em'
          }}>
            The Rest of the Lab
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            marginBottom: '2rem',
            maxWidth: '560px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.6
          }}>
            More systems and platform experiments. Filter by domain, then launch an interactive simulator or open the details.
          </p>

          {/* Tab Navigation - IDE Tab bar style with WAI-ARIA tablist accessibility */}
          <div
            role="tablist"
            aria-label="Project Categories"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2px',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
              borderBottom: '1px solid var(--border)',
              paddingBottom: 0
            }}
          >
            {[
              { id: 'all', label: 'projects.json', iconColor: 'var(--accent-purple)' },
              { id: 'systems', label: 'systems.cpp', iconColor: 'var(--primary)' },
              { id: 'web', label: 'platforms.ts', iconColor: 'var(--secondary)' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="projects-grid"
                  id={`tab-${tab.id}`}
                  className="font-mono"
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '6px 6px 0 0',
                    border: '1px solid var(--border)',
                    borderBottom: isActive ? '2px solid var(--primary)' : '1px solid transparent',
                    background: isActive ? 'var(--bg-card)' : 'transparent',
                    color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.15s ease',
                    marginBottom: '-1px',
                    zIndex: isActive ? 2 : 1
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: tab.iconColor
                  }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Secondary grid - WAI-ARIA tabpanel */}
          <div
            id="projects-grid"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {filteredOthers.map((p) => renderCard(p))}
          </div>
        </section>
        
        <Certifications />
        
        <Publications />
        
        <Skills />
      </main>

      {/* Glassmorphic Modal Overlay for Simulators - HCI backdrop click & WAI-ARIA role dialog */}
      {selectedProjForModal && (
        <div 
          onClick={() => setActiveModalProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(9, 9, 11, 0.65)', // Zinc-950 transparent backdrop
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.5rem',
            cursor: 'pointer' // Clicks outer space to dismiss
          }}
        >
          <div 
            className="glass-card" 
            onClick={(e) => e.stopPropagation()} // Stop event bubbling to protect clicks inside card
            style={{
              maxWidth: '850px',
              width: '100%',
              padding: '2.5rem',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              cursor: 'default'
            }}
          >
            <button 
              onClick={() => setActiveModalProject(null)}
              className="btn" 
              aria-label="Close simulator modal"
              style={{ 
                position: 'absolute', 
                top: '1rem', 
                right: '1rem', 
                padding: '0.4rem 0.8rem', 
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              Close <span className="keycap" style={{ padding: '0.1rem 0.25rem', fontSize: '0.55rem', borderBottomWidth: '1px' }}>Esc</span>
            </button>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <span style={{ 
                fontSize: '0.7rem', 
                fontFamily: 'var(--font-mono)', 
                color: 'var(--primary)', 
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {selectedProjForModal.label}{selectedProjForModal.simulator ? ' Simulation' : ''}
              </span>
              <h3 id="modal-title" className="font-space" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                {selectedProjForModal.title}
              </h3>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
              {selectedProjForModal.desc}
            </p>

            <ul style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              listStyleType: 'none',
              paddingLeft: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              marginBottom: '2rem'
            }}>
              {selectedProjForModal.bullets.map((b, bIdx) => (
                <li key={bIdx} style={{ position: 'relative', paddingLeft: '1.25rem' }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.55rem',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'inline-block'
                  }} />
                  {b}
                </li>
              ))}
            </ul>

            {/* Modal Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              borderBottom: '1px solid var(--border)',
              marginBottom: '1.5rem',
              paddingBottom: 0
            }}>
              {selectedProjForModal.simulator && (
                <button
                  onClick={() => setModalTab('sandbox')}
                  role="tab"
                  aria-selected={modalTab === 'sandbox'}
                  className="font-mono"
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    background: 'transparent',
                    borderBottom: modalTab === 'sandbox' ? '2px solid var(--primary)' : '2px solid transparent',
                    color: modalTab === 'sandbox' ? 'var(--text-main)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    transition: 'all 0.15s ease'
                  }}
                >
                  ⚡ Interactive Sandbox
                </button>
              )}
              <button
                onClick={() => setModalTab('benchmark')}
                role="tab"
                aria-selected={modalTab === 'benchmark'}
                className="font-mono"
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  background: 'transparent',
                  borderBottom: modalTab === 'benchmark' ? '2px solid var(--primary)' : '2px solid transparent',
                  color: modalTab === 'benchmark' ? 'var(--text-main)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  transition: 'all 0.15s ease'
                }}
              >
                Evidence and architecture
              </button>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              {modalTab === 'sandbox' ? (
                <><p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Illustrative simulation. Values are generated in the browser, not measured from the project.</p>{selectedProjForModal.simulator}</>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  fontSize: '0.88rem',
                  lineHeight: 1.6
                }}>
                  <div style={{
                    background: 'var(--bg-dark)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-main)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--primary)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>[tool]</span>
                      <span>{selectedProjForModal.benchmarkDetails.tool}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--accent-gold)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>[cmd]</span>
                      <span>{selectedProjForModal.benchmarkDetails.command}</span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-main)', fontWeight: 500, margin: 0 }}>
                    Methodology: <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{selectedProjForModal.benchmarkDetails.methodology}</span>
                  </p>

                  <ul style={{
                    color: 'var(--text-muted)',
                    listStyleType: 'none',
                    paddingLeft: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem',
                    marginTop: '0.5rem'
                  }}>
                    {selectedProjForModal.benchmarkDetails.bullets.map((b, bIdx) => {
                      return (
                        <li key={bIdx} style={{ position: 'relative', paddingLeft: '1.25rem' }}>
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            top: '0.55rem',
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            display: 'inline-block'
                          }} />
                          {b}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer style={{
        background: 'var(--bg-dark)',
        borderTop: '1px solid var(--border)',
        padding: '2.5rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-space)'
      }}>
        © {new Date().getFullYear()} Harsha Raj Kumar · Nashville, TN · Built with React & Vite.
      </footer>
      <TerminalDrawer />
    </div>
  );
}

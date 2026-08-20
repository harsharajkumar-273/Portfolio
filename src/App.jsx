import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import FernOSSim from './components/FernOSSim';
import RadarSim from './components/RadarSim';
import LSMTreeSim from './components/LSMTreeSim';
import PulseStreamSim from './components/PulseStreamSim';
import GatewaySim from './components/GatewaySim';
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

  // Reset tab to sandbox when switching projects
  useEffect(() => {
    if (activeModalProject) {
      setModalTab('sandbox');
    }
  }, [activeModalProject]);

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
        window.location.href = 'mailto:harsharajkumar273@gmail.com';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const projects = [
    {
      id: 'lsmtree',
      title: 'LSM-Tree Storage Engine',
      label: 'High-Performance Storage Systems',
      desc: 'A production-grade C++20 Log-Structured Merge-Tree storage engine featuring io_uring O_DIRECT logging, Leveled Compaction, automated WAL crash recovery, and Block Bloom filters.',
      bullets: [
        'Integrated Linux io_uring with O_DIRECT for non-blocking WAL logging and automated WAL crash recovery (<0.85ms replay time).',
        'Engineered Leveled Compaction (L0 -> L1 tombstone purges) and concurrent lock-free SkipList MemTable with atomic CAS pointers.',
        'Implemented 64-byte cache-aligned block Bloom filters restricting negative search latency overhead to 1 cache line miss.'
      ],
      tags: ['C++20', 'io_uring', 'Crash Recovery', 'Leveled Compaction', 'Block Bloom Filters'],
      links: [
        { label: 'Code', href: 'https://github.com/harsharajkumar-273/lsm_tree', primary: true }
      ],
      simulator: <LSMTreeSim />,
      categories: ['systems'],
      benchmarkDetails: {
        tool: 'Custom C++ Benchmark Harness & Crash Test Suite',
        command: './build/lsm_benchmark --threads=8 --duration=60 --ops=10000000',
        methodology: 'Evaluated in-memory write throughput, WAL crash recovery replay time, and read-miss bypassing latency.',
        bullets: [
          'Direct I/O Logging: Direct WAL ingestion via Linux io_uring with O_DIRECT bypasses kernel page cache locks, hitting 254,000+ ops/sec.',
          'Crash Recovery SLA: Replays pending WAL transactions in < 0.85ms for 5,000 keys with CRC32 checksum corruption verification.',
          'Leveled Compaction: Merges L0 SSTables into L1 SSTables via single-pass multiway merge sort, purging DELETE tombstones in background threads.',
          'Read Bypassing: Cache-aligned block Bloom filters filter out key misses, restricting negative search overhead to a single CPU cache line miss (0.76μs latency).'
        ]
      }
    },
    {
      id: 'revertai',
      title: 'revert-ai Automated Code Analyzer',
      label: 'Developer Tooling & AI Automation',
      desc: 'An automated developer security and code quality analysis tool published on NPM that executes AST static code analysis and delivers inline AI code review feedback.',
      bullets: [
        'Integrated automated Webhooks API to execute AST-based static code analysis on code submissions.',
        'Engineered an asynchronous LLM code review pipeline parsing code diffs to detect security flaws and syntax bugs.',
        'Implemented local caching and token optimization algorithms to reduce LLM API latency by 60%.'
      ],
      tags: ['TypeScript', 'Node.js', 'Webhooks API', 'AST Parsers', 'LLMs', 'NPM Package'],
      links: [
        { label: 'Code', href: 'https://github.com/harsharajkumar-273/revert-ai', primary: true }
      ],
      categories: ['systems', 'web'],
      benchmarkDetails: {
        tool: 'Webhook Test Harness & AST Benchmarks',
        command: 'npx revert-ai --analyze --file=src/index.ts',
        methodology: 'Evaluated webhook response latency, AST parse speed, and LLM prompt token optimization.',
        bullets: [
          'Webhook Ingestion: Sub-second webhook acknowledgement with asynchronous background diff parsing.',
          'AST Static Analysis: Parses syntax tree chunks to extract modified functions and variable scopes before LLM processing.',
          'Token Optimization: Filters out whitespace-only diffs, reducing LLM API token consumption by 60%.'
        ]
      }
    },
    {
      id: 'pulsestream',
      title: 'PulseStream Distributed Telemetry Platform',
      label: 'Distributed Cloud Infrastructure',
      desc: 'A resilient, production-grade telemetry platform built on Redpanda (Kafka), Redis idempotency edge locks, PostgreSQL, Prometheus metrics, and KEDA consumer lag auto-scaling.',
      bullets: [
        'Decoupled ingestion gate returning HTTP 202 Accepted (< 8ms SLA), producing to Redpanda (Kafka) topic partitions.',
        'Implemented Dead-Letter Queue (DLQ) routing, exponential backoff retries, and dual-layer idempotency (Redis SETNX + Postgres ON CONFLICT).',
        'Configured Prometheus consumer lag monitoring and KEDA Kubernetes auto-scaling (scaling consumer pods 1 -> 10 based on partition lag).'
      ],
      tags: ['TypeScript', 'Redpanda/Kafka', 'KEDA Auto-scaling', 'Prometheus', 'Redis', 'PostgreSQL'],
      links: [
        { label: 'Code', href: 'https://github.com/harsharajkumar-273/PulseStream', primary: true }
      ],
      simulator: <PulseStreamSim />,
      categories: ['systems', 'web'],
      benchmarkDetails: {
        tool: 'Locust Ingestion Harness & Prometheus Consumer Lag Suite',
        command: 'locust -f tests/locustfile.py --headless -u 1000 -r 100 --host http://localhost:3000',
        methodology: 'Evaluated ingestion throughput, consumer lag draining speed, and fault recovery under simulated DB outages.',
        bullets: [
          'Ingestion Speed: Asynchronous Fastify gateway acknowledges payloads in < 8ms (P99 12.4ms), sustaining 50,000+ metrics/sec.',
          'Fault Isolation: Malformed or unprocessable metrics route to Dead-Letter Queue (telemetry-dlq), while DB timeouts execute exponential backoff with jitter.',
          'KEDA Auto-scaling: Kubernetes ScaledObject monitors Prometheus consumer lag metrics, scaling worker pods from 1 to 10 replicas when lag exceeds 100 messages.',
          'Batch Persistence: Consumer workers aggregate partition streams into 1,000-record transactions, writing bulk upserts to PostgreSQL in 14.5ms.'
        ]
      }
    },
    {
      id: 'fernos',
      title: 'ARIA Disaster Pathfinder',
      label: 'Distributed Systems',
      desc: 'A resilient crisis command platform. Models urban infrastructure as a spatial PostGIS graph and computes safest paths to affected sectors by penalizing hazard decay rates.',
      bullets: [
        'Integrated custom Dijkstra weights scaled by exponential decay offsets exp(-1.5t).',
        'Implemented real-time Socket.io responder updates triggered by telemetry listeners.',
        'Maintained graph uptime via asynchronous ML workers decoupling graph search from telemetry ingestion.'
      ],
      tags: ['TypeScript', 'PostGIS', 'Socket.io'],
      links: [
        { label: 'Code', href: 'https://github.com/harsharajkumar-273/ARIA', primary: true }
      ],
      simulator: <FernOSSim />,
      categories: ['systems', 'web'],
      benchmarkDetails: {
        tool: 'pgTap spatial regression suite & Node.js Pathfinder runner',
        command: 'npm run test:benchmark -- --nodes=50000 --edges=120000',
        methodology: 'Evaluated Dijkstra safe-path routing on PostGIS graphs scaled by exponential decay hazard telemetry ages.',
        bullets: [
          'Spatial Decayed Weighting: Dynamic Dijkstra weights scaled using an exponential decay offset exp(-1.5t) based on active hazard telemetry ages.',
          'Graph Computation Limits: Completed full safe-path searches on a 50,000-edge urban grid in under 8 milliseconds.',
          'Decoupled Workers: Decoupled telemetry write listeners (ingesting 2,000 updates/sec) from the path-finding computation worker via Socket.io channels, preventing UI thread blocking.'
        ]
      }
    },
    {
      id: 'gateway',
      title: 'Production API Gateway',
      label: 'Distributed Systems & Web',
      desc: 'A production-grade Node.js gateway with distributed tracing, SLO metrics, chaos engineering controls, and a custom rate limiter based on an EWMA PID controller model.',
      bullets: [
        'Decoupled auth middleware checking edge cache tokens under 0.1ms.',
        'Built dynamic circuit breakers flipping states to prevent cascading microservice outages.',
        'Sustained over 25,000 requests per second under peak traffic testing.'
      ],
      tags: ['Node.js', 'Redis Cache', 'Prometheus', 'SLO Testing'],
      links: [
        { label: 'Code', href: 'https://github.com/harsharajkumar-273/API-gateway', primary: true }
      ],
      simulator: <GatewaySim />,
      categories: ['web'],
      benchmarkDetails: {
        tool: 'wrk HTTP benchmarking tool',
        command: 'wrk -t12 -c400 -d30s http://localhost:8080/api/v1/auth',
        methodology: 'Conducted loopback load testing to determine maximum request threshold before latency degradation.',
        bullets: [
          'Auth Caching: Implemented lightweight token verification cache in Redis, reducing auth check middleware execution to under 0.1ms.',
          'Cascading Outage Mitigation: Configured sliding-window Circuit Breakers that automatically trip to serving fallback static payloads when downstream timeouts hit 5%.',
          'Performance Limits: Gateway sustained 25,000 requests per second under peak concurrent load with a stable p99 latency of ~4.5ms, utilizing non-blocking asynchronous I/O.'
        ]
      }
    }
  ];

  const filteredProjects = projects.filter(
    (p) => activeTab === 'all' || p.categories.includes(activeTab)
  );

  const selectedProjForModal = projects.find(p => p.id === activeModalProject);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main style={{ flexGrow: 1, paddingBottom: '6rem' }}>
        <Hero />
        
        <Experience />
        
        <Education />
        
        {/* Projects Section */}
        <section id="projects" className="container" style={{ marginTop: '4rem' }}>
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
            Featured Projects & Simulators
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}>
            A showcase of core systems implementations. Select a domain to filter, and launch dynamic interactive simulators.
          </p>

          {/* Tab Navigation - IDE Tab bar style with WAI-ARIA tablist accessibility */}
          <div 
            role="tablist"
            aria-label="Project Categories"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2px',
              marginBottom: '3rem',
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

          {/* 2-Column Grid Layout - WAI-ARIA tabpanel */}
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
            {filteredProjects.map((p) => (
              <div 
                key={p.id} 
                className="glass-card" 
                style={{ 
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.2rem'
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
                      onClick={() => setActiveModalProject(p.id)}
                      className="btn"
                      style={{ 
                        padding: '0.25rem 0.75rem', 
                        fontSize: '0.65rem', 
                        borderColor: 'rgba(56, 189, 248, 0.25)',
                        color: 'var(--primary)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      Simulate ⚡
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
            ))}
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
                {selectedProjForModal.label} Sandbox
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
                📊 Benchmark & Architecture Details
              </button>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              {modalTab === 'sandbox' ? (
                selectedProjForModal.simulator
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  fontSize: '0.88rem',
                  lineHeight: 1.6
                }}>
                  <div style={{
                    background: '#09090b',
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
                      const parts = b.split(':');
                      const title = parts[0];
                      const content = parts.slice(1).join(':');
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
                          <strong style={{ color: 'var(--text-main)' }}>{title}:</strong>{content}
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

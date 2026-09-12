import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience() {
  const roles = [
    {
      title: 'Software Engineer — Backend & Platform Systems',
      company: 'Amplify GenAI Innovation (AGI) Center, Vanderbilt University',
      date: 'Aug 2026 – Present',
      location: 'Nashville, TN',
      details: [
        'Developed REST and streaming APIs (FastAPI/Redis) for Majik, the lab\'s AI coding agent, powering LLM tool calls and session state.',
        'Added hybrid vector search with PostgreSQL/pgvector, tuning chunking and caching to speed up retrieval.',
        'Led QA and A/B testing on Amplify\'s UI rewrite and caught 20+ defects before release, tracing each to its root cause in the code — including data-integrity bugs where deletes and saves never reached the backend, and a share flow leaking internal fields to recipients.'
      ]
    },
    {
      title: 'Systems & Software Engineer, Research Assistant',
      company: 'VU-BEAM Lab, Vanderbilt University',
      date: 'Oct 2025 – Aug 2026',
      location: 'Nashville, TN',
      details: [
        'Developed asynchronous multi-GPU PyTorch data pipelines to preprocess, augment, and cache 10,000+ scan frames, cutting training time by ~40%.',
        'Designed ReCL, a self-supervised contrastive-learning framework (custom NCC loss + InfoNCE) for sim-to-real transfer, built as a pretraining then fine-tuning then active-learning pipeline on the ACCRE Slurm GPU cluster.',
        'Instrumented multi-GPU training nodes with Prometheus to track memory, utilization, and thermal metrics, surfacing throttling and memory bottlenecks during long-running workloads.'
      ]
    },
    {
      title: 'Software Engineer',
      company: 'Vanderbilt University Mathematics Department',
      date: 'Sep 2025 – May 2026',
      location: 'Nashville, TN',
      details: [
        'Built Proofdesk, a full-stack browser-based LaTeX/PreTeXt IDE (React/Monaco frontend, FastAPI backend) that compiles in the browser with WebAssembly — about 88% faster than the old server-side path — with real-time multi-user editing over Y.js CRDTs.',
        'Set up a Redis/BullMQ background worker queue with in-memory fallback to keep the compiler available during outages.',
        'Shipped sandboxed WebSocket terminals (node-pty) in Docker on AWS EC2 via GitHub Actions CI/CD.'
      ]
    }
  ];

  return (
    <section id="experience" style={{
      maxWidth: '850px',
      margin: '4rem auto 0 auto',
      padding: '0 1.5rem'
    }}>
      <h2 style={{
        fontFamily: 'var(--font-space)',
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--text-main)'
      }}>
        <Briefcase size={28} style={{ color: 'var(--secondary)' }} /> Professional History
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {roles.map((role, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                  {role.title}
                </h3>
                <div style={{ fontSize: '0.95rem', color: 'var(--secondary)', fontWeight: 600, marginTop: '0.2rem', fontFamily: 'var(--font-space)' }}>
                  {role.company}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <Calendar size={14} style={{ color: 'var(--primary)' }} /> {role.date}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <MapPin size={14} /> {role.location}
                </div>
              </div>
            </div>

            <ul style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              listStyleType: 'none',
              paddingLeft: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem'
            }}>
              {role.details.map((detail, dIdx) => (
                <li key={dIdx} style={{ position: 'relative', paddingLeft: '1.25rem' }}>
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
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

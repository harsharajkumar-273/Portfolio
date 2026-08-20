import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience() {
  const roles = [
    {
      title: 'Software Engineer — GenAI Platform & Systems',
      company: 'Amplify GenAI Innovation (AGI) Center, Vanderbilt University',
      date: 'Sep 2026 – Present',
      location: 'Nashville, TN',
      details: [
        'Engineered scalable GenAI platform tooling, API integrations, and multi-agent workflows across Vanderbilt\'s College of Connected Computing.',
        'Built high-throughput LLM middleware services and vector indexing pipelines to accelerate AI application deployment for university research initiatives.',
        'Collaborated with operations and research leads to design high-concurrency cloud microservices for GenAI applications.'
      ]
    },
    {
      title: 'Platform Architect & Software Engineer',
      company: 'VU Math Department, Vanderbilt University',
      date: 'Jan 2024 – May 2024',
      location: 'Nashville, TN',
      details: [
        'Engineered Proofdesk, a collaborative browser-based LaTeX Web IDE, reducing textbook compilation latency by 72% (from 1.1s to 300ms) via client-side WebAssembly (Pyodide).',
        'Deployed WebSocket sandboxed terminal runtimes (node-pty) inside resource-restricted Docker containers (512MB RAM limit) on AWS EC2.',
        'Architected a distributed background worker task queue using Redis and BullMQ with local fallback loops to guarantee 100% compiler availability during outages.'
      ]
    },
    {
      title: 'Systems & Software Engineer Research Assistant',
      company: 'VU-BEAM Lab, Vanderbilt University',
      date: 'Oct 2025 – Aug 2026',
      location: 'Nashville, TN',
      details: [
        'Built multi-GPU PyTorch data loader pipelines to preprocess, augment, and cache 10,000+ raw high-resolution scan frames for ReCL ultrasound research, reducing training latency by 40%.',
        'Instrumented multi-GPU training nodes with Prometheus to track memory, utilization, and thermal metrics, identifying memory leaks and throttling bottlenecks during long-running workloads.',
        'Optimized core numerical compute pipelines in PyTorch, accelerating batch execution across clinical ultrasound datasets.'
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

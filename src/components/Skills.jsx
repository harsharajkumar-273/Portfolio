import React from 'react';
import { Cpu } from 'lucide-react';

export default function Skills() {
  const categories = [
    {
      title: 'Languages',
      color: 'var(--primary)',
      skills: ['C++', 'Java', 'Python', 'Go', 'TypeScript / JavaScript', 'SQL']
    },
    {
      title: 'Systems & Infrastructure',
      color: 'var(--accent-purple)',
      skills: ['Distributed systems', 'Kafka / Redpanda', 'PostgreSQL', 'Redis', 'Docker', 'AWS deployment tooling', 'GitHub Actions CI/CD', 'Prometheus']
    },
    {
      title: 'Frameworks & AI',
      color: 'var(--secondary)',
      skills: ['REST APIs', 'FastAPI', 'Node.js / Express', 'React', 'PyTorch', 'LLM orchestration', 'RAG / vector search']
    }
  ];

  return (
    <section id="skills" style={{
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
        <Cpu size={28} style={{ color: 'var(--primary)' }} /> Technical Proficiency
      </h2>

      <div className="glass-card" style={{ padding: '3rem', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem'
        }}>
          {categories.map((cat, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: cat.color,
                fontWeight: 700,
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.5rem'
              }}>
                {cat.title}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: 0, margin: 0 }}>
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: cat.color,
                      flexShrink: 0
                    }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

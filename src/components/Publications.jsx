import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

export default function Publications() {
  const list = [
    {
      title: 'An Integrated GCN–GAT–AE Framework for Robust Anomaly Detection in Industrial IoT Environments',
      type: 'IEEE Published Paper',
      date: '2025',
      badge: 'IEEE Published',
      color: 'var(--primary)',
      desc: 'Developed an integrated deep learning framework combining Graph Convolutional Networks (GCN), Graph Attention Networks (GAT), and Autoencoders (AE) for robust and noise-resilient anomaly detection in Industrial IoT sensor networks.',
      link: 'https://ieeexplore.ieee.org/abstract/document/11399172'
    },
    {
      title: 'Vanderbilt Global Good Hackathon Finalist',
      type: 'Hackathon Award',
      date: '2025',
      badge: 'Hackathon Finalist',
      color: 'var(--accent-purple)',
      desc: 'Co-developed a high-impact crisis response system, winning finalist recognition for social impact and real-time systems execution among competitive university engineering cohorts.',
      link: 'https://github.com/harsharajkumar-273/ARIA'
    }
  ];

  return (
    <section id="publications" style={{
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
        <Award size={28} style={{ color: 'var(--primary)' }} /> Publications & Recognition
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {list.map((item, idx) => (
          <div key={idx} className="glass-card" style={{
            padding: '1.5rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            borderTop: `4px solid ${item.color}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                {item.type}
              </span>
              <span style={{
                fontSize: '0.6rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '10px',
                background: `${item.color}15`,
                color: item.color,
                border: `1px solid ${item.color}30`,
                fontWeight: 700,
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)'
              }}>
                {item.badge}
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              {item.title}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, flexGrow: 1, margin: 0 }}>
              {item.desc}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {item.date}
              </span>
              {item.link && (
                <a href={item.link} target="_blank" rel="noreferrer" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.75rem',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontFamily: 'var(--font-space)'
                }}>
                  View Link <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

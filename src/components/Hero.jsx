import React, { useState } from 'react';
import { Mail, ChevronDown, Info, FileText } from 'lucide-react';

export default function Hero() {
  const [activeStat, setActiveStat] = useState(null);

  const statDetails = [
    {
      title: '88% Faster Textbook Compiles',
      source: 'VU Math Department — Proofdesk Browser IDE',
      desc: 'How it was measured: the previous pipeline compiled PreTeXt/LaTeX sources on the server on every change. By moving compilation into the browser with WebAssembly, server round-trips were eliminated and compile latency dropped by about 88% versus the old server-side path.',
      calculation: 'Reported as ~88% faster in-browser compilation versus the server-side baseline.'
    },
    {
      title: '80% Ingestion Space Saved',
      source: 'Repost-Radar Deduplicator (BEAM Lab Stream Ingestion)',
      desc: 'How it was measured: Raw telemetry streams capture redundant frame variables (Jaccard similarity > 95%) at 60 Hz. By running a MinHash LSH filter at the ingestion boundary to drop matching bucket frames before database write transactions, database disk utilization dropped from ~100 GB to ~20 GB per test cycle.',
      calculation: 'Formula: (100GB - 20GB) / 100GB = 80% memory footprint compression.'
    },
    {
      title: '40% Training Pipeline Speedup',
      source: 'VU-BEAM Lab PyTorch Numeric Compute Optimizations',
      desc: 'How it was measured: The data loader loader suffered from host-to-device memory copy bottlenecks on multi-GPU nodes. By utilizing PyTorch pinned memory layouts (pin_memory=True), vectorizing signals into torch tensors, and threading data fetches (num_workers=4), training cycle preprocessing dropped from 45 seconds to 27 seconds per epoch.',
      calculation: 'Formula: (45s - 27s) / 45s = 40% decrease in epoch batch execution latency.'
    }
  ];

  return (
    <section id="about" style={{
      padding: '6rem 1.5rem 2rem 1.5rem',
      maxWidth: '850px',
      margin: '0 auto',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
        <div className="font-mono" style={{
          background: 'rgba(56, 189, 248, 0.05)',
          padding: '0.4rem 1rem',
          borderRadius: '6px',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          fontSize: '0.65rem',
          fontWeight: 600,
          color: 'var(--primary)',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Software Engineer
        </div>
        
        {/* Pulsing Seeking Opportunities Badge - Styled like a CLI command status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--primary-glow)',
          border: '1px solid var(--border)',
          padding: '0.45rem 1rem',
          borderRadius: '8px',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)'
        }}>
          <span style={{ color: 'var(--primary)' }}>$</span>
          <span>ping new-grad-swe --active</span>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--secondary)',
            display: 'inline-block',
            animation: 'pulse 2s infinite',
            marginLeft: '4px'
          }} />
          <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>Active (Summer/Fall 2027)</span>
        </div>
      </div>
      
      <h1 style={{
        fontFamily: 'var(--font-space)',
        fontSize: '3.6rem',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-.05em',
        color: 'var(--text-main)',
        margin: '0.5rem 0'
      }}>
        Harsha Raj Kumar
      </h1>
      
      <p style={{
        fontSize: '1.05rem',
        color: 'var(--text-muted)',
        maxWidth: '620px',
        lineHeight: 1.7,
        margin: '0 auto'
      }}>
        MS Computer Science at <strong style={{ color: 'var(--text-main)' }}>Vanderbilt University</strong>.
        I build backends and distributed systems — a Kafka-based telemetry pipeline, the backend for my
        university's GenAI platform, and an open-source C++ storage engine I maintain — with a bug-fix merged into PyTorch.
      </p>
      
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginTop: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <a href="mailto:harsharajkumar273@gmail.com" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          <Mail size={14} /> Get in Touch <span className="keycap" style={{ padding: '0.1rem 0.25rem', fontSize: '0.55rem', marginLeft: '4px' }}>⌘K</span>
        </a>
        <a href="https://github.com/harsharajkumar-273" target="_blank" rel="noreferrer" className="btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg> GitHub
        </a>
        <a href="https://linkedin.com/in/harsharajkumar273" target="_blank" rel="noreferrer" className="btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" rx="1" />
            <circle cx="4" cy="4" r="2" />
          </svg> LinkedIn
        </a>
        <a href="/Harsha%20Raj%20Kumar%20CV.pdf" target="_blank" rel="noreferrer" className="btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={14} /> Resume
        </a>
      </div>

      {/* Dynamic Stats Row - Interactive click-to-expand details */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)'
        }}>
          <Info size={12} style={{ color: 'var(--primary)' }} />
          <span>Click any metric below to see how it was achieved</span>
        </div>
        <div 
          className="stats-row" 
          style={{ 
            width: '100%', 
            margin: '0.5rem auto 0 auto',
            gridTemplateColumns: 'repeat(3, 1fr)'
          }}
        >
          {[
            { num: '88', suffix: '%', label: 'Faster compiles', color: 'var(--primary)' },
            { num: '80', suffix: '%', label: 'Ingestion space saved', color: 'var(--accent-purple)' },
            { num: '40', suffix: '%', label: 'Pipeline speedup', color: 'var(--secondary)' }
          ].map((stat, idx) => {
            const isSelected = activeStat === idx;
            return (
              <div 
                key={idx} 
                onClick={() => setActiveStat(isSelected ? null : idx)}
                className="stat" 
                style={{ 
                  cursor: 'pointer',
                  background: isSelected ? 'var(--primary-glow)' : 'transparent',
                  borderBottom: isSelected ? `2px solid ${stat.color}` : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  padding: '1.5rem'
                }}
                title="Click to view calculation details"
              >
                <div>
                  <span className="stat-num">{stat.num}</span>
                  <span className="stat-suf" style={{ color: stat.color }}>{stat.suffix}</span>
                </div>
                <span className="stat-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                  {stat.label} <Info size={10} style={{ color: 'var(--text-muted)' }} />
                </span>
              </div>
            );
          })}
        </div>

        {/* Expandable Verification Console */}
        {activeStat !== null && (
          <div style={{
            background: 'var(--terminal-bg)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '1.25rem',
            textAlign: 'left',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            animation: 'fadeIn 0.25s ease-in-out'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>$ verify_metric --id={activeStat}</span>
              <button 
                onClick={() => setActiveStat(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem' }}
              >
                close [✗]
              </button>
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Metric Target:</strong> {statDetails[activeStat].title}
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Environment:</strong> {statDetails[activeStat].source}
            </div>
            <div style={{ marginTop: '0.25rem', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--text-main)' }}>Measurement details:</strong> {statDetails[activeStat].desc}
            </div>
            <div style={{ color: 'var(--accent-gold)', marginTop: '0.25rem' }}>
              <strong>Verification:</strong> {statDetails[activeStat].calculation}
            </div>
          </div>
        )}
      </div>
      
      <a 
        href="#experience"
        style={{ 
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          marginTop: '1rem', 
          color: 'var(--text-muted)'
        }}
      >
        <ChevronDown size={24} style={{ color: 'var(--text-muted)' }} />
      </a>
    </section>
  );
}

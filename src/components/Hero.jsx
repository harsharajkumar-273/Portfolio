import React from 'react';
import { Mail, ChevronDown, FileText } from 'lucide-react';

export default function Hero() {


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
          <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>Seeking 2027 new-grad roles</span>
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
        Graduating April 2027. I build backend services and developer tools, including a Kafka telemetry pipeline and a collaborative editor. I also maintain a C++ storage-engine project.
      </p>
      
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginTop: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <a href="mailto:harsha.raj.kumar@vanderbilt.edu" className="btn btn-primary" style={{ textDecoration: 'none' }}>
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

      <a href="https://github.com/pytorch/pytorch/commit/f594cadbd10e281c04c0e471b40c3b0569e47c43" className="glass-card" target="_blank" rel="noreferrer" style={{ padding: '1.25rem', marginTop: '1.5rem', textDecoration: 'none', color: 'var(--text-main)' }}>
        <strong>Accepted contribution to PyTorch</strong>
        <p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>Input validation and regression tests for torch.unravel_index. View the upstream change.</p>
      </a>
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

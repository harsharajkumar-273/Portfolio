import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" style={{
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
        <GraduationCap size={28} style={{ color: 'var(--primary)' }} /> Academic Credentials
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Vanderbilt University */}
        <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                Master of Science in Computer Science
              </h3>
              <div style={{ fontSize: '0.95rem', color: 'var(--secondary)', fontWeight: 600, marginTop: '0.2rem', fontFamily: 'var(--font-space)' }}>
                Vanderbilt University
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <Calendar size={14} style={{ color: 'var(--primary)' }} /> Aug 2025 – Expected Apr 2027
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <MapPin size={14} /> Nashville, TN
              </div>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
            GPA 3.6/4.0. Coursework across distributed systems, system design, algorithms, and database systems.
          </p>
        </div>

        {/* VIT Chennai */}
        <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-space)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                Bachelor of Technology in Computer Science
              </h3>
              <div style={{ fontSize: '0.95rem', color: 'var(--secondary)', fontWeight: 600, marginTop: '0.2rem', fontFamily: 'var(--font-space)' }}>
                Vellore Institute of Technology (VIT)
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <Calendar size={14} style={{ color: 'var(--primary)' }} /> Aug 2021 – May 2025
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <MapPin size={14} /> Chennai, India
              </div>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
            GPA 3.5/4.0. Coursework in Algorithms, Data Structures, Operating Systems, Database Management Systems, and Networks. Technical Lead at the Google Developer Student Club (GDSC).
          </p>
        </div>
      </div>
    </section>
  );
}

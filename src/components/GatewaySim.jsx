import React, { useState, useEffect } from 'react';
import { ShieldCheck, Play, Pause } from 'lucide-react';

export default function GatewaySim() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trafficRate, setTrafficRate] = useState(5000); // In Requests per second
  const [cbState, setCbState] = useState('CLOSED'); // CLOSED, OPEN, HALF-OPEN
  const [errorBudget, setErrorBudget] = useState(100.0); // % budget remaining
  const [logs, setLogs] = useState([]);

  const resetSim = () => {
    setLogs(['[API Gateway] Edge reverse proxy active. SLO metrics healthy.']);
    setTrafficRate(5000);
    setCbState('CLOSED');
    setErrorBudget(100.0);
    setIsPlaying(false);
  };

  useEffect(() => {
    resetSim();
  }, []);

  const addLog = (msg) => {
    const timeStr = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timeStr}] ${msg}`, ...prev.slice(0, 8)]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const isPeak = trafficRate > 20000;
      
      // Calculate random small latency fluctuations
      let latency = Math.round(5 + Math.random() * 4);
      if (isPeak) {
        latency = Math.round(12 + Math.random() * 8);
        addLog(`⚡ RATE LIMIT: EWMA load factor triggered PID controller. Throttling active (P99: ${latency}ms).`);
      } else {
        addLog(`✅ ROUTE: Forwarded request load to /v1/auth in ${latency}ms. Status 200.`);
      }

      if (cbState === 'OPEN') {
        addLog(`🚨 CB OPEN: Cascading db-service failure. Bypassing calls. Fast-fallback static payload served.`);
        setErrorBudget(prev => Math.max(92.4, Number((prev - 0.05).toFixed(2))));
      } else if (Math.random() > 0.95 && !isPeak) {
        // Mock a brief transient downstream failure
        addLog(`⚠️ SLO ALERT: Downstream Billing node timed out. Serving 504 Gateway Timeout.`);
        setErrorBudget(prev => Math.max(95.0, Number((prev - 0.02).toFixed(2))));
      }

    }, 850);

    return () => clearInterval(interval);
  }, [isPlaying, trafficRate, cbState]);

  const triggerChaos = () => {
    setCbState('OPEN');
    addLog(`💥 CHAOS INJECTED: Terminated downstream DB node. Circuit Breaker tripped to OPEN.`);
  };

  const recoverDB = () => {
    setCbState('HALF-OPEN');
    addLog(`🔄 RECOVERY: Downstream DB node revived. Testing traffic channel (HALF-OPEN).`);
    setTimeout(() => {
      setCbState('CLOSED');
      addLog(`💚 STABILIZED: Circuit Breaker returned to CLOSED. downstream health-checks passing.`);
    }, 2000);
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border)' }}>
      <div className="widget-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <ShieldCheck size={20} style={{ color: 'var(--primary)' }} />
        <div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>API Gateway Simulation</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.1rem', fontWeight: 600 }}>SRE SLO tracker & Circuit Breaker</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Left Side: Performance Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>INGESTED TRAFFIC RATE</span>
              <span style={{ fontWeight: 'bold', color: trafficRate > 20000 ? 'var(--accent-red)' : 'var(--text-main)' }}>
                {trafficRate.toLocaleString()} requests/sec
              </span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="25000" 
              step="1000"
              value={trafficRate} 
              onChange={(e) => setTrafficRate(Number(e.target.value))}
              style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.6rem',
            background: 'rgba(15,23,42,0.04)',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SLO ERROR BUDGET</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', fontFamily: 'monospace', color: errorBudget > 98.0 ? 'var(--secondary)' : 'var(--accent-red)' }}>
                {errorBudget}%
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>CB STATE</span>
              <span style={{ 
                fontSize: '0.95rem', 
                fontWeight: 'bold', 
                color: cbState === 'CLOSED' ? 'var(--secondary)' : cbState === 'OPEN' ? 'var(--accent-red)' : 'var(--accent-gold)' 
              }}>
                {cbState}
              </span>
            </div>
          </div>

        </div>

        {/* Right Side: Control & Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)} style={{ flexGrow: 1, fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
              {isPlaying ? <Pause size={12} /> : <Play size={12} />} {isPlaying ? 'Pause' : 'Start Influx'}
            </button>
            <button className="btn" onClick={triggerChaos} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>
              Inject Chaos
            </button>
            {cbState === 'OPEN' && (
              <button className="btn btn-secondary" onClick={recoverDB} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', flexGrow: 1 }}>
                Recover DB
              </button>
            )}
            <button className="btn" onClick={resetSim} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
              Reset
            </button>
          </div>

          {/* Logs Terminal */}
          <div style={{
            background: '#09090b',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              background: '#121214',
              padding: '0.4rem 0.6rem',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#eab308' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
              </div>
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>gateway_proxy.log</span>
              <span style={{ 
                fontSize: '0.6rem', 
                fontFamily: 'var(--font-mono)', 
                color: isPlaying ? 'var(--secondary)' : 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontWeight: 600
              }}>
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: isPlaying ? 'var(--secondary)' : 'var(--text-muted)',
                  display: 'inline-block',
                  animation: isPlaying ? 'pulse 2s infinite' : 'none'
                }} />
                {isPlaying ? 'RUNNING' : 'IDLE'}
              </span>
            </div>
            <div style={{
              height: '95px',
              padding: '0.6rem 0.8rem',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#94a3b8',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              background: '#09090b'
            }}>
              {logs.map((log, i) => (
                <div key={i} style={{ lineBreak: 'anywhere' }}>{log}</div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

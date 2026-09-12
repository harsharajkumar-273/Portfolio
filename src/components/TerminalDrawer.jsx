import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ChevronUp, ChevronDown, CornerDownLeft } from 'lucide-react';

export default function TerminalDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Harsha\'s SDE Shell v1.0.3.' },
    { type: 'output', text: 'Type "help" to list available commands.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  // Focus input when terminal body clicked
  const handleBodyClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;

    const rawInput = inputVal.trim();
    if (!rawInput) return;

    const commandParts = rawInput.toLowerCase().split(' ');
    const primaryCmd = commandParts[0];
    const subCmd = commandParts.slice(1).join(' ');

    const newHistory = [...history, { type: 'input', text: rawInput }];

    switch (primaryCmd) {
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
        
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'Available Commands:\n  about          - Brief overview of Harsha\n  ls projects    - List flagship systems & web projects\n  skills         - List core technical proficiencies\n  cat contact    - Show email and professional profiles\n  clear          - Clear the terminal screen\n  help           - Display this helper prompt'
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: 'Harsha Raj Kumar | MS CS @ Vanderbilt University\nI build backends and distributed systems, and maintain an open-source C++ storage engine. Bug-fix merged into PyTorch.'
        });
        break;

      case 'ls':
        if (subCmd === 'projects' || subCmd === 'project') {
          newHistory.push({
            type: 'output',
            text: 'Flagship Projects:\n  1. engram        - Autonomous ReAct agent + cognitive memory engine (TypeScript)\n  2. pulsestream   - Redpanda/Kafka telemetry ingestion pipeline\n  3. lsm_tree      - Open-source C++ LSM storage engine (maintainer)\n  4. proofdesk     - Browser-based LaTeX IDE (WebAssembly, CRDTs)\n  5. api_gateway   - Rate limiter & circuit breaker gateway'
          });
        } else {
          newHistory.push({
            type: 'output',
            text: 'usage: ls projects'
          });
        }
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: 'Flagship Projects:\n  1. engram        - Autonomous ReAct agent + cognitive memory engine (TypeScript)\n  2. pulsestream   - Redpanda/Kafka telemetry ingestion pipeline\n  3. lsm_tree      - Open-source C++ LSM storage engine (maintainer)\n  4. proofdesk     - Browser-based LaTeX IDE (WebAssembly, CRDTs)\n  5. api_gateway   - Rate limiter & circuit breaker gateway'
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Technical Proficiencies:\n  Languages:   C++, Java, Python, Go, TypeScript/JS, SQL\n  Backend:     REST APIs, FastAPI, Node.js, Redis, PostgreSQL\n  Distributed: Kafka/Redpanda, Docker, AWS (EC2/S3), Prometheus, KEDA'
        });
        break;

      case 'cat':
        if (subCmd === 'contact' || subCmd === 'contact.txt') {
          newHistory.push({
            type: 'output',
            text: 'Contact Credentials:\n  Email:    harsharajkumar273@gmail.com\n  GitHub:   https://github.com/harsharajkumar-273\n  LinkedIn: https://linkedin.com/in/harsharajkumar273'
          });
        } else {
          newHistory.push({
            type: 'output',
            text: 'usage: cat contact'
          });
        }
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: 'Contact Credentials:\n  Email:    harsharajkumar273@gmail.com\n  GitHub:   https://github.com/harsharajkumar-273\n  LinkedIn: https://linkedin.com/in/harsharajkumar273'
        });
        break;

      default:
        newHistory.push({
          type: 'output',
          text: `sh: command not found: ${primaryCmd}. Type "help" for a list of valid commands.`
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 900,
      background: 'var(--terminal-bg)',
      borderTop: '1px solid var(--border)',
      transition: 'height 0.25s ease-in-out',
      height: isOpen ? '280px' : '38px',
      fontFamily: 'var(--font-mono)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 -8px 30px rgba(0,0,0,0.5)'
    }}>
      
      {/* Header bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          height: '37px',
          background: 'var(--terminal-hdr)',
          borderBottom: isOpen ? '1px solid var(--border)' : 'none',
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#eab308' }} />
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
          </div>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Terminal size={12} style={{ color: 'var(--primary)' }} /> terminal.sh
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {!isOpen && (
            <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>
              Type "help" to explore
            </span>
          )}
          <button style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center'
          }}>
            {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </div>

      {/* Terminal logs body */}
      {isOpen && (
        <div 
          onClick={handleBodyClick}
          style={{
            flexGrow: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            cursor: 'text'
          }}
        >
          {history.map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                fontSize: '0.72rem', 
                color: item.type === 'input' ? 'var(--text-main)' : 'var(--text-muted)',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5
              }}
            >
              {item.type === 'input' ? (
                <span>
                  <span style={{ color: 'var(--text-muted)' }}>visitor@harsha-sde:</span>
                  <span style={{ color: 'var(--primary)' }}>~$ </span>
                  {item.text}
                </span>
              ) : (
                item.text
              )}
            </div>
          ))}
          
          {/* Active Input Line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>visitor@harsha-sde:</span>
            <span style={{ color: 'var(--primary)' }}>~$</span>
            <input 
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              style={{
                flexGrow: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                padding: 0
              }}
              autoFocus
              placeholder=""
              aria-label="Terminal prompt command input"
            />
            <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '2px', fontSize: '0.6rem' }}>
              press enter <CornerDownLeft size={10} />
            </span>
          </div>
          <div ref={terminalEndRef} />
        </div>
      )}
    </div>
  );
}

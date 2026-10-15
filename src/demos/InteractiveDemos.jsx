import { useMemo, useState } from 'react';
import { ArrowUpRight, Play, RotateCcw } from 'lucide-react';
import { CodeGraph, fileId, symbolId } from './codegraph/core';
import { blastRadius } from './codegraph/blast';

const SAMPLE_XML = '<section>\n  <title>Vectors and length</title>\n  <p>A vector describes a direction and a distance.</p>\n  <p>Its length is <m>√(x² + y²)</m>.</p>\n</section>';

function previewXml(source) {
  if (/<!DOCTYPE|<!ENTITY/i.test(source)) throw new Error('Use a section with title, p, em, and m elements.');
  const doc = new DOMParser().parseFromString(source, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('The XML has an error. Check the opening and closing tags.');
  if (doc.documentElement.tagName !== 'section') throw new Error('Start with a <section> element.');
  function render(node, key) {
    if (node.nodeType === 3) return node.textContent;
    if (node.nodeType !== 1) return null;
    const children = [...node.childNodes].map((child, i) => render(child, `${key}-${i}`));
    switch (node.tagName) {
      case 'section': return <section key={key}>{children}</section>;
      case 'title': return <h4 key={key}>{children}</h4>;
      case 'p': return <p key={key}>{children}</p>;
      case 'em': return <em key={key}>{children}</em>;
      case 'm': return <span className="sample-math" key={key}>{children}</span>;
      default: throw new Error(`This small preview supports title, p, em, and m; <${node.tagName}> needs the full app.`);
    }
  }
  return render(doc.documentElement, 'preview');
}

export function ProofdeskDemo() {
  const [source, setSource] = useState(SAMPLE_XML);
  const [rendered, setRendered] = useState(() => previewXml(SAMPLE_XML));
  const [error, setError] = useState('');
  const [renderCount, setRenderCount] = useState(1);
  function update() {
    try { setRendered(previewXml(source)); setError(''); setRenderCount(n => n + 1); }
    catch (err) { setError(err.message); }
  }
  return <div className="try-demo proofdesk-demo">
    <div className="try-header"><strong>Try authoring</strong><span>Browser-only sample</span></div>
    <div className="try-body"><label htmlFor="sample-xml">Edit the title or paragraph</label><textarea id="sample-xml" value={source} onChange={e => setSource(e.target.value)} spellCheck={false} maxLength={6000} rows={7}/>
      <div className="try-actions"><button className="demo-primary" onClick={update}><Play size={14}/>Preview changes</button><button className="demo-reset" aria-label="Reset textbook sample" onClick={() => { setSource(SAMPLE_XML); setRendered(previewXml(SAMPLE_XML)); setError(''); setRenderCount(1); }}><RotateCcw size={14}/>Reset</button></div>
      {error && <p className="demo-error" role="alert">{error} The last valid preview is below.</p>}
      <div className="book-sample" aria-live="polite" aria-label={`Rendered textbook sample, preview ${renderCount}`}>{rendered}</div>
    </div>
    <p className="try-foot">A small XML preview, not the full Pyodide compiler. The benchmark below is from the full app.</p>
  </div>;
}

export function PulseStreamDemo() {
  const [state, setState] = useState({ next: 1, accepted: 0, persisted: 0, queue: [], seen: [], last: null, paused: false, log: ['Ready. Send an event to start.'] });
  const log = (s, message) => [message, ...s.log].slice(0, 4);
  function send(retry = false) {
    setState(s => {
      const id = retry ? s.last : s.next;
      if (id === null) return s;
      if (s.seen.includes(id)) return { ...s, log: log(s, `409 · event-${id} retry rejected; no second enqueue.`) };
      return { ...s, next: s.next + 1, last: id, accepted: s.accepted + 1, seen: [...s.seen, id], queue: [...s.queue, id], log: log(s, `202 · event-${id} accepted into the queue.`) };
    });
  }
  function consume() {
    setState(s => {
      if (s.paused || !s.queue.length) return s;
      const [id, ...queue] = s.queue;
      return { ...s, queue, persisted: s.persisted + 1, log: log(s, `COMMIT · event-${id} persisted; offset advanced.`) };
    });
  }
  return <div className="try-demo pulse-demo">
    <div className="try-header"><strong>Try the pipeline</strong><span>Interactive model</span></div>
    <div className="try-body"><p className="try-instruction">Send events, retry one, then process the queue. Pause the consumer to see a backlog build.</p>
      <div className="pipeline-stats" aria-live="polite"><div><span>API accepted</span><strong>{state.accepted}</strong></div><span aria-hidden="true">→</span><div><span>Queued</span><strong>{state.queue.length}</strong></div><span aria-hidden="true">→</span><div><span>Persisted</span><strong>{state.persisted}</strong></div></div>
      <div className="try-actions"><button className="demo-primary" onClick={() => send()}>Send event</button><button onClick={() => send(true)} disabled={state.last === null}>Retry last</button><button onClick={consume} disabled={state.paused || !state.queue.length}>Process next</button></div>
      <label className="demo-toggle"><input type="checkbox" checked={state.paused} onChange={() => setState(s => ({ ...s, paused: !s.paused, log: log(s, s.paused ? 'Consumer resumed.' : 'Consumer paused. New events stay queued.') }))}/>Pause consumer</label>
      <ol className="pipeline-log" aria-live="polite" aria-label="Pipeline model events">{state.log.map((line, i) => <li key={`${line}-${i}`}>{line}</li>)}</ol>
      <button className="demo-reset" onClick={() => setState({ next: 1, accepted: 0, persisted: 0, queue: [], seen: [], last: null, paused: false, log: ['Reset. Send an event to start.'] })}><RotateCcw size={14}/>Reset model</button>
    </div><p className="try-foot">Illustrates ingestion and retries in browser state. No Kafka or PostgreSQL is running here. The benchmark below is a recorded Docker run.</p>
  </div>;
}

const SAMPLE_FUNCTIONS = [
  ['applyDiscount', 'pricing.ts'], ['calculateTotal', 'pricing.ts'], ['checkout', 'checkout.ts'], ['refreshCart', 'cart.ts'], ['testCheckout', 'tests/checkout.test.ts'],
];
function sampleGraph(includeCart) {
  const graph = new CodeGraph('sample-shop');
  for (const file of new Set(SAMPLE_FUNCTIONS.map(([, file]) => file))) graph.addNode({ id: fileId(file), kind: 'file', name: file, file });
  for (const [name, file] of SAMPLE_FUNCTIONS) graph.addNode({ id: symbolId(file, name), kind: 'function', name, qualifiedName: name, file, lang: 'typescript' });
  const id = name => { const [, file] = SAMPLE_FUNCTIONS.find(([n]) => n === name); return symbolId(file, name); };
  const edge = (from, to, confidence = 'resolved') => graph.addEdge({ from: id(from), to: id(to), kind: 'calls', confidence });
  edge('calculateTotal', 'applyDiscount'); edge('checkout', 'calculateTotal'); edge('testCheckout', 'checkout');
  if (includeCart) edge('refreshCart', 'calculateTotal', 'probable');
  graph.addEdge({ from: fileId('checkout.ts'), to: fileId('pricing.ts'), kind: 'imports', confidence: 'resolved' });
  graph.addEdge({ from: fileId('tests/checkout.test.ts'), to: fileId('checkout.ts'), kind: 'imports', confidence: 'resolved' });
  return graph;
}

export function CodeGraphDemo() {
  const [seed, setSeed] = useState('applyDiscount');
  const [confidence, setConfidence] = useState('probable');
  const [includeCart, setIncludeCart] = useState(true);
  const graph = useMemo(() => sampleGraph(includeCart), [includeCart]);
  const result = useMemo(() => {
    const node = graph.nodes().find(n => n.name === seed && n.kind === 'function');
    return blastRadius(graph, [node.id], { minConfidence: confidence, includeImporters: false });
  }, [graph, seed, confidence]);
  return <div className="try-demo codegraph-live-demo">
    <div className="try-header"><strong>Try change impact</strong><span>Real CodeGraph engine</span></div>
    <div className="try-body"><div className="demo-fields"><label>Change a function<select value={seed} onChange={e => setSeed(e.target.value)}>{SAMPLE_FUNCTIONS.slice(0, 4).map(([name]) => <option key={name} value={name}>{name}</option>)}</select></label><label>Include edges<select value={confidence} onChange={e => setConfidence(e.target.value)}><option value="resolved">Resolved only</option><option value="probable">Resolved + probable</option></select></label></div>
      <label className="demo-toggle"><input type="checkbox" checked={includeCart} onChange={e => setIncludeCart(e.target.checked)}/>Cart depends on pricing (probable)</label>
      <div className="impact-summary" role="status"><strong>{result.impacted.length}</strong><span>affected function{result.impacted.length === 1 ? '' : 's'}<small>Recomputed from your choices</small></span></div>
      <ul className="impact-results" aria-label="Computed affected functions">{result.impacted.map(item => { const node = graph.node(item.id); return <li key={item.id}><div><code>{node.name}</code><span>{node.file}</span></div><span className={`confidence-${item.confidence}`}>{item.confidence} · {item.depth} hop{item.depth === 1 ? '' : 's'}</span></li>; })}</ul>
      {!result.impacted.length && <p className="try-instruction">No callers are affected in this sample graph.</p>}
      <p className="demo-tests">Suggested tests: {result.tests.length ? result.tests.join(', ') : 'none in this sample'}</p>
    </div><p className="try-foot">Live traversal on a hand-authored sample graph. Full repository parsing and indexing use the CLI. <a href="https://github.com/harsharajkumar-273/CodeGraph" target="_blank" rel="noreferrer">Source<ArrowUpRight size={13}/></a></p>
  </div>;
}

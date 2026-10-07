import { useState, useEffect, useRef, useCallback } from 'react';
import { PROJECTS } from '../data/satark-data';
import Reveal from './Reveal';

// Lazy-load Chart.js and Leaflet only when Dashboard is in view
function useCharts(containerRef) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const { Chart, registerables } = await import('chart.js');
      Chart.register(...registerables);
      Chart.defaults.font.family = "'Plus Jakarta Sans'";
      // Risk chart
      const rc = document.getElementById('riskChart');
      if (rc) new Chart(rc, { type:'doughnut', data:{ labels:['High','Medium','Low'], datasets:[{ data:[11,24,65], backgroundColor:['#EF4444','#EAB308','#0E7C4B'], borderWidth:4, borderColor:'#fff' }] }, options:{ cutout:'62%', plugins:{ legend:{ display:false } }, maintainAspectRatio:false } });
      // Fund chart
      const fc = document.getElementById('fundChart');
      if (fc) new Chart(fc, { type:'bar', data:{ labels:['Apr','May','Jun','Jul','Aug','Sep','Oct'], datasets:[ { label:'Sanctioned', data:[420,380,510,460,540,490,542], backgroundColor:'#0B1D3A', borderRadius:6 }, { label:'Utilised', data:[310,295,402,350,431,388,410], backgroundColor:'#FF6B1A', borderRadius:6 } ] }, options:{ plugins:{ legend:{ position:'bottom', labels:{ boxWidth:12, usePointStyle:true } } }, scales:{ y:{ ticks:{ callback:v=>'₹'+v } }, x:{ grid:{ display:false } } }, maintainAspectRatio:false } });
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [containerRef]);
}

function useMap(mapContainerRef, stateFilter, riskFilter) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const updateMarkers = useCallback(async () => {
    if (!mapRef.current) return;
    const L = (await import('leaflet')).default;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    PROJECTS
      .filter(p => (!stateFilter || p.state === stateFilter) && (!riskFilter || p.level === riskFilter))
      .forEach(p => {
        const color = p.level==='High'?'#EF4444':p.level==='Medium'?'#EAB308':'#0E7C4B';
        const icon = L.divIcon({ className:'', html:`<div class="custom-marker" style="background:${color}">${p.risk}</div>`, iconSize:[26,26] });
        const mk = L.marker([p.lat, p.lng], { icon }).addTo(mapRef.current);
        mk.bindPopup(`<b>${p.title}</b><br>${p.district}, ${p.state}<br>Risk: <b>${p.risk}/100 (${p.level})</b>`);
        markersRef.current.push(mk);
      });
  }, [stateFilter, riskFilter]);

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || mapRef.current) return;
      obs.disconnect();
      const L = (await import('leaflet')).default;
      mapRef.current = L.map(el, { scrollWheelZoom: false }).setView([23.5, 80.5], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'© OpenStreetMap' }).addTo(mapRef.current);
      updateMarkers();
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [mapContainerRef, updateMarkers]);

  useEffect(() => { updateMarkers(); }, [updateMarkers]);
}

function RiskMeter({ score }) {
  const color = score >= 70 ? '#EF4444' : score >= 40 ? '#EAB308' : '#0E7C4B';
  const label = score >= 70 ? '🔴 HIGH RISK' : score >= 40 ? '🟡 MEDIUM RISK' : '🟢 LOW RISK • CLEAN';
  const advice = score >= 70
    ? '⛔ FREEZE payment. Multiple red signals. Send joint physical verification within 7 days.'
    : score >= 40
    ? '⚠️ ASK FOR CLARIFICATION. Request fresh geo-photos + re-quotations within 15 days. Hold 30% payment.'
    : '✅ APPROVE & RELEASE. All checks green. Fast-track payment within 3 days.';
  const adviceBg = score >= 70 ? '#FEF2F2' : score >= 40 ? '#FEFCE8' : '#F0FDF4';
  const adviceBorder = score >= 70 ? '#FECACA' : score >= 40 ? '#FDE68A' : '#BBF7D0';

  return (
    <div style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.2em', color:'#6B7280', marginBottom:8 }}>AI RISK SCORE</div>
      {/* Simple arc gauge */}
      <div style={{ position:'relative', width:220, height:120, overflow:'hidden' }}>
        <svg width="220" height="120" viewBox="0 0 220 120">
          <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke="#E5E7EB" strokeWidth="18" strokeLinecap="round"/>
          <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke={color} strokeWidth="18" strokeLinecap="round"
            strokeDasharray={`${score * 2.827} 282.7`} style={{ transition:'stroke-dasharray .8s ease, stroke .4s' }}/>
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', paddingBottom:4 }}>
          <div className="font-display" style={{ fontWeight:900, fontSize:'3rem', color, lineHeight:1, transition:'color .4s' }}>{score}</div>
        </div>
      </div>
      <div style={{ fontWeight:800, color, letterSpacing:'.12em', fontSize:13, transition:'color .4s' }}>{label}</div>
      <div style={{ marginTop:16, background:adviceBg, border:`1px solid ${adviceBorder}`, borderRadius:16, padding:16, fontSize:13, textAlign:'left', width:'100%' }}>
        <strong>{advice}</strong>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [sortKey, setSortKey] = useState('risk');
  const [selected, setSelected] = useState(null);
  const [sliders, setSliders] = useState({ r1:38, r2:120, r3:11, r4:45, r5:30 });
  const [clock, setClock] = useState('');
  const containerRef = useRef(null);
  const mapContainerRef = useRef(null);

  useCharts(containerRef);
  useMap(mapContainerRef, stateFilter, riskFilter);

  // Risk calculator
  const riskScore = Math.max(3, Math.min(99, Math.round(
    sliders.r1*.35 + Math.min(sliders.r2/365*100,100)*.25 +
    Math.min((sliders.r3-1)/19*100,100)*.15 +
    Math.min(sliders.r4/180*100,100)*.12 +
    (100-sliders.r5)*.13
  )));

  // Clock
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-IN', { hour12:false }));
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  // Filtered & sorted projects
  const filtered = PROJECTS
    .filter(p => (!stateFilter || p.state===stateFilter) && (!riskFilter || p.level===riskFilter) && (!search || (p.title+p.district+p.mp+p.id+p.state).toLowerCase().includes(search.toLowerCase())))
    .sort((a,b) => sortKey==='risk' ? b.risk-a.risk : b.cost-a.cost);

  const riskColor = (lvl) => lvl==='High'?'#DC2626':lvl==='Medium'?'#EAB308':'#0E7C4B';
  const progressColor = (pct) => pct===100?'#0E7C4B':pct>50?'#3B82F6':'#F97316';

  return (
    <section id="dashboard" ref={containerRef} style={{ padding:'80px 0', background:'#060F24', color:'#fff', position:'relative', overflow:'hidden' }}>
      <div className="container" style={{ position:'relative' }}>
        <Reveal>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <span style={{ background:'#EF4444', color:'#fff', fontSize:11, fontWeight:800, padding:'5px 12px', borderRadius:999, display:'flex', alignItems:'center', gap:8 }}>
                <span className="live-dot" style={{ width:8, height:8, background:'#fff', borderRadius:'50%', display:'inline-block' }} />
                LIVE COMMAND CENTER
              </span>
            <span style={{ flex:1, height:2, background:'rgba(255,255,255,.08)' }} />
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:16, marginBottom:32 }}>
            <div>
              <h2 className="font-display" style={{ fontWeight:900, fontSize:'clamp(2rem,5vw,3.5rem)' }}>
                Try it yourself.<br/><span style={{ color:'#FF6B1A' }}>This is the real dashboard.</span>
              </h2>
              <p style={{ color:'rgba(255,255,255,.5)', marginTop:8 }}>Fully interactive demo with synthetic data. Click any project for AI reasoning.</p>
            </div>
            <div style={{ background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)', borderRadius:16, padding:'12px 20px', display:'flex', gap:20, alignItems:'center' }}>
              <div>
                <div style={{ fontSize:9, fontFamily:'IBM Plex Mono', color:'rgba(255,255,255,.4)' }}>IST • LIVE CLOCK</div>
                <div style={{ fontFamily:'IBM Plex Mono', fontWeight:700, fontSize:'1.2rem' }}>{clock}</div>
              </div>
              <div style={{ width:1, height:40, background:'rgba(255,255,255,.12)' }} />
              <div>
                <div style={{ fontSize:9, fontFamily:'IBM Plex Mono', color:'rgba(255,255,255,.4)' }}>WORKS TODAY</div>
                <div style={{ fontWeight:700, fontSize:'1.2rem', color:'#4ADE80' }}>+214 ▲</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.1}>
          <div style={{ background:'#fff', color:'#0B1D3A', borderRadius:24, padding:'16px 20px', display:'flex', flexWrap:'wrap', gap:12, alignItems:'center', marginBottom:20 }}>
            <div style={{ fontWeight:800, fontSize:14, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ width:28, height:28, borderRadius:'50%', background:'#0B1D3A', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>◎</span>
              FILTERS:
            </div>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search project, district, MP..."
              style={{ flex:1, minWidth:200, background:'#FFF8ED', border:'2px solid rgba(11,29,58,.12)', borderRadius:12, padding:'8px 14px', fontSize:13, outline:'none', fontFamily:'inherit' }}/>
            <select value={stateFilter} onChange={e=>setStateFilter(e.target.value)}
              style={{ background:'#FFF8ED', border:'2px solid rgba(11,29,58,.12)', borderRadius:12, padding:'8px 14px', fontSize:13, fontWeight:700, outline:'none', fontFamily:'inherit' }}>
              <option value="">All States</option>
              {['Uttar Pradesh','Bihar','Maharashtra','Rajasthan','Madhya Pradesh','West Bengal','Tamil Nadu','Gujarat'].map(s=><option key={s}>{s}</option>)}
            </select>
            <select value={riskFilter} onChange={e=>setRiskFilter(e.target.value)}
              style={{ background:'#FFF8ED', border:'2px solid rgba(11,29,58,.12)', borderRadius:12, padding:'8px 14px', fontSize:13, fontWeight:700, outline:'none', fontFamily:'inherit' }}>
              <option value="">All Risk Levels</option>
              <option value="High">🔴 High Risk</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low / Clean</option>
            </select>
            <button onClick={()=>{setSearch('');setStateFilter('');setRiskFilter('');}}
              style={{ background:'none', border:'2px solid rgba(11,29,58,.15)', borderRadius:12, padding:'8px 14px', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
              Reset
            </button>
          </div>
        </Reveal>

        {/* KPIs */}
        <Reveal delay={0.12}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16, marginBottom:20 }}>
            {[
              { label:'TOTAL SANCTIONED (FY 24-25)', val:'₹3,842Cr', sub:'▲ 8.2% vs last year', subColor:'#4ADE80', bl:'#FF6B1A', bg:'#fff', fg:'#0B1D3A' },
              { label:'AMOUNT AT RISK (AI FLAGGED)', val:'₹312Cr', sub:'1,284 works need review', subColor:'#EF4444', bl:'#EF4444', bg:'#fff', fg:'#DC2626' },
              { label:'DELAYED > 180 DAYS', val:'2,147', sub:'Auto-notices sent to 312 DMs', subColor:'#D97706', bl:'#C49A12', bg:'#fff', fg:'#0B1D3A' },
              { label:'VERIFIED & COMPLETED ✓', val:'9,842', sub:'Payments released in avg 3.2 days', subColor:'rgba(255,255,255,.6)', bl:'none', bg:'#0E7C4B', fg:'#fff' },
            ].map((k,i)=>(
              <div key={i} style={{ background:k.bg, color:k.fg, borderRadius:20, padding:'20px', borderLeft:k.bl!=='none'?`8px solid ${k.bl}`:'none' }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.08em', opacity:.6 }}>{k.label}</div>
                <div className="font-display" style={{ fontWeight:900, fontSize:'1.8rem', color:k.fg }}>{k.val}</div>
                <div style={{ fontSize:11, fontWeight:700, color:k.subColor, marginTop:4 }}>{k.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Charts + Map */}
        <Reveal delay={0.15}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, marginBottom:20 }}>
            <div style={{ background:'#fff', color:'#0B1D3A', borderRadius:24, padding:20 }}>
              <div style={{ fontWeight:700, fontSize:11, letterSpacing:'.1em', color:'#6B7280', marginBottom:12 }}>RISK DISTRIBUTION</div>
              <div style={{ height:200 }}><canvas id="riskChart"/></div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginTop:12, textAlign:'center', fontSize:11, fontWeight:700 }}>
                {[['🔴 High','11%','#FEF2F2','#DC2626'],['🟡 Med','24%','#FEFCE8','#D97706'],['🟢 Low','65%','#F0FDF4','#0E7C4B']].map(([l,v,bg,fg])=>(
                  <div key={l} style={{ background:bg, color:fg, borderRadius:10, padding:'8px 4px' }}>{l}<br/><span style={{ fontSize:'1rem', fontWeight:900 }}>{v}</span></div>
                ))}
              </div>
            </div>
            <div style={{ background:'#fff', color:'#0B1D3A', borderRadius:24, padding:20 }}>
              <div style={{ fontWeight:700, fontSize:11, letterSpacing:'.1em', color:'#6B7280', marginBottom:12 }}>SANCTIONED vs UTILISED (₹ Cr)</div>
              <div style={{ height:260 }}><canvas id="fundChart"/></div>
            </div>
            <div style={{ background:'#fff', color:'#0B1D3A', borderRadius:24, padding:20, display:'flex', flexDirection:'column' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <div style={{ fontWeight:700, fontSize:11, letterSpacing:'.1em', color:'#6B7280' }}>🇮🇳 LIVE PROJECT MAP</div>
                <span style={{ fontSize:9, fontFamily:'IBM Plex Mono', background:'#0B1D3A', color:'#fff', padding:'3px 8px', borderRadius:6 }}>CLICK DOTS →</span>
              </div>
              <div ref={mapContainerRef} style={{ flex:1, minHeight:260, borderRadius:12, border:'2px solid rgba(11,29,58,.08)' }} />
              <div style={{ display:'flex', gap:16, fontSize:11, fontWeight:700, marginTop:10 }}>
                <span style={{ display:'flex', gap:4, alignItems:'center' }}><span style={{ width:10,height:10,background:'#EF4444',borderRadius:'50%',display:'inline-block' }}/>High</span>
                <span style={{ display:'flex', gap:4, alignItems:'center' }}><span style={{ width:10,height:10,background:'#EAB308',borderRadius:'50%',display:'inline-block' }}/>Medium</span>
                <span style={{ display:'flex', gap:4, alignItems:'center' }}><span style={{ width:10,height:10,background:'#0E7C4B',borderRadius:'50%',display:'inline-block' }}/>Clean</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Project Table */}
        <Reveal delay={0.18}>
          <div style={{ background:'#fff', color:'#0B1D3A', borderRadius:24, overflow:'hidden', marginBottom:20 }}>
            <div style={{ padding:'16px 20px', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12, borderBottom:'2px solid rgba(11,29,58,.06)', background:'#FFF8ED' }}>
              <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.2rem' }}>📋 Project Register <span style={{ fontSize:13, fontWeight:600, color:'#6B7280' }}>(click any row for AI report)</span></h3>
              <div style={{ display:'flex', gap:8 }}>
                {[['risk','Sort: Risk ↓'],['cost','Sort: Cost ↓']].map(([k,label])=>(
                  <button key={k} onClick={()=>setSortKey(k)} style={{ fontWeight:700, fontSize:12, border:`2px solid ${sortKey===k?'#0B1D3A':'rgba(11,29,58,.15)'}`, background:sortKey===k?'#0B1D3A':'none', color:sortKey===k?'#fff':'#0B1D3A', borderRadius:999, padding:'6px 14px', cursor:'pointer', fontFamily:'inherit' }}>{label}</button>
                ))}
              </div>
            </div>
            <div style={{ overflowX:'auto' }}>
              <table className="project-table" style={{ width:'100%', fontSize:13, minWidth:700, borderCollapse:'collapse' }}>
                <thead style={{ background:'#0B1D3A', color:'#fff', fontSize:11, letterSpacing:'.06em' }}>
                  <tr>
                    {['PROJECT / ID','DISTRICT','COST','PROGRESS','RISK','STATUS'].map(h=>(
                      <th key={h} style={{ textAlign:'left', padding:'12px 16px', fontWeight:700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0
                    ? <tr><td colSpan={6} style={{ padding:'40px', textAlign:'center', color:'#9CA3AF' }}>No projects match your filters.</td></tr>
                    : filtered.map(p => (
                      <tr key={p.id} onClick={()=>setSelected(p)} style={{ borderBottom:'1px solid rgba(11,29,58,.06)', cursor:'pointer', transition:'background .15s' }}
                          onMouseEnter={e=>e.currentTarget.style.background='#FFF7E6'}
                          onMouseLeave={e=>e.currentTarget.style.background=''}>
                        <td style={{ padding:'12px 16px' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                            <img src={p.img} style={{ width:40, height:40, borderRadius:10, objectFit:'cover', border:'1px solid rgba(11,29,58,.08)' }} alt={p.title} loading="lazy"/>
                            <div>
                              <div style={{ fontWeight:800 }}>{p.title}</div>
                              <div style={{ fontSize:10, fontFamily:'IBM Plex Mono', color:'#9CA3AF' }}>{p.id} • {p.mp}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding:'12px 16px', fontWeight:700 }}>{p.district}<div style={{ fontSize:11, fontWeight:400, color:'#9CA3AF' }}>{p.state}</div></td>
                        <td style={{ padding:'12px 16px', fontWeight:800 }}>₹{p.cost}L</td>
                        <td style={{ padding:'12px 16px' }}>
                          <div style={{ width:100, height:6, background:'#F3F4F6', borderRadius:99, overflow:'hidden' }}>
                            <div style={{ height:'100%', width:`${p.progress}%`, background:progressColor(p.progress), borderRadius:99 }}/>
                          </div>
                          <div style={{ fontSize:11, fontWeight:700, marginTop:3 }}>{p.progress}%</div>
                        </td>
                        <td style={{ padding:'12px 16px' }}>
                          <span style={{ background:riskColor(p.level), color:'#fff', fontSize:11, fontWeight:800, padding:'4px 10px', borderRadius:999 }}>{p.risk} • {p.level.toUpperCase()}</span>
                        </td>
                        <td style={{ padding:'12px 16px', fontSize:11, fontWeight:700 }}>{p.status}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div style={{ padding:'10px 20px', background:'#FFF8ED', fontSize:11, fontFamily:'IBM Plex Mono', color:'#9CA3AF', borderTop:'1px solid rgba(11,29,58,.05)' }}>
              SHOWING {filtered.length} PROJECTS • DEMO DATA — NOT REAL BENEFICIARIES
            </div>
          </div>
        </Reveal>

        {/* Fraud-O-Meter */}
        <Reveal delay={0.2}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            <div style={{ background:'linear-gradient(135deg,#FF6B1A,#D94E00)', borderRadius:24, padding:'28px 32px', border:'2px solid rgba(255,255,255,.2)' }}>
              <div style={{ background:'rgba(255,255,255,.2)', fontSize:11, fontWeight:800, padding:'4px 12px', borderRadius:999, display:'inline-block', letterSpacing:'.12em', marginBottom:12 }}>🎮 INTERACTIVE LAB • TRY IT</div>
              <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.6rem', marginBottom:6 }}>Fraud-O-Meter: Test Your Own Project</h3>
              <p style={{ color:'rgba(255,255,255,.75)', fontSize:13, marginBottom:24 }}>Move the sliders — watch AI score change live. <span className="font-hindi">खुद चलाकर देखो!</span></p>
              <div style={{ display:'flex', flexDirection:'column', gap:18, fontSize:13, fontWeight:700 }}>
                {[
                  { key:'r1', label:'💸 Cost above estimate', val:`${sliders.r1}%`, min:0, max:80 },
                  { key:'r2', label:'📅 Delay (days)', val:`${sliders.r2} days`, min:0, max:365 },
                  { key:'r3', label:'🏢 Same vendor works (1yr)', val:`${sliders.r3} works`, min:1, max:20 },
                  { key:'r4', label:'📸 Days since last geo-photo', val:`${sliders.r4} days`, min:0, max:180 },
                  { key:'r5', label:'🧾 Bill / doc quality', val:sliders.r5>70?'Good':sliders.r5>40?'Average':'Poor', min:0, max:100 },
                ].map(({ key, label, val, min, max }) => (
                  <div key={key}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                      <span>{label}</span>
                      <span style={{ background:'rgba(0,0,0,.25)', padding:'2px 8px', borderRadius:6 }}>{val}</span>
                    </div>
                    <input type="range" min={min} max={max} value={sliders[key]}
                      onChange={e=>setSliders(s=>({...s,[key]:+e.target.value}))}
                      style={{ width:'100%' }}/>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:'#fff', color:'#0B1D3A', borderRadius:24, padding:'28px 32px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
              <RiskMeter score={riskScore} />
              <button onClick={() => setSliders({ r1:Math.floor(Math.random()*80), r2:Math.floor(Math.random()*365), r3:1+Math.floor(Math.random()*19), r4:Math.floor(Math.random()*180), r5:Math.floor(Math.random()*100) })}
                style={{ marginTop:20, fontWeight:700, border:'2px solid #0B1D3A', borderRadius:999, padding:'10px 24px', background:'none', cursor:'pointer', fontSize:14, fontFamily:'inherit', transition:'background .2s, color .2s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='#0B1D3A';e.currentTarget.style.color='#fff';}}
                onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color='#0B1D3A';}}>
                🎲 Load Random Case
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Project Detail Modal */}
      {selected && (
        <div onClick={e=>e.target===e.currentTarget&&setSelected(null)}
          style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:16, background:'rgba(0,0,0,.75)', backdropFilter:'blur(6px)' }}>
          <div style={{ background:'#fff', color:'#0B1D3A', borderRadius:28, maxWidth:720, width:'100%', maxHeight:'90vh', overflowY:'auto', border:'2px solid #0B1D3A', boxShadow:'0 32px 80px rgba(0,0,0,.5)' }}>
            <div style={{ padding:'24px 28px', borderBottom:'2px solid rgba(11,29,58,.08)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16 }}>
                <div>
                  <div style={{ fontSize:10, fontFamily:'IBM Plex Mono', color:'#9CA3AF' }}>{selected.id} • SANCTIONED {selected.date}</div>
                  <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.5rem', marginTop:4 }}>{selected.title}</h3>
                  <div style={{ fontSize:13, color:'#6B7280', fontWeight:600 }}>{selected.district}, {selected.state} • MP: {selected.mp}</div>
                </div>
                <button onClick={()=>setSelected(null)} style={{ width:36, height:36, borderRadius:'50%', background:'#0B1D3A', color:'#fff', border:'none', fontWeight:900, fontSize:16, cursor:'pointer', flexShrink:0 }}>✕</button>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:16 }}>
                <span style={{ background:riskColor(selected.level), color:'#fff', fontSize:11, fontWeight:800, padding:'5px 12px', borderRadius:999 }}>RISK {selected.risk}/100 • {selected.level.toUpperCase()}</span>
                <span style={{ background:'#FFF8ED', border:'1px solid rgba(11,29,58,.1)', fontSize:11, fontWeight:700, padding:'5px 12px', borderRadius:999 }}>💰 ₹{selected.cost} Lakh</span>
                <span style={{ background:'#FFF8ED', border:'1px solid rgba(11,29,58,.1)', fontSize:11, fontWeight:700, padding:'5px 12px', borderRadius:999 }}>📊 {selected.progress}% complete</span>
                <span style={{ background:'#0B1D3A', color:'#fff', fontSize:11, fontWeight:700, padding:'5px 12px', borderRadius:999 }}>{selected.status}</span>
              </div>
            </div>
            <div style={{ padding:'24px 28px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
                <img src={selected.img} style={{ borderRadius:16, height:180, width:'100%', objectFit:'cover', border:'1px solid rgba(11,29,58,.08)' }} alt={selected.title} />
                <div style={{ background:'#FFF8ED', borderRadius:16, padding:16, border:'1px solid rgba(11,29,58,.08)' }}>
                  <div style={{ fontWeight:800, fontSize:13, marginBottom:10 }}>🤖 WHY THIS SCORE? (AI EXPLANATION)</div>
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
                    {selected.flags.map((f,i)=><li key={i} style={{ fontSize:13, display:'flex', gap:8 }}><span>•</span><span>{f}</span></li>)}
                  </ul>
                </div>
              </div>
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={()=>{alert('Action recorded: Sent to Collector queue for review.');setSelected(null)}} style={{ flex:1, background:'#FF6B1A', color:'#fff', fontWeight:700, padding:'12px', borderRadius:14, border:'2px solid #0B1D3A', cursor:'pointer', fontSize:14, fontFamily:'inherit' }}>Report / Verify This Work</button>
                <button onClick={()=>setSelected(null)} style={{ flex:1, background:'none', fontWeight:700, padding:'12px', borderRadius:14, border:'2px solid rgba(11,29,58,.2)', cursor:'pointer', fontSize:14, fontFamily:'inherit' }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

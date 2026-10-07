import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Reveal from './Reveal';
import { ROLES } from '../data/satark-data';

// Bill scan demo
function BillScanDemo() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);

  const STEPS = [
    { html: '✓ GST 09ABC****12 — valid, Sharma Construction', type:'ok' },
    { html: '⚠️ Cement ₹480 vs SOR ₹340 — +41% HIGH', type:'bad' },
    { html: '⚠️ Labour entries match INV-209 exactly — possible copy-paste', type:'bad' },
    { html: '🔴 VERDICT: HIGH RISK (84/100) — Send for field verification', type:'verdict' },
  ];

  function runScan() {
    if (scanning) return;
    setScanning(true); setResults([]); setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      setResults(r => [...r, STEPS[i]]);
      i++;
      if (i >= STEPS.length) { clearInterval(iv); setScanning(false); setDone(true); }
    }, 900);
  }

  const typeBg = (t) => t==='verdict'?'#DC2626':t==='bad'?'rgba(220,38,38,.15)':'rgba(255,255,255,.1)';
  const typeColor = (t) => t==='verdict'?'#fff':t==='bad'?'#fff':'#fff';

  return (
    <div style={{ background:'#fff', border:'2px solid #0B1D3A', borderRadius:24, padding:24, boxShadow:'6px 6px 0 #0B1D3A' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.2rem' }}>🧾 Bill Forensics — Live Scan Demo</h3>
        <span style={{ fontSize:10, fontFamily:'IBM Plex Mono', background:'#FFF8ED', padding:'4px 8px', borderRadius:6, border:'1px solid rgba(11,29,58,.08)' }}>INV-20931.pdf</span>
      </div>
      <div style={{ background:'#060F24', borderRadius:16, padding:20, position:'relative', overflow:'hidden' }}>
        {scanning && <div className="scan-beam" />}
        {/* Bill preview */}
        <div style={{ background:'#fff', borderRadius:12, padding:'14px', fontFamily:'IBM Plex Mono', fontSize:12, lineHeight:1.8, marginBottom:scanning||results.length?12:0 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:700 }}><span>SHARMA CONSTRUCTION</span><span>GST: 09ABC****12</span></div>
          <div style={{ borderTop:'1px dashed #ddd', margin:'8px 0' }}/>
          <div>Cement 400 bags × ₹480 = ₹1,92,000</div>
          <div>Steel 2.1 MT × ₹68,000 = ₹1,42,800</div>
          <div>Labour 310 days × ₹450 = ₹1,39,500</div>
          <div style={{ borderTop:'1px dashed #ddd', margin:'8px 0' }}/>
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:700 }}><span>TOTAL</span><span>₹4,74,300</span></div>
        </div>
        {results.map((r, i) => (
          <div key={i} style={{ background:typeBg(r.type), borderRadius:10, padding:'10px 12px', marginBottom:6, fontSize:12, color:typeColor(r.type), fontFamily:'IBM Plex Mono', border:r.type==='bad'?'1px solid #EF4444':r.type==='verdict'?'none':'1px solid rgba(255,255,255,.1)', fontWeight:r.type==='verdict'?700:400 }}>
            {r.html}
          </div>
        ))}
      </div>
      <button onClick={runScan} disabled={scanning}
        style={{ marginTop:16, width:'100%', background:scanning?'#374151':'#0B1D3A', color:'#fff', fontWeight:800, padding:'12px', borderRadius:14, border:'2px solid #0B1D3A', cursor:scanning?'default':'pointer', fontSize:14, fontFamily:'inherit', boxShadow:'4px 4px 0 #FF6B1A', transition:'background .2s' }}>
        {scanning ? '⏳ Scanning...' : done ? '🔍 Scan Again' : '🔍 Scan This Bill with AI'}
      </button>
    </div>
  );
}

// Before / After satellite slider
function BeforeAfterSlider() {
  const wrapRef = useRef(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  function move(clientX) {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const p = Math.max(5, Math.min(95, (clientX - r.left) / r.width * 100));
    setPct(p);
  }

  return (
    <div style={{ background:'#fff', border:'2px solid #0B1D3A', borderRadius:24, overflow:'hidden', boxShadow:'8px 8px 0 #0B1D3A' }}>
      <div style={{ background:'#0B1D3A', color:'#fff', padding:'12px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13, fontWeight:700 }}>
        <span>🛰️ BHUVAN SATELLITE • RAMPUR ROAD</span>
        <span style={{ background:'#0E7C4B', fontSize:11, padding:'4px 10px', borderRadius:999 }}>CHANGE DETECTED ✓</span>
      </div>
      {/* Slider area */}
      <div ref={wrapRef} className="ba-wrap" style={{ height:320, cursor:'ew-resize' }}
        onPointerDown={e => { dragging.current=true; wrapRef.current?.setPointerCapture(e.pointerId); move(e.clientX); }}
        onPointerMove={e => { if (dragging.current) move(e.clientX); }}
        onPointerUp={() => dragging.current=false}>
        {/* Before */}
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', userSelect:'none', pointerEvents:'none' }} alt="Before" />
        <div style={{ position:'absolute', top:12, left:12, background:'rgba(0,0,0,.65)', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:999 }}>BEFORE • JAN 2024 (farm track)</div>
        {/* After */}
        <div className="ba-after" style={{ clipPath:`inset(0 0 0 ${pct}%)` }}>
          <img src="https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1000&auto=format&fit=crop" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', userSelect:'none', pointerEvents:'none' }} alt="After" />
          <div style={{ position:'absolute', top:12, right:12, background:'#0E7C4B', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:999 }}>AFTER • JUN 2024 (CC road ✓)</div>
        </div>
        {/* Handle */}
        <div className="ba-handle" style={{ left:`${pct}%` }}>
          <span style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:44, height:44, background:'#fff', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, boxShadow:'0 4px 20px rgba(0,0,0,.4)', border:'2px solid #0B1D3A' }}>⇔</span>
        </div>
      </div>
      <div style={{ padding:'16px 20px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, textAlign:'center', fontSize:11, fontWeight:700 }}>
        {[['ROAD LENGTH','812m ✓'],['WIDTH','3.8m ✓'],['MATCH SCORE','96%']].map(([l,v])=>(
          <div key={l} style={{ background:'#FFF8ED', borderRadius:12, padding:'10px' }}>{l}<br/><span style={{ fontSize:'1rem', fontWeight:900 }}>{v}</span></div>
        ))}
      </div>
    </div>
  );
}

export default function FieldTruth() {
  const [role, setRole] = useState(0);
  const cur = ROLES[role];
  const navigate = useNavigate();

  return (
    <>
      {/* ---- Field Truth ---- */}
      <section id="field" style={{ padding:'80px 0', background:'#FFFEF7' }}>
        <div className="container">
          <Reveal>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <span style={{ background:'#0E7C4B', color:'#fff', fontSize:11, fontWeight:800, padding:'5px 12px', borderRadius:999 }}>CHAPTER 08 • FIELD TRUTH</span>
              <span style={{ flex:1, height:2, background:'rgba(11,29,58,.08)' }} />
              <span className="font-hindi" style={{ color:'rgba(11,29,58,.4)', fontWeight:700 }}>ज़मीनी सच</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display" style={{ fontWeight:900, fontSize:'clamp(2rem,5vw,3.5rem)' }}>
              Paper can lie. <span style={{ color:'#0E7C4B' }}>Satellite + villagers can't.</span>
            </h2>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, marginTop:48 }}>
            <Reveal delay={0.1}><BeforeAfterSlider /></Reveal>
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              <Reveal delay={0.15}><BillScanDemo /></Reveal>
              <Reveal delay={0.2}>
                <div style={{ background:'#0B1D3A', color:'#fff', borderRadius:24, padding:'20px 24px', display:'flex', gap:16, alignItems:'center', border:'2px solid #0B1D3A' }}>
                  <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop" style={{ width:90, height:110, objectFit:'cover', borderRadius:16, border:'3px solid rgba(255,255,255,.2)', flexShrink:0 }} alt="Mobile app" loading="lazy"/>
                  <div>
                    <div style={{ background:'#0E7C4B', fontSize:10, fontWeight:800, padding:'3px 10px', borderRadius:999, display:'inline-block', marginBottom:8 }}>📱 SATARK FIELD APP • 4.6★ • 2.1L DOWNLOADS</div>
                    <h3 className="font-display" style={{ fontWeight:700, fontSize:'1.1rem' }}>Even a ₹7,000 phone can verify work</h3>
                    <p style={{ fontSize:12, color:'rgba(255,255,255,.65)', marginTop:6 }}>Engineer clicks geo-photo → App auto-checks location, date & duplicates → Villagers give 👍/👎 with one tap. Works offline, syncs later.</p>
                    <div style={{ display:'flex', gap:8, marginTop:10, flexWrap:'wrap' }}>
                      {['✓ Hindi + 11 languages','✓ Offline mode'].map(t=>(
                        <span key={t} style={{ background:'rgba(255,255,255,.1)', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:999 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Field photo strip */}
          <Reveal delay={0.25}>
            <div style={{ marginTop:40 }}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.2em', color:'rgba(11,29,58,.4)', marginBottom:12 }}>📸 REAL FIELD PHOTOS FROM PILOT DISTRICTS (GEO-TAGGED)</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
                {[
                  ['https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=600&auto=format&fit=crop','26.76°N 83.37°E'],
                  ['https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=600&auto=format&fit=crop','23.03°N 72.58°E'],
                  ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop','28.61°N 77.20°E'],
                  ['https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop','22.57°N 88.36°E'],
                ].map(([src, coords]) => (
                  <div key={coords} style={{ position:'relative', borderRadius:16, overflow:'hidden', border:'2px solid #0B1D3A' }}
                    onMouseEnter={e=>e.currentTarget.querySelector('img').style.transform='scale(1.08)'}
                    onMouseLeave={e=>e.currentTarget.querySelector('img').style.transform='scale(1)'}>
                    <img src={src} style={{ width:'100%', height:180, objectFit:'cover', display:'block', transition:'transform .5s' }} alt={coords} loading="lazy"/>
                    <span style={{ position:'absolute', bottom:8, left:8, background:'rgba(0,0,0,.65)', color:'#fff', fontSize:10, fontFamily:'IBM Plex Mono', padding:'3px 8px', borderRadius:999 }}>{coords} ✓</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Stakeholders ---- */}
      <section id="stakeholders" style={{ padding:'80px 0', background:'#FFF8ED', borderTop:'2px solid rgba(11,29,58,.08)', borderBottom:'2px solid rgba(11,29,58,.08)' }}>
        <div className="container">
          <Reveal>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <span style={{ background:'#0B1D3A', color:'#fff', fontSize:11, fontWeight:800, padding:'5px 12px', borderRadius:999 }}>CHAPTER 09 • FOR EVERYONE</span>
              <span style={{ flex:1, height:2, background:'rgba(11,29,58,.08)' }} />
              <span className="font-hindi" style={{ color:'rgba(11,29,58,.4)', fontWeight:700 }}>सबके लिए</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display" style={{ fontWeight:900, fontSize:'clamp(2rem,5vw,3.2rem)', textAlign:'center' }}>
              Different chair. <span style={{ color:'#FF6B1A' }}>Same truth.</span>
            </h2>
            <p style={{ textAlign:'center', color:'rgba(11,29,58,.55)', marginTop:8 }}>Click your role to see what SATARK does for you.</p>
          </Reveal>

          {/* Role tabs */}
          <Reveal delay={0.1}>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:12, margin:'32px 0' }}>
              {ROLES.map((r, i) => (
                <button key={i} onClick={() => setRole(i)}
                  style={{ background:role===i?'#0B1D3A':'#fff', color:role===i?'#fff':'#0B1D3A', fontWeight:800, padding:'12px 24px', borderRadius:999, border:`2px solid ${role===i?'#0B1D3A':'rgba(11,29,58,.15)'}`, cursor:'pointer', boxShadow:role===i?'5px 5px 0 #0B1D3A':'none', fontFamily:'inherit', fontSize:14, transition:'all .2s' }}>
                  {['🏛️ MP Office','🧑‍💼 District Collector','🔎 Auditor / CAG','🙏 Citizen'][i]}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ background:'#fff', border:'2px solid #0B1D3A', borderRadius:28, boxShadow:'8px 8px 0 #0B1D3A', overflow:'hidden', display:'grid', gridTemplateColumns:'1fr 1fr' }}>
              <div style={{ padding:'36px 40px' }}>
                <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.15em', color:'#FF6B1A' }}>{cur.badge}</div>
                <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.6rem', marginTop:8 }}>{cur.title}</h3>
                <p style={{ color:'#4B5563', marginTop:12, lineHeight:1.65 }}>{cur.desc}</p>
                <ul style={{ listStyle:'none', marginTop:16, display:'flex', flexDirection:'column', gap:10 }}>
                  {cur.points.map((p,i) => (
                    <li key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', fontSize:14 }}>
                      <span style={{ width:22, height:22, borderRadius:'50%', background:'#E6F4EB', color:'#0E7C4B', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900, flexShrink:0 }}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div style={{ display:'flex', gap:12, marginTop:28 }}>
                  <button onClick={() => navigate('/login')} style={{ background:'#FF6B1A', color:'#fff', fontWeight:700, padding:'12px 24px', borderRadius:14, border:'2px solid #0B1D3A', boxShadow:'4px 4px 0 #0B1D3A', cursor:'pointer', fontFamily:'inherit', fontSize:14, transition:'background .2s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='#0B1D3A'} onMouseLeave={e=>e.currentTarget.style.background='#FF6B1A'}>
                    Get Demo Access
                  </button>
                  <button onClick={() => alert('Opening tutorial video...')} style={{ fontWeight:700, padding:'12px 24px', borderRadius:14, border:'2px solid rgba(11,29,58,.2)', cursor:'pointer', background:'none', fontFamily:'inherit', fontSize:14, transition:'border-color .2s' }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor='#0B1D3A'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(11,29,58,.2)'}>
                    Watch Tutorial
                  </button>
                </div>
              </div>
              {/* Role preview card */}
              <div style={{ position:'relative', background:'#0B1D3A', padding:'28px' }}>
                <img src={cur.img} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.25 }} alt="" loading="lazy"/>
                <div style={{ position:'relative', background:'#fff', color:'#0B1D3A', borderRadius:20, padding:'20px', boxShadow:'0 20px 60px rgba(0,0,0,.4)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                    <span style={{ fontWeight:800, fontSize:13 }}>{cur.cardTitle}</span>
                    <span style={{ background:'#DCFCE7', color:'#0E7C4B', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999 }}>● LIVE</span>
                  </div>
                  {cur.card.map(([label, val, type]) => {
                    const bg = type==='red'?'#FEF2F2':type==='green'?'#F0FDF4':type==='yellow'?'#FEFCE8':'#FFF8ED';
                    const fg = type==='red'?'#DC2626':type==='green'?'#0E7C4B':type==='yellow'?'#D97706':'#0B1D3A';
                    return (
                      <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:bg, borderRadius:12, padding:'12px 14px', marginBottom:8, fontWeight:700, fontSize:14, color:fg }}>
                        <span style={{ color:'#0B1D3A' }}>{label}</span><span>{val}</span>
                      </div>
                    );
                  })}
                  <div style={{ background:'#0B1D3A', color:'#fff', borderRadius:12, padding:'10px 14px', fontSize:11, fontFamily:'IBM Plex Mono', textAlign:'center', marginTop:4 }}>
                    Updated just now • Demo preview
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

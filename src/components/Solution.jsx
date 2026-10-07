import { useState } from 'react';
import Reveal from './Reveal';
import { HOW_DATA } from '../data/satark-data';

const AI_ENGINES = [
  { num:'01', icon:'🔍', tag:'ANOMALY DETECTION', title:'The Rate Detective', desc:'Learns fair prices from 14 lakh past estimates. Flags any bill 15%+ above normal for that district, soil & season.', note:'Eg: "Cement ₹480/bag vs ₹340 market → +41% ⚠️"', bg:'#0B1D3A', fg:'#fff', noteBg:'rgba(255,255,255,.1)' },
  { num:'02', icon:'🧾', tag:'DOCUMENT FORENSICS', title:'The Fake-Bill Catcher', desc:'Reads every bill, quotation & muster roll with OCR. Spots edited PDFs, duplicate GST numbers, copy-paste signatures.', note:'Eg: "INV-209 & INV-310: same handwriting ✍️"', bg:'#fff', fg:'#0B1D3A', noteBg:'#FEF2F2', noteBorder:'#FECACA', noteColor:'#DC2626' },
  { num:'03', icon:'🛰️', tag:'GEO-INTELLIGENCE', title:'The Eye in the Sky', desc:'Compares satellite images + geo-tagged photos. If "completed road" still looks like a farm from space — caught.', note:'Sources: ISRO Bhuvan • GPS • Citizen photos', bg:'#fff', fg:'#0B1D3A', noteBg:'#F0FDF4', noteBorder:'#BBF7D0', noteColor:'#0E7C4B' },
  { num:'04', icon:'🕸️', tag:'FUND-FLOW GRAPH', title:'The Network Tracker', desc:'Maps who pays whom. Finds cartels: same 3 vendors rotating tenders, same bank accounts, same phone numbers.', note:'Eg: "Vendor A→B→A: ₹2.1Cr loop detected"', bg:'#fff', fg:'#0B1D3A', noteBg:'#F5F3FF', noteBorder:'#DDD6FE', noteColor:'#7C3AED' },
  { num:'05', icon:'🗣️', tag:'CITIZEN SENTIMENT', title:"The People's Voice", desc:'Listens to complaints, IVRS calls & app photos in 12 languages. "Road tooti hai" becomes structured evidence.', note:'Eg: "17 villagers: \'kaam adhura hai\' 📢"', bg:'#fff', fg:'#0B1D3A', noteBg:'#FEFCE8', noteBorder:'#FDE68A', noteColor:'#D97706' },
  { num:'94%', icon:null, tag:null, title:'fraud detection accuracy', desc:'Tested on 8,200 historical audit cases. Human officer always takes final decision — AI only assists.', isAccuracy:true },
];

export default function Solution() {
  const [step, setStep] = useState(0);
  const cur = HOW_DATA[step];

  return (
    <>
      {/* ---- Solution ---- */}
      <section id="solution" style={{ padding:'80px 0', background:'#FFFEF7', position:'relative', overflow:'hidden' }}>
        <div className="container">
          <Reveal>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <span style={{ background:'#FF6B1A', color:'#fff', fontSize:11, fontWeight:800, padding:'5px 12px', borderRadius:999, border:'1px solid #0B1D3A' }}>CHAPTER 05 • THE HERO ENTERS</span>
              <span style={{ flex:1, height:2, background:'rgba(11,29,58,.08)' }} />
              <span className="font-hindi" style={{ color:'rgba(11,29,58,.4)', fontWeight:700 }}>समाधान — SATARK AI</span>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="solution-header" style={{ textAlign:'center', maxWidth:720, margin:'0 auto' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0B1D3A', color:'#fff', borderRadius:999, padding:'8px 18px', fontSize:13, fontWeight:700, marginBottom:20 }}>
              <span className="live-dot" style={{ width:8, height:8, background:'#4ADE80', borderRadius:'50%', display:'inline-block' }}/>
              5 AI ENGINES • WORKING 24×7 • NO BRIBES, NO LEAVE
            </div>
            <h2 className="font-display" style={{ fontWeight:900, fontSize:'clamp(2.2rem,5vw,3.8rem)', lineHeight:1.08 }}>
              One AI. <span style={{ color:'#FF6B1A' }}>Five superpowers.</span><br/>Zero tolerance for fraud.
            </h2>
            <p style={{ color:'rgba(11,29,58,.55)', fontSize:'1.05rem', marginTop:12, lineHeight:1.65 }}>
              Not one magic button — five specialist AIs that cross-check each other. If any one smells something fishy, the case turns <span style={{ background:'#FEE2E2', color:'#DC2626', padding:'1px 6px', borderRadius:4, fontWeight:700 }}>RED</span>.
            </p>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20, marginTop:56 }}>
            {AI_ENGINES.map((e, i) => (
              <Reveal key={i} delay={i * 0.07}>
                {e.isAccuracy ? (
                  <div style={{ background:'linear-gradient(135deg,#FF6B1A,#D94E00)', borderRadius:24, padding:28, border:'2px solid #0B1D3A', boxShadow:'8px 8px 0 #0B1D3A', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', minHeight:280 }}>
                    <div className="font-display" style={{ fontWeight:900, fontSize:'4rem', color:'#fff' }}>94%</div>
                    <div style={{ fontWeight:700, color:'#fff', fontSize:'1rem' }}>fraud detection accuracy</div>
                    <p style={{ color:'rgba(255,255,255,.75)', fontSize:13, marginTop:8 }}>Tested on 8,200 historical audit cases. Human officer always takes final decision.</p>
                    <a href="#dashboard" style={{ marginTop:20, background:'#fff', color:'#0B1D3A', fontWeight:800, padding:'12px 24px', borderRadius:14, textDecoration:'none', display:'block', transition:'background .2s' }}
                       onMouseEnter={el=>{el.currentTarget.style.background='#0B1D3A';el.currentTarget.style.color='#fff';}}
                       onMouseLeave={el=>{el.currentTarget.style.background='#fff';el.currentTarget.style.color='#0B1D3A';}}>
                      Try the Live Demo ↓
                    </a>
                  </div>
                ) : (
                  <div style={{ background:e.bg, color:e.fg, borderRadius:24, padding:24, border:'2px solid #0B1D3A', boxShadow:'6px 6px 0 #0B1D3A', position:'relative', overflow:'hidden', transition:'transform .25s', minHeight:280 }}
                    onMouseEnter={el=>el.currentTarget.style.transform='translateY(-6px)'}
                    onMouseLeave={el=>el.currentTarget.style.transform=''}>
                    <div style={{ position:'absolute', top:-20, right:-20, width:90, height:90, borderRadius:'50%', background:'rgba(255,107,26,.1)', filter:'blur(20px)' }}/>
                    <div style={{ fontSize:36, marginBottom:14 }}>{e.icon}</div>
                    <div style={{ fontSize:10, fontFamily:'IBM Plex Mono', color:e.bg==='#0B1D3A'?'#FF6B1A':'#6B7280', fontWeight:700, marginBottom:6 }}>ENGINE {e.num} • {e.tag}</div>
                    <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.3rem' }}>{e.title}</h3>
                    <p style={{ fontSize:13, color:e.bg==='#0B1D3A'?'rgba(255,255,255,.7)':'#4B5563', marginTop:8, lineHeight:1.6 }}>{e.desc}</p>
                    <div style={{ marginTop:16, background:e.noteBg, border:e.noteBorder?`1px solid ${e.noteBorder}`:'none', borderRadius:12, padding:'10px 12px', fontSize:11, fontFamily:'IBM Plex Mono', color:e.noteColor || (e.bg==='#0B1D3A'?'rgba(255,255,255,.7)':'#4B5563') }}>
                      {e.note}
                    </div>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How It Works ---- */}
      <section id="how" style={{ padding:'80px 0', background:'#FFF8ED', borderTop:'2px solid rgba(11,29,58,.08)', borderBottom:'2px solid rgba(11,29,58,.08)' }}>
        <div className="container">
          <Reveal>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <span style={{ background:'#0B1D3A', color:'#fff', fontSize:11, fontWeight:800, padding:'5px 12px', borderRadius:999 }}>CHAPTER 06 • HOW IT WORKS</span>
              <span style={{ flex:1, height:2, background:'rgba(11,29,58,.08)' }} />
              <span className="font-hindi" style={{ color:'rgba(11,29,58,.4)', fontWeight:700 }}>प्रक्रिया — 5 Steps</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display" style={{ fontWeight:900, fontSize:'clamp(2rem,5vw,3.2rem)' }}>
              From dusty file → to <span style={{ color:'#0E7C4B' }}>digital truth</span> in 5 steps.
            </h2>
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, marginTop:48 }}>
            {/* Steps */}
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {HOW_DATA.map((d, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <button onClick={() => setStep(i)}
                    style={{ width:'100%', textAlign:'left', background:step===i?'#0B1D3A':'#fff', color:step===i?'#fff':'#0B1D3A', borderRadius:18, padding:'18px 20px', border:`2px solid ${step===i?'#0B1D3A':'rgba(11,29,58,.15)'}`, boxShadow:step===i?'6px 6px 0 #FF6B1A':'none', cursor:'pointer', display:'flex', gap:16, alignItems:'flex-start', transition:'all .2s', fontFamily:'inherit' }}>
                    <span style={{ width:36, height:36, borderRadius:'50%', background:step===i?'#FF6B1A':'rgba(11,29,58,.1)', color:step===i?'#fff':'#0B1D3A', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, flexShrink:0, fontSize:15 }}>{i+1}</span>
                    <span>
                      <span style={{ fontWeight:800, display:'block', fontSize:14 }}>{d.title}</span>
                      <span style={{ fontSize:12, opacity:.75, marginTop:3, display:'block' }}>{d.desc.substring(0,80)}...</span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>

            {/* Preview card */}
            <Reveal delay={0.2}>
              <div style={{ background:'#fff', border:'2px solid #0B1D3A', borderRadius:24, overflow:'hidden', boxShadow:'8px 8px 0 #0B1D3A', position:'sticky', top:100 }}>
                <div style={{ position:'relative', height:260 }}>
                  <img key={cur.img} src={cur.img} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'opacity .3s' }} alt={cur.title} loading="lazy" />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(11,29,58,.8), transparent)' }}/>
                  <div style={{ position:'absolute', bottom:20, left:20, right:20 }}>
                    <div style={{ background:'#FF6B1A', color:'#fff', fontSize:10, fontFamily:'IBM Plex Mono', fontWeight:700, display:'inline-block', padding:'4px 8px', borderRadius:6, marginBottom:6 }}>{cur.tag}</div>
                    <h3 style={{ color:'#fff', fontWeight:900, fontSize:'1.2rem', fontFamily:'Fraunces, serif' }}>{cur.title}</h3>
                  </div>
                </div>
                <div style={{ padding:'20px 24px' }}>
                  <p style={{ color:'#4B5563', lineHeight:1.65, fontSize:14 }}>{cur.desc}</p>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:16 }}>
                    {cur.stats.map(([val, label]) => (
                      <div key={label} style={{ background:'#FFF8ED', borderRadius:12, padding:'10px', textAlign:'center', border:'1px solid rgba(11,29,58,.08)' }}>
                        <div className="font-display" style={{ fontWeight:900, fontSize:'1.3rem' }}>{val}</div>
                        <div style={{ fontSize:10, fontWeight:700, color:'#6B7280' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'flex', gap:10, marginTop:18 }}>
                    <button onClick={()=>setStep((step+4)%5)} style={{ flex:1, border:'2px solid #0B1D3A', borderRadius:12, padding:'10px', fontWeight:700, cursor:'pointer', background:'none', fontFamily:'inherit', fontSize:14, transition:'background .2s' }}
                      onMouseEnter={e=>{e.currentTarget.style.background='#0B1D3A';e.currentTarget.style.color='#fff';}} onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color='#0B1D3A';}}>← Prev</button>
                    <button onClick={()=>setStep((step+1)%5)} style={{ flex:1, background:'#FF6B1A', color:'#fff', border:'2px solid #0B1D3A', borderRadius:12, padding:'10px', fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:14, transition:'background .2s' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#0B1D3A'} onMouseLeave={e=>e.currentTarget.style.background='#FF6B1A'}>Next →</button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

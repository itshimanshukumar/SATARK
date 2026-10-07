import { useState } from 'react';
import Reveal from './Reveal';
import { CASES } from '../data/satark-data';

export default function CaseFiles() {
  const [activeCase, setActiveCase] = useState(null);

  const riskBg = (risk) => risk >= 80 ? '#DC2626' : risk >= 60 ? '#D97706' : '#0E7C4B';

  return (
    <section id="cases" style={{ padding:'80px 0', background:'#FFF8ED', overflow:'hidden', position:'relative' }}>
      {/* Dot grid background */}
      <div className="paper-texture" style={{ position:'absolute', inset:0, opacity:.6, pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative' }}>
        <Reveal>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <span style={{ background:'#0B1D3A', color:'#fff', fontSize:11, fontWeight:800, padding:'5px 12px', borderRadius:999 }}>CHAPTER 04 • CASE FILES</span>
            <span style={{ flex:1, height:2, background:'rgba(11,29,58,.08)' }} />
            <span className="font-hindi" style={{ color:'rgba(11,29,58,.4)', fontWeight:700 }}>मामले — Real Patterns</span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display" style={{ fontWeight:900, fontSize:'clamp(2rem,5vw,3.5rem)', lineHeight:1.08 }}>
            The Investigation Room{' '}
            <span className="font-hand" style={{ color:'#FF6B1A', fontSize:'clamp(1.5rem,3vw,2.5rem)', fontWeight:500 }}>— click to investigate →</span>
          </h2>
          <p style={{ color:'rgba(11,29,58,.55)', marginTop:8 }}>
            Illustrative cases built from typical audit patterns.{' '}
            <span style={{ background:'#FEF08A', padding:'1px 4px', fontWeight:700 }}>All fraud patterns real.</span>
          </p>
        </Reveal>

        {/* Case Cards Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24, marginTop:48 }}>
          {CASES.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <article
                onClick={() => setActiveCase(c)}
                style={{ background:'#fff', borderRadius:24, border:'2px solid #0B1D3A', boxShadow:'8px 8px 0 #0B1D3A', overflow:'hidden', cursor:'pointer', transition:'transform .2s, box-shadow .2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='12px 12px 0 #0B1D3A'; }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='8px 8px 0 #0B1D3A'; }}
              >
                <div style={{ position:'relative' }}>
                  <img src={c.img} style={{ width:'100%', height:200, objectFit:'cover', display:'block' }} alt={c.title} loading="lazy" />
                  <span style={{ position:'absolute', top:12, left:12, background:riskBg(c.risk), color:'#fff', fontSize:11, fontWeight:800, padding:'5px 10px', borderRadius:999 }}>
                    RISK {c.risk} • {c.risk>=80?'GHOST WORK':c.risk>=60?'FRAUD':'CLEAN'}
                  </span>
                  <span className="stamp" style={{ position:'absolute', top:12, right:12, fontSize:9, color:riskBg(c.risk), borderColor:riskBg(c.risk), background:'rgba(255,255,255,.92)' }}>
                    {c.risk>=80?'FLAGGED':c.risk>=60?'ON HOLD':'VERIFIED'}
                  </span>
                </div>
                <div style={{ padding:'20px 24px' }}>
                  <div style={{ fontSize:10, fontFamily:'IBM Plex Mono', color:'#9CA3AF' }}>FILE NO. {c.file} • {c.place}</div>
                  <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.2rem', marginTop:6 }}>{c.title}</h3>
                  <p style={{ fontSize:13, color:'#555', marginTop:8, lineHeight:1.55 }}>{c.story.substring(0,120)}...</p>
                  <div style={{ marginTop:16, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ fontSize:11, fontWeight:700, color:'#9CA3AF' }}>{c.risk>=80?'FIR RECOMMENDED':c.risk>=60?'PAYMENT FROZEN':'COMPLETED'}</span>
                    <button onClick={()=>setActiveCase(c)} style={{ fontWeight:700, fontSize:12, background:c.risk<60?'#0E7C4B':'#0B1D3A', color:'#fff', border:'none', borderRadius:999, padding:'8px 16px', cursor:'pointer', fontFamily:'inherit' }}>
                      {c.risk<60?'View Proof':'View Evidence'}
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Case Modal */}
      {activeCase && (
        <div onClick={e=>e.target===e.currentTarget&&setActiveCase(null)}
          style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:16, background:'rgba(0,0,0,.8)', backdropFilter:'blur(8px)' }}>
          <div style={{ background:'#FFFEF0', borderRadius:28, maxWidth:640, width:'100%', maxHeight:'90vh', overflowY:'auto', border:'2px solid #0B1D3A', boxShadow:'0 40px 100px rgba(0,0,0,.6)', position:'relative' }}>
            <div className="tape" />
            <div style={{ padding:'36px 32px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
                <div>
                  <span style={{ background:riskBg(activeCase.risk), color:'#fff', fontSize:11, fontWeight:800, padding:'5px 12px', borderRadius:999 }}>RISK {activeCase.risk}/100</span>
                  <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.6rem', marginTop:10 }}>{activeCase.title}</h3>
                  <div style={{ fontSize:12, fontFamily:'IBM Plex Mono', color:'#9CA3AF', marginTop:4 }}>FILE: {activeCase.file} • {activeCase.place}</div>
                </div>
                <button onClick={()=>setActiveCase(null)} style={{ width:36, height:36, borderRadius:'50%', background:'#0B1D3A', color:'#fff', border:'none', fontWeight:900, cursor:'pointer' }}>✕</button>
              </div>
              <img src={activeCase.img} style={{ width:'100%', height:220, objectFit:'cover', borderRadius:16, marginBottom:20 }} alt={activeCase.title} />
              <p style={{ lineHeight:1.65, color:'#333', marginBottom:20 }}>{activeCase.story}</p>
              <div style={{ background:'rgba(11,29,58,.04)', borderRadius:16, padding:'16px 20px', marginBottom:20 }}>
                <div style={{ fontWeight:800, fontSize:13, marginBottom:10 }}>🤖 AI EVIDENCE TRAIL</div>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
                  {activeCase.evidence.map((e,i)=><li key={i} style={{ fontSize:13, padding:'6px 10px', background:'#fff', borderRadius:10, border:'1px solid rgba(11,29,58,.08)' }}>{e}</li>)}
                </ul>
              </div>
              <div style={{ background:'#0B1D3A', color:'#fff', borderRadius:14, padding:'14px 18px', fontWeight:700, fontSize:14 }}>
                ⚖️ ACTION TAKEN: {activeCase.action}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

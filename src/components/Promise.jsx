import Reveal from './Reveal';

const PROMISE_FLOW = [
  { icon:'🏛️', title:'1. Centre releases funds', desc:'Ministry of Statistics → District authority. Digital entry in PFMS.', color:'rgba(255,107,26,.12)', border:'#FF6B1A' },
  { icon:'📝', title:'2. MP recommends work', desc:'MP suggests: "Build 2 classrooms in Rampur school." Added to shelf of works.', color:'rgba(59,130,246,.08)', border:'#3B82F6' },
  { icon:'👷', title:'3. Collector sanctions + tender', desc:'Estimate approved, contractor selected via GeM / e-tender.', color:'rgba(14,124,75,.08)', border:'#0E7C4B' },
  { icon:'🚧', title:'4. Work executed + bills raised', desc:'⚠️ Most fraud happens here — inflated bills, ghost work, delays.', color:'rgba(196,154,18,.08)', border:'#C49A12' },
  { icon:'🤖', title:'5. SATARK AI verifies', desc:'Photos, satellite, bills & citizen feedback cross-checked in seconds.', color:'#0B1D3A', border:'#0B1D3A', isNew:true },
];

const WORK_CATEGORIES = [
  { img:'https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=400&auto=format&fit=crop', label:'Roads & Drains', pct:'34%' },
  { img:'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=400&auto=format&fit=crop', label:'Schools & Rooms', pct:'22%' },
  { img:'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=400&auto=format&fit=crop', label:'Solar & Lights', pct:'16%' },
  { img:'https://images.unsplash.com/photo-1541675152-2b60b621b543?q=80&w=400&auto=format&fit=crop', label:'Water & Pumps', pct:'14%' },
  { img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=400&auto=format&fit=crop', label:'Bridges & Culverts', pct:'9%' },
];

export default function Promise() {
  return (
    <section id="promise" style={{ padding:'80px 0', background:'#FFFEF7', position:'relative', overflow:'hidden' }}>
      {/* Watermark */}
      <div className="font-display text-stroke" style={{ position:'absolute', top:40, right:0, fontSize:'clamp(6rem,15vw,14rem)', fontWeight:900, opacity:.07, whiteSpace:'nowrap', pointerEvents:'none', userSelect:'none', letterSpacing:'-0.04em' }}>MPLAD ₹5Cr</div>

      <div className="container" style={{ position:'relative' }}>
        <Reveal>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <span style={{ background:'#0B1D3A', color:'#fff', fontSize:11, fontWeight:800, padding:'5px 12px', borderRadius:999 }}>CHAPTER 02</span>
            <span style={{ flex:1, height:2, background:'rgba(11,29,58,.08)' }} />
            <span className="font-hindi" style={{ color:'rgba(11,29,58,.4)', fontWeight:700 }}>वादा — The Promise</span>
          </div>
        </Reveal>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'flex-start' }}>
          <div>
            <Reveal delay={0.06}>
              <h2 className="font-display" style={{ fontWeight:900, fontSize:'clamp(2rem,5vw,3.5rem)', lineHeight:1.05 }}>
                What is MPLAD?<br/><span style={{ color:'#0E7C4B' }}>Explained in 30 seconds.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div style={{ marginTop:24, background:'#FEF3C7', border:'2px solid #0B1D3A', borderRadius:20, padding:'20px 24px', boxShadow:'6px 6px 0 #0B1D3A', position:'relative' }}>
                <div className="tape" />
                <div className="font-hand" style={{ fontSize:'1.4rem', color:'rgba(11,29,58,.55)', marginBottom:8 }}>In simple words... ✎</div>
                <p style={{ fontSize:'1.05rem', lineHeight:1.65 }}>
                  Every MP gets <strong style={{ background:'#fff', padding:'1px 6px', border:'1px solid rgba(11,29,58,.15)', borderRadius:4 }}>₹5 Crore per year</strong> to build useful things in their area — roads, school rooms, handpumps, street lights, toilets. The <strong>District Collector</strong> gets the work done. Simple idea, huge impact.
                </p>
                <p className="font-hindi" style={{ marginTop:10, color:'rgba(11,29,58,.6)', fontSize:'0.95rem' }}>हर सांसद को हर साल अपने क्षेत्र में विकास कार्यों के लिए ₹5 करोड़ मिलते हैं।</p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:24 }}>
                {[['#0B1D3A','#fff','₹5','Cr','PER MP / PER YEAR'],['#FF6B1A','#fff','793','','MPS TOTAL'],['#0E7C4B','#fff','~₹4k','Cr','YEARLY FUND FLOW']].map(([bg,fg,val,suffix,label]) => (
                  <div key={label} style={{ background:bg, color:fg, borderRadius:20, padding:'16px', textAlign:'center', border:'2px solid #0B1D3A', boxShadow:'4px 4px 0 rgba(11,29,58,.2)' }}>
                    <div className="font-display" style={{ fontWeight:900, fontSize:'1.8rem' }}>{val}<span style={{ fontSize:'1rem' }}>{suffix}</span></div>
                    <div style={{ fontSize:10, fontWeight:700, opacity:.7, marginTop:4, letterSpacing:'.06em' }}>{label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Money flow */}
          <Reveal delay={0.1}>
            <div style={{ background:'#fff', border:'2px solid #0B1D3A', borderRadius:24, overflow:'hidden', boxShadow:'8px 8px 0 #0B1D3A' }}>
              <div style={{ background:'#0B1D3A', color:'#fff', padding:'12px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontWeight:800, fontSize:13, letterSpacing:'.06em' }}>💰 HOW MONEY FLOWS — FOLLOW THE FILE</span>
                <span style={{ fontSize:10, fontFamily:'IBM Plex Mono', background:'rgba(255,255,255,.12)', padding:'4px 8px', borderRadius:6 }}>FILE NO. MPLAD/2024</span>
              </div>
              <div style={{ padding:'20px' }}>
                {PROMISE_FLOW.map((s, i) => (
                  <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', paddingBottom:i<4?20:0, position:'relative', marginBottom:i<4?0:0 }}>
                    {/* connector */}
                    {i < 4 && <div style={{ position:'absolute', left:27, top:56, bottom:-20, width:3, background:'repeating-linear-gradient(rgba(11,29,58,.2) 0 8px,transparent 8px 16px)' }}/>}
                    <div style={{ width:54, height:54, borderRadius:16, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, background:s.isNew?s.color:s.color, border:`2px solid ${s.border}` }}>{s.icon}</div>
                    <div style={{ flex:1, background:s.isNew?'#0B1D3A':'#FFF8ED', color:s.isNew?'#fff':'#0B1D3A', borderRadius:14, padding:'10px 14px', border:`1px solid ${s.isNew?'rgba(255,255,255,.1)':'rgba(11,29,58,.08)'}` }}>
                      <div style={{ fontWeight:800, fontSize:13, display:'flex', alignItems:'center', gap:8 }}>
                        {s.title}
                        {s.isNew && <span style={{ background:'#FF6B1A', fontSize:9, padding:'2px 8px', borderRadius:999 }}>NEW</span>}
                      </div>
                      <div style={{ fontSize:12, marginTop:4, color:s.isNew?'rgba(255,255,255,.65)':'#555' }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Work categories */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:16, marginTop:48 }}>
          {WORK_CATEGORIES.map((w, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div style={{ background:'#fff', border:'2px solid rgba(11,29,58,.08)', borderRadius:20, overflow:'hidden', cursor:'pointer', transition:'border-color .2s, transform .2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#0B1D3A';e.currentTarget.style.transform='translateY(-4px)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(11,29,58,.08)';e.currentTarget.style.transform='';}}>
                <div style={{ overflow:'hidden', height:120 }}>
                  <img src={w.img} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .4s', display:'block' }} alt={w.label} loading="lazy"
                    onMouseEnter={e=>e.target.style.transform='scale(1.06)'} onMouseLeave={e=>e.target.style.transform=''}/>
                </div>
                <div style={{ padding:'10px 14px' }}>
                  <div style={{ fontWeight:700, fontSize:13 }}>{w.label}</div>
                  <div style={{ fontSize:11, color:'#9CA3AF', marginTop:2 }}>{w.pct} of works</div>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <div style={{ background:'#0B1D3A', color:'#fff', borderRadius:20, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'20px', textAlign:'center', minHeight:160 }}>
              <div className="font-display" style={{ fontWeight:900, fontSize:'2rem' }}>40+</div>
              <div style={{ fontWeight:700, fontSize:13 }}>Other work types</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,.5)', marginTop:4 }}>Toilets, halls, crematoriums...</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

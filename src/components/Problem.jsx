import Reveal from './Reveal';

const FRAUD_TYPES = [
  { type:'01', icon:'👻', title:'Ghost Projects', teaser:'Work exists only on paper. Money withdrawn, nothing built.', back:'Contractor + official show a "completed toilet block". Photos are from another village. Bill of ₹9.2L passed. SATARK catches it: no geo-tag + satellite shows empty plot.', loss:'₹4–12 LAKH', freq:'★★★★☆', bg:'#DC2626' },
  { type:'02', icon:'🧾', title:'Inflated Bills', teaser:'₹6 lakh road shown as ₹11 lakh. Rates jacked up.', back:'Estimate uses 2x cement quantity vs standard SOR rates. Fake quotations attached. SATARK compares with 14 lakh past estimates & flags +38% anomaly.', loss:'₹3–8 LAKH', freq:'★★★★★', bg:'#D94E00' },
  { type:'03', icon:'🐌', title:'Endless Delays', teaser:'6-month work drags for 3 years. Cost doubles.', back:'No one tracks daily progress. Contractor diverts advance to other sites. SATARK sends auto-escalation to DM at 30/60/90-day delay slabs.', loss:'₹2.1L avg', freq:'★★★★☆', bg:'#0B1D3A' },
  { type:'04', icon:'🔁', title:'Double Billing', teaser:'Same work paid twice. Two files, one road.', back:'Same road sanctioned under MPLAD + Gram Panchayat funds. Different spellings hide duplication. SATARK\'s fuzzy matching + GPS links them instantly.', loss:'₹10–25 LAKH', freq:'★★★☆☆', bg:'#0E7C4B' },
];

const FRAUD_IMAGES = [
  'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop',
];

export default function Problem() {
  return (
    <section id="problem" style={{ padding:'80px 0', background:'#060F24', color:'#fff', position:'relative', overflow:'hidden' }}>
      {/* Background image overlay */}
      <div style={{ position:'absolute', inset:0, opacity:.06, backgroundImage:'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop)', backgroundSize:'cover', backgroundPosition:'center', pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative' }}>
        <Reveal>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
            <span style={{ background:'#DC2626', color:'#fff', fontSize:11, fontWeight:800, padding:'5px 12px', borderRadius:999 }}>CHAPTER 03 • THE DARK SIDE</span>
            <span style={{ flex:1, height:2, background:'rgba(255,255,255,.08)' }} />
            <span className="font-hindi" style={{ color:'rgba(255,255,255,.4)', fontWeight:700 }}>गड़बड़ी — The Leakage</span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display" style={{ fontWeight:900, fontSize:'clamp(2.2rem,5vw,3.8rem)', lineHeight:1.1, maxWidth:700 }}>
            Good scheme. But <span style={{ color:'#F87171' }}>money leaks</span> through 4 holes.
          </h2>
          <p style={{ color:'rgba(255,255,255,.55)', fontSize:'1.05rem', marginTop:12, maxWidth:560 }}>
            CAG audits & field reports keep finding the same patterns. Hover each card to see <em>how the trick works</em>.
          </p>
        </Reveal>

        {/* Flip Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))', gap:20, marginTop:48 }}>
          {FRAUD_TYPES.map((f, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flip-card" style={{ height:380 }}>
                <div className="flip-card-inner">
                  {/* Front */}
                  <div className="flip-front" style={{ background:'#fff', color:'#0B1D3A' }}>
                    <img src={FRAUD_IMAGES[i]} style={{ width:'100%', height:176, objectFit:'cover' }} alt={f.title} loading="lazy" />
                    <div style={{ padding:'20px' }}>
                      <div style={{ color:'#DC2626', fontWeight:800, fontSize:11, letterSpacing:'.12em' }}>FRAUD TYPE {f.type}</div>
                      <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.4rem', marginTop:6 }}>{f.icon} {f.title}</h3>
                      <p style={{ fontSize:13, color:'#555', marginTop:8 }}>{f.teaser}</p>
                      <div style={{ fontSize:11, fontWeight:700, color:'#FF6B1A', marginTop:12 }}>HOVER TO SEE THE TRICK →</div>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="flip-back" style={{ background:f.bg, color:'#fff', display:'flex', flexDirection:'column', justifyContent:'center', padding:24 }}>
                    <div className="font-hand" style={{ fontSize:'1.4rem' }}>How the trick works...</div>
                    <p style={{ fontSize:13, lineHeight:1.6, marginTop:10 }}>{f.back}</p>
                    <div style={{ marginTop:20, background:'rgba(0,0,0,.25)', borderRadius:12, padding:12, fontFamily:'IBM Plex Mono', fontSize:12 }}>
                      LOSS / CASE: {f.loss}<br/>FREQUENCY: {f.freq}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.2}>
          <div style={{ marginTop:48, display:'grid', gridTemplateColumns:'2fr 1fr', gap:20 }}>
            <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:24, padding:24 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                <h3 style={{ fontWeight:700, fontSize:'1.1rem' }}>Where does the money go? (Sample audit)</h3>
                <span style={{ fontSize:10, fontFamily:'IBM Plex Mono', background:'rgba(255,255,255,.1)', padding:'4px 8px', borderRadius:6 }}>DEMO DATA</span>
              </div>
              {[['Genuine spend','72%','#0E7C4B'],['Over-billing','9%','#FF6B1A'],['Delay cost','7%','#C49A12'],['Ghost/duplicate','6%','#EF4444'],['Unaccounted','6%','#94A3B8']].map(([label, pct, color]) => (
                <div key={label} style={{ marginBottom:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, fontWeight:600, marginBottom:4 }}><span>{label}</span><span>{pct}</span></div>
                  <div style={{ height:8, background:'rgba(255,255,255,.08)', borderRadius:99 }}>
                    <div style={{ height:'100%', width:pct, background:color, borderRadius:99, transition:'width 1s ease' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:'linear-gradient(135deg,#DC2626,#7f1d1d)', borderRadius:24, padding:28, border:'2px solid rgba(255,255,255,.15)', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
              <div>
                <div className="stamp" style={{ color:'#fff', borderColor:'#fff', fontSize:10 }}>CAG-STYLE FINDING</div>
                <div className="font-display" style={{ fontSize:'2.6rem', fontWeight:900, marginTop:16 }}>₹1 <span style={{ fontSize:'1.2rem', fontWeight:700 }}>in every ₹7</span></div>
                <p style={{ color:'rgba(255,255,255,.75)', fontSize:14, marginTop:8 }}>is lost to over-billing, delays or non-existent work — without AI checks.</p>
              </div>
              <div style={{ marginTop:20, background:'rgba(0,0,0,.3)', borderRadius:16, padding:16 }}>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', color:'rgba(255,255,255,.5)' }}>HUMAN AUDIT TAKES</div>
                <div className="font-display" style={{ fontWeight:900, fontSize:'1.4rem' }}>14 months <span style={{ fontSize:12, fontWeight:400, color:'rgba(255,255,255,.5)' }}>per district</span></div>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', color:'rgba(255,255,255,.5)', marginTop:12 }}>SATARK AI TAKES</div>
                <div className="font-display" style={{ fontWeight:900, fontSize:'1.4rem', color:'#4ADE80' }}>14 seconds ⚡</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

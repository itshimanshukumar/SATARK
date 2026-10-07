import { useState } from 'react';
import Reveal from './Reveal';

const FAQS = [
  { q:'Will AI replace government officers?', a:'No. AI only flags & explains. Final decision (approve / reject / inspect) is always taken by a human officer, with reasons recorded. Think of AI as a super-fast assistant, not a judge.' },
  { q:'What if AI makes a mistake?', a:'Every flag shows proof + confidence %. Contractor/MP can appeal with fresh photos. Wrong flags improve the model — accuracy rose from 81% → 94% in pilots via feedback.' },
  { q:"I don't have a smartphone. Can I still complain?", a:'Yes! Give a missed call to 1800-XXX-XXXX. IVRS calls back, records your voice in your language, AI converts it to a complaint. You get SMS updates.' },
  { q:'Is my village data safe & private?', a:'Work photos & bills are public (it\'s public money). But phone numbers, Aadhaar & bank details are masked and stored on NIC / MeitY-approved secure servers with audit logs.' },
];

// Citizen complaint form
function CitizenForm() {
  const [step, setStep] = useState(1);
  const [issue, setIssue] = useState('');
  const [loc, setLoc] = useState('');
  const [desc, setDesc] = useState('');
  const [phone, setPhone] = useState('');
  const [trackId, setTrackId] = useState('');

  function submit() {
    const id = 'SAT-2026-' + Math.floor(10000 + Math.random() * 90000);
    setTrackId(id);
    setStep(4);
  }

  const ISSUES = [
    { icon:'🚫', label:'Work not started' },
    { icon:'🧱', label:'Poor quality' },
    { icon:'⏸️', label:'Left incomplete' },
    { icon:'👻', label:'Ghost / fake work' },
  ];

  return (
    <div style={{ background:'#fff', border:'2px solid #0B1D3A', borderRadius:28, padding:'28px 32px', boxShadow:'8px 8px 0 #0B1D3A' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.4rem' }}>Report an Issue</h3>
        <div style={{ display:'flex', gap:6 }}>
          {[1,2,3].map(s => (
            <span key={s} style={{ width:28, height:7, borderRadius:99, background:step>=s?'#FF6B1A':'#E5E7EB', transition:'background .3s' }}/>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div>
          <label style={{ fontSize:14, fontWeight:700, display:'block', marginBottom:10 }}>What's the problem?</label>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 }}>
            {ISSUES.map(({ icon, label }) => (
              <button key={label} onClick={() => setIssue(label)}
                style={{ padding:'12px 14px', fontSize:13, fontWeight:700, border:`2px solid ${issue===label?'#FF6B1A':'rgba(11,29,58,.12)'}`, background:issue===label?'#FFF8ED':'#fff', borderRadius:14, cursor:'pointer', textAlign:'left', fontFamily:'inherit', transition:'border-color .2s, background .2s' }}>
                {icon} {label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} disabled={!issue}
            style={{ width:'100%', background:issue?'#0B1D3A':'#9CA3AF', color:'#fff', fontWeight:700, padding:'12px', borderRadius:14, border:'none', cursor:issue?'pointer':'default', fontSize:14, fontFamily:'inherit', transition:'background .2s' }}>
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label style={{ fontSize:14, fontWeight:700, display:'block', marginBottom:6 }}>Where? (District / Village)</label>
          <input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="e.g. Rampur, Gorakhpur"
            style={{ width:'100%', background:'#FFF8ED', border:'2px solid rgba(11,29,58,.12)', borderRadius:12, padding:'10px 14px', fontSize:14, outline:'none', fontFamily:'inherit', marginBottom:14, boxSizing:'border-box' }}/>
          <label style={{ fontSize:14, fontWeight:700, display:'block', marginBottom:6 }}>Describe in your words (Hindi/English)</label>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={3} placeholder="Sadak 3 mahine se adhuri hai..."
            style={{ width:'100%', background:'#FFF8ED', border:'2px solid rgba(11,29,58,.12)', borderRadius:12, padding:'10px 14px', fontSize:14, outline:'none', fontFamily:'inherit', resize:'vertical', marginBottom:14, boxSizing:'border-box' }}/>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(1)} style={{ flex:1, border:'2px solid rgba(11,29,58,.15)', borderRadius:12, padding:'11px', fontWeight:700, cursor:'pointer', background:'none', fontFamily:'inherit', fontSize:14 }}>← Back</button>
            <button onClick={() => setStep(3)} style={{ flex:1, background:'#0B1D3A', color:'#fff', fontWeight:700, padding:'11px', borderRadius:12, border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:14 }}>Continue →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <label style={{ fontSize:14, fontWeight:700, display:'block', marginBottom:6 }}>Your mobile (for SMS updates)</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="10-digit mobile number" maxLength={10}
            style={{ width:'100%', background:'#FFF8ED', border:'2px solid rgba(11,29,58,.12)', borderRadius:12, padding:'10px 14px', fontSize:14, outline:'none', fontFamily:'inherit', marginBottom:12, boxSizing:'border-box' }}/>
          <div style={{ background:'#FFF8ED', border:'1px solid rgba(11,29,58,.08)', borderRadius:12, padding:'10px 14px', fontSize:12, color:'#6B7280', marginBottom:16 }}>
            🔒 Your number stays private. You can also report anonymously via missed call.
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(2)} style={{ flex:1, border:'2px solid rgba(11,29,58,.15)', borderRadius:12, padding:'11px', fontWeight:700, cursor:'pointer', background:'none', fontFamily:'inherit', fontSize:14 }}>← Back</button>
            <button onClick={submit} style={{ flex:1, background:'#0E7C4B', color:'#fff', fontWeight:800, padding:'11px', borderRadius:12, border:'2px solid #0B1D3A', boxShadow:'4px 4px 0 #0B1D3A', cursor:'pointer', fontFamily:'inherit', fontSize:14 }}>Submit Report ✓</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={{ textAlign:'center', padding:'16px 0' }}>
          <div style={{ width:72, height:72, background:'#DCFCE7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, margin:'0 auto 16px' }}>✅</div>
          <h4 className="font-display" style={{ fontWeight:900, fontSize:'1.4rem' }}>Complaint Registered!</h4>
          <p style={{ fontSize:13, color:'#6B7280', marginTop:4 }}>AI has attached satellite + past records to your case.</p>
          <div style={{ background:'#0B1D3A', color:'#fff', borderRadius:16, padding:'14px 20px', marginTop:16 }}>
            <div style={{ fontSize:10, fontFamily:'IBM Plex Mono', color:'rgba(255,255,255,.5)' }}>TRACKING ID</div>
            <div style={{ fontWeight:900, fontSize:'1.4rem', color:'#FF6B1A', marginTop:4 }}>{trackId}</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,.5)', marginTop:4 }}>Expected action: within 15 working days</div>
          </div>
          <button onClick={() => { setStep(1); setIssue(''); setLoc(''); setDesc(''); setPhone(''); }} style={{ marginTop:14, fontSize:13, fontWeight:700, textDecoration:'underline', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
            File another report
          </button>
        </div>
      )}
    </div>
  );
}

export default function Impact() {
  const [openFaq, setOpenFaq] = useState(null);
  const [ctaMsg, setCtaMsg] = useState(false);

  return (
    <>
      {/* ---- Impact ---- */}
      <section id="impact" style={{ padding:'80px 0', background:'#FFFEF7' }}>
        <div className="container">
          <Reveal>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <span style={{ background:'#C49A12', color:'#0B1D3A', fontSize:11, fontWeight:800, padding:'5px 12px', borderRadius:999 }}>CHAPTER 10 • IMPACT & ROADMAP</span>
              <span style={{ flex:1, height:2, background:'rgba(11,29,58,.08)' }} />
              <span className="font-hindi" style={{ color:'rgba(11,29,58,.4)', fontWeight:700 }}>बदलाव</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display" style={{ fontWeight:900, fontSize:'clamp(2rem,5vw,3.5rem)', textAlign:'center' }}>
              Before SATARK vs <span style={{ color:'#0E7C4B' }}>After SATARK</span>
            </h2>
          </Reveal>

          {/* Before / After comparison */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, maxWidth:960, margin:'48px auto 0' }}>
            {[
              { label:'❌ BEFORE • MANUAL SYSTEM', bg:'#FFEAEA', border:'#FCA5A5', badge:'#DC2626', items:['😴 Audit after 2 years — money already gone','📁 400-page files, no photos, no GPS','💸 Payments in 90–180 days, even for honest work','🙈 Citizen complaints lost in registers','📊 MP gets no real-time progress report'] },
              { label:'✅ AFTER • SATARK AI', bg:'#E6F4EB', border:'#6EE7B7', badge:'#0E7C4B', items:['⚡ Fraud flagged in 14 seconds, payment frozen','🛰️ Every work: satellite + geo-photo + citizen vote','🚀 Honest contractors paid in 3 days','📲 Every complaint tracked with SMS updates','📈 MP dashboard + auto Parliament Q&A report'] },
            ].map((col, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div style={{ background:col.bg, border:`2px solid ${col.border}`, borderRadius:24, padding:28, position:'relative', boxShadow:i===1?'8px 8px 0 rgba(14,124,75,.2)':'none' }}>
                  <span style={{ position:'absolute', top:-18, left:20, background:col.badge, color:'#fff', fontSize:11, fontWeight:800, padding:'5px 14px', borderRadius:999 }}>{col.label}</span>
                  <ul style={{ listStyle:'none', marginTop:12, display:'flex', flexDirection:'column', gap:10 }}>
                    {col.items.map((it,j) => <li key={j} style={{ fontSize:14, display:'flex', gap:8 }}>{it}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16, marginTop:48 }}>
            {[
              { val:'₹840Cr', label:'Projected savings (pilot districts)', bg:'#0B1D3A', fg:'#FF6B1A' },
              { val:'94%', label:'Fraud detection accuracy', bg:'#FF6B1A', fg:'#fff' },
              { val:'3 days', label:'Avg payment for clean works', bg:'#0E7C4B', fg:'#fff' },
              { val:'2.1L', label:'App downloads (6 months)', bg:'#C49A12', fg:'#fff' },
            ].map((s,i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ background:s.bg, color:s.fg, borderRadius:24, padding:'24px', textAlign:'center', boxShadow:'6px 6px 0 rgba(11,29,58,.1)' }}>
                  <div className="font-display" style={{ fontWeight:900, fontSize:'2rem' }}>{s.val}</div>
                  <div style={{ fontSize:12, fontWeight:700, opacity:.8, marginTop:6 }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Roadmap */}
          <Reveal delay={0.15}>
            <div style={{ background:'linear-gradient(135deg,#0B1D3A,#060F24)', borderRadius:28, padding:'32px', marginTop:48, border:'2px solid rgba(255,255,255,.1)', color:'#fff' }}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.15em', color:'rgba(255,255,255,.4)', marginBottom:20 }}>ROADMAP</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
                {[
                  { phase:'✅ NOW • 2025-26', title:'Pilot in 8 districts', desc:'Gorakhpur, Nalanda, Jaipur, Howrah, Bhopal + 3 more. Full PFMS + GeM integration.', opacity:1 },
                  { phase:'○ NEXT • 2026-27', title:'Pan-India MPLAD', desc:'All 793 MPs onboard. Extend to PMGSY, MGNREGA & state schemes.', opacity:0.75 },
                  { phase:'○ VISION • 2028', title:'Zero-Leakage Bharat', desc:'Predictive AI stops fraud before sanction. Public trust score for every district.', opacity:0.6 },
                ].map((r,i) => (
                  <div key={i} style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.08)', borderRadius:18, padding:20, opacity:r.opacity }}>
                    <div style={{ background:'rgba(255,255,255,.15)', fontSize:10, fontWeight:800, padding:'3px 10px', borderRadius:999, display:'inline-block', marginBottom:10 }}>{r.phase}</div>
                    <div style={{ fontWeight:800, fontSize:'1rem' }}>{r.title}</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,.55)', marginTop:6 }}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* FAQ + CTA */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, marginTop:56 }}>
            <Reveal delay={0.1}>
              <div>
                <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.8rem' }}>
                  Common questions,{' '}
                  <span className="font-hand" style={{ color:'#FF6B1A', fontSize:'2rem', fontWeight:500 }}>simple answers</span>
                </h3>
                <div style={{ marginTop:20, display:'flex', flexDirection:'column', gap:12 }}>
                  {FAQS.map((f, i) => (
                    <div key={i} className={`faq-item ${openFaq===i?'open':''}`}
                      style={{ background:'#fff', border:'2px solid rgba(11,29,58,.08)', borderRadius:16, overflow:'hidden' }}>
                      <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                        style={{ width:'100%', textAlign:'left', padding:'14px 18px', fontWeight:800, display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:14 }}>
                        {f.q}
                        <span className="faq-arrow" style={{ transition:'transform .3s', transform:openFaq===i?'rotate(180deg)':'none', flexShrink:0 }}>▼</span>
                      </button>
                      <div className="faq-answer">
                        <p style={{ padding:'0 18px 16px', fontSize:13, color:'#4B5563', lineHeight:1.65 }}>{f.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ background:'linear-gradient(135deg,#0B1D3A,#060F24)', color:'#fff', borderRadius:28, padding:'32px', border:'2px solid rgba(255,255,255,.1)', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', left:-40, top:-40, width:160, height:160, borderRadius:'50%', background:'rgba(255,107,26,.2)', filter:'blur(40px)' }}/>
                <div style={{ position:'relative' }}>
                  <h3 className="font-display" style={{ fontWeight:900, fontSize:'1.6rem' }}>Bring SATARK to your district 🚀</h3>
                  <p style={{ color:'rgba(255,255,255,.6)', marginTop:8, fontSize:14 }}>For MPs, Collectors, Auditors & NGOs — get a free 30-day pilot with your own district data.</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:12, marginTop:20 }}>
                    {['Your name','Official email / mobile'].map(ph => (
                      <input key={ph} placeholder={ph} style={{ width:'100%', background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)', borderRadius:14, padding:'12px 16px', fontSize:14, color:'#fff', outline:'none', fontFamily:'inherit', boxSizing:'border-box' }} onFocus={e=>e.target.style.borderColor='#FF6B1A'} onBlur={e=>e.target.style.borderColor='rgba(255,255,255,.2)'}/>
                    ))}
                    <select style={{ width:'100%', background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)', borderRadius:14, padding:'12px 16px', fontSize:14, color:'#fff', outline:'none', fontFamily:'inherit', boxSizing:'border-box' }}>
                      {['MP Office','District Administration','Audit / CAG','Media / Researcher','Citizen / NGO'].map(o=><option key={o} style={{ color:'#0B1D3A' }}>{o}</option>)}
                    </select>
                    <button onClick={()=>setCtaMsg(true)} style={{ background:'#FF6B1A', fontWeight:800, padding:'14px', borderRadius:14, border:'2px solid rgba(255,255,255,.2)', cursor:'pointer', fontSize:14, color:'#fff', fontFamily:'inherit', boxShadow:'4px 4px 0 rgba(255,107,26,.4)', transition:'background .2s' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#D94E00'} onMouseLeave={e=>e.currentTarget.style.background='#FF6B1A'}>
                      Request Free Pilot →
                    </button>
                    {ctaMsg && <div style={{ color:'#4ADE80', fontWeight:700, fontSize:13 }}>✓ Request received! Our team will call within 2 working days.</div>}
                  </div>
                  <div style={{ marginTop:16, fontSize:11, color:'rgba(255,255,255,.4)' }}>Or write to: <span style={{ fontFamily:'IBM Plex Mono', color:'rgba(255,255,255,.7)' }}>satark-pilot@gov-demo.in</span> • Demonstration prototype.</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Citizen Report ---- */}
      <section id="citizen" style={{ padding:'80px 0', background:'#FFF8ED', borderTop:'2px solid rgba(11,29,58,.08)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
            <Reveal>
              <div style={{ background:'linear-gradient(135deg,#0E7C4B,#0a5c38)', color:'#fff', borderRadius:28, padding:'36px', border:'2px solid #0B1D3A', boxShadow:'8px 8px 0 #0B1D3A', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', right:-40, bottom:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,.08)', filter:'blur(30px)' }}/>
                <div style={{ position:'relative' }}>
                  <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.2em', color:'rgba(255,255,255,.6)', marginBottom:12 }}>📢 CITIZEN POWER • NO LOGIN NEEDED</div>
                  <h3 className="font-display" style={{ fontWeight:900, fontSize:'clamp(1.8rem,4vw,2.6rem)', lineHeight:1.1 }}>See something wrong?<br/>Report in 60 seconds.</h3>
                  <p style={{ color:'rgba(255,255,255,.75)', marginTop:12, lineHeight:1.65 }}>
                    No app needed. Just give a <strong style={{ color:'#fff' }}>missed call on 1800-XXX-XXXX</strong> or fill this form. AI converts your voice/photo into a formal complaint with tracking ID.
                  </p>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:24 }}>
                    {[['📞','1. Missed call / Form'],['🤖','2. AI files complaint'],['✅','3. Action in 15 days']].map(([icon,label]) => (
                      <div key={label} style={{ background:'rgba(255,255,255,.12)', borderRadius:16, padding:'12px', textAlign:'center', backdropFilter:'blur(4px)' }}>
                        <div style={{ fontSize:24 }}>{icon}</div>
                        <div style={{ fontSize:11, fontWeight:700, marginTop:6 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:24, background:'rgba(0,0,0,.2)', borderRadius:20, padding:'16px 18px', display:'flex', gap:14, alignItems:'center' }}>
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" style={{ width:52, height:52, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(255,255,255,.3)', flexShrink:0 }} alt="Citizen" loading="lazy"/>
                    <div style={{ fontSize:13 }}>
                      <strong>Meena Devi, Nalanda:</strong> "Maine photo bheja, 9 din me sadak ban gayi. Mujhe SMS par update bhi aaya."
                      <div style={{ color:'#FDE047', fontSize:11, marginTop:4 }}>★★★★★ Verified citizen reporter</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}><CitizenForm /></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

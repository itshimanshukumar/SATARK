import { useState, useRef } from 'react';
import Reveal from './Reveal';
import { BOT_RESPONSES } from '../data/satark-data';

export default function Footer() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from:'bot', text:'Namaste! 🙏 I\'m SATARK Mitra. Ask me anything about MPLAD, fraud detection, or how to report an issue — in Hindi or English.' }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  function sendMsg(text) {
    const t = text || input;
    if (!t.trim()) return;
    setMessages(m => [...m, { from:'user', text:t }]);
    setInput('');
    setTimeout(() => {
      const key = Object.keys(BOT_RESPONSES).find(k => t.toLowerCase().includes(k));
      const reply = key ? BOT_RESPONSES[key] : "SATARK AI is on it! 🤖 For specific queries, call our helpline 1800-XXX-XXXX or use the Report form above. हम आपकी मदद करेंगे।";
      setMessages(m => [...m, { from:'bot', text:reply }]);
      setTimeout(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, 50);
    }, 600);
  }

  return (
    <>
      {/* Footer */}
      <footer style={{ background:'#060F24', color:'#fff', paddingTop:56, paddingBottom:24, position:'relative' }}>
        <div className="tricolor-bar" style={{ position:'absolute', top:0, left:0, right:0, height:4 }}/>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1.5fr', gap:32, marginBottom:40 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                <div style={{ width:44, height:44, borderRadius:14, background:'#FF6B1A', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'1.4rem' }}>S</div>
                <div>
                  <div className="font-display" style={{ fontWeight:900, fontSize:'1.2rem' }}>SATARK AI</div>
                  <div style={{ fontSize:9, letterSpacing:'.2em', color:'rgba(255,255,255,.4)', fontWeight:700 }}>MPLAD VIGILANCE SYSTEM</div>
                </div>
              </div>
              <p style={{ fontSize:13, color:'rgba(255,255,255,.55)', lineHeight:1.65, maxWidth:280 }}>AI-powered watchdog for anomaly, fraud & inefficiency detection in MPLAD Scheme implementation.</p>
              <p className="font-hindi" style={{ marginTop:10, fontSize:13, color:'#FFB25A' }}>पारदर्शिता का प्रहरी — हर रुपया, हिसाब के साथ।</p>
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:11, letterSpacing:'.12em', color:'rgba(255,255,255,.35)', marginBottom:14 }}>STORY</div>
              {['The Promise','The Leakage','Case Files','AI Engines','Live Dashboard'].map(l=>(
                <a key={l} href={`#${l.toLowerCase().replace(/\s/g,'-')}`} style={{ display:'block', fontSize:13, color:'rgba(255,255,255,.65)', marginBottom:8, textDecoration:'none', transition:'color .2s' }}
                  onMouseEnter={e=>e.target.style.color='#FF6B1A'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.65)'}>{l}</a>
              ))}
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:11, letterSpacing:'.12em', color:'rgba(255,255,255,.35)', marginBottom:14 }}>ACT</div>
              {['Report Fraud','Verify a Work','MP / DM Login (Demo)','Download Report (PDF)'].map(l=>(
                <a key={l} href="#citizen" style={{ display:'block', fontSize:13, color:'rgba(255,255,255,.65)', marginBottom:8, textDecoration:'none', transition:'color .2s' }}
                  onMouseEnter={e=>e.target.style.color='#FF6B1A'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.65)'}>{l}</a>
              ))}
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:11, letterSpacing:'.12em', color:'rgba(255,255,255,.35)', marginBottom:14 }}>HELPLINE</div>
              <div style={{ background:'rgba(255,255,255,.07)', borderRadius:18, padding:'16px 18px', border:'1px solid rgba(255,255,255,.08)' }}>
                <div className="font-display" style={{ fontWeight:900, fontSize:'1.5rem' }}>1800-XXX-XXXX</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.5)', marginTop:4 }}>Toll-free • 8 AM – 8 PM • 12 languages</div>
                <div style={{ marginTop:10, fontSize:11, fontFamily:'IBM Plex Mono' }}>✉️ help-satark@gov-demo.in</div>
              </div>
            </div>
          </div>
          <div style={{ borderTop:'1px solid rgba(255,255,255,.08)', paddingTop:20, display:'flex', flexWrap:'wrap', justifyContent:'space-between', gap:12, fontSize:11, color:'rgba(255,255,255,.3)' }}>
            <span>© 2026 SATARK AI — Demonstration prototype for educational purposes. All project data shown is synthetic. Not an official Government of India website.</span>
            <span style={{ display:'flex', gap:16 }}>
              {['Privacy','Terms','Accessibility','हिंदी'].map(l=>(
                <a key={l} href="#" style={{ color:'rgba(255,255,255,.3)', textDecoration:'none', transition:'color .2s' }}
                  onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.3)'}>{l}</a>
              ))}
            </span>
          </div>
        </div>
      </footer>

      {/* Floating chat bot */}
      <button onClick={()=>setChatOpen(v=>!v)}
        style={{ position:'fixed', bottom:24, right:24, zIndex:300, width:60, height:60, borderRadius:'50%', background:'#FF6B1A', border:'3px solid #0B1D3A', boxShadow:'0 8px 24px rgba(0,0,0,.4)', fontSize:28, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'transform .2s', animation:'glowPulse 3s infinite' }}
        onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'}
        onMouseLeave={e=>e.currentTarget.style.transform=''}>
        🤖
        <span style={{ position:'absolute', top:-4, right:-4, width:18, height:18, background:'#DC2626', border:'2px solid #fff', borderRadius:'50%', fontSize:9, color:'#fff', fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center' }}>1</span>
      </button>

      {/* Chat panel */}
      {chatOpen && (
        <div style={{ position:'fixed', bottom:96, right:24, zIndex:300, width:340, background:'#fff', borderRadius:24, border:'2px solid #0B1D3A', boxShadow:'0 24px 80px rgba(0,0,0,.4)', overflow:'hidden' }}>
          {/* Header */}
          <div style={{ background:'#0B1D3A', color:'#fff', padding:'14px 18px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:'50%', background:'#FF6B1A', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>🤖</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800, fontSize:14 }}>SATARK Mitra</div>
              <div style={{ fontSize:11, color:'#4ADE80', display:'flex', alignItems:'center', gap:5 }}>
                <span className="live-dot" style={{ width:6, height:6, background:'#4ADE80', borderRadius:'50%', display:'inline-block' }}/>
                Online • Hindi + English
              </div>
            </div>
            <button onClick={()=>setChatOpen(false)} style={{ background:'none', border:'none', color:'rgba(255,255,255,.6)', cursor:'pointer', fontSize:20, lineHeight:1 }}>✕</button>
          </div>
          {/* Messages */}
          <div ref={chatRef} style={{ height:260, overflowY:'auto', padding:'14px', background:'#FFF8ED', display:'flex', flexDirection:'column', gap:10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ maxWidth:'85%', padding:'10px 14px', borderRadius:16, fontSize:13, lineHeight:1.5, background:m.from==='bot'?'#fff':'#0B1D3A', color:m.from==='bot'?'#0B1D3A':'#fff', alignSelf:m.from==='user'?'flex-end':'flex-start', boxShadow:'0 2px 8px rgba(0,0,0,.08)', whiteSpace:'pre-wrap' }}>
                {m.text}
              </div>
            ))}
          </div>
          {/* Suggestions */}
          <div style={{ padding:'8px 14px', borderTop:'1px solid rgba(11,29,58,.08)', display:'flex', flexWrap:'wrap', gap:6 }}>
            {['What is MPLAD?','How to report fraud?','Check my complaint'].map(s=>(
              <button key={s} onClick={()=>sendMsg(s)} style={{ fontSize:11, fontWeight:700, border:'1px solid rgba(11,29,58,.15)', borderRadius:999, padding:'4px 10px', background:'none', cursor:'pointer', fontFamily:'inherit', transition:'background .2s, color .2s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='#0B1D3A';e.currentTarget.style.color='#fff';}} onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color='#0B1D3A';}}>{s}</button>
            ))}
          </div>
          {/* Input */}
          <div style={{ padding:'10px 14px', borderTop:'2px solid rgba(11,29,58,.06)', background:'#fff', display:'flex', gap:8 }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()} placeholder="Ask in Hindi/English..."
              style={{ flex:1, background:'#FFF8ED', border:'2px solid rgba(11,29,58,.12)', borderRadius:12, padding:'8px 12px', fontSize:13, outline:'none', fontFamily:'inherit' }}
              onFocus={e=>e.target.style.borderColor='#FF6B1A'} onBlur={e=>e.target.style.borderColor='rgba(11,29,58,.12)'}/>
            <button onClick={()=>sendMsg()} style={{ background:'#FF6B1A', color:'#fff', border:'2px solid #0B1D3A', borderRadius:12, padding:'8px 14px', fontWeight:700, cursor:'pointer', fontSize:16, fontFamily:'inherit' }}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

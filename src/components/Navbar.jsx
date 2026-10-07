import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScroll';

const CHAPTERS = [
  ['top','Ch 1 — Opening'],['promise','Ch 2 — The Promise'],['problem','Ch 3 — The Leakage'],
  ['cases','Ch 4 — Case Files'],['solution','Ch 5 — SATARK AI'],['how','Ch 6 — How It Works'],
  ['dashboard','Ch 7 — Command Center'],['field','Ch 8 — Field Truth'],['stakeholders','Ch 9 — For Everyone'],
  ['impact','Ch 10 — Impact'],
];

export default function Navbar() {
  const [scrollPct, setScrollPct] = useState(0);
  const [curChapter, setCurChapter] = useState('top');
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef(null);

  const onScroll = useCallback((progress, scrollY) => {
    setScrollPct(progress * 100);
    // find current chapter
    let active = 'top';
    CHAPTERS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) active = id;
    });
    setCurChapter(active);
  }, []);

  useScrollProgress(onScroll);

  const chapterLabel = CHAPTERS.find(([id]) => id === curChapter)?.[1] ?? '';

  return (
    <>
      {/* Tricolor progress bar */}
      <div className="scroll-progress-bar">
        <div
          className="scroll-progress-fill tricolor-bar"
          style={{ width: `${scrollPct}%`, transition: 'width 0.05s linear' }}
        />
      </div>

      {/* Gov top bar */}
      <div style={{ background: '#0B1D3A', color: '#fff', fontSize: '11px' }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'6px 24px' }}>
          <span style={{ fontWeight:700, letterSpacing:'.08em', opacity:.8 }}>
            भारत सरकार | GOVT. OF INDIA&nbsp;&nbsp;•&nbsp;&nbsp;
            <span className="font-hindi">सांसद आदर्श ग्राम योजना • MPLADS</span>
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ display:'flex', alignItems:'center', gap:6, opacity:.7 }}>
              <span className="live-dot" style={{ width:8, height:8, borderRadius:'50%', background:'#4ADE80', display:'inline-block' }} />
              SYSTEM LIVE • 28 STATES
            </span>
            <a href="#citizen" style={{ background:'#FF6B1A', color:'#fff', padding:'3px 12px', borderRadius:999, fontWeight:700, textDecoration:'none', fontSize:11 }}>
              Helpline 1800-XXX-XXXX
            </a>
          </div>
        </div>
        <div className="tricolor-bar" style={{ height:3 }} />
      </div>

      {/* Main nav */}
      <nav style={{
        position:'sticky', top:0, zIndex:100,
        background:'rgba(255,254,247,.92)', backdropFilter:'blur(20px)',
        borderBottom:'2px solid rgba(11,29,58,.08)',
        WebkitBackdropFilter:'blur(20px)',
      }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 24px' }}>
          {/* Logo */}
          <a href="#top" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', color:'inherit' }}>
            <div style={{ width:44, height:44, borderRadius:12, background:'#0B1D3A', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #0B1D3A', transform:'rotate(-3deg)', boxShadow:'4px 4px 0 #FF6B1A' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B1A" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <div className="font-display" style={{ fontWeight:900, fontSize:'1.2rem', lineHeight:1 }}>SATARK <span style={{ color:'#FF6B1A' }}>AI</span></div>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:'.25em', opacity:.5 }}>TRANSPARENCY KA PRAHARI</div>
            </div>
          </a>

          {/* Desktop links */}
          <div style={{ display:'flex', alignItems:'center', gap:24, fontSize:13, fontWeight:700, color:'rgba(11,29,58,.8)' }} className="desktop-nav">
            {[['#promise','Story'],['#problem','Problem'],['#solution','AI Solution'],['#dashboard','Live Dashboard'],['#field','Field Proof'],['#citizen','Citizens']].map(([href,label]) => (
              <a key={href} href={href} style={{ textDecoration:'none', color:'inherit', transition:'color .2s' }}
                 onMouseEnter={e=>e.target.style.color='#FF6B1A'}
                 onMouseLeave={e=>e.target.style.color='rgba(11,29,58,.8)'}>{label}</a>
            ))}
          </div>

          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <Link to="/login" style={{
              background:'#FF6B1A', color:'#fff', fontWeight:800, fontSize:13,
              padding:'10px 18px', borderRadius:999, border:'2px solid #0B1D3A',
              boxShadow:'4px 4px 0 #0B1D3A', textDecoration:'none',
              transition:'background .2s',
            }}
              onMouseEnter={e=>e.currentTarget.style.background='#0B1D3A'}
              onMouseLeave={e=>e.currentTarget.style.background='#FF6B1A'}
            >Govt / MP Login</Link>
            {/* Hamburger */}
            <button onClick={() => setMobileOpen(v => !v)}
              style={{ background:'none', border:'2px solid #0B1D3A', borderRadius:'50%', width:40, height:40, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, cursor:'pointer' }}
              className="hamburger-btn">
              <span style={{ width:18, height:2, background:'#0B1D3A', display:'block' }}/>
              <span style={{ width:18, height:2, background:'#0B1D3A', display:'block' }}/>
              <span style={{ width:18, height:2, background:'#0B1D3A', display:'block' }}/>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ borderTop:'2px solid rgba(11,29,58,.08)', background:'#FFFEF7', padding:'16px 24px', display:'flex', flexDirection:'column', gap:12, fontWeight:700 }}>
            {[['#promise','01 • The Promise'],['#problem','02 • The Leakage'],['#cases','03 • Case Files'],['#solution','04 • SATARK AI'],['#dashboard','05 • Live Dashboard'],['#field','06 • Field Truth'],['#citizen','07 • Citizens']].map(([href,label]) => (
              <a key={href} href={href} style={{ textDecoration:'none', color:'#0B1D3A' }} onClick={() => setMobileOpen(false)}>{label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Chapter nav dots */}
      <div style={{ position:'fixed', right:16, top:'50%', transform:'translateY(-50%)', zIndex:90, display:'flex', flexDirection:'column', gap:10, alignItems:'center' }}
           className="chapter-nav">
        <div style={{ fontSize:9, fontFamily:'IBM Plex Mono', fontWeight:700, color:'rgba(11,29,58,.4)', writingMode:'vertical-lr', letterSpacing:'.1em', marginBottom:4 }}>CHAPTERS</div>
        {CHAPTERS.map(([id]) => (
          <div key={id} className={`chapter-dot ${curChapter===id ? 'active' : ''}`}
               onClick={() => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })} />
        ))}
      </div>

      {/* Chapter label bottom-left */}
      <div style={{ position:'fixed', left:16, bottom:16, zIndex:90, background:'#0B1D3A', color:'#fff', fontSize:11, fontWeight:700, padding:'6px 14px', borderRadius:999, display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 20px rgba(0,0,0,.3)' }}>
        <span className="live-dot" style={{ width:8, height:8, borderRadius:'50%', background:'#FF6B1A', display:'inline-block' }} />
        {chapterLabel}
      </div>
    </>
  );
}

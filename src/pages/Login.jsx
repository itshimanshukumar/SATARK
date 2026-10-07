import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('dm');
  
  const handleLogin = (e) => {
    e.preventDefault();
    navigate(`/app/${role}`);
  };

  return (
    <div style={{ minHeight:'100vh', background:'#060F24', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div className="paper-texture" style={{ position:'absolute', inset:0, opacity:0.1, pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:-100, right:-100, width:400, height:400, borderRadius:'50%', background:'rgba(255,107,26,.15)', filter:'blur(80px)' }} />
      <div style={{ position:'absolute', bottom:-100, left:-100, width:400, height:400, borderRadius:'50%', background:'rgba(14,124,75,.15)', filter:'blur(80px)' }} />
      
      <div style={{ background:'#fff', borderRadius:28, width:'100%', maxWidth:440, padding:40, position:'relative', zIndex:10, border:'2px solid #0B1D3A', boxShadow:'12px 12px 0 #FF6B1A' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:56, height:56, borderRadius:16, background:'#0B1D3A', margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #0B1D3A', transform:'rotate(-4deg)', boxShadow:'4px 4px 0 #FF6B1A' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B1A" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <h1 className="font-display" style={{ fontWeight:900, fontSize:'1.8rem', color:'#0B1D3A' }}>SATARK AI</h1>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:'.1em', color:'#6B7280', marginTop:4 }}>SECURE ACCESS PORTAL</p>
        </div>

        <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div>
            <label style={{ fontSize:13, fontWeight:800, color:'#0B1D3A', marginBottom:8, display:'block' }}>Select Role / Dashboard</label>
            <select value={role} onChange={e=>setRole(e.target.value)}
              style={{ width:'100%', padding:'12px 16px', borderRadius:14, border:'2px solid rgba(11,29,58,.15)', background:'#FFF8ED', fontSize:14, fontWeight:700, color:'#0B1D3A', outline:'none', cursor:'pointer' }}>
              <option value="dm">District Collector (Command Center)</option>
              <option value="mp">Member of Parliament</option>
              <option value="auditor">CAG / Auditor</option>
              <option value="citizen">Citizen (Public Portal)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize:13, fontWeight:800, color:'#0B1D3A', marginBottom:8, display:'block' }}>Government ID / Email</label>
            <input type="text" placeholder="e.g. collector-nalanda@gov.in" required
              style={{ width:'100%', padding:'12px 16px', borderRadius:14, border:'2px solid rgba(11,29,58,.15)', background:'#FFF8ED', fontSize:14, color:'#0B1D3A', outline:'none', boxSizing:'border-box' }}
              onFocus={e=>e.target.style.borderColor='#FF6B1A'} onBlur={e=>e.target.style.borderColor='rgba(11,29,58,.15)'}
            />
          </div>

          <div>
            <label style={{ fontSize:13, fontWeight:800, color:'#0B1D3A', marginBottom:8, display:'block' }}>Secure PIN</label>
            <input type="password" placeholder="••••••••" required
              style={{ width:'100%', padding:'12px 16px', borderRadius:14, border:'2px solid rgba(11,29,58,.15)', background:'#FFF8ED', fontSize:14, color:'#0B1D3A', outline:'none', boxSizing:'border-box' }}
              onFocus={e=>e.target.style.borderColor='#FF6B1A'} onBlur={e=>e.target.style.borderColor='rgba(11,29,58,.15)'}
            />
          </div>

          <button type="submit" style={{ marginTop:12, width:'100%', background:'#FF6B1A', color:'#fff', fontWeight:800, padding:'14px', borderRadius:14, border:'2px solid #0B1D3A', cursor:'pointer', fontSize:15, boxShadow:'4px 4px 0 #0B1D3A', transition:'transform .1s', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            Authenticate & Login →
          </button>
        </form>

        <div style={{ marginTop:24, textAlign:'center', fontSize:11, color:'#9CA3AF', fontFamily:'IBM Plex Mono' }}>
          By logging in, you agree to the National Data Sharing & Accessibility Policy (NDSAP).
        </div>
      </div>
    </div>
  );
}

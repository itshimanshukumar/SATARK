import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('dm');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Call Supabase Authentication
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      // Successful login, navigate to the selected dashboard
      navigate(`/app/${role}`);
    }
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

        {error && (
          <div style={{ background:'#FEF2F2', color:'#DC2626', padding:'12px', borderRadius:12, fontSize:13, fontWeight:700, marginBottom:20, border:'1px solid #FECACA' }}>
            Error: {error}
          </div>
        )}

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
            <label style={{ fontSize:13, fontWeight:800, color:'#0B1D3A', marginBottom:8, display:'block' }}>Email</label>
            <input type="email" placeholder="e.g. collector@gov.in" required value={email} onChange={e=>setEmail(e.target.value)}
              style={{ width:'100%', padding:'12px 16px', borderRadius:14, border:'2px solid rgba(11,29,58,.15)', background:'#FFF8ED', fontSize:14, color:'#0B1D3A', outline:'none', boxSizing:'border-box' }}
              onFocus={e=>e.target.style.borderColor='#FF6B1A'} onBlur={e=>e.target.style.borderColor='rgba(11,29,58,.15)'}
            />
          </div>

          <div>
            <label style={{ fontSize:13, fontWeight:800, color:'#0B1D3A', marginBottom:8, display:'block' }}>Password</label>
            <input type="password" placeholder="••••••••" required value={password} onChange={e=>setPassword(e.target.value)}
              style={{ width:'100%', padding:'12px 16px', borderRadius:14, border:'2px solid rgba(11,29,58,.15)', background:'#FFF8ED', fontSize:14, color:'#0B1D3A', outline:'none', boxSizing:'border-box' }}
              onFocus={e=>e.target.style.borderColor='#FF6B1A'} onBlur={e=>e.target.style.borderColor='rgba(11,29,58,.15)'}
            />
          </div>

          <button type="submit" disabled={loading} style={{ marginTop:12, width:'100%', background:'#FF6B1A', color:'#fff', fontWeight:800, padding:'14px', borderRadius:14, border:'2px solid #0B1D3A', cursor:loading?'not-allowed':'pointer', fontSize:15, boxShadow:'4px 4px 0 #0B1D3A', transition:'transform .1s', display:'flex', alignItems:'center', justifyContent:'center', gap:8, opacity:loading?0.7:1 }}>
            {loading ? 'Authenticating...' : 'Authenticate & Login →'}
          </button>
        </form>

        {role === 'citizen' && (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:12, margin:'24px 0' }}>
              <div style={{ flex:1, height:1, background:'rgba(11,29,58,.1)' }} />
              <div style={{ fontSize:11, fontWeight:800, color:'#9CA3AF' }}>OR</div>
              <div style={{ flex:1, height:1, background:'rgba(11,29,58,.1)' }} />
            </div>

            <button 
              onClick={async () => {
                const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/app/citizen` } });
                if(error) setError(error.message);
              }}
              style={{ width:'100%', background:'#fff', color:'#0B1D3A', fontWeight:800, padding:'14px', borderRadius:14, border:'2px solid #0B1D3A', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', gap:12 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Sign in with Google
            </button>
          </>
        )}

        <div style={{ marginTop:24, textAlign:'center', fontSize:11, color:'#9CA3AF', fontFamily:'IBM Plex Mono' }}>
          By logging in, you agree to the National Data Sharing & Accessibility Policy (NDSAP).
        </div>
      </div>
    </div>
  );
}

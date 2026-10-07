import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Search, Bell, ShieldAlert, Users, LayoutDashboard, Home } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine role from URL to display proper header info
  let roleTitle = "Govt Official";
  let roleSub = "Admin Account";
  let Icon = LayoutDashboard;
  
  if (location.pathname.includes('/mp')) {
    roleTitle = "Member of Parliament";
    roleSub = "Lucknow Constituency";
    Icon = Users;
  } else if (location.pathname.includes('/auditor')) {
    roleTitle = "CAG Auditor";
    roleSub = "Forensic Division";
    Icon = ShieldAlert;
  } else if (location.pathname.includes('/citizen')) {
    roleTitle = "Citizen";
    roleSub = "Public Portal";
    Icon = Home;
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'#FFFEF7' }}>
      {/* Topbar (No Sidebar) */}
      <header style={{ background:'#0B1D3A', color:'#fff', borderBottom:'1px solid rgba(255,255,255,.1)', padding:'12px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:100 }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:'#FF6B1A', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:'1.2rem', color:'#fff' }}>S</div>
          <div>
            <div className="font-display" style={{ fontWeight:900, fontSize:'1.2rem' }}>SATARK AI</div>
            <div style={{ fontSize:9, letterSpacing:'.15em', color:'rgba(255,255,255,.5)', fontWeight:700 }}>SECURE WORKSPACE</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ position:'relative', maxWidth:400, width:'100%', margin:'0 32px' }}>
          <Search size={16} color="#9CA3AF" style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)' }} />
          <input placeholder="Search projects, files, or vendors..." style={{ width:'100%', background:'rgba(255,255,255,.1)', color:'#fff', border:'1px solid rgba(255,255,255,.2)', borderRadius:99, padding:'10px 16px 10px 40px', fontSize:13, outline:'none' }} />
        </div>

        {/* Profile & Logout */}
        <div style={{ display:'flex', alignItems:'center', gap:24 }}>
          <div style={{ position:'relative', cursor:'pointer' }}>
            <Bell size={20} color="rgba(255,255,255,.8)" />
            <span style={{ position:'absolute', top:-2, right:-2, width:8, height:8, background:'#EF4444', borderRadius:'50%' }} />
          </div>
          
          <div style={{ display:'flex', alignItems:'center', gap:12, paddingLeft:24, borderLeft:'1px solid rgba(255,255,255,.2)' }}>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontWeight:800, fontSize:13 }}>{roleTitle}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,.6)' }}>{roleSub}</div>
            </div>
            <div style={{ width:40, height:40, borderRadius:12, background:'rgba(255,255,255,.1)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon size={20} />
            </div>
          </div>

          <button onClick={() => navigate('/')} style={{ marginLeft:12, display:'flex', alignItems:'center', gap:8, padding:'10px 16px', background:'#FF6B1A', color:'#fff', border:'none', borderRadius:12, cursor:'pointer', fontWeight:800, fontSize:13, transition:'background .2s', boxShadow:'4px 4px 0 rgba(0,0,0,.2)' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex:1, overflowY:'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}

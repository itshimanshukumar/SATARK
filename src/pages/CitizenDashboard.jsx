import React, { useState } from 'react';
import { MapPin, Camera, CheckCircle2, MessageSquare } from 'lucide-react';

export default function CitizenDashboard() {
  const [reported, setReported] = useState(false);

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: '2rem', color: '#0B1D3A' }}>My Village Portal</h2>
          <div style={{ display:'flex', alignItems:'center', gap:6, color: '#0E7C4B', marginTop: 4, fontWeight:700 }}>
            <MapPin size={16} /> Rampur Village, Gorakhpur District
          </div>
        </div>
        <div style={{ background:'#FFF8ED', border:'2px solid #FF6B1A', padding:'8px 16px', borderRadius:99, fontSize:13, fontWeight:700, color:'#FF6B1A' }}>
          Language: English | हिंदी
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
        {/* Project Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800 }}>Ongoing & Completed Works Near You</h3>
          
          {[
            { title: 'Primary School Boundary Wall', cost: '₹12 Lakhs', status: 'Completed', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop', verified: true },
            { title: 'Ward 4 Concrete Road', cost: '₹24 Lakhs', status: 'In Progress', img: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=400&auto=format&fit=crop', verified: false },
          ].map((w, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, border: '1px solid #E5E7EB', overflow:'hidden', display:'flex' }}>
              <img src={w.img} style={{ width: 140, objectFit:'cover' }} alt="project"/>
              <div style={{ padding: 20, flex: 1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <h4 style={{ fontWeight: 800, fontSize: 16, color: '#0B1D3A' }}>{w.title}</h4>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 999, background: w.status === 'Completed' ? '#DCFCE7' : '#FEF3C7', color: w.status === 'Completed' ? '#166534' : '#92400E' }}>{w.status}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Sanctioned Cost: <strong>{w.cost}</strong></div>
                </div>
                <div style={{ display:'flex', gap:10, marginTop:16 }}>
                  {w.verified ? (
                     <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:'#0E7C4B' }}><CheckCircle2 size={16}/> Verified by Citizens</div>
                  ) : (
                    <>
                      <button onClick={()=>alert('Vote recorded! Thank you for verifying.')} style={{ flex:1, background: '#0B1D3A', color: '#fff', border: 'none', padding: '8px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize:13 }}>Vote 👍 Correct</button>
                      <button onClick={()=>alert('Issue reported. Opening detailed form...')} style={{ flex:1, background: '#F3F4F6', color: '#DC2626', border: 'none', padding: '8px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize:13 }}>Report Issue 👎</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report form widget */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 16, border: '2px solid #0B1D3A', boxShadow: '8px 8px 0 #0B1D3A', alignSelf:'start' }}>
          <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 16, color:'#0B1D3A' }}>See a problem? Report it.</h3>
          
          {!reported ? (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <select style={{ width:'100%', padding:'10px 14px', borderRadius:8, border:'1px solid #D1D5DB', background:'#F9FAFB', fontSize:13, outline:'none' }}>
                <option>Select Issue Type</option>
                <option>Work not started</option>
                <option>Poor quality materials</option>
                <option>Left incomplete</option>
              </select>
              <textarea placeholder="Describe the issue..." rows={3} style={{ width:'100%', padding:'10px 14px', borderRadius:8, border:'1px solid #D1D5DB', background:'#F9FAFB', fontSize:13, outline:'none', resize:'vertical' }}></textarea>
              <button style={{ width:'100%', border:'2px dashed #D1D5DB', background:'#fff', padding:'12px', borderRadius:8, color:'#6B7280', fontWeight:700, fontSize:13, display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer' }}>
                <Camera size={16}/> Attach Photo (GPS tagged)
              </button>
              <button onClick={()=>setReported(true)} style={{ width:'100%', background: '#FF6B1A', color: '#fff', border: 'none', padding: '12px', borderRadius: 8, fontWeight: 800, cursor: 'pointer', fontSize:14, marginTop:8 }}>
                Submit Report
              </button>
              <div style={{ fontSize:11, color:'#9CA3AF', textAlign:'center', marginTop:4 }}>Or give a missed call to 1800-XXX-XXXX</div>
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'20px 0' }}>
              <CheckCircle2 size={48} color="#0E7C4B" style={{ margin:'0 auto 12px' }}/>
              <div style={{ fontWeight:800, fontSize:16 }}>Report Submitted!</div>
              <div style={{ fontSize:13, color:'#6B7280', marginTop:6 }}>Tracking ID: SAT-2026-9481</div>
              <div style={{ fontSize:12, background:'#F3F4F6', padding:8, borderRadius:8, marginTop:12 }}>You will receive SMS updates on action taken.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

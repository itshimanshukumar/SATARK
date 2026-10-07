import React from 'react';
import { ShieldAlert, FileText, Search, Lock } from 'lucide-react';

export default function AuditorDashboard() {
  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: '2rem', color: '#0B1D3A' }}>Forensic Audit Panel</h2>
          <p style={{ color: '#6B7280', marginTop: 4 }}>CAG / Central Vigilance Commission Access</p>
        </div>
        <div style={{ display:'flex', gap:12 }}>
          <div style={{ background: '#FEF2F2', color: '#DC2626', padding: '10px 16px', borderRadius: 8, fontWeight: 700, fontSize:14, display:'flex', alignItems:'center', gap:8 }}>
            <ShieldAlert size={18} /> High Priority: 14 Cases
          </div>
          <button onClick={()=>alert('Generating Tamper-Proof Master PDF Report...')} style={{ background: '#0B1D3A', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', display:'flex', alignItems:'center', gap:8 }}>
             Export Master Report (PDF)
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        {/* Table Area */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E5E7EB', overflow:'hidden' }}>
          <div style={{ padding: 16, borderBottom: '1px solid #E5E7EB', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800 }}>Flagged Projects for Forensic Review</h3>
            <div style={{ position:'relative', width: 250 }}>
              <Search size={14} style={{position:'absolute', top:'50%', left:10, transform:'translateY(-50%)', color:'#9CA3AF'}}/>
              <input type="text" placeholder="Search Case ID..." style={{width:'100%', padding:'8px 10px 8px 32px', borderRadius:8, border:'1px solid #E5E7EB', fontSize:12, outline:'none'}}/>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#F9FAFB', fontSize: 12, color: '#6B7280' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>CASE ID / TITLE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>AI FLAG REASON</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>CONFIDENCE</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>STATUS</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'CAS-9021', title: 'Road Construction, Ward 4', flag: 'Ghost Work (Satellite mismatch)', conf: '98%', status: 'Court-Ready' },
                { id: 'CAS-8842', title: 'School Boundary Wall', flag: 'Cost Inflation / Duplicate Bill', conf: '91%', status: 'Evidence Gathering' },
                { id: 'CAS-8710', title: 'Water Pump Installation', flag: 'Quality Failure (Citizen Photo)', conf: '87%', status: 'Pending DM Review' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 800, color: '#0B1D3A' }}>{row.id}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>{row.title}</div>
                  </td>
                  <td style={{ padding: '16px', fontSize: 13, color:'#DC2626', fontWeight:600 }}>{row.flag}</td>
                  <td style={{ padding: '16px', fontWeight: 800, fontSize:14 }}>{row.conf}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 999, background: '#F3F4F6' }}>{row.status}</span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button onClick={()=>alert('Loading evidence bundle for ' + row.id)} style={{ background: '#FF6B1A', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6, fontWeight: 700, cursor: 'pointer', fontSize:12 }}>Review Evidence</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sidebar Analytics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#0B1D3A', color: '#fff', padding: 24, borderRadius: 16 }}>
            <Lock size={24} color="#4ADE80" style={{ marginBottom: 12 }} />
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Blockchain Audit Log</h3>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', lineHeight: 1.5 }}>
              All evidence files (photos, GPS logs, bills) are hashed and immutable. Ready for judicial proceedings.
            </p>
          </div>
          <div style={{ background: '#fff', padding: 24, borderRadius: 16, border: '1px solid #E5E7EB' }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, color:'#6B7280' }}>FRAUD TYPOLOGY (YTD)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
               {[
                 { t: 'Ghost Works', pct: '45%' },
                 { t: 'Cost Inflation', pct: '30%' },
                 { t: 'Substandard Materials', pct: '15%' },
                 { t: 'Duplicate Billing', pct: '10%' },
               ].map(f => (
                 <div key={f.t}>
                   <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, fontWeight:700, marginBottom:4 }}>
                     <span>{f.t}</span><span>{f.pct}</span>
                   </div>
                   <div style={{ height:6, background:'#F3F4F6', borderRadius:99, overflow:'hidden' }}>
                     <div style={{ width: f.pct, height:'100%', background:'#FF6B1A' }}/>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

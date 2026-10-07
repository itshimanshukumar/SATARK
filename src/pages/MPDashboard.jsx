import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function MPDashboard() {
  const barData = {
    labels: ['Education', 'Roads', 'Water', 'Health', 'Lighting', 'Others'],
    datasets: [{
      label: 'Funds Utilised (₹ Lakhs)',
      data: [120, 250, 80, 95, 45, 10],
      backgroundColor: '#FF6B1A',
      borderRadius: 4
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(11,29,58,.05)' } },
      x: { grid: { display: false } }
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: '2rem', color: '#0B1D3A' }}>MP Constituency View</h2>
          <p style={{ color: '#6B7280', marginTop: 4 }}>Lucknow Constituency • FY 2025-26</p>
        </div>
        <button onClick={()=>alert('Opening proposal form for new MPLAD project...')} style={{ background: '#0B1D3A', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
          + Propose New Work
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total Funds Allotted', val: '₹5.00 Cr', color: '#0B1D3A' },
          { label: 'Funds Utilised', val: '₹4.20 Cr', color: '#0E7C4B' },
          { label: 'Works Completed', val: '34', color: '#FF6B1A' },
          { label: 'Works Flagged (AI)', val: '3', color: '#DC2626' }
        ].map((k, i) => (
          <div key={i} style={{ background: '#fff', padding: 20, borderRadius: 16, border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: k.color }}>{k.val}</div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Chart */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 16, border: '1px solid #E5E7EB' }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Sector-wise Expenditure</h3>
          <div style={{ height: 300 }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* List */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 16, border: '1px solid #E5E7EB' }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Recent Works Recommended</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: 'Primary School Boundary Wall, Rampur', status: 'In Progress', cost: '₹12 Lakhs' },
              { name: 'CC Road construction at Ward 4', status: 'Completed', cost: '₹24 Lakhs' },
              { name: 'Installation of 50 Solar Street Lights', status: 'Tender Stage', cost: '₹15 Lakhs' },
              { name: 'Community Hall at Block HQ', status: 'Flagged (Delay)', cost: '₹45 Lakhs' },
            ].map((w, i) => (
              <div key={i} style={{ padding: 12, border: '1px solid #F3F4F6', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{w.name}</div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>Est. Cost: {w.cost}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 999, background: w.status.includes('Completed') ? '#DCFCE7' : w.status.includes('Flagged') ? '#FEE2E2' : '#FEF3C7', color: w.status.includes('Completed') ? '#166534' : w.status.includes('Flagged') ? '#991B1B' : '#92400E' }}>
                  {w.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

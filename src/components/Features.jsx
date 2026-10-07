import React from 'react';
import Reveal from './Reveal';
import { ShieldCheck, Satellite, Smartphone, FileSearch } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Satellite size={32} color="#FF6B1A" />,
      title: "Geospatial AI Verification",
      desc: "Cross-references vendor claims against real-time satellite imagery and GPS-tagged field photographs to detect 'ghost works'.",
      colSpan: 2,
    },
    {
      icon: <FileSearch size={32} color="#0E7C4B" />,
      title: "Smart Bill Auditing",
      desc: "Automatically flags inflated estimates and duplicate invoices across different wards.",
      colSpan: 1,
    },
    {
      icon: <Smartphone size={32} color="#3B82F6" />,
      title: "Citizen Ground Truth",
      desc: "Empowers locals to upvote/downvote ongoing projects via SMS or WhatsApp, creating an immutable ledger of public feedback.",
      colSpan: 1,
    },
    {
      icon: <ShieldCheck size={32} color="#8B5CF6" />,
      title: "Automated Compliance",
      desc: "Instantly freezes contractor payments if fraud probability exceeds 80%, notifying the District Magistrate and CAG.",
      colSpan: 2,
    }
  ];

  return (
    <section id="features" style={{ padding: '120px 0', background: '#FFFEF7' }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 className="font-display" style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0B1D3A' }}>
              Built for <span style={{ color: '#FF6B1A' }}>Transparency</span>.
            </h2>
            <p style={{ color: '#6B7280', fontSize: '1.2rem', maxWidth: 600, margin: '16px auto 0' }}>
              An enterprise-grade Command Center combining Satellite AI, forensic auditing, and citizen reporting to eliminate fund leakage.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ 
                background: '#fff', 
                borderRadius: 24, 
                padding: 40, 
                height: '100%',
                gridColumn: `span ${f.colSpan}`,
                border: '1px solid rgba(11,29,58,0.08)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.03)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'default'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.03)' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(11,29,58,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.4rem', color: '#0B1D3A', marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '1.05rem' }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

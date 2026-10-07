import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Reveal from './Reveal';

// Counter that animates from 0 → target
function Counter({ target, suffix = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let cur = 0;
      const step = target / 60;
      const iv = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(iv); }
        el.textContent = Math.floor(cur).toLocaleString('en-IN');
      }, 22);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>0</span>;
}

export default function Hero() {
  const canvasRef = useRef(null);

  // Three.js particle scene — only transform/opacity, GPU composited
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 8;

    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Particles
    const N = 600;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const c1 = new THREE.Color('#FF6B1A'), c2 = new THREE.Color('#4ADE80'), c3 = new THREE.Color('#ffffff');
    for (let i = 0; i < N; i++) {
      pos[i*3] = (Math.random()-.5)*22; pos[i*3+1] = (Math.random()-.5)*14; pos[i*3+2] = (Math.random()-.5)*10;
      const r = Math.random(), c = r<.3?c1:(r<.5?c2:c3);
      col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const m = new THREE.PointsMaterial({ size:.07, vertexColors:true, transparent:true, opacity:.85 });
    const pts = new THREE.Points(g, m);
    scene.add(pts);

    const globe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.2, 1),
      new THREE.MeshBasicMaterial({ color:0xFF6B1A, wireframe:true, transparent:true, opacity:.3 })
    );
    globe.position.set(5.5, 0.5, -1);
    scene.add(globe);

    let mx = 0, my = 0;
    const onMouse = (e) => { mx = e.clientX/window.innerWidth-.5; my = e.clientY/window.innerHeight-.5; };
    window.addEventListener('mousemove', onMouse, { passive: true });

    let t = 0, rafId;
    function anim() {
      rafId = requestAnimationFrame(anim);
      t += 0.002;
      pts.rotation.y = t * 0.4;
      globe.rotation.x += 0.003; globe.rotation.y += 0.005;
      camera.position.x += (mx * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (-my * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    anim();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
      renderer.dispose();
    };
  }, []);

  return (
    <header id="top" style={{ position:'relative', minHeight:'96vh', background:'#060F24', overflow:'hidden' }}>
      {/* Three.js canvas */}
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.7 }} />

      {/* Gradients */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(6,15,36,.4), transparent, #060F24)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:80, left:40, width:280, height:280, borderRadius:'50%', background:'rgba(255,107,26,.18)', filter:'blur(90px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:80, right:40, width:360, height:360, borderRadius:'50%', background:'rgba(14,124,75,.15)', filter:'blur(110px)', pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center', paddingTop:80, paddingBottom:40 }}>
        <div>
          {/* Live badge */}
          <Reveal>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.18)', borderRadius:999, padding:'6px 14px', fontSize:11, fontWeight:700, color:'#fff', marginBottom:24 }}>
              <span style={{ background:'#EF4444', color:'#fff', padding:'2px 8px', borderRadius:999, fontSize:10, display:'flex', alignItems:'center', gap:4 }}>
                <span className="live-dot" style={{ width:6, height:6, background:'#fff', borderRadius:'50%', display:'inline-block' }} />LIVE
              </span>
              AI IS SCANNING 18,442 PUBLIC WORKS RIGHT NOW
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display" style={{ fontWeight:900, color:'#fff', lineHeight:.95, fontSize:'clamp(2.8rem,6vw,5rem)', marginBottom:24 }}>
              Every Rupee.<br/>
              <span style={{ background:'linear-gradient(135deg,#FF6B1A,#FFB25A,#C49A12)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Every Road.</span><br/>
              Accounted For.
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p style={{ color:'rgba(255,255,255,.8)', fontSize:'1.1rem', lineHeight:1.65, maxWidth:520 }}>
              Meet <strong style={{ color:'#fff' }}>SATARK AI</strong> — an intelligent watchdog that detects{' '}
              <span style={{ background:'rgba(255,107,26,.35)', padding:'1px 4px', borderRadius:4 }}>ghost projects, inflated bills & delays</span>{' '}
              in government schemes before public money is lost.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginTop:32 }}>
              <a href="#dashboard" className="btn-primary" style={{ textDecoration:'none' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                See It Catch Fraud — Live
              </a>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.34}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:32, maxWidth:440 }}>
              {[
                [312, 'Cr', '₹ AT RISK DETECTED', '#fff'],
                [12480, '', 'PROJECTS SCANNED', '#fff'],
                [null, '94%', 'FRAUD ACCURACY', '#4ADE80'],
              ].map(([target, suffix, label, color], i) => (
                <div key={i} style={{ background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.12)', borderRadius:16, padding:'12px', textAlign:'center' }}>
                  <div className="font-display" style={{ fontWeight:900, fontSize:'1.8rem', color }}>
                    {target !== null ? <><Counter target={target}/>{suffix}</> : suffix}
                  </div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,.55)', fontWeight:700, letterSpacing:'.06em', marginTop:4 }}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — floating cards */}
        <div style={{ position:'relative', height:520, display:'flex', justifyContent:'center' }} className="hero-cards">
          {/* Card 1 — India Gate */}
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}
            style={{ position:'absolute', top:0, right:24, width:300, background:'#fff', borderRadius:20, overflow:'hidden', boxShadow:'0 24px 60px rgba(0,0,0,.4)', border:'8px solid #fff', transform:'rotate(2deg)', zIndex:10 }}>
            <div className="tape" />
            <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=600&auto=format&fit=crop" style={{ width:'100%', height:180, objectFit:'cover' }} alt="India Gate" loading="lazy"/>
            <div style={{ padding:'10px 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontWeight:800, fontSize:13 }}>New Parliament • Delhi</div>
                <div style={{ fontSize:11, color:'#666' }}>MPLADS Nodal Point</div>
              </div>
              <span style={{ background:'#E6F4EB', color:'#0E7C4B', fontSize:11, fontWeight:800, padding:'4px 10px', borderRadius:999 }}>✓ VERIFIED</span>
            </div>
          </motion.div>

          {/* Card 2 — AI Alert */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration:8, repeat:Infinity, ease:'easeInOut', delay:1.5 }}
            style={{ position:'absolute', top:220, left:0, width:280, background:'#fff', borderRadius:20, overflow:'hidden', boxShadow:'0 20px 50px rgba(0,0,0,.5)', border:'2px solid #0B1D3A', transform:'rotate(-2deg)', zIndex:20 }}>
            <div style={{ background:'#DC2626', color:'#fff', fontSize:11, fontWeight:800, padding:'8px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span>⚠ AI ALERT #8841</span>
              <span style={{ background:'#fff', color:'#DC2626', padding:'2px 8px', borderRadius:999, fontSize:10 }}>HIGH RISK</span>
            </div>
            <div style={{ padding:14 }}>
              <div style={{ fontWeight:800, fontSize:13 }}>CC Road — Gorakhpur, UP</div>
              <div style={{ fontSize:11, color:'#666', marginTop:4 }}>Estimate 38% above SOR • Same vendor 11 works</div>
              <div style={{ marginTop:10, height:6, background:'#f3f4f6', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', width:'87%', background:'#EF4444', borderRadius:99 }} />
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, fontWeight:700, marginTop:4 }}>
                <span>Risk Score</span><span style={{ color:'#DC2626' }}>87/100</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3 — scanning indicator */}
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut', delay:0.8 }}
            style={{ position:'absolute', top:'48%', right:'40%', background:'#0B1D3A', color:'#fff', borderRadius:16, padding:'12px 16px', zIndex:30, border:'1px solid rgba(255,255,255,.15)', boxShadow:'0 8px 32px rgba(0,0,0,.6)', transform:'rotate(2deg)' }}>
            <div style={{ fontSize:9, fontFamily:'IBM Plex Mono', color:'rgba(255,255,255,.5)' }}>SATARK AI ENGINE</div>
            <div style={{ fontWeight:700, fontSize:13, marginTop:2 }}>Scanning bill <span style={{ color:'#FF6B1A' }}>#INV-20931</span>...</div>
            <div style={{ display:'flex', gap:4, marginTop:8 }}>
              {['#FF6B1A','#FF6B1A','rgba(255,255,255,.2)','rgba(255,255,255,.2)'].map((c,i) => (
                <span key={i} style={{ width:22, height:5, background:c, borderRadius:4, display:'inline-block' }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,.1)', background:'rgba(0,0,0,.45)', overflow:'hidden', padding:'10px 0', position:'relative' }}>
        <div className="marquee-track" style={{ gap:40, fontSize:13, fontFamily:'IBM Plex Mono', color:'rgba(255,255,255,.75)' }}>
          {[
            '🔴 ALERT: Duplicate billing detected — Nalanda, Bihar — ₹18.4L',
            '🟢 VERIFIED: Solar lights installed — Jaipur — Geo-tag matched',
            '🟡 REVIEW: 214-day delay — Howrah School — Notice sent to DM',
            '🔴 ALERT: Cost +42% vs estimate — Lucknow drain work',
            '🟢 VERIFIED: Handpumps x12 — Kutch — Citizen photos matched',
          ].concat([
            '🔴 ALERT: Duplicate billing detected — Nalanda, Bihar — ₹18.4L',
            '🟢 VERIFIED: Solar lights installed — Jaipur — Geo-tag matched',
            '🟡 REVIEW: 214-day delay — Howrah School — Notice sent to DM',
            '🔴 ALERT: Cost +42% vs estimate — Lucknow drain work',
            '🟢 VERIFIED: Handpumps x12 — Kutch — Citizen photos matched',
          ]).map((t, i) => (
            <span key={i}>{t}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>
    </header>
  );
}

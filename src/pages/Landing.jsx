import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import Features from '../components/Features';

export default function Landing() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}

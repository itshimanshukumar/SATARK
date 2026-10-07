import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PromiseSection from '../components/Promise';
import Problem from '../components/Problem';
import CaseFiles from '../components/CaseFiles';
import Solution from '../components/Solution';
import Dashboard from '../components/Dashboard';
import FieldTruth from '../components/FieldTruth';
import Impact from '../components/Impact';
import Footer from '../components/Footer';

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
        <PromiseSection />
        <Problem />
        <CaseFiles />
        <Solution />
        <Dashboard />
        <FieldTruth />
        <Impact />
      </main>
      <Footer />
    </>
  );
}

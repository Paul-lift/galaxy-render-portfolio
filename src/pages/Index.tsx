import { Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';

// Lazy load the Three.js scene for better performance
const ThreeScene = lazy(() => import('@/components/ThreeScene'));

const Index = () => {
  return (
    <div className="relative">
      <Suspense fallback={<div className="fixed inset-0 bg-background -z-10" />}>
        <ThreeScene />
      </Suspense>
      
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <footer className="glass py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-mono">
            © 2025 Paul. Built with <span className="gradient-text">React</span>, <span className="gradient-text">Three.js</span> & cosmic energy ✨
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

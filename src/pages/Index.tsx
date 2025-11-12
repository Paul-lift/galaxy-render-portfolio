import { Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import content from '@/data/content.json';

const ThreeScene = lazy(() => import('@/components/ThreeScene'));

const Index = () => {
  const { footer } = content;

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
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>
            {footer.copyright}{' '}
            {footer.tech.map((tech, i) => (
              <span key={tech}>
                <span className="gradient-text">{tech}</span>
                {i < footer.tech.length - 1 && ', '}
              </span>
            ))}{' '}
            {footer.suffix}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Galaxy Shader Explorer',
    description: 'Interactive WebGL shader playground for creating and experimenting with procedural galaxy effects in real-time.',
    tags: ['Three.js', 'GLSL', 'React'],
    github: 'https://github.com',
    demo: 'https://example.com',
    gradient: 'from-purple-500/20 to-blue-500/20',
  },
  {
    title: 'Cosmic Portfolio',
    description: 'This very website - a futuristic portfolio featuring 3D graphics, particle systems, and smooth animations.',
    tags: ['React Three Fiber', 'Framer Motion', 'TypeScript'],
    github: 'https://github.com',
    demo: 'https://example.com',
    gradient: 'from-blue-500/20 to-pink-500/20',
  },
  {
    title: 'Neural Network Visualizer',
    description: 'Real-time 3D visualization of neural network training processes with interactive controls and data flow animations.',
    tags: ['WebGL', 'TensorFlow.js', 'D3.js'],
    github: 'https://github.com',
    demo: 'https://example.com',
    gradient: 'from-pink-500/20 to-purple-500/20',
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="min-h-screen flex items-center py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of my recent work showcasing creative coding and 3D graphics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass rounded-lg overflow-hidden hover:glow-primary transition-all duration-300 group"
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="secondary" className="glow-secondary">
                      <Github className="w-5 h-5" />
                    </Button>
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="secondary" className="glow-secondary">
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  </a>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

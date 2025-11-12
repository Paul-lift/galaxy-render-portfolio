import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Rocket } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code with modern best practices and elegant solutions.',
  },
  {
    icon: Palette,
    title: 'Creative Design',
    description: 'Blending technical expertise with artistic vision to create stunning visual experiences.',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Always exploring new technologies and pushing the boundaries of what\'s possible.',
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="min-h-screen flex items-center py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I'm a software engineering apprentice based in Switzerland, combining technical skills with
            creative vision to build unique digital experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass p-8 rounded-lg hover:glow-primary transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass p-8 rounded-lg max-w-3xl mx-auto mt-12"
        >
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
            When I'm not coding, you'll find me experimenting with shader programming, exploring the latest
            in WebGL and Three.js, or getting lost in the cosmos of creative possibilities that technology offers.
            My goal is to merge technical precision with artistic expression to create experiences that inspire.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

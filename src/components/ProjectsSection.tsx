import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import content from "@/data/content.json";
import { useTypewriter } from "@/hooks/useTypewriter";
import BlinkingCursor from "./ui/blinkingCursor";
import { useEncryptingTypewriter } from "@/hooks/useEncryptingTypewriter";
import WorkProjectCard from "./WorkProjectCard";

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-300px" });
  const { projects } = content;
  //title Typewriter
  const { displayedText: titleText, setShouldStart: setTitleStart } =
    useEncryptingTypewriter(projects.title, 50, 500);

    //description Typewriter
  const { displayedText: descriptionText, setShouldStart: setDescriptionStart } =
    useTypewriter(projects.description, 15, 2000);

  return (
    <section id="projects" className="py-80" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
          onAnimationComplete={() => {
            setTitleStart(true);
            setDescriptionStart(true);
          }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight min-h-[3em]">
            {titleText}
            <BlinkingCursor></BlinkingCursor>
          </h2>
          <p className="text-lg text-muted-foreground min-h-[2.5em]">
            {descriptionText}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.items.map((project, index) => (
            <WorkProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              gradient={project.gradient}
              tags={project.tags}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

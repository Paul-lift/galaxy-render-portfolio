import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import content from "@/data/content.json";
import SkillCard from "./SkillCard";
import { useEncryptingTypewriter } from "@/hooks/useEncryptingTypewriter";
import { useTypewriter } from "@/hooks/useTypewriter";
import BlinkingCursor from "./ui/blinkingCursor";

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { skills } = content;

  //title Typewriter
  const { displayedText: titleText, setShouldStart: setTitleStart } =
    useEncryptingTypewriter(skills.title, 50, 500);

  //description Typerwriter
  const {
    displayedText: descriptionText,
    setShouldStart: setDescriptionStart,
  } = useTypewriter(skills.description, 30, 1500);

  return (
    <section id="skills" className="py-32" ref={ref}>
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            {titleText}
            <BlinkingCursor></BlinkingCursor>
          </h2>
          <p className="text-lg text-muted-foreground min-h-[3rem]">{descriptionText}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.categories.map((category, categoryIndex) => (
            <SkillCard
              key={category.title}
              title={category.title}
              items={category.items}
              index={categoryIndex}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

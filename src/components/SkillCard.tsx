import { useEncryptingTypewriter } from "@/hooks/useEncryptingTypewriter";
import { motion } from "framer-motion";
import SkillItem from "./SkillItem";

interface Skill {
  name: string;
  level: string;
  percentage: number;
}

interface SkillCardProps {
  title: string;
  items: Skill[];
  index?: number;
  isInView?: boolean;
}

export default function SkillCard({
  title,
  items,
  index = 0,
  isInView = true,
}: SkillCardProps) {
    //title typewriter
    const { displayedText: titleText, setShouldStart: setTitleStart } = useEncryptingTypewriter(title, 50, 2750, );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-border rounded-lg p-6 bg-card/50"
        onAnimationComplete={() => {
          setTitleStart(true);
        }}
      >
      <h3 className="text-xl font-semibold mb-6 text-center min-h-[2rem]">{titleText}</h3>
      <div className="space-y-5">
        {items.map((skill, skillIndex) => (
          <SkillItem
            key={skill.name}
            skill={skill}
            categoryIndex={index}
            skillIndex={skillIndex}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
}

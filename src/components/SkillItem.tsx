import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useState, useEffect } from "react";

interface Skill {
  name: string;
  level: string;
  percentage: number;
}

interface SkillItemProps {
  skill: Skill;
  categoryIndex: number;
  skillIndex: number;
  isInView?: boolean;
}

export default function SkillItem({
  skill,
  categoryIndex,
  skillIndex,
  isInView = true,
}: SkillItemProps) {
  const [barWidth, setBarWidth] = useState(0);

  // Typewriter für Skill-Namen
  const { displayedText: skillName, setShouldStart: setSkillNameStart } = useTypewriter(
    skill.name,
    30,
    categoryIndex * 75 + skillIndex * 400 + 4000
  );

  // Wenn der Name vollständig ist, starte die Balken-Animation
  useEffect(() => {
    if (isInView && skillName.length === skill.name.length) {
      setBarWidth(skill.percentage);
    }
  }, [skillName, skill.name.length, skill.percentage, isInView]);

  // Starte den Typewriter wenn die Komponente in View ist
  useEffect(() => {
    if (isInView) {
      setSkillNameStart(true);
    }
  }, [isInView, setSkillNameStart]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{skillName}</span>
        <span className="text-xs text-muted-foreground px-2 py-1 bg-primary/10 rounded-md border border-primary/20">
          {skill.level}
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
        />
      </div>
    </motion.div>
  );
}

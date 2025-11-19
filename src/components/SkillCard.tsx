import { useEncryptingTypewriter } from "@/hooks/useEncryptingTypewriter";
import { motion } from "framer-motion";

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
    const { displayedText: titleText, setShouldStart: setTitleStart } = useEncryptingTypewriter(title, 50, 500, );

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
      <h3 className="text-xl font-semibold mb-6 text-center">{titleText}</h3>
      <div className="space-y-5">
        {items.map((skill, skillIndex) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + skillIndex * 0.05 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-xs text-muted-foreground px-2 py-1 bg-primary/10 rounded-md border border-primary/20">
                {skill.level}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.percentage}%` } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 + skillIndex * 0.05 + 0.3 }}
                className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

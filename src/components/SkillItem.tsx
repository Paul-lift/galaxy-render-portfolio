import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
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
          transition={{ duration: 0.8, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3 }}
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
        />
      </div>
    </motion.div>
  );
}

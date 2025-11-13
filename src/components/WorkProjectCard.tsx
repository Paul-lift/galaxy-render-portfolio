import { motion } from "framer-motion";

interface WorkProjectCardProps {
  title: string;
  description: string;
  gradient: string;
  tags: string[];
  index?: number;
  isInView?: boolean;
}

export default function WorkProjectCard({
  title,
  description,
  gradient,
  tags,
  index = 0,
  isInView = true,
}: WorkProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-border rounded-lg overflow-hidden transition-all duration-300 bg-card/50 group"
    >
      {/* Gradient Image Section */}
      <div className={`h-24 bg-gradient-to-br ${gradient} relative overflow-hidden`} />

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

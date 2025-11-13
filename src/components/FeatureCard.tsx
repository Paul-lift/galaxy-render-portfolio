import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useEncryptingTypewriter } from "@/hooks/useEncryptingTypewriter";
import { useTypewriter } from "@/hooks/useTypewriter";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
  isInView?: boolean;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
  isInView = true,
}: FeatureCardProps) {
  const { displayedText: titleText, setShouldStart: setTitleStart } =
    useEncryptingTypewriter(title, 50, 4000, 1, "full");

  const { displayedText: descriptionText, setShouldStart: setDescriptionStart } =
    useTypewriter(description, 15, 4000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300 bg-card/50 min-h-[20rem]"
      onAnimationComplete={() => {
        setTitleStart(true)
        setDescriptionStart(true)
      }}
    >
      <div className="flex flex-col items-start space-y-4 ">
        <div className="p-3 rounded-lg bg-primary/10 ">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">{titleText}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {descriptionText}
        </p>
      </div>
    </motion.div>
  );
}

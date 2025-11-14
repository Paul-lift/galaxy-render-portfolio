import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";  
import { useEncryptingTypewriter } from "@/hooks/useEncryptingTypewriter";

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
    const [descriptionStart, setDescriptionStart] = useState(false);

    //title Typewriter
    const { displayedText: titleText, setShouldStart: setTitleStart } =
      useEncryptingTypewriter(title, 50, 3500, 1, "full");

    //description Typewriter
    const { displayedText: descriptionText, setShouldStart: setDescriptionStartTyper } =
      useTypewriter(description, 15, 4000);

    // Wenn die Description anfängt Zeichen zu haben, setze descriptionStart
    useEffect(() => {
      if (descriptionText.length > 0 && !descriptionStart) {
        setDescriptionStart(true);
      }
    }, [descriptionText, descriptionStart]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-border rounded-lg overflow-hidden transition-all duration-300 bg-card/50 group"
      onAnimationComplete={() => {
        setTitleStart(true)
        setDescriptionStartTyper(true)
      }}
    >
      {/* Gradient Image Section */}
      <div className={`h-24 bg-gradient-to-br ${gradient} relative overflow-hidden`} />

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-semibold min-h-[2.5em]">{titleText}</h3>
        <p 
          className="text-muted-foreground text-sm leading-relaxed min-h-[5em]"
        >
          {descriptionText}
        </p>

        {/* Tags mit Spawn-In Effekt */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={descriptionStart ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: tagIndex * 0.1 }}
              className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

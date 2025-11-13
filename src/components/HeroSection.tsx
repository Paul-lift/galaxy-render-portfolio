import { motion } from "framer-motion";
import { ArrowDown, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/useTypewriter";
import content from "@/data/content.json";
import { reverse } from "dns";
import BlinkingCursor from "./ui/blinkingCursor";
import { useState } from "react";
import { useEncryptingTypewriter } from "@/hooks/useEncryptingTypewriter";

export default function HeroSection() {
  const { hero } = content;
  const [startTypewriter, setStartTypewriter] = useState(false);
  // Typewriter for name
  const { displayedText : nameText, setShouldStart : setNameStart } = useEncryptingTypewriter(
    `Hi, I'm ${hero.name}`,
    50,
    100
  );
  // Typewriter for tagline
  const { displayedText: taglineText, setShouldStart: setTaglineStart } =
    useTypewriter(hero.tagline, 15, 1000);

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <div className="container mx-auto px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-8"
          onAnimationComplete={() => {
            setNameStart(true);
            setTaglineStart(true);
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="inline-block text-xs tracking-widest text-muted-foreground font-medium uppercase">
              {hero.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            {nameText}
            <BlinkingCursor></BlinkingCursor>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            style={{
              minHeight: `${(hero.tagline.length/50) * 3}em`
            }}
          >
            {taglineText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4 min-h-[56px]"
          >
            <Button
              onClick={() => scrollToSection("#projects")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {hero.cta.primary}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center justify-center gap-6 pt-8 min-h-[40px]"
          >
            <a
              href={hero.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Rocket } from "lucide-react";
import content from "@/data/content.json";
import { useTypewriter } from "@/hooks/useTypewriter";
import BlinkingCursor from "./ui/blinkingCursor";
import { useEncryptingTypewriter } from "@/hooks/useEncryptingTypewriter";

const iconMap = {
  Code2: Code2,
  Palette: Palette,
  Rocket: Rocket,
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { about } = content;
  //TITLE 
  const { displayedText: titleText, setShouldStart: setTitleStart } =
    useEncryptingTypewriter(about.title, 50, 500, 1, "full");

  //description Typewriter
  const {
    displayedText: descriptionText,
    setShouldStart: setDescriptionStart,
  } = useTypewriter(about.description, 15, 1000);

  //BIO Typewriter
  const { displayedText: bioText, setShouldStart: setBioStart } = useTypewriter(
    about.bio,
    25,
    4000
  );

  return (
    <section id="about" className="py-32" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
          onAnimationComplete={() => {
            setTitleStart(true);
            setDescriptionStart(true);
            setBioStart(true);
          }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            {titleText}
            <BlinkingCursor></BlinkingCursor>
          </h2>
          <p
            className="text-lg text-muted-foreground"
            style={{
              minHeight: `${(about.description.length / 50) * 1.5}em`,
            }}
          >
            {descriptionText}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {about.features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300 bg-card/50"
              >
                <div className="flex flex-col items-start space-y-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-lg text-muted-foreground leading-relaxed min-h-[6em]">
            {bioText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

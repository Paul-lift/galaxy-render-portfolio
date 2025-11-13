import { useEffect, useState } from "react";

const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export function useEncryptingTypewriter(
  text: string,
  speed = 50,
  delay = 0,
  decryptSpeed = 1,
  mode: "progressive" | "full" = "progressive"
) {
  const [displayedText, setDisplayedText] = useState("");
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    if (!shouldStart) return;

    let iterations = 0;
    const textLength = text.length;

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        const currentIndex = Math.floor(iterations);
        
        if (mode === "progressive") {
          // Stück für Stück: Text wächst
          setDisplayedText(
            text
              .split("")
              .map((char, i) => {
                if (i < currentIndex) {
                  return char;
                }
                if (char === " " || char === "\n") {
                  return char;
                }
                if (i < currentIndex + 2) {
                  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
                }
                return "";
              })
              .join("")
          );
        } else {
          // Full: Ganzer Text mit Encryption, dann enthüllung
          setDisplayedText(
            text
              .split("")
              .map((char, i) => {
                if (i < currentIndex) {
                  return char;
                }
                if (char === " " || char === "\n") {
                  return char;
                }
                return CHARSET[Math.floor(Math.random() * CHARSET.length)];
              })
              .join("")
          );
        }

        iterations += decryptSpeed;
        if (iterations >= textLength) {
          clearInterval(interval);
          setDisplayedText(text);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, speed, delay, decryptSpeed, mode, shouldStart]);

  return { displayedText, setShouldStart };
}

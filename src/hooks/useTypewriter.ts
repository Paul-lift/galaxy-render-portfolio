import { useState, useEffect } from "react";

export function useTypewriter(
  text: string,
  speed = 50,
  delay = 0,
) {
  const [displayedText, setDisplayedText] = useState("");
  const [shouldStart, setShouldStart] = useState(false)

  useEffect(() => {
    if (!shouldStart) return
    let cancelled = false;
    setDisplayedText("");

    const type = (index = 0) => {
      if (cancelled || index > text.length) return;

      if (index === text.length) {
        return;
      }

      setDisplayedText(text.slice(0, index + 1));
      setTimeout(() => type(index + 1), speed);
    };

    const start = setTimeout(() => type(), delay);

    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [text, speed, delay, shouldStart]);

  return { displayedText, setShouldStart };
}

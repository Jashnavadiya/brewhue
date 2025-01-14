import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TextAnimation = () => {
  const [splitText, setSplitText] = useState([]);

  useEffect(() => {
    // Split the text into individual characters
    const text = "Hello World!";
    const characters = text.split("").map((char, index) => ({
      char,
      index,
    }));
    setSplitText(characters);
  }, []);

  return (
    <div style={{ overflow: "hidden", display: "inline-block" }}>
      <h1 style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {splitText.map((item, index) => (
          <motion.span
            key={index}
            initial={{ y: 40, opacity: 0 }}  // Start below the normal position
            animate={{ y: 0, opacity: 1 }}   // Animate upwards to final position
            transition={{
              delay: index * 0.1,              // Stagger the animation for each character
              duration: 0.8,                   // Slightly longer duration for bounce effect
              type: "spring",                  // Spring for bounce effect
              stiffness: 200,                  // Higher stiffness = stronger bounce
              damping: 20,                     // Higher damping = less bounce
            }}
          >
            {item.char}
          </motion.span>
        ))}
      </h1>
    </div>
  );
};

export default TextAnimation;

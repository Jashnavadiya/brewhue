import React from "react";
import { motion } from "framer-motion";

const TextAnimation = () => {
  const lines = [
    "Finest and Most Beautiful Brews, Every Time.",
    "An Ambience You'll Absolutely Love.",
    "Enjoy Our Exquisite Selection of Coffees.",
  ]; // Dynamic lines array

  return (
    <div>
      {lines.map((line, lineIndex) => (
        <motion.div
          key={lineIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: lineIndex * 0.5, // Delay each line animation based on its position
            duration: 0.5,
          }}
        >
          <h1>
            {Array.from(line).map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0 }} // Start below and invisible
                animate={{ y: 0, opacity: 1 }}  // Move to normal position and visible
                transition={{
                  delay: index * 0.05, // Stagger characters in the line
                  duration: 0.5,       // Bounce duration
                  type: "spring",      // Spring type for bounce effect
                  stiffness: 100,      // Bounce stiffness
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>
      ))}
    </div>
  );
};

export default TextAnimation;

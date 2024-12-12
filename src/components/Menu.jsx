// Menu.jsx
import React, { useEffect, useState } from "react";
import "../styles/Menu.css";

function Menu({ onStart }) {
  const originalText = "SYSTEM CRASH";
  const [displayText, setDisplayText] = useState(originalText);

  useEffect(() => {
    const glitchEffect = () => {
      const randomChars = "!@#$%^&*()1234567890";
      let glitchText = originalText
        .split("")
        .map((char, index) => {
          if (Math.random() > 0.8) {
            return randomChars.charAt(
              Math.floor(Math.random() * randomChars.length)
            );
          }
          return char;
        })
        .join("");

      setDisplayText(glitchText);

      setTimeout(() => {
        setDisplayText(originalText);
      }, 450);
    };

    const interval = setInterval(glitchEffect, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <button className="btn-retro text-glitch" onClick={onStart}>
          <strong>{displayText}</strong>
        </button>
      </div>
    </div>
  );
}

export default Menu;

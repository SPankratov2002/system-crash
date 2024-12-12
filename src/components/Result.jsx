import React, { useState, useEffect } from "react";

function Result({ score, averageTime, missed, onRestart }) {
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const autoRedirect = setTimeout(() => {
      onRestart();
    }, 10000);

    return () => {
      clearInterval(countdownTimer);
      clearTimeout(autoRedirect);
    };
  }, [onRestart]);

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <p className="text-glitch-2" style={{ textAlign: "left" }}>
          SCORE: {score}
        </p>
        <p className="text-glitch-2" style={{ textAlign: "left" }}>
          FAULT: {missed}
        </p>
        <p className="text-glitch-2" style={{ textAlign: "left" }}>
          Average time: {averageTime} s
        </p>
        <p
          className="text-glitch-2"
          style={{ marginTop: "1rem", textAlign: "left" }}
        >
          Returning to menu in <span>{secondsLeft}</span> seconds...
        </p>
      </div>
    </div>
  );
}

export default Result;

// Game.jsx
import React, { useState, useEffect } from "react";
import "../styles/Game.css";

function Game({ level, onFinish }) {
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [dots, setDots] = useState([]);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [spawnInterval, setSpawnInterval] = useState(1000);
  const [dotTimeout, setDotTimeout] = useState(3000);

  const levelConfig = {
    easy: { baseSpawnInterval: 1200, baseTimeout: 4000, speedIncrement: 50 },
    medium: { baseSpawnInterval: 900, baseTimeout: 3000, speedIncrement: 75 },
    hard: { baseSpawnInterval: 600, baseTimeout: 2000, speedIncrement: 100 },
  };

  const { baseSpawnInterval, baseTimeout, speedIncrement } = levelConfig[level];

  useEffect(() => {
    setSpawnInterval(baseSpawnInterval);
    setDotTimeout(baseTimeout);
  }, [level]);

  useEffect(() => {
    const generateDot = () => {
      const newDot = {
        id: Math.random(),
        x: Math.random() * 90 + 5,
        y: Math.random() * 80 + 10,
        createdAt: Date.now(),
        clicked: false,
      };

      setDots((prev) => [...prev, newDot]);

      setTimeout(() => {
        setDots((prev) =>
          prev.filter((dot) => {
            if (dot.id === newDot.id && !dot.clicked) {
              setMisses((prevMisses) => prevMisses + 1);
            }
            return dot.id !== newDot.id;
          })
        );
      }, dotTimeout);
    };

    const interval = setInterval(generateDot, spawnInterval);
    return () => clearInterval(interval);
  }, [spawnInterval, dotTimeout]);

  const handleClick = (id) => {
    const clickedDot = dots.find((dot) => dot.id === id && !dot.clicked);
    if (clickedDot) {
      const reactionTime = (Date.now() - clickedDot.createdAt) / 1000;
      setReactionTimes((prev) => [...prev, reactionTime]);
      setScore(score + 100);
      setDots(dots.filter((dot) => dot.id !== id));
    }
  };

  useEffect(() => {
    if (misses >= 5) {
      const avgTime =
        reactionTimes.length > 0
          ? (
              reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length
            ).toFixed(2)
          : 0;

      onFinish({ score, missed: misses, averageTime: avgTime });
    }
  }, [misses, onFinish, reactionTimes, score]);

  return (
    <div className="game-field-console">
      <h3 className="text-glitch-2">score: {score}</h3>
      <h4 className="text-glitch-2">fault: {misses}</h4>
      <div className="grid-console" />
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="dot-console"
          style={{
            top: `${dot.y}%`,
            left: `${dot.x}%`,
          }}
          onClick={() => handleClick(dot.id)}
        />
      ))}
    </div>
  );
}

export default Game;

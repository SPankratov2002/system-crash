// App.jsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "./components/Menu";
import LevelSelect from "./components/LevelSelect";
import Game from "./components/Game";
import Result from "./components/Result";

function App() {
  const [stage, setStage] = useState("menu");
  const [level, setLevel] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    averageTime: 0,
    missed: 0,
  });

  const startGame = (selectedLevel) => {
    setLevel(selectedLevel);
    setStage("game");
  };

  const finishGame = (gameResult) => {
    setResult(gameResult);
    setStage("result");
  };

  const restartGame = () => {
    setStage("menu");
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <>
      <div className="noise"></div>
      <div className=" text-center">
        <AnimatePresence mode="wait">
          {stage === "menu" && (
            <motion.div
              key="menu"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              <Menu onStart={() => setStage("levelSelect")} />
            </motion.div>
          )}

          {stage === "levelSelect" && (
            <motion.div
              key="levelSelect"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              <LevelSelect onSelectLevel={startGame} />
            </motion.div>
          )}

          {stage === "game" && (
            <motion.div
              key="game"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              <Game level={level} onFinish={finishGame} />
            </motion.div>
          )}

          {stage === "result" && (
            <motion.div
              key="result"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              <Result
                score={result.score}
                averageTime={result.averageTime}
                missed={result.missed}
                onRestart={restartGame}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;

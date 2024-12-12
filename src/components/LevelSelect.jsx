// LevelSelect.jsx
import React from "react";

function LevelSelect({ onSelectLevel }) {
  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="level-buttons">
          <button
            className="btn-retro text-glitch"
            onClick={() => onSelectLevel("easy")}
          >
            EAZY
          </button>
          <button
            className="btn-retro text-glitch"
            onClick={() => onSelectLevel("medium")}
          >
            MEDUIM
          </button>
          <button
            className="btn-retro text-glitch"
            onClick={() => onSelectLevel("hard")}
          >
            HARD
          </button>
        </div>
      </div>
    </div>
  );
}

export default LevelSelect;

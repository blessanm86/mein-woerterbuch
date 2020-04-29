import React, { useState, ChangeEvent } from "react";

interface Props {
  onToggle?: Function;
}

function Toggle({ onToggle }: Props) {
  const [mode, setToggle] = useState("words");

  function change(evt: ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    setToggle(value);
    onToggle && onToggle(value);
  }

  return (
    <div className="wb-toggle">
      <input
        type="radio"
        name="mode"
        value="words"
        id="toggle-words"
        checked={mode === "words"}
        onChange={change}
      />
      <label htmlFor="toggle-words">Words</label>
      <input
        type="radio"
        name="mode"
        value="quiz"
        id="toggle-quiz"
        checked={mode === "quiz"}
        onChange={change}
      />
      <label htmlFor="toggle-quiz">Quiz</label>
    </div>
  );
}

export default Toggle;

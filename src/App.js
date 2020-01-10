import React, { useState, useReducer } from "react";
import "./App.css";

const INITIAL_STATE = {
  word: "",
  article: "",
  meaning: "",
  note: "",
  isDisabled: true
};

function shouldDisableButton(values) {
  return values.some(value => !Boolean(value));
}

function reducer(state, { type, field, value }, initialState) {
  if (type === "reset") return INITIAL_STATE;

  const newState = {
    ...state,
    [field]: value.toLowerCase()
  };

  const { article, word, meaning } = newState;

  return {
    ...newState,
    isDisabled: shouldDisableButton([article, word, meaning])
  };
}

function App() {
  const [words, setWords] = useState([]);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { article, word, meaning, note, isDisabled } = state;

  const onChange = evt =>
    dispatch({ type: "edit", field: evt.target.name, value: evt.target.value });

  const addWord = () => {
    setWords([{ ...state }, ...words]);
    dispatch({ type: "reset" });
  };

  return (
    <section className="woerterbuch">
      <header>
        <h1>Mein</h1>
        <h1>Wörterbuch</h1>
      </header>
      <section className="wb-add">
        <select name="article" value={article} onChange={onChange}>
          <option value="">Select Article</option>
          <option value="der">der</option>
          <option value="die">die</option>
          <option value="das">das</option>
        </select>
        <input
          placeholder="Word"
          name="word"
          value={word}
          onChange={onChange}
        />
        <input
          placeholder="Meaning"
          name="meaning"
          value={meaning}
          onChange={onChange}
        />
        <input
          placeholder="Note"
          name="note"
          value={note}
          onChange={onChange}
        />
        <button disabled={isDisabled} onClick={addWord}>
          Add Word
        </button>
      </section>
      <section className="wb-view">
        {words.map(({ word, article, meaning, note }, index) => (
          <div className="wb-word" key={index}>
            <h3>
              {article} <span className="wb-capitalize">{word}</span>
            </h3>
            <div className="wb-meaning wb-capitalize">{meaning}</div>
            {note && <div className="wb-note">{note}</div>}
          </div>
        ))}
      </section>
    </section>
  );
}

export default App;

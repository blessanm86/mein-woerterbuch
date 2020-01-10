import React, { useReducer } from "react";

const INITIAL_STATE = {
  word: "",
  article: "",
  meaning: "",
  note: "",
  isValid: true
};

function isValid(values) {
  return !values.some(value => !Boolean(value));
}

function reducer(state, action) {
  const { type, field, value } = action;

  if (type === "reset") return INITIAL_STATE;

  const newState = {
    ...state,
    [field]: value.toLowerCase()
  };

  const { article, word, meaning } = newState;

  return {
    ...newState,
    isValid: isValid([article, word, meaning])
  };
}

function Add({ onAdd }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { article, word, meaning, note, isValid } = state;

  const onChange = evt =>
    dispatch({ type: "edit", field: evt.target.name, value: evt.target.value });

  const addWord = () => {
    onAdd(state);
    dispatch({ type: "reset" });
  };

  return (
    <section className="wb-add">
      <select name="article" value={article} onChange={onChange}>
        <option value="">Select Article</option>
        <option value="der">der</option>
        <option value="die">die</option>
        <option value="das">das</option>
      </select>
      <input placeholder="Word" name="word" value={word} onChange={onChange} />
      <input
        placeholder="Meaning"
        name="meaning"
        value={meaning}
        onChange={onChange}
      />
      <input placeholder="Note" name="note" value={note} onChange={onChange} />
      <button disabled={!isValid} onClick={addWord}>
        Add Word
      </button>
    </section>
  );
}

export default Add;

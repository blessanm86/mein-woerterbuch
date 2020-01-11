import React from "react";

import useForm from "../hooks/useForm";

const INITIAL_STATE = [
  {
    name: "article",
    type: "select",
    value: "",
    required: true,
    options: [
      { label: "Select Article", value: "" },
      { label: "Der", value: "der" },
      { label: "Die", value: "die" },
      { label: "Das", value: "das" }
    ]
  },
  {
    name: "word",
    placeholder: "Word",
    type: "text",
    value: "",
    required: true
  },
  {
    name: "meaning",
    placeholder: "Meaning",
    type: "text",
    value: "",
    required: true
  },
  {
    name: "note",
    placeholder: "Note",
    type: "text",
    value: ""
  }
];

function Add({ onAdd }) {
  const [state, [onChange, reset], isValid] = useForm(INITIAL_STATE);

  const addWord = () => {
    const word = state.reduce((prev, property) => {
      return {
        ...prev,
        [property.name]: property.value
      };
    }, {});
    onAdd(word);
    reset();
  };

  return (
    <section className="wb-add">
      {state.map(input => {
        if (input.type === "select") {
          return (
            <select
              key={input.name}
              name={input.name}
              value={input.name}
              onChange={onChange}
            >
              {input.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        }

        return <input {...input} key={input.name} onChange={onChange} />;
      })}
      <button disabled={!isValid} onClick={addWord}>
        Add Word
      </button>
    </section>
  );
}

export default Add;

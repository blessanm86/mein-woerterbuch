import React from "react";

import useForm from "../hooks/useForm";
import useFirebase from "../hooks/useFirebase";

const INITIAL_STATE = [
  {
    name: "type",
    type: "select",
    placeholder: "Type",
    required: true,
    options: [
      { label: "Select Type", value: "" },
      { label: "Noun", value: "noun" },
      { label: "Adjective", value: "adjective" },
      { label: "Verb", value: "verb" },
      { label: "Adverb", value: "adverb" }
    ]
  },
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
    ],
    disabled: false
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

function reducer(state, action) {
  const { type, name, value } = action;

  if (type === "edit" && name === "type") {
    if (value !== "noun") {
      const index = state.findIndex(input => input.name === "article");
      return [
        ...state.slice(0, index),
        { ...state[index], value: "", disabled: true },
        ...state.slice(index + 1)
      ];
    } else {
      const index = state.findIndex(input => input.name === "article");

      return [
        ...state.slice(0, index),
        { ...state[index], disabled: false },
        ...state.slice(index + 1)
      ];
    }
  }

  return state;
}

function validator(inputs) {
  const inputMap = inputs.reduce((map, input) => {
    map[input.name] = input;
    return map;
  }, {});

  const requiredInputs = !inputs.some(input => {
    if (input.required && !input.value) {
      return true;
    }

    return false;
  });

  if (!requiredInputs) {
    return false;
  } else {
    const { type, article } = inputMap;
    if (type.value === "noun" && !article.value) {
      return false;
    } else {
      return true;
    }
  }
}

function Add({ onAdd }) {
  const { state, isValid, change, reset } = useForm(INITIAL_STATE, {
    reducer,
    validator
  });
  const { addWordToFirebase } = useFirebase();

  const addWord = () => {
    const word = state.reduce((prev, property) => {
      return {
        ...prev,
        [property.name]: property.value
      };
    }, {});
    addWordToFirebase(word).then(() => {
      reset();
      onAdd();
    });
  };

  return (
    <section className="wb-add">
      {state.map(input => {
        if (input.type === "select") {
          return (
            <select
              key={input.name}
              name={input.name}
              value={input.value}
              onChange={change}
              disabled={input.disabled}
            >
              {input.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        }

        return <input {...input} key={input.name} onChange={change} />;
      })}
      <button disabled={!isValid} onClick={addWord}>
        Add Word
      </button>
    </section>
  );
}

export default Add;

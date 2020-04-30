import React from "react";

import useForm, { InputInterface, ActionInterface } from "../hooks/useForm";
import useFirebase, { WordInterface } from "../hooks/useFirebase";

interface PropsInterface {
  onAdd: Function;
}

const INITIAL_STATE = [
  {
    name: "type",
    type: "select" as const,
    value: "",
    placeholder: "Type",
    required: true,
    options: [
      { label: "Select Type", value: "" },
      { label: "Noun", value: "noun" },
      { label: "Adjective", value: "adjective" },
      { label: "Verb", value: "verb" },
      { label: "Adverb", value: "adverb" },
      { label: "Preposition", value: "preposition" },
      { label: "Pronoun", value: "pronoun" },
    ],
  },
  {
    name: "article",
    type: "select" as const,
    value: "",
    options: [
      { label: "Select Article", value: "" },
      { label: "Der", value: "der" },
      { label: "Die", value: "die" },
      { label: "Das", value: "das" },
    ],
    disabled: false,
  },
  {
    name: "word",
    placeholder: "Word",
    type: "text" as const,
    value: "",
    required: true,
  },
  {
    name: "meaning",
    placeholder: "Meaning",
    type: "text" as const,
    value: "",
    required: true,
  },
  {
    name: "note",
    placeholder: "Note",
    type: "text" as const,
    value: "",
  },
];

function reducer(state: InputInterface[], action: ActionInterface) {
  const { type, name, value } = action;

  if (type === "edit" && name === "type") {
    if (value !== "noun") {
      const index = state.findIndex((input) => input.name === "article");
      return [
        ...state.slice(0, index),
        { ...state[index], value: "", disabled: true },
        ...state.slice(index + 1),
      ];
    } else {
      const index = state.findIndex((input) => input.name === "article");

      return [
        ...state.slice(0, index),
        { ...state[index], disabled: false },
        ...state.slice(index + 1),
      ];
    }
  }

  return state;
}

function validator(inputs: InputInterface[]) {
  const inputMap = inputs.reduce<{ [key: string]: InputInterface }>(
    (map, input) => {
      map[input.name] = input;
      return map;
    },
    {}
  );

  const requiredInputs = !inputs.some((input) => {
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

function Add({ onAdd }: PropsInterface) {
  const { state, isValid, change, reset } = useForm(INITIAL_STATE, {
    reducer,
    validator,
  });
  const { addWordToFirebase, getWord } = useFirebase();

  const addWord = async () => {
    const word = state.reduce((prev, property) => {
      return {
        ...prev,
        [property.name]: property.value.toLowerCase(),
      };
    }, {} as WordInterface);

    word.nextPracticeTime = Date.now();
    word.consecutiveCorrectAnswer = 0;
    word.lastTimeEasy = Date.now();

    const result = await getWord(word.word);
    if (result) {
      alert("Word Already Exists");
    } else {
      await addWordToFirebase(word);
      reset();
      onAdd();
    }
  };

  return (
    <section className="wb-add">
      {state.map((input) => {
        if (input.type === "select") {
          return (
            <select
              key={input.name}
              name={input.name}
              value={input.value}
              onChange={change}
              disabled={input.disabled}
            >
              {input.options?.map((option) => (
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

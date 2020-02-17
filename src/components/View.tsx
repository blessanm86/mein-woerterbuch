import React from "react";
import { WordInterface } from "../hooks/useFirebase";

interface PropsInterface {
  words: WordInterface[];
}

function View({ words = [] }: PropsInterface) {
  return (
    <section className="wb-view">
      {words.map(({ word, article, meaning, note, type }, index) => (
        <div className="wb-word" key={index}>
          <h3>
            {article} <span className="wb-capitalize">{word}</span>
            <span className="wb-word-type">({type})</span>
          </h3>
          <div className="wb-meaning wb-capitalize">{meaning}</div>
          {note && <div className="wb-note">{note}</div>}
        </div>
      ))}
    </section>
  );
}

export default View;

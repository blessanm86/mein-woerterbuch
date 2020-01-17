import React from "react";

import useFirebase from "../hooks/useFirebase";

function View({ words }) {
  // const { user } = useFirebase();

  return (
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
  );
}

export default View;

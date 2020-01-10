import React from "react";

function View({ words }) {
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

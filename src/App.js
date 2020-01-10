import React, { useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Add from "./components/Add";
import View from "./components/View";

// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

function App() {
  const [words, setWords] = useState([]);

  const addWord = word => {
    setWords([{ ...word }, ...words]);
  };

  return (
    <section className="woerterbuch">
      <header>
        <h1>Mein</h1>
        <h1>Wörterbuch</h1>
      </header>
      <Login />
      <Add onAdd={addWord} />
      <View words={words} />
    </section>
  );
}

export default App;

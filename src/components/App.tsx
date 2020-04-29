import React, { useState, useEffect } from "react";
import "./App.css";

import useFirebase, { WordInterface } from "../hooks/useFirebase";

import Login from "./Login";
import Add from "./Add";
import View from "./View";
import Toggle from "./Toggle";

interface Global {
  logout?: Function;
}

function App() {
  const [words, setWords] = useState<WordInterface[]>([]);
  const { user, getAllWords, logout } = useFirebase();
  (window as Global).logout = logout;

  const getWords = () => {
    getAllWords().then((words) => words && setWords(words));
  };

  useEffect(getWords, [getAllWords]);

  return (
    <section className="woerterbuch">
      <div>
        <header>
          <h1>Mein</h1>
          <h1>Wörterbuch</h1>
        </header>
        {user ? <Add onAdd={getWords} /> : <Login />}
        {/* <button onClick={logout}>Logout</button> */}
      </div>
      <div>
        <Toggle />
        <View words={words} />
      </div>
    </section>
  );
}

export default App;

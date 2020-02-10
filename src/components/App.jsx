import React, { useState, useEffect } from "react";
import "./App.css";

import useFirebase from "../hooks/useFirebase";

import Login from "./Login";
import Add from "./Add";
import View from "./View";

function App() {
  const [words, setWords] = useState([]);
  const { user, getAllWords, logout } = useFirebase();
  window.logout = logout;

  const getWords = () => {
    getAllWords().then(setWords);
  };

  useEffect(getWords, [getAllWords]);

  return (
    <section className="woerterbuch">
      <header>
        <h1>Mein</h1>
        <h1>Wörterbuch</h1>
      </header>
      {/* <button onClick={logout}>Logout</button> */}
      {user ? <Add onAdd={getWords} /> : <Login />}
      <View words={words} />
    </section>
  );
}

export default App;

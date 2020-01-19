import React, { useState, useEffect } from "react";
import "./App.css";

import useFirebase from "./hooks/useFirebase";

import Login from "./components/Login";
import Add from "./components/Add";
import View from "./components/View";

function App() {
  const [words, setWords] = useState([]);
  const { user, getAllWords, logout } = useFirebase();
  window.logout = logout;

  const getWords = () => {
    user && getAllWords().then(setWords);
  };

  useEffect(getWords, [user, getAllWords]);

  return (
    <section className="woerterbuch">
      <header>
        <h1>Mein</h1>
        <h1>Wörterbuch</h1>
      </header>
      {user ? (
        <>
          {/* <button onClick={logout}>Logout</button> */}
          <Add onAdd={getWords} />
          <View words={words} />
        </>
      ) : (
        <Login />
      )}
    </section>
  );
}

export default App;

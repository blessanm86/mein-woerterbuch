import { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWznMXfEF-FMt9OUT10Twzxr382zfs3MU",
  authDomain: "mein-woerterbuch.firebaseapp.com",
  databaseURL: "https://mein-woerterbuch.firebaseio.com",
  projectId: "mein-woerterbuch",
  storageBucket: "mein-woerterbuch.appspot.com",
  messagingSenderId: "241459052506",
  appId: "1:241459052506:web:2ccf2b897f16845452cae3",
  measurementId: "G-06SEN5MFN2"
};

function loginToFirebase(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        console.log("Wrong password.");
      } else {
        console.log(errorMessage);
      }
      console.log(error);
    });
}

function logout() {
  firebase.auth().signOut();
}

function addWordToFirebase(word) {
  word.timestamp = firebase.firestore.Timestamp.now();

  return firebase
    .firestore()
    .collection("woerte")
    .add(word)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

function getAllWords() {
  return firebase
    .firestore()
    .collection("woerte")
    .orderBy("timestamp", "desc")
    .get()
    .then(snapshot => {
      const words = [];
      snapshot.forEach(doc => words.push(doc.data()));
      return words;
    });
}

let firbaseAuthStateListener;

function useFirebase() {
  const [user, setUser] = useState(null);

  !firebase.apps.length && firebase.initializeApp(firebaseConfig);

  useEffect(() => {
    firbaseAuthStateListener = firebase.auth().onAuthStateChanged(setUser);

    return () => firbaseAuthStateListener();
  }, []);

  return {
    user,
    loginToFirebase,
    addWordToFirebase,
    getAllWords,
    logout
  };
}

export default useFirebase;

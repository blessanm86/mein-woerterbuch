import { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export interface WordInterface {
  article: string;
  meaning: string;
  note: string;
  timestamp: firebase.firestore.Timestamp;
  type: string;
  word: string;
  nextPracticeTime: number;
  lastTimeEasy: number;
  consecutiveCorrectAnswer: number;
}

const firebaseConfig = {
  apiKey: "AIzaSyAWznMXfEF-FMt9OUT10Twzxr382zfs3MU",
  authDomain: "mein-woerterbuch.firebaseapp.com",
  databaseURL: "https://mein-woerterbuch.firebaseio.com",
  projectId: "mein-woerterbuch",
  storageBucket: "mein-woerterbuch.appspot.com",
  messagingSenderId: "241459052506",
  appId: "1:241459052506:web:2ccf2b897f16845452cae3",
  measurementId: "G-06SEN5MFN2",
};

function loginToFirebase(email: string, password: string): void {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
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

function addWordToFirebase(word: WordInterface): Promise<string | Error> {
  word.timestamp = firebase.firestore.Timestamp.now();

  return firebase
    .firestore()
    .collection("woerte")
    .add(word)
    .then(function (docRef) {
      const result = `Document written with ID: ${docRef.id}`;
      console.log(result);
      return result;
    })
    .catch(function (error) {
      const result = `Error adding document: ${error}`;
      console.error(result);
      return result;
    });
}

function getAllWords(): Promise<WordInterface[] | void> {
  return firebase
    .firestore()
    .collection("woerte")
    .orderBy("timestamp", "desc")
    .get()
    .then((snapshot) => {
      const words: WordInterface[] = [];
      snapshot.forEach((doc) => words.push(doc.data() as WordInterface));
      return words;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getWord(search: string): Promise<WordInterface | void> {
  return firebase
    .firestore()
    .collection("woerte")
    .where("word", "==", search)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return;
      } else {
        const words: WordInterface[] = [];
        snapshot.forEach((doc) => words.push(doc.data() as WordInterface));
        return words[0];
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function useFirebase() {
  const [user, setUser] = useState<firebase.User | null>(null);

  !firebase.apps.length && firebase.initializeApp(firebaseConfig);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        user && setUser(user);
      }),
    []
  );

  return {
    user,
    loginToFirebase,
    addWordToFirebase,
    getAllWords,
    getWord,
    logout,
  };
}

export default useFirebase;

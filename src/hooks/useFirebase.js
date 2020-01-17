import { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

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

function useFirebase() {
  const [user, setUser] = useState(null);

  !firebase.apps.length && firebase.initializeApp(firebaseConfig);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return {
    user,
    loginToFirebase,
    logout
  };
}

export default useFirebase;

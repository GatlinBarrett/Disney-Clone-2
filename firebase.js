import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbvLMmQIIWmt6fWIBgpBI5malhRpw_WBg",
  authDomain: "disney-clone-83080.firebaseapp.com",
  projectId: "disney-clone-83080",
  storageBucket: "disney-clone-83080.appspot.com",
  messagingSenderId: "879294348817",
  appId: "1:879294348817:web:18e59b008c968347393bb0",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };

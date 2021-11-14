import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvIGrrrewiSYHDYnC3O9lneV2iy7iox3g",
  authDomain: "doktrin-fccbc.firebaseapp.com",
  projectId: "doktrin-fccbc",
  storageBucket: "doktrin-fccbc.appspot.com",
  messagingSenderId: "220893849707",
  appId: "1:220893849707:web:84e7bef5149f50ff0ae92e",
  measurementId: "G-578GEDFDZT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

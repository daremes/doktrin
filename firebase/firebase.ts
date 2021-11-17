import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: "G-578GEDFDZT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const getDocument = async (collection: string, documentId: string) => {
  const snap = await getDoc(doc(db, collection, documentId));
  if (snap.exists()) return snap.data();
  else
    return Promise.reject(
      Error(`No such document: ${collection}.${documentId}`)
    );
};

export const setDocument = async (
  collection: string,
  documentId: string,
  data: any
) => {
  try {
    await setDoc(doc(db, collection, documentId), data);
  } catch (e) {
    console.log(e);
  }
};

export const updateDocument = async (
  collection: string,
  documentId: string,
  data: any
) => {
  try {
    await updateDoc(doc(db, collection, documentId), data);
  } catch (e) {
    console.log(e);
  }
};

const handleSignIn = async (email: string, password: string) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = credential;
    return user;
  } catch (e) {
    return null;
  }
};

const handleSignOut = () => {
  signOut(auth);
};

export { db, getDocument, handleSignIn, auth, handleSignOut };
export default app;

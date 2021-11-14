import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_ID,
  appId: process.env.APP_ID,
  measurementId: "G-578GEDFDZT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const getDocument = async (collection: string, documentId: string) => {
  const snap = await getDoc(doc(db, collection, documentId));
  if (snap.exists()) return snap.data();
  else
    return Promise.reject(
      Error(`No such document: ${collection}.${documentId}`)
    );
};

export { collection, getDocs, getDoc };
export default app;

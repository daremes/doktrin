import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  OrderByDirection,
  Timestamp,
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

export const getDocument = async (collection: string, documentId: string) => {
  const ref = doc(db, collection, documentId);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data();
  else
    return Promise.reject(
      Error(`No such document: ${collection}.${documentId}`)
    );
};

export interface Options {
  orderBy: string;
  direction: OrderByDirection;
}

export const getAllDocs = async (collectionName: string, options?: Options) => {
  try {
    const ref = collection(db, collectionName);
    const q = options
      ? query(ref, orderBy(options.orderBy, options.direction))
      : null;
    const snap = await getDocs(q || ref);
    return snap;
  } catch (e) {
    return Promise.reject(Error(`No such collection: ${collectionName}.${e}`));
  }
};

export const getLocalizedDocs = async (
  collectionName: string,
  documentName: string,
  locales: string[]
) => {
  try {
    const data = locales.map(async (loc) => {
      const ref = doc(db, collectionName, documentName, "locales", loc);
      const document = (await getDoc(ref)).data();
      return { [loc]: document };
    });
    const array = await Promise.all(data);
    const object = Object.assign({}, ...array);
    return object;
  } catch (e) {
    return Promise.reject(Error(`No such collection: ${collectionName}.${e}`));
  }
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

export const getJsTimestamp = (fsTimestamp: Timestamp) => {
  return fsTimestamp.toMillis() / 1000;
};

export { db, handleSignIn, auth, handleSignOut };
export default app;

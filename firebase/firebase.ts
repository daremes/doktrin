import { initializeApp } from "firebase/app";
import { doc, getFirestore, getDoc } from "firebase/firestore";
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

const handleSignIn = (
  email: string,
  password: string,
  onLoading: (idLoading: boolean) => void
) => {
  onLoading(true);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      console.log(user);
    })
    .catch((error) => {
      const { code, message } = error;
      throw Error(message);
    });
};

const handleSignOut = () => {
  signOut(auth);
};

export { db, getDocument, handleSignIn, auth, handleSignOut };
export default app;

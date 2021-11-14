import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { handleSignIn } from "../firebase/firebase";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const signIn = () => {
    const email = "martin.sem84@gmail.com";
    const password = "divadlo";
    handleSignIn(email, password, setLoading);
  };

  return (
    <div className="signin">
      <form>
        <h1>Login</h1>
        <input type="email" />
        <input type="password" />
      </form>
      <button disabled={loading} onClick={signIn}>
        Přihlásit se
      </button>
    </div>
  );
};

export default LoginForm;

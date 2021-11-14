import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { handleSignIn } from "../firebase/firebase";

const DEFAULT_LOGIN = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState(DEFAULT_LOGIN);
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState(false);

  const handleValuesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onError = () => {
    setLoading(false);
    setError(true);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const signIn = async (e: MouseEvent<HTMLButtonElement>) => {
    const { email, password } = loginData;
    setLoading(true);
    const user = await handleSignIn(email, password);
    if (!user) {
      onError();
    }
  };

  return (
    <div className="signin">
      <form ref={formRef} noValidate>
        <h1>Login</h1>
        <input
          autoComplete="username"
          name="email"
          type="email"
          onChange={handleValuesChange}
        />
        <input
          autoComplete="current-password"
          name="password"
          type="password"
          onChange={handleValuesChange}
        />
        <button type="submit" disabled={loading} onClick={signIn}>
          Přihlásit se
        </button>
      </form>
      {error && (
        <div>Máš to špatně. Uklidni se - výdech, nádech - a zkus to znovu!</div>
      )}
    </div>
  );
};

export default LoginForm;

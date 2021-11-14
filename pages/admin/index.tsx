import styles from "../../styles/Home.module.css";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/dist/client/router";

const Admin = () => {
  const { currentUser, loading, handleSignOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <LoginForm />;

  return (
    <div className={styles.container}>
      <h3>{currentUser.email}</h3>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
};

export default Admin;

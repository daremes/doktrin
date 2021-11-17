import Link from "next/link";
import styles from "../../styles/Home.module.css";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import React from "react";
import { Administration } from "../../components/Administration";

const Admin = () => {
  const { currentUser, loading, handleSignOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <LoginForm />;

  return (
    <div className={styles.container}>
      <Link href="/">Homepage</Link>
      <h3>{currentUser.email}</h3>
      <button onClick={handleSignOut}>Logout</button>
      <Administration />
    </div>
  );
};

export default Admin;

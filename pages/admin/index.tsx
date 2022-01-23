import Link from "next/link";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import React from "react";
import { Administration } from "../../components/Administration";

const Admin = () => {
  const { currentUser, loading, handleSignOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <LoginForm />;

  return (
    <div>
      <Link href="/">Homepage</Link>
      <h3>{currentUser.email}</h3>
      <button onClick={handleSignOut}>Logout</button>
      <Administration />
    </div>
  );
};

export default Admin;

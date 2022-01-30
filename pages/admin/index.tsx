import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import React from "react";
import { Administration } from "../../components/Administration";
import Login from "./login";

const Admin = () => {
  const { currentUser, loading, handleSignOut } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <Login />;

  return (
    <Administration currentUser={currentUser} handleSignOut={handleSignOut} />
  );
};

export default Admin;

import React, { useContext } from "react";
import { AuthContext } from "../../service/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "../Login";

export default function MainLogin() {
  const { isLoading, isUserAuthenticated } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading </div>;
  } else if (!isUserAuthenticated) {
    return <Login />;
  } else {
    return <Navigate to="/" />;
  }
}

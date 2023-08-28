import React, { useContext } from "react";
import { AuthContext } from "../../service/AuthContext";
import { Navigate } from "react-router-dom";
import EmployeeRegister from "../EmployeeRegister";

export default function MainRegister() {
  const { isLoading, isUserAuthenticated } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading </div>;
  } else if (!isUserAuthenticated) {
    return <EmployeeRegister />;
  } else {
    return <Navigate to="/" />;
  }
}

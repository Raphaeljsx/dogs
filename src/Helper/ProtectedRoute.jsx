import React from "react";
import { Navigate } from "react-router-dom";
import { useStoreUser } from "../store/useStore";

const ProtectedRoute = ({ children }) => {
  const { user } = useStoreUser();

  if (user) {
    return children;
  } else if (user === null) {
    return <Navigate to="/login" />;
  } else {
    return null;
  }

  // return login ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

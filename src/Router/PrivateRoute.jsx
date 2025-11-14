import { use } from "react";

import { Navigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/auth/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import Spinner from "react-bootstrap/Spinner";
import Login from "./components/login";

function AuthLayout({ children, auth }) {
  const [isAuth, setIsAuth] = useState(false),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setLoading(false);
    });
  }, [auth]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (!isAuth) {
    return <Login auth={auth} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthLayout;

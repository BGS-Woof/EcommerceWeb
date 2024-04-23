import React from "react";
import { auth, googleProvider } from "../config/FireBaseConfig";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Auth = ({ setIsAuth }) => {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      if (localStorage) {
        localStorage.setItem("isAuth", true);
      }
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="page_center">
      <div className="auth_container">
        <h1 className="auth_title">Authorization</h1>
        <p className="auth_subtitle">Select authorization method:</p>
        <div className="auth-buttons">
          <Link className="google-btn" onClick={signInWithGoogle}>
            Sign in with Google
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
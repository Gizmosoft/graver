import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./Home.css";
import Logo from "./Logo";

const Home = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_APP_URL;
  const clientId = import.meta.env.VITE_GOOGLE_SIGNIN_CLIENT_ID;

  const handleSuccess = (response) => {
    const token = response.credential; // JWT Token provided by Google
    // Send the token to your backend for verification
    fetch(`${BACKEND_URL}/api/auth/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
            console.log(data);
          // Store the user ID in localStorage
          localStorage.setItem("userId", data.data.id); // Assuming backend sends user.id
          console.log("User ID stored in localStorage:", data.data.id);
          navigate("/dashboard"); // Redirect to /dashboard on success
        } else {
          console.error("Login failed:", data.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleError = () => {
    alert("ERR: Login Failed");
  };

  return (
    <div className="home-page">
      <div className="tag-line">
        <Logo />
        <p className="tag-line-1">Create and Share Memories</p>
        <p className="tag-line-2">with your loved ones</p>
      </div>
      <div className="auth-btn">
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            text="signin_with" // Text to display on the button
            shape="square" // Button shape (optional)
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Home;

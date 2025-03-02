import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import TestPage from "./components/TestPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PostcardPage from "./pages/PostcardPage.jsx";
import Theme from "./Theme";
import { ThemeProvider } from "@mui/material";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if userId exists in localStorage on app mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); // Update isLoggedIn based on userId presence
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // Update state to reflect logged-in status
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove userId from localStorage
    setIsLoggedIn(false); // Update state to reflect logged-out status
  };

  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <Router>
          {/* Pass isLoggedIn and handleLogout as props to Navbar */}
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home onLogin={handleLogin} />} />
            <Route
              path="/dashboard"
              element={<Dashboard onLogin={handleLogin} />}
            />
            <Route path="/card/:postcardId" element={<PostcardPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;

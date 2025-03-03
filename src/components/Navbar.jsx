import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import NavbarLogo from "./NavbarLogo";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate(); // Initialize useNavigate here

  const handleLogoutClick = () => {
    onLogout(); // Call the parent logout function to update the state
    navigate("/"); // Navigate to the home page
  };
  return (
    // <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar className="app-navbar">
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Graver
          </Typography> */}
          <Box sx={{ flexGrow: 1 }}>
            <NavbarLogo />
          </Box>
          <Link className="navbar-tabs" to="/about">About</Link>
          {isLoggedIn && (
            <Link className="navbar-tabs" onClick={handleLogoutClick}>Logout</Link>
          )}
        </Toolbar>
      </AppBar>
    // </Box>
  );
};

export default Navbar;

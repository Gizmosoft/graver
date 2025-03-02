import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import NavbarLogo from "./NavbarLogo";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate(); // Initialize useNavigate here

  const handleLogoutClick = () => {
    onLogout(); // Call the parent logout function to update the state
    navigate("/"); // Navigate to the home page
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar className="app-navbar">
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Graver
          </Typography> */}
          <Box sx={{ flexGrow: 1 }}>
            <NavbarLogo />
          </Box>
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogoutClick}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  typography: {
    fontFamily: '"Quicksand", serif', // Apply Quicksand globally
    button: {
      textTransform: "none", // Remove uppercase transformation for all buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Ensure all buttons are not uppercase
          fontFamily: '"Quicksand", serif', // Apply Quicksand to buttons
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          fontFamily: '"Quicksand", serif', // Ensures global font application
          boxSizing: "border-box",
        },
      },
    },
  },
});

export default Theme;

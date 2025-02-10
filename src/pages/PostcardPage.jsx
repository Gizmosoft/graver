import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Postcard from "../components/Postcard.jsx";
import "./PostcardPage.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PostcardPage = () => {
  const { postcardId } = useParams();
  const location = useLocation(); // Access the query parameters from the URL
  const [postcard, setPostcard] = useState(null); // State to hold the postcard data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isViewMode, setIsViewMode] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_APP_URL;

  // Parse query parameters to check if the page is in "view" mode
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setIsViewMode(queryParams.get("view") === "true");
  }, [location]);

  // Fetch the postcard object when the component mounts
  useEffect(() => {
    const fetchPostcard = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/postcards/${postcardId}`,
          {
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          }
        ); // API call
        if (!response.ok) {
          throw new Error("Failed to fetch postcard");
        }
        const data = await response.json();
        setPostcard(data); // Set the postcard data
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPostcard();
  }, [postcardId]); // Re-run the effect if postcardId changes

  // After fetching the postcard, determine if the current user is the creator
  useEffect(() => {
    if (postcard && !isViewMode) {
      const userId = localStorage.getItem("userId");
      setCanEdit(postcard.data.creator === userId);
    }
  }, [postcard, isViewMode]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching
  }

  if (error) {
    return <p>Error: {error}</p>; // Show an error message if fetching fails
  }

  const generateShareableURL = (postcardId) => {
    const baseUrl = window.location.origin; // Get the base URL (e.g., http://localhost:5173)
    return `${baseUrl}/card/${postcardId}?view=true`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateShareableURL(postcardId)).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this postcard?")) {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/postcards/delete/${postcardId}`,
          {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the postcard");
        }

        alert("Postcard deleted successfully!");
        window.location.href = "/dashboard"; // Redirect the user back to the dashboard after deletion
      } catch (error) {
        console.error("Error deleting postcard:", error);
        alert(
          "An error occurred while trying to delete the postcard. Please try again."
        );
      }
    }
  };

  return (
    <Box className="post-card-page" sx={{ padding: "10px" }}>
      <Typography variant="h5" gutterBottom>
        {isViewMode
          ? "Hurray! You've been sent a post card 😊"
          : "Share this post card with others"}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopy}
            size="large"
          >
            Copy URL
          </Button>
        </Grid>

        {canEdit && !isViewMode && (
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDelete}
              size="large"
            >
              Delete
            </Button>
          </Grid>
        )}
      </Grid>

      <Box mt={4}>
        {loading ? (
          <p>Loading...</p>
        ) : postcard && postcard.data ? (
          <Postcard postcard={postcard} />
        ) : (
          <p>No postcard data available.</p>
        )}
      </Box>

      <Box className="dashboard-redirect" mt={4}>
        {isViewMode ? (
          <Link to="/dashboard">Create a Postcard Yourself!</Link>
        ) : (
          <Link to="/dashboard">Back to Dashboard</Link>
        )}
      </Box>
    </Box>
  );
};

export default PostcardPage;

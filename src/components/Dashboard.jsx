import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import "./Dashboard.css";
import { FaPlus } from "react-icons/fa6";
import { MdFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PostcardImage from "./PostcardImage.jsx";

const Dashboard = ({ onLogin }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [postcards, setPostcards] = useState([]); // State for storing user's postcards
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_APP_URL;

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      onLogin(); // Call onLogin to update isLoggedIn state in App.jsx
    } else {
      navigate("/"); // Redirect to home if not logged in
    }
  }, [onLogin, navigate]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setImage(null);
    setText("");
  };

  const handleSubmit = async () => {
    console.log("Image:", image); // object
    console.log("Type of Image:", typeof image);
    console.log("Text:", text); // String
    // Call backend API to submit the form and create a postcard object
    if (!image || !text) {
      alert("Please upload an image and enter a message.");
      return;
    }

    // Assuming the logged-in user's ID is stored in localStorage
    const creator = localStorage.getItem("userId");

    if (!creator) {
      alert("You must be logged in to create a postcard.");
      return;
    }

    // Create FormData to send the image and data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image); // The image file
    formData.append("text", text); // The text content of the postcard
    formData.append("creator", creator); // The creator's ID

    try {
      const response = await fetch(`${BACKEND_URL}/api/postcards/create`, {
        method: "POST",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
        body: formData, // Send form data
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Postcard created successfully:", result);
        alert("Postcard created successfully!");
      } else {
        console.error("Error creating postcard:", result.message);
        alert(result.message || "Failed to create postcard.");
      }
    } catch (error) {
      console.error("Error submitting postcard:", error);
      alert("An error occurred while creating the postcard.");
    }

    setOpen(false);
    setTitle("");
    setImage(null);
    setText("");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Fetch user's postcards
  const fetchPostcards = async () => {
    const creatorId = localStorage.getItem("userId");
    console.log("Backend URL-> ", BACKEND_URL);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/postcards/all/${creatorId}`,
        {
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        }
      );
      console.log(response.text);
      const result = await response.json();

      if (response.ok) {
        console.log("Postcards in UI: ", result.data);
        setPostcards(result.data); // Store postcards in state
      } else {
        console.error("Error fetching postcards:", result.message);
      }
    } catch (error) {
      console.error("Error fetching postcards:", error);
    }
  };

  // Fetch postcards when component loads
  useEffect(() => {
    fetchPostcards();
  }, []);

  const handlePostcardClick = (postcardId) => {
    navigate(`/card/${postcardId}`); // Navigate to the postcard page based on its ID
  };

  return (
    <div className="dashboard-page">
      {/* Create Button */}
      <Button className="create-btn" variant="contained" onClick={handleOpen}>
        <FaPlus />
        <span>&nbsp;Create</span>
      </Button>

      {/* Form Dialog */}
      <Dialog
        className="form-dialog"
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle className="form-title">Create a Postcard</DialogTitle>
        <DialogContent>
          <form>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="upload-image">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-image"
                  type="file"
                  onChange={handleImageChange}
                />
                <Button
                  variant="outlined"
                  component="span"
                  style={{ marginTop: "10px" }}
                >
                  <MdFileUpload />
                  &nbsp;Upload Image
                </Button>
              </label>
              {image && <p>{image.name}</p>}
            </div>

            {/* Text Area for Postcard Title */}
            <TextField
              label="Enter Postcard Title"
              variant="outlined"
              fullWidth
              inputProps={{ maxLength: 30 }}
              value={title}
              onChange={handleTitleChange}
            />
            <br /><br />
            {/* Text Area for Enter Message */}
            <TextField
              label="Enter Message"
              variant="outlined"
              fullWidth
              multiline
              rows={10} // Number of rows in the textarea
              inputProps={{ maxLength: 200 }}
              value={text}
              onChange={handleTextChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            className="create-btn"
            onClick={handleSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* End of Form Dialog */}

      <hr style={{ marginTop: "30px" }} />

      {/* Display Postcards */}
      <div className="postcards-list">
        {postcards.map((postcard) => (
          <div
            key={postcard._id}
            className="postcard"
            onClick={() => handlePostcardClick(postcard._id)}
            style={{ cursor: "pointer" }}
          >
            <img src={postcard.image} alt="Postcard" />
            {/* <PostcardImage postcard={postcard} BACKEND_URL={BACKEND_URL}/> */}
            <p>{postcard.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

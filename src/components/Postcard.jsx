import React, { useState, useEffect, useRef } from "react";
import "./Postcard.css";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import { Link } from "react-router-dom";
import PostcardImageRefs from "./PostcardImageRefs.jsx";

const Postcard = ({ postcard }) => {
  const [flipped, setFlipped] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 300,
    height: 200,
  });
  const [fontSize, setFontSize] = useState(16); // Default font size
  const imageRef = useRef(null);

  // Function to toggle the flipped state
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_APP_URL;

  // Set the dimensions of the card dynamically based on the image
  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current;
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      const maxWidth = 400; // Max width for the card
      const maxHeight = 300; // Max height for the card

      let width = img.naturalWidth;
      let height = img.naturalHeight;

      if (width > maxWidth || height > maxHeight) {
        if (aspectRatio > 1) {
          // Landscape
          width = maxWidth;
          height = maxWidth / aspectRatio;
        } else {
          // Portrait
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
      }

      setImageDimensions({ width, height });
    }
  }, [postcard]);

  // Dynamically calculate font size based on text length and card size
  useEffect(() => {
    if (postcard && postcard.data.text) {
      const baseFontSize = 16; // Base font size for short text
      const maxFontSize = 24; // Maximum font size
      const minFontSize = 12; // Minimum font size
      const textLength = postcard.data.text.length;

      // Calculate the font size based on the card width and text length
      const calculatedFontSize = Math.max(
        Math.min(
          baseFontSize * (imageDimensions.width / 300) * (200 / textLength),
          maxFontSize
        ),
        minFontSize
      );

      setFontSize(calculatedFontSize);
    }
  }, [postcard, imageDimensions]);

  if (!postcard) {
    return <p>No postcard data available.</p>;
  }

  console.log("Postcard fetched:", postcard);

  return (
    <div className="postcard-container">
      <div
        className={`postcard ${flipped ? "flipped" : ""}`}
        style={{ width: imageDimensions.width, height: imageDimensions.height }}
      >
        {/* Front side of the card (Image) */}
        <div className="postcard-front">
            <PostcardImageRefs postcard={postcard.data} BACKEND_URL={BACKEND_URL} ref={imageRef} alt="Postcard" className="postcard-image"/>
          {/* <img
            ref={imageRef}
            src={`${BACKEND_URL}/${postcard.data.image}`}
            alt="Postcard"
            className="postcard-image"
          /> */}
        </div>

        {/* Back side of the card (Text) */}
        <div className="postcard-back">
          <div className="postcard-text" style={{ fontSize: `${fontSize}px` }}>
            {postcard.data.text}
          </div>
        </div>
      </div>

      {/* Flip Button */}
      <button className="flip-button" onClick={handleFlip}>
        {flipped ? <MdOutlineFlipCameraAndroid title="View Image" /> : <MdOutlineFlipCameraAndroid title="View Message" />}
      </button>
    </div>
  );
};

export default Postcard;

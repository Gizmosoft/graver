import React, { useState, useEffect, useRef } from "react";
import "./Postcard.css";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";

const Postcard = ({ postcard }) => {
  const [flipped, setFlipped] = useState(false);
  const [imageDimensions, setImageDimensions] = useState(null);
  const [fontSize, setFontSize] = useState(16); // Default font size
  const imageRef = useRef(null);

  // Function to toggle the flipped state
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  // Set the dimensions of the card dynamically based on the image
  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current;

      // Ensure the image has loaded before accessing dimensions
      if (img.complete && img.naturalWidth && img.naturalHeight) {
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
    }
  }, [postcard]);

  // Ensure dimensions update when the image fully loads
  const handleImageLoad = () => {
    if (imageRef.current) {
      const img = imageRef.current;
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      const maxWidth = 400;
      const maxHeight = 300;

      let width = img.naturalWidth;
      let height = img.naturalHeight;

      if (width > maxWidth || height > maxHeight) {
        if (aspectRatio > 1) {
          width = maxWidth;
          height = maxWidth / aspectRatio;
        } else {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
      }

      setImageDimensions({ width, height });
    }
  };

  // Dynamically calculate font size based on text length and card size
  useEffect(() => {
    if (postcard?.data?.text && imageDimensions) {
      const baseFontSize = 16;
      const maxFontSize = 24;
      const minFontSize = 12;
      const textLength = postcard.data.text.length;

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

  return (
    <div className="postcard-container">
      <div
        className={`postcard ${flipped ? "flipped" : ""}`}
        style={
          imageDimensions
            ? { width: imageDimensions.width, height: imageDimensions.height }
            : {}
        }
      >
        {/* Front side of the card (Image) */}
        <div className="postcard-front">
          {postcard.data.image ? (
            <img
              ref={imageRef}
              src={postcard.data.image}
              onLoad={handleImageLoad} // ✅ Ensure dimensions update when image loads
              style={
                imageDimensions
                  ? {
                      width: imageDimensions.width,
                      height: imageDimensions.height,
                    }
                  : {}
              }
              alt="Postcard"
            />
          ) : (
            <p>Error loading image...</p>
          )}
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
        <MdOutlineFlipCameraAndroid
          title={flipped ? "View Image" : "View Message"}
        />
      </button>
    </div>
  );
};

export default Postcard;

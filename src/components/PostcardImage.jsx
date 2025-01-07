import React, { useEffect, useState } from "react";

const PostcardImage = ({ postcard, BACKEND_URL, ...rest }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Fetch the image as a Blob
        const response = await fetch(`${BACKEND_URL}/${postcard.image}`, {
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const blob = await response.blob();

        // Convert the Blob into a local object URL
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);

        // Cleanup: Revoke the object URL when the component unmounts
        return () => URL.revokeObjectURL(objectURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [postcard.image, BACKEND_URL]); // Run effect when postcard.image or BACKEND_URL changes

  return <img src={imageSrc} {...rest}/>;
};

export default PostcardImage;

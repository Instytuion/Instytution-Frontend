import React from "react";
import { useLocation } from "react-router-dom";

const VideoPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get("url");

  const embedUrl = videoUrl ? videoUrl.replace("watch?v=", "embed/") : "";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {embedUrl ? (
        <iframe
          width="560"
          height="315"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No video available.</p>
      )}
    </div>
  );
};

export default VideoPage;

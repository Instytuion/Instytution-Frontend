import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

const VideoPage = () => {
  const location = useLocation();
  const videoList = location.state?.url;

  console.log("====================================");
  console.log("video list is :", videoList);
  console.log("====================================");

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [allVideosPlayed, setAllVideosPlayed] = useState(false);

  useEffect(() => {
    const videoElement = document.getElementById("videoPlayer");

    if (videoList && videoList.length > 0) {
      if (!allVideosPlayed) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  }, [videoList, currentVideoIndex, allVideosPlayed]);

  const handleVideoEnd = () => {
    if (currentVideoIndex < videoList.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    } else {
      setAllVideosPlayed(true);
    }
  };

  const handleRewatch = () => {
    setCurrentVideoIndex(0);
    setAllVideosPlayed(false);
  };
  const handleVideoClick = () => {
    console.log("====================================");
    console.log("all video is played:", allVideosPlayed);
    console.log("====================================");
    if (allVideosPlayed) {
      console.log("====================================");
      console.log("setan");
      console.log("====================================");
      setCurrentVideoIndex(0);
      setAllVideosPlayed(false);
    }
  };

  const currentVideo = allVideosPlayed
    ? videoList[0].video
    : videoList[currentVideoIndex].video;

  return (
    <Box sx={{ mt: 4, textAlign: "center", position: "relative" }}>
      {videoList && videoList.length > 0 ? (
        <>
          <Typography variant="h6">
            {allVideosPlayed
              ? "All videos have been played."
              : `Playing Video ${currentVideoIndex + 1} of ${videoList.length}`}
          </Typography>
          <video
            onClick={handleVideoClick}
            id="videoPlayer"
            key={videoList[currentVideoIndex].video_serial}
            controls
            autoPlay={!allVideosPlayed}
            onEnded={handleVideoEnd}
            src={currentVideo}
            style={{
              width: "100%",
              maxHeight: 500,
              opacity: allVideosPlayed ? 0.5 : 1,
              transition: "opacity 0.5s ease",
            }}
          />
          {allVideosPlayed && (
            <Button
              variant="contained"
              onClick={handleRewatch}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                backgroundColor: "#008080",
              }}
            >
              <ReplayIcon />
            </Button>
          )}
        </>
      ) : (
        <p>No videos available.</p>
      )}
    </Box>
  );
};

export default VideoPage;

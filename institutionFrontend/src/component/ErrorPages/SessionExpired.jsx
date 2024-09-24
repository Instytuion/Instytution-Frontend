import React, {useEffect} from "react";
import {Button, Typography, Box} from "@mui/material";
import Cookies from "js-cookie";
import sessionExpired from "../../assets/session-expired-.mp4";
import {useNavigate} from "react-router-dom";

const SessionExpired = () => {
  const navigate = useNavigate();
  const checkSessionValidity = () => {
    const expiryTime = Cookies.get("expiryTime");

    if (expiryTime) {
      navigate("/page-not-found");
    }
  };

  useEffect(() => {
    checkSessionValidity();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
      }}
    >
      <video
        src={sessionExpired}
        style={{width: "300px", height: "auto"}}
        autoPlay
        loop
        muted
      />
      <Typography variant="h5" gutterBottom>
        Session Expired
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Please go to the login page to continue.
      </Typography>
      <Button variant="contained" sx={{bgcolor: "#009688"}} href="/login">
        Go to Login
      </Button>
    </Box>
  );
};

export default SessionExpired;

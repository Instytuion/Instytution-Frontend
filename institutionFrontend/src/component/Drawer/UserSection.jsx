import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const UserSection = () => {
  const email = useSelector((state) => state.userAuth.email);
  const profileImage = useSelector((state) => state.userAuth.profileImage);
  const icon = email ? email.charAt(0).toUpperCase() : "U";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Avatar
        src={profileImage || icon}
        alt="profile-image"
        sx={{ width: 40, height: 40, bgcolor: !profileImage ? "grey.300" : "transparent" }}
      >
        {!profileImage && icon}
      </Avatar>
      <Typography variant="body2" sx={{ marginLeft: 1 }}>
        {email}
      </Typography>
    </Box>
  );
};

export default UserSection;

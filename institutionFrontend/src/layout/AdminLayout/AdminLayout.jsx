import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const Layout = ({ SidebarComponent }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          display: isMobile ? "none" : "block",
          bgcolor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <SidebarComponent />
      </Box>
      <Box
        sx={{
          display: isMobile ? "block" : "none",
          transition: "width 0.3s",
          bgcolor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          zIndex: 1200,
        }}
      >
        <SidebarComponent />
      </Box>

      <Box
        component="main"
        sx={{
          p: 3,
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          ml: isMobile ? "0px" : "238px",
          transition: "margin 0.3s",
          height:'fit-content',
          width:isMobile ? '100%' : 'calc(100% - 238px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

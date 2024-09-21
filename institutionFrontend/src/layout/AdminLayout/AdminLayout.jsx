import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
import AdminSidebar from "../admin/AdminSidebar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh"}}>
      <Box
        sx={{
          display: isMobile ? "none" : "block",
         
          bgcolor: "background.paper",
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <AdminSidebar />
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
        <AdminSidebar />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          ml: isMobile  ? "0px" : "238px",
          transition: "margin 0.3s",

        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;




// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Box, IconButton, useTheme, useMediaQuery } from "@mui/material";
// import AdminSidebar from "../admin/AdminSidebar";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";

// const AdminLayout = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const [openSidebar, setOpenSidebar] = useState(false);

//   const toggleSidebar = () => setOpenSidebar(!openSidebar);

//   return (
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: isMobile ? (openSidebar ? "240px 1fr" : "0 1fr") : " 1fr",
//         height: "100vh",
//         width: "100%",
//       }}
//     >
//       {/* Sidebar for Desktop and Mobile */}
//       <Box
//         sx={{
//           display: isMobile ? (openSidebar ? "block" : "none") : "block",
//           bgcolor: "background.paper",
//           borderRight: 1,
//           borderColor: "divider",
//           position: isMobile ? "absolute" : "relative",
//           top: 0,
//           left: 0,
//           height: "100%",
//           zIndex: 1200,
//           transition: "transform 0.3s",
//           transform: isMobile && openSidebar ? "translateX(0)" : "translateX(-240px)",
//         }}
//       >
//         <IconButton
//           onClick={toggleSidebar}
//           sx={{ position: "absolute", top: 10, right: 10, display: isMobile ? "block" : "none" }}
//         >
//           {openSidebar ? <CloseIcon /> : <MenuIcon />}
//         </IconButton>
//         <AdminSidebar />
//       </Box>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           gridColumn: "2 / 3",
//           p: 3,
//           bgcolor: "background.default",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default AdminLayout;

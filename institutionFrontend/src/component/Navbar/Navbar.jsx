import React, { useState } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  IconButton,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import logo1 from "../../assets/logo1.png";
import DrawerComponent from "../Drawer/DrawerComponent";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const data = [
    { id: 1, label: "Home", link: "/", icon: <HomeIcon /> },
    { id: 2, label: "Program", link: "/programs", icon: <StoreIcon /> },
    { id: 3, label: "About Us", link: "/about", icon: <InfoIcon /> },
    { id: 4, label: "Our store", link: "/store", icon: <StoreIcon /> },
    { id: 5, label: "Contact Us", link: "/contact", icon: <ContactMailIcon /> },
  ];

  const [selectedTab, setSelectedTab] = useState("Home");
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    console.log('newValue', newValue);
    
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#00796b" }}>
        <Toolbar>
          <img width={130} src={logo1} alt="Company Logo" />

          {!isMobile ? (
            <>
              <Tabs
                textColor="inherit"
                value={selectedTab}
                onChange={handleChange}
                aria-label="Navigation Tabs"
                sx={{ marginLeft: "auto" }}
                TabIndicatorProps={{
                  sx: { backgroundColor: "black", height: 2 },
                }}
              >
                {data.map((tab) => (
                  <Tab
                    key={tab.id}
                    component={Link}
                    to={tab.link}
                    label={tab.label}
                    value={tab.label}
                    sx={{
                      color: "black",
                      "&.Mui-selected": {
                        borderBottom: "2px solid black",
                        color: "black",
                      },
                    }}
                  />
                ))}
              </Tabs>
              <IconButton sx={{ marginLeft: "auto" }}>
                <NotificationsIcon />
              </IconButton>
              <IconButton sx={{ marginLeft: "10px" }}>
                <PersonIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton sx={{ marginLeft: "auto" }}>
                <NotificationsIcon />
              </IconButton>
              <IconButton sx={{ marginLeft: "10px" }}>
                <PersonIcon />
              </IconButton>
              <IconButton
                sx={{ marginLeft: "10px" }}
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <DrawerComponent
                  openDrawer={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                  menuItems={data}
                  drawerWidth="300px"
                />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  IconButton,
  Toolbar,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import logo1 from "../../assets/logo1.png";
import login from "../../assets/login_32px.png"
import dummyProfilePic from "../../assets/profile-picture.jpg"
import DrawerComponent from "../Drawer/DrawerComponent";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { logout } from "../../redux/slices/AuthSlice";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation(); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const showToast = useToast();
  const dispatch = useDispatch();
  const {isAuthenticated, profileImage} = useSelector((state)=> state.userAuth) 

  useEffect(() => {
    const currentTab = data.find((tab) => tab.link === location.pathname);
    if (currentTab) {
      setSelectedTab(currentTab.label);
    }
  }, [location.pathname]); 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    showToast("Successfully Logged Out", "success");
    navigate("/");
  };

  const isMenuOpen = Boolean(anchorEl);

  const data = [
    { id: 1, label: "Home", link: "/", icon: <HomeIcon /> },
    { id: 2, label: "Program", link: "/courses/programs", icon: <StoreIcon /> },
    { id: 3, label: "About Us", link: "/about", icon: <InfoIcon /> },
    { id: 4, label: "Our store", link: "/store", icon: <StoreIcon /> },
    { id: 5, label: "Contact Us", link: "/contact", icon: <ContactMailIcon /> },
  ];


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
                aria-label="Navigation Tabs"
                sx={{ marginLeft: "auto" }}
                TabIndicatorProps={{
                  sx: { backgroundColor: "white", height: 2 },
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
                      color: "white",
                      pb: 0,                
                    }}
                  />
                ))}
              </Tabs>
              <IconButton sx={{ marginLeft: "auto", color:'white' }}>
                <NotificationsIcon />
              </IconButton>
              {isAuthenticated ? (
                <>
                <IconButton sx={{ marginLeft: "10px" }}
                onClick={handleMenuOpen}
                >
                  {profileImage ? (
                  <img 
                    src={profileImage}
                    alt="Profile-pic"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%", 
                      objectFit: "cover"
                    }}
                  />
                  ):(
                  <img 
                    src={dummyProfilePic}
                    alt="Profile-pic"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%", 
                      objectFit: "cover"
                    }}
                  />
                  )}
              </IconButton>
                  <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={()=>navigate("/profile")}>Profile</MenuItem>
                  <MenuItem>My Courses</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                </>
              ):(
              <IconButton sx={{ marginLeft: "10px" }} component={Link} to="/login" >
                <img src={login} alt="login icon" />
              </IconButton>
              )}
            </>
          ) : (
            <>
              <IconButton sx={{ marginLeft: "auto", color:'white' }}>
                <NotificationsIcon />
              </IconButton>
              {isAuthenticated ? (
                <>
                <IconButton sx={{ marginLeft: "10px" }}
                onClick={handleMenuOpen}
                >
                  {profileImage ? (
                  <img 
                    src={profileImage}
                    alt="Profile-pic"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%", 
                      objectFit: "cover"
                    }}
                  />
                  ):(
                  <img 
                    src={dummyProfilePic}
                    alt="Profile-pic"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%", 
                      objectFit: "cover"
                    }}
                  />
                  )}
              </IconButton>
                  <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={()=>navigate("/profile")}>Profile</MenuItem>
                  <MenuItem>My Courses</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                </>
              ):(
              <IconButton sx={{ marginLeft: "10px" }} component={Link} to="/login" >
                <img src={login} alt="login icon" />
              </IconButton>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;

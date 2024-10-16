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
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import InfoIcon from "@mui/icons-material/Info";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupsIcon from "@mui/icons-material/Groups";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import logo1 from "../../assets/logo1.png";
import login from "../../assets/login_32px.png";
import dummyProfilePic from "../../assets/profile-picture.jpg";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import { logout } from "../../redux/slices/AuthSlice";
import { logoutUser } from "../../utils/axiosFunctions";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Home");
  const [bottomNavVAlue, setbottomNavVAlue] = useState(0);
  const navigate = useNavigate();
  const showToast = useToast();
  const dispatch = useDispatch();
  const { isAuthenticated, profileImage } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    const currentTab = data.find((tab) => tab.link === location.pathname);
    if (currentTab) {
      setSelectedTab(currentTab.label);
    }
    const currentBottomTab = bottomNavData.find(
      (tab) => tab.link === location.pathname
    );
    if (currentBottomTab) {
      setbottomNavVAlue(currentBottomTab.id);
    }
  }, [location.pathname]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();
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
  const bottomNavData = [
    { id: 0, label: "Home", link: "/", icon: <HomeIcon /> },
    {
      id: 1,
      label: "Program",
      link: "/courses/programs",
      icon: <OndemandVideoIcon />,
    },
    { id: 2, label: "Store", link: "/store", icon: <ShoppingBagIcon /> },
    { id: 3, label: "About Us", link: "/about", icon: <GroupsIcon /> },
    { id: 4, label: "Contact", link: "/contact", icon: <ContactMailIcon /> },
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
              <IconButton sx={{ marginLeft: "auto", color: "white" }}>
                <NotificationsIcon />
              </IconButton>
              {isAuthenticated ? (
                <>
                  <IconButton
                    sx={{ marginLeft: "10px" }}
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
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={dummyProfilePic}
                        alt="Profile-pic"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
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
                    <MenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={()=>navigate("/courses/myCourses")}>My Courses</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <IconButton
                  sx={{ marginLeft: "10px" }}
                  component={Link}
                  to="/login"
                >
                  <img src={login} alt="login icon" />
                </IconButton>
              )}
            </>
          ) : (
            <>
              <IconButton sx={{ marginLeft: "auto", color: "white" }}>
                <NotificationsIcon />
              </IconButton>
              {isAuthenticated ? (
                <>
                  <IconButton
                    sx={{ marginLeft: "10px" }}
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
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={dummyProfilePic}
                        alt="Profile-pic"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
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
                    <MenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={()=>navigate("/courses/myCourses")}>My Courses</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <IconButton
                  sx={{ marginLeft: "10px" }}
                  component={Link}
                  to="/login"
                >
                  <img src={login} alt="login icon" />
                </IconButton>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#00796b",
          }}
          elevation={2}
        >
          <BottomNavigation
            showLabels
            value={bottomNavVAlue}
            onChange={(event, newValue) => {
              setbottomNavVAlue(newValue);
            }}
            sx={{ backgroundColor: "#00796b" }}
          >
            {bottomNavData.map((tab) => (
              <BottomNavigationAction
                key={tab.id}
                label={tab.label}
                icon={tab.icon}
                component={Link}
                to={tab.link}
                sx={{ color: "#d4d4d4", "&.Mui-selected": { color: "white" } }}
              />
            ))}
          </BottomNavigation>
        </Paper>
      ) : null}
    </>
  );
}

export default Navbar;

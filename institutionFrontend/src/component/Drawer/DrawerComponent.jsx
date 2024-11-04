import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Collapse,
  Box,
  Typography,
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toggleTheme } from "../../redux/slices/ThemeSlice";
import Logo from "../../assets/logo1.png";
import MenuItem from "../Collapse/MenuItems";
import UserSection from "./UserSection";

const DrawerComponent = ({ menuItems = [], drawerWidth = "240px" }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({});
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const email = useSelector((state)=>state.userAuth.email)
  const profileImage = useSelector((state)=>state.userAuth.profileImage)

  const icon = email ? email.charAt(0).toUpperCase() : "U";

  const handleSubMenuToggle = (label) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
      setOpenDrawer(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {!isMobile || openDrawer ? (
        <Drawer
        
          variant={isMobile ? "temporary" : "permanent"}
          open={openDrawer || !isMobile}
          onClose={() => isMobile && setOpenDrawer(false)}
          PaperProps={{
            sx: {
              width: drawerWidth,
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid",
              borderColor: theme.palette.divider,
            }}
          >
            <img src={Logo} alt="logo-image" width={100} />
            <Box>
              <Tooltip title="Notifications">
                <IconButton>
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Toggle Theme">
                <IconButton onClick={() => dispatch(toggleTheme())}>
                  {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          {/* <List sx={{ flexGrow: 1 }}>
            {menuItems.map((item, index) => (
              <Box key={index}>
                {console.log("item is :", item.path)}
                <ListItemButton
                  onClick={() =>
                    item.subItems
                      ? handleSubMenuToggle(item.label)
                      : handleNavigation(item.path)
                  }
                  sx={{
                    backgroundColor: isActive(item.path)
                      ? theme.palette.action.selected
                      : "transparent",
                      color: isActive(item.path) ? theme.palette.text.tealgreen : "",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  {item.icon && <ListItemIcon sx={{
                    color: isActive(item.path) ? theme.palette.text.tealgreen : "",
                  }}>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.label} />
                  {item.subItems ? (
                    openSubMenu[item.label] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )
                  ) : null}
                </ListItemButton>

                {item.subItems && (
                  <Collapse
                    in={openSubMenu[item.label]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          sx={{
                            pl: 4,
                            backgroundColor: isActive(subItem.path)
                              ? theme.palette.action.selected
                              : "transparent",
                              color: isActive(subItem.path) ? theme.palette.text.tealgreen : "",
                            "&:hover": {
                              backgroundColor: theme.palette.action.hover,
                            },
                          }}
                          onClick={() => handleNavigation(subItem.path)}
                        >
                          {subItem.icon && (
                            <ListItemIcon sx={{
                              color: isActive(subItem.path) ? theme.palette.text.tealgreen : "",
                            }}>{subItem.icon}</ListItemIcon>
                          )}
                          <ListItemText primary={subItem.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
          </List> */}
          <List sx={{ flexGrow: 1 }}>
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} hello="Hey iam ok with this "/>
            ))}
          </List>
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              borderTop: "1px solid",
              borderColor: theme.palette.divider,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Avatar
              src={profileImage || icon}
              alt="profile-image"
              sx={{
                width: 40,
                height: 40,
                bgcolor: !profileImage ? "grey.300" : "transparent",
              }}
            >
              {!profileImage && icon}
            </Avatar>
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {email}
            </Typography>
          </Box> */}
          <UserSection/>
        </Drawer>
      ) : (
        <IconButton
          onClick={() => setOpenDrawer(!openDrawer)}
          sx={{ position: "fixed", top: 16, right: 10, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
};

export default DrawerComponent;

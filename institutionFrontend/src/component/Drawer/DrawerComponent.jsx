import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toggleTheme } from '../../redux/slices/ThemeSlice';
import Logo from '../../assets/logo1.png';

const DrawerComponent = ({ menuItems = [], drawerWidth = '240px' }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({});
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate(); // useNavigate for handling navigation

  const { email, profileImage } = useSelector((state) => ({
    email: state.userAuth.email,
    profileImage: state.userAuth.profileImage,
  }));

  const icon = email ? email.charAt(0).toUpperCase() : 'U';

  const handleSubMenuToggle = (label) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path); // Navigate to the specified path
      setOpenDrawer(false); // Close drawer if on mobile
    }
  };

  return (
    <>
      {!isMobile || openDrawer ? (
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={openDrawer || !isMobile}
          onClose={() => isMobile && setOpenDrawer(false)}
          PaperProps={{
            sx: { width: drawerWidth, display: 'flex', flexDirection: 'column' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
              borderBottom: '1px solid',
              borderColor: theme.palette.divider,
            }}
          >
            <img
              src={Logo}
              alt="logo-image"
              width={100}
            />
            <Box>
              <Tooltip title="Notifications">
                <IconButton>
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Toggle Theme">
                <IconButton onClick={() => dispatch(toggleTheme())}>
                  {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <List sx={{ flexGrow: 1 }}>
            {menuItems.map((item, index) => (
              <div key={index}>
                <ListItemButton
                  onClick={() =>
                    item.subItems ? handleSubMenuToggle(item.label) : handleNavigation(item.path)
                  }
                >
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.label} />
                  {item.subItems ? (
                    openSubMenu[item.label] ? <ExpandLessIcon /> : <ExpandMoreIcon />
                  ) : null}
                </ListItemButton>

                {item.subItems && (
                  <Collapse in={openSubMenu[item.label]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          sx={{ pl: 4 }}
                          onClick={() => handleNavigation(subItem.path)}
                        >
                          {subItem.icon && <ListItemIcon>{subItem.icon}</ListItemIcon>}
                          <ListItemText primary={subItem.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            ))}
          </List>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 2,
              borderTop: '1px solid',
              borderColor: theme.palette.divider,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Avatar
              src={profileImage || icon}
              alt="profile-image"
              sx={{ width: 40, height: 40, bgcolor: !profileImage ? 'grey.300' : 'transparent' }}
            >
              {!profileImage && icon}
            </Avatar>
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {email}
            </Typography>
          </Box>
        </Drawer>
      ) : (
        <IconButton
          onClick={() => setOpenDrawer(!openDrawer)}
          sx={{ position: 'fixed', top: 16, right: 10, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
};

export default DrawerComponent;

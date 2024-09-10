import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DrawerComponent = ({ menuItems = [], drawerWidth = "240px" }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {!isMobile || openDrawer ? (
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          PaperProps={{
            sx: { width: drawerWidth }, 
          }}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItemButton key={index} onClick={() => setOpenDrawer(false)}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText>{item.label}</ListItemText>
              </ListItemButton>
            ))}
          </List>
          
        </Drawer>
      ) : (
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
};

export default DrawerComponent;

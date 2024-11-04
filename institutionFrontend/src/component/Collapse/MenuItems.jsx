import React, { useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List, Box } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material";

const MenuItem = ({ item,hello }) => {
    console.log('THis message for is it working or not :',hello);
    
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    if (path) navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  const handleSubMenuToggle = () => setOpenSubMenu(!openSubMenu);

  return (
    <Box>
      <ListItemButton
        onClick={() => (item.subItems ? handleSubMenuToggle() : handleNavigation(item.path))}
        sx={{
          backgroundColor: isActive(item.path) ? theme.palette.action.selected : "transparent",
          "&:hover": { backgroundColor: theme.palette.action.hover },
        }}
      >
        {item.icon && (
          <ListItemIcon sx={{ color: isActive(item.path) ? theme.palette.text.primary : "" }}>
            {item.icon}
          </ListItemIcon>
        )}
        <ListItemText primary={item.label} />
        {item.subItems && (openSubMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </ListItemButton>

      {/* Collapse for sub-items */}
      {item.subItems && (
        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems.map((subItem, subIndex) => (
              <ListItemButton
                key={subIndex}
                sx={{
                  pl: 4,
                  backgroundColor: isActive(subItem.path)
                    ? theme.palette.action.selected
                    : "transparent",
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
                onClick={() => handleNavigation(subItem.path)}
              >
                {subItem.icon && (
                  <ListItemIcon sx={{ color: isActive(subItem.path) ? theme.palette.text.primary : "" }}>
                    {subItem.icon}
                  </ListItemIcon>
                )}
                <ListItemText primary={subItem.label} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
};

export default MenuItem;

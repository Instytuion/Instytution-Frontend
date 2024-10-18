import React from "react";
import {Drawer, Box} from "@mui/material";

const drawerWidth = 240; 

const ProductFilter = ({
  onFilterChange,
  handleToggleDrawer,
  isMobile,
  openDrawer,
}) => {
  return (
    <Box>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"} // Always open on desktop, toggle on mobile
        open={openDrawer || !isMobile} // Open on desktop by default, control on mobile
        onClose={() => isMobile && handleToggleDrawer()} // Close on mobile when clicking outside
        PaperProps={{
          sx: {
            width: drawerWidth,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Drawer Content */}
        <Box p={2} sx={{flexGrow: 1}}>
          {/* Add filter controls here */}
          <p>Filters go here...</p>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ProductFilter;

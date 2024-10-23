import React from "react";
import { Box } from "@mui/material";

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => {
  return (
    <Box  sx={{ display: "flex"}}>

      {sizes.map((size, i) => (
        <Box
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSize(size);
          }}
          sx={{
            padding: "4px 8px",
            borderRadius: "4px",
            backgroundColor: selectedSize === size ? "#000" : "#f0f0f0",
            color: selectedSize === size ? "#fff" : "#000",
            marginLeft: 1,
            cursor: "pointer",
            border: `2px solid ${selectedSize === size ? "#000" : "#ddd"}`,
            fontSize: "0.75rem",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: selectedSize === size ? "#333" : "#e0e0e0",
            },
          }}
        >
          {size}
        </Box>
      ))}
    </Box>
  );
};

export default SizeSelector;

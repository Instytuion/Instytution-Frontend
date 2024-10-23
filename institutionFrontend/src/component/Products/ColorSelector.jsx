import React from "react";
import {Box, Tooltip} from "@mui/material";

const ColorSelector = ({
  colors,
  availableColors,
  selectedColor,
  setSelectedColor,
}) => {
  console.log("colors----------", colors);

  return (
    <Box display={'flex'}>
      {console.log("available colors", availableColors)}

      {colors.map((color, i) => (
        <Tooltip
          title={
            availableColors.has(color.toLowerCase())
              ? ""
              : "This Is Currently Unavailable"
          }
          arrow
          key={i}
        >
          {/* Ensure Tooltip wraps only the Box component */}
          <Box
            onClick={(e) => {
              e.stopPropagation();
              if (availableColors.has(color)) {
                setSelectedColor(color);
              }
            }}
            sx={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: color.toLowerCase(),
              marginLeft: 1,
              textAlign: "center",
              boxShadow: availableColors.has(color)
                ? "0 0 5px rgba(0, 0, 0, 0.5)"
                : "0 0 5px rgba(255, 0, 0, 0.5)",
              cursor: availableColors.has(color) ? "pointer" : "not-allowed",
              border: `2px solid ${
                selectedColor.toLowerCase() === color.toLowerCase()
                  ? "#000"
                  : "#f2f2f2"
              }`,
              opacity: availableColors.has(color) ? 1 : 0.3,
            }}
          />
        </Tooltip>
      ))}
    </Box>
  );
};

export default ColorSelector;

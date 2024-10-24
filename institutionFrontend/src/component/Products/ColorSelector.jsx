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
    <Box display={"flex"}>
      {console.log("available colors", availableColors)}

      {colors.map((color, i) => (
        <Tooltip
          title={
            availableColors && availableColors.has(color.toLowerCase())
              ? ""
              : "This Is Currently Unavailable"
          }
          arrow
          key={i}
        >
          <Box
            onClick={(e) => {
              e.stopPropagation();
              if (availableColors && availableColors.has(color)) {
                setSelectedColor(color);
              }
            }}
            sx={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              marginLeft: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor:
                availableColors && availableColors.has(color)
                  ? "pointer"
                  : "not-allowed",
              border:
                selectedColor.toLowerCase() === color.toLowerCase()
                  ? "2px solid black"
                  : "2px solid transparent",
              boxShadow:
                availableColors && availableColors.has(color)
                  ? "0 0 2px rgba(0, 0, 0, 0.5)"
                  : "0 0 2px rgba(128, 128, 128, 0.5)",
            }}
          >
            <Box
              sx={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: color.toLowerCase(),
              }}
            />
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default ColorSelector;

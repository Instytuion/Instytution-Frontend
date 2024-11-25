import React from "react";
import {Box, Tooltip} from "@mui/material";
import style from "./style";

const ColorSelector = ({
  colors,
  availableColors,
  selectedColor,
  setSelectedColor,
}) => {
  const styles2 = style();

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
            sx={styles2.colorBox(availableColors, color, selectedColor)}
          >
            <Box
              sx={styles2.innerDot(color)}
            />
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default ColorSelector;

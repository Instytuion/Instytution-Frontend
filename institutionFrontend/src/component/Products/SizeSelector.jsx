import React from "react";
import { Box } from "@mui/material";
import styles from "./style"

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => {
  const style =  styles()

  return (
    <Box sx={{display: "flex"}}>
      {sizes.map((size, i) => (
        <Box
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSize(size);
          }}
          sx={style.sizeBox(selectedSize, size)}
        >
          {size}
        </Box>
      ))}
    </Box>
  );
};

export default SizeSelector;

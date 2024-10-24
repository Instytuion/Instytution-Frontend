import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CounterButtons = ({ quantity }) => {
  const [count, setCount] = useState(quantity ? quantity : 0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    setCount((prevCount) => Math.max(0, prevCount - 1));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: 1,
      }}
    >
   
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderRadius: "15px",
          boxShadow: "9px 5px 10px #dfe3ea, -5px -5px 10px #faffff",
        }}
      >
        <IconButton
          onClick={handleDecrement}
          sx={{
            color: "common.black",
            width: 40,
            height: 40,
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>

        <Typography
          variant="h6"
          component="span"
          sx={{
            width: 50,
            textAlign: "center",
            padding: "6px 12px",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          {count}
        </Typography>

        <IconButton
          onClick={handleIncrement}
          sx={{
            color: "common.black",
            width: 40,
            height: 40,
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CounterButtons;

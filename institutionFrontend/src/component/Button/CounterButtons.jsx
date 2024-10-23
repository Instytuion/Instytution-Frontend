import {Box, IconButton, Typography} from "@mui/material";
import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CounterButtons = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    setCount((prevCount) => Math.max(0, prevCount - 1));
  };

  return (
    <Box sx={{display: "flex", alignItems: "center", gap: 2 , border: '2px solid', p:1 ,  borderRadius: 8}}>

      <IconButton
        onClick={handleDecrement}
        sx={{
          bgcolor: "action.active",
          color: "common.white",
          "&:hover": {bgcolor: "action.active"},
          width: 32,
          height: 32,
        }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography variant="body1" component="span">
        {count}
      </Typography>
      <IconButton
        onClick={handleIncrement}
        sx={{
          bgcolor: "action.active",
          color: "common.white",
          "&:hover": {bgcolor: "action.active"},
          width: 32,
          height: 32,
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
export default CounterButtons;

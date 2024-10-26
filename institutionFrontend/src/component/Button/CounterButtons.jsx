import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useToast from "../../hooks/useToast";
import CartLoader from "../Spinner/CartLoader";

const CounterButtons = ({ quantity, onQuantityChange,maxCount, Loading }) => {
  const [count, setCount] = useState(quantity || 0);
  const showToast = useToast()
  if(Loading){
    console.log('indddddddddddddddddddddd');
    
  }else{
    console.log('illaaaaaaaaaaaaaaaaaaaa');
    
  }

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  const handleIncrement = () => {
    if(count+ 1 > maxCount){
      showToast("We're Sorry, Only 12 Units Allowed.","error")
      
    }else{
      setCount((prevCount) => {
      const newCount = prevCount + 1;
      onQuantityChange(newCount);
      return newCount;
    });
    }
    
    
  };

  const handleDecrement = () => {
    setCount((prevCount) => {
      const newCount = Math.max(0, prevCount - 1);
      onQuantityChange(newCount);
      return newCount;
    });
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
        {Loading ? <CartLoader  height="45px"/>:(
          <>
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
          </>

        )}
        
      </Box>
    </Box>
  );
};

export default CounterButtons;



import { Box, Button } from "@mui/material";
import emptyCart from "../../assets/emptyCart.gif";
import { useNavigate } from "react-router-dom";
import { bounceAnimation } from "../StyledComponents/Animations";
const EmptyCart = () => {
    const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <img src={emptyCart} alt="Empty-Cart" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/store")}
        sx={{
          position: "absolute",
          top: "60%",
          left: "40%",
          transform: "translateX(-50%)",
          ...bounceAnimation
          
        }}
      >
        Continue shopping
      </Button>
    </Box>
  );
};

export default EmptyCart;
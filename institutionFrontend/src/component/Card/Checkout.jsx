import { Box, Paper, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";

const CheckoutCard = ({ data }) => {
  console.log("Data from checkout card is ? ;", data);

  const { name, images, total_price, quantity, size } = data;
  const [count, setCount] = useState(quantity);

  const handleCounterButton = (newCount) => {
    setCount(newCount);
  };
  return (
    <StyledPaper elevation={3}>
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={images}
          alt={name}
          sx={{ width: 80, height: 80, borderRadius: 1, mr: 2 }}
        />
        <Box flex="1">
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="h6"  fontSize={13} color="text.secondary">
            Price: ${count * total_price} ({count}* {total_price})
          </Typography>
          <Typography variant="h6"  fontSize={13} color="text.secondary">
            Size: {size}
          </Typography>
          
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default CheckoutCard;
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  width: "100%",
  maxWidth: 400,
  marginBottom: theme.spacing(2),
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[6],
  },
}));


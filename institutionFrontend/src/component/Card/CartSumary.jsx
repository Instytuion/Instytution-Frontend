import { Box, Card, Typography, Button, Divider, Stack } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import bounceAnimation from "../StyledComponents/Animations";
const CartSummary = ({ subtotal, shipping = 40 }) => {
  const total = subtotal + shipping;

  return (
    <Card
      sx={{
        p: { xs: 1, sm: 2, md: 4 },
        mt: 1,
        boxShadow:
          "8px 6px 20px rgba(223, 227, 234, 0.7), 0px 0px 25px rgba(250, 255, 255, 0.7)",
        transition: "0.3s",
        bgcolor: "white",
        borderRadius: "12px",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Cart Summary
      </Typography>

      <Stack spacing={2}>
        {/* Subtotal */}
        <Box display="flex" justifyContent="space-between">
          <Typography>Subtotal:</Typography>
          <Typography>₹{subtotal.toFixed(2)}</Typography>
        </Box>

        {/* Shipping */}
        <Box display="flex" justifyContent="space-between">
          <Typography>Shipping:</Typography>
          <Typography>₹{shipping.toFixed(2)}</Typography>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Total */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">₹{total.toFixed(2)}</Typography>
        </Box>

        {/* Proceed to Checkout Button */}
        <Button
          variant="contained"
          sx={{
            mt: 2,
            fontFamily: "'Montserrat', sans-serif",
            backgroundColor: "#ff6f61",
            gap: 2,
            "&:hover": {
              backgroundColor: "#ff3d47",
            },
          }}
          fullWidth
        >
          Proceed to Checkout
          <ShoppingCartCheckoutIcon
            sx={{
              ...bounceAnimation
            }}
          />
        </Button>
      </Stack>
    </Card>
  );
};

export default CartSummary;

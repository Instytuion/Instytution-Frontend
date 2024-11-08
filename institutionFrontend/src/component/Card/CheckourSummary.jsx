import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaidIcon from "@mui/icons-material/Paid";
import DoneIcon from "@mui/icons-material/Done";
import PaymentIcon from "@mui/icons-material/Payment";
import { Paper, Typography, Stack, Button, Divider } from "@mui/material";
import { bounceAndScale } from "../StyledComponents/Animations";

const CheckoutSummary = ({ handleOrder, grandTotal }) => {
  const deliveryCharge = grandTotal > 1000 ? "Free Delivery" : "$40";
  const finalAmount = grandTotal + (deliveryCharge === "Free Delivery" ? 0 : 40);  

  return (
    <Paper
      elevation={6}
      sx={{
        padding: 4,
        width: "100%",
        maxWidth: 420,
        margin: "auto",
        borderRadius: 3,
        backgroundColor: "#f3f7fa",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0px 12px 35px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Stack direction="column" spacing={4} alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <ShoppingCartIcon sx={{ color: "#008080" }} fontSize="large" />
          <Typography variant="h5" fontWeight="bold" color="#008080">
            Checkout Summary
          </Typography>
        </Stack>

        <Divider sx={{ width: "100%", marginY: 2 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <Typography variant="h6" fontWeight="500">
            Total Amount:
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PaidIcon sx={{ color: "#008080" }} />
            <Typography variant="h5" fontWeight="bold" color="#008080">
              ${grandTotal.toFixed(2)}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <Typography variant="body1" color="text.secondary">
            Delivery Charge:
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocalShippingIcon
              sx={{
                color: deliveryCharge === "Free Delivery" ? "#008080" : "#FF6F61",
                transform: deliveryCharge === "Free Delivery" ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s ease",
              }}
            />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontWeight: "bold",
                color: deliveryCharge === "Free Delivery" ? "#008080" : "#FF6F61",
              }}
            >
              {deliveryCharge === "Free Delivery" ? (
                <>
                  {deliveryCharge} <DoneIcon sx={{ color: "#008080", fontSize: "1.3rem" }} />
                </>
              ) : (
                deliveryCharge
              )}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ width: "100%", marginY: 2 }} />

        {deliveryCharge !== "Free Delivery" && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ width: "100%", justifyContent: "space-between" }}
          >
            <Typography variant="h6" fontWeight="bold">
              Final Amount:
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#FF6F61" }}>
              ${finalAmount.toFixed(2)}
            </Typography>
          </Stack>
        )}

        <Button
          onClick={handleOrder}
          variant="contained"
          startIcon={<PaymentIcon sx={{ color: "#fff" }} />}
          sx={{
            paddingY: 1.5,
            fontSize: "1.2rem",
            width: "100%",
            fontWeight: "bold",
            borderRadius: 3,
            background: "linear-gradient(135deg, #008080, #005959)",
            color: "#fff",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            animation: `${bounceAndScale} 2s ease-in-out infinite`,
            "&:hover": {
              background: "linear-gradient(135deg, #005959, #008080)",
              boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.3)",
              transform: "scale(1.05)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Pay Now
        </Button>
      </Stack>
    </Paper>
  );
};

export default CheckoutSummary;

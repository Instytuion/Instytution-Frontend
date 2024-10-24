import { Box, Card, Stack, Typography } from "@mui/material";
import CounterButtons from "../Button/CounterButtons";

const CartItems = ({ data }) => {
  console.log("data from item", data);

  const { product, quantity, total_price } = data;

  const firstImage = product.product_images.find(
    (image) => image.color === product.color
  );

  return (
    <Card
      sx={{
        p: 6,
        mt: 3,
        boxShadow:
          "5px 4px 15px rgba(223, 227, 234, 0.5), 0px 0px 20px rgba(250, 255, 255, 0.5)",
        transition: "0.3s", // Smooth transition effect on hover
        "&:hover": {
          boxShadow:
            "8px 6px 20px rgba(223, 227, 234, 0.7), 0px 0px 25px rgba(250, 255, 255, 0.7)",
        },
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center" }} width={"40%"}>
          {firstImage ? (
            <img
              src={firstImage.image}
              alt="Product Image"
              style={{
                width: "100px",
                height: "auto",
                borderRadius: "8px",
                marginRight: "16px",
              }}
            />
          ) : (
            <Typography>No image available for this color.</Typography>
          )}
          <Stack direction={"column"}>
          <Typography
  variant="h5"
  sx={{
    fontFamily: "'AeonikTRIAL-Bold', sans-serif", // Use the custom font
    fontWeight: 700,                             // Ensure bold weight
    letterSpacing: "0.02em",                     // Slight letter spacing
    lineHeight: 1.3,                             // Adjusted line height
    color: "#333",                               // Text color
    textTransform: "capitalize",                 // Capitalize first letter
  }}
>
  {product.product_name}
</Typography>


            <Typography variant="body2" fontWeight={500}>
              Unit Price: ₹{product.price}
            </Typography>
            {product.size && (
              <Typography variant="body2">Size: {product.size}</Typography>
            )}
          </Stack>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          width={"60%"}
          justifyContent={"space-between"}
        >
          <CounterButtons quantity={quantity} />
          <Typography variant="h6" fontWeight={500}>
            Total Price: {total_price}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default CartItems;

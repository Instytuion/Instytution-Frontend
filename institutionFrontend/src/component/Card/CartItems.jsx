import { Box, Card, Stack, Typography } from "@mui/material";
import CounterButtons from "../Button/CounterButtons";
import ClearIcon from "@mui/icons-material/Clear";
import CartServices from "../../services/user/ecommerce/CartServices";
import { useState } from "react";
import useToast from "../../hooks/useToast";
import {  useQueryClient } from "react-query";
import { useSelector, useDispatch } from 'react-redux'; 
import { updateCartQuantity } from "../../redux/slices/Cart";


const CartItems = ({ data, onRemoveItem }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartData);
  const { product, quantity, id } = data;

  const [count, setCount] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useToast();
  const firstImage = product?.product_images.find(
    (image) => image.color === product.color
  );
  const handleQuantityChange = async (newCount = 1) => {
    setIsLoading(true)
    const previousCart = cartItems.find(item => item.product.product_id === product.product_id);

    dispatch(updateCartQuantity({ id: product.id, newQuantity: newCount }));  
    showToast(`The quantity for ${product.product_name} has been updated to ${newCount}.`, "success");
  
    try {
      const response = await CartServices.createCart(product.id, newCount);
      
      setCount(response.quantity);
      queryClient.invalidateQueries("cartItems");
    } catch (error) {
      dispatch(updateCartQuantity({ id: product.id, newQuantity: previousCart.quantity }));
      showToast("Failed to update quantity. Please try again.", "error");
    }finally{
      setIsLoading(false)
    }
  };

  const handleRemove = () => {
    onRemoveItem(id, product.product_name);
  };

  return (
    <Card
      sx={{
        mt: 3,
        boxShadow:
          "8px 6px 20px rgba(223, 227, 234, 0.7), 0px 0px 25px rgba(250, 255, 255, 0.7)",
        transition: "0.3s",
        bgcolor: "white",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={{ xs: 2, sm: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "flex-end", sm: "flex-start" },
          }}
        >
          <ClearIcon
            onClick={handleRemove}
            sx={{ cursor: "pointer", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: "100%", sm: "60%" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {firstImage?.image ? (
            <img
              src={firstImage.image}
              alt="Product"
              style={{
                width: "100px",
                height: "auto",
                borderRadius: "8px",
                marginBottom: { xs: "16px", sm: "0" },
              }}
            />
          ) : (
            <Typography>No image available</Typography>
          )}
          <Stack
            direction="column"
            sx={{
              ml: { sm: 2 },
              width: "100%",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'AeonikTRIAL-Bold', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.02em",
                lineHeight: 1.3,
                color: "#333",
                textTransform: "capitalize",
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
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
          display="flex"
          flexDirection={{ xs: "column", sm: "column", md: "row" }}
          alignItems="center"
          width={{ xs: "100%", sm: "45%" }}
          justifyContent="space-between"
          textAlign={{ xs: "center", sm: "right" }}
          mt={{ xs: 2, sm: 0 }}
        >
          <CounterButtons
            quantity={count}
            Loading={isLoading}
            onQuantityChange={handleQuantityChange}
            maxCount="12"
            sx={{ mb: { xs: 1, sm: 0 } }}
          />
          <Typography
            variant="h6"
            fontWeight={500}
            sx={{ whiteSpace: "nowrap" }}
          >
            Total: ₹{(product.price * count).toFixed(2)}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default CartItems;

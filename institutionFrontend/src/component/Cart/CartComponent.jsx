import { useQuery } from "react-query"; 
import instance from "../../utils/axios";
import { Box, Stack, Typography } from "@mui/material";
import CartItems from "../Card/CartItems";

const fetchCartItems = async () => {
  const response = await instance.get("accounts/cart/detail/");
  return response.data; 
};

const CartComponent = () => {
  const { data: cartItems, error, isLoading } = useQuery("cartItems", fetchCartItems, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Typography>Loading...</Typography>; 
  if (error) return <Typography>Error fetching cart items: {error.message}</Typography>;

  console.log('data from parent is:', cartItems);

  return (
    <Stack direction="row">
      <Box sx={{  padding: 1, width: "calc(100vw - 30vw)" }} >
        {cartItems?.length > 0 ? (
          cartItems.map((item) => (
            <CartItems key={item.id} data={item} /> // Pass each item, not the whole array
          ))
        ) : (
          <Typography>No items are available</Typography>
        )}
      </Box>
      <div>Hey, I'm okay</div>
    </Stack>
  );
};

export default CartComponent;

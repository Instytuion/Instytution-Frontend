import { useQueryClient, useQuery } from "react-query";
import instance from "../../utils/axios";
import { Box, Stack, Typography } from "@mui/material";
import CartItems from "../Card/CartItems";
import CartSummary from "../Card/CartSumary";
import CartLoader from "../Spinner/CartLoader";
import CartServices from "../../services/user/ecommerce/CartServices";
import useToast from "../../hooks/useToast";

const fetchCartItems = async () => {
  const response = await instance.get("accounts/cart/detail/");
  return response.data;
};

const CartComponent = () => {
  const queryClient = useQueryClient();
  const showToast = useToast();
  const {
    data: cartItems,
    error,
    isLoading,
  } = useQuery("cartItems", fetchCartItems, {
    refetchOnWindowFocus: false,
  });
  const handleCartDelete = async (id, name) => {
    console.log("name is :", name);

    try {
      const response = await CartServices.cartDelete(id);
      console.log("Deletion response data is :", response);
      showToast(`${name} Product Successfully delted From Cart..`, "success");
      queryClient.invalidateQueries("cartItems");
    } catch (error) {
      console.log("Error is :", error);

      showToast(error.data, "error");
    }
  };
  if (isLoading) return <CartLoader />;
  if (error)
    return <Typography>Error fetching cart items: {error.message}</Typography>;

  const subtotal =
    cartItems?.reduce((acc, item) => acc + item.total_price, 0) || 0;

  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        textAlign="center"
        fontFamily={"-apple"}
        sx={{ mb: 4 }}
      >
        Shopping Cart
      </Typography>

      <Stack
        direction={{ xs: "column", md: "column", lg: "row" }}
        spacing={3}
        sx={{ mx: 4, mt: 2 }}
      >
        {/* Cart Items Section */}
        <Box
          sx={{
            padding: 2,
            flex: 2,
            bgcolor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            height: "calc(100vh - 15vh)",
            overflowY: "auto",
          }}
        >
          {cartItems?.length > 0 ? (
            cartItems.map((item) => (
              <CartItems
                key={item.id}
                data={item}
                onRemoveItem={handleCartDelete}
              />
            ))
          ) : (
            <Typography>No items are available</Typography>
          )}
        </Box>

        {/* Cart Summary Section */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            bgcolor: "white",
            borderRadius: "8px",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CartSummary subtotal={subtotal} />
        </Box>
      </Stack>
    </>
  );
};

export default CartComponent;

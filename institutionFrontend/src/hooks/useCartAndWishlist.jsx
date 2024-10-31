import { useQuery } from "react-query";
import CartServices from "../services/user/ecommerce/CartServices"; // Ensure you have the correct import path
import WishlistServices from "../services/user/Wishlist";
import { useSelector } from "react-redux";

const useCartAndWishlist = () => {
  const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated);
  const userId = useSelector((state) => state.userAuth.userId);

  const {
    data: wishlists,
    error: wishlistError,
    isLoading: isWishlistLoading,
  } = useQuery(["wishlists", userId], () => WishlistServices.getWishlist(), {
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  });

  const {
    data: cartItems,
    error: cartError,
    isLoading: isCartLoading,
  } = useQuery(["cartItems", userId], () => CartServices.getCart(), {
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  });

  // Handle errors from both API calls
  if (wishlistError) {
    console.error("Error fetching wishlists:", wishlistError);
  }

  if (cartError) {
    console.error("Error fetching cart items:", cartError);
  }

  return {
    wishlists,
    cartItems,
  };
};

export default useCartAndWishlist;

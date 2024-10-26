import {useQuery} from "react-query";
import WishlistServices from "../services/user/Wishlist";
import {useSelector} from "react-redux";

const useWishlist = () => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );

  const {
    data: wishlists,
    error,
    isLoading,
  } = useQuery(["wishlists"], () => WishlistServices.getWishlist(), {
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  });

  return {wishlists, error, isLoading};
};

export default useWishlist;
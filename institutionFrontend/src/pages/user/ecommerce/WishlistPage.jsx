import React from "react";
import WishlistCard from "../../../component/Card/WishlistCard";
import {Grid, Stack} from "@mui/material";
import WishlistServices from "../../../services/user/Wishlist";
import {removeFromWishlist} from "../../../redux/slices/WishlistSlice";
import {useDispatch, useSelector} from "react-redux";
import useToast from "../../../hooks/useToast";
import NoData from "../../../component/NoData/NoData";

const WishlistPage = () => {
  const wishlists = useSelector((state) => state.wishlist.wishlists);
  const dispatch = useDispatch();
  const showToast = useToast();

  const handleDelete = async (id, productName) => {
    const itemToDelete = wishlists.find((item) => item.id === id);
    dispatch(removeFromWishlist(id));

    try {
      await WishlistServices.deleteWishlist(id);
      showToast(`${productName} deleted from wishlist`, "success");
    } catch (err) {
      console.log(err);
      showToast(`Failed to delete ${productName} from wishlist`, "error");
      if (itemToDelete) {
        dispatch(addToWishlist(itemToDelete)); 
      }
    }
  };

  return (
    <>
      <Grid container spacing={1}>
        {wishlists.length === 0 ? (
          <Stack
            sx={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NoData text={"No items In Wishlist"} />
          </Stack>
        ) : (
          wishlists.map((wishlist) => (
            <Grid item xs={6} sm={4} md={3} lg={3} key={wishlist.id}>
              <WishlistCard data={wishlist} onDelete={handleDelete} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default WishlistPage;

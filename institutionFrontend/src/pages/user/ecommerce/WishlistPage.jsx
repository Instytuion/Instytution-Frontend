import React from "react";
import WishlistCard from "../../../component/Card/WishlistCard";
import {Grid, Stack, Typography} from "@mui/material";
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
    <Stack spacing={2} p={4}>
    <Typography
      variant="h4"
      pl={3}
      pr={3}
      gutterBottom
      sx={{
        borderBottom: "3px solid #000",
        width: "fit-content",
        paddingBottom: "4px",
        fontWeight: "bold",
      }}
    >
      Wishlists
    </Typography>
    <Grid container spacing={2} sx={{ paddingLeft: 3 }}>
      {wishlists.length === 0 ? (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <NoData text={"No items in Wishlist"} />
        </Grid>
      ) : (
        wishlists.map((wishlist) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            key={wishlist.id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <WishlistCard data={wishlist} onDelete={handleDelete} />
          </Grid>
        ))
      )}
    </Grid>
  </Stack>
);
};

export default WishlistPage;
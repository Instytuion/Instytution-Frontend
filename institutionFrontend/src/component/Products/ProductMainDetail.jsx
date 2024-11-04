import React from "react";
import {Box, Grid, IconButton, Stack, Typography} from "@mui/material";
import {Favorite, FavoriteBorder, Share} from "@mui/icons-material";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import {getUniqueColors, getUniqueSizes} from "../../utils/productUtils";
import style1 from "./style";
import RatingComponent from "../Rating/Rating";

const ProductDetails = ({
  product,
  selectedPrice,
  isWishlisted,
  handleWishlistToggle,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  hasSizes,
  selectedStock,
  availableColorsForSizeState,
}) => {
    const styles1 = style1();

  return (
    <Grid item xs={12} md={6} sx={{position: "relative"}}>
      <Box pl={4}>
        {/* Wishlist and Share buttons */}
        <Box sx={styles1.wihsAndShareWrapper}>
          <IconButton onClick={handleWishlistToggle}>
            {isWishlisted ? (
              <Favorite sx={{color: "red"}} />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
          <IconButton>
            <Share />
          </IconButton>
        </Box>

        <Stack spacing={2}>
          {/* Product Name */}
          <Typography variant="h5" fontWeight="bold">
            {product.name}
          </Typography>
          <RatingComponent value={product.average_rating} readOnly={true} count={`${product.rating_count} Reviews`}/>

          {/* Product Price */}
          <Typography variant="h5">₹ {selectedPrice}</Typography>

          {/* Horizontal Rule */}
          <hr style={{border: "1px solid #e0e0e0", margin: "20px 0"}} />

          {/* Color and Size Selection */}
          <Stack direction="row" spacing={2} sx={{margin: "0px !important"}}>
            <Box sx={{width: "50%"}}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Color
              </Typography>
              <ColorSelector
                colors={getUniqueColors(product?.images)}
                availableColors={availableColorsForSizeState}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </Box>

            {hasSizes && (
              <Box sx={{width: "50%"}}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Size
                </Typography>
                <SizeSelector
                  sizes={getUniqueSizes(product.details)}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
              </Box>
            )}
          </Stack>

          {/* Stock Availability */}
          <Typography variant="body1" color="textSecondary">
            {selectedStock > 0
              ? `In Stock (${selectedStock} available)`
              : "Out of Stock"}
          </Typography>
        </Stack>
      </Box>
    </Grid>
  );
};

export default ProductDetails;

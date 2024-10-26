import {
  Box,
  Stack,
  Typography,
  useMediaQuery,
  Container,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import ProductImages from "../../../component/ProductImages/ProductImage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageNotFoundPage from "../../../component/ErrorPages/PageNotFound";
import ColorSelector from "../../../component/Products/ColorSelector";
import {
  getAvailableColorsForSize,
  getDetailsByColorAndSize,
  getImagesBySelectedColor,
  getUniqueColors,
  getUniqueSizes,
} from "../../../utils/productUtils";
import { useEffect, useState } from "react";
import SizeSelector from "../../../component/Products/SizeSelector";
import { Favorite, FavoriteBorder, Share } from "@mui/icons-material";
import { useQuery } from "react-query";
import CartLoader from "../../../component/Spinner/CartLoader";
import ProductsServices from "../../../services/user/ProductServices";
import { useDispatch, useSelector } from "react-redux";
import WishlistServices from "../../../services/user/Wishlist";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/slices/WishlistSlice";
import CartServices from "../../../services/user/ecommerce/CartServices";
import useToast from "../../../hooks/useToast";

const ProductDetailPage = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { id } = useParams();
  const showToast = useToast()

  const {
    data: product,
    error,
    isLoading,
  } = useQuery(["product", id], () => ProductsServices.getProduct(id), {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const wishlistItems = useSelector((state) => state.wishlist.wishlists);
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const [hasSizes, setHasSizes] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState(null);
  const [availableColorsForSizeState, setavailableColorsForSizeState] =useState(null);

  const handleCart = async () => {
    console.log("try to item to cart", updatedDetails.id);

    try {
      const response = await CartServices.createCart(updatedDetails.id);
      showToast(`${response.product.product_name} has been successfully added to your cart.`,'success');
      console.log("Response from add to cart is :", response);
      
    } catch (error) {
      console.log("Error is :", error);
    }
  };

  useEffect(() => {
    if (product) {
      const sizesForProduct = product.details?.some((detail) => detail.size);
      setHasSizes(sizesForProduct);
      if (sizesForProduct) {
        setSelectedSize(product.details[0].size);
      } else {
        setSelectedSize("");
      }
      setSelectedColor(product.details[0].color);
      setSelectedPrice(product.details[0].price);
      setSelectedStock(product.details[0].stock);
    }
  }, [product]);

  // Effect to update details when product, selectedColor, or selectedSize changes
  useEffect(() => {
    if ((product && selectedColor) || selectedSize) {
      const details = getDetailsByColorAndSize(
        product,
        selectedColor,
        selectedSize
      );
      setUpdatedDetails(details);
      if (details) {
        console.log("price and stock is :", details.price, details.stock);
        setSelectedPrice(details.price);
        setSelectedStock(details.stock);
      }

      const availableColorsForSize = product?.details?.some(
        (detail) => detail.size
      )
        ? new Set(getAvailableColorsForSize(product, selectedSize))
        : new Set(getUniqueColors(product?.images));

      if (
        !availableColorsForSize.has(selectedColor) &&
        availableColorsForSize.size > 0
      ) {
        setavailableColorsForSizeState(availableColorsForSize);
        const firstAvailableColor = [...availableColorsForSize][0];
        setSelectedColor(firstAvailableColor);
      } else {
        setavailableColorsForSizeState(availableColorsForSize);
      }
    }
  }, [product, selectedColor, selectedSize]);

  useEffect(() => {
    if (wishlistItems && updatedDetails) {
      const isWishlistedItem = wishlistItems.some(
        (item) => item.product.id === updatedDetails.id
      );
      setIsWishlisted(isWishlistedItem);
    }
  }, [wishlistItems, updatedDetails]);

  if (isLoading) return <CartLoader />;
  if (error || !product) return <PageNotFoundPage />;

  const colorImages = getImagesBySelectedColor(product, selectedColor);

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      showToast("Login Required", "error");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setIsWishlisted(!isWishlisted);

    try {
      if (isWishlisted) {
        const wishlistItem = wishlistItems.find(
          (wishItem) => wishItem.product.id === updatedDetails.id
        );
        if (wishlistItem) {
          await WishlistServices.deleteWishlist(wishlistItem.id);
          dispatch(removeFromWishlist(wishlistItem.id));
        }
      } else {
        const response = await WishlistServices.addWishlist(updatedDetails.id);
        dispatch(addToWishlist(response));
      }
    } catch (err) {
      console.error(err);
      setIsWishlisted(isWishlisted);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        bgcolor: "#f9f9f9",
        borderRadius: 2,
        padding: isMobile ? 2 : 4,
        marginTop: 4,
      }}
    >
      <Grid container spacing={2}>
        {/* Image Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <ProductImages images={colorImages} />
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6} sx={{ position: "relative" }}>
          <Box pl={4}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                position: "absolute",
                top: 25,
                right: 5,
              }}
            >
              <IconButton onClick={handleWishlistToggle}>
                {isWishlisted ? (
                  <Favorite sx={{ color: "red" }} />
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

              {/* Product Price */}
              <Typography variant="h5">₹ {selectedPrice}</Typography>

              {/* Horizontal Rule */}
              <hr style={{ border: "1px solid #e0e0e0", margin: "20px 0" }} />

              {/* Color and Size Selection */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ margin: "0px !important" }}
              >
                <Box sx={{ width: "50%" }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
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
                  <Box sx={{ width: "50%" }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
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

        {/* Buttons Section */}
        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={2} mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCart}
              sx={{
                width: "100%",
                padding: "12px 0",
                fontWeight: "bold",
                backgroundColor: "#ff6f61",
                "&:hover": {
                  backgroundColor: "#ff3d47",
                },
              }}
            >
              ADD TO CART
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                width: "100%",
                padding: "12px 0",
                fontWeight: "bold",
                borderColor: "#ff6f61",
                color: "#ff6f61",
                "&:hover": {
                  backgroundColor: "#ff6f61",
                  color: "#fff",
                },
              }}
            >
              BUY NOW
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;

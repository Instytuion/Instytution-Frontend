import {
  Box,
  Stack,
  Typography,
  useMediaQuery,
  Container,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import ProductImages from "../../../component/ProductImages/ProductImage";
import { useLocation } from "react-router-dom";
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
import { Favorite, Share } from "@mui/icons-material";
import CartServices from "../../../services/user/ecommerce/CartServices";
import CounterButtons from "../../../component/Button/CounterButtons";

const ProductDetailPage = () => {
  const location = useLocation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { productData } = location.state || {};
  const product = productData[0];

  // Product details initialization
  const hasSizes = product?.details.some((detail) => detail.size);
  const [selectedSize, setSelectedSize] = useState(
    hasSizes ? product.details[0].size : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product.details[0].color || ""
  );
  const [selectedPrice, setSelectedPrice] = useState(
    product.details[0].price || ""
  );
  const [selectedStock, setSelectedStock] = useState(
    product.details[0].stock || ""
  );

  const colorImages = getImagesBySelectedColor(product, selectedColor);
  const availableColorsForSize = hasSizes
    ? getAvailableColorsForSize(product, selectedSize)
    : new Set(getUniqueColors(product?.images));

  const updatedDetails = getDetailsByColorAndSize(
    product,
    selectedColor,
    selectedSize
  );

  const handleCart = async () => {
    try {
      const response = await CartServices.createCart(product.id);
      console.log("Response from add to cart is :", response);
    } catch (error) {
      console.log("Error is :", error);
    }
  };

  useEffect(() => {
    if (hasSizes) {
      const sizeDetail = product?.details.find(
        (detail) => detail.size === selectedSize
      );
      if (sizeDetail) {
        setSelectedPrice(sizeDetail.price);
        setSelectedStock(sizeDetail.stock);
      }
    }
    if (updatedDetails) {
      setSelectedPrice(updatedDetails.price);
      setSelectedStock(updatedDetails.stock);
    }

    if (hasSizes && !availableColorsForSize.has(selectedColor)) {
      const firstAvailableColor = [...availableColorsForSize][0];
      setSelectedColor(firstAvailableColor);
    }
  }, [
    selectedSize,
    availableColorsForSize,
    selectedColor,
    product.details,
    hasSizes,
  ]);

  if (!productData) return <PageNotFoundPage />;

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
      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <ProductImages images={colorImages} />
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6} sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              position: "absolute",
              top: 25,
              right: 5,
            }}
          >
            <IconButton>
              <Favorite />
            </IconButton>
            <IconButton>
              <Share />
            </IconButton>
          </Box>

          <Stack spacing={3}>
            {/* Product Name */}
            <Typography variant="h4" fontWeight="bold">
              {product.name}
            </Typography>

            {/* Product Price */}
            <Typography variant="h5" color="primary">
              ₹ {selectedPrice}
            </Typography>

            {/* Horizontal Rule */}
            <hr style={{ border: "1px solid #e0e0e0", margin: "20px 0" }} />

            {/* Color and Size Selection */}
            <Stack direction="row" spacing={2}>
              <Box sx={{ width: "50%" }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Color
                </Typography>
                <ColorSelector
                  colors={getUniqueColors(product?.images)}
                  availableColors={availableColorsForSize}
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

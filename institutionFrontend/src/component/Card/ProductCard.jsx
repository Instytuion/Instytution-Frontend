import React, {useState, useEffect, useMemo} from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Tooltip,
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  ArrowBackIos,
  ArrowForwardIos,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";
import ColorSelector from "../Products/ColorSelector";
import {
  getUniqueColors,
  getUniqueSizes,
  getAvailableColorsForSize,
  getImagesBySelectedColor,
  getDetailsByColorAndSize,
} from "../../utils/productUtils";
import SizeSelector from "../Products/SizeSelector";
import {useDispatch, useSelector} from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/WishlistSlice";
import WishlistServices from "../../services/user/Wishlist";
import useToast from "../../hooks/useToast";

const ProductCard = ({data}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlists);
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  const showToast = useToast();
  const location = useLocation();

  const getDetails = (id) => {
    return data.filter((item) => item.id === id);
  };

  const handleCardClick = (item) => {
    navigate(`/product/${item.id}`, {
      state: {productData: getDetails(item.id)},
    });
  };

  return (
    <Grid container spacing={2} sx={{padding: 2}}>
      {data.map((item, index) => {
        const [selectedColor, setSelectedColor] = useState(
          item.images && item.images.length > 0 ? item.images[0].color : ""
        );
        const [selectedSize, setSelectedSize] = useState(
          item.details && item.details.length > 0 ? item.details[0].size : ""
        );
        const [selectedPrice, setSelectedPrice] = useState(
          item.details && item.details.length > 0 ? item.details[0].price : ""
        );
        const [selectedStock, setSelectedStock] = useState(
          item.details && item.details.length > 0 ? item.details[0].stock : 0
        );
        const [isWishlisted, setIsWishlisted] = useState(false);

        const colorImages = getImagesBySelectedColor(item, selectedColor);
        const availableColorsForSize = getAvailableColorsForSize(
          item,
          selectedSize
        );

        // Update the price and stock when color/size changes
        const updatedDetails = useMemo(() => {
          return getDetailsByColorAndSize(item, selectedColor, selectedSize);
        }, [item, selectedColor, selectedSize]);


        // Update wishlist state based on selected color/size combination
        useEffect(() => {
          if (updatedDetails) {
            const isInWishlist = wishlistItems.some(
              (wishItem) => wishItem.product.id === updatedDetails.id
            );
            setIsWishlisted(isInWishlist);
          }
        }, [wishlistItems, updatedDetails]);

        const handleWishlistToggle = async (e) => {
          e.stopPropagation();
          if (!isAuthenticated) {
            showToast("Login Required", "error");
            navigate("/login", {state: {from: location.pathname}});
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
              const response = await WishlistServices.addWishlist(
                updatedDetails.id
              );
              dispatch(addToWishlist(response));
            }
          } catch (err) {
            console.error(err);
            setIsWishlisted(isWishlisted);
          }
        };

        useEffect(() => {
          if (updatedDetails) {
            setSelectedPrice(updatedDetails.price);
            setSelectedStock(updatedDetails.stock);
          }
          if (
            !availableColorsForSize.has(selectedColor) &&
            availableColorsForSize.size > 0
          ) {
            const firstAvailableColor = [...availableColorsForSize][0];
            setSelectedColor(firstAvailableColor);
          }
        }, [
          selectedSize,
          availableColorsForSize,
          selectedColor,
          updatedDetails,
        ]);

        return (
          <Grid item xs={6} md={6} lg={4} gap={1} key={index}>
            <Card
              sx={{
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                cursor: "pointer",
                boxShadow: 1,
                maxWidth: 290,
                overflow: "hidden",
                height: 360,
                position: "relative",
              }}
              onClick={() => handleCardClick(item)}
            >
              <Typography
                variant="caption"
                component="div"
                sx={{
                  display: "inline-block",
                  bgcolor: "#FFCCCB",
                  fontSize: ["0.75rem", "0.75rem", "1rem"],
                  color: selectedStock < 20 ? "red" : "",
                  mb: 1,
                  px: 2,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 10,
                }}
              >
                {selectedStock < 20 ? "Only a few left" : ""}
              </Typography>

              {/* Wishlist Icon */}
              <Tooltip
                title={
                  isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                }
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 15,
                    right: 5,
                    cursor: "pointer",
                    color: isWishlisted ? "red" : "inherit",
                    zIndex: 10,
                  }}
                  onClick={handleWishlistToggle}
                >
                  {isWishlisted ? <Favorite /> : <FavoriteBorder />}
                </Box>
              </Tooltip>

              <Box
                sx={{
                  position: "relative",
                  "&:hover .arrow": {
                    opacity: 1,
                  },
                }}
              >
                <Carousel
                  showThumbs={false}
                  showArrows={true}
                  infiniteLoop={true}
                  autoPlay={false}
                  renderArrowPrev={(clickHandler, hasPrev) =>
                    hasPrev && (
                      <ArrowBackIos
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigation on arrow click
                          clickHandler();
                        }}
                        className="arrow"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "10px",
                          zIndex: 2,
                          cursor: "pointer",
                          color: "#000",
                          fontSize: "30px",
                          opacity: 0,
                          transition: "opacity 0.3s",
                        }}
                      />
                    )
                  }
                  renderArrowNext={(clickHandler, hasNext) =>
                    hasNext && (
                      <ArrowForwardIos
                        onClick={(e) => {
                          e.stopPropagation();
                          clickHandler();
                        }}
                        className="arrow"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          zIndex: 2,
                          cursor: "pointer",
                          color: "#000",
                          fontSize: "30px",
                          opacity: 0,
                          transition: "opacity 0.3s",
                        }}
                      />
                    )
                  }
                >
                  {colorImages.length > 0
                    ? colorImages.map((img, i) => (
                        <CardMedia
                          key={i}
                          component="img"
                          image={img.image}
                          alt={item.name}
                          sx={{
                            height: 200,
                            objectFit: "contain",
                            transition: "transform 0.3s",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        />
                      ))
                    : [
                        <CardMedia
                          key="default"
                          component="img"
                          image="https://via.placeholder.com/300"
                          alt="Default Image"
                          sx={{
                            objectFit: "contain",
                            height: 200,
                          }}
                        />,
                      ]}
                </Carousel>
              </Box>

              <CardContent
                sx={{
                  textAlign: "center",
                  height: "13rem",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: ["1rem", "1rem", "1.1rem"],
                    fontWeight: "bold",
                    mb: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    mx: "auto",
                  }}
                >
                  {item.name}
                </Typography>

                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    fontSize: ["0.75rem", "0.75rem", "1rem"],
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  ₹ {selectedPrice || "N/A"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <ColorSelector
                    colors={getUniqueColors(item.images)}
                    availableColors={availableColorsForSize}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                  <SizeSelector
                    sizes={getUniqueSizes(item.details)}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductCard;

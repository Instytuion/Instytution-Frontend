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
import {
  PriceTag,
  ProductName,
  StockMessage,
  StyledArrow,
  StyledProductCard,
} from "../StyledComponents/StyledProductComponents";
import Styles from "./productCardStyle";
import RatingComponent from "../Rating/Rating";

const ProductCard = ({data}) => {
  console.log('====================================');
  console.log('data is :',data);
  console.log('====================================');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlists);
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  const showToast = useToast();
  const location = useLocation();
  const styles = Styles();

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
          showToast(
            isWishlisted ? "Removed from wishlist" : "Added to wishlist",
            "success"
          );

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
            showToast("Failed to update wishlist. Please try again.", "error");
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
          <Grid item xs={6} md={4} lg={3} gap={1} key={index}>
            <StyledProductCard
              cardheight={376}
              onClick={() => handleCardClick(item)}
            >
              <StockMessage stock={selectedStock}>
                {selectedStock < 20 ? "Only a few left" : ""}
              </StockMessage>

              {/* Wishlist Icon */}
              <Tooltip
                title={
                  isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                }
              >
                <Box
                  sx={styles.favorite(isWishlisted)}
                  onClick={handleWishlistToggle}
                >
                  {isWishlisted ? <Favorite /> : <FavoriteBorder />}
                </Box>
              </Tooltip>

              <Box sx={{position: "relative", "&:hover .arrow": {opacity: 1}}}>
                <Carousel
                  showThumbs={false}
                  showArrows={true}
                  infiniteLoop={true}
                  autoPlay={false}
                  renderArrowPrev={(clickHandler, hasPrev) =>
                    hasPrev && (
                      <StyledArrow
                        onClick={(e) => {
                          e.stopPropagation();
                          clickHandler();
                        }}
                        className="arrow"
                      />
                    )
                  }
                  renderArrowNext={(clickHandler, hasNext) =>
                    hasNext && (
                      <StyledArrow
                        right
                        onClick={(e) => {
                          e.stopPropagation();
                          clickHandler();
                        }}
                        className="arrow"
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
                          sx={{height: 200, objectFit: "contain"}}
                        />
                      ))
                    : [
                        <CardMedia
                          key="default"
                          component="img"
                          image="https://via.placeholder.com/300"
                          alt="Default Image"
                          sx={{objectFit: "contain", height: 200}}
                        />,
                      ]}
                </Carousel>
              </Box>

              <CardContent sx={{textAlign: "center", height: "13rem"}}>
                <ProductName variant="h6" component="div">
                  {item.name}
                </ProductName>
                <RatingComponent value={item.average_rating} readOnly={true} count={item.rating_count} sx={{ justifyContent: 'center' }} />

                <PriceTag
                  variant="body2"
                  component="div"
                >
                  ₹ {selectedPrice || "N/A"}
                </PriceTag>

                <Box 
                  sx={styles.sizeAndColorWrapper}
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
            </StyledProductCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductCard;

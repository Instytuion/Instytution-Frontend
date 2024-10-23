import React, {useState, useEffect} from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Tooltip,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  ArrowBackIos,
  ArrowForwardIos,
  FavoriteBorder,
  Favorite,
  Share,
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

const ProductCard = ({data}) => {
  console.log("data from propes to prdct card is ", data);

  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const getDetails = (id) => {
    return data.filter((item) => item.id == id);
  };
  const handleCardClick = (item) => {
    console.log("Clicked Product: ", item.name);
    navigate(`/product/${item.id}`, {
      state: {productData: getDetails(item.id)},
    });
  };

  // const getUniqueColors = (images) => {
  //   const colorSet = new Set(images.map((img) => img.color));
  //   return [...colorSet];
  // };

  // const getUniqueSizes = (details) => {
  //   const sizeSet = new Set(
  //     details.map((detail) => detail.size).filter((size) => size)
  //   );
  //   return [...sizeSet];
  // };

  // const getAvailableColorsForSize = (item, size) => {
  //   const sizeDetails = item.details.filter((detail) => detail.size === size);
  //   return new Set(sizeDetails.map((detail) => detail.color));
  // };

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

        // const getImagesBySelectedColor = () => {
        //   return item.images.filter(
        //     (img) => img.color.toLowerCase() === selectedColor.toLowerCase()
        //   );
        // };

        const colorImages = getImagesBySelectedColor(item, selectedColor);
        const availableColorsForSize = getAvailableColorsForSize(
          item,
          selectedSize
        );

        // price and stock
        const updatedDetails = getDetailsByColorAndSize(
          item,
          selectedColor,
          selectedSize
        );

        useEffect(() => {
          const sizeDetail = item.details.find(
            (detail) => detail.size === selectedSize
          );
          if (sizeDetail) {
            setSelectedPrice(sizeDetail.price);
            setSelectedStock(sizeDetail.stock);
          }

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
        }, [selectedSize, availableColorsForSize, selectedColor, item.details]);

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
                {selectedStock < 20 ? "only few left" : ""}
              </Typography>

              {/* wishList icon */}

              <Tooltip
                title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 15,
                    right: 5,
                    cursor: "pointer",
                    color: isFavorite ? "red" : "inherit",
                    zIndex: 10,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFavorite((prev) => !prev);
                  }}
                >
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
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
                          e.stopPropagation(); // Prevent navigation on arrow click
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
                    whiteSpace: "nowrap", // Prevents text wrapping
                    overflow: "hidden", // Hides overflow text
                    textOverflow: "ellipsis", // Shows ellipsis for truncated text
                    mx: "auto", // Centers the text block
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
                  }}
                >
                  <ColorSelector
                    colors={getUniqueColors(item.images)} // Pass the unique colors array
                    availableColors={availableColorsForSize} // Pass the available colors set
                    selectedColor={selectedColor} // Pass the currently selected color
                    setSelectedColor={setSelectedColor} // Pass the function to update the selected color
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    justifyContent: "center",
                  }}
                >
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

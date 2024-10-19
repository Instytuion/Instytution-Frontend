import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const ProductCard = ({ data }) => {
    console.log('data from propes to prdct card is ',data);
    
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    console.log("Clicked Product: ", item.name);
  };

  const getUniqueColors = (images) => {
    const colorSet = new Set(images.map((img) => img.color));
    return [...colorSet];
  };

  const getUniqueSizes = (details) => {
    const sizeSet = new Set(
      details.map((detail) => detail.size).filter((size) => size)
    );
    return [...sizeSet];
  };

  const getAvailableColorsForSize = (item, size) => {
    const sizeDetails = item.details.filter((detail) => detail.size === size);
    return new Set(sizeDetails.map((detail) => detail.color));
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
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

        const getImagesBySelectedColor = () => {
          return item.images.filter(
            (img) => img.color.toLowerCase() === selectedColor.toLowerCase()
          );
        };

        const colorImages = getImagesBySelectedColor();
        const availableColorsForSize = getAvailableColorsForSize(
          item,
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

          if (
            !availableColorsForSize.has(selectedColor) &&
            availableColorsForSize.size > 0
          ) {
            const firstAvailableColor = [...availableColorsForSize][0];
            setSelectedColor(firstAvailableColor);
          }
        }, [selectedSize, availableColorsForSize, selectedColor, item.details]);

        return (
          <Grid item xs={12} sm={6} md={6} lg={4} gap={1} key={index}>
            <Card
              sx={{
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                cursor: "pointer",
                boxShadow: 1,
                width: 320,
                "&:hover": {
                  boxShadow: 8,
                  transform: "translateY(-4px)",
                  transition: "transform 0.2s",
                },
                overflow: "hidden",
              }}
              onClick={() => handleCardClick(item)}
            >
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
                        onClick={clickHandler}
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
                        onClick={clickHandler}
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
                            objectFit: "cover",
                            height: ["20rem"],
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
                            objectFit: "cover",
                            height: ["20rem"],
                          }}
                        />,
                      ]}
                </Carousel>
              </Box>

              <CardContent
                sx={{
                  height: 230,
                  textAlign:'center'
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: ["1rem", "1rem", "1.5rem"],
                    fontWeight: "bold",
                    mb: 1,
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
                  Price: ${selectedPrice || "N/A"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    justifyContent: "center",
                  }}
                >
                  {getUniqueColors(item.images).map((color, i) => (
                    <Tooltip
                      title={
                        availableColorsForSize.has(color)
                          ? ""
                          : "This Is Currently Unavailable"
                      }
                      arrow
                      key={i}
                    >
                      <Box
                        onClick={() =>
                          availableColorsForSize.has(color) &&
                          setSelectedColor(color)
                        }
                        sx={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: color.toLowerCase(),
                          marginLeft: 1,
                          textAlign: "center",
                          boxShadow: availableColorsForSize.has(color)
                            ? "0 0 5px rgba(0, 0, 0, 0.5)"
                            : "0 0 5px rgba(255, 0, 0, 0.5)",
                          cursor: availableColorsForSize.has(color)
                            ? "pointer"
                            : "not-allowed",
                          border: `2px solid ${
                            selectedColor.toLowerCase() === color.toLowerCase()
                              ? "#000"
                              : "#f2f2f2"
                          }`,
                          opacity: availableColorsForSize.has(color) ? 1 : 0.3,
                        }}
                      />
                    </Tooltip>
                  ))}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    justifyContent: "center",
                  }}
                >
                  {getUniqueSizes(item.details).map((size, i) => (
                    <Box
                      key={i}
                      onClick={() => {
                        setSelectedSize(size);
                      }}
                      sx={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor:
                          selectedSize === size ? "#000" : "#f0f0f0",
                        color: selectedSize === size ? "#fff" : "#000",
                        marginLeft: 1,
                        cursor: "pointer",
                        border: `2px solid ${
                          selectedSize === size ? "#000" : "#ddd"
                        }`,
                        fontSize: "0.75rem",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                          backgroundColor:
                            selectedSize === size ? "#333" : "#e0e0e0",
                        },
                      }}
                    >
                      {size}
                    </Box>
                  ))}
                </Box>

                <Typography
                  variant="caption"
                  component="div"
                  sx={{
                    
                    display: "inline-block",
                    bgcolor: "#FFCCCB",
                    fontSize: ["0.75rem", "0.75rem", "1rem"],
                    color: selectedStock < 20 ? "red" : "",
                    mb: 1,
                    px:2
                  }}
                >
                  {selectedStock < 20 ? "only few left" : ""}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductCard;
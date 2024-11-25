import React from "react";
import {
  CardContent,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import {Close} from "@mui/icons-material";
import {
  PriceTag,
  ProductName,
  StockMessage,
  StyledArrow,
  StyledProductCard,
} from "../StyledComponents/StyledProductComponents";
import styles from "./productCardStyle";
import RatingComponent from "../Rating/Rating";

const WishlistCard = ({data, onDelete}) => {
  console.log('data from wishlitst cartd : ',data);
  const {product, id} = data;
  const {product_name, color, size, stock, product_images, price, average_rating, rating_count} = product;

  const colorImages = product_images.filter((image) => image.color === color);
  const classes = styles();

  // Determine stock status
  let stockMessage;
  if (stock === 0) {
    stockMessage = "Not available";
  } else if (stock < 20) {
    stockMessage = "Only a few left";
  }

  return (
    <StyledProductCard cardheight={350} >
      <Box
        sx={{
          "&:hover .arrow": {
            opacity: 1,
          },
        }}
      >
        {stockMessage && (
          <StockMessage stock variant="body2">
            {stockMessage}
          </StockMessage>
        )}

        {
          <IconButton
            sx={classes.iconButton}
            onClick={() => onDelete(id, product_name)}
          >
            <Close />
          </IconButton>
        }

        <Carousel
          showThumbs={false}
          showArrows={true}
          infiniteLoop={true}
          renderIndicator={() => null}
          renderThumbs={() => null}
          showStatus={false}
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
                  alt={product_name}
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

      <CardContent sx={{textAlign: "center"}}>
        {/* Product name */}
        <ProductName variant="h6" component="div">
          {product_name}
        </ProductName>

        {/* Product prize */}
        <PriceTag variant="body2" component="div">
          ₹ {price || "N/A"}
        </PriceTag>

        <Box sx={{display: "flex", justifyContent: "center"}}>
          {/* Product color */}
          <Box sx={classes.colorStyle(color)}></Box>
          {/* Product size */}
          {size && <Box sx={classes.sizeStyle}>{size}</Box>}
        </Box>
      </CardContent>
    </StyledProductCard>
  );
};

export default WishlistCard;

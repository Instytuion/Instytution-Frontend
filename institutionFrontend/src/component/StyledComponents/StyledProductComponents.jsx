import React from "react";
import {Card, Typography, Box} from "@mui/material";
import {styled} from "@mui/material/styles";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";

const StyledProductCard = styled(Card)(({theme, cardheight}) => ({
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  cursor: "pointer",
  maxWidth: 290,
  overflow: "hidden",
  height: cardheight || 360,
  position: "relative",
  boxShadow: "5px 5px 5px #dfe3ea, 5px 5px 5px #faffff",
  borderRadius: theme.shape.borderRadius,
}));

const ProductName = styled(Typography)({
  fontSize: "1.1rem",
  fontWeight: "bold",
  marginBottom: "0.25rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "grey",
});

const PriceTag = styled(Typography)(({theme}) => ({
  fontWeight: "bold",
  fontSize: "1.1rem",
}));

const Description = styled(Typography)({
  color: "gray",
  fontSize: "0.9rem",
  marginTop: "0.5rem",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

// const ImageBox = styled(Box)({
//   height: "200px",
//   width: "100%",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// });

const StockMessage = styled(Typography)(({theme, stock}) => ({
  position: "absolute",
  zIndex: 1,
  top: 0,
  left: 0,
  display: "inline-block",
  padding: theme.spacing(0.5),
  opacity: 0.8,
  backgroundColor: stock < 20 ? "#FFCCCB" : "",
  color: stock === 0 ? theme.palette.error.main : theme.palette.warning.main,
  fontSize: 14,
}));

const StyledArrow = styled(ArrowBackIos)(({right}) => ({
  position: "absolute",
  top: "50%",
  left: right ? "auto" : "10px",
  right: right ? "10px" : "auto",
  zIndex: 2,
  cursor: "pointer",
  color: "#000",
  fontSize: "30px",
  opacity: 0,
  transform: right ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: "opacity 0.3s",
}));

export {
  StyledProductCard,
  ProductName,
  PriceTag,
  Description,
  StockMessage,
  StyledArrow,
};

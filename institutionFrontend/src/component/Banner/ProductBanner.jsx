import React from "react";
import {Box, Button, Typography} from "@mui/material";
import {useMediaQuery} from "@mui/material";
import {ArrowRightAltRounded} from "@mui/icons-material";
import styles from "./styles";
import {useNavigate} from "react-router-dom";

const ProductBanner = ({banner, text, description, category}) => {
  // Check for screen size using Material-UI's useMediaQuery
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const bannerStyles = styles(isSmallScreen);

  const cat = category;

  console.log("category", cat);

  return (
    <Box sx={bannerStyles.productBannerBase}>
      {/* Banner Image */}

      <img src={banner} alt="banner" style={bannerStyles.image} />

      {/* Dark Overlay */}
      <Box className="overlay" sx={bannerStyles.overlay} />

      {/* Text and Button Content */}
      <Box sx={bannerStyles.contentBox}>
        <Typography textAlign={"center"} sx={bannerStyles.text}>
          {text}
        </Typography>
        <Typography
          textAlign={"center"}
          variant="caption"
          sx={bannerStyles.description}
        >
          {description}
        </Typography>
        <Button
          onClick={() => navigate(`/products/${cat}`)}
          sx={bannerStyles.button}
        >
          Explore More&nbsp;&nbsp;
          <ArrowRightAltRounded className="arrowIcon" />
        </Button>
      </Box>
    </Box>
  );
};

export default ProductBanner;

import {Stack, Box} from "@mui/material";
import React from "react";
import ProductBanner from "../../component/Banner/ProductBanner";
import subImg1 from "../../assets/staticImages/subImg1.jpg"
import subImg2 from "../../assets/staticImages/subImg2.jpg"
import Navbar from "../../component/Navbar/Navbar";

const Store = () => {
    
  const bannerImages = [
    {
      banner: subImg1,
      text: "Explore our LifeStyle",
      description:
        "Curated essentials for a stylish and comfortable everyday life.",
      category: "Lifestyles",
    },
    {
      banner: subImg2,
      text: "Explore our Gadgets",
      description:
        " Innovative tech devices to simplify your life and enhance productivity.",
      category: "Gadgets",
    },
  ];

  return (
    <>
    <Navbar/>
      <Stack
        direction={{xs: "column", md: "row"}}
        sx={{
          width: "100%",
        }}
      >
        {bannerImages.map((image, index) => (
          <Box key={index} sx={{width: "100%"}}>
            <ProductBanner
              banner={image.banner}
              text={image.text}
              description={image.description}
              category={image.category}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default Store;

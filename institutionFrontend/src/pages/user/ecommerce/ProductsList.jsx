import React, {useState} from "react";
import {useParams} from "react-router-dom";
import PageNotFoundPage from "../../../component/ErrorPages/PageNotFound";
import {Box, Stack, Typography, useMediaQuery, IconButton} from "@mui/material";
import {useQuery} from "react-query";
import ProductsServices from "../../../services/user/ProductServices";
import CartLoader from "../../../component/Spinner/CartLoader";
import ProductFilter from "../../../component/Drawer/ProductFilter";
import {Menu as MenuIcon, Close as CloseIcon} from "@mui/icons-material";
import ProductCard from "../../../component/Card/ProductCard";

const ProductsList = () => {
  const {category} = useParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filterOptions, setFilterOptions] = useState({});
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  console.log("category-----------------------", category);

  const {data, error, isLoading} = useQuery(
    ["products", category, filterOptions],
    () => ProductsServices.getProducts(category, filterOptions),
    {
      enabled: !!category,
      refetchOnWindowFocus: false,
    }
  );

  console.log("productData,----------------", data);

  // if (!category) {
  //   return <PageNotFoundPage />;
  // }

  const handleClickDrawer = () => {
    setOpenDrawer(true);
  };

  const handleFilterChange = (filters) => {
    setFilterOptions(filters);
    setOpenDrawer(false);
  };

  return (
    <>
      {isMobile && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleClickDrawer}
          sx={{
            position: "fixed",
            top: 30,
            left: 16,
            zIndex: 1200,
          }}
        >
          {!openDrawer && <MenuIcon />}
        </IconButton>
      )}
      <Stack direction={"row"} mt={isMobile ? 8 : 0}>
        <Box width={isMobile ? "" : "20%"} p={1}>
          <ProductFilter
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            handleToggleDrawer={handleClickDrawer}
            isMobile={isMobile}
            onFilterChange={handleFilterChange}
            category={category}
          />
        </Box>

        <Box width={isMobile ? "100%" : "80%"} sx={{margin: "auto"}}>
          {isLoading && <CartLoader />}
          {/* {error && <div>{error.response?.data?.error}</div>}
          {data?.map((item) => {
            return (
              <Typography key={item.id}>{item.name}</Typography> // Display each product's name
            );
          })}{" "} */}
          {data && data.length > 0 && <ProductCard data={data} />}
        </Box>
      </Stack>
    </>
  );
};
export default ProductsList;

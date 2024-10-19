import React, {useCallback, useState} from "react";
import {
  Drawer,
  Box,
  Slider,
  Stack,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import ProductsServices from "../../services/user/ProductServices";
import {useQuery} from "react-query";
import styles from "./styles";

const drawerWidth = 250;
const productFilterStyles = styles();

const SubCategoryButton = ({subCategory, isSelected, onClick}) => (
  <Button
    onClick={onClick}
    sx={productFilterStyles.subCategoryButton(isSelected)}
  >
    {subCategory.name}
  </Button>
);

const SizeButton = ({size, isSelected, onClick}) => (
  <Box onClick={onClick} sx={productFilterStyles.sizeButton(isSelected)}>
    <Typography mt={1} variant="body2">
      {size}
    </Typography>
  </Box>
);

const ColorButton = ({color, isSelected, onClick}) => (
  <Box
    onClick={onClick}
    sx={productFilterStyles.colorButton(isSelected, color)}
  />
);

const ProductFilter = ({
  onFilterChange,
  handleToggleDrawer,
  isMobile,
  openDrawer,
}) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const valuetext = useCallback((value) => `${value}₹`, []);
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const [selectedColor, setSelectedColor] = useState(null);

  const {data, error, isLoading} = useQuery(["subCategory"], () =>
    ProductsServices.getSubcategories()
  );

  if (error)
    return <div>{error.response?.data?.error || "Something went wrong!"}</div>;

  console.log("subCategoryData,----------------", data);

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = ["red", "yellow", "green", "white", "black"];

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleApplyFilters = () => {
    onFilterChange({
      min_price: priceRange[0],
      max_price: priceRange[1],
      sub_category: selectedSubCategories,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const handleClearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedSubCategories([]);
    setSelectedSize(null);
    setSelectedColor(null);
    onFilterChange({
      min_price: 0,
      max_price: 10000,
      sub_category: [],
      size: null,
      color: null,
    });
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((item) => item !== subCategory)
        : [...prev, subCategory]
    );
  };

  const isSelected = (subCategory) =>
    selectedSubCategories.includes(subCategory);

  return (
    <Box p={2}>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={openDrawer || !isMobile}
        onClose={() => isMobile && handleToggleDrawer()}
        PaperProps={{
          sx: productFilterStyles.drawer(drawerWidth),
        }}
      >
        <Box p={2} pt={1} mt={1}>

          {/* Price Range Slider */}

          <Typography
            variant="bod1"
            gutterBottom
            sx={productFilterStyles.titleStyles}
          >
            Price Range
          </Typography>
          <Slider
            sx={productFilterStyles.priceSlider}
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            getAriaLabel={() => "Price range"}
            min={0}
            max={10000}
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
            color="#009688"
          />
          <Typography variant="caption">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </Typography>
        </Box>

        {/* subCategories */}

        <Box>
          {isLoading ? (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress color="#009688" />
            </Box>
          ) : (
            <Box px={2} pb={1} mb={1}>
              <Typography
                variant="body1"
                gutterBottom
                sx={productFilterStyles.titleStyles}
              >
                Sub Category
              </Typography>
              <Stack direction={"row"} gap={1} flexWrap={"wrap"} pt={1}>
                {data?.map((subCategory, index) => (
                  <Box key={index}>
                    <SubCategoryButton
                      subCategory={subCategory}
                      isSelected={isSelected(subCategory.name)}
                      onClick={() => handleSubCategoryClick(subCategory.name)}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Box>

        {/* Sizes */}

        <Box px={2} pb={1} mb={1}>
          <Typography
            variant="body1"
            gutterBottom
            sx={productFilterStyles.titleStyles}
          >
            Size
          </Typography>
          <Stack direction="row" gap={1} flexWrap="wrap" pt={1}>
            {sizes.map((size) => (
              <SizeButton
                key={size}
                size={size}
                isSelected={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              />
            ))}
          </Stack>
        </Box>

        {/* Color */}

        <Box px={2} pb={1} mb={1}>
          <Typography
            variant="body1"
            gutterBottom
            sx={productFilterStyles.titleStyles}
          >
            Color
          </Typography>
          <Stack direction="row" gap={1} flexWrap="wrap" pt={1}>
            {colors.map((color) => (
              <ColorButton
                key={color}
                color={color}
                isSelected={selectedColor === color}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </Stack>
        </Box>
        
        {/* Action Buttons  */}

        <Stack direction={"row"} justifyContent="center" p={1} gap={1}>
          <Button
            sx={productFilterStyles.clearButton}
            onClick={handleClearFilters}
          >
            Clear
          </Button>

          <Button
            sx={productFilterStyles.applyButton}
            onClick={handleApplyFilters}
          >
            Apply
          </Button>
        </Stack>

        <Box p={2}></Box>
      </Drawer>
    </Box>
  );
};

export default ProductFilter;

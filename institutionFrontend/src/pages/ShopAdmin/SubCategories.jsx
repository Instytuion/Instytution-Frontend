import {Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import CategoryButton from "../../component/Button/CategoryButton";
import ProductsServices from "../../services/user/ProductServices";
import {useQuery} from "react-query";
import CustomDataTable from "../../component/Tables/DataTable";
import {useLocation, useNavigate} from "react-router-dom";
import CartLoader from "../../component/Spinner/CartLoader";
import {SubCategoryTable} from "../../component/Tables/SubCategoryTable";


const SubCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("Lifestyles");
  const navigate = useNavigate();
  const location = useLocation();

  const category = location.state?.category;
  
  const {data, error, isLoading} = useQuery(
    ["subCategories", selectedCategory],
    () => ProductsServices.getSubcategories(selectedCategory)
  );

  const handleNavigate = () => {
    navigate("/shop-admin/sub-category-form", {
      state: {mode: "create", category: selectedCategory},
    });
  };

  useEffect(()=>{
      if (category) setSelectedCategory(category) 
  },[category])

  if (isLoading) return <CartLoader />;

  return (
    <>
      <Stack direction={"row"} justifyContent={"center"} gap={1} mb={3}>
        <CategoryButton
          label={"Lifestyles"}
          selectedCategory={selectedCategory}
          onSelect={() => setSelectedCategory("Lifestyles")}
        />
        <CategoryButton
          label={"Gadgets"}
          selectedCategory={selectedCategory}
          onSelect={() => setSelectedCategory("Gadgets")}
        />
      </Stack>
      <CustomDataTable
        row={data?.map((value, idx) => ({
          ...value,
          rowNumber: idx + 1,
        }))}
        title={selectedCategory}
        buttonText={"SubCategory"}
        DynamicHeading={SubCategoryTable}
        handleNavigate={handleNavigate}
      />
    </>
  );
};

export default SubCategories;

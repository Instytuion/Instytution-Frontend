import React, {useEffect, useState} from "react";
import {useQuery} from "react-query";
import CustomDataTable from "../../component/Tables/DataTable";
import CartLoader from "../../component/Spinner/CartLoader";
import ProductsServices from "../../services/user/ProductServices";
import {ProductColumnsHeading} from "../../component/Tables/ProductTable";
import {Button, Stack} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import CustomeBreadCrumbs from "../../component/Breadcrumbs/Breadcrumbs";
import CategoryButton from "../../component/Button/CategoryButton";

const Products = () => {
  const [category, setCategory] = useState("Lifestyles");
  const navigate = useNavigate();
  const location = useLocation();

  const {categoryName} = location.state || {};

  useEffect(() => {
    if (categoryName) {
      setCategory(categoryName);
    }
  }, [categoryName]);

  const {data, error, isLoading} = useQuery(
    ["products", category, null],
    () => ProductsServices.getProducts(category, null),
    {
      enabled: !!category,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <CartLoader />;
  }

  if (error) {
    return <div>Error fetching Products of {category}</div>;
  }

  const handleNavigate = () => {
    navigate("/shop-admin/product-form", {
      state: {category: category},
    });
  };

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent={"center"} mb={3}>
        <CategoryButton
          label={"Lifestyles"}
          selectedCategory={category}
          onSelect={() => setCategory("Lifestyles")}
        />
        <CategoryButton
          label={"Gadgets"}
          selectedCategory={category}
          onSelect={() => setCategory("Gadgets")}
        />
      </Stack>
      <CustomDataTable
        row={data?.map((value, idx) => ({
          ...value,
          rowNumber: idx + 1,
        }))}
        title={category}
        buttonText={"Product"}
        DynamicHeading={ProductColumnsHeading}
        handleNavigate={handleNavigate}
      />
    </>
  );
};

export default Products;

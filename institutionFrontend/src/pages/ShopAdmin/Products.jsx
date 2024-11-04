import React, {useState} from "react";
import {useQuery} from "react-query";
import CustomDataTable from "../../component/Tables/DataTable";
import CartLoader from "../../component/Spinner/CartLoader";
import ProductsServices from "../../services/user/ProductServices";
import {ProductColumnsHeading} from "../../component/Tables/ProductTable";
import {Button, Stack} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [category, setCategory] = useState("LifeStyles");
  const navigate =  useNavigate();


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
    return (
      <div>
        Error fetching Products of {category} 
      </div>
    );
  }

  const handleNavigate = () =>{
    navigate("/shop-admin/product-form",{
      state: {category: category}
    });
  }

  return (
    <>
      {/* change this when it component availabe */}
      <Stack direction="row" spacing={2} justifyContent={"center"}>
        <Button onClick={() => setCategory("LifeStyles")}>LifeStyles</Button>
        <Button onClick={() => setCategory("Gadgets")}>Gadgets</Button>
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

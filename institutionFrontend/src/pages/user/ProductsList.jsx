import React from "react";
import {useParams} from "react-router-dom";
import PageNotFoundPage from "../../component/ErrorPages/PageNotFound";
import {Typography} from "@mui/material";
import {useQuery} from "react-query";
import ProductsServices from "../../services/user/ProductServices";
import CartLoader from "../../component/Spinner/CartLoader";

const ProductsList = () => {
  const {category} = useParams();

  console.log('category-----------------------',category)

  const {data, error, isLoading} = useQuery(
    ["products", category],
    () => ProductsServices.getProducts(category),
    {
      enabled: !!category,
    }
  );

  if  (isLoading) return <CartLoader/>;

  if  (error) return <div>{error.response?.data?.error}</div>;

  console.log("productData,----------------",data);
  



//   if (!category) {
//     return <PageNotFoundPage />;
//   }
  return <Typography>{category}</Typography>;
};

export default ProductsList;

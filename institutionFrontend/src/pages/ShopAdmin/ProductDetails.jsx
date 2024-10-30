import {Stack} from "@mui/material";
import React from "react";
import {useQuery} from "react-query";
import CustomDataTable from "../../component/Tables/DataTable";
import CartLoader from "../../component/Spinner/CartLoader";
import {ProductDetailColumnsHeading} from "../../component/Tables/ProductDetailTable";
import {useParams} from "react-router-dom";
import ProductsServices from "../../services/user/ProductServices";

const ProductDetails = () => {
  const {id} = useParams();
  const {
    data: product,
    error,
    isLoading,
  } = useQuery(["product", id], () => ProductsServices.getProduct(id), {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <CartLoader />;
  }

  if (error) {
    return <div>Error fetching Products data {error.data}</div>;
  }

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent={"center"}></Stack>
      <CustomDataTable
        row={product?.details?.map((detail, idx) => ({
          ...detail,
          rowNumber: idx + 1,
          images:
            product?.images?.filter((image) => image.color === detail.color) ||
            [],
        }))}
        title={product?.name}
        buttonText={"Item"}
        DynamicHeading={ProductDetailColumnsHeading}
      />
    </>
  );
};

export default ProductDetails;

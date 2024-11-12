import {Stack} from "@mui/material";
import React from "react";
import {useQuery} from "react-query";
import CustomDataTable from "../../component/Tables/DataTable";
import CartLoader from "../../component/Spinner/CartLoader";
import {ProductDetailColumnsHeading} from "../../component/Tables/ProductDetailTable";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import ProductsServices from "../../services/user/ProductServices";
import CustomeBreadCrumbs from "../../component/Breadcrumbs/Breadcrumbs";

const ProductDetails = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();

  const {category} = location.state || {};

  console.log('location', location)

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

  const links = [
    {
      path: "/shop-admin/products",
      label: category? category : product.sub_category.category_name,
      state: {categoryName: category},
    },
    {
      label : product.name
    }
  ];

  const handleNavigate = () => {
    navigate("/shop-admin/product-detail-form/", {
      state: {
        product: product,
        category: product.sub_category.category_name
      },
    });
  };

  return (
    <>
      <CustomeBreadCrumbs links={links}/>
      <Stack direction="row" spacing={2} justifyContent={"center"}></Stack>
      <CustomDataTable
        row={product?.details?.map((detail, idx) => ({
          ...detail,
          rowNumber: idx + 1,
          images:
            product?.images?.filter((image) => image.color === detail.color) ||
            [],
          productId: product.id,
          productCategory:  product.sub_category.category_name,
        }))}
        title={product?.name}
        buttonText={"Item"}
        DynamicHeading={ProductDetailColumnsHeading}
        handleNavigate={handleNavigate}
      />
    </>
  );
};
export default ProductDetails;

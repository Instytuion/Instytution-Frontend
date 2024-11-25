import {useTheme} from "@emotion/react";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useToast from "../../hooks/useToast";
import {useForm} from "react-hook-form";
import {Container, Button, CircularProgress, Stack} from "@mui/material";
import {useQuery, useQueryClient} from "react-query";
import ProductsServices from "../../services/user/ProductServices";
import CartLoader from "../../component/Spinner/CartLoader";
import ProductDetailFormFields from "../../component/Forms/ProductDetailFormFields";
import FormActionButtons from "../../component/Button/FormActionButton";
import CustomeBreadCrumbs from "../../component/Breadcrumbs/Breadcrumbs";

const ProductDetailsForm = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [productState, setProductState] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToast();

  const {
    mode = "create",
    detailId,
    product,
    productId,
    category,
  } = location.state || {};

  console.log(
    "mode",
    mode,
    "detailId",
    detailId,
    "product",
    product,
    " productId",
    productId
  );

  useEffect(() => {
    if (mode === "edit" && !detailId) {
      navigate("/*");
    }
  }, [mode, detailId, navigate]);

  const {
    data: productDetail,
    error,
    isLoading,
  } = useQuery(
    ["productDetail", detailId],
    () => ProductsServices.getProductDetail(detailId),
    {
      enabled: mode === "edit" && !!detailId,
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: productData,
    error: isProductDataError,
    isLoading: isProductDataIsLoading,
  } = useQuery(
    ["product", productId],
    () => ProductsServices.getProduct(productId),
    {
      enabled: !!productId,
      refetchOnWindowFocus: false,
    }
  );

  console.log("productstate ----------", productState);

  const {
    control,
    handleSubmit,
    setError,
    getValues,
    watch,
    trigger,
    formState: {errors},
    setValue,
  } = useForm();

  useEffect(() => {
    if (!product) {
      setProductState(productData);
    } else {
      setProductState(product);
    }
  }, [productData, product]);

  // Form submission
  const onSubmit = async (data) => {
    const filteredData = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== "") acc[key] = data[key];
      return acc;
    }, {});

    console.log("filterd data--------------", filteredData);

    setLoading(true);
    let duplicateFound = false;

    for (const detail of productState.details) {
      if (mode === "edit" && detail.id === detailId) continue;
      if (detail.size) {
        const newCombination = `${data.color}-${data.size}`;
        if (newCombination === `${detail.color}-${detail.size}`) {
          duplicateFound = true;
          setError(`color`, {
            type: "manual",
            message: `Duplicate color and size combination with size "${data.size}" and color "${data.color}".`,
          });
          setError(`size`, {
            type: "manual",
            message: `Duplicate color and size combination with color "${data.color}" and size "${data.size}".`,
          });
          break;
        }
      } else {
        const uniqueColor = data.color;
        if (uniqueColor === detail.color) {
          duplicateFound = true;
          setError(`color`, {
            type: "manual",
            message: `Color "${detail.color}" is already used.`,
          });
          break;
        }
      }
    }

    if (duplicateFound) {
      showToast("Duplicates detected.", "error");
      setLoading(false);
      return;
    }

    try {
      if (mode === "create") {
        const response = await ProductsServices.createProductDetail(
          product.id,
          filteredData
        );

        showToast("Product created successfully!", "success");
        const productID = response.product_id;

        queryClient.invalidateQueries(["productDetail", detailId]);
        queryClient.invalidateQueries(["products"]);
        queryClient.invalidateQueries(["product", productID]);

        navigate(`/shop-admin/product/details/${productID}`, {
          state: {category: category},
        });
      } else {
        const updatedData = {};
        const cleanValue = (value) => value?.toString().trim() || "";
        Object.keys(data).forEach((key) => {
          const originalValue = cleanValue(data[key]);
          const currentValue = cleanValue(productDetail[key]);
          originalValue !== currentValue;
          updatedData[key] = data[key];
        });

        if (Object.keys(updatedData).length > 0) {
          console.log("updatedData", updatedData);
          const response = await ProductsServices.updateProductDetail(
            detailId,
            updatedData
          );
          showToast("Product updated successfully!", "success");
          const productID = response.product_id;

          queryClient.invalidateQueries(["productDetail", detailId]);
          queryClient.invalidateQueries(["products"]);
          queryClient.invalidateQueries(["product", productID]);

          navigate(`/shop-admin/product/details/${productID}`, {
            state: {category: category},
          });
        } else {
          showToast("No changes detected.", "info");
          return;
        }
      }
    } catch (err) {
      showToast("An unexpected error occurred", "error");
      console.log("error form -----------------------", err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || isProductDataIsLoading) return <CartLoader />;
  if (error || isProductDataError) return <div>Error fetching datas: </div>;

  const links = [
    {
      path: "/shop-admin/products",
      label: category,
      state: {categoryName: category},
    },
    {
      path: `/shop-admin/product/details/${productId ? productId : product.id}`,
      label: productState?.name,
      state: {category: category},
    },
    {
      label: mode === "edit" ? "Edit" : "Create",
    },
  ];

  return (
    <>
      <CustomeBreadCrumbs links={links} />
      <Container maxWidth={"md"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProductDetailFormFields
            control={control}
            errors={errors}
            mode={mode}
            productDetailData={productDetail || {}}
            setValue={setValue}
            getValues={getValues}
            watch={watch}
            trigger={trigger}
            setHasChanges={setHasChanges}
          />

          <FormActionButtons
            mode={mode}
            hasChanges={hasChanges}
            loading={loading}
          />
        </form>
      </Container>
    </>
  );
};

export default ProductDetailsForm;

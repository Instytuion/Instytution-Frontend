import {useTheme} from "@emotion/react";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useToast from "../../hooks/useToast";
import {useForm} from "react-hook-form";
import {Container, Button, CircularProgress, Stack} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {useQuery, useQueryClient} from "react-query";
import ProductsServices from "../../services/user/ProductServices";
import CartLoader from "../../component/Spinner/CartLoader";
import ProductFormFields from "../../component/Forms/ProductFormFields";
import FormActionButtons from "../../component/Button/FormActionButton";
import CustomeBreadCrumbs from "../../component/Breadcrumbs/Breadcrumbs";

const ProductForm = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToast();

  const {mode = "create", category, productId} = location.state || {};

  useEffect(() => {
    if (mode === "edit" && !productId) {
      navigate("/*");
    }
  }, [mode, productId, navigate]);

  const {
    data: product,
    error,
    isLoading,
  } = useQuery(
    ["product", productId],
    () => ProductsServices.getProduct(productId),
    {
      enabled: mode === "edit" && !!productId,
      refetchOnWindowFocus: false,
    }
  );

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

  // Form submission
  const onSubmit = async (data) => {
    setLoading(true);
    if (mode === "create") {
      const uniqueCombinationSet = new Set();
      const uniqueColorSet = new Set();
      let duplicateFound = false;

      data.details.forEach((detail, index) => {
        if (detail.size) {
          const combination = `${detail.color}-${detail.size}`;
          if (uniqueCombinationSet.has(combination)) {
            duplicateFound = true;
            setError(`details[${index}].color`, {
              type: "manual",
              message: `Duplicate color and size combination with size "${detail.size}" and color "${detail.color}".`,
            });
            setError(`details[${index}].size`, {
              type: "manual",
              message: `Duplicate color and size combination with color "${detail.color}" and size "${detail.size}".`,
            });
          } else {
            uniqueCombinationSet.add(combination);
          }
        } else {
          const uniqueColor = detail.color;
          if (uniqueColorSet.has(uniqueColor)) {
            duplicateFound = true;
            setError(`details[${index}].color`, {
              type: "manual",
              message: `Color "${detail.color}" is already used.`,
            });
          } else {
            uniqueColorSet.add(detail.color);
          }
        }
      });

      // If duplicates are found, prevent form submission
      if (duplicateFound) {
        showToast("Duplicates detected.", "error");
        setLoading(false);
        return;
      }
    }

    try {
      if (mode === "create") {
        const formData = new FormData();
        const simpleFields = ["name", "description"];

        simpleFields.forEach((field) => {
          formData.append(field, data[field]);
        });

        formData.append("sub_category[name]", data.sub_category);

        data.details.forEach((detail, index) => {
          formData.append(`details[${index}][color]`, detail.color);
          formData.append(`details[${index}][price]`, detail.price);
          formData.append(`details[${index}][stock]`, detail.stock);
          formData.append(`details[${index}][size]`, detail.size);
        });

        data.images.forEach((image, index) => {
          formData.append(`images[${index}][image]`, image.image);
          formData.append(`images[${index}][color]`, image.color);
        });

        await ProductsServices.createProduct(formData, category);
        showToast("Product created successfully!", "success");
        queryClient.invalidateQueries(["products", category]);

        navigate("/shop-admin/products",{
          state:{
            categoryName:category
          }
        });
      } else {
        // For "edit" 
        const updatedData = {};
        const cleanValue = (value) => value?.toString().trim() || "";
        Object.keys(data).forEach((key) => {
          const originalValue = cleanValue(data[key]);
          const currentValue = cleanValue(product[key]);

          if (key === "sub_category") {
            if (data[key] !== product["sub_category.name"]) {
              updatedData["sub_category"] = {};
              updatedData["sub_category"]["name"] = data["sub_category"];
            }
          } else if (originalValue !== currentValue) {
            updatedData[key] = data[key];
          }
        });

        if (Object.keys(updatedData).length > 0) {
          console.log("updatedData", updatedData);
          await ProductsServices.updateProduct(productId, updatedData);
          showToast("Product updated successfully!", "success");

          queryClient.invalidateQueries(["product", productId]);
          queryClient.invalidateQueries(["products", category, null]);

           navigate("/shop-admin/products", {
             state: {
               categoryName: category,
             },
           });
        } else {
          showToast("No changes detected.", "info");
          return;
        }
      }
    } catch (err) {
      if (err?.response?.data?.name) {
        setError("name", {
          type: "manual",
          message: err.response.data.name[0],
        });
        showToast(`Error: ${err.response.data.name[0]}`, "error");
      } else {
        showToast("An unexpected error occurred", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <CartLoader />;
  if (error) return <div>Error fetching product: {error.message}</div>;

  const links = [
    {
      path: "/shop-admin/products",
      label: category,
      state: {categoryName: category},
    },
    {
      label: mode === "create" ? "Create Product" : product.name,
    },
  ];

  return (
    <Container maxWidth={"md"}>
      <CustomeBreadCrumbs links={links} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProductFormFields
          control={control}
          errors={errors}
          mode={mode}
          productData={product || {}}
          category={category}
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
  );
};

export default ProductForm;

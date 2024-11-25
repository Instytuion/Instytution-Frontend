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
import SubCategoryFormFeilds from "../../component/Forms/SubCategoryFormFields";
import {categoryServices} from "../../services/shopAdmin/categoryServices";

const SubCategoryForm = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToast();

  const {mode = "create", category, subCategoryId} = location.state || {};

  useEffect(() => {
    if (mode === "edit" && !subCategoryId) {
      navigate("/*");
    }
  }, [mode, subCategoryId, navigate]);

  const {
    data: subCategoryData,
    error,
    isLoading,
  } = useQuery(
    ["subCategory", subCategoryId],
    () => categoryServices.getSubCategory(subCategoryId),
    {
      enabled: mode === "edit" && !!subCategoryId,
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

    try {
      if (mode === "create") {
        const formData = {...data, category_name: category};
        console.log("formData", formData);
        await categoryServices.createSubCategory(formData);
        showToast(
          `subcategory '${data.name}' of  category '${category}' created successfully`,
          "success"
        );

        await queryClient.invalidateQueries(["subCategories", category]);

        navigate("/shop-admin/sub-categories", {
          state:{
            category:category
          }
        });
      } else {
        // For "edit" 
        const cleanValue = (value) => value?.toString().trim() || "";
        const updatedData =
          cleanValue(subCategoryData.name) !== cleanValue(data.name)
            ? {name: cleanValue(data.name)}
            : null;

        if (updatedData) {
          const response = await categoryServices.updateSubCategory(
            subCategoryId,
            updatedData
          );
          showToast(
            `subcategory ${updatedData.name} updated successfully`,
            "success"
          );

          await queryClient.invalidateQueries(["subCategories", category]);
          await queryClient.invalidateQueries(["subCategory", subCategoryId]);

          navigate("/shop-admin/sub-categories", {
            state: {
              category: category,
            },
          });
        } else {
          showToast("No changes detected.", "info");
          return;
        }
      }
    } catch (err) {
      console.log("error", err);
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
        path: "/shop-admin/sub-categories",
        label: category,
        state: {category: category},
      },
      {
        label: mode === "create" ? " Create new Subcategory" : subCategoryData?.name,
      },
    ];

  return (
    <>
      <CustomeBreadCrumbs links={links} />
      <Container maxWidth={"md"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SubCategoryFormFeilds
            control={control}
            errors={errors}
            mode={mode}
            subCategoryData={subCategoryData || {}}
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
    </>
  );
};

export default SubCategoryForm;

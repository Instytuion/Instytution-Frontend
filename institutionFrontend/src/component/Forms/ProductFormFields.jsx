import {useEffect, useState} from "react";
import {Grid, Button, IconButton, Avatar, Typography, Box} from "@mui/material";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import {CustomFormField} from "./CustomForm";
import {Add, Remove} from "@mui/icons-material";
import ProductsServices from "../../services/user/ProductServices";

const ProductFormFields = ({
  control,
  errors,
  mode,
  setValue,
  getValues,
  trigger,
  watch,
  setHasChanges,
  productData,
}) => {
  const [subCategories, setSubCategories] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

  const handleThumbnailChange = (file, index) => {
    const newThumbnails = [...thumbnails];
    newThumbnails[index] = URL.createObjectURL(file);
    setThumbnails(newThumbnails);
  };

  // Field array for product details
  const {
    fields: detailsFields,
    append: appendDetail,
    remove: removeDetail,
  } = useFieldArray({
    control,
    name: "details",
  });

  // Field array for images
  const {
    fields: imagesFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  // Fetch subcategories for the select field
  const fetchSubCategories = async () => {
    try {
      const response = await ProductsServices.getSubcategories();
      setSubCategories(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (mode === "edit" && productData) {
      Object.keys(productData).forEach((key) =>
        setValue(key, productData[key])
      );

      const subCategoryName = productData.sub_category?.name || "";

      setValue("sub_category", subCategoryName);
    }
  }, [mode, productData, setValue]);

  useEffect(() => {
    if (mode === "edit" && productData) {
      const subscription = watch((currentValues) => {
        const isDifferent = (original, current) =>
          (original?.toString().trim() || "") !==
          (current?.toString().trim() || "");

        const isProductDataChanged = Object.keys(productData).some((key) => {
          if (key === "sub_category") return false;
          const originalValue = productData[key];
          const currentValue = currentValues[key];
          return isDifferent(originalValue, currentValue);
        });

        const isSubCategoryChanged =
          productData.sub_category?.name !== currentValues.sub_category;

        setHasChanges(isProductDataChanged || isSubCategoryChanged);
      });

      return () => subscription.unsubscribe();
    }
  }, [watch, productData, mode]);

  return (
    <Grid container spacing={3}>
      {/* Product Name Field */}
      <Grid item xs={12}>
        <CustomFormField
          name="name"
          control={control}
          label="Product Name"
          error={errors?.name}
          helperText={errors?.name?.message || ""}
        />
      </Grid>

      {/* Product Description Field */}
      <Grid item xs={12}>
        <CustomFormField
          name="description"
          control={control}
          label="Description"
          multiline
          rows={4}
          error={errors?.description}
          helperText={errors?.description?.message || ""}
        />
      </Grid>

      {/* Subcategory Select Field */}
      <Grid item xs={12}>
        <CustomFormField
          name="sub_category"
          control={control}
          label="Subcategory"
          isSelect
          options={subCategories.map((subcategory) => ({
            value: subcategory.name,
            label: subcategory.name,
          }))}
          error={errors?.sub_category}
          helperText={errors?.sub_category?.message || ""}
        />
      </Grid>

      {mode === "create" && (
        <>
          {/* Product Details Array */}
          <Grid item xs={12}>
            <Typography mb={1} variant="body1" fontWeight={"500"}>
              {" "}
              Product Details{" "}
            </Typography>

            {detailsFields.map((item, index) => (
              <Grid container item spacing={2} key={item.id} mb={1}>
                <Grid item xs={3}>
                  <CustomFormField
                    name={`details[${index}].color`}
                    control={control}
                    label="Color"
                    error={errors?.details?.[index]?.color}
                    helperText={errors?.details?.[index]?.color?.message || ""}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomFormField
                    name={`details[${index}].size`}
                    control={control}
                    label="Size"
                    error={errors?.details?.[index]?.size}
                    helperText={errors?.details?.[index]?.size?.message || ""}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CustomFormField
                    name={`details[${index}].price`}
                    control={control}
                    label="Price"
                    type="number"
                    error={errors?.details?.[index]?.price}
                    helperText={errors?.details?.[index]?.price?.message || ""}
                  />
                </Grid>
                <Grid item xs={2}>
                  <CustomFormField
                    name={`details[${index}].stock`}
                    control={control}
                    label="Stock"
                    type="number"
                    error={errors?.details?.[index]?.stock}
                    helperText={errors?.details?.[index]?.stock?.message || ""}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => removeDetail(index)}
                    color="secondary"
                  >
                    <Remove />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                onClick={() =>
                  appendDetail({color: "", size: null, price: 0, stock: 0})
                }
                variant="outlined"
              >
                <Add /> Add Variant
              </Button>
            </Grid>
          </Grid>

          {/* Product Images Array */}
          <Grid item xs={12}>
            <Typography mb={1} variant="body1" fontWeight={"500"}>
              {" "}
              Product Images
            </Typography>

            {imagesFields.map((item, index) => (
              <Grid container item spacing={2} key={item.id}>
                <Grid item xs={6}>
                  <Box mb={1}>
                    {thumbnails[index] ? (
                      <Avatar
                        src={thumbnails[index]}
                        alt={"Program image"}
                        sx={{width: 100, height: 100, borderRadius: 2}}
                        variant="square"
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          bgcolor: "grey.300",
                          borderRadius: 2,
                        }}
                        variant="square"
                      >
                        <Typography variant="caption" textAlign={"center"}>
                          Image preview
                        </Typography>
                      </Avatar>
                    )}

                    {errors?.images?.[index]?.image && (
                      <Typography color="error" variant="caption">
                        {errors.images[index].image.message}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={5} mb={1}>
                  <CustomFormField
                    name={`images[${index}].color`}
                    control={control}
                    label="Color"
                    error={errors?.images?.[index]?.color}
                    helperText={errors?.images?.[index]?.color?.message || ""}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => {
                      removeImage(index);
                      setThumbnails((prev) =>
                        prev.filter((img, i) => i !== index)
                      );
                    }}
                    color="secondary"
                  >
                    <Remove />
                  </IconButton>
                </Grid>
                <Box ml={2} mb={2}>
                  <Controller
                    name={`images[${index}].image`}
                    rules={{
                      required: "Image is required",
                    }}
                    control={control}
                    render={({field}) => (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            field.onChange(file);
                            handleThumbnailChange(file, index);
                          } else {
                            // Clear thumbnail if file selection is canceled
                            const updatedThumbnails = [...thumbnails];
                            updatedThumbnails[index] = null;
                            setThumbnails(updatedThumbnails);
                          }
                        }}
                      />
                    )}
                  />
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                onClick={() => appendImage({image: "", color: ""})}
                variant="outlined"
              >
                <Add /> Add Image
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ProductFormFields;

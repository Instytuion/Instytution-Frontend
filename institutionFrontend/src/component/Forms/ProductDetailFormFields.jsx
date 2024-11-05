import {useEffect} from "react";
import {Grid} from "@mui/material";
import {CustomFormField} from "./CustomForm";

const ProductDetailFormFields = ({
  control,
  errors,
  mode,
  setValue,
  getValues,
  trigger,
  watch,
  setHasChanges,
  productDetailData,
}) => {

  useEffect(() => {
    if (mode === "edit" && productDetailData) {
      Object.keys(productDetailData).forEach((key) =>
        setValue(key, productDetailData[key])
      );
    }
  }, [mode, productDetailData, setValue]);

  useEffect(() => {
    if (mode === "edit" && productDetailData) {
      const subscription = watch((currentValues) => {
        const isDifferent = (original, current) =>
          (original?.toString().trim() || "") !==
          (current?.toString().trim() || "");

        const isProductDetailDataChanged = Object.keys(productDetailData).some(
          (key) => {
            if (key === "sub_category") return false;
            const originalValue = productDetailData[key];
            const currentValue = currentValues[key];
            return isDifferent(originalValue, currentValue);
          }
        );
        setHasChanges(isProductDetailDataChanged);
      });

      return () => subscription.unsubscribe();
    }
  }, [watch, productDetailData, mode]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomFormField
          name="size"
          control={control}
          label="Size"
          error={errors?.size}
          helperText={errors?.size?.message || ""}
        />
      </Grid>

      {/* Product Description Field */}
      <Grid item xs={12}>
        <CustomFormField
          name="color"
          control={control}
          label="Color"
          rows={4}
          error={errors?.color}
          helperText={errors?.color?.message || ""}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFormField
          name="stock"
          control={control}
          label="Stock"
          rows={4}
          error={errors?.stock}
          helperText={errors?.stock?.message || ""}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFormField
          name="price"
          control={control}
          label="Price"
          rows={4}
          error={errors?.price}
          helperText={errors?.price?.message || ""}
        />
      </Grid>
    </Grid>
  );
};

export default ProductDetailFormFields;

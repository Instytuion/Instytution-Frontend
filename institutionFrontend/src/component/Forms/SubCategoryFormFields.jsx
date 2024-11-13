import {useEffect} from "react";
import {Grid} from "@mui/material";
import {CustomFormField} from "./CustomForm";

const SubCategoryFormFeilds = ({
  control,
  errors,
  mode,
  setValue,
  getValues,
  trigger,
  watch,
  setHasChanges,
  subCategoryData,
  category
  
}) => {
  useEffect(() => {
    if (mode === "edit" && subCategoryData) {
      Object.keys(subCategoryData).forEach((key) =>
        setValue(key, subCategoryData[key])
      );
    }
  }, [mode, subCategoryData, setValue]);

  useEffect(() => {
    if (mode === "edit" && subCategoryData) {
      const subscription = watch((currentValues) => {
        const isDifferent = (original, current) =>
          (original?.toString().trim() || "") !==
          (current?.toString().trim() || "");

        const isChanged = Object.keys(subCategoryData).some(
          (key) => {
            const originalValue = subCategoryData[key];
            const currentValue = currentValues[key];
            return isDifferent(originalValue, currentValue);
          }
        );
        setHasChanges(isChanged);
      });

      return () => subscription.unsubscribe();
    }
  }, [watch, subCategoryData, mode]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomFormField
          name="name"
          control={control}
          label="Name"
          error={errors?.name}
          helperText={errors?.name?.message || ""}
        />
      </Grid>
    </Grid>
  );
};

export default SubCategoryFormFeilds;

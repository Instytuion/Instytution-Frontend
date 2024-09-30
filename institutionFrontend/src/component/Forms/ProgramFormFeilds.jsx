import {useEffect, useState} from "react";
import {Avatar, Box, Grid, Stack, Typography} from "@mui/material";
import {Controller} from "react-hook-form";
import {CustomFormField} from "./CustomForm";


const ProgramFormFields = ({control, errors, mode, programData, setValue}) => {
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (mode === "edit" && programData) {
      Object.keys(programData).forEach((key) => {
        setValue(key, programData[key]);
      });
      if (programData.image) {
        setThumbnail(programData.image);
      }
    }
  }, [mode, programData, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setThumbnail(imagePreview); // Set thumbnail to preview the selected image
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomFormField
          name="name"
          control={control}
          label="Program Name"
          error={errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="image"
          control={control}
          rules={{required: mode === "create" ? "Image is required" : false}}
          render={({field, fieldState}) => (
            <>
              <Typography mb={1}>Image</Typography>
              <Stack
                justifyContent={"space-between"}
                direction={{xs: "column", md: "row"}}
                gap={{xs:2 , md:0}}
              >
                <Box>
                  {thumbnail ? (
                    <Avatar
                      src={thumbnail}
                      alt={"Program image"}
                      sx={{width: 120, height: 120, borderRadius: 2}}
                      variant="square"
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        bgcolor: "grey.300",
                        borderRadius: 2,
                      }}
                      variant="square"
                    >
                      <Typography>Image preview</Typography>
                    </Avatar>
                  )}
                  {fieldState.error && (
                    <Typography variant="caption" color="error">
                      {fieldState.error.message}
                    </Typography>
                  )}
                </Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                    handleImageChange(e);
                  }}
                />
              </Stack>

            </>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ProgramFormFields;

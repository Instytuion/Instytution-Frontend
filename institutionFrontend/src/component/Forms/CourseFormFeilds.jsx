import {useEffect, useState} from "react";
import { Avatar, Box, Grid, Stack, Typography} from "@mui/material";
import {Controller} from "react-hook-form";
import {CustomFormField} from "./CustomForm";

const CourseFormFields = ({
  control,
  errors,
  mode,
  courseData,
  setValue,
}) => {

  const [thumbnail , setThumbnail] = useState('')

  useEffect(() => {
    if (mode === "edit" && courseData) {
      Object.keys(courseData).forEach((key) => {
        setValue(key, courseData[key]);
      });
      if (courseData.image){
        setThumbnail(courseData.image)
      }
    }
    
  }, [mode, courseData, setValue]);

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
          label="Course Name"
          error={errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFormField
          name="price"
          control={control}
          label="Price"
          type="number"
          error={errors.price}
          helperText={errors.price ? errors.price.message : ""}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFormField
          name="course_level"
          control={control}
          label="Course Level"
          isSelect={true}
          options={[
            {value: "beginner", label: "Beginner"},
            {value: "intermediate", label: "Intermediate"},
            {value: "advanced", label: "Advanced"},
          ]}
          error={errors.course_level}
          helperText={errors.course_level ? errors.course_level.message : ""}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFormField
          name="duration"
          control={control}
          label="Duration"
          type="number"
          error={errors.duration}
          helperText={errors.duration ? errors.duration.message : ""}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFormField
          name="description"
          control={control}
          label="Description"
          multiline
          rows={3}
          error={errors.description}
          helperText={errors.description ? errors.description.message : ""}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFormField
          name="skill"
          control={control}
          label="Skills"
          multiline
          rows={3}
          error={errors.skill}
          helperText={errors.skill ? errors.skill.message : ""}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFormField
          name="prerequisite"
          control={control}
          label="Prerequisite"
          multiline
          rows={3}
          error={errors.prerequisite}
          helperText={errors.prerequisite ? errors.prerequisite.message : ""}
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
                gap={{xs: 2, md: 0}}
              >
                <Box>
                  {thumbnail ? (
                    <Avatar
                      src={thumbnail}
                      alt="Course Thumbnail"
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
                </Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                    handleImageChange(e);
                  }}
                />
                {fieldState.error && (
                  <Typography variant="caption" color="error">
                    {fieldState.error.message}
                  </Typography>
                )}
              </Stack>
            </>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default CourseFormFields;

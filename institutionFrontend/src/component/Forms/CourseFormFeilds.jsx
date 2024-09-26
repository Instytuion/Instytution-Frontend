import {useEffect} from "react";
import {Grid, Typography} from "@mui/material";
import {Controller} from "react-hook-form";
import {CustomFormField} from "./CustomForm";

const CourseFormFields = ({
  control,
  errors,
  programs,
  mode,
  course_data,
  setValue,
}) => {
  // Use effect to set default values when editing
  useEffect(() => {
    if (mode === "edit" && course_data) {
      // Iterate over the course_data keys and set values in the form
      Object.keys(course_data).forEach((key) => {
        setValue(key, course_data[key]);
      });
    }
  }, [mode, course_data, setValue]);

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

      {/* <Grid item xs={12}>
        
        <Controller
          name="program"
          control={control}
          defaultValue={mode === "edit" ? course_data.program : ""}
          render={({field}) => (
            <CustomFormField
              {...field}
              label="Program"
              options={programs.map((program) => ({
                value: program.name,
                label: program.name,
              }))}
              error={errors.program}
              helperText={errors.program ? errors.program.message : ""}
            />
          )}
        />
      </Grid> */}

      <Grid item xs={12}>
        <CustomFormField
          name="course_level"
          control={control}
          label="Course Level"
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
              <Typography>Image</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files[0])}
              />
              {fieldState.error && (
                <Typography color="error">
                  {fieldState.error.message}
                </Typography>
              )}
              {mode === "edit" && course_data?.image && (
                <Typography>Current image: {course_data.image}</Typography>
              )}
            </>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default CourseFormFields;

import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import FetchPrograms from "../../services/courses/FetchPrograms"; // Your API call

// Reusable FormField component
const FormField = ({
  name,
  control,
  label,
  type = "text",
  multiline = false,
  rows = 1,
  error,
  helperText,
}) => (
  <Controller
    name={name}
    control={control}
    rules={{required: `${label} is required`}}
    render={({field}) => (
      <TextField
        label={label}
        {...field}
        fullWidth
        variant="outlined"
        type={type}
        multiline={multiline}
        rows={rows}
        error={!!error}
        helperText={error ? helperText : ""}
      />
    )}
  />
);

// Reusable SelectField component
const SelectField = ({name, control, label, options, error, helperText}) => (
  <FormControl fullWidth error={!!error}>
    <InputLabel>{label}</InputLabel>
    <Controller
      name={name}
      control={control}
      rules={{required: `${label} is required`}}
      render={({field}) => (
        <Select {...field} label={label}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    />
    {error && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

const CourseForm = () => {
  const [programs, setPrograms] = useState([]); // State to hold fetched programs
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      program: "",
      duration: "",
      image: "",
      description: "",
      skill: "",
      prerequisite: "",
      course_level: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Send data to the backend
  };

  // Fetch programs when component mounts
  const getPrograms = async () => {
    try {
      const response = await FetchPrograms(); // Your API service call
      setPrograms(response.data); // Set the response data to programs state
    } catch (error) {
      console.log("Error while fetching programs", error);
    }
  };

  useEffect(() => {
    getPrograms();
  }, []);

  return (
    <Container maxWidth="sm" sx={{pb: 3}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Create Course
        </Typography>

        <Box sx={{mb: 3}}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormField
                name="name"
                control={control}
                label="Course Name"
                error={errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
                name="price"
                control={control}
                label="Price"
                type="number"
                error={errors.price}
                helperText={errors.price ? errors.price.message : ""}
              />
            </Grid>

            <Grid item xs={12}>
              {/* Program dropdown with dynamic options */}
              <SelectField
                name="program"
                control={control}
                label="Program"
                options={programs.map((program) => ({
                  value: program.name, // Set the value as the program name
                  label: program.name, // Display the program name as the label
                }))}
                error={errors.program}
                helperText={errors.program ? errors.program.message : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <SelectField
                name="course_level"
                control={control}
                label="Course Level"
                options={[
                  {value: "beginner", label: "Beginner"},
                  {value: "intermediate", label: "Intermediate"},
                  {value: "advanced", label: "Advanced"},
                ]}
                error={errors.course_level}
                helperText={
                  errors.course_level ? errors.course_level.message : ""
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
                name="duration"
                control={control}
                label="Duration"
                type="number"
                error={errors.duration}
                helperText={errors.duration ? errors.duration.message : ""}
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
                name="description"
                control={control}
                label="Description"
                multiline
                rows={3}
                error={errors.description}
                helperText={
                  errors.description ? errors.description.message : ""
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
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
              <FormField
                name="prerequisite"
                control={control}
                label="Prerequisite"
                multiline
                rows={3}
                error={errors.prerequisite}
                helperText={
                  errors.prerequisite ? errors.prerequisite.message : ""
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="image"
                control={control}
                rules={{required: "Image is required"}}
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
                  </>
                )}
              />
            </Grid>
          </Grid>
        </Box>

        <Box mt={4}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CourseForm;

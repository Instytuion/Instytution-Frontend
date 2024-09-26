import {useForm} from "react-hook-form";
import CourseFormFields from "../../component/Forms/CourseFormFeilds";
import {Container, Button, Stack} from "@mui/material";
import { useTheme } from "@emotion/react";




const CourseForm = ({mode = "create", course_data,}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

  const theme = useTheme()

  const onSubmit = (data) => {
    if (mode === "create") {
      // Handle create course logic
      console.log("Creating course:", data);
    } else if (mode === "edit") {
      // Handle update course logic
      console.log("Updating course:", data);
    }
  };

  
  return (
    <Container maxWidth={'md'}  >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CourseFormFields
          control={control}
          errors={errors}
          // programs={programs}
          mode={mode}
          course_data={course_data}
          setValue={setValue} // Pass the setValue function to CourseFormFields
        />
        <Stack justifyContent="space-between" direction={"row"} mt={2}>
          <Button
            type="submit"
            sx={{bgcolor: theme.palette.customColors, color: "white"}}
          >
            {mode === "create" ? "Create" : "Update"} Course
          </Button>
          <Button sx={{bgcolor: "red", color: "white"}}>cancel</Button>
        </Stack>
      </form>
    </Container>
  );
};

export default CourseForm;

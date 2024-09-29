import {useForm} from "react-hook-form";
import CourseFormFields from "../../component/Forms/CourseFormFeilds";
import {Container, Button, Stack, CircularProgress} from "@mui/material";
import {useTheme} from "@emotion/react";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import FetchCourseDetails from "../../services/courseAdmin/FetchCourseDetails";
import CourseFormServices from "../../services/courseAdmin/CourseFormServices";
import useToast from "../../hooks/useToast";

const CourseForm = () => {
  const [courseData, setCourseData] = useState(null);
  const [programs, setPrograms] = useState([]);
  const theme = useTheme();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  const navigate = useNavigate();

  const {mode = "create", courseName, programName} = location.state || {};
  console.log(
    "mode:",
    mode,
    "courseName:",
    courseName,
    "programName:",
    programName
  );
  console.log(courseData);

  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
    setValue,
  } = useForm();

  useEffect(() => {
    if (mode === "edit" && courseName) {
      const fetchCourseData = async () => {
        setLoading(true);
        try {
          const response = await FetchCourseDetails(courseName);
          setCourseData(response);
        } catch (error) {
          console.error("Error fetching course data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCourseData();
    }
  }, [mode, courseName]);

  // submitting datas to backend dynamically for edit and update

  const onSubmit = async (data) => {
    console.log("submitting data", data);
    const formData = new FormData();

    if (programName) {
      formData.append("program", programName);
    }

    try {
      setLoading(true)
      if (mode === "create") {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });

        await CourseFormServices.CreateCourse(formData);
        console.log("Course created successfully");
        showToast(`New course (${data.name}) created succussfully`, "success");
        navigate(`/course-admin/programs/${programName}`);
      } else if (mode === "edit") {
        Object.keys(data).forEach((key) => {
          if (data[key] !== courseData[key]) {
            formData.append(key, data[key]);
          }
        });

        const response = await CourseFormServices.UpdateCourse(
          formData,
          courseData.name
        );
        console.log("Course created successfully");
        showToast(`course (${data.name}) updated succussfully`, "success");
        navigate(`/course-admin/programs/${response.program}`);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.name) {
        setError("name", {
          type: "manual",
          message: error.response.data.name[0], // Access the first message
        });
        showToast(`Error: ${error.response.data.name[0]}`, "error");
      } else {
        showToast(
          `Error: ${error?.response?.data || "An unknown error occurred"}`,
          "error"
        );
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <Container maxWidth={"md"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CourseFormFields
          control={control}
          errors={errors}
          mode={mode}
          courseData={courseData}
          programs={programs}
          setValue={setValue}
        />
        <Stack justifyContent="space-between" direction={"row"} mt={2}>
          <Button
            type="submit"
            sx={{bgcolor: theme.palette.customColors, color: "white"}}
          >
            {loading ? <CircularProgress size={20} color="white"/>: mode == "create"? "create": "update"} 
          </Button>
          <Button
            sx={{bgcolor: "red", color: "white"}}
            onClick={() => window.history.back()}
            disabled={loading}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default CourseForm;
